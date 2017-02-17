CREATE or replace VIEW ccc.v_salario_professor AS
SELECT
mp.id, 
tp.professor_id professor,
IFNull( (fc.valor * tp.percentual /100) ,0) valor_calculado,
fc.valor ,
a.nome,
t.codigo,
tp.percentual,
mr.ano,
mr.mes
FROM fluxo_caixa fc,
                turma_professor tp, 
                mensalidades_pagas mp, 
                matricula m,
                mes_referencia mr,
                aluno a,
                turma t 
WHERE fc.id = mp.fluxo_caixa_id 
and mp.matricula_id = m.id 
and m.turma_id = t.id
and m.turma_id = tp.turma_id
and mp.mes_referencia_id = mr.id
and m.aluno_id = a.id
and mp.ind_pago_professor = 'N';       
