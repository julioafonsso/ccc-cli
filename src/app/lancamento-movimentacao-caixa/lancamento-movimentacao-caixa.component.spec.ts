/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LancamentoMovimentacaoCaixaComponent } from './lancamento-movimentacao-caixa.component';

describe('LancamentoMovimentacaoCaixaComponent', () => {
  let component: LancamentoMovimentacaoCaixaComponent;
  let fixture: ComponentFixture<LancamentoMovimentacaoCaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoMovimentacaoCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoMovimentacaoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
