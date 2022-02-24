import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResumenComponent } from './card-resumen.component';

describe('CardResumenComponent', () => {
  let component: CardResumenComponent;
  let fixture: ComponentFixture<CardResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
