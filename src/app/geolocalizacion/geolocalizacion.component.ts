import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { DatosService } from './datos.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GuerraDialogComponent } from './guerra-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fromLonLat } from 'ol/proj';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'aplicacio',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0s ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('moveAndRotate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px) rotateX(90deg)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0) rotateX(0deg)' }))
      ]),
      transition(':leave', [
        animate('0s ease-in')
      ])
    ])
  ]
})

export class GeolocationComponent implements OnInit {
  paisSeleccionado: any;
  paises: any[] = [];
  guerras: any[] = [];
  filteredContinentes: Observable<string[]>;
  continents: string[] = ['Asia', 'África', 'América', 'Europa', 'Oceanía','Todos'];
  continenteSeleccionado: string = 'Todos';
  paisesPorContinentes: any[] = [];
  map!: Map;
  displayedColumns: string[] = ['continente', 'pais', 'guerra', 'year', 'muertes', 'religiones']
  pageSize: number = 5;
  informacionCompleta: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private datosService: DatosService, private dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = this.informacionCompleta;
    this.filteredContinentes = new Observable<string[]>(observer => {
      observer.next(this.filterContinents(''));
    }).pipe(
      startWith(''),
      map(value => {
        if (Array.isArray(value)) {
          return this.continents;
        } else {
          return this.filterContinents(value);
        }
      })
    );
  }
  cargarPaises() {
    this.datosService.getPaisesPorContinente(this.continenteSeleccionado)
      .subscribe((paises: any[]) => {
        this.paises = paises;
      });
  }

  private filterContinents(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.continents.filter(continent => continent.toLowerCase().includes(filterValue));
  }
  
  cargarContinentes() {
    this.continenteSeleccionado = '';
  }

  buscarPaises(continent: string) {
    if (!continent) return;
    this.continenteSeleccionado = continent;
    this.datosService.getPaisesPorContinente(continent)
      .subscribe(
        (paises: any[]) => {
          this.paises = paises;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cargarInformacionCompleta();
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
  }

  mostrarGuerras(pais: any) {
    this.paisSeleccionado = pais;
    this.guerras = pais.guerras;
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(GuerraDialogComponent, {
      data: { pais: this.paisSeleccionado, guerras: this.guerras }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('El diálogo se ha cerrado');
    });
  }
  cargarInformacionCompleta() {
    this.datosService.getInformacionCompleta()
      .subscribe((informacion: any[]) => {
        this.informacionCompleta.data = informacion;
      });
  }
  applyFilter(event: Event) {
    console.log("Filtrando...");
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.informacionCompleta.filter = filterValue;
  }
  

  ngOnInit(): void {
    this.iniciarMapa();
    this.cargarInformacionCompleta();
  }

  centrarEnContinente(continente: string): void {
    let coordinates: [number, number];
    switch(continente) {
        case 'Asia':
            coordinates = [90, 30];
            break;
        case 'África':
            coordinates = [20, 10]; 
            break;
        case 'América':
            coordinates = [-100, 20];
            break;
        case 'Europa':
            coordinates = [20, 50]; 
            break;
        case 'Oceanía':
            coordinates = [140, -20]; 
            break;
        case 'Todos':
            coordinates = [0, 0]; 
            break;
        
        default:
            return;
    }
    this.goToCoordinates(coordinates);
  }
  goToCoordinates(coordinates: [number, number]): void {
    if (!this.map) {
        console.error('Error: Mapa no inicializado.');
        return;
    }

    const projectedCoordinates = fromLonLat(coordinates);

    this.map.getView().animate({
        center: projectedCoordinates,
        duration: 1000 
    });
}
  iniciarMapa() {
    var view = new View({
      center: [0, 0],
      zoom: 2.5
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: view
    });

    var geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });

    var accuracyFeature = new Feature();

    var positionFeature = new Feature(new Point([0, 0]));

    var vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [accuracyFeature, positionFeature]
      })
    });

    this.map.addLayer(vectorLayer);

    geolocation.on('change:position', function () {
      var coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : undefined);
    });

    geolocation.setTracking(true);
  }

}
