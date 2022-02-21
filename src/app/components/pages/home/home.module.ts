import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroModule } from '../../hero/hero.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { YourTeamComponent } from '../../your-team/your-team.component';

@NgModule({
  declarations: [
    HomeComponent,
    YourTeamComponent,

  ],
  imports: [
    CommonModule,
    HeroModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
