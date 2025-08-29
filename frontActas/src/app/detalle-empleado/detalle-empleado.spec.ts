import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpleado } from './detalle-empleado';

describe('DetalleEmpleado', () => {
  let component: DetalleEmpleado;
  let fixture: ComponentFixture<DetalleEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
