import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ResponseName } from '../interfaces/ResponseName.interface';
import { Hero } from '../interfaces/Hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  token = '10227816847035198'

  api_url = '/api/'

  constructor(private http: HttpClient) { }


  getByName(name: string): Observable<ResponseName>{
    return this.http.get<ResponseName>(this.api_url + `${this.token}` + `/search` + `/${name}`)
  }

  getDetails(id: number): Observable<Hero>{
    return this.http.get<Hero>(this.api_url + `${this.token}` + `/${id}`)
  }

}
