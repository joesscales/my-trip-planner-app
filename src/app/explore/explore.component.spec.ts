import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreComponent } from './explore.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { PlacesService } from '../services/places.service';
import { of, throwError } from 'rxjs';
import { IPlaceWithId } from '../models/place.model';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  let placesService: jasmine.SpyObj<PlacesService>;

  const mockPlaces: IPlaceWithId[] = [
    { id: '1', data: { name: 'Place 1', description: 'Description 1' } },
    { id: '2', data: { name: 'Place 2', description: 'Description 2' } }
  ];

  beforeEach(async () => {
    // Create a spy object for PlacesService
    const placesServiceSpy = jasmine.createSpyObj('PlacesService', ['getCollectionData']);
    
    // Configure the spy to return mock data
    placesServiceSpy.getCollectionData.and.returnValue(of(mockPlaces));

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), // Import IonicModule if using Ionic components
        CommonModule, // Import CommonModule if using Angular built-in directives
        PlacesListComponent, // Declare the component if needed
        ExploreComponent,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: PlacesService, useValue: placesServiceSpy }, // Provide the mock service
        provideMockStore()
      ],
    
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    placesService = TestBed.inject(PlacesService) as jasmine.SpyObj<PlacesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllData and populate placesList', () => {
    expect(placesService.getCollectionData).toHaveBeenCalled();
    expect(component.placesList).toEqual(mockPlaces);
    expect(component.filteredList).toEqual(mockPlaces);
  });

});
