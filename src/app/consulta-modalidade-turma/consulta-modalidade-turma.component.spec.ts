/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaModalidadeTurmaComponent } from './consulta-modalidade-turma.component';

describe('ConsultaModalidadeTurmaComponent', () => {
  let component: ConsultaModalidadeTurmaComponent;
  let fixture: ComponentFixture<ConsultaModalidadeTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaModalidadeTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaModalidadeTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
