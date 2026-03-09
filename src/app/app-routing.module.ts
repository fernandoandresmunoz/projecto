import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatricesComponent } from './matrices/matrices.component';
import { DetalleMatrizComponent } from './detalle-matriz/detalle-matriz.component';
import { WrapperMinecraftViewComponent } from './wrapper-minecraft-view/wrapper-minecraft-view.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'matrices',
        component: MatricesComponent
      },
      {
        path: 'matrices/:id',
        component: DetalleMatrizComponent
      },
    ]
  }, {
    path: 'matrices/3d/:id',
    component: WrapperMinecraftViewComponent
  },
  // {
  //   path: 'convolution/:id',
  //   component: ConvolutionComponent
  // },

  // {
  //   path: 'grafico',
  //   component: FuncionLogaritmicaComponent
  // },

  // {
  //   path: 'arboles',
  //   component: ArbolesComponent
  // },
  // {
  //   path: 'nodo/:id',
  //   component: DetalleNodoComponent
  // },

  // // {
  // //   path: 'matrix/:id',
  // //   component: DetalleMatrizComponent
  // // },
  // {
  //   path: 'matrices/3d/:id',
  //   component: WrapperMinecraftViewComponent
  // },
  // {
  //   path: '',
  //   'component': MenuComponent
  // },
  // {
  //   path: 'minecraft-view',
  //   component: MinecraftViewComponent
  // },
  // // {
  // //   path: 'test-path',
  // //   component: TestappComponent
  // // },
  // {
  //   path: 'tree',
  //   component: TreeComponent
  // },


  // {
  //   path: 'void',
  //   component: VoidComponent
  // },

  // {
  //   path: 'automatas',
  //   component: AutomatasComponent,
  //   children: [
  //     {
  //       path: 'automata-1',
  //       component: Automata1Component
  //     },
  //     {
  //       path: 'automata-2',
  //       component: Automata2Component
  //     },
  //     {
  //       path: 'automata-3',
  //       component: Automata3Component
  //     },
  //     {
  //       path: 'glider',
  //       component: GliderComponent
  //     },
  //     {
  //       path: 'nuevo-automata',
  //       component: NuevoAutomataComponent
  //     },
  //   ]

  // },

  // {
  //   path: 'curvas',
  //   component: CurvasComponent,
  //   children: [
  //     {
  //       path: 'lienzos',
  //       component: LienzosComponent
  //     },
  //     {
  //       path: 'lienzos/:id',
  //       component: LienzoDetailComponent
  //     },
  //     {
  //       path: 'funcion-cuadratica',
  //       component: FuncionCuadraticaComponent
  //     },
  //     {
  //       path: 'funcion-exponencial',
  //       component: FuncionExponencialComponent
  //     },
  //     {
  //       path: 'gauss',
  //       component: GaussComponent
  //     },
  //     {
  //       path: 'funcion-polinomica',
  //       component: FuncionPolinomicaComponent
  //     },
  //     {
  //       path: 'funcion-seno',
  //       component: FuncionSenoComponent
  //     },
  //     {
  //       path: 'recta',
  //       component: RectaComponent
  //     },
  //     {
  //       path: 'exponenciales',
  //       component: ExponencialesComponent
  //     },
  //     {
  //       path: 'lista-lienzos',
  //       component: ListaDeLienzosComponent
  //     },
  //   ]

  // },
  // // { 
  // //     path: 'funcion-cuadratica',
  // //     component: FuncionCuadraticaComponent
  // //   },

  // {
  //   path: 'funcion-logaritmica',
  //   component: FuncionLogaritmicaComponent
  // },


  // // { 
  // //     path: 'nueva-calculadora',
  // //     component: Graficadora2Component
  // //   },


  // {
  //   path: 'rule110',
  //   component: ControladorFilaComponent
  // },
  // {
  //   path: 'reglas/:id',
  //   component: ReglasComponent
  // },
  // {
  //   path: 'rules/:id',
  //   component: ReglasComponent
  // },
  // {
  //   path: 'rule/:id',
  //   component: ReglasComponent
  // },

  // {
  //   path: 'vista-cubos-3d',
  //   component: MinecraftViewComponent
  // },
  // {
  //   path: 'editor',
  //   component: EditorComponent
  // }











];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
