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

const routes: Routes = [
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
    path: 'automata-1',
    component: Automata1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
