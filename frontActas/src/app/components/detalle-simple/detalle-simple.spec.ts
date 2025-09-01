import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSimpleComponent } from './detalle-simple';

describe('DetalleSimpleComponent', () => {
  let component: DetalleSimpleComponent;
  let fixture: ComponentFixture<DetalleSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
