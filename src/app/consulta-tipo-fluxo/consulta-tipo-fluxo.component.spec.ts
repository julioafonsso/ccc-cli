/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaTipoFluxoComponent } from './consulta-tipo-fluxo.component';

describe('ConsultaTipoFluxoComponent', () => {
  let component: ConsultaTipoFluxoComponent;
  let fixture: ComponentFixture<ConsultaTipoFluxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTipoFluxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTipoFluxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
