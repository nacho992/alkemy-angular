import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/service/hero.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-details-hero',
  templateUrl: './details-hero.component.html',
  styleUrls: ['./details-hero.component.scss']
})
export class DetailsHeroComponent implements OnInit {


  hero$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe( (params) => {
      const id = params['id'];
      this.hero$ = this.heroService.getDetails(id);
    } )
  }

  onGoBack():void {
    this.location.back();
  }
}