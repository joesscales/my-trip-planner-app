import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlaceCardComponent } from './place-card.component';
import { IPlaceWithId } from 'src/app/shared/models/place.model';
import { By } from '@angular/platform-browser';
import { TripService } from 'src/app/features/trip/trip.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mockPlaceWithId } from 'src/app/shared/models/mock-data/mock-place';

describe('PlaceCardComponent', () => {
  let component: PlaceCardComponent;
  let fixture: ComponentFixture<PlaceCardComponent>;

  // Create a mock TripService
  const tripServiceStub = {
    addPlace: jasmine.createSpy('addPlace'),
    removePlace: jasmine.createSpy('removePlace')
  };

  
  const activatedRouteStub = {
    paramMap: of({
      get: (param: string) => 'mockValue' // provide mock values for route parameters
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule],
      providers: [
        { provide: TripService, useValue: tripServiceStub }, 
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceCardComponent);
    component = fixture.componentInstance;
    component.place = mockPlaceWithId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the place name in the card title', () => {
    const cardTitle = fixture.debugElement.query(By.css('ion-card-title')).nativeElement;
    expect(cardTitle.textContent).toContain(mockPlaceWithId.data.name);
  });

  it('should display the place description in the card content', () => {
    const cardContent = fixture.debugElement.query(By.css('ion-card-content')).nativeElement;
    expect(cardContent.textContent).toContain(mockPlaceWithId.data.description);
  });

  it('should not display the ion-card if place or place.data is undefined', () => {
    component.place = undefined as any;
    fixture.detectChanges();
    let ionCard = fixture.debugElement.query(By.css('ion-card'));
    expect(ionCard).toBeNull();

    component.place = { id: '1', data: undefined } as any;
    fixture.detectChanges();
    ionCard = fixture.debugElement.query(By.css('ion-card'));
    expect(ionCard).toBeNull();
  });


  it('should call addPlace on add button click', () => {
    const addButton = fixture.debugElement.query(By.css('#add-button-place-card')).nativeElement;
    addButton.click();
    expect(tripServiceStub.addPlace).toHaveBeenCalledWith(mockPlaceWithId);
  });
});
