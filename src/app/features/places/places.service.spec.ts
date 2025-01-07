import { TestBed } from '@angular/core/testing';
import { PlacesService } from './places.service';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { collection, doc, getDoc, getDocs, Firestore } from 'firebase/firestore';
import { IPlace, IPlaceWithId } from '../../shared/models/place.model';

describe('PlacesService', () => {
  let service: PlacesService;
  let router: Router;

  const mockRouter = {
    events: new BehaviorSubject(new NavigationEnd(0, '/place/1', '/place/1')),
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  const mockFirestore = {
    collection: jasmine.createSpy('collection'),
    doc: jasmine.createSpy('doc'),
    getDocs: jasmine.createSpy('getDocs'),
    getDoc: jasmine.createSpy('getDoc'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlacesService,
        { provide: Router, useValue: mockRouter },
        { provide: Firestore, useValue: mockFirestore }
      ]
    });
    service = TestBed.inject(PlacesService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to place by id', () => {
    const placeId = '123';
    service.goToPlace(placeId);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/place/' + placeId);
  });

  it('should navigate back to previous place', () => {
    service.navStack = ['/place/1', '/place/2'];
    service.goBack();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/place/1');
  });

  it('should navigate back to home if navStack is empty', () => {
    service.navStack = [];
    service.goBack();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });



  it('should get top three most viewed places', (done) => {
   

    service.getTopThreeMostViewed().subscribe((places: IPlaceWithId[]) => {
      expect(places.length).toBe(3);
      done();
    });
  });



});
