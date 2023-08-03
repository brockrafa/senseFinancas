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


    function editarSave(e){
        e.preventDefault()
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
            {showForm &&
                <FormTransacao transacao={transacao} setTransacao={setTransacao} handleSubmit = {editarSave}></FormTransacao>
            }
            
        </div>
    )
}

export default EditarTransacao