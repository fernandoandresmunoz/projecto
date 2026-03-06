import { Component, OnInit, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Automata } from 'cube';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

interface Cell {
  state: number;
  color: string;
  height: number;
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
  automata: Automata;

  constructor(automata: Automata) {
    this.automata = automata;
    this.initializeFlyweights();
  }

  static getInstance(automata: Automata): BlockFlyweightFactory {
    if (!BlockFlyweightFactory.instance) {
      BlockFlyweightFactory.instance = new BlockFlyweightFactory(automata);
    }
    return BlockFlyweightFactory.instance;
  }

  private initializeFlyweights() {
    // Generar texturas usando el color configurado para que la geometría no sea perfectamente plana
    const groundTexture = this.createGroundTexture(this.automata.regla_4_color_2);
    const mountainTexture = this.createMountainTexture(this.automata.regla_5_color_2);
    const pathTexture = this.createPathTexture(this.automata.regla_1_color_2);

    // Geometrías compartidas
    const geometries = {
      cube: new THREE.BoxGeometry(1, 1, 1),
      trunk: new THREE.BoxGeometry(0.3, 2.0, 0.3),
      leaves: new THREE.ConeGeometry(1.2, 3.0, 8),
      water: new THREE.BoxGeometry(1, 0.2, 1),
      path: new THREE.BoxGeometry(1, 1, 1)
    };

    // Materiales compartidos: usamos MeshStandardMaterial para que reaccionen a la luz y sombras
    const materials = {
      trunk: new THREE.MeshStandardMaterial({
        color: 0x3D2410, // Tronco color café
        roughness: 0.9,
        metalness: 0.1,
      }),
      leaves: new THREE.MeshStandardMaterial({
        color: this.automata.regla_3_color_2, // Color de las hojas del automata
        roughness: 0.8,
        metalness: 0.1,
        flatShading: true,
        side: THREE.DoubleSide
      }),
      ground: new THREE.MeshStandardMaterial({
        map: groundTexture,
        bumpMap: groundTexture,
        bumpScale: 0.1,
        color: this.automata.regla_4_color_2,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true
      }),
      water: new THREE.MeshStandardMaterial({
        color: this.automata.regla_2_color_2, // gris por ahora
        transparent: true,
        roughness: 0.1,
        metalness: 0.8,
        opacity: 0.8
      }),
      mountain: new THREE.MeshStandardMaterial({
        map: mountainTexture,
        bumpMap: mountainTexture,
        bumpScale: 0.15,
        color: this.automata.regla_5_color_2,
        roughness: 0.7,
        metalness: 0.2,
        flatShading: true
      }),
      path: new THREE.MeshStandardMaterial({
        map: pathTexture,
        bumpMap: pathTexture,
        bumpScale: 0.1,
        color: this.automata.regla_1_color_2,
        roughness: 0.9,
        metalness: 0.1,
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
      geometry: geometries.cube,
      // geometry: geometries.water,
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
  // --- Funciones para texturas procedurales ---

  private createGroundTexture(baseColorHex: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;

    // Usar el color base proporcionado
    context.fillStyle = baseColorHex;
    context.fillRect(0, 0, 128, 128);

    // Añadir textura (ruido) más claro/oscuro sobre el color base
    for (let y = 0; y < 128; y += 2) {
      for (let x = 0; x < 128; x += 2) {
        if (Math.random() > 0.5) {
          const intensity = Math.random() > 0.5 ? 0.1 : -0.1;
          context.fillStyle = `rgba(0, 0, 0, ${Math.abs(intensity)})`;
          context.fillRect(x, y, 2, 2);
        }
      }
    }

    const texture = new THREE.Texture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.needsUpdate = true;
    return texture;
  }

  private createMountainTexture(baseColorHex: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    context.fillStyle = baseColorHex;
    context.fillRect(0, 0, 256, 256);

    // Añadir patrón de roca (puntos y trazos de contraste)
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = 1 + Math.random() * 4;
      const isDark = Math.random() > 0.5;
      context.fillStyle = isDark ? `rgba(0, 0, 0, 0.15)` : `rgba(255, 255, 255, 0.1)`;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createPathTexture(baseColorHex: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    context.fillStyle = baseColorHex;
    context.fillRect(0, 0, 256, 256);

    // Añadir textura de camino (pequeñas piedritas)
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = 1 + Math.random() * 2;

      context.fillStyle = `rgba(0, 0, 0, 0.1)`;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
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
    <div class="fps-counter">FPS: {{ currentFps }}</div>
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
      z-index: 10;
    }
    .fps-counter {
      position: fixed;
      top: 20px;
      right: 230px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #00ff00;
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: bold;
      font-family: monospace;
      pointer-events: none;
      z-index: 100;
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


  @Input() datos_matriz: { state: number, color: string }[][];

  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @ViewChild('minimapContainer', { static: true }) minimapContainer!: ElementRef;

  currentFps: number = 0;
  private frameCount: number = 0;
  private lastFpsTime: number = performance.now();

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: PointerLockControls;
  private matrix: any[][] = [];

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
    'pig': {
      body: '#FFC0CB',
      face: '#FFB6C1',
      legs: '#FF69B4'
    },
    'chicken': {
      body: '#FFFFFF',
      face: '#FF0000',
      legs: '#FFA500'
    },
    'cow': {
      body: '#FFFFFF', // El cuerpo base, le añadiremos manchas grises
      face: '#F5DEB3',
      legs: '#000000'
    },
    'duck': {
      body: '#32CD32', // Pato de cuello verde / mallard
      face: '#228B22',
      legs: '#FFA500'
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

  // Variables para construir
  private raycaster = new THREE.Raycaster();
  private centerPoint = new THREE.Vector2(0, 0); // Centro de la pantalla para el raycaster
  private userBlocks: THREE.Mesh[] = [];
  private buildMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513, roughness: 0.9, metalness: 0.0 // Color madera/tierra para las construcciones
  });
  private buildGeometry = new THREE.BoxGeometry(1, 1, 1);

  // Añadir propiedad para controlar el tiempo entre guardados
  private lastSaveTime: number = 0;
  @Input() automata: Automata;

  constructor(
    private route: ActivatedRoute
  ) {
    this.blockFactory = new BlockFactory();
    // this.flyweightFactory = BlockFlyweightFactory.getInstance(this.automata);
  }

  ngOnInit() {


    // this.flyweightFactory = new BlockFlyweightFactory(this.automata);
    this.flyweightFactory = BlockFlyweightFactory.getInstance(this.automata);

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
        console.log("tengo datos matriz !!!!")
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

      if (this.datos_matriz) {
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
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Mejores sombras

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Configuración de luz diurna con sombras
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    // Posicionar la luz para generar sombras más dramáticas y notorias
    this.directionalLight.position.set(50, 100, 50);
    this.directionalLight.castShadow = true;

    // Aumentar la resolución del mapa de sombras para que no se vean pixeladas
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;

    // Configurar cámara de sombras para que abarque todo el mundo posible
    const d = 100;
    this.directionalLight.shadow.camera.left = -d;
    this.directionalLight.shadow.camera.right = d;
    this.directionalLight.shadow.camera.top = d;
    this.directionalLight.shadow.camera.bottom = -d;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 500;
    this.directionalLight.shadow.bias = -0.0005;

    this.scene.add(this.directionalLight);

    // Bajar un poco la luz ambiental para que resalte la luz direccional y las caras cambien de color con la rotación
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.8);
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

    // Añadir nubes y animales
    this.createClouds();
    this.initAnimals();
  }

  private initAnimals() {
    // Generar animales en posiciones aleatorias del mapa
    const types = ['pig', 'cow', 'chicken', 'duck'];
    const worldSize = Math.max(this.matrix.length, this.matrix[0] ? this.matrix[0].length : 0);
    const numAnimals = 15; // Cantidad total de animales

    for (let i = 0; i < numAnimals; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      // Posición aleatoria dentro del mapa
      const x = (Math.random() - 0.5) * worldSize * 0.8;
      const z = (Math.random() - 0.5) * worldSize * 0.8;

      // Determinar altura del terreno en ese punto
      const y = this.getTerrainHeightAt(x, z);

      const animal = this.createAnimal(type, new THREE.Vector3(x, y + 1, z));
      this.animals.push(animal);
    }
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


          const baseHeight = cell.height; // Usar la altura de la celda como base

          const context: BlockContext = {
            position: new THREE.Vector3(worldX, height, worldZ),
            rotation: new THREE.Euler(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1)
          };

          switch (cell.color) {
            case 'Green':
              this.treePositions.push(new THREE.Vector3(worldX, 0, worldZ));
              const treeHeight = this.automata.altura_regla_3 || 1;
              const groundHeight = this.automata.altura_regla_4 || 1;

              // Agregar base de tierra (mismo color que 'Brown')
              this.addBlockContext('ground', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, groundHeight, 1)
              });

              // Calcular la parte superior del bloque de tierra para apoyar el árbol
              // El bloque 'ground' (cubo de 1x1x1) tiene su base en (position.y - scale.y/2) y su techo en (position.y + scale.y/2)
              const groundTop = height + 1.0 + groundHeight / 2;

              // Para que el árbol respete la altura configurada y empiece exactamente sobre la tierra:
              // Repartimos la altura total: 40% tronco, 70% hojas (solapamiento del 10%)
              // La geometría del tronco mide 2.0 y la del cono 3.0
              this.addBlockContext('trunk', {
                position: new THREE.Vector3(worldX, groundTop + treeHeight * 0.2, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, treeHeight * 0.2, 1)
              });
              this.addBlockContext('leaves', {
                position: new THREE.Vector3(worldX, groundTop + treeHeight * 0.65, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, (treeHeight * 0.7) / 3.0, 1)
              });
              break;



            // switch(color) {
            //   case 'Green': // Árboles
            //     return this.automata.altura_regla_3;
            //   case 'Brown': // Tierra
            //     return this.automata.altura_regla_4;
            //   case 'Blue': // Agua
            //     return this.automata.altura_regla_2;
            //     // return -0.2;
            //   case 'Gray': // Montañas
            //     return this.automata.altura_regla_5;
            //   case 'Red': // Caminos
            //     return this.automata.altura_regla_1;
            //   default:
            //     return 0;





            case 'Brown':
              this.addBlockContext('ground', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, this.automata.altura_regla_4, 1)
              });
              break;
            case 'Blue':
              this.addBlockContext('water', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, this.automata.altura_regla_2, 1)
              });
              break;
            case 'Gray':
              this.addBlockContext('mountain', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, this.automata.altura_regla_5, 1)
              });
              break;
            case 'Red':
              this.addBlockContext('path', {
                position: new THREE.Vector3(worldX, height + 1.0, worldZ),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, this.automata.altura_regla_1, 1)
              });
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
    return 0
    switch (color) {
      case 'Green': // Árboles
        return this.automata.altura_regla_3;
      case 'Brown': // Tierra
        return this.automata.altura_regla_4;
      case 'Blue': // Agua
        return this.automata.altura_regla_2;
      // return -0.2;
      case 'Gray': // Montañas
        return this.automata.altura_regla_5;
      case 'Red': // Caminos
        return this.automata.altura_regla_1;
      default:
        return 0;
    }
  }

  private checkWaterCollision() {
    // Obtener la posición actual del jugador en coordenadas de la matriz usando Math.round (los centros son enteros)
    const matrixX = Math.round(this.camera.position.x + this.matrix.length / 2);
    const matrixZ = Math.round(this.camera.position.z + this.matrix[0].length / 2);

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
    const worldWidth = this.matrix.length;
    const worldDepth = this.matrix[0].length;

    // Remove old minimap blocks
    const objectsToRemove: THREE.Object3D[] = [];
    this.minimapScene.traverse((child) => {
      // Don't remove the player marker
      if (child !== this.playerMarker && child.type === 'Mesh' && child.userData['isMinimapBlock']) {
        objectsToRemove.push(child);
      }
    });
    objectsToRemove.forEach(obj => this.minimapScene.remove(obj));

    // Create a merged geometry for each color
    const blocksByColor: { [key: string]: THREE.InstancedMesh } = {};
    const instancesCountByColor: { [key: string]: number } = {};

    // First count how many instances we need for each color to size the InstancedMesh
    for (let x = -worldWidth; x < worldWidth * 2; x++) {
      for (let z = -worldDepth; z < worldDepth * 2; z++) {
        const wrappedX = ((x % worldWidth) + worldWidth) % worldWidth;
        const wrappedZ = ((z % worldDepth) + worldDepth) % worldDepth;
        const cell = this.matrix[wrappedX][wrappedZ];

        if (cell.state === 1) {
          if (!instancesCountByColor[cell.color]) instancesCountByColor[cell.color] = 0;
          instancesCountByColor[cell.color]++;
        }
      }
    }

    // Create the instanced meshes
    const geometry = new THREE.BoxGeometry(1, 0.1, 1);
    Object.keys(instancesCountByColor).forEach(color => {
      let hexColor: string | number = this.colorMap[color];

      // Use dynamic colors from automata if available
      if (this.automata) {
        switch (color) {
          case 'Green': hexColor = this.automata.regla_3_color_2 || hexColor; break;
          case 'Blue': hexColor = this.automata.regla_2_color_2 || hexColor; break;
          case 'Brown': hexColor = this.automata.regla_4_color_2 || hexColor; break;
          case 'Gray': hexColor = this.automata.regla_5_color_2 || hexColor; break;
          case 'Red': hexColor = this.automata.regla_1_color_2 || hexColor; break;
        }
      }

      const baseColor = new THREE.Color(hexColor);
      baseColor.multiplyScalar(0.8);

      const material = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: color === 'Blue',
        opacity: color === 'Blue' ? 0.6 : 1.0
      });

      const instancedMesh = new THREE.InstancedMesh(geometry, material, instancesCountByColor[color]);
      instancedMesh.userData['isMinimapBlock'] = true;
      blocksByColor[color] = instancedMesh;
      this.minimapScene.add(instancedMesh);
    });

    // Populate matrices
    const instancesIndexTracker: { [key: string]: number } = {};
    const dummyMatrix = new THREE.Matrix4();
    const position = new THREE.Vector3();

    for (let x = -worldWidth; x < worldWidth * 2; x++) {
      for (let z = -worldDepth; z < worldDepth * 2; z++) {
        const wrappedX = ((x % worldWidth) + worldWidth) % worldWidth;
        const wrappedZ = ((z % worldDepth) + worldDepth) % worldDepth;
        const cell = this.matrix[wrappedX][wrappedZ];

        if (cell.state === 1) {
          position.set(x + offsetX, 0, z + offsetZ);
          dummyMatrix.makeTranslation(position.x, position.y, position.z);

          if (!instancesIndexTracker[cell.color]) instancesIndexTracker[cell.color] = 0;
          const mapMesh = blocksByColor[cell.color];
          mapMesh.setMatrixAt(instancesIndexTracker[cell.color]++, dummyMatrix);
        }
      }
    }

    // Update instance matrices
    Object.values(blocksByColor).forEach(mesh => {
      mesh.instanceMatrix.needsUpdate = true;
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
      // Regresamos a resetear la rotación en caso de que se haya guardado algún estado anterior
      child.rotation.x = 0;

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

      const floorY = this.getTerrainHeightAt(this.camera.position.x, this.camera.position.z) + this.playerHeight;

      if (!this.isFlying && this.camera.position.y <= floorY && !this.isUnderwater) {
        this.velocity.y = 0;
        this.camera.position.y = floorY;
        this.canJump = true;
      }

      this.updatePlayerAnimation();
      this.updateMinimap();
      this.updateClouds(delta);

      // Actualizar ciclo de día y noche
      this.updateTimeOfDay();

      // Actualizar animales y su movimiento
      this.updateAnimals(currentTime);
      this.animals.forEach(animal => this.moveAnimal(animal, delta));
      this.checkAnimalCollisions();
    }

    // Guardar estado cada 5 segundos
    if (currentTime - this.lastSaveTime > 5000) {
      this.saveGameState();
      this.lastSaveTime = currentTime;
    }

    this.frameCount++;
    if (currentTime - this.lastFpsTime >= 1000) {
      this.currentFps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = currentTime;
    }

    this.renderer.render(this.scene, this.camera);
    this.prevTime = currentTime;
  }

  private hasMovedSignificantly(): boolean {
    const moveThreshold = 1.0; // unidades de mundo
    return Math.abs(this.camera.position.x - this.lastChunkPosition.x) > moveThreshold ||
      Math.abs(this.camera.position.z - this.lastChunkPosition.y) > moveThreshold;
  }

  private getTerrainHeightAt(x: number, z: number): number {
    let baseHeightFallback = 1.5;
    let computedHeight = 0;

    if (!this.matrix || this.matrix.length === 0) computedHeight = baseHeightFallback;
    else {
      const matrixX = Math.round(x + this.matrix.length / 2);
      const matrixZ = Math.round(z + this.matrix[0].length / 2);

      if (matrixX >= 0 && matrixX < this.matrix.length && matrixZ >= 0 && matrixZ < this.matrix[0].length) {
        const cell = this.matrix[matrixX][matrixZ];
        if (cell.state === 1) {
          const baseHeight = 1.0;
          switch (cell.color) {
            case 'Green':
            case 'Brown':
              computedHeight = baseHeight + (this.automata.altura_regla_4 || 1) / 2;
              break;
            case 'Blue':
              computedHeight = baseHeight + (this.automata.altura_regla_2 || 1) / 2;
              break;
            case 'Gray':
              computedHeight = baseHeight + (this.automata.altura_regla_5 || 1) / 2;
              break;
            case 'Red':
              computedHeight = baseHeight + (this.automata.altura_regla_1 || 1) / 2;
              break;
            default:
              computedHeight = baseHeightFallback;
          }
        } else {
          computedHeight = baseHeightFallback;
        }
      } else {
        computedHeight = baseHeightFallback;
      }
    }

    // Comprobar si hay un bloque construido por el usuario aquí
    let highestUserBlock = -Infinity;
    for (const block of this.userBlocks) {
      if (Math.abs(block.position.x - x) <= 0.5 && Math.abs(block.position.z - z) <= 0.5) {
        highestUserBlock = Math.max(highestUserBlock, block.position.y + 0.5); // +0.5 is top of block
      }
    }

    return Math.max(computedHeight, highestUserBlock);
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
    const worldWidth = this.matrix.length;
    const worldDepth = this.matrix[0].length;
    const halfWidth = worldWidth / 2;
    const halfDepth = worldDepth / 2;

    // Comportamiento toroidal para el eje X (Este-Oeste)
    if (this.camera.position.x < -halfWidth) {
      this.camera.position.x += worldWidth;
    } else if (this.camera.position.x >= halfWidth) {
      this.camera.position.x -= worldWidth;
    }

    // Comportamiento toroidal para el eje Z (Norte-Sur)
    if (this.camera.position.z < -halfDepth) {
      this.camera.position.z += worldDepth;
    } else if (this.camera.position.z >= halfDepth) {
      this.camera.position.z -= worldDepth;
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
            audio.play().catch(() => { }); // Ignorar error si el navegador bloquea el audio
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

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.isLocked) return;

    // Actualizar raycaster desde el centro de la cámara
    this.raycaster.setFromCamera(this.centerPoint, this.camera);

    // Obtener objetos a interceptar (terrain instanciado + bloques de usuario)
    const objectsToIntersect = [...Object.values(this.instancedMeshes), ...this.userBlocks];

    // intersectObjects(objects, recursive)
    const intersects = this.raycaster.intersectObjects(objectsToIntersect, false);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      // Limitar distancia de construcción a 10 unidades
      if (intersect.distance > 10) return;

      if (event.button === 0) { // Click izquierdo: Construir
        // Calcular posición alineada a la grilla usando la normal de la cara interceptada
        // if (intersect.normal) {
        //   const pos = intersect.point.clone().add(intersect.normal.clone().multiplyScalar(0.5));
        //   pos.x = Math.round(pos.x);
        //   pos.y = Math.round(pos.y);
        //   pos.z = Math.round(pos.z);

        //   const block = new THREE.Mesh(this.buildGeometry, this.buildMaterial);
        //   block.position.copy(pos);
        //   block.castShadow = true;
        //   block.receiveShadow = true;

        //   this.scene.add(block);
        //   this.userBlocks.push(block);
        // }
      } else if (event.button === 2) { // Click derecho: Destruir solo bloques de usuario
        const index = this.userBlocks.indexOf(intersect.object as THREE.Mesh);
        if (index > -1) {
          this.scene.remove(intersect.object);
          this.userBlocks.splice(index, 1);
        }
      }
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: Event) {
    // Evitar que aparezca el menú contextual del click derecho cuando estamos jugando
    if (this.isLocked) {
      event.preventDefault();
    }
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

    // Diferentes modelos según tipo
    let bodyGeometry, headGeometry;
    const bodyMat = new THREE.MeshStandardMaterial({ color: colors.body });
    const headMat = new THREE.MeshStandardMaterial({ color: colors.face });
    const legMat = new THREE.MeshStandardMaterial({ color: colors.legs });

    if (type === 'cow') {
      bodyGeometry = new THREE.BoxGeometry(0.8, 0.6, 1.2);
      headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      // Detalles de vaca (manchas)
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.62, 0.3), darkMat);
      spot1.position.set(0.1, 0, 0.2);
      group.add(spot1);
    } else if (type === 'pig') {
      bodyGeometry = new THREE.BoxGeometry(0.7, 0.5, 1.0);
      headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    } else {
      // Aves (chicken/duck)
      bodyGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.5);
      headGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.2);
    }

    const body = new THREE.Mesh(bodyGeometry, bodyMat);
    body.position.y = bodyGeometry.parameters.height / 2 + 0.3; // Elevado por las patas
    group.add(body);

    const head = new THREE.Mesh(headGeometry, headMat);
    head.position.set(0, body.position.y + bodyGeometry.parameters.height / 2 + 0.1, bodyGeometry.parameters.depth / 2);
    group.add(head);

    // Patas (4 para mamiferos, 2 para aves)
    const legGeom = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const numLegs = (type === 'cow' || type === 'pig') ? 4 : 2;

    for (let i = 0; i < numLegs; i++) {
      const leg = new THREE.Mesh(legGeom, legMat);
      const zOffset = numLegs === 4 ? (i < 2 ? 0.3 : -0.3) : 0;
      const xOffset = (i % 2 === 0) ? 0.2 : -0.2;
      leg.position.set(xOffset, 0.15, zOffset);
      group.add(leg);
    }

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

  private updateTimeOfDay(): void {
    if (!this.directionalLight || !this.ambientLight || !this.sun || !this.moon) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.dayStartTime;
    // Progreso del día entre 0 (inicio) y 1 (fin, equivalente a 20 minutos)
    const dayProgress = (elapsed % this.DAY_LENGTH) / this.DAY_LENGTH;
    // Ángulo del sol: 0 es mediodía (arriba), Math.PI es medianoche (abajo)
    const angle = dayProgress * Math.PI * 2;

    // Posiciones orbitales basadas en la cámara (el cielo nos sigue)
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;

    this.sun.position.x = cx + Math.cos(angle - Math.PI / 2) * this.CELESTIAL_DISTANCE;
    this.sun.position.y = Math.sin(angle - Math.PI / 2) * this.CELESTIAL_DISTANCE;
    this.sun.position.z = cz;

    // La luna está en el lado opuesto
    this.moon.position.x = cx + Math.cos(angle + Math.PI / 2) * this.CELESTIAL_DISTANCE;
    this.moon.position.y = Math.sin(angle + Math.PI / 2) * this.CELESTIAL_DISTANCE;
    this.moon.position.z = cz;

    // Actualizar fuente de luz principal (Direccional) para que coincida con el sol/luna superior
    // Si es de día el sol ilumina, si es de noche la luna ilumina débilmente
    if (this.sun.position.y > 0) {
      this.directionalLight.position.copy(this.sun.position);
      // Intensidad normal de día
      this.directionalLight.intensity = Math.max(0.1, Math.sin(angle - Math.PI / 2)) * 1.5;
      this.directionalLight.color.setHex(0xffffff);
    } else {
      this.directionalLight.position.copy(this.moon.position);
      // Intensidad muy baja de noche
      this.directionalLight.intensity = Math.max(0.1, Math.sin(angle + Math.PI / 2)) * 0.3;
      this.directionalLight.color.setHex(0xaaaaaa); // Luz más fría
    }

    // Actualizar luz ambiental (menor en la noche)
    if (this.sun.position.y > 50) {
      this.ambientLight.intensity = 0.8;
    } else if (this.sun.position.y < -10) {
      this.ambientLight.intensity = 0.2;
    } else {
      // Transición
      const t = (this.sun.position.y + 10) / 60; // 0 (noche) a 1 (día)
      this.ambientLight.intensity = 0.2 + 0.6 * t;
    }

    // Cambiar color del cielo y niebla según el momento del día
    let currentSkyColor = new THREE.Color();
    const isDay = dayProgress < 0.45;
    const isDusk = dayProgress >= 0.45 && dayProgress < 0.55;
    const isNight = dayProgress >= 0.55 && dayProgress < 0.95;
    const isDawn = dayProgress >= 0.95;

    if (isDay) {
      currentSkyColor.copy(this.skyColors.day);
    } else if (isNight) {
      currentSkyColor.copy(this.skyColors.night);
    } else if (isDusk) {
      // Interpolar Dia -> Atardecer -> Noche
      let t = (dayProgress - 0.45) / 0.1;
      if (t < 0.5) currentSkyColor.lerpColors(this.skyColors.day, this.skyColors.dawn, t * 2);
      else currentSkyColor.lerpColors(this.skyColors.dawn, this.skyColors.night, (t - 0.5) * 2);
    } else if (isDawn) {
      // Interpolar Noche -> Amanecer -> Dia
      let t = (dayProgress - 0.95) / 0.05;
      if (t < 0.5) currentSkyColor.lerpColors(this.skyColors.night, this.skyColors.dawn, t * 2);
      else currentSkyColor.lerpColors(this.skyColors.dawn, this.skyColors.day, (t - 0.5) * 2);
    }

    this.normalFogColor = currentSkyColor.clone();

    // Solo cambiar el color real del cielo si no estamos bajo el agua
    if (!this.isUnderwater) {
      this.scene.background = currentSkyColor;
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color = currentSkyColor;
      }
    }
  }

  private updateAnimals(currentTime: number): void {
    if (currentTime - this.lastAnimalUpdate < 2000) return; // Revisar estado cada 2 seg
    this.lastAnimalUpdate = currentTime;

    this.animals.forEach(animal => {
      if (animal && animal.mesh) {
        this.updateAnimalBehavior(animal);
      }
    });
  }

  private moveAnimal(animal: Animal, delta: number): void {
    if (!animal.targetPosition || !animal.isAlive) return;

    const speed = (animal.type === 'chicken' || animal.type === 'duck') ? 1.5 : 1.0;

    // Distancia al objetivo
    const dx = animal.targetPosition.x - animal.position.x;
    const dz = animal.targetPosition.z - animal.position.z;
    const distanceToTarget = Math.sqrt(dx * dx + dz * dz);

    if (distanceToTarget > 0.5) {
      // Mover hacia el objetivo
      const direction = new THREE.Vector3(dx, 0, dz).normalize();
      const movement = direction.multiplyScalar(speed * delta);
      animal.position.add(movement);

      // Actualizar Y para seguir el terreno
      animal.position.y = this.getTerrainHeightAt(animal.position.x, animal.position.z);
      animal.mesh.position.copy(animal.position);

      // Rotar suavemente hacia la dirección del movimiento
      const targetAngle = Math.atan2(dx, dz);
      // Interpolación simple de ángulo
      let diff = targetAngle - animal.mesh.rotation.y;
      // Normalizar a [-PI, PI]
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      animal.mesh.rotation.y += diff * 0.1;

      // Animar patas estilo balancín simple
      const walkingCycle = performance.now() * 0.015;
      animal.mesh.children.forEach((child, index) => {
        // Asumiendo que las patas fueron añadidas de ultimo
        if (index >= 2) {
          child.position.y = 0.15 + Math.abs(Math.sin(walkingCycle + (index % 2 * Math.PI))) * 0.1;
        }
      });
    } else {
      // Llegó al objetivo
      animal.targetPosition = undefined;
    }
  }

  private checkAnimalCollisions(): void {
    // Para simplificar vida de granja, no hay depredadores, 
    // pero pueden esquivar al jugador ligeramente si este se acerca mucho.
    this.animals.forEach(animal => {
      if (!animal.isAlive) return;
      const playerDistance = this.camera.position.distanceTo(animal.position);

      if (playerDistance < 3) {
        // Huir del jugador (elegir punto en dirección contraria)
        const escapeDir = new THREE.Vector3().subVectors(animal.position, this.camera.position).setY(0).normalize();
        animal.targetPosition = animal.position.clone().add(escapeDir.multiplyScalar(5));
      }
    });
  }

  private updateAnimalBehavior(animal: Animal): void {
    if (!animal.isAlive) return;

    // Si ya tienen objetivo, siguen hasta él (gestionado en moveAnimal)
    if (animal.targetPosition) return;

    const currentTime = performance.now();

    // Solo cambiar de estado después de estar parado un tiempo aleatorio
    if (currentTime - animal.lastStateChange > Math.random() * 5000 + 4000) {
      // 50% de probabilidad de pasear, 50% de quedarse quieto pastando/comiendo
      if (Math.random() > 0.5) {
        const wanderOffsetX = (Math.random() - 0.5) * 8; // Moverse en un radio corto
        const wanderOffsetZ = (Math.random() - 0.5) * 8;
        animal.targetPosition = new THREE.Vector3(
          animal.position.x + wanderOffsetX,
          animal.position.y,
          animal.position.z + wanderOffsetZ
        );
      }
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