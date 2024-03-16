import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestappComponent } from './testapp/testapp.component';
import { HomeComponent } from './home/home.component';
import { VoidComponent } from './void/void.component';
import { TreeComponent } from './tree/tree.component';
import { Automata1Component } from './automata1/automata1.component';

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
