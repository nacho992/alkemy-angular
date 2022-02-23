import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigInComponent } from './sig-in/sig-in.component';
import { RouterModule } from '@angular/router';
import { SigInRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroModule } from '../components/hero/hero.module';

@NgModule({
  declarations: [
    SigInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SigInRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HeroModule
  ]
})
export class AuthModule { }
