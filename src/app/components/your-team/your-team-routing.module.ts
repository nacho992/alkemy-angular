import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourTeamComponent } from './your-team.component';

const routes: Routes = [{ path: '', component: YourTeamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourTeamRoutingModule { }