import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarCsvComponent } from './importar';

describe('ImportarCsvComponent', () => {
  let component: ImportarCsvComponent;
  let fixture: ComponentFixture<ImportarCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarCsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
