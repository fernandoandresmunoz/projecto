import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

interface Cell {
  state: number;
  color: string;
}

interface SavedMatrix {
  matrix: Cell[][];
  generation: number;
  timestamp: string;
  rules: {
    green: string;
    brown: string;
    blue: string;
    red: string;
    gray: string;
  };
  isStabilized: boolean;
}

interface Chunk {
  x: number;
  z: number;
  meshes: THREE.Mesh[];
  instancedMeshes: THREE.InstancedMesh[];
  isVisible: boolean;
}

interface Animal {
  type: 'cow' | 'sheep' | 'pig' | 'chicken' | 'trex';
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  target: THREE.Vector3 | null;
  state: 'idle' | 'walking' | 'running' | 'eating' | 'swimming';
  lastStateChange: number;
  mesh: THREE.Group;
  isAlive: boolean;
  health: number;
  canSwim: boolean;
}

@Component({
  selector: 'app-minecraft-view',
  template: `
    <div #rendererContainer></div>
    <div #minimapContainer class="minimap"></div>
    <div class="crosshair" *ngIf="isLocked">+</div>
    <!-- <div class="controls-info" *ngIf="!isLocked">
      Click to start<br>
      Move: WASD<br>
      Jump: SPACE<br>
      Look: MOUSE
    </div>
    <div class="water-overlay" [class.visible]="isUnderwater"></div> -->
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .controls-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      background: rgba(0, 0, 0, 0.5);
      padding: 20px;
      border-radius: 5px;
    }
    .water-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(30, 144, 255, 0.2);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1;
    }
    .water-overlay.visible {
      opacity: 1;
    }
    .minimap {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 200px;
      height: 200px;
      border-radius: 5px;
      border: 2px solid white;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
    }
    .crosshair {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      pointer-events: none;
      user-select: none;
      z-index: 1000;
    }
  `]
})
export class MinecraftViewComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @ViewChild('minimapContainer', { static: true }) minimapContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: PointerLockControls;
  private matrix: Cell[][] = [];
  
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private canJump = true;
  private isUnderwater = false;
  private moveSpeed = 15.0;
  private gravity = 30.0;
  private playerHeight = 2.0;
  private jumpForce = 10.0;
  private friction = 5.0;
  private acceleration = 30.0;

  private isLocked = false;
  private prevTime = performance.now();

  // Sistema de chunks
  private readonly CHUNK_SIZE = 16; // Tamaño de cada chunk (16x16 bloques)
  private readonly RENDER_DISTANCE = 3; // Distancia de renderizado en chunks
  private chunks: Map<string, Chunk> = new Map();
  private lastChunkX = 0;
  private lastChunkZ = 0;
  private geometryCache: Map<string, THREE.BufferGeometry> = new Map();
  private materialCache: Map<string, THREE.Material> = new Map();

  private readonly colorMap: { [key: string]: number } = {
    'Green': 0x2F5A1C,  // Verde más oscuro para las hojas
    'Brown': 0x5C4033,  // Marrón más oscuro para tierra
    'Blue': 0x0F5E9C,   // Azul oscuro para agua
    'Gray': 0x808080,   // Gris para montañas
    'Red': 0x6B4423     // Marrón oscuro para caminos
  };

  private readonly geometries = {
    tree: {
      trunk: new THREE.BoxGeometry(0.3, 2.0, 0.3),
      leaves: new THREE.ConeGeometry(1.0, 2.5, 8)
    },
    ground: new THREE.BoxGeometry(1, 0.3, 1),
    water: new THREE.BoxGeometry(1, 0.2, 1),
    mountain: new THREE.BoxGeometry(1, 0.3, 1),
    path: new THREE.BoxGeometry(1, 0.3, 1)
  };

  private waterLevel = 0.3;
  private normalFogColor = new THREE.Color(0x87CEEB);
  private waterFogColor = new THREE.Color(0x1E90FF);

  private minimapScene!: THREE.Scene;
  private minimapCamera!: THREE.OrthographicCamera;
  private minimapRenderer!: THREE.WebGLRenderer;
  private playerMarker!: THREE.Group;

  private worldBounds = {
    minX: 0,
    maxX: 0,
    minZ: 0,
    maxZ: 0
  };

  private player!: THREE.Group;
  private cameraOffset = new THREE.Vector3(0, 3, 5);
  private targetPosition = new THREE.Vector3();
  private playerRotation = 0;
  private smoothFactor = 0.1;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private selectedBlock: THREE.Mesh | null = null;
  private blockOutline: THREE.LineSegments | null = null;
  private blocks: THREE.Mesh[] = [];
  private readonly MAX_REACH = 5; // Distancia máxima para interactuar con bloques

  // Sistema de animales
  private animals: Animal[] = [];
  private readonly ANIMAL_TYPES = ['cow', 'sheep', 'pig', 'chicken', 'trex'];
  private readonly ANIMAL_COLORS = {
    cow: {
      body: 0x8B4513,    // Marrón más oscuro
      spots: 0xFFFFFF,   // Manchas blancas
      nose: 0xFF9AA2     // Nariz rosada
    },
    sheep: {
      body: 0xFFFFFF,    // Blanco
      face: 0x4A4A4A,    // Cara gris oscuro
      legs: 0x4A4A4A     // Patas grises
    },
    pig: {
      body: 0xFFC0CB,    // Rosa claro
      nose: 0xFF9AA2,    // Nariz rosada
      hooves: 0x4A4A4A   // Pezuñas grises
    },
    chicken: {
      body: 0xF5DEB3,    // Beige
      beak: 0xFFD700,    // Pico amarillo
      comb: 0xFF0000     // Cresta roja
    },
    trex: {
      body: 0x2F4F2F,    // Verde oscuro
      belly: 0x3D5229,   // Verde más claro
      teeth: 0xFFFFF0    // Dientes blancos
    }
  };
  private readonly ANIMAL_SCALES = {
    cow: 1.2,
    sheep: 1.0,
    pig: 0.9,
    chicken: 0.6,
    trex: 3.0
  };
  private readonly ANIMAL_SPEEDS = {
    cow: 2.5,
    sheep: 2.2,
    pig: 2.8,
    chicken: 3.5,
    trex: 6.0
  };
  private readonly ANIMAL_CAN_SWIM = {
    cow: false,
    sheep: false,
    pig: true,    // Los cerdos pueden nadar
    chicken: false,
    trex: true    // T-Rex puede cruzar agua
  };
  private readonly MAX_ANIMALS = 20;
  private animalUpdateInterval = 0;
  private readonly ANIMAL_UPDATE_FREQUENCY = 0.5; // segundos
  
  // Claves para el localStorage
  private readonly PLAYER_POSITION_KEY = 'minecraft_player_position';
  private readonly ANIMALS_DATA_KEY = 'minecraft_animals_data';
  private readonly SAVE_INTERVAL = 5000; // Guardar cada 5 segundos
  private lastSaveTime = 0;

  ngOnInit() {
    this.loadMatrixFromLocalStorage();
    this.initScene();
    this.initControls();
    this.generateWorld();
    
    // Cargar la posición del jugador y los animales
    this.loadPlayerPosition();
    this.loadAnimalsData();
    
    this.animate();
    
    // Configurar un intervalo para guardar periódicamente
    setInterval(() => this.saveGameState(), this.SAVE_INTERVAL);
  }

  private loadMatrixFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('automata_matrix');
      if (savedData) {
        const parsedData: SavedMatrix = JSON.parse(savedData);
        this.matrix = parsedData.matrix;
        console.log('Matrix loaded from localStorage:', this.matrix.length, 'x', this.matrix[0].length);
        // Mostrar algunos ejemplos de colores que existen en la matriz
        const colors = new Set();
        this.matrix.forEach(row => 
          row.forEach(cell => {
            if (cell.state === 1) colors.add(cell.color);
          })
        );
        console.log('Colors found in matrix:', Array.from(colors));
      } else {
        console.log('No saved matrix found in localStorage');
      }
    } catch (error) {
      console.error('Error loading matrix from localStorage:', error);
    }
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xADD8E6);

    // Configuración básica del renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar pixel ratio para rendimiento
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Luz direccional simple
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 50;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    this.scene.add(light);

    // Luz ambiental normal
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    this.scene.add(ambientLight);

    // Calcular los límites del mundo basado en el tamaño de la matriz
    const halfWidth = this.matrix.length / 2;
    const halfDepth = (this.matrix[0]?.length || 0) / 2;
    this.worldBounds = {
      minX: -halfWidth + 1, // +1 para dar un pequeño margen
      maxX: halfWidth - 1,
      minZ: -halfDepth + 1,
      maxZ: halfDepth - 1
    };

    this.createPlayer();
    
    // Ajustar la cámara para vista en tercera persona
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 20);
    this.updateCameraPosition();

    // Añadir niebla
    this.scene.fog = new THREE.FogExp2(0x87CEEB, 0.01);

    // Initialize minimap
    this.initMinimap();

    // Crear contorno para bloque seleccionado
    const outlineGeometry = new THREE.BoxGeometry(1.001, 1.001, 1.001);
    const outlineEdges = new THREE.EdgesGeometry(outlineGeometry);
    this.blockOutline = new THREE.LineSegments(
      outlineEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    this.blockOutline.visible = false;
    this.scene.add(this.blockOutline);

    // Añadir capa subterránea
    this.generateUnderground();

    // Inicializar animales
    this.generateAnimals();
  }

  private initControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);

    this.controls.addEventListener('lock', () => {
      this.isLocked = true;
    });

    this.controls.addEventListener('unlock', () => {
      this.isLocked = false;
    });

    this.renderer.domElement.addEventListener('click', () => {
      if (!this.isLocked) {
        this.controls.lock();
      }
    });
  }

  private generateWorld() {
    if (!this.matrix || this.matrix.length === 0) {
      console.log('No matrix data available');
      return;
    }

    // Inicializar el chunk actual
    this.updateChunks();
  }

  private getChunkKey(x: number, z: number): string {
    return `${x},${z}`;
  }

  private getChunkFromPosition(x: number, z: number): { chunkX: number, chunkZ: number } {
    const chunkX = Math.floor(x / this.CHUNK_SIZE);
    const chunkZ = Math.floor(z / this.CHUNK_SIZE);
    return { chunkX, chunkZ };
  }

  private updateChunks() {
    if (!this.camera) return;

    const playerPos = this.camera.position;
    const { chunkX, chunkZ } = this.getChunkFromPosition(playerPos.x, playerPos.z);

    // Si el jugador no ha cambiado de chunk, no hacemos nada
    if (chunkX === this.lastChunkX && chunkZ === this.lastChunkZ) {
      return;
    }

    this.lastChunkX = chunkX;
    this.lastChunkZ = chunkZ;

    // Determinar qué chunks deben estar visibles
    const visibleChunks = new Set<string>();
    for (let x = chunkX - this.RENDER_DISTANCE; x <= chunkX + this.RENDER_DISTANCE; x++) {
      for (let z = chunkZ - this.RENDER_DISTANCE; z <= chunkZ + this.RENDER_DISTANCE; z++) {
        visibleChunks.add(this.getChunkKey(x, z));
      }
    }

    // Ocultar chunks que ya no están en el rango de visibilidad
    for (const [key, chunk] of this.chunks.entries()) {
      if (!visibleChunks.has(key)) {
        chunk.isVisible = false;
        chunk.meshes.forEach(mesh => mesh.visible = false);
        chunk.instancedMeshes.forEach(mesh => mesh.visible = false);
      }
    }

    // Cargar o mostrar chunks que están en el rango de visibilidad
    for (const key of visibleChunks) {
      if (!this.chunks.has(key)) {
        const [x, z] = key.split(',').map(Number);
        this.generateChunk(x, z);
      } else {
        const chunk = this.chunks.get(key)!;
        chunk.isVisible = true;
        chunk.meshes.forEach(mesh => mesh.visible = true);
        chunk.instancedMeshes.forEach(mesh => mesh.visible = true);
      }
    }
  }

  private generateChunk(chunkX: number, chunkZ: number) {
    const chunkKey = this.getChunkKey(chunkX, chunkZ);
    const chunk: Chunk = {
      x: chunkX,
      z: chunkZ,
      meshes: [],
      instancedMeshes: [],
      isVisible: true
    };

    // Calcular los límites del chunk en coordenadas del mundo
    const startX = chunkX * this.CHUNK_SIZE;
    const startZ = chunkZ * this.CHUNK_SIZE;
    const endX = startX + this.CHUNK_SIZE;
    const endZ = startZ + this.CHUNK_SIZE;

    // Calcular los límites en coordenadas de la matriz
    const matrixOffsetX = Math.floor(this.matrix.length / 2);
    const matrixOffsetZ = Math.floor(this.matrix[0].length / 2);

    // Agrupar bloques por color para instanciación
    const blockGroups: { [key: string]: { positions: { x: number, y: number, z: number }[], count: number, color: number, geometry: THREE.BoxGeometry } } = {};

    // Inicializar grupos de bloques
    const uniqueColors = new Set<string>();
    this.matrix.forEach(row => row.forEach(cell => {
      if (cell.state === 1) uniqueColors.add(cell.color);
    }));

    uniqueColors.forEach(color => {
      const colorHex = this.colorMap[color];
      let geometry;
      
      switch(color) {
        case 'Green':
          geometry = this.geometries.tree.trunk;
          break;
        case 'Brown':
          geometry = this.geometries.ground;
          break;
        case 'Blue':
          geometry = this.geometries.water;
          break;
        case 'Gray':
          geometry = this.geometries.mountain;
          break;
        case 'Red':
          geometry = this.geometries.path;
          break;
        default:
          geometry = this.geometries.ground;
      }

      blockGroups[color] = {
        positions: [],
        count: 0,
        color: colorHex,
        geometry: geometry
      };
    });

    // Recorrer solo la parte de la matriz que corresponde a este chunk
    for (let x = Math.max(0, startX + matrixOffsetX); x < Math.min(this.matrix.length, endX + matrixOffsetX); x++) {
      for (let z = Math.max(0, startZ + matrixOffsetZ); z < Math.min(this.matrix[0].length, endZ + matrixOffsetZ); z++) {
        const cell = this.matrix[x][z];
        if (cell.state === 1) {
          const group = blockGroups[cell.color];
          if (group) {
            const worldX = x - matrixOffsetX;
            const worldZ = z - matrixOffsetZ;
            const height = this.getBlockHeight(cell.color);
            group.positions.push({
              x: worldX,
              y: height,
              z: worldZ
            });
            group.count++;
          }
        }
      }
    }

    // Crear instanced meshes para cada color
    for (const [color, group] of Object.entries(blockGroups)) {
      if (group.count === 0) continue;

      if (color === 'Green') {
        // Crear árboles con tronco y hojas
        group.positions.forEach(pos => {
          // Crear el tronco
          const trunk = new THREE.Mesh(
            this.geometries.tree.trunk,
            new THREE.MeshPhongMaterial({ 
              color: 0x3D2410,  // Marrón más oscuro para el tronco
              shininess: 5
            })
          );
          trunk.position.set(pos.x, pos.y + 1.0, pos.z);
          trunk.castShadow = true;
          trunk.receiveShadow = true;
          this.scene.add(trunk);
          chunk.meshes.push(trunk);

          // Crear las hojas (copa del árbol)
          const leaves = new THREE.Mesh(
            this.geometries.tree.leaves,
            new THREE.MeshPhongMaterial({ 
              color: this.colorMap[color],
              shininess: 5,
              flatShading: true,
              side: THREE.DoubleSide
            })
          );
          leaves.position.set(pos.x, pos.y + 2.8, pos.z);
          leaves.castShadow = true;
          leaves.receiveShadow = true;
          leaves.rotation.y = Math.random() * Math.PI * 2;
          this.scene.add(leaves);
          chunk.meshes.push(leaves);

          // Añadir una segunda capa de hojas más pequeña
          const leavesTop = new THREE.Mesh(
            new THREE.ConeGeometry(0.7, 1.5, 8),
            new THREE.MeshPhongMaterial({ 
              color: this.colorMap[color],
              shininess: 5,
              flatShading: true,
              side: THREE.DoubleSide
            })
          );
          leavesTop.position.set(pos.x, pos.y + 3.8, pos.z);
          leavesTop.rotation.y = Math.random() * Math.PI * 2;
          leavesTop.castShadow = true;
          leavesTop.receiveShadow = true;
          this.scene.add(leavesTop);
          chunk.meshes.push(leavesTop);

          // Añadir mancha oscura debajo del árbol
          const shadowSpot = new THREE.Mesh(
            new THREE.CircleGeometry(1.2, 8),
            new THREE.MeshBasicMaterial({
              color: 0x000000,
              transparent: true,
              opacity: 0.3,
              depthWrite: false
            })
          );
          shadowSpot.rotation.x = -Math.PI / 2;
          shadowSpot.position.set(pos.x, 0.01, pos.z);
          this.scene.add(shadowSpot);
          chunk.meshes.push(shadowSpot);
        });
      } else {
        const material = new THREE.MeshPhongMaterial({ 
          color: group.color,
          transparent: color === 'Blue',
          opacity: color === 'Blue' ? 0.6 : 1,
          shininess: color === 'Brown' ? 0 : 10
        });

        const instancedMesh = new THREE.InstancedMesh(group.geometry, material, group.count);
        instancedMesh.castShadow = true;
        instancedMesh.receiveShadow = true;
        instancedMesh.userData.isBreakable = true;
        
        const matrix = new THREE.Matrix4();
        group.positions.forEach((pos, i) => {
          // Ajustar la posición Y para los bloques grises
          const y = color === 'Gray' ? pos.y : pos.y;
          matrix.setPosition(pos.x, y, pos.z);
          instancedMesh.setMatrixAt(i, matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;
        this.scene.add(instancedMesh);
        chunk.instancedMeshes.push(instancedMesh);
      }
    }

    this.chunks.set(chunkKey, chunk);
  }

  private getBlockHeight(color: string): number {
    switch(color) {
      case 'Green': // Árboles
        return 0;
      case 'Brown': // Tierra
        return 0;
      case 'Blue': // Agua
        return -0.2;
      case 'Gray': // Montañas
        return 0;
      case 'Red': // Caminos
        return 0;
      default:
        return 0;
    }
  }

  private checkWaterCollision() {
    const isInWater = this.camera.position.y <= this.waterLevel;
    if (this.isUnderwater !== isInWater) {
      this.isUnderwater = isInWater;
      this.updateWaterEffects();
    }
    this.moveSpeed = this.isUnderwater ? 8.0 : 35.0;
    this.friction = this.isUnderwater ? 2.0 : 5.0;
    this.acceleration = this.isUnderwater ? 15.0 : 30.0;
  }

  private updateWaterEffects() {
    if (this.isUnderwater) {
      this.scene.background = this.waterFogColor;
      this.scene.fog = new THREE.FogExp2(0x1E90FF, 0.02);
    } else {
      this.scene.background = this.normalFogColor;
      this.scene.fog = new THREE.FogExp2(0x87CEEB, 0.01);
    }
  }

  private initMinimap() {
    // Create minimap scene
    this.minimapScene = new THREE.Scene();
    this.minimapScene.background = new THREE.Color(0x000000);

    // Calculate the aspect ratio and size
    const minimapSize = 200;
    const aspect = 1;
    const worldSize = Math.max(this.matrix.length, this.matrix[0]?.length || 0);
    const viewSize = worldSize * 1.2; // Slightly larger than the world

    // Create orthographic camera for top-down view
    this.minimapCamera = new THREE.OrthographicCamera(
      -viewSize * aspect / 2,
      viewSize * aspect / 2,
      viewSize / 2,
      -viewSize / 2,
      1,
      1000
    );
    this.minimapCamera.position.set(0, 100, 0);
    this.minimapCamera.lookAt(0, 0, 0);

    // Create minimap renderer
    this.minimapRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.minimapRenderer.setSize(minimapSize, minimapSize);
    this.minimapContainer.nativeElement.appendChild(this.minimapRenderer.domElement);

    // Create player marker
    this.playerMarker = new THREE.Group();

    // Create the base square (red) - Aumentado el tamaño
    const baseGeometry = new THREE.BoxGeometry(4, 0.1, 4);
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.8,
      depthTest: false
    });
    const baseSquare = new THREE.Mesh(baseGeometry, baseMaterial);
    baseSquare.position.y = 0.1;
    this.playerMarker.add(baseSquare);

    // Create the directional arrow - Aumentado el tamaño
    const arrowShape = new THREE.Shape();
    arrowShape.moveTo(0, 4);
    arrowShape.lineTo(-1, 0);
    arrowShape.lineTo(1, 0);
    arrowShape.lineTo(0, 4);

    const arrowGeometry = new THREE.ShapeGeometry(arrowShape);
    const arrowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      depthTest: false,
      transparent: true,
      opacity: 0.9
    });
    
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    arrow.rotation.x = -Math.PI / 2;
    arrow.position.y = 0.2;
    this.playerMarker.add(arrow);

    // Add a glow effect
    const glowGeometry = new THREE.BoxGeometry(5, 0.1, 5);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.3,
      depthTest: false
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = 0.05;
    this.playerMarker.add(glow);

    this.minimapScene.add(this.playerMarker);

    // Add minimap blocks
    this.generateMinimapBlocks();
  }

  private generateMinimapBlocks() {
    if (!this.matrix || this.matrix.length === 0) return;

    const offsetX = -this.matrix.length / 2;
    const offsetZ = -this.matrix[0].length / 2;

    // Create a merged geometry for each color
    const blocksByColor: { [key: string]: THREE.Vector3[] } = {};

    for (let x = 0; x < this.matrix.length; x++) {
      for (let z = 0; z < this.matrix[x].length; z++) {
        const cell = this.matrix[x][z];
        if (cell.state === 1) {
          if (!blocksByColor[cell.color]) {
            blocksByColor[cell.color] = [];
          }
          blocksByColor[cell.color].push(
            new THREE.Vector3(x + offsetX, 0, z + offsetZ)
          );
        }
      }
    }

    // Create merged meshes for each color with brighter colors for better visibility
    Object.entries(blocksByColor).forEach(([color, positions]) => {
      const geometry = new THREE.BoxGeometry(1, 0.1, 1);
      const baseColor = new THREE.Color(this.colorMap[color]);
      // Make colors slightly darker for better contrast with the player marker
      baseColor.multiplyScalar(0.8);
      const material = new THREE.MeshBasicMaterial({ 
        color: baseColor,
        transparent: color === 'Blue',
        opacity: color === 'Blue' ? 0.6 : 0.7
      });
      
      positions.forEach(position => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        this.minimapScene.add(mesh);
      });
    });
  }

  private updateMinimap() {
    if (this.playerMarker && this.camera) {
      // Update player marker position
      this.playerMarker.position.x = this.camera.position.x;
      this.playerMarker.position.z = this.camera.position.z;

      // Update player marker rotation to match camera direction
      this.playerMarker.rotation.y = -this.camera.rotation.y;

      // Make the minimap camera follow the player
      this.minimapCamera.position.x = this.camera.position.x;
      this.minimapCamera.position.z = this.camera.position.z;
      this.minimapCamera.lookAt(
        this.camera.position.x,
        0,
        this.camera.position.z
      );

      // Render minimap
      this.minimapRenderer.render(this.minimapScene, this.minimapCamera);
    }
  }

  private createPlayer() {
    this.player = new THREE.Group();
    
    // Cuerpo del personaje
    const bodyGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x3366ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.1;
    this.player.add(body);

    // Cabeza
    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.9;
    this.player.add(head);

    // Piernas
    const legGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x3366ff });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, 0.3, 0);
    this.player.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, 0.3, 0);
    this.player.add(rightLeg);

    // Brazos
    const armGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x3366ff });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 1.3, 0);
    this.player.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 1.3, 0);
    this.player.add(rightArm);

    this.player.position.y = this.playerHeight;
    this.scene.add(this.player);
  }

  private updatePlayerAnimation() {
    if (!this.player) return;

    const walkingSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    const walkingCycle = performance.now() * 0.01;

    // Animar piernas mientras camina
    this.player.children.forEach((child, index) => {
      if (index >= 2 && index <= 3) { // Piernas
        if (walkingSpeed > 0.1) {
          child.position.y = 0.3 + Math.sin(walkingCycle + (index === 2 ? 0 : Math.PI)) * 0.2;
        } else {
          child.position.y = 0.3;
        }
      }
      if (index >= 4 && index <= 5) { // Brazos
        if (walkingSpeed > 0.1) {
          child.position.y = 1.3 + Math.sin(walkingCycle + (index === 4 ? Math.PI : 0)) * 0.2;
        } else {
          child.position.y = 1.3;
        }
      }
    });
  }

  private updateCameraPosition() {
    if (!this.player) return;

    // Calcular la rotación del jugador basada en la dirección del movimiento
    if (this.moveForward || this.moveBackward || this.moveLeft || this.moveRight) {
      const angle = Math.atan2(this.direction.x, this.direction.z);
      this.playerRotation = angle;
    }
    this.player.rotation.y = this.playerRotation;

    // Actualizar la posición del jugador
    this.player.position.x = this.camera.position.x;
    this.player.position.z = this.camera.position.z;
    this.player.position.y = this.camera.position.y - this.playerHeight;

    // Calcular la posición objetivo de la cámara
    this.targetPosition.copy(this.player.position);
    this.targetPosition.y += this.cameraOffset.y;
    
    // Calcular el offset de la cámara basado en la rotación del jugador
    const offsetX = Math.sin(this.camera.rotation.y) * this.cameraOffset.z;
    const offsetZ = Math.cos(this.camera.rotation.y) * this.cameraOffset.z;
    
    this.targetPosition.x -= offsetX;
    this.targetPosition.z -= offsetZ;
    
    // Hacer que el personaje sea transparente cuando miras hacia abajo
    this.updatePlayerTransparency();
  }
  
  private updatePlayerTransparency() {
    if (!this.player) return;
    
    // Obtener el ángulo de rotación X de la cámara (mirar arriba/abajo)
    const cameraRotationX = this.camera.rotation.x;
    
    // Calcular la transparencia basada en el ángulo de la cámara
    // Cuando miras hacia abajo (cameraRotationX > 0), el personaje se vuelve transparente
    let opacity = 1.0;
    
    if (cameraRotationX > 0) {
      // Aumentar la transparencia cuanto más miras hacia abajo
      // Limitar a un máximo de 0.2 de opacidad (0.8 de transparencia)
      opacity = Math.max(0.2, 1.0 - (cameraRotationX * 2));
    }
    
    // Aplicar la transparencia a todos los materiales del personaje
    this.player.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
        child.material.transparent = opacity < 1.0;
        child.material.opacity = opacity;
      }
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now();
    const delta = (time - this.prevTime) / 1000;
    
    if (this.isLocked) {
      // Física de movimiento original
      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.velocity.y -= this.gravity * delta;

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * this.moveSpeed * delta;
      }
      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * this.moveSpeed * delta;
      }

      this.controls.moveRight(-this.velocity.x * delta);
      this.controls.moveForward(-this.velocity.z * delta);
      this.camera.position.y += this.velocity.y * delta;

      // Mantener la cámara dentro de límites más amplios para vuelo
      this.camera.position.y = Math.max(2, Math.min(100, this.camera.position.y));

      // Check water collision
      this.checkWaterCollision();

      // Detectar cuando el jugador toca el suelo
      if (this.camera.position.y <= 2) {
        this.velocity.y = 0;
        this.camera.position.y = 2;
        this.canJump = true;
      }

      // Actualizar animaciones y posición del jugador
      this.updatePlayerAnimation();
      this.updateCameraPosition();

      // Actualizar selección de bloques
      this.updateBlockSelection();
      
      // Actualizar chunks
      this.updateChunks();

      // Actualizar animales
      this.updateAnimals(delta);
      
      // Guardar el estado del juego periódicamente
      this.saveGameState();
    }

    this.prevTime = time;
    this.renderer.render(this.scene, this.camera);
    this.updateMinimap();
  }

  private checkWorldBounds() {
    // Limitar la posición X
    if (this.camera.position.x < this.worldBounds.minX) {
      this.camera.position.x = this.worldBounds.minX;
      this.velocity.x = 0;
    } else if (this.camera.position.x > this.worldBounds.maxX) {
      this.camera.position.x = this.worldBounds.maxX;
      this.velocity.x = 0;
    }

    // Limitar la posición Z
    if (this.camera.position.z < this.worldBounds.minZ) {
      this.camera.position.z = this.worldBounds.minZ;
      this.velocity.z = 0;
    } else if (this.camera.position.z > this.worldBounds.maxZ) {
      this.camera.position.z = this.worldBounds.maxZ;
      this.velocity.z = 0;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;
      case 'Space':
        if (this.canJump) {
          this.velocity.y = this.jumpForce;
          this.canJump = false;
        }
        break;
      case 'ShiftLeft':
        if (this.isUnderwater) {
          this.velocity.y = -this.jumpForce * 0.5;
        }
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private generateUnderground() {
    const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: 0x3B2616, // Marrón oscuro para tierra
      flatShading: true
    });

    // Crear varias capas de bloques subterráneos
    for (let y = -1; y >= -3; y--) {
      for (let x = -this.matrix.length / 2; x < this.matrix.length / 2; x++) {
        for (let z = -this.matrix[0].length / 2; z < this.matrix[0].length / 2; z++) {
          const block = new THREE.Mesh(groundGeometry, groundMaterial);
          block.position.set(x, y, z);
          block.userData.isBreakable = true;
          block.userData.type = 'underground';
          this.blocks.push(block);
          this.scene.add(block);
        }
      }
    }
  }

  private updateBlockSelection() {
    if (!this.isLocked) return;

    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.blocks);

    if (this.blockOutline) {
      if (intersects.length > 0 && intersects[0].distance <= this.MAX_REACH) {
        const block = intersects[0].object as THREE.Mesh;
        this.selectedBlock = block;
        this.blockOutline.position.copy(block.position);
        this.blockOutline.visible = true;
      } else {
        this.selectedBlock = null;
        this.blockOutline.visible = false;
      }
    }
  }

  private breakBlock() {
    if (this.selectedBlock && this.selectedBlock.userData.isBreakable) {
      this.scene.remove(this.selectedBlock);
      this.blocks = this.blocks.filter(block => block !== this.selectedBlock);
      this.selectedBlock = null;
      if (this.blockOutline) {
        this.blockOutline.visible = false;
      }
    }
  }

  private placeBlock() {
    if (this.selectedBlock) {
      const intersect = this.raycaster.intersectObjects(this.blocks)[0];
      if (intersect) {
        const normal = intersect.face?.normal;
        if (normal) {
          const position = this.selectedBlock.position.clone();
          position.add(normal);

          // Verificar si ya existe un bloque en esa posición
          const blockExists = this.blocks.some(block => 
            block.position.equals(position)
          );

          if (!blockExists) {
            const newBlock = new THREE.Mesh(
              new THREE.BoxGeometry(1, 1, 1),
              new THREE.MeshPhongMaterial({
                color: 0x3B2616,
                flatShading: true
              })
            );
            newBlock.position.copy(position);
            newBlock.userData.isBreakable = true;
            newBlock.userData.type = 'placed';
            this.blocks.push(newBlock);
            this.scene.add(newBlock);
          }
        }
      }
    }
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.isLocked) return;

    if (event.button === 0) { // Click izquierdo
      this.breakBlock();
    } else if (event.button === 2) { // Click derecho
      this.placeBlock();
    }
  }

  @HostListener('window:contextmenu', ['$event'])
  onContextMenu(event: Event) {
    // Prevenir menú contextual con click derecho
    event.preventDefault();
  }

  private generateAnimals() {
    // Limpiar animales existentes
    this.animals.forEach(animal => {
      this.scene.remove(animal.mesh);
    });
    this.animals = [];
    
    // Generar nuevos animales
    const numAnimals = Math.min(this.MAX_ANIMALS, Math.floor(Math.random() * 15) + 5);
    
    for (let i = 0; i < numAnimals; i++) {
      const type = this.ANIMAL_TYPES[Math.floor(Math.random() * this.ANIMAL_TYPES.length)];
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      
      this.createAnimal(type, x, z);
    }
    
    // Asegurar que haya al menos un T-Rex en el mundo
    const hasTrex = this.animals.some(animal => animal.type === 'trex');
    if (!hasTrex) {
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      this.createAnimal('trex', x, z);
    }
  }

  private createAnimal(type: string, x: number, z: number) {
    const animal: Animal = {
      mesh: new THREE.Group(),
      type: type as 'cow' | 'sheep' | 'pig' | 'chicken' | 'trex',
      position: new THREE.Vector3(x, 0, z),
      velocity: new THREE.Vector3(0, 0, 0),
      target: null,
      state: 'idle',
      lastStateChange: performance.now(),
      health: 100,
      isAlive: true,
      canSwim: this.ANIMAL_CAN_SWIM[type as keyof typeof this.ANIMAL_CAN_SWIM]
    };
    
    // Crear el cuerpo del animal
    const bodyGeometry = new THREE.BoxGeometry(1, 0.8, 1.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].body,
      shininess: 5
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    animal.mesh.add(body);
    
    // Crear la cabeza
    const headGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].face,
      shininess: 5
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.7, 0.8);
    animal.mesh.add(head);
    
    // Crear las patas
    const legGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const legMaterial = new THREE.MeshPhongMaterial({ 
      color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].legs,
      shininess: 5
    });
    
    // Patas delanteras
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(-0.4, 0.3, 0.5);
    animal.mesh.add(frontLeftLeg);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.4, 0.3, 0.5);
    animal.mesh.add(frontRightLeg);
    
    // Patas traseras
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.4, 0.3, -0.5);
    animal.mesh.add(backLeftLeg);
    
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(0.4, 0.3, -0.5);
    animal.mesh.add(backRightLeg);
    
    // Añadir detalles según el tipo de animal
    if (type === 'cow') {
      // Manchas para la vaca
      const spotGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const spotMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
      
      for (let i = 0; i < 5; i++) {
        const spot = new THREE.Mesh(spotGeometry, spotMaterial);
        spot.position.set(
          (Math.random() - 0.5) * 0.8,
          0.4 + Math.random() * 0.3,
          (Math.random() - 0.5) * 1.2
        );
        animal.mesh.add(spot);
      }
    } else if (type === 'sheep') {
      // Lana para la oveja
      const woolGeometry = new THREE.BoxGeometry(1.2, 0.9, 1.7);
      const woolMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        shininess: 10,
        flatShading: true
      });
      const wool = new THREE.Mesh(woolGeometry, woolMaterial);
      wool.position.set(0, 0.5, 0);
      animal.mesh.add(wool);
    } else if (type === 'pig') {
      // Hocico para el cerdo
      const snoutGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.3);
      const snoutMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].nose,
        shininess: 5
      });
      const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
      snout.position.set(0, 0.6, 1.0);
      animal.mesh.add(snout);
    } else if (type === 'chicken') {
      // Pico para el pollo
      const beakGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
      const beakMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].beak,
        shininess: 10
      });
      const beak = new THREE.Mesh(beakGeometry, beakMaterial);
      beak.position.set(0, 0.7, 1.0);
      animal.mesh.add(beak);
      
      // Alas para el pollo
      const wingGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.3);
      const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].body,
        shininess: 5
      });
      
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.set(-0.5, 0.5, 0);
      animal.mesh.add(leftWing);
      
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing.position.set(0.5, 0.5, 0);
      animal.mesh.add(rightWing);
    } else if (type === 'trex') {
      // Cuerpo más grande para el T-Rex
      body.scale.set(1.5, 1.2, 2.0);
      
      // Cabeza más grande y alargada
      head.scale.set(1.2, 0.8, 1.5);
      head.position.set(0, 0.9, 1.2);
      
      // Mandíbula para el T-Rex
      const jawGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.8);
      const jawMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].teeth,
        shininess: 5
      });
      const jaw = new THREE.Mesh(jawGeometry, jawMaterial);
      jaw.position.set(0, 0.5, 1.5);
      animal.mesh.add(jaw);
      
      // Dientes para el T-Rex
      const toothGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
      const toothMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        shininess: 20
      });
      
      for (let i = 0; i < 8; i++) {
        const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
        tooth.position.set(
          -0.3 + (i * 0.08),
          0.3,
          1.5
        );
        animal.mesh.add(tooth);
      }
      
      // Cola larga para el T-Rex
      const tailGeometry = new THREE.BoxGeometry(0.4, 0.4, 2.0);
      const tailMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].body,
        shininess: 5
      });
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      tail.position.set(0, 0.4, -1.5);
      animal.mesh.add(tail);
      
      // Brazos pequeños para el T-Rex
      const armGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
      const armMaterial = new THREE.MeshPhongMaterial({ 
        color: this.ANIMAL_COLORS[type as keyof typeof this.ANIMAL_COLORS].body,
        shininess: 5
      });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.6, 0.5, 0.5);
      animal.mesh.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.6, 0.5, 0.5);
      animal.mesh.add(rightArm);
      
      // Patas más grandes para el T-Rex
      frontLeftLeg.scale.set(1.5, 1.5, 1.5);
      frontRightLeg.scale.set(1.5, 1.5, 1.5);
      backLeftLeg.scale.set(1.5, 1.5, 1.5);
      backRightLeg.scale.set(1.5, 1.5, 1.5);
    }
    
    // Escalar el animal según su tipo
    animal.mesh.scale.set(
      this.ANIMAL_SCALES[type as keyof typeof this.ANIMAL_SCALES],
      this.ANIMAL_SCALES[type as keyof typeof this.ANIMAL_SCALES],
      this.ANIMAL_SCALES[type as keyof typeof this.ANIMAL_SCALES]
    );
    
    // Posicionar el animal
    animal.mesh.position.copy(animal.position);
    
    // Añadir el animal a la escena
    this.scene.add(animal.mesh);
    
    // Añadir el animal a la lista
    this.animals.push(animal);
  }

  private isWaterAt(x: number, z: number): boolean {
    // Convertir coordenadas del mundo a coordenadas de la matriz
    const matrixX = Math.floor(x + this.matrix.length / 2);
    const matrixZ = Math.floor(z + this.matrix[0].length / 2);
    
    // Verificar límites
    if (matrixX < 0 || matrixX >= this.matrix.length || matrixZ < 0 || matrixZ >= this.matrix[0].length) {
      return false;
    }
    
    return this.matrix[matrixX][matrixZ].color === 'Blue';
  }

  private updateAnimals(delta: number) {
    this.animalUpdateInterval += delta;
    
    if (this.animalUpdateInterval < this.ANIMAL_UPDATE_FREQUENCY) {
      return;
    }
    
    this.animalUpdateInterval = 0;
    const currentTime = performance.now();
    
    // Actualizar cada animal
    this.animals.forEach((animal: Animal) => {
      if (!animal.isAlive) return;
      
      // Verificar si el animal está en el agua
      const isInWater = this.isWaterAt(animal.position.x, animal.position.z);
      
      // Si el animal no puede nadar y está en el agua, hacerlo retroceder
      if (isInWater && !animal.canSwim) {
        animal.state = 'running';
        // Encontrar la tierra más cercana
        const escapeDirection = new THREE.Vector3();
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
          const testX = animal.position.x + Math.cos(angle) * 2;
          const testZ = animal.position.z + Math.sin(angle) * 2;
          if (!this.isWaterAt(testX, testZ)) {
            escapeDirection.set(Math.cos(angle), 0, Math.sin(angle));
            break;
          }
        }
        animal.target = new THREE.Vector3(
          animal.position.x + escapeDirection.x * 5,
          0,
          animal.position.z + escapeDirection.z * 5
        );
      }
      
      // Comportamiento especial para el T-Rex
      if (animal.type === 'trex') {
        this.updateTRexBehavior(animal, currentTime);
      } else {
        this.updateNormalAnimalBehavior(animal, currentTime, isInWater);
      }
      
      // Actualizar posición y animaciones
      this.updateAnimalPosition(animal, delta, isInWater);
      this.updateAnimalAnimations(animal);
    });
  }

  private updateTRexBehavior(animal: Animal, currentTime: number) {
    const distanceToPlayer = animal.position.distanceTo(this.camera.position);
    const trexDetectionRange = 30;
    const isPlayerInRange = distanceToPlayer < trexDetectionRange;
    
    // Buscar presas cercanas
    let nearestPrey = this.findNearestPrey(animal);
    
    if (currentTime - animal.lastStateChange > 3000) {
        if (isPlayerInRange && Math.random() < 0.6) {
            animal.state = 'running';
            animal.target = this.camera.position.clone();
        } else if (nearestPrey && nearestPrey.position.distanceTo(animal.position) < 20) {
            animal.state = 'running';
            animal.target = nearestPrey.position.clone();
        } else {
            this.setRandomBehavior(animal);
        }
        animal.lastStateChange = currentTime;
    }
    
    // Atacar presas cercanas
    if (nearestPrey && animal.position.distanceTo(nearestPrey.position) < 2) {
        nearestPrey.health -= 20 * (1/60); // Daño por segundo
        if (nearestPrey.health <= 0) {
            nearestPrey.isAlive = false;
            nearestPrey.mesh.visible = false;
            animal.state = 'eating';
            animal.target = null;
            animal.lastStateChange = currentTime;
        }
    }
  }

  private updateNormalAnimalBehavior(animal: Animal, currentTime: number, isInWater: boolean) {
    const distanceToPlayer = animal.position.distanceTo(this.camera.position);
    const isPlayerNearby = distanceToPlayer < 10;
    
    if (currentTime - animal.lastStateChange > 5000) {
        if (isPlayerNearby && Math.random() < 0.7) {
            // Huir del jugador
            animal.state = 'running';
            const escapeDirection = new THREE.Vector3()
                .subVectors(animal.position, this.camera.position)
                .normalize();
            
            // Si el animal no puede nadar, verificar que no huya hacia el agua
            if (!animal.canSwim) {
                const targetX = animal.position.x + escapeDirection.x * 10;
                const targetZ = animal.position.z + escapeDirection.z * 10;
                if (this.isWaterAt(targetX, targetZ)) {
                    // Buscar una dirección alternativa
                    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                        const testX = animal.position.x + Math.cos(angle) * 10;
                        const testZ = animal.position.z + Math.sin(angle) * 10;
                        if (!this.isWaterAt(testX, testZ)) {
                            escapeDirection.set(Math.cos(angle), 0, Math.sin(angle));
                            break;
                        }
                    }
                }
            }
            
            animal.target = new THREE.Vector3(
                animal.position.x + escapeDirection.x * 10,
                0,
                animal.position.z + escapeDirection.z * 10
            );
        } else {
            this.setRandomBehavior(animal);
        }
        animal.lastStateChange = currentTime;
    }
  }

  private setRandomBehavior(animal: Animal) {
    const states: ('idle' | 'walking' | 'eating')[] = ['idle', 'walking', 'eating'];
    animal.state = states[Math.floor(Math.random() * states.length)];
    
    if (animal.state === 'walking') {
        // Buscar un punto seguro para caminar
        let targetFound = false;
        let attempts = 0;
        const maxAttempts = 8;
        
        while (!targetFound && attempts < maxAttempts) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 5 + Math.random() * 5;
            const targetX = animal.position.x + Math.cos(angle) * distance;
            const targetZ = animal.position.z + Math.sin(angle) * distance;
            
            // Verificar si el destino es seguro (no hay agua o el animal puede nadar)
            if (animal.canSwim || !this.isWaterAt(targetX, targetZ)) {
                animal.target = new THREE.Vector3(targetX, 0, targetZ);
                targetFound = true;
            }
            attempts++;
        }
        
        // Si no se encontró un punto seguro, quedarse quieto
        if (!targetFound) {
            animal.state = 'idle';
            animal.target = null;
        }
    } else {
        animal.target = null;
    }
  }

  private updateAnimalPosition(animal: Animal, delta: number, isInWater: boolean) {
    if (animal.state === 'idle' || animal.state === 'eating') {
        animal.velocity.set(0, 0, 0);
    } else if (animal.target) {
        const direction = new THREE.Vector3()
            .subVectors(animal.target, animal.position)
            .normalize();
            
        const speed = this.ANIMAL_SPEEDS[animal.type as keyof typeof this.ANIMAL_SPEEDS] * 
            (animal.state === 'running' ? 2 : 1) *
            (isInWater ? 0.5 : 1); // Movimiento más lento en el agua
        
        animal.velocity.copy(direction).multiplyScalar(speed);
        
        // Rotar el animal
        const angle = Math.atan2(direction.x, direction.z);
        animal.mesh.rotation.y = angle;
        
        // Verificar si llegó al objetivo
        if (animal.position.distanceTo(animal.target) < 0.5) {
            animal.target = null;
            animal.state = 'idle';
            animal.lastStateChange = performance.now();
        }
    }
    
    // Actualizar posición
    const newPosition = animal.position.clone().add(animal.velocity.clone().multiplyScalar(delta));
    
    // Verificar si la nueva posición es segura
    if (animal.canSwim || !this.isWaterAt(newPosition.x, newPosition.z)) {
        animal.position.copy(newPosition);
        animal.mesh.position.copy(animal.position);
    }
  }

  private findNearestPrey(predator: Animal): Animal | null {
    let nearestPrey: Animal | null = null;
    let nearestDistance = Infinity;
    
    this.animals.forEach(animal => {
        if (animal !== predator && animal.isAlive && animal.type !== 'trex') {
            const distance = predator.position.distanceTo(animal.position);
            if (distance < nearestDistance) {
                nearestPrey = animal;
                nearestDistance = distance;
            }
        }
    });
    
    return nearestPrey;
  }

  private updateAnimalAnimations(animal: Animal) {
    if (!animal.mesh) return;

    const walkingSpeed = Math.sqrt(animal.velocity.x * animal.velocity.x + animal.velocity.z * animal.velocity.z);
    const walkingCycle = performance.now() * 0.01;

    // Animar piernas mientras camina
    animal.mesh.children.forEach((child, index) => {
      if (index >= 2 && index <= 5) { // Patas
        const offset = index % 2 === 0 ? 0 : Math.PI;
        if (walkingSpeed > 0.1) {
          child.position.y = 0.3 + Math.sin(walkingCycle + offset) * 0.2;
        } else {
          child.position.y = 0.3;
        }
      }
    });
  }

  private saveGameState() {
    const currentTime = performance.now();
    if (currentTime - this.lastSaveTime < this.SAVE_INTERVAL) {
      return; // No guardar si no ha pasado suficiente tiempo
    }
    
    this.lastSaveTime = currentTime;
    this.savePlayerPosition();
    this.saveAnimalsData();
  }
  
  private savePlayerPosition() {
    if (!this.camera) return;
    
    const playerData = {
      position: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      },
      rotation: {
        x: this.camera.rotation.x,
        y: this.camera.rotation.y,
        z: this.camera.rotation.z
      },
      velocity: {
        x: this.velocity.x,
        y: this.velocity.y,
        z: this.velocity.z
      },
      isUnderwater: this.isUnderwater,
      canJump: this.canJump
    };
    
    localStorage.setItem(this.PLAYER_POSITION_KEY, JSON.stringify(playerData));
  }
  
  private loadPlayerPosition() {
    try {
      const savedData = localStorage.getItem(this.PLAYER_POSITION_KEY);
      if (savedData) {
        const playerData = JSON.parse(savedData);
        
        // Restaurar la posición y rotación de la cámara
        if (this.camera && playerData.position) {
          this.camera.position.set(
            playerData.position.x,
            playerData.position.y,
            playerData.position.z
          );
          
          if (playerData.rotation) {
            this.camera.rotation.set(
              playerData.rotation.x,
              playerData.rotation.y,
              playerData.rotation.z
            );
          }
          
          // Restaurar la velocidad y estado
          if (playerData.velocity) {
            this.velocity.set(
              playerData.velocity.x,
              playerData.velocity.y,
              playerData.velocity.z
            );
          }
          
          this.isUnderwater = playerData.isUnderwater || false;
          this.canJump = playerData.canJump || true;
          
          // Actualizar efectos de agua si es necesario
          this.updateWaterEffects();
        }
      }
    } catch (error) {
      console.error('Error loading player position:', error);
    }
  }
  
  private saveAnimalsData() {
    if (!this.animals || this.animals.length === 0) return;
    
    const animalsData = this.animals.map(animal => ({
      type: animal.type,
      position: {
        x: animal.position.x,
        y: animal.position.y,
        z: animal.position.z
      },
      velocity: {
        x: animal.velocity.x,
        y: animal.velocity.y,
        z: animal.velocity.z
      },
      state: animal.state,
      lastStateChange: animal.lastStateChange,
      health: animal.health,
      isAlive: animal.isAlive
    }));
    
    localStorage.setItem(this.ANIMALS_DATA_KEY, JSON.stringify(animalsData));
  }
  
  private loadAnimalsData() {
    try {
      const savedData = localStorage.getItem(this.ANIMALS_DATA_KEY);
      if (savedData) {
        const animalsData = JSON.parse(savedData);
        
        // Limpiar animales existentes
        this.animals.forEach(animal => {
          this.scene.remove(animal.mesh);
        });
        this.animals = [];
        
        // Crear nuevos animales con los datos guardados
        animalsData.forEach((data: any) => {
          this.createAnimal(
            data.type,
            data.position.x,
            data.position.z
          );
          
          // Actualizar el último animal creado con los datos guardados
          const animal = this.animals[this.animals.length - 1];
          if (animal) {
            animal.position.set(
              data.position.x,
              data.position.y,
              data.position.z
            );
            animal.velocity.set(
              data.velocity.x,
              data.velocity.y,
              data.velocity.z
            );
            animal.state = data.state;
            animal.lastStateChange = data.lastStateChange;
            animal.health = data.health;
            animal.isAlive = data.isAlive;
            
            // Actualizar la posición del mesh
            animal.mesh.position.copy(animal.position);
          }
        });
      } else {
        // Si no hay datos guardados, generar animales aleatorios
        this.generateAnimals();
      }
    } catch (error) {
      console.error('Error loading animals data:', error);
      // En caso de error, generar animales aleatorios
      this.generateAnimals();
    }
  }
} 