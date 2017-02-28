    CREATE or replace VIEW v_salario_professor AS
    SELECT
    mp.id as id_mensalidade, 
    tp.professor_id as id_professor,
    IFNull( (fc.valor * tp.percentual /100) ,0) valor_calculado,
    fc.valor as valor_pago_aluno,
    a.nome as nome_aluno,
    t.codigo as codigo_turma,
    tp.percentual as percentual,
    mr.ano as ano,
    mr.mes as mes,
    t.mensalidade as valor_mensalidade
    FROM fluxo_caixa fc,
                    turma_professor tp, 
                    mensalidades mp, 
                    matricula m,
                    mes_referencia mr,
                    aluno a,
                    turma t 
    WHERE fc.id = mp.fluxo_caixa_pagamento_mensalidade_id 
    and mp.matricula_id = m.id 
    and m.turma_id = t.id
    and m.turma_id = tp.turma_id
    and mp.mes_referencia_id = mr.id
    and m.aluno_id = a.id
    and mp.fluxo_caixa_pagamento_mensalidade_id is not null
    and mp.fluxo_caixa_pagamento_professor_id is null
