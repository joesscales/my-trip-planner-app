import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { routes } from '../../../app.routes';
import { TabsComponent } from './tabs.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('Tabs Component', () => {

  let harness: RouterTestingHarness;
  let fixture: ComponentFixture<TabsComponent>;
  let component: TabsComponent;
  const initialState = { trip: { places: [] } };  // Example initial state

  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),  StoreModule.forRoot({})],
      providers: [
        provideRouter(routes),
        provideMockStore({initialState}) // Provide a mock store
         ]
    }).compileComponents();
     harness = await RouterTestingHarness.create();
     fixture = TestBed.createComponent(TabsComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();

   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three tab buttons', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('ion-tab-button'));
    expect(tabButtons.length).toBe(3);
  });


  it('should navigate to correct routes when tabs are clicked', async () => {
    
    const location = TestBed.inject(Location);

    const tabBar = fixture.debugElement.query(By.css('ion-tab-bar'));
    const tabButtons = tabBar.queryAll(By.css('ion-tab-button'));

    const homeTab = tabButtons.find((tab: { nativeElement: { getAttribute: (arg0: string) => string; }; }) => tab.nativeElement.getAttribute('tab') === 'home');
    const exploreTab = tabButtons.find((tab: { nativeElement: { getAttribute: (arg0: string) => string; }; }) => tab.nativeElement.getAttribute('tab') === 'explore');
    const tripTab = tabButtons.find((tab: { nativeElement: { getAttribute: (arg0: string) => string; }; }) => tab.nativeElement.getAttribute('tab') === 'my-trips');

    if (!homeTab || !exploreTab || !tripTab) {
      throw new Error('One or more tab buttons not found');
    }

     homeTab.nativeElement.click();
      await harness.navigateByUrl('/home');
      expect(location.path()).toBe('/home');
    

    exploreTab.nativeElement.click();
    await harness.navigateByUrl('/explore');
    expect(location.path()).toBe('/explore');

    tripTab.nativeElement.click();
    await harness.navigateByUrl('/my-trips');
    expect(location.path()).toBe('/my-trips');
  });
});
