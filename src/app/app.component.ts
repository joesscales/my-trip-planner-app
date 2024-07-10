import { Component } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [TabsComponent, IonicModule],
})
export class AppComponent {
  constructor() {}
}  
