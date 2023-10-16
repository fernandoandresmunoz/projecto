import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { LineComponent } from './line/line.component';
import { PointComponent } from './point/point.component';
import { TwoLinesAppComponent } from './two-lines-app/two-lines-app.component';
import { ArbolComponent } from './arbol/arbol.component';
import { NodoComponent } from './nodo/nodo.component';
import { CurvaComponent } from './curva/curva.component';
import { TablaNodoComponent } from './tabla-nodo/tabla-nodo.component';
import { ArbolViewComponent } from './arbol-view/arbol-view.component';
import { ControladorUmbralesComponent } from './controlador-umbrales/controlador-umbrales.component';
import { TablaComponent } from './tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LineComponent,
    PointComponent,
    TwoLinesAppComponent,
    ArbolComponent,
    NodoComponent,
    CurvaComponent,
    TablaNodoComponent,
    ArbolViewComponent,
    ControladorUmbralesComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
