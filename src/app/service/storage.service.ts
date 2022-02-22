import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../interfaces/Hero.interface';
const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  alignmentBad = 0;
  alignmentGood = 0;
  private herosFavSubject = new BehaviorSubject<Hero[]>(null);

  constructor() {
    this.initialStorage();
  }

  public get herosStoraged(): Observable<Hero[]>{
    return this.herosFavSubject.asObservable()
  }

  public addOrRemoveFavorite(hero: Hero): void {
    const { id } = hero;
    const currentsFav = this.getFavoritesheros();
    const found = !!currentsFav.find((fav: Hero) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(hero);
  }

  private addToFavorite(hero: Hero): void {
    try {
      const currentsFav = this.getFavoritesheros();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, hero]));
      this.herosFavSubject.next([...currentsFav, hero]);
     /*  this.toastrSvc.success(`${hero.name} added to favorite`, 'RickAndMortyAPP'); */
    } catch (error) {
      console.log('Error saving localStorage', error);
      /* this.toastrSvc.error(`Error saving localStorage ${error} `, 'RickAndMortyAPP'); */
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesheros();
      const heros = currentsFav.filter(item => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...heros]));
      this.herosFavSubject.next([...heros]);
   /*    this.toastrSvc.warning(`Removed from favorite`, 'RickAndMortyAPP'); */
    } catch (error) {
      console.log('Error removing localStorage', error);
 /*      this.toastrSvc.error(`Error removing localStorage ${error} `, 'RickAndMortyAPP') */;
    }

  }

  public getFavoritesheros(): any {
    try {
      const herosFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.herosFavSubject.next(herosFav);
      return herosFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  public clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesheros();
  }
}
