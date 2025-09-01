import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompleto } from './detalle-completo';

describe('DetalleCompleto', () => {
  let component: DetalleCompleto;
  let fixture: ComponentFixture<DetalleCompleto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCompleto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCompleto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
