import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../interfaces/Hero.interface';
import { ToastService } from './toast.service';
const MY_FAVORITES = 'myFavorites';
const ACCES_TOKEN = 'acces_token'
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private averageW$ = new BehaviorSubject<number>(0)
  private averageH$ = new BehaviorSubject<number>(0)
  private herosFavSubject = new BehaviorSubject<Hero[]>(null);

  constructor(private toastService: ToastService) {
    this.initialStorage();
  }

  public get herosStoraged(): Observable<Hero[]> {
    return this.herosFavSubject.asObservable()
  }

  public get teamAverageH(): Observable<number>{
    return this.averageH$.asObservable();
  }

  public get teamAverageW(): Observable<number>{
    return this.averageW$.asObservable();
  }

  public addOrRemoveFavorite(hero: Hero): void {
    const { id } = hero;
    const currentsFav = this.getFavoritesheros();
    const found = !!currentsFav.find((fav: Hero) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(hero);
  }

  public addToFavorite(hero: Hero): void {
    try {
      const currentsFav = this.getFavoritesheros();
      const filteredBad = currentsFav.filter((hero: Hero) => hero.biography.alignment === 'bad')
      const filteredGood = currentsFav.filter((hero: Hero) => hero.biography.alignment === 'good')
      if (currentsFav.length < 6) {
        if (filteredBad.length < 3 && hero.biography.alignment === 'bad') {
          this.addHero(hero,currentsFav)
          this.toastService.showSuccess(`${hero.name} added to team bad`);
        } else if(hero.biography.alignment === 'bad') {
          this.toastService.showWarning(`${hero.name} full team bad`);}

        if (filteredGood.length < 3 && hero.biography.alignment === 'good') {
          this.addHero(hero,currentsFav)
          this.toastService.showSuccess(`${hero.name} added to team good`);
        } else if (hero.biography.alignment === 'good') {
          this.toastService.showWarning(`${hero.name} full team good`);}
          //update averages
          this.averageWeight()
          this.averageHeigth()
      }else{
        this.toastService.showWarning("full team, not added")
      }
    
    } catch (error) {
      console.log('Error saving localStorage', error);
      this.toastService.showDanger(`Error saving localStorage ${error} `);
    }
  }

  private addHero(hero: Hero, currentsFav){
    localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, hero]));
    this.herosFavSubject.next([...currentsFav, hero]);
  }

  public removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesheros();
      const heros = currentsFav.filter(item => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...heros]));
      this.herosFavSubject.next([...heros]);
      this.toastService.showWarning('delete from your team');
      //update averages
      this.averageWeight()
      this.averageHeigth()
    } catch (error) {
      console.log('Error removing localStorage', error);
      this.toastService.showDanger(`Error removing localStorage ${error} `);
    }

  }

  public getFavoritesheros(): any {
    try {
      const herosFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.herosFavSubject.next(herosFav);
      //update averages
      this.averageWeight()
      this.averageHeigth()
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

  private averageHeigth(): void{
    this.averageH$.next(0)
    var avr = 0
    this.herosStoraged.subscribe( (res: Hero[]) => {
      res.map(hero => avr += parseInt(hero.appearance.height[1]))
      this.averageH$.next(avr)
    })
  }

  public averageWeight(): void{
    this.averageW$.next(0)
    var avr = 0
    this.herosStoraged.subscribe( (res: Hero[]) => {
      res.map(hero => avr += parseInt(hero.appearance.weight[1]))
      this.averageW$.next(avr)
    })
  }

  /* TOKEN */
  public saveToken(token: string){
    localStorage.setItem(ACCES_TOKEN, JSON.stringify(token))
  }

  public getToken(): string{
    return localStorage.getItem(ACCES_TOKEN)
  }

  public removeToken(): void{
    localStorage.removeItem(ACCES_TOKEN)
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesheros();
  }
}
