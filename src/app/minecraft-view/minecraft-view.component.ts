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
  `]
})
export class MinecraftViewComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

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

  private isLocked = false;
  private prevTime = performance.now();

  private readonly colorMap: { [key: string]: number } = {
    'Green': 0x1B4D2E,  // Verde oscuro para árboles
    'Brown': 0x8B6B4F,  // Marrón para tierra
    'Blue': 0x0F5E9C,   // Azul oscuro para agua
    'Gray': 0x808080,   // Gris para montañas
    'Red': 0x6B4423     // Marrón oscuro para caminos
  };

  private readonly geometries = {
    tree: new THREE.BoxGeometry(1, 4, 1),
    ground: new THREE.BoxGeometry(1, 0.3, 1),
    water: new THREE.BoxGeometry(1, 0.3, 1),
    mountain: new THREE.BoxGeometry(1, 1.5, 1),
    path: new THREE.BoxGeometry(1, 0.3, 1)
  };

  private waterLevel = 0.3;
  private normalFogColor = new THREE.Color(0x87CEEB);
  private waterFogColor = new THREE.Color(0x1E90FF);

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

    // Add fog to the scene
    this.scene.fog = new THREE.Fog(0xADD8E6, 20, 100);
  }

  private initControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);

    // Establecer una posición inicial fija
    const startPosition = new THREE.Vector3(0, 10, 20);
    const startRotation = new THREE.Euler(-Math.PI / 6, 0, 0);

    this.controls.addEventListener('lock', () => {
      this.isLocked = true;
      // Asegurar que la cámara comience desde la posición correcta
      this.camera.position.copy(startPosition);
      this.camera.rotation.copy(startRotation);
    });

    this.controls.addEventListener('unlock', () => {
      this.isLocked = false;
      // Restaurar la posición y rotación inicial al desbloquear
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
          geometry = this.geometries.tree;
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

  private getBlockHeight(color: string): number {
    switch(color) {
      case 'Green': // Árboles
        return 2;
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
    if (this.scene.fog) {
      const targetColor = this.isUnderwater ? this.waterFogColor : this.normalFogColor;
      this.scene.fog.color.copy(targetColor);
      this.scene.background = targetColor;
      this.scene.fog.near = this.isUnderwater ? 0.1 : 20;
      this.scene.fog.far = this.isUnderwater ? 15 : 100;
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isLocked) {
      const time = performance.now();
      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.velocity.y -= 9.8 * 100.0 * delta;

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * this.moveSpeed * delta;
      if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * this.moveSpeed * delta;

      this.controls.moveRight(-this.velocity.x * delta);
      this.controls.moveForward(-this.velocity.z * delta);

      this.camera.position.y += (this.velocity.y * delta);

      // Mantener la cámara dentro de límites razonables
      this.camera.position.y = Math.max(2, Math.min(20, this.camera.position.y));

      // Check water collision before ground collision
      this.checkWaterCollision();

      if (this.camera.position.y < 2 && !this.isUnderwater) {
        this.velocity.y = 0;
        this.camera.position.y = 2;
        this.canJump = true;
      }

      this.prevTime = time;
    }

    this.renderer.render(this.scene, this.camera);
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
          this.velocity.y += 350;
          this.canJump = false;
        } else if (this.isUnderwater) {
          this.velocity.y += 200;
        }
        break;
      case 'ShiftLeft':
        if (this.isUnderwater) {
          this.velocity.y -= 200;
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