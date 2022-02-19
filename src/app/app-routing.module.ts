import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../app/components/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'hero-details/:id', 
    loadChildren: () => import('./components/hero/details-hero/details-hero.module').then(m => m.DetailsHeroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
