import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTeamComponent } from './card-team/card-team.component';
import { YourTeamComponent } from './your-team.component';
import { YourTeamRoutingModule } from './your-team-routing.module';
import { CardResumenComponent } from './card-resumen/card-resumen.component';



@NgModule({
  declarations: [
    CardTeamComponent,
    YourTeamComponent,
    CardResumenComponent
  ],
  imports: [
    CommonModule,
    YourTeamRoutingModule
  ],
  exports: [
    CardTeamComponent,
    YourTeamComponent]
})
export class YourTeamModule { }
