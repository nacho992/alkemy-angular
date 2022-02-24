import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss']
})
export class CardTeamComponent implements OnInit {

  @Input() hero: Hero

  constructor(private storageService: StorageService,) { }

  ngOnInit(): void {
  }

  public heroTotalPowerStates(): number{
      const total = parseInt(this.hero.powerstats.combat) + 
                    parseInt(this.hero.powerstats.durability) + 
                    parseInt(this.hero.powerstats.intelligence) + 
                    parseInt(this.hero.powerstats.power) +
                    parseInt(this.hero.powerstats.speed) + 
                    parseInt(this.hero.powerstats.strength)
      return total;
 }

 public delteTeam(hero: Hero): void{
  this.storageService.removeFromFavorite(hero.id);
}


}
