import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioDetallesComponent } from './beneficiario-detalles';

describe('BeneficiarioDetalles', () => {
  let component: BeneficiarioDetallesComponent;
  let fixture: ComponentFixture<BeneficiarioDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiarioDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
