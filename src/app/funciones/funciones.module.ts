import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenoComponent } from './seno/seno.component';
import { ParabolaComponent } from '../parabola/parabola.component';



@NgModule({
  declarations: [SenoComponent],
  imports: [
    CommonModule,
    ParabolaComponent
  ]
})
export class FuncionesModule { }
