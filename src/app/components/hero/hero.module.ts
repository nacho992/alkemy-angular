import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeroComponent } from './card-hero/card-hero.component';
import { ListHeroComponent } from './list-hero/list-hero.component';
import { DetailsHeroComponent } from './details-hero/details-hero.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';


const myComponents = [
  ListHeroComponent,
  CardHeroComponent,
  DetailsHeroComponent,
  SearchInputComponent,
  AlertComponent
]

@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...myComponents
  ]
})
export class HeroModule { }
