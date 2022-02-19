import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHeroComponent } from './details-hero.component';

describe('DetailsHeroComponent', () => {
  let component: DetailsHeroComponent;
  let fixture: ComponentFixture<DetailsHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
