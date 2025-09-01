import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosPeriodoComponent } from './usuarios-periodo';

describe('UsuariosPeriodo', () => {
  let component: UsuariosPeriodoComponent;
  let fixture: ComponentFixture<UsuariosPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosPeriodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
