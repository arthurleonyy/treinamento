import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSaldoComponent } from './consultar-saldo.component';

describe('ConsultarSaldoComponent', () => {
  let component: ConsultarSaldoComponent;
  let fixture: ComponentFixture<ConsultarSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
