import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MyTripsComponent } from './my-trips.component';
import { MyTripsService } from './my-trips.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('MyTripsComponent', () => {
  let component: MyTripsComponent;
  let fixture: ComponentFixture<MyTripsComponent>;
  const initialState = { trip: { places: [] } };  // Example initial state

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), MyTripsComponent],
      providers: [
        MyTripsService,
        provideMockStore({ initialState }),  // Provide a mock Store
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsComponent);
    component = fixture.componentInstance;

    // Trigger initial change detection and wait for async tasks to complete
    fixture.detectChanges();

    // Wait for stable state (resolve any asynchronous operations)
    return fixture.whenStable().then(() => {
      fixture.detectChanges(); // Final change detection
    });
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));
});
