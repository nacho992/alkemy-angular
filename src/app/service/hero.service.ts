import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseName } from '../interfaces/ResponseName.interface';
import { Hero } from '../interfaces/Hero.interface';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  token = '10227816847035198'

  api_url = '/api/'

  heros: BehaviorSubject<Hero[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public get herosData(): Observable<Hero[]> {
    return this.heros.asObservable();
  }

  getByName(name: string): Observable<ResponseName>{
    return this.http.get<ResponseName>(this.api_url + `${this.token}` + `/search` + `/${name}`).pipe(tap(
      (res: ResponseName) => {
        if (res.response == 'success') {
          this.heros.next([...res.results])
        }
        if (res.response == 'error') {
          //this.heros.next(null)
        }
        },
        error => {
          alert('character with given name not found')
          this.heros.next(null)
          console.log(error)
        }));  
  }

  getDetails(id: number): Observable<Hero>{
    return this.http.get<Hero>(this.api_url + `${this.token}` + `/${id}`)
  }

}
