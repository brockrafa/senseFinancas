import style from './FormTransacao.module.css'
function FormTransacao({transacao,setTransacao,handleSubmit}){


    function handleOnChange(e){
        let val = e.target.value
        setTransacao({...transacao,[e.target.name]:val})
    }

    return (
        <form>
            <div className={style.formGroup}>
                <label htmlFor="">Título</label>
                <input onChange={handleOnChange} type="text" id='titulo' name='titulo' placeholder='Ex: Mercado' value={transacao.titulo ?? ''}/>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="">Tipo</label>
                <div>
                    <input onChange={handleOnChange}type="radio" name='tipo' value='Despesa' id='saida' checked={transacao.tipo == 'Despesa'}/>
                    <label htmlFor="saida">Saída</label>
                    <input onChange={handleOnChange} type="radio" name='tipo' value='Receita' id='entrada' checked={transacao.tipo == 'Receita'}/>
                    <label htmlFor="entrada">Entrada</label>
                </div>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="categoria">Categoria</label>
                <input onChange={handleOnChange} type="text" name='categoria' id='categoria' placeholder='Ex: Viagem' value={transacao.categoria ?? ''}/>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="valor">Valor</label>
                <span className={style.iconeInputValor}>R$</span>
                <input onChange={handleOnChange} type="number" id='valor' name='valor' placeholder='199.99' className={style.inputComIcone} value={transacao.valor.replace(',','.') ?? ''}/>
            </div>

            <button onClick={handleSubmit} className={style.btnSubmit}>Salvar transação</button>
        </form>
    )
}

export default FormTransacao