import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, from, map, Observable, Subscription } from 'rxjs';
import { IPlace, IPlaceWithId } from '../models/place.model';
import { collection, CollectionReference, doc, Firestore, getDoc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
  
})
export class PlacesService implements OnDestroy {

  constructor(
    private router: Router,
  ) {
    this.firestore = getFirestore();
    this.routerSubscription = this.router.events
    .subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const newPage = event.urlAfterRedirects;

        if (newPage.indexOf('place/') > -1 && this.navStack && this.navStack.length) {
          // Make sure you aren't going back as if you dont then the page you go back to will be readded to the nav stack
          if (this.navStack[this.navStack.length -1] !== newPage) {
            this.navStack.push(newPage);
          }
        } else {
          this.navStack = [newPage];
        }
        this.navStackSubject.next(this.navStack);
      }
    });
   }

   public routerSubscription: Subscription;
   private navStackSubject = new BehaviorSubject<string[]>([]);
   navStack$ = this.navStackSubject.asObservable();

   private firestore: Firestore;

   public navStack: string [];


   goToPlace(id: string) {
    this.router.navigateByUrl('/place/' + id);
   }

   goBack() {
     // Get rid of the current place
     if (this.navStack && this.navStack.length) {
      this.navStack.pop();
     }

     if (this.navStack && this.navStack.length) {
      this.router.navigateByUrl(this.navStack.slice(-1)[0]);
     } else {
       this.router.navigateByUrl('/home');

     }
   }

   

   // Get all the collection documents
   getCollectionData(): Observable<IPlaceWithId[]> {
    const colRef: CollectionReference<IPlace> = collection(this.firestore, 'edinburgh-places') as CollectionReference<IPlace>;

    return from(getDocs(colRef)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data() as IPlace
        }))
      )
    );
  }

  // Get the 3 most viewed places in the collection
  getTopThreeMostViewed(): Observable<IPlaceWithId[]> {
    const colRef: CollectionReference<IPlace> = collection(this.firestore, 'edinburgh-places') as CollectionReference<IPlace>;

    // Create a query that orders by 'dateAdded' in descending order and limits to 3 results
    const topThreeQuery = query(colRef, orderBy('dateAdded', 'desc'), limit(3));

    return from(getDocs(topThreeQuery)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data() as IPlace
        }))
      )
    );
  }

  // Get individual place
  getPlaceById(placeId: string): Observable<IPlaceWithId> {
    const docRef = doc(this.firestore, 'edinburgh-places', placeId);

    return from(getDoc(docRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return {
            id: docSnapshot.id,
            data: docSnapshot.data() as IPlace
          };
        } else {
          throw new Error('Document does not exist');
        }
      })
    );
  }

  ngOnDestroy() {
    // Clean up the subscription when the service is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
