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

  public average_weight: number = 0;

  public average_height: number = 0;

  public user: User

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    this.storageService.herosStoraged
    .subscribe( (res: Hero[]) => {
      if (res.length > -1) {
        this.heros = res
        this.averageWeight();
        this.averageHeigth();
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

  public heroTotalPowerStates(id: number): number[]{
     var total = this.heros
    .filter(hero => hero.id === id)
    .map(hero => {
      return  parseInt(hero.powerstats.combat) + 
              parseInt(hero.powerstats.durability) + 
              parseInt(hero.powerstats.intelligence) + 
              parseInt(hero.powerstats.power) +
              parseInt(hero.powerstats.speed) + 
              parseInt(hero.powerstats.strength)
    })
    return total;
  }

  public delteTeam(hero: Hero): void{
    this.storageService.removeFromFavorite(hero.id);
    this.average_height = 0;
    this.average_weight = 0;
    this.averageWeight();
    this.averageHeigth();
  }

  private averageHeigth(): number{
    var average = this.heros.map(hero => this.average_height += parseInt(hero.appearance.height[1]))
    return average[1]
  }

  private averageWeight(): number{
    var average =  this.heros.map(hero => this.average_weight += parseInt(hero.appearance.weight[1]))
    return average[1]
  }

}
