import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlaceViewComponent } from './place-view.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/features/places/places.service';
import { mockPlacesWithIds } from 'src/app/shared/models/mock-data/mock-place';
import { provideMockStore } from '@ngrx/store/testing';
import { ModalController } from '@ionic/angular';  // Import ModalController
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


describe('PlaceViewComponent', () => {
  let component: PlaceViewComponent;
  let fixture: ComponentFixture<PlaceViewComponent>;
  const initialState = { trip: { places: [] } };  // Example initial state

  const activatedRouteStub = {
    paramMap: of({
      get: (param: string) => param === 'placeId' ? '1' : null
    })
  };

  let mockPlacesService = jasmine.createSpyObj('PlacesService', ['getPlaceById', 'goBack']);
  mockPlacesService.navStack$ = of([]);  // Properly mock navStack$ as an observable

  // Create a mock ModalController
  let modalControllerMock = jasmine.createSpyObj('ModalController', ['create']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaceViewComponent,  IonicModule.forRoot(),   CommonModule,],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }, 
        { provide: PlacesService, useValue: mockPlacesService },
        provideMockStore({initialState}),
        { provide: ModalController, useValue: modalControllerMock }  // Provide ModalController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceViewComponent);
    component = fixture.componentInstance;

    mockPlacesService = TestBed.inject(PlacesService);
    mockPlacesService.getPlaceById.and.returnValue(of(mockPlacesWithIds[0]));

    fixture.detectChanges();
  }));

  it('should get place data initially', () => {
    // Arrange
    const response = mockPlacesWithIds[0];

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
