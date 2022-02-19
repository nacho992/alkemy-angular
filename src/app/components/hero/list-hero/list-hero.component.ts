import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { ResponseName } from 'src/app/interfaces/ResponseName.interface';
import { HeroService } from 'src/app/service/hero.service';
import { filter, take } from 'rxjs/operators';
import { Hero } from 'src/app/interfaces/Hero.interface';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrls: ['./list-hero.component.scss']
})
export class ListHeroComponent implements OnInit {

  query: string = '';

  responseApi: boolean = true;

  heros: Hero[] = [];

  mensaje: string;

  color: 'danger'

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (this.query != '') {
      this.getHeroByQuery()
    }
  }

  getTeam(): void{
    console.log('heros fav')
  }

  inputSearchByName(event: string): void{
    this.query = event;
    if (this.query != '') {
      this.getHeroByQuery()
    }
  }

  private getHeroByQuery(): void {
    /*  */
    if (this.query !== '') {
      this.heroService
        .getByName(this.query)
        .pipe(take(1))
        .subscribe((res: ResponseName) => {
          if (res.response == 'success') {
            this.responseApi = true
            this.heros = [...res.results];
          }
          if (res.response == 'error') {
            this.responseApi = false;
            alert('character with given name not found')
            this.mensaje = 'character with given name not found'
            this.heros = [];
          }
          },
          error => {
            this.responseApi = false;
            alert('character with given name not found')
            console.log(error)
          });
    }
  }
}
