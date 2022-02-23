import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { ResponseName } from 'src/app/interfaces/ResponseName.interface';
import { HeroService } from 'src/app/service/hero.service';
import { filter, take } from 'rxjs/operators';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrls: ['./list-hero.component.scss']
})
export class ListHeroComponent implements OnInit {

  query: string = '';

  heros: Hero[] = [];

  mensaje: string;

  color: 'danger'

  constructor(private heroService: HeroService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    if (this.query != '') {
      this.getHeroByQuery()
    }
    this.getHeros();
  }

  inputSearchByName(event: string): void{
    this.query = event;
    if (this.query != '') {
      this.getHeroByQuery()
    }
  }

  private getHeros(){
    /* if there is no query, this method checks if there is any previous data to show, if there is, it returns them */
    this.heroService.herosData.subscribe( res => {
      if (res?.length > 0) {
        this.heros = [...res]
      }
    })
  }

  private getHeroByQuery(): void {
    /*  */
    if (this.query !== '') {
      this.heroService
        .getByName(this.query).subscribe(res => {
          if (res.response == 'success') {
            this.heros = [...res.results]
          }
          if (res.response == 'error') {
            this.toastService.showDanger('character with given name '+ this.query +' not found')
            this.heros = []
          }
          },
          error => {
            this.toastService.showDanger('server error')
            console.log(error)
          })
    }
  }

}
