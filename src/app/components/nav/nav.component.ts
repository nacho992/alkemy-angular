import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public ok: boolean = false

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => {
      if (res) {
        this.ok = res
      }else{
        this.router.navigateByUrl('sig-in')
      }
    })
  }

  public signOut(): void{
    this.ok = false;
    this.authService.logout()
  }

}
