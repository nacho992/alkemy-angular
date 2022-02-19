import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsHeroComponent } from './details-hero.component';

const routes: Routes = [{ path: '', component: DetailsHeroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroDetailsRoutingModule { }