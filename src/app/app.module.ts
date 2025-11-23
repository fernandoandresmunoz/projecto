import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { TestappComponent } from './testapp/testapp.component';
import { HomeComponent } from './home/home.component';
import { VoidComponent } from './void/void.component';
import { TreeComponent } from './tree/tree.component';
import { Automata1Component } from './automata1/automata1.component';
import { AutomataComponent } from './automata/automata.component';
import { PruebaComponent } from './prueba/prueba.component';
import { Automata2Component } from './automata2/automata2.component';
import { GenerationWidgetComponent } from './generation-widget/generation-widget.component';
import { Automata3Component } from './automata3/automata3.component';
import { GliderComponent } from './glider/glider.component';
import { PauseResetComponent } from './pause-reset/pause-reset.component';
import { ParabolaComponent } from './parabola/parabola.component';
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
import { RedViewComponent } from './red-view/red-view.component';
import { NuevoAutomataComponent } from './nuevo-automata/nuevo-automata.component';
import { GraficasAutomataComponent } from './graficas-automata/graficas-automata.component';
import { HttpClientModule } from '@angular/common/http';
import { StateManagerComponent } from './components/state-manager/state-manager.component';
import { AutomataPersistenceService } from './services/automata-persistence.service';
import { AutomataLayoutComponent } from './components/automata-layout/automata-layout.component';
import { MinecraftViewComponent } from './minecraft-view/minecraft-view.component';
import { AutomataControllerComponent } from './automata-controller/automata-controller.component';
import { CurvasComponent } from './curvas/curvas.component';
import { RectaComponent } from './recta/recta.component';
import { AutomatasComponent } from './automatas/automatas.component';
import { CanvasControllerComponent } from './canvas-controller/canvas-controller.component';
import { LienzosComponent } from './lienzos/lienzos.component';
import { LienzoDetailComponent } from './lienzo-detail/lienzo-detail.component';
import { ArbolesComponent } from './arboles/arboles.component';
import { DetalleNodoComponent } from './detalle-nodo/detalle-nodo.component';
import { MatricesComponent } from './matrices/matrices.component';
import { CommonModule } from '@angular/common';
import { DetalleMatrizComponent } from './detalle-matriz/detalle-matriz.component';
import { MatrizPreviewComponent } from './matriz-preview/matriz-preview.component';
import { MatrizHojaComponent } from './matriz-hoja/matriz-hoja.component';
import { TablaReglasComponent } from './tabla-reglas/tabla-reglas.component';
import { WrapperMinecraftViewComponent } from './wrapper-minecraft-view/wrapper-minecraft-view.component';
import { EditorComponent } from './editor/editor.component';



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
    TablaComponent,
    TestappComponent,
    HomeComponent,
    VoidComponent,
    TreeComponent,
    Automata1Component,
    AutomataComponent,
    PruebaComponent,
    Automata2Component,
    GenerationWidgetComponent,
    Automata3Component,
    GliderComponent,
    PauseResetComponent,
    ParabolaComponent,
    FuncionSenoComponent,
    GaussComponent,
    FuncionPolinomicaComponent,
    FuncionLogaritmicaComponent,
    FuncionExponencialComponent,
    FuncionCuadraticaComponent,
    LienzoComponent,
    Graficadora2Component,
    ExponencialesComponent,
    ListaDeLienzosComponent,
    ControladorFilaComponent,
    ReglasComponent,
    RedViewComponent,
    NuevoAutomataComponent,
    GraficasAutomataComponent,
    StateManagerComponent,
    AutomataLayoutComponent,
    MinecraftViewComponent,
    AutomataControllerComponent,
    CurvasComponent,
    RectaComponent,
    AutomatasComponent,
    CanvasControllerComponent,
    LienzosComponent,
    LienzoDetailComponent,
    ArbolesComponent,
    DetalleNodoComponent,
    MatricesComponent,
    DetalleMatrizComponent,
    MatrizPreviewComponent,
    MatrizHojaComponent,
    TablaReglasComponent,
    WrapperMinecraftViewComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AutomataPersistenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
