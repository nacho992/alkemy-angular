import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { JwtService } from 'src/app/service/jwtService.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public ok: boolean = false

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => {
      if (res) {
        this.ok = res

      }
    })
  }

  public signOut(): void{
    this.ok = false;
    this.authService.logout()
  }

}
