import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarcontasComponent } from './consultarcontas.component';

describe('ConsultarcontasComponent', () => {
  let component: ConsultarcontasComponent;
  let fixture: ComponentFixture<ConsultarcontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarcontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarcontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
