/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaTipoDescontoComponent } from './consulta-tipo-desconto.component';

describe('ConsultaTipoDescontoComponent', () => {
  let component: ConsultaTipoDescontoComponent;
  let fixture: ComponentFixture<ConsultaTipoDescontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTipoDescontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTipoDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
