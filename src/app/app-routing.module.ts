import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { YourTeamComponent } from './components/your-team/your-team.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: 'enabled'
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'your-team',
    component: YourTeamComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../app/components/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'sig-in',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'hero-details/:id', 
    loadChildren: () => import('./components/hero/details-hero/details-hero.module').then(m => m.DetailsHeroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
