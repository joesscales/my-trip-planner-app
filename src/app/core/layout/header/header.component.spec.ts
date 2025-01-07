import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { provideMockStore } from '@ngrx/store/testing';  // Import provideMockStore
import { HeaderService } from './header.service';  // Import HeaderService
import { TripService } from 'src/app/features/trip/trip.service';  // Import TripService

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Create a mock HeaderService and TripService if needed
  let mockHeaderService = jasmine.createSpyObj('HeaderService', ['placeCount$']);
  let mockTripService = jasmine.createSpyObj('TripService', ['tripSignal']);
  const initialState = { trip: { places: [] } };  // Example initial state

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      //declarations: [HeaderComponent],
      imports: [IonicModule.forRoot(), HeaderComponent],
      providers: [
        provideMockStore({initialState}),  // Provide a mock Store
        { provide: HeaderService, useValue: mockHeaderService },  // Provide the mock HeaderService
        { provide: TripService, useValue: mockTripService }  // Provide the mock TripService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
