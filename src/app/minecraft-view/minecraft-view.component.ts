import { Component, OnInit, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

interface AnimalColors {
  body: string;
  face: string;
  legs: string;
}

interface Animal {
  type: string;
  position: THREE.Vector3;
  mesh: THREE.Group;
  health: number;
  isAlive: boolean;
  colors: AnimalColors;
  lastStateChange: number;
  targetPosition?: THREE.Vector3;
}

interface BlockPrototype {
  clone(): THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  getType(): string;
}

class Block implements BlockPrototype {
  private mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  private type: string;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, type: string) {
    this.mesh = new THREE.Mesh(geometry, material);
    this.type = type;
  }

  clone(): THREE.Mesh<THREE.BufferGeometry, THREE.Material> {
    return this.mesh.clone() as THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  }

  getType(): string {
    return this.type;
  }
}

class BlockFactory {
  private prototypes: Map<string, BlockPrototype> = new Map();

  constructor() {
    // Inicializar prototipos una sola vez
    const geometries = {
      tree_trunk: new THREE.BoxGeometry(0.3, 2.0, 0.3),
      tree_leaves: new THREE.ConeGeometry(1.0, 2.5, 8),
      cube: new THREE.BoxGeometry(1, 1, 1),
      water: new THREE.BoxGeometry(1, 0.2, 1),
      path: new THREE.BoxGeometry(1, 1, 1)
    };

    const materials = {
      trunk: new THREE.MeshPhongMaterial({ 
        color: 0x3D2410,
        shininess: 5,
        flatShading: true
      }),
      leaves: new THREE.MeshPhongMaterial({ 
        color: 0x2F5A1C,
        shininess: 5,
        flatShading: true,
        side: THREE.DoubleSide
      }),
      ground: new THREE.MeshPhongMaterial({ 
        color: 0x5C4033,
        shininess: 0,
        flatShading: true
      }),
      water: new THREE.MeshPhongMaterial({ 
        color: 0x0F5E9C,
        transparent: true,
        opacity: 0.6,
        shininess: 30
      }),
      mountain: new THREE.MeshPhongMaterial({ 
        color: 0x808080,
        shininess: 10,
        flatShading: true
      }),
      path: new THREE.MeshPhongMaterial({ 
        color: 0x6B4423,
        shininess: 0,
        flatShading: true
      })
    };

    // Registrar prototipos
    this.prototypes.set('trunk', new Block(geometries.tree_trunk, materials.trunk, 'trunk'));
    this.prototypes.set('leaves', new Block(geometries.tree_leaves, materials.leaves, 'leaves'));
    this.prototypes.set('ground', new Block(geometries.cube, materials.ground, 'ground'));
    this.prototypes.set('water', new Block(geometries.water, materials.water, 'water'));
    this.prototypes.set('mountain', new Block(geometries.cube, materials.mountain, 'mountain'));
    this.prototypes.set('path', new Block(geometries.path, materials.path, 'path'));

    // Liberar memoria de geometrías y materiales temporales
    Object.values(geometries).forEach(geometry => geometry.dispose());
  }

  createBlock(type: string): THREE.Mesh<THREE.BufferGeometry, THREE.Material> | null {
    const prototype = this.prototypes.get(type);
    return prototype ? prototype.clone() : null;
  }
}

// Estado intrínseco compartido para los bloques
interface BlockFlyweight {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  type: string;
}

// Estado extrínseco único para cada instancia
interface BlockContext {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

class BlockFlyweightFactory {
  private flyweights: Map<string, BlockFlyweight> = new Map();
  private static instance: BlockFlyweightFactory;

  private constructor() {
    this.initializeFlyweights();
  }

  static getInstance(): BlockFlyweightFactory {
    if (!BlockFlyweightFactory.instance) {
      BlockFlyweightFactory.instance = new BlockFlyweightFactory();
    }
    return BlockFlyweightFactory.instance;
  }

  private initializeFlyweights() {
    // Geometrías compartidas
    const geometries = {
      cube: new THREE.BoxGeometry(1, 1, 1),
      trunk: new THREE.BoxGeometry(0.3, 2.0, 0.3),
      leaves: new THREE.ConeGeometry(1.0, 2.5, 8),
      water: new THREE.BoxGeometry(1, 0.2, 1),
      path: new THREE.BoxGeometry(1, 1, 1)
    };

    // Materiales compartidos
    const materials = {
      trunk: new THREE.MeshPhongMaterial({ 
        color: 0x3D2410,
        shininess: 5,
        flatShading: true
      }),
      leaves: new THREE.MeshPhongMaterial({ 
        color: 0x2F5A1C,
        shininess: 5,
        flatShading: true,
        side: THREE.DoubleSide
      }),
      ground: new THREE.MeshPhongMaterial({ 
        color: 0x5C4033,
        shininess: 0,
        flatShading: true
      }),
      water: new THREE.MeshPhongMaterial({ 
        color: 0x0F5E9C,
        transparent: true,
        opacity: 0.6,
        shininess: 30
      }),
      mountain: new THREE.MeshPhongMaterial({ 
        color: 0x808080,
        shininess: 10,
        flatShading: true
      }),
      path: new THREE.MeshPhongMaterial({ 
        color: 0x6B4423,
        shininess: 0,
        flatShading: true
      })
    };

    // Registrar flyweights
    this.flyweights.set('ground', { 
      geometry: geometries.cube,
      material: materials.ground,
      type: 'ground'
    });
    this.flyweights.set('water', { 
      geometry: geometries.water,
      material: materials.water,
      type: 'water'
    });
    this.flyweights.set('mountain', { 
      geometry: geometries.cube,
      material: materials.mountain,
      type: 'mountain'
    });
    this.flyweights.set('trunk', { 
      geometry: geometries.trunk,
      material: materials.trunk,
      type: 'trunk'
    });
    this.flyweights.set('leaves', { 
      geometry: geometries.leaves,
      material: materials.leaves,
      type: 'leaves'
    });
    this.flyweights.set('path', { 
      geometry: geometries.path,
      material: materials.path,
      type: 'path'
    });
  }

  getFlyweight(type: string): BlockFlyweight | undefined {
    return this.flyweights.get(type);
  }

  createInstancedMesh(type: string, count: number): THREE.InstancedMesh | null {
    const flyweight = this.getFlyweight(type);
    if (!flyweight) return null;

    return new THREE.InstancedMesh(
      flyweight.geometry,
      flyweight.material,
      count
    );
  }
}

interface SavedGameState {
  playerState: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    isFlying: boolean;
  };
}

@Component({
  selector: 'app-minecraft-view',
  template: `
    <div #rendererContainer></div>
    <div #minimapContainer class="minimap"></div>
    <!-- <div class="flight-message" [class.visible]="isFlying">MODO VUELO ACTIVADO</div> -->
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
    .flight-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: #00ff00;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    .flight-message.visible {
      opacity: 1;
    }
  `]
})
export class MinecraftViewComponent implements OnInit {


  @Input() datos_matriz: {state: number, color: string}[][];

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

  private ANIMAL_COLORS: { [key: string]: AnimalColors } = {
    'trex': {
      body: '#8B4513',
      face: '#A0522D',
      legs: '#654321'
    },
    'chicken': {
      body: '#FFFFFF',
      face: '#FFD700',
      legs: '#FFA500'
    },
    'cow': {
      body: '#000000',
      face: '#FFFFFF',
      legs: '#000000'
    }
  };

  private animals: Animal[] = [];
  private lastAnimalUpdate = 0;

  private clouds: THREE.Group[] = [];
  private readonly NUM_CLOUDS = 20;
  private readonly CLOUD_SPEED = 0.5;

  private isFlying = false;
  private lastSpacePress = 0;
  private readonly DOUBLE_PRESS_TIME = 500; // Aumentado de 300 a 500ms
  private readonly FLIGHT_SPEED = 15.0;
  private spaceKeyPressed = false;

  private blockFactory: BlockFactory;
  private readonly BATCH_SIZE = 1000; // Procesar bloques en lotes
  private flyweightFactory: BlockFlyweightFactory;
  private blockContexts: Map<string, BlockContext[]> = new Map();

  // Añadir nuevas propiedades para el ciclo día/noche
  private readonly DAY_LENGTH = 20 * 60 * 1000; // 20 minutos en milisegundos
  private readonly DAY_PHASE = 10 * 60 * 1000; // 10 minutos
  private readonly NIGHT_PHASE = 7 * 60 * 1000; // 7 minutos
  private readonly TRANSITION_PHASE = 1.5 * 60 * 1000; // 1.5 minutos
  private dayStartTime: number = 0;
  private directionalLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;
  private skyColors = {
    day: new THREE.Color(0x87CEEB),    // Celeste
    night: new THREE.Color(0x1A2B3C),  // Azul oscuro
    dawn: new THREE.Color(0xFFA07A),   // Amanecer/atardecer
  };

  private sun!: THREE.Mesh;
  private moon!: THREE.Mesh;
  private readonly SUN_RADIUS = 5;
  private readonly MOON_RADIUS = 4;
  private readonly CELESTIAL_DISTANCE = 100;

  private worldWrappedChunks: Map<string, THREE.Group> = new Map();

  // Añadir propiedad para controlar el tiempo entre guardados
  private lastSaveTime: number = 0;

  constructor(
    private route: ActivatedRoute
  ) {
    this.blockFactory = new BlockFactory();
    this.flyweightFactory = BlockFlyweightFactory.getInstance();
  }

  ngOnInit() {

    

    this.loadMatrixFromLocalStorage();
    this.initScene();
    
    // Intentar cargar el estado guardado
    if (!this.loadGameState()) {
      // Si no hay estado guardado, usar posición por defecto
      this.camera.position.set(0, 10, 20);
    }
    
    this.initControls();
    this.generateWorld();
    this.animate();
  }

  private loadMatrixFromLocalStorage() {
    try {

      if (this.datos_matriz) {
        console.log( "tengo datos matriz !!!!")
        this.matrix = this.datos_matriz
        console.log('Matrix loaded from localStorage:', this.matrix.length, 'x', this.matrix[0].length);
        
        // Mostrar algunos ejemplos de colores que existen en la matriz
        const colors = new Set();
        this.matrix.forEach(row => 
          row.forEach(cell => {
            if (cell.state === 1) colors.add(cell.color);
          })
        );
        console.log('Colors found in matrix:', Array.from(colors));

      }


      const savedData = localStorage.getItem('automata_matrix');
      console.log('Attempting to load matrix from localStorage');

      if ( this.datos_matriz) {
        return
      }
      
      if (savedData && !this.datos_matriz) {
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
        console.log('No saved matrix found in localStorage, creating default matrix');
        // Crear una matriz por defecto de 50x50
        this.matrix = [];
        const size = 50;
        
        for (let i = 0; i < size; i++) {
          this.matrix[i] = [];
          for (let j = 0; j < size; j++) {
            // Crear un patrón básico de terreno
            if (i === j || (i + j) % 5 === 0) {
              this.matrix[i][j] = { state: 1, color: 'Green' }; // Árboles
            } else if ((i + j) % 7 === 0) {
              this.matrix[i][j] = { state: 1, color: 'Blue' }; // Agua
            } else if ((i + j) % 3 === 0) {
              this.matrix[i][j] = { state: 1, color: 'Brown' }; // Tierra
            } else if ((i + j) % 11 === 0) {
              this.matrix[i][j] = { state: 1, color: 'Gray' }; // Montañas
            } else {
              this.matrix[i][j] = { state: 0, color: '' }; // Espacio vacío
            }
          }
        }
        console.log('Default matrix created:', this.matrix.length, 'x', this.matrix[0].length);
      }
    } catch (error) {
      console.error('Error loading matrix from localStorage:', error);
      // En caso de error, también crear una matriz por defecto
      this.matrix = Array(50).fill(null).map(() => 
        Array(50).fill(null).map(() => ({ state: 0, color: '' }))
      );
      console.log('Created empty matrix due to error');
    }
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = this.skyColors.day;

    // Restaurar la inicialización del renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.renderer.sortObjects = false;
    this.renderer.physicallyCorrectLights = false;
    
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Configuración de luz diurna constante
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.directionalLight.position.set(1, 1, 1);
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    this.scene.add(this.ambientLight);

    // Calcular los límites del mundo basado en el tamaño de la matriz
    const halfWidth = this.matrix.length / 2;
    const halfDepth = this.matrix[0] ? this.matrix[0].length / 2 : 0;
    this.worldBounds = {
      minX: -halfWidth + 1,
      maxX: halfWidth - 1,
      minZ: -halfDepth + 1,
      maxZ: halfDepth - 1
    };

    this.createPlayer();
    
    const worldSize = Math.max(this.matrix.length, this.matrix[0] ? this.matrix[0].length : 0);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, worldSize * 2);
    this.camera.position.set(0, 10, 20);
    this.updateCameraPosition();

    this.initMinimap();

    // Ajustar la niebla para que sea más gradual
    const fogDensity = 0.002;
    const fog = new THREE.FogExp2(0x87CEEB, fogDensity);
    this.scene.fog = fog;

    // Añadir nubes
    this.createClouds();
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
    this.geometryCache = {
      trunk: new THREE.BoxGeometry(0.4, 1.0, 0.4),
      leaves: new THREE.BoxGeometry(1, 1, 1),
      ground: new THREE.BoxGeometry(1, 1, 1),
      water: new THREE.BoxGeometry(1, 0.2, 1),
      mountain: new THREE.BoxGeometry(1, 1, 1),
      path: new THREE.BoxGeometry(1, 1, 1)
    };

    // Optimizar las geometrías
    Object.values(this.geometryCache).forEach(geometry => {
      geometry.computeBoundingSphere();
      geometry.computeBoundingBox();
    });
  }

  private createMaterialCache() {
    // Crear texturas
    const groundTexture = this.createGroundTexture();
    const mountainTexture = this.createMountainTexture();
    const pathTexture = this.createPathTexture();

    this.materialCache = {
      trunk: new THREE.MeshPhongMaterial({
        color: 0x4A2F1B,
        shininess: 0,
        flatShading: true
      }),
      leaves: new THREE.MeshPhongMaterial({
        color: 0x2D5A27,
        shininess: 0,
        flatShading: true,
        side: THREE.DoubleSide
      }),
      ground: new THREE.MeshStandardMaterial({ 
        map: groundTexture,
        bumpMap: groundTexture,
        bumpScale: 0.1,
        color: 0x81c784,
        roughness: 0.8,
        metalness: 0.1
      }),
      water: new THREE.MeshPhongMaterial({ 
        color: this.colorMap['Blue'],
        transparent: true,
        opacity: 0.6,
        shininess: 30
      }),
      mountain: new THREE.MeshPhongMaterial({ 
        map: mountainTexture,
        bumpMap: mountainTexture,
        bumpScale: 0.2,
        color: 0x808080,
        shininess: 10,
        flatShading: true
      }),
      path: new THREE.MeshPhongMaterial({ 
        map: pathTexture,
        bumpMap: pathTexture,
        bumpScale: 0.1,
        color: 0x6B4423,
        shininess: 0,
        flatShading: true
      })
    };
  }

  private createGroundTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;

    // Color base del pasto
    const gradient = context.createLinearGradient(0, 0, 0, 128);
    gradient.addColorStop(0, '#2d5a27');  // Verde oscuro para el pasto
    gradient.addColorStop(1, '#3d2410');  // Marrón para la tierra
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    // Añadir textura de pasto
    for (let y = 0; y < 128; y += 2) {
        for (let x = 0; x < 128; x += 2) {
            if (Math.random() > 0.5) {
                const green = 70 + Math.random() * 30;
                context.fillStyle = `rgba(45, ${green}, 39, 0.7)`;
                context.fillRect(x, y, 2, 2);
            }
        }
    }

    // Añadir briznas de hierba
    for (let i = 0; i < 300; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        const height = 2 + Math.random() * 3;
        
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (Math.random() - 0.5), y - height);
        context.strokeStyle = `rgba(45, ${90 + Math.random() * 30}, 39, 0.8)`;
        context.lineWidth = 1;
        context.stroke();
    }

    // Añadir highlights
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        context.fillStyle = 'rgba(150, 200, 50, 0.2)';
        context.fillRect(x, y, 1, 1);
    }

    const texture = new THREE.Texture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.needsUpdate = true;
    return texture;
  }

  private createMountainTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    // Fondo base
    context.fillStyle = '#808080';
    context.fillRect(0, 0, 256, 256);

    // Añadir patrón de roca
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = 1 + Math.random() * 4;
      
      context.fillStyle = `rgba(${120 + Math.random() * 30}, ${120 + Math.random() * 30}, ${120 + Math.random() * 30}, 0.4)`;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
    }

    // Añadir líneas de roca
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const length = 5 + Math.random() * 15;
      const angle = Math.random() * Math.PI * 2;
      
      context.strokeStyle = `rgba(90, 90, 90, 0.3)`;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      context.stroke();
    }

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createPathTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    // Fondo base
    context.fillStyle = '#6B4423';
    context.fillRect(0, 0, 256, 256);

    // Añadir textura de camino
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = 1 + Math.random() * 2;
      
      context.fillStyle = `rgba(${107 + Math.random() * 20}, ${68 + Math.random() * 15}, ${35 + Math.random() * 15}, 0.3)`;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
    }

    // Añadir algunas piedras pequeñas
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      context.fillStyle = `rgba(130, 130, 130, ${0.2 + Math.random() * 0.3})`;
      context.beginPath();
      context.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private generateWorld() {
    if (!this.matrix || this.matrix.length === 0) return;

    // Limpiar contextos anteriores
    this.blockContexts.clear();
    this.worldWrappedChunks.clear();
    
    const offsetX = -this.matrix.length / 2;
    const offsetZ = -this.matrix[0].length / 2;
    const worldWidth = this.matrix.length;
    const worldDepth = this.matrix[0].length;

    // Función para obtener la posición toroidal
    const getToroidalPosition = (x: number, z: number): [number, number] => {
      const wrappedX = ((x % worldWidth) + worldWidth) % worldWidth;
      const wrappedZ = ((z % worldDepth) + worldDepth) % worldDepth;
      return [wrappedX, wrappedZ];
    };

    // Generar el mundo principal y las copias en los bordes
    for (let x = -worldWidth; x < worldWidth * 2; x++) {
      for (let z = -worldDepth; z < worldDepth * 2; z++) {
        const [wrappedX, wrappedZ] = getToroidalPosition(x, z);
        const cell = this.matrix[wrappedX][wrappedZ];
        
        if (cell.state === 1) {
          const worldX = x + offsetX;
          const worldZ = z + offsetZ;
          const height = this.getBlockHeight(cell.color);

          const context: BlockContext = {
            position: new THREE.Vector3(worldX, height, worldZ),
            rotation: new THREE.Euler(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1)
          };

          switch(cell.color) {
            case 'Green':
              this.treePositions.push(new THREE.Vector3(worldX, 0, worldZ));
              // Tronco
              this.addBlockContext('trunk', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, 1, 1)
              });
              // Hojas
              this.addBlockContext('leaves', {
                position: new THREE.Vector3(worldX, height + 2.8, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, 1, 1)
              });
              break;
            case 'Brown':
              this.addBlockContext('ground', context);
              break;
            case 'Blue':
              this.addBlockContext('water', context);
              break;
            case 'Gray':
              this.addBlockContext('mountain', context);
              break;
            case 'Red':
              this.addBlockContext('path', context);
              break;
          }
        }
      }
    }

    // Crear instanced meshes usando los contextos recolectados
    this.blockContexts.forEach((contexts, type) => {
      const instancedMesh = this.flyweightFactory.createInstancedMesh(type, contexts.length);
      if (!instancedMesh) return;

      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;

      const matrix = new THREE.Matrix4();
      // Procesar en lotes para mejor rendimiento
      for (let i = 0; i < contexts.length; i += this.BATCH_SIZE) {
        const batch = contexts.slice(i, i + this.BATCH_SIZE);
        batch.forEach((context, index) => {
          matrix.makeTranslation(
            context.position.x,
            context.position.y,
            context.position.z
          );
          matrix.scale(context.scale);
          instancedMesh.setMatrixAt(i + index, matrix);
        });
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      this.scene.add(instancedMesh);
      this.instancedMeshes[type] = instancedMesh;
    });
  }

  private addBlockContext(type: string, context: BlockContext) {
    if (!this.blockContexts.has(type)) {
      this.blockContexts.set(type, []);
    }
    const contexts = this.blockContexts.get(type);
    if (contexts) {
      contexts.push(context);
    }
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
    // Obtener la posición actual del jugador en coordenadas de la matriz
    const matrixX = Math.floor(this.camera.position.x + this.matrix.length / 2);
    const matrixZ = Math.floor(this.camera.position.z + this.matrix[0].length / 2);
    
    // Verificar si la posición está dentro de los límites de la matriz
    const isInBounds = matrixX >= 0 && matrixX < this.matrix.length && 
                      matrixZ >= 0 && matrixZ < this.matrix[0].length;
    
    // Verificar si el jugador está sobre un bloque de agua
    const isOverWater = isInBounds && 
                       this.matrix[matrixX][matrixZ].state === 1 && 
                       this.matrix[matrixX][matrixZ].color === 'Blue';
    
    // Si está sobre agua y no está volando, forzar que entre al agua
    if (isOverWater && !this.isFlying && this.camera.position.y > this.waterLevel) {
      this.velocity.y = -5; // Fuerza hacia abajo para entrar al agua
    }

    // Actualizar estado de estar bajo el agua
    const isInWater = (this.camera.position.y <= this.waterLevel && isOverWater) || 
                     (isOverWater && this.camera.position.y <= 2);
    
    if (this.isUnderwater !== isInWater) {
      this.isUnderwater = isInWater;
      this.updateWaterEffects();
    }

    // Ajustar física cuando está en el agua
    if (this.isUnderwater) {
      this.moveSpeed = 8.0;
      this.friction = 2.0;
      this.acceleration = 15.0;
      // Reducir la gravedad en el agua
      this.velocity.y *= 0.8;
      // Limitar la velocidad de caída en el agua
      if (this.velocity.y < -5) this.velocity.y = -5;
    } else {
      this.moveSpeed = 35.0;
      this.friction = 5.0;
      this.acceleration = 30.0;
    }
  }

  private updateWaterEffects() {
    if (this.isUnderwater) {
      this.scene.background = this.waterFogColor;
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color = this.waterFogColor;
        (this.scene.fog as THREE.FogExp2).density = 0.15; // Niebla más densa bajo el agua
      }
    } else {
      this.scene.background = this.normalFogColor;
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color = this.normalFogColor;
        (this.scene.fog as THREE.FogExp2).density = 0.002; // Niebla más suave en tierra
      }
    }
  }

  private initMinimap() {
    // Create minimap scene
    this.minimapScene = new THREE.Scene();
    this.minimapScene.background = new THREE.Color(0x000000);

    // Calculate the aspect ratio and size
    const minimapSize = 200;
    const aspect = 1;
    const worldSize = Math.max(this.matrix.length, this.matrix[0] ? this.matrix[0].length : 0);
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
    if (!this.isLocked) {
      requestAnimationFrame(() => this.animate());
      return;
    }

    requestAnimationFrame(() => this.animate());

    const currentTime = performance.now();
    const delta = (currentTime - this.prevTime) / 1000;

    if (this.isLocked) {
      this.velocity.x -= this.velocity.x * this.friction * delta;
      this.velocity.z -= this.velocity.z * this.friction * delta;
      
      if (!this.isFlying) {
        this.velocity.y -= this.gravity * delta;
      } else if (!this.spaceKeyPressed && !this.moveBackward) {
        this.velocity.y = 0;
      }

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      const speedMultiplier = this.isUnderwater ? 0.5 : (this.isFlying ? 1.5 : 1);

      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * this.acceleration * delta * speedMultiplier;
      }
      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * this.acceleration * delta * speedMultiplier;
      }

      const newPosition = this.camera.position.clone();
      newPosition.x += this.velocity.x * delta;
      newPosition.z += this.velocity.z * delta;

      if (!this.checkTreeCollisions(newPosition)) {
        this.controls.moveRight(-this.velocity.x * delta);
        this.controls.moveForward(-this.velocity.z * delta);
      } else {
        this.velocity.x *= -0.5;
        this.velocity.z *= -0.5;
      }

      this.camera.position.y += this.velocity.y * delta;
      
      if (this.isFlying) {
        this.camera.position.y = Math.max(2, Math.min(200, this.camera.position.y));
      } else {
        this.camera.position.y = Math.max(2, Math.min(100, this.camera.position.y));
      }

      this.checkWorldBounds();
      this.checkWaterCollision();
      
      if (this.hasMovedSignificantly()) {
        this.updateChunks();
      }

      if (!this.isFlying && this.camera.position.y <= 2 && !this.isUnderwater) {
        this.velocity.y = 0;
        this.camera.position.y = 2;
        this.canJump = true;
      }

      this.updatePlayerAnimation();
      this.updateMinimap();
      this.updateClouds(delta);
    }

    // Guardar estado cada 5 segundos
    if (currentTime - this.lastSaveTime > 5000) {
      this.saveGameState();
      this.lastSaveTime = currentTime;
    }

    this.renderer.render(this.scene, this.camera);
    this.prevTime = currentTime;
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

      // Actualizar visibilidad de chunks envueltos
      for (const [key, chunk] of this.worldWrappedChunks) {
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
    
    // Comportamiento toroidal para el eje X (Este-Oeste)
    if (this.camera.position.x < -maxX) {
      this.camera.position.x = maxX - ((-maxX - this.camera.position.x) % (maxX * 2));
      this.velocity.x *= 0.5;
    } else if (this.camera.position.x > maxX) {
      this.camera.position.x = -maxX + ((this.camera.position.x - maxX) % (maxX * 2));
      this.velocity.x *= 0.5;
    }

    // Comportamiento toroidal para el eje Z (Norte-Sur)
    if (this.camera.position.z < -maxZ) {
      this.camera.position.z = maxZ - ((-maxZ - this.camera.position.z) % (maxZ * 2));
      this.velocity.z *= 0.5;
    } else if (this.camera.position.z > maxZ) {
      this.camera.position.z = -maxZ + ((this.camera.position.z - maxZ) % (maxZ * 2));
      this.velocity.z *= 0.5;
    }

    // Actualizar la posición del jugador
    if (this.player) {
      this.player.position.x = this.camera.position.x;
      this.player.position.z = this.camera.position.z;
    }
  }

  private checkTreeCollisions(newPosition: THREE.Vector3): boolean {
    // Si estamos en modo vuelo, ignorar colisiones con árboles
    if (this.isFlying) return false;
    
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
        if (!this.spaceKeyPressed) {
          this.spaceKeyPressed = true;
          const now = performance.now();
          
          if (now - this.lastSpacePress < this.DOUBLE_PRESS_TIME) {
            this.isFlying = !this.isFlying;
            this.velocity.y = 0;
            this.lastSpacePress = 0;
            // Añadir feedback de sonido
            const audio = new Audio();
            audio.src = this.isFlying ? 'assets/sounds/flight-on.mp3' : 'assets/sounds/flight-off.mp3';
            audio.volume = 0.3;
            audio.play().catch(() => {}); // Ignorar error si el navegador bloquea el audio
          } else {
            this.lastSpacePress = now;
            if (this.isFlying) {
              this.velocity.y = this.FLIGHT_SPEED;
            } else if (this.canJump && !this.isUnderwater) {
              this.velocity.y = this.jumpForce;
              this.canJump = false;
            } else if (this.isUnderwater) {
              this.velocity.y = this.jumpForce * 0.5;
            }
          }
        }
        break;
      case 'ShiftLeft':
        if (this.isFlying) {
          // En modo vuelo, shift hace bajar
          this.velocity.y = -this.FLIGHT_SPEED;
        } else if (this.isUnderwater) {
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
      case 'Space':
        this.spaceKeyPressed = false;
        if (this.isFlying) {
          this.velocity.y = 0; // Detener el movimiento vertical cuando sueltas la tecla en modo vuelo
        }
        break;
      case 'ShiftLeft':
        if (this.isFlying) {
          this.velocity.y = 0; // Detener el movimiento vertical cuando sueltas shift en modo vuelo
        }
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private createBlockGeometry(type: string): THREE.BufferGeometry {
    switch (type) {
      case 'tree':
        return new THREE.BoxGeometry(1, 2, 1);
      case 'water':
        return new THREE.BoxGeometry(1, 0.5, 1);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }

  private createBlockMaterial(type: string): THREE.Material {
    switch (type) {
      case 'tree':
        return new THREE.MeshPhongMaterial({ color: 0x2ECC71 });
      case 'water':
        return new THREE.MeshPhongMaterial({ 
          color: 0x3498DB,
          transparent: true,
          opacity: 0.6
        });
      case 'mountain':
        return new THREE.MeshPhongMaterial({ color: 0xE0E0E0 });
      case 'path':
        return new THREE.MeshPhongMaterial({ color: 0xD35400 });
      default:
        return new THREE.MeshPhongMaterial({ color: 0xA0522D });
    }
  }

  private createAnimal(type: string, position: THREE.Vector3): Animal {
    const group = new THREE.Group();
    const colors = this.ANIMAL_COLORS[type];
    
    const bodyGeometry = new THREE.BoxGeometry(1, 1, 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: colors.body });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    group.position.copy(position);
    this.scene.add(group);
    
    return {
      type,
      position,
      mesh: group,
      health: 100,
      isAlive: true,
      colors,
      lastStateChange: performance.now()
    };
  }

  private updateAnimals(currentTime: number): void {
    if (currentTime - this.lastAnimalUpdate < 5000) return;
    this.lastAnimalUpdate = currentTime;

    this.animals.forEach(animal => {
      if (animal && animal.mesh) {
        // Update animal behavior
        this.updateAnimalBehavior(animal);
      }
    });
  }

  private moveAnimal(animal: Animal, delta: number): void {
    if (!animal.targetPosition) return;
    
    const speed = animal.type === 'trex' ? 5 : 2;
    const direction = new THREE.Vector3()
      .subVectors(animal.targetPosition, animal.position)
      .normalize();
    
    const movement = direction.multiplyScalar(speed * delta);
    animal.position.add(movement);
    animal.mesh.position.copy(animal.position);
    
    // Rotate to face movement direction
    const angle = Math.atan2(direction.x, direction.z);
    animal.mesh.rotation.y = angle;
  }

  private checkAnimalCollisions(): void {
    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];
      if (!animal.isAlive) continue;

      // Check collision with player
      const playerDistance = this.camera.position.distanceTo(animal.position);
      if (playerDistance < 2) {
        if (animal.type === 'trex') {
          // T-Rex attacks player
          console.log('T-Rex attacked player!');
          // Add player damage logic here
        }
      }

      // T-Rex hunts other animals
      if (animal.type === 'trex') {
        for (let j = 0; j < this.animals.length; j++) {
          const prey = this.animals[j];
          if (i !== j && prey.isAlive && prey.type !== 'trex') {
            const distance = animal.position.distanceTo(prey.position);
            if (distance < 2) {
              prey.isAlive = false;
              this.scene.remove(prey.mesh);
            }
          }
        }
      }
    }
  }

  private updateAnimalBehavior(animal: Animal): void {
    if (!animal.isAlive) return;
    
    const currentTime = performance.now();
    if (currentTime - animal.lastStateChange > 3000) {
      const randomX = animal.position.x + (Math.random() - 0.5) * 10;
      const randomZ = animal.position.z + (Math.random() - 0.5) * 10;
      animal.targetPosition = new THREE.Vector3(randomX, 2, randomZ);
      animal.lastStateChange = currentTime;
    }
  }

  private createClouds() {
    const worldSize = Math.max(this.matrix.length, this.matrix[0] ? this.matrix[0].length : 0);
    
    for (let i = 0; i < this.NUM_CLOUDS; i++) {
      // Crear un grupo de "partículas" para formar una nube más grande
      const cloudGroup = new THREE.Group();
      
      // Número aleatorio de partículas por nube
      const numParticles = 5 + Math.floor(Math.random() * 5);
      
      // Crear la forma base de la nube
      const cloudGeometry = new THREE.PlaneGeometry(8, 4);
      const cloudMaterial = new THREE.MeshBasicMaterial({
        map: this.createCloudTexture(),
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      // Crear múltiples planos para dar volumen
      for (let j = 0; j < numParticles; j++) {
        const particle = new THREE.Mesh(cloudGeometry, cloudMaterial);
        
        // Posición aleatoria dentro del volumen de la nube
        particle.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
        
        // Rotación aleatoria para variedad
        particle.rotation.z = Math.random() * Math.PI;
        
        cloudGroup.add(particle);
      }

      // Posición inicial de la nube en el mundo
      cloudGroup.position.set(
        (Math.random() - 0.5) * worldSize * 1.5,
        40 + Math.random() * 20, // Altura entre 40 y 60 unidades
        (Math.random() - 0.5) * worldSize * 1.5
      );

      this.scene.add(cloudGroup);
      this.clouds.push(cloudGroup);
    }
  }

  private createCloudTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    
    const context = canvas.getContext('2d')!;
    
    // Fondo transparente
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, 128, 128);
    
    // Crear una forma de nube más natural
    context.beginPath();
    context.arc(64, 64, 32, 0, Math.PI * 2);
    context.arc(45, 64, 25, 0, Math.PI * 2);
    context.arc(83, 64, 25, 0, Math.PI * 2);
    context.arc(64, 45, 25, 0, Math.PI * 2);
    context.arc(64, 83, 25, 0, Math.PI * 2);
    
    // Gradiente radial para suavizar los bordes
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fill();
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private updateClouds(delta: number) {
    const worldSize = Math.max(this.matrix.length, this.matrix[0] ? this.matrix[0].length : 0) * 1.5;
    
    this.clouds.forEach(cloud => {
      // Mover la nube
      cloud.position.x += this.CLOUD_SPEED * delta;
      
      // Si la nube sale del mundo, moverla al otro lado
      if (cloud.position.x > worldSize / 2) {
        cloud.position.x = -worldSize / 2;
      }
      
      // Rotar suavemente para dar efecto de movimiento
      cloud.rotation.y += delta * 0.1;
    });
  }

  private createTreeAt(position: THREE.Vector3): void {
    // Create trunk
    const trunk = this.blockFactory.createBlock('trunk') as THREE.Mesh;
    trunk.position.copy(position);
    trunk.scale.set(1, 4, 1); // Make trunk taller
    this.scene.add(trunk);

    // Create leaves in a triangular pattern
    const leafLevels = 3; // Number of leaf layers
    const baseWidth = 2; // Width of the base layer (in blocks)
    
    for (let level = 0; level < leafLevels; level++) {
      const y = position.y + 2 + level * 1.0; // Space between layers
      const width = baseWidth - level; // Decrease width as we go up
      
      // Create diamond pattern for each layer
      for (let x = -width; x <= width; x++) {
        for (let z = -width; z <= width; z++) {
          // Create diamond shape by checking Manhattan distance
          if (Math.abs(x) + Math.abs(z) <= width) {
            const leaf = this.blockFactory.createBlock('leaves') as THREE.Mesh;
            leaf.position.set(
              position.x + x,
              y,
              position.z + z
            );
            leaf.scale.set(1, 1, 1);
            this.scene.add(leaf);
            
            // Add to tree positions for collision detection
            this.treePositions.push(new THREE.Vector3(position.x + x, y, position.z + z));
          }
        }
      }
    }

    // Add top point
    const topLeaf = this.blockFactory.createBlock('leaves') as THREE.Mesh;
    topLeaf.position.set(position.x, position.y + 2 + leafLevels * 1.0, position.z);
    topLeaf.scale.set(1, 1, 1);
    this.scene.add(topLeaf);
    this.treePositions.push(new THREE.Vector3(position.x, position.y + 2 + leafLevels * 1.0, position.z));
  }

  private updateDayNightCycle(currentTime: number) {
    const timeInCycle = (currentTime - this.dayStartTime) % this.DAY_LENGTH;
    let phase: 'day' | 'night' | 'dawn' | 'dusk';
    let intensity: number;
    let skyColor: THREE.Color;
    let ambientIntensity: number;

    // Determinar la fase actual
    if (timeInCycle < this.DAY_PHASE) {
      // Día
      phase = 'day';
      intensity = 1.5;
      skyColor = this.skyColors.day;
      ambientIntensity = 1.2;
    } else if (timeInCycle < this.DAY_PHASE + this.TRANSITION_PHASE) {
      // Atardecer
      phase = 'dusk';
      const progress = (timeInCycle - this.DAY_PHASE) / this.TRANSITION_PHASE;
      intensity = 1.5 - (progress * 1.3);
      skyColor = new THREE.Color().lerpColors(
        this.skyColors.day,
        this.skyColors.dawn,
        progress
      );
      ambientIntensity = 1.2 - (progress * 0.8);
    } else if (timeInCycle < this.DAY_PHASE + this.TRANSITION_PHASE + this.NIGHT_PHASE) {
      // Noche
      phase = 'night';
      intensity = 0.2;
      skyColor = this.skyColors.night;
      ambientIntensity = 0.4;
    } else {
      // Amanecer
      phase = 'dawn';
      const progress = (timeInCycle - (this.DAY_PHASE + this.TRANSITION_PHASE + this.NIGHT_PHASE)) / this.TRANSITION_PHASE;
      intensity = 0.2 + (progress * 1.3);
      skyColor = new THREE.Color().lerpColors(
        this.skyColors.dawn,
        this.skyColors.day,
        progress
      );
      ambientIntensity = 0.4 + (progress * 0.8);
    }

    // Actualizar luces y cielo
    this.directionalLight.intensity = intensity;
    this.ambientLight.intensity = ambientIntensity;
    
    // Actualizar color del cielo con transición suave
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.lerp(skyColor, 0.1);
    }

    // Actualizar niebla para que coincida con el cielo
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.copy(this.scene.background as THREE.Color);
    }

    // Calcular posición de los astros
    const angle = (timeInCycle / this.DAY_LENGTH) * Math.PI * 2;
    const sunX = Math.cos(angle) * this.CELESTIAL_DISTANCE;
    const sunY = Math.sin(angle) * this.CELESTIAL_DISTANCE;
    const moonX = -sunX;
    const moonY = -sunY;

    // Actualizar posición del sol
    this.sun.position.set(sunX, sunY, 0);
    (this.sun.material as THREE.MeshBasicMaterial).opacity = phase === 'night' ? 0 : 0.8;
    this.directionalLight.position.set(sunX, sunY, 0);

    // Actualizar posición de la luna
    this.moon.position.set(moonX, moonY, 0);
    (this.moon.material as THREE.MeshBasicMaterial).opacity = phase === 'day' ? 0 : 0.8;
  }

  private saveGameState() {
    const gameState: SavedGameState = {
      playerState: {
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
        isFlying: this.isFlying
      }
    };

    localStorage.setItem('minecraft_game_state', JSON.stringify(gameState));
    console.log('Game state saved:', gameState); // Para debugging
  }

  private loadGameState(): boolean {
    const savedState = localStorage.getItem('minecraft_game_state');
    if (savedState) {
      try {
        const gameState: SavedGameState = JSON.parse(savedState);
        console.log('Loading game state:', gameState); // Para debugging

        // Restaurar posición
        this.camera.position.set(
          gameState.playerState.position.x,
          gameState.playerState.position.y,
          gameState.playerState.position.z
        );

        // Restaurar rotación (dirección de la mirada)
        this.camera.rotation.set(
          gameState.playerState.rotation.x,
          gameState.playerState.rotation.y,
          gameState.playerState.rotation.z
        );

        // Restaurar modo de vuelo
        this.isFlying = gameState.playerState.isFlying;
        
        // Actualizar el mensaje de modo vuelo
        const flightMessage = document.querySelector('.flight-message') as HTMLElement;
        if (flightMessage) {
          flightMessage.classList.toggle('visible', this.isFlying);
        }

        // Actualizar la posición del jugador
        if (this.player) {
          this.player.position.x = this.camera.position.x;
          this.player.position.y = this.camera.position.y - this.playerHeight;
          this.player.position.z = this.camera.position.z;
        }

        return true;
      } catch (error) {
        console.error('Error loading game state:', error);
        return false;
      }
    }
    return false;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload() {
    // Guardar estado antes de cerrar la página
    this.saveGameState();
  }

  ngOnDestroy() {
    // Guardar estado antes de destruir el componente
    this.saveGameState();
    // Liberar recursos
    Object.values(this.instancedMeshes).forEach(mesh => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    this.blockContexts.clear();
  }
} 