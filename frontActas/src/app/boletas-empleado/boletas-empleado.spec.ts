import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletasEmpleadoComponent } from './boletas-empleado';

describe('BoletasEmpleadoComponent', () => {
  let component: BoletasEmpleadoComponent;
  let fixture: ComponentFixture<BoletasEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletasEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletasEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});