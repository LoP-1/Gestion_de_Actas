import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPeriodosComponent } from './inicio-periodos';

describe('InicioPeriodosComponent', () => {
  let component: InicioPeriodosComponent;
  let fixture: ComponentFixture<InicioPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPeriodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
