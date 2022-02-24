import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { User } from 'src/app/interfaces/User.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './card-resumen.component.html',
  styleUrls: ['./card-resumen.component.scss']
})
export class CardResumenComponent implements OnInit {

  
  public average_weight: number = 0;

  public average_height: number = 0;

  public heros: Hero[]
  @Input() user: User
  @Input() loged: boolean = false
 
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.herosStoraged
    .subscribe( (res: Hero[]) => {
      if (res.length > -1) {
        this.heros = res;
        this.average_height = this.averageHeigth();
        this.average_weight = this.averageWeight();
      }
    })
  }

  private averageHeigth(): number{
    this.storageService.teamAverageH.subscribe( (res: number) => {
      this.average_height = res
    })
    return this.average_height
  }

  private averageWeight(): number{
    this.storageService.teamAverageW.subscribe( (res: number) => {
      this.average_weight = res
    })
    return this.average_weight
  }

}
