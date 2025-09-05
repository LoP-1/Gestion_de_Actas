import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentosComponent } from './descuentos';

describe('Descuentos', () => {
  let component: DescuentosComponent;
  let fixture: ComponentFixture<DescuentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescuentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
