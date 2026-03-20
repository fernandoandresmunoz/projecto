import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LienzosService } from '../graficos.service';

@Component({
  selector: 'app-lienzo-detail',
  templateUrl: './lienzo-detail.component.html',
  styleUrls: ['./lienzo-detail.component.styl']
})
export class LienzoDetailComponent implements OnInit {


  points: any = [];
  cargando: boolean = true;
  errorCarga: boolean = false;

  lienzoID: number;

  constructor(
    private route: ActivatedRoute,
    private lienzoService: LienzosService
  ) { }


  // constructor(
  //   private router: Router,
  //   private componente: ComponenteService,
  //   private route: ActivatedRoute,
  //   private http: HttpClient,
  //   public app: ApplicationService,
  //   private snackBar: MatSnackBar,
  //   private main: MainService,
  //   public dialogRef: MatDialogRef<CompuestoComponent>,
  //   ) {
  
  // }


  // ngOnInit() {
  //     this.route.params.subscribe(params => {
  //       let id = params['id'];
  //       this.id = id
  //       this.loadChart(id);
  //   });
  // }


  ngOnInit(): void {
      this.route.params.subscribe(params => {
        let id = params['id'];
        this.lienzoID = id;
        this.loadPoints(id);
    });
  }

  loadPoints(lienzoID: number): void {
    this.cargando = true;
    this.errorCarga = false;

    this.lienzoService.getPoints(lienzoID).subscribe({
      next: (data) => {
        // La solicitud fue exitosa, guardamos los datos
        this.points = data;
        this.cargando = false;
      },
      error: (error) => {
        // Hubo un error en la solicitud
        this.cargando = false;
        this.errorCarga = true;
        console.error('Error al cargar lienzos:', error);
      }
    });
  }




}
