import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlaceViewComponent } from './place-view.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { demoPlaces } from 'src/assets/for-tests/demo-places';

describe('PlaceViewComponent', () => {
  let component: PlaceViewComponent;
  let fixture: ComponentFixture<PlaceViewComponent>;

  const activatedRouteStub = {
    paramMap: of({
      get: (param: string) => param === 'placeId' ? '1' : null
    })
  };

  let mockPlacesService = jasmine.createSpyObj('PlacesService', ['getPlaceById', 'goBack']);
  mockPlacesService.navStack$ = of([]);  // Properly mock navStack$ as an observable



  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaceViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }, 
        { provide: PlacesService, useValue: mockPlacesService}

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceViewComponent);
    component = fixture.componentInstance;


    mockPlacesService = TestBed.inject(PlacesService);

    mockPlacesService.getPlaceById.and.returnValue(of(demoPlaces[0]));


    fixture.detectChanges();
  }));


  
   it('should get place data initially', () => {
    // Arrange
    const response = demoPlaces[0];

    // Act
    component.getPlace('1');
    
    // Assert
    expect(mockPlacesService.getPlaceById).toHaveBeenCalledWith('1');
    expect(component.place).toEqual(response);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
