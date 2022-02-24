import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { User } from 'src/app/interfaces/User.interface';
import { AuthService } from 'src/app/service/auth.service';
import { JwtService } from 'src/app/service/jwtService.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss']
})
export class YourTeamComponent implements OnInit {

  public heros: Hero[] = [];

  public loged: boolean = false

  public user: User

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    this.storageService.herosStoraged
    .subscribe( (res: Hero[]) => {
      if (res.length > -1) {
        this.heros = res
      }
    })
    this.authService.isLogged.subscribe(res => {
      if (res) {
        this.loged = res
        this.jwtService.userUpdate.subscribe(res =>{
          this.user = res
        })
      }
    })

  }

}
