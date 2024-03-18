import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppEncaminamentModule } from './app-encaminament.module';
import { Routing } from './routing/routing'
import { GeolocationComponent} from './geolocalizacion/geolocalizacion.component'
import { Inicio } from './inicio/inicio';
import { Guerras } from './guerras/guerras';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {NgIf, NgFor} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {GuerraDialogComponent} from 'src/app/geolocalizacion/guerra-dialog.component'
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    Guerras,
    Inicio,
    Routing,
    GeolocationComponent,
    GuerraDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppEncaminamentModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,  
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    ScrollingModule,
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule,
    MatTabsModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule,
    NgIf,
    NgFor,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [Routing]
})
export class AppModule { }
