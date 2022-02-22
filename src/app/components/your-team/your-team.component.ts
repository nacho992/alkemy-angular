import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss']
})
export class YourTeamComponent implements OnInit {

  public heros: Hero[] = [];

  average_weight: number = 0;

  average_height: number = 0;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.herosStoraged
    .subscribe( (res: Hero[]) => {
      if (res.length > 0) {
        console.log(this.heros)
        this.heros = res
        this.averageWeight();
        this.averageHeigth();
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
    this.storageService.addOrRemoveFavorite(hero);
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
