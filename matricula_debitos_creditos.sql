	CREATE VIEW v_mensalidades AS
	SELECT 
		concat(v.matricula_id, v.mes, v.ano) as id,
		v.matricula_id as matricula,
		v.aluno_id as aluno,
		turma.codigo as turma,
        nivel_turma.nome as nivel_turma,
        modalidade_turma.nome as modalidade_turma, 
		v.data_matricula,
		v.dia_vencimento,
        v.id_mes_referencia,
		v.mes,
		v.ano,
		v.situacao,
		turma.mensalidade as valor_mensalidade,
		IF(v.situacao = 'Pago',
			0,
			IF(v.situacao = 'Atrasado',
				turma.mensalidade * 1.15,
				turma.mensalidade - IFNULL((SELECT 
								turma.mensalidade * tipo_desconto.valor
							FROM
								tipo_desconto
							WHERE
								id = v.desconto_id),
						0))) AS valor_calculado
	FROM
		(SELECT 
				
				matricula.aluno_id,
				matricula.id AS matricula_id,
				matricula.turma_id,
				matricula.data_matricula,
				matricula.dia_vencimento,
				matricula.desconto_id,
				mes_referencia.mes,
				mes_referencia.ano,
                mes_referencia.id as id_mes_referencia,
				(SELECT 
						IF(COUNT(*) = 0, IF((mes_referencia.ano < YEAR(SYSDATE())
								OR (mes_referencia.mes < MONTH(SYSDATE()))
								OR (matricula.dia_vencimento < DAY(SYSDATE()))), 'Atrasado', 'Pendente'), 'Pago')
					FROM
						mensalidades_pagas
					WHERE
						mensalidades_pagas.matricula_id = matricula.id
							AND mensalidades_pagas.mes_referencia_id = mes_referencia.id) AS situacao
		FROM
			matricula, 
			mes_referencia
		WHERE
			((YEAR(data_matricula) = mes_referencia.ano
				AND MONTH(data_matricula) <= mes_referencia.mes)
				OR (YEAR(data_matricula) < mes_referencia.ano))
				AND (YEAR(SYSDATE()) > mes_referencia.ano
				OR (YEAR(SYSDATE()) = mes_referencia.ano
				AND MONTH(SYSDATE()) >= mes_referencia.mes))) as v,
		turma,
        modalidade_turma ,
        nivel_turma
	WHERE
		v.turma_id = turma.id
        and modalidade_turma.id = turma.modalidade_id
        and nivel_turma.id = turma.nivel_turma_id
	order by v.matricula_id , v.ano desc, v.mes desc