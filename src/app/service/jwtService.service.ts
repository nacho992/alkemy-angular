import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../interfaces/User.interface";
import { StorageService } from "./storage.service";

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class JwtService{

  token: string;
  user: User = <User>{}
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  

  constructor(private storage: StorageService) { 
    this.decodeToken().then(res => {
      this.user = res
      this.userSubject.next(res);
    })
   }

  
  public get userUpdate() : Observable<User> {
    return this.userSubject.asObservable();
  }

  public setUser(userLogeado: User): User {
    this.userSubject.next(userLogeado);
    this.user = userLogeado;
    return this.user
  }

  public async setToken(token: string) {
    await this.storage.saveToken(token);
  }

  public async decodeToken(): Promise<User>{
    this.token = await this.storage.getToken();
    if (this.token.length > 2) {
      this.user = helper.decodeToken(this.token);
      return this.user
    }
  }

  public async isExpired(token: string): Promise<boolean>{
    if (this.verifyTOken()) {
      const isExpired = await helper.isTokenExpired(token);
      return isExpired;
    }else{
      return false
    }
  }

  private verifyTOken():boolean{
    return this.storage.getToken().length > 2
  }

}