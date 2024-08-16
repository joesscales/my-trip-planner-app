import { Injectable } from '@angular/core';
import { collection, CollectionReference, Firestore, getDocs, getFirestore } from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';
import { ITrip, ITripWithId } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class MyTripsService {

  constructor() {
    this.firestore = getFirestore();
   }

   private firestore: Firestore


   
   // Get all the collection documents
   getCollectionData(): Observable<ITripWithId[]> {
    const colRef: CollectionReference<ITrip> = collection(this.firestore, 'trips') as CollectionReference<ITrip>;

    return from(getDocs(colRef)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data() as ITrip
        }))
      )
    );
  }


}


