import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlacesListComponent } from './places-list.component';
import { TripService } from 'src/app/services/trip.service';
import { IPlaceWithId } from 'src/app/models/place.model';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { demoPlaces } from 'src/assets/for-tests/demo-places';

describe('PlacesListComponent', () => {
  let component: PlacesListComponent;
  let fixture: ComponentFixture<PlacesListComponent>;
  let tripServiceMock: jasmine.SpyObj<TripService>;

  beforeEach(async () => {
    tripServiceMock = jasmine.createSpyObj('TripService', ['updateOrder']);
    
    // Use Object.defineProperty to mock the tripSignal getter
    Object.defineProperty(tripServiceMock, 'tripSignal', {
      get: () => of(demoPlaces)
    });

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, PlacesListComponent], 
      // declarations: [PlacesListComponent],
      providers: [
        { provide: TripService, useValue: tripServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesListComponent);
    component = fixture.componentInstance;
    component.places = demoPlaces;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly update places when parentPage is trip', () => {
    component.parentPage = 'trip';
    component.ngOnChanges({
      places: {
        currentValue: demoPlaces,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.places.length).toBe(demoPlaces.length);
  });

  // Add more tests as needed
});
