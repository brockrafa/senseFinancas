import {useEffect, useState, useLi} from 'react'
import { FaPlus } from "react-icons/fa6";

import style from './EditarTransacao.module.css'
import Mensagem from '../componentes/assets/Mensagem'
import {useNavigate,useParams } from 'react-router-dom'
import FormTransacao from '../componentes/form/FormTransacao';

function EditarTransacao({setPagina}){
    
    const{id} = useParams()
    const [transacao,setTransacao] = useState()
    const [showForm,setShowForm] = useState()
    const navigate = useNavigate()
    const [mensagem,setMensagem] = useState('')


    function editarSave(e){
        e.preventDefault()
        let todosCamposPreenchidos = Object.values(transacao).every((valor) => valor !== null && valor !== undefined && valor !== '');
        if(!todosCamposPreenchidos || parseFloat(transacao.valor) <= 0){
            setMensagem('Preencha todos os campos corretamente')
            setTimeout(()=>{
                setMensagem(false)
            },3000)
            return 0
        }
        let transacoes = JSON.parse(localStorage.getItem('sense_db'))
        transacoes = transacoes.filter((t)=> t.id != transacao.id)

        let dataDeHoje = new Date();
        let dia = dataDeHoje.getDate().toString().padStart(2, '0');
        let mes = (dataDeHoje.getMonth() + 1).toString().padStart(2, '0');
        let ano = dataDeHoje.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        transacao.data = dataFormatada
        transacoes.push(transacao)
        localStorage.setItem('sense_db',JSON.stringify(transacoes))
        navigate('/',{ state: { mensagem: 'Transação atualizada com sucesso' } });
    }

    useEffect(()=>{
        let transacoes = JSON.parse(localStorage.getItem('sense_db'))
        setTransacao(transacoes.filter((t) => t.id == id)[0])
        setShowForm(true)
    },[])
    return (
        <div className={style.container}>
            <Mensagem texto={mensagem} status="error"></Mensagem>
            <h4 className={style.tituloPagina}>Edição de transação</h4>
            {showForm &&
                <FormTransacao transacao={transacao} setTransacao={setTransacao} handleSubmit = {editarSave}></FormTransacao>
            }
            
        </div>
    )
}

export default EditarTransacao