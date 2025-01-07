import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreComponent } from './explore.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { PlacesService } from '../places/places.service';
import { of } from 'rxjs';
import {  StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {  mockPlacesWithIds } from 'src/app/shared/models/mock-data/mock-place';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  let placesService: jasmine.SpyObj<PlacesService>;
  const initialState = { trip: { places: [] } };  // Example initial state

  beforeEach(async () => {
    // Create a spy object for PlacesService
    const placesServiceSpy = jasmine.createSpyObj('PlacesService', ['getCollectionData']);
    
    // Configure the spy to return mock data
    placesServiceSpy.getCollectionData.and.returnValue(of(mockPlacesWithIds));

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
        provideMockStore({initialState})
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
    expect(component.placesList).toEqual(mockPlacesWithIds);
    expect(component.filteredList).toEqual(mockPlacesWithIds);
  });

});
