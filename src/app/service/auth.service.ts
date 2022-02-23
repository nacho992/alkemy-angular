import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ResponseLogin } from "../interfaces/ResponseLogin.interface";
import { User } from "../interfaces/User.interface";
import { JwtService } from "./jwtService.service";
import { StorageService } from "./storage.service";


@Injectable({ providedIn: 'root' })
export class AuthService{

 constructor(private http: HttpClient,
            private storageService: StorageService,
            private jwtService: JwtService){

                this.checkToken();
            }

 private loggendIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

 url_log: string = 'http://challenge-react.alkemy.org/'

 public login(user: User): Observable<ResponseLogin>{
     return this.http.post<ResponseLogin>(`${this.url_log}`, user).pipe(tap(
         (res: ResponseLogin) => {
            this.storageService.saveToken(res.token)
            this.jwtService.decodeToken().then(res => {
              this.jwtService.setUser(res)
            })
            this.loggendIn.next(true)
         }
     ))
 }

 public get isLogged(): Observable<boolean> {
    return this.loggendIn.asObservable();
  }

 private async checkToken(): Promise<void> {
    const isExpired = await this.jwtService.isExpired(this.storageService.getToken());
    isExpired ? this.logout() : this.loggendIn.next(true);
 }

 public logout():void {
    this.storageService.removeToken()
    this.loggendIn.next(false);
    this.jwtService.userSubject.next(null);
  }
}