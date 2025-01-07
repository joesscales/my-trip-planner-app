import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { TabsComponent } from './core/layout/tabs/tabs.component';
import { TripComponent } from './features/trip/trip.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  const initialState = { trip: { places: [] } };  // Example initial state

  it('should create the app', async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), // Import IonicModule
        AppComponent,          // Standalone AppComponent
        TabsComponent,         // Standalone TabsComponent
        TripComponent          // Standalone TripComponent
      ],
      providers: [
        provideRouter([]),      // Provide router with no routes
        provideMockStore({initialState}),     // Mock the Store service
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
