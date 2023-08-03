import style from './NovaDespesa.module.css'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Mensagem from '../componentes/assets/Mensagem'

function NovaDespesa({setPagina}){

    const [transacao,setTransacao] = useState({})
    const history = useNavigate()
    const [mensagem,setMensagem] = useState('')

    useEffect(()=>{
        setTransacao({
            titulo:'',
            tipo:'',
            categoria:'',
            valor:''
        })
        setPagina('novaDespesa')
        setMensagem(false)
    },[])


    function salvarTransacao(e){
        e.preventDefault()
        let todosCamposPreenchidos = Object.values(transacao).every((valor) => valor !== null && valor !== undefined && valor !== '');
        if(!todosCamposPreenchidos){
            setMensagem('Preencha todos os campos corretamente')
            setTimeout(()=>{
                setMensagem(false)
            },3000)
            return 0
        }
        transacao.valor = transacao.valor.replace('.',',')
        let itens = JSON.parse(localStorage.getItem('sense_db'))
        
        if(itens.length == 0){
            transacao.id = 1
        }else{
            let maiorId = itens.reduce((maior, item) => {return item.id > maior ? item.id : maior;}, 0);
            transacao.id = maiorId + 1
        }

        const dataDeHoje = new Date();
        const dia = dataDeHoje.getDate().toString().padStart(2, '0');
        const mes = (dataDeHoje.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataDeHoje.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        transacao.data = dataFormatada
        itens.push(transacao)
        localStorage.setItem('sense_db',JSON.stringify(itens))
        history('/',{ state: { mensagem: 'Transação cadastrada com sucesso' } });
        
    }
    return (
        <div className={style.container}>
            <Mensagem texto={mensagem} status="error"></Mensagem>

            <h4 className={style.tituloPagina}>Criar nova transação</h4>
            <form>
                <div className={style.formGroup}>
                    <label htmlFor="">Título</label>
                    <input onChange={(e)=>{transacao.titulo = e.target.value}} type="text" placeholder='Ex: Mercado'/>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="">Tipo</label>
                    <div>
                        <input onChange={(e)=>{transacao.tipo = e.target.value}} type="radio" name='tipo[]' value='Despesa' id='saida'/>
                        <label htmlFor="saida">Saída</label>
                        <input onChange={(e)=>{transacao.tipo = e.target.value}}  type="radio" name='tipo[]' value='Receita' id='entrada'/>
                        <label htmlFor="entrada">Entrada</label>
                    </div>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="categoria">Categoria</label>
                    <input onChange={(e)=>{transacao.categoria = e.target.value}} type="text" id='categoria' placeholder='Ex: Viagem'/>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="valor">Valor</label>
                    <span className={style.iconeInputValor}>R$</span>
                    <input onChange={(e)=>{transacao.valor = e.target.value}} type="number" id='valor' placeholder='199.99' className={style.inputComIcone}/>
                </div>

                <button onClick={salvarTransacao} className={style.btnSubmit}>Salvar transação</button>
            </form>
        </div>
    )
}

export default NovaDespesa