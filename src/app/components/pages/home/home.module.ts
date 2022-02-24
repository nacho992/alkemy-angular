import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroModule } from '../../hero/hero.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { YourTeamModule } from '../../your-team/your-team.module';

@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HeroModule,
    HomeRoutingModule,
    YourTeamModule
  ]
})
export class HomeModule { }
