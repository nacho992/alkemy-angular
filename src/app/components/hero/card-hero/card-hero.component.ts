import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/Hero.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-card-hero',
  templateUrl: './card-hero.component.html',
  styleUrls: ['./card-hero.component.scss']
})
export class CardHeroComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private storageService: StorageService) { }
  getIcon(): string {
    return this.hero.isFavorite ? 'plus-circle-fill.svg' : 'plus-circle.svg';
  }

  toggleFavorite(): void {
    const isFavorite = this.hero.isFavorite;
    this.hero.isFavorite = !isFavorite;
    this.storageService.addToFavorite(this.hero);
  }

  ngOnInit(): void {
  }

}
