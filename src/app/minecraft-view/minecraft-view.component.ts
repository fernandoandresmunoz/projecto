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

@Component({
  selector: 'app-minecraft-view',
  template: `
    <div #rendererContainer></div>
    <div #minimapContainer class="minimap"></div>
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

  private readonly CHUNK_SIZE = 16;
  private readonly RENDER_DISTANCE = 4;
  private chunks: Map<string, THREE.Group> = new Map();
  private lastChunkPosition = new THREE.Vector2();
  private cameraStabilizer = new THREE.Vector3();
  private smoothDelta = 0.1;

  private treePositions: THREE.Vector3[] = [];
  private readonly TREE_COLLISION_RADIUS = 0.8;
  private readonly PLAYER_RADIUS = 0.4;

  private geometryCache: { [key: string]: THREE.BufferGeometry } = {};
  private materialCache: { [key: string]: THREE.Material } = {};
  private instancedMeshes: { [key: string]: THREE.InstancedMesh } = {};
  private readonly MAX_INSTANCES = 10000;

  private lastMinimapUpdate = 0;

  private needsRender = true;

  ngOnInit() {
    this.loadMatrixFromLocalStorage();
    this.initScene();
    this.initControls();
    this.generateWorld();
    this.animate();
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

    // Optimizar el renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump'  // Mejor balance entre calidad y rendimiento
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Optimizar el render loop
    this.renderer.sortObjects = false;
    this.renderer.physicallyCorrectLights = false;
    
    // Optimizar sombras
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Luz direccional simple
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1);
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

    // Initialize minimap
    this.initMinimap();

    // Añadir niebla para ocultar pop-in de chunks
    const fog = new THREE.FogExp2(0x87CEEB, 0.008);
    this.scene.fog = fog;
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

  private createGeometryCache() {
    // Crear y cachear todas las geometrías
    this.geometryCache['tree_trunk'] = new THREE.BoxGeometry(0.3, 2.0, 0.3);
    this.geometryCache['tree_leaves'] = new THREE.ConeGeometry(1.0, 2.5, 8);
    this.geometryCache['ground'] = new THREE.BoxGeometry(1, 0.3, 1);
    this.geometryCache['water'] = new THREE.BoxGeometry(1, 0.2, 1);
    this.geometryCache['mountain'] = new THREE.BoxGeometry(1, 0.3, 1);
    this.geometryCache['path'] = new THREE.BoxGeometry(1, 0.3, 1);

    // Optimizar las geometrías
    Object.values(this.geometryCache).forEach(geometry => {
      geometry.computeBoundingSphere();
      geometry.computeBoundingBox();
    });
  }

  private createMaterialCache() {
    // Crear y cachear todos los materiales
    this.materialCache['trunk'] = new THREE.MeshPhongMaterial({ 
      color: 0x3D2410,  // Marrón oscuro para troncos
      shininess: 5,
      flatShading: true
    });

    this.materialCache['leaves'] = new THREE.MeshPhongMaterial({ 
      color: this.colorMap['Green'],  // Verde para hojas
      shininess: 5,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materialCache['ground'] = new THREE.MeshPhongMaterial({ 
      color: this.colorMap['Brown'],  // Marrón para tierra
      shininess: 0,
      flatShading: true
    });

    this.materialCache['water'] = new THREE.MeshPhongMaterial({ 
      color: this.colorMap['Blue'],  // Azul para agua
      transparent: true,
      opacity: 0.6,
      shininess: 30
    });

    this.materialCache['mountain'] = new THREE.MeshPhongMaterial({ 
      color: this.colorMap['Gray'],  // Gris para montañas
      shininess: 10,
      flatShading: true
    });

    this.materialCache['path'] = new THREE.MeshPhongMaterial({ 
      color: this.colorMap['Red'],  // Marrón claro para caminos
      shininess: 0,
      flatShading: true
    });
  }

  private generateWorld() {
    if (!this.matrix || this.matrix.length === 0) return;

    this.createGeometryCache();
    this.createMaterialCache();

    // Preparar matrices de transformación para instancing
    const matrix = new THREE.Matrix4();
    const transforms: { [key: string]: THREE.Matrix4[] } = {
      'trunk': [],
      'leaves': [],
      'ground': [],
      'water': [],
      'mountain': [],
      'path': []
    };

    const offsetX = -this.matrix.length / 2;
    const offsetZ = -this.matrix[0].length / 2;

    // Recolectar todas las transformaciones primero
    for (let x = 0; x < this.matrix.length; x++) {
      for (let z = 0; z < this.matrix[x].length; z++) {
        const cell = this.matrix[x][z];
        if (cell.state === 1) {
          const worldX = x + offsetX;
          const worldZ = z + offsetZ;
          const height = this.getBlockHeight(cell.color);

          switch(cell.color) {
            case 'Green':
              // Guardar posición para colisiones
              this.treePositions.push(new THREE.Vector3(worldX, 0, worldZ));
              
              // Tronco
              matrix.setPosition(worldX, height + 1.0, worldZ);
              transforms['trunk'].push(matrix.clone());
              
              // Hojas
              matrix.setPosition(worldX, height + 2.8, worldZ);
              transforms['leaves'].push(matrix.clone());
              break;
            case 'Brown':
              matrix.setPosition(worldX, height, worldZ);
              transforms['ground'].push(matrix.clone());
              break;
            case 'Blue':
              matrix.setPosition(worldX, height, worldZ);
              transforms['water'].push(matrix.clone());
              break;
            case 'Gray':
              matrix.setPosition(worldX, height, worldZ);
              transforms['mountain'].push(matrix.clone());
              break;
            case 'Red':
              matrix.setPosition(worldX, height, worldZ);
              transforms['path'].push(matrix.clone());
              break;
          }
        }
      }
    }

    // Crear instanced meshes
    Object.entries(transforms).forEach(([key, matrices]) => {
      if (matrices.length === 0) return;

      const geometry = this.geometryCache[key === 'trunk' ? 'tree_trunk' : 
                                       key === 'leaves' ? 'tree_leaves' : key];
      const material = this.materialCache[key];
      
      const instancedMesh = new THREE.InstancedMesh(
        geometry,
        material,
        matrices.length
      );

      // Configurar sombras
      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;

      matrices.forEach((matrix, i) => {
        instancedMesh.setMatrixAt(i, matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      this.scene.add(instancedMesh);
      this.instancedMeshes[key] = instancedMesh;
    });
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
    } else {
      this.scene.background = this.normalFogColor;
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
  }

  private animate() {
    const currentTime = performance.now();
    
    // Usar requestAnimationFrame más eficientemente
    if (this.isLocked) {
      const delta = Math.min((currentTime - this.prevTime) / 1000, 0.1);
      this.updateGameState(delta);
    }

    // Renderizar solo si es necesario
    if (this.isLocked || this.needsRender) {
      this.renderer.render(this.scene, this.camera);
      this.needsRender = false;
    }

    // Actualizar minimapa con menos frecuencia
    if (currentTime - this.lastMinimapUpdate > 100) { // cada 100ms
      this.updateMinimap();
      this.lastMinimapUpdate = currentTime;
    }

    this.prevTime = currentTime;
    requestAnimationFrame(() => this.animate());
  }

  private updateGameState(delta: number) {
    // Física y movimiento
    this.velocity.x -= this.velocity.x * this.friction * delta;
    this.velocity.z -= this.velocity.z * this.friction * delta;
    this.velocity.y -= this.gravity * delta;

    if (this.moveForward || this.moveBackward || this.moveLeft || this.moveRight) {
      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      this.velocity.z -= this.direction.z * this.moveSpeed * delta;
      this.velocity.x -= this.direction.x * this.moveSpeed * delta;
    }

    // Colisiones y movimiento
    const newPosition = new THREE.Vector3(
      this.camera.position.x - this.velocity.x * delta,
      this.camera.position.y,
      this.camera.position.z - this.velocity.z * delta
    );

    if (!this.checkTreeCollisions(newPosition)) {
      this.controls.moveRight(-this.velocity.x * delta);
      this.controls.moveForward(-this.velocity.z * delta);
    } else {
      this.velocity.x *= -0.5;
      this.velocity.z *= -0.5;
    }

    this.camera.position.y += this.velocity.y * delta;
    this.camera.position.y = Math.max(2, Math.min(100, this.camera.position.y));

    // Actualizaciones de estado
    this.checkWorldBounds();
    this.checkWaterCollision();
    
    // Solo actualizar chunks si nos movimos lo suficiente
    if (this.hasMovedSignificantly()) {
      this.updateChunks();
    }

    if (this.camera.position.y < 2 && !this.isUnderwater) {
      this.velocity.y = 0;
      this.camera.position.y = 2;
      this.canJump = true;
    }

    this.updatePlayerAnimation();
    this.updateCameraPosition();
  }

  private hasMovedSignificantly(): boolean {
    const moveThreshold = 1.0; // unidades de mundo
    return Math.abs(this.camera.position.x - this.lastChunkPosition.x) > moveThreshold ||
           Math.abs(this.camera.position.z - this.lastChunkPosition.y) > moveThreshold;
  }

  private updateChunks() {
    const currentChunkX = Math.floor(this.camera.position.x / this.CHUNK_SIZE);
    const currentChunkZ = Math.floor(this.camera.position.z / this.CHUNK_SIZE);
    
    // Solo actualizar chunks si nos movimos a un nuevo chunk
    if (currentChunkX !== this.lastChunkPosition.x || currentChunkZ !== this.lastChunkPosition.y) {
      this.lastChunkPosition.set(currentChunkX, currentChunkZ);
      
      // Ocultar chunks fuera de rango
      for (const [key, chunk] of this.chunks) {
        const [chunkX, chunkZ] = key.split(',').map(Number);
        const distance = Math.max(
          Math.abs(chunkX - currentChunkX),
          Math.abs(chunkZ - currentChunkZ)
        );
        
        chunk.visible = distance <= this.RENDER_DISTANCE;
      }
    }
  }

  private checkWorldBounds() {
    const margin = 1;
    const maxX = (this.matrix.length / 2) - margin;
    const maxZ = (this.matrix[0].length / 2) - margin;
    
    // Aplicar límites con suavizado
    if (this.camera.position.x < -maxX) {
      this.camera.position.x = -maxX;
      this.velocity.x *= 0.5; // Reducir rebote
    } else if (this.camera.position.x > maxX) {
      this.camera.position.x = maxX;
      this.velocity.x *= 0.5;
    }

    if (this.camera.position.z < -maxZ) {
      this.camera.position.z = -maxZ;
      this.velocity.z *= 0.5;
    } else if (this.camera.position.z > maxZ) {
      this.camera.position.z = maxZ;
      this.velocity.z *= 0.5;
    }
  }

  private checkTreeCollisions(newPosition: THREE.Vector3): boolean {
    for (const treePos of this.treePositions) {
      const dx = newPosition.x - treePos.x;
      const dz = newPosition.z - treePos.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      
      if (distance < (this.TREE_COLLISION_RADIUS + this.PLAYER_RADIUS)) {
        return true; // Hay colisión
      }
    }
    return false; // No hay colisión
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
        if (this.canJump && !this.isUnderwater) {
          this.velocity.y = this.jumpForce;
          this.canJump = false;
        } else if (this.isUnderwater) {
          this.velocity.y = this.jumpForce * 0.5;
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
} 