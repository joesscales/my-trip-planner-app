import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonicModule, ],
  standalone: true,
})
export class TabsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
