import {useEffect, useState, useLi} from 'react'
import style from './Transacoes.module.css'
import { FaPlus } from "react-icons/fa6";
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import Transacao from '../componentes/cards/Transacao'
import Mensagem from '../componentes/assets/Mensagem'

function Transacoes({setPagina}){
    const [despesas,setDespesas] = useState([])
    const [mensagem,setMensagem] = useState()
    const [filtroPrincipal,setfiltroPrincipal] = useState('todas')
    const [categorias,setCategorias] = useState([])
    const [categoria,setCategoria] = useState('')
    const [totalEntrada,setTotalEntrada] = useState('N/A')
    const [totalSaldo,setTotalSaldo] = useState('N/A')
    const [totalSaidas,setTotalSaidas] = useState('N/A')
    const location = useLocation();


    function filtrar(filtro){
        setfiltroPrincipal(filtro)
        let desp = JSON.parse(localStorage.getItem('sense_db'))
        desp = desp ?? []

        if(filtro == 'todas'){
            if(categoria!=''){
                desp = desp.filter((d)=> d.categoria.toLowerCase() == categoria.toLowerCase())
            }
            setDespesas(desp)
            return 1
        }

        if(categoria!=''){
            desp = desp.filter((d)=> d.categoria.toLowerCase() == categoria.toLowerCase())
        }

        desp = desp.filter((d)=> d.tipo.toLowerCase() == filtro.toLowerCase())
        setDespesas(desp)
    }

    function excluirTransacao(id){
        if(!id){
            return false
        }
        let desp = despesas.filter((d)=>{ return d.id != id})
        setDespesas(desp)
        localStorage.setItem('sense_db',JSON.stringify(desp))
        setMensagem('Transação excluida com sucesso')
    }

    function getCategorias(){
        let desp = JSON.parse(localStorage.getItem('sense_db'))
        desp = desp ?? []
        if(desp.length > 0){
            const categoriasDistintas = [...new Set(desp.map(item => item.categoria))];
            setCategorias(categoriasDistintas)
        }
        
    }

    useEffect(()=>{
        let desp = JSON.parse(localStorage.getItem('sense_db'))
        desp = desp ?? []
        setCategorias([])
        setDespesas(desp)
        setMensagem(location.state && location.state.mensagem )
        setPagina('Despesas')
        getCategorias()
    },[])

    useEffect(()=>{

        if(filtroPrincipal == 'todas'){
            let valorTotalEntrada = despesas.filter((d)=> d.tipo == 'Receita').reduce((acumulado,despesa)=>{
                let val = despesa.valor.replace(',','.')
                return parseFloat(acumulado) + parseFloat(val)
           },0)
           valorTotalEntrada = valorTotalEntrada.toFixed(2)
           setTotalEntrada(valorTotalEntrada.toString().replace('.',','))
    
            let valorTotalSaida = despesas.filter((d)=> d.tipo == 'Despesa').reduce((acumulado,despesa)=>{
                let val = despesa.valor.replace(',','.')
                return parseFloat(acumulado) + parseFloat(val)
            },0)
    
            valorTotalSaida = valorTotalSaida.toFixed(2)
            setTotalSaidas(valorTotalSaida.toString().replace('.',','))
            
            let saldo = (valorTotalEntrada - valorTotalSaida).toFixed(2).toString()
            setTotalSaldo(saldo.replace('.',','))

        }
      


    },[despesas])

    useEffect(()=>{
        
        let desp = JSON.parse(localStorage.getItem('sense_db'))
        desp = desp ?? []
        if(categoria == ''){
            filtrar(filtroPrincipal)
        }else{
            if(filtroPrincipal == 'todas'){
                desp = desp.filter((d)=> d.categoria.toLowerCase() == categoria.toLowerCase())
                setDespesas(desp)
            }else{
                desp = desp.filter((d)=> d.tipo.toLowerCase() == filtroPrincipal.toLowerCase() && d.categoria.toLowerCase() == categoria.toLowerCase())
                setDespesas(desp)
            }
        }
        
        
    },[categoria])

    return (
        <div className={style.transacoes}>

            <div className={style.areaMensagens}>
                <Mensagem status="success" texto={mensagem}></Mensagem>
            </div>
            

            <div className={style.filtroPrincipal}>
                <span onClick={()=>{filtrar('todas')}} className={`${filtroPrincipal == 'todas' ? style.selecionado : ''}`}>Todas as transações</span>
                <span onClick={()=>{filtrar('receita')}} className={`${filtroPrincipal == 'receita' ? style.selecionado : ''}`}>Entrada</span>
                <span onClick={()=>{filtrar('despesa')}} className={`${filtroPrincipal == 'despesa' ? style.selecionado : ''}`}>Saída</span>
            </div>

            <div className={style.dadosIndicadores}>
                <div className={style.dadoIndicador}>
                    <p>Receitas</p>
                    <span>R${totalEntrada}</span>
                </div>
                <div className={style.dadoIndicador}>
                    <p>Saldo</p>
                    <span>R${totalSaldo}</span>
                </div>
                <div className={style.dadoIndicador}>
                    <p>Saídas</p>
                    <span>R${totalSaidas}</span>
                </div>
            </div>

            <div className={style.areaAcoes}>
                <div className={style.btnFiltroCategoria} >
                    <select name="" id="" onChange={(e)=>{setCategoria(e.target.value)}}>
                        <option value="">Selecione uma categoria</option>
                        {  categorias.length > 0 &&
                            categorias.map((c,indx)=>(
                                <option value={c} key={indx}>{c}</option>
                            ))
                        }
                    </select>
                </div>
                <Link to="/despesas/create" >
                    <FaPlus/>
                    Adicionar Transação
                </Link>
            </div>
            
            <div className={style.areaTransacoes}>

                {
                    despesas.length > 0 &&
                        despesas.map((despesa)=>(
                            <Transacao
                                key={despesa.id}
                                id={despesa.id}
                                titulo={despesa.titulo}
                                tipo={despesa.tipo}
                                categoria={despesa.categoria}
                                valor={despesa.valor}
                                data={despesa.data}
                                HandleBtnExcluir = {excluirTransacao}
                            ></Transacao>
                        ))
                    
                }
                {despesas.length == 0 && <h3>Nenhuma transação encontrada</h3>}
                
            </div>
      
            
        </div>
    )
}

export default Transacoes