	CREATE VIEW ccc.v_mensalidades AS
	SELECT 
		concat(v.matricula_id, v.mes, v.ano) as id,
		v.matricula_id as matricula,
		v.aluno_id as aluno,
		ccc.turma.codigo as turma,
        ccc.nivel_turma.nome as nivel_turma,
        ccc.modalidade_turma.nome as modalidade_turma, 
		v.data_matricula,
		v.dia_vencimento,
        v.id_mes_referencia,
		v.mes,
		v.ano,
		v.situacao,
		ccc.turma.mensalidade as valor_mensalidade,
		IF(v.situacao = 'Pago',
			0,
			IF(v.situacao = 'Atrasado',
				ccc.turma.mensalidade * 1.15,
				ccc.turma.mensalidade - IFNULL((SELECT 
								ccc.turma.mensalidade * ccc.tipo_desconto.valor
							FROM
								ccc.tipo_desconto
							WHERE
								id = v.desconto_id),
						0))) AS valor_calculado
	FROM
		(SELECT 
				
				ccc.matricula.aluno_id,
				ccc.matricula.id AS matricula_id,
				ccc.matricula.turma_id,
				ccc.matricula.data_matricula,
				ccc.matricula.dia_vencimento,
				ccc.matricula.desconto_id,
				ccc.mes_referencia.mes,
				ccc.mes_referencia.ano,
                ccc.mes_referencia.id as id_mes_referencia,
				(SELECT 
						IF(COUNT(*) = 0, IF((ccc.mes_referencia.ano < YEAR(SYSDATE())
								OR (ccc.mes_referencia.mes < MONTH(SYSDATE()))
								OR (ccc.matricula.dia_vencimento < DAY(SYSDATE()))), 'Atrasado', 'Pendente'), 'Pago')
					FROM
						ccc.mensalidades_pagas
					WHERE
						ccc.mensalidades_pagas.matricula_id = ccc.matricula.id
							AND ccc.mensalidades_pagas.mes_referencia_id = ccc.mes_referencia.id) AS situacao
		FROM
			ccc.matricula, 
			ccc.mes_referencia
		WHERE
			((YEAR(data_matricula) = ccc.mes_referencia.ano
				AND MONTH(data_matricula) <= ccc.mes_referencia.mes)
				OR (YEAR(data_matricula) < ccc.mes_referencia.ano))
				AND (YEAR(SYSDATE()) > ccc.mes_referencia.ano
				OR (YEAR(SYSDATE()) = ccc.mes_referencia.ano
				AND MONTH(SYSDATE()) >= ccc.mes_referencia.mes))) as v,
		ccc.turma,
        ccc.modalidade_turma ,
        ccc.nivel_turma
	WHERE
		v.turma_id = ccc.turma.id
        and ccc.modalidade_turma.id = ccc.turma.modalidade_id
        and ccc.nivel_turma.id = ccc.turma.nivel_turma_id
	order by v.matricula_id , v.ano desc, v.mes desc