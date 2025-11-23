import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestappComponent } from './testapp/testapp.component';
import { HomeComponent } from './home/home.component';
import { VoidComponent } from './void/void.component';
import { TreeComponent } from './tree/tree.component';
import { Automata1Component } from './automata1/automata1.component';
import { AutomataComponent } from './automata/automata.component';
import { Automata2Component } from './automata2/automata2.component';
import { Automata3Component } from './automata3/automata3.component';
import { GliderComponent } from './glider/glider.component';
// import { ParabolaComponent } from './parabola/parabola.component';
import { SenoComponent } from './funciones/seno/seno.component';
import { FuncionSenoComponent } from './funcion-seno/funcion-seno.component';
import { GaussComponent } from './gauss/gauss.component';
import { FuncionPolinomicaComponent } from './funcion-polinomica/funcion-polinomica.component';
import { FuncionLogaritmicaComponent } from './funcion-logaritmica/funcion-logaritmica.component';
import { FuncionExponencialComponent } from './funcion-exponencial/funcion-exponencial.component';
import { FuncionCuadraticaComponent } from './funcion-cuadratica/funcion-cuadratica.component';
import { LienzoComponent } from './lienzos/lienzo/lienzo.component';
import { Graficadora2Component } from './lienzos/lienzos/graficadora2/graficadora2.component';
import { ExponencialesComponent } from './lienzos/lienzos/exponenciales/exponenciales.component';
import { ListaDeLienzosComponent } from './lienzos/lista-de-lienzos/lista-de-lienzos.component';
import { ControladorFilaComponent } from './rule110/controlador-fila/controlador-fila.component';
import { ReglasComponent } from './reglas/reglas.component';
import { NuevoAutomataComponent } from './nuevo-automata/nuevo-automata.component';
import { MinecraftViewComponent } from './minecraft-view/minecraft-view.component';
import { CurvasComponent } from './curvas/curvas.component';
import { RectaComponent } from './recta/recta.component';
import { AutomatasComponent } from './automatas/automatas.component';
import { LienzosComponent } from './lienzos/lienzos.component';
import { LienzoDetailComponent } from './lienzo-detail/lienzo-detail.component';
import { MatricesComponent } from './matrices/matrices.component';
import { ArbolesComponent } from './arboles/arboles.component';
import { DetalleNodoComponent } from './detalle-nodo/detalle-nodo.component';
import { DetalleMatrizComponent } from './detalle-matriz/detalle-matriz.component';
import { WrapperMinecraftViewComponent } from './wrapper-minecraft-view/wrapper-minecraft-view.component';
import { EditorComponent } from './editor/editor.component';
// import { DetalleNodoComponent } from './detalle-nodo/detalle-nodo.component';

const routes: Routes = [
  // es el mismo que drawer
{
    path: 'grafico',
    component: FuncionLogaritmicaComponent
  },
{
    path: 'matrices',
    component: MatricesComponent
  },
{
    path: 'arboles',
    component: ArbolesComponent
  },
{
    path: 'nodo/:id',
    component: DetalleNodoComponent
  },
  {
    path: 'matrices/:id',
    component: DetalleMatrizComponent
  },
  {
    path: 'matrices/3d/:id',
    component: WrapperMinecraftViewComponent
  },
  {
    path: '',
    'component': HomeComponent
  },
  {
    path: 'minecraft-view',
    component: MinecraftViewComponent
  },
  // {
  //   path: 'test-path',
  //   component: TestappComponent
  // },
  {
    path: 'tree',
    component: TreeComponent
  },


 {
    path: 'void',
    component: VoidComponent
  },

  {
    path: 'automatas',
    component: AutomatasComponent,
    children: [
      {
        path: 'automata-1',
        component: Automata1Component
      },
      {
        path: 'automata-2',
        component: Automata2Component
      },
      {
        path: 'automata-3',
        component: Automata3Component
      },
      {
        path: 'glider',
        component: GliderComponent
      },
      {
        path: 'nuevo-automata',
        component: NuevoAutomataComponent
      },
    ]

  },

  {
    path: 'curvas',
    component: CurvasComponent,
    children: [
      {
        path: 'lienzos',
        component: LienzosComponent
      },
      {
        path: 'lienzos/:id',
        component: LienzoDetailComponent
      },
      {
        path: 'funcion-cuadratica',
        component: FuncionCuadraticaComponent
      },
      {
        path: 'funcion-exponencial',
        component: FuncionExponencialComponent
      },
      {
        path: 'gauss',
        component: GaussComponent
      },
      {
        path: 'funcion-polinomica',
        component: FuncionPolinomicaComponent
      },
      {
        path: 'funcion-seno',
        component: FuncionSenoComponent
      },
      {
        path: 'recta',
        component: RectaComponent
      },
      {
        path: 'exponenciales',
        component: ExponencialesComponent
      },
      {
        path: 'lista-lienzos',
        component: ListaDeLienzosComponent
      },
    ]

  },
// { 
//     path: 'funcion-cuadratica',
//     component: FuncionCuadraticaComponent
//   },

{ 
    path: 'funcion-logaritmica',
    component: FuncionLogaritmicaComponent
  },


// { 
//     path: 'nueva-calculadora',
//     component: Graficadora2Component
//   },


{ 
    path: 'rule110',
    component: ControladorFilaComponent
  },
  {
    path: 'reglas/:id',
    component: ReglasComponent
  },
  {
    path: 'rules/:id',
    component: ReglasComponent
  },
  {
    path: 'rule/:id',
    component: ReglasComponent
  },

  {
    path: 'vista-cubos-3d',
    component: MinecraftViewComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  }











];
    // <li> <a [routerLink]="['/gauss']">gauss</a></li>
    // <li> <a [routerLink]="['/funcion-seno']">función seno</a></li>
    // <li> <a [routerLink]="['/funcion-cuadratica']">función cuadrática</a></li>
    // <li> <a [routerLink]="['/funcion-exponencial']">función exponencial</a></li>
    // <li> <a [routerLink]="['/funcion-logaritmica']">función logarítmica</a></li>
    // <li> <a [routerLink]="['/funcion-polinomica']">función polinómica</a></li>
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
