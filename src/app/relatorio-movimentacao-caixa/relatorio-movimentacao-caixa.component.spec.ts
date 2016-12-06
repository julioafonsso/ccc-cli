/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa.component';

describe('RelatorioMovimentacaoCaixaComponent', () => {
  let component: RelatorioMovimentacaoCaixaComponent;
  let fixture: ComponentFixture<RelatorioMovimentacaoCaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioMovimentacaoCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioMovimentacaoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
