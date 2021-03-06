import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseName } from '../interfaces/ResponseName.interface';
import { Hero } from '../interfaces/Hero.interface';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  token = '10227816847035198'

  /* api_url = '/api/' //use this with proxy.conf.json en case Cors faliur */
  api_url = environment.URL_SUPERHERO

  heros: BehaviorSubject<Hero[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
   }

  public get herosData(): Observable<Hero[]> {
    return this.heros.asObservable();
  }

  getByName(name: string): Observable<ResponseName>{
    return this.http.get<ResponseName>(this.api_url + `${this.token}` + `/search` + `/${name}`).pipe(tap(
      (res: ResponseName) => {
        if (res.response == 'success') {
          this.heros.next([...res.results])
        }
      }
     )
    );  
  }

  getDetails(id: number): Observable<Hero>{
    return this.http.get<Hero>(this.api_url + `${this.token}` + `/${id}`)
  }

  private setAuthorization(): HttpHeaders{
    const headers = new HttpHeaders({
     'Content-Type': 'application/json;charset=utf-8, text/plain',
     'Access-Control-Allow-Origin' : "*",
     'method': 'GET',
     'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
    })
    return headers
  }

}
