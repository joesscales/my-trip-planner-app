import { Component, OnInit } from '@angular/core';
import {IonicModule } from '@ionic/angular'
import { initApp } from '../../environments/firbaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {

  private firestore = getFirestore(initApp);
  

  constructor() { }

  async getData() {
    const querySnapshot = await getDocs(collection(this.firestore, "edinburgh-places"));
    querySnapshot.forEach((doc) => {

      if(doc.exists() && doc.data()) {
        console.log('Got name:', doc.data().name)

      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
