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
    <div class="controls-info" *ngIf="!isLocked">
      Click to start<br>
      Move: WASD<br>
      Jump: SPACE<br>
      Look: MOUSE
    </div>
    <div class="water-overlay" [class.visible]="isUnderwater"></div>
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
  private moveSpeed = 400.0;
  private gravity = 9.8;
  private playerHeight = 2.0;
  private jumpForce = 350;

  private isLocked = false;
  private prevTime = performance.now();

  private readonly colorMap: { [key: string]: number } = {
    'Green': 0x2F5A1C,  // Verde más oscuro para las hojas
    'Brown': 0x8B6B4F,  // Marrón para tierra
    'Blue': 0x0F5E9C,   // Azul oscuro para agua
    'Gray': 0x808080,   // Gris para montañas
    'Red': 0x6B4423     // Marrón oscuro para caminos
  };

  private readonly geometries = {
    tree: {
      trunk: new THREE.BoxGeometry(0.3, 2.0, 0.3), // Tronco más delgado y alto
      leaves: new THREE.ConeGeometry(1.0, 2.5, 8) // Copa cónica con 8 segmentos
    },
    ground: new THREE.BoxGeometry(1, 0.3, 1),
    water: new THREE.BoxGeometry(1, 0.3, 1),
    mountain: new THREE.BoxGeometry(1, 1.5, 1),
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

    // Calcular los límites del mundo basado en el tamaño de la matriz
    const halfWidth = this.matrix.length / 2;
    const halfDepth = (this.matrix[0]?.length || 0) / 2;
    this.worldBounds = {
      minX: -halfWidth + 1, // +1 para dar un pequeño margen
      maxX: halfWidth - 1,
      minZ: -halfDepth + 1,
      maxZ: halfDepth - 1
    };

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 20);
    this.camera.rotation.x = -Math.PI / 6; // Inclina la cámara hacia abajo

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    this.scene.add(ambientLight);

    // Initialize minimap
    this.initMinimap();
  }

  private initControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);

    // Establecer una posición inicial fija
    const startPosition = new THREE.Vector3(0, 10, 20);
    const startRotation = new THREE.Euler(-Math.PI / 6, 0, 0);

    this.controls.addEventListener('lock', () => {
      this.isLocked = true;
      this.camera.position.copy(startPosition);
      this.camera.rotation.copy(startRotation);
    });

    this.controls.addEventListener('unlock', () => {
      this.isLocked = false;
      this.camera.position.copy(startPosition);
      this.camera.rotation.copy(startRotation);
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

    const blockGroups: { [key: string]: { positions: { x: number, y: number, z: number }[], count: number, color: number, geometry: THREE.BoxGeometry } } = {};

    // Initialize block groups based on colors found in matrix
    const uniqueColors = new Set<string>();
    this.matrix.forEach(row => row.forEach(cell => {
      if (cell.state === 1) uniqueColors.add(cell.color);
    }));

    uniqueColors.forEach(color => {
      const colorHex = this.colorMap[color];
      let geometry;
      
      switch(color) {
        case 'Green':
          // Los árboles se manejan de manera especial
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

    // Fill positions based on matrix
    const offsetX = -this.matrix.length / 2;
    const offsetZ = -this.matrix[0].length / 2;

    for (let x = 0; x < this.matrix.length; x++) {
      for (let z = 0; z < this.matrix[x].length; z++) {
        const cell = this.matrix[x][z];
        if (cell.state === 1) {
          const group = blockGroups[cell.color];
          if (group) {
            const height = this.getBlockHeight(cell.color);
            group.positions.push({
              x: x + offsetX,
              y: height,
              z: z + offsetZ
            });
            group.count++;
          }
        }
      }
    }

    // Create instanced meshes with shadows
    for (const [color, group] of Object.entries(blockGroups)) {
      if (group.count === 0) continue;

      if (color === 'Green') {
        // Crear árboles con tronco y hojas
        group.positions.forEach(pos => {
          // Crear el tronco
          const trunk = new THREE.Mesh(
            this.geometries.tree.trunk,
            new THREE.MeshPhongMaterial({ 
              color: 0x4A2F10,  // Marrón más oscuro para el tronco
              shininess: 5,
              roughness: 1.0
            })
          );
          trunk.position.set(pos.x, pos.y + 1.0, pos.z);
          trunk.castShadow = true;
          trunk.receiveShadow = true;
          this.scene.add(trunk);

          // Crear las hojas (copa del árbol)
          const leaves = new THREE.Mesh(
            this.geometries.tree.leaves,
            new THREE.MeshPhongMaterial({ 
              color: this.colorMap[color],
              shininess: 10,
              flatShading: true, // Sombreado plano para más textura
              side: THREE.DoubleSide // Visible desde ambos lados
            })
          );
          leaves.position.set(pos.x, pos.y + 2.8, pos.z); // Posicionado más arriba
          leaves.castShadow = true;
          leaves.receiveShadow = true;
          
          // Añadir algo de variación aleatoria a la rotación
          leaves.rotation.y = Math.random() * Math.PI * 2;
          
          this.scene.add(leaves);

          // Añadir una segunda capa de hojas más pequeña
          const leavesTop = new THREE.Mesh(
            new THREE.ConeGeometry(0.7, 1.5, 8),
            new THREE.MeshPhongMaterial({ 
              color: this.colorMap[color],
              shininess: 10,
              flatShading: true,
              side: THREE.DoubleSide
            })
          );
          leavesTop.position.set(pos.x, pos.y + 3.8, pos.z);
          leavesTop.rotation.y = Math.random() * Math.PI * 2;
          leavesTop.castShadow = true;
          leavesTop.receiveShadow = true;
          this.scene.add(leavesTop);
        });
      } else {
        const material = new THREE.MeshPhongMaterial({ 
          color: group.color,
          transparent: color === 'Blue',
          opacity: color === 'Blue' ? 0.6 : 1,
          shininess: 10
        });

        const instancedMesh = new THREE.InstancedMesh(group.geometry, material, group.count);
        instancedMesh.castShadow = true;
        instancedMesh.receiveShadow = true;
        
        const matrix = new THREE.Matrix4();
        group.positions.forEach((pos, i) => {
          matrix.setPosition(pos.x, pos.y, pos.z);
          instancedMesh.setMatrixAt(i, matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;
        this.scene.add(instancedMesh);
      }
    }
  }

  private getBlockHeight(color: string): number {
    switch(color) {
      case 'Green': // Árboles
        return 0; // La altura se maneja en la generación
      case 'Brown': // Tierra
        return 0;
      case 'Blue': // Agua
        return -0.2;
      case 'Gray': // Montañas
        return 1.5;
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
    this.moveSpeed = this.isUnderwater ? 200.0 : 400.0;
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

  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isLocked) {
      const time = performance.now();
      const delta = (time - this.prevTime) / 1000;

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

      if (this.camera.position.y < 2 && !this.isUnderwater) {
        this.velocity.y = 0;
        this.camera.position.y = 2;
        this.canJump = true;
      }

      this.prevTime = time;
    }

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