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
import { ParabolaComponent } from './parabola/parabola.component';
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

const routes: Routes = [
{
    path: 'grafico',
    component: FuncionLogaritmicaComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'test-path',
    component: TestappComponent
  },
  {
    path: 'tree',
    component: TreeComponent
  },
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
    path: 'void',
    component: VoidComponent
  },
{ 
    path: 'gauss',
    component: GaussComponent
  },
{ 
    path: 'funcion-seno',
    component: FuncionSenoComponent
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
    path: 'funcion-logaritmica',
    component: FuncionLogaritmicaComponent
  },

{ 
    path: 'funcion-polinomica',
    component: FuncionPolinomicaComponent
  },
{ 
    path: 'nueva-calculadora',
    component: Graficadora2Component
  },
{ 
    path: 'exponenciales',
    component: ExponencialesComponent
  },
{ 
    path: 'lista-lienzos',
    component: ListaDeLienzosComponent
  },
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
    path: 'nuevo-automata',
    component: NuevoAutomataComponent
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
