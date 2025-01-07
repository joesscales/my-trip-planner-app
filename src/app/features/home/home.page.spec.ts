import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { PlacesService } from '../places/places.service';
import { of } from 'rxjs';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mockPlacesWithIds } from 'src/app/shared/models/mock-data/mock-place';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { mockStore } from 'src/app/shared/models/mock-data/mock-store';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let placesServiceMock: jasmine.SpyObj<PlacesService>;
  const initialState = { trip: { places: [] } };  // Example initial state


  beforeEach(async () => {
    placesServiceMock = jasmine.createSpyObj('PlacesService', ['getTopThreeMostViewed']);
    placesServiceMock.getTopThreeMostViewed.and.returnValue(of(mockPlacesWithIds));

    const activatedRouteStub = {
      paramMap: of({
        get: (param: string) => 'mockValue' // provide mock values for route parameters
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        HomePage,
        PlacesListComponent,    // Import PlacesListComponent here
        HeaderComponent,        // Import HeaderComponent heren
        StoreModule.forRoot({}) // No need to change this
      ],
      providers: [
        { provide: PlacesService, useValue: placesServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        provideMockStore({initialState})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData on ngOnInit', () => {
    spyOn(component, 'getData').and.callThrough();
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
  });

  /*it('should populate top3Places with data from the service', async () => {
    await component.ngOnInit(); // Ensure async data is loaded
    fixture.detectChanges();

    const top3Places = await firstValueFrom(component.top3Places$);
    expect(top3Places.length).toBe(3);
    expect(top3Places[0].data.name).toBe('place 1');
  });

  it('should render app-places-list with places input', async () => {
    await component.ngOnInit(); // Ensure async data is loaded
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const placesList = compiled.querySelector('app-places-list');
    expect(placesList).toBeTruthy();

    const top3Places = await firstValueFrom(component.top3Places$);
    expect(top3Places.length).toBe(3);
  });*/
});
