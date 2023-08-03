import style from './Transacao.module.css'
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import { FaPencil,FaTrashCan } from "react-icons/fa6";



function Transacao({id,titulo,tipo,categoria,valor,data,HandleBtnExcluir}){
    
    return (
        <div className={`${style.cardContainer} ${tipo === 'Despesa' ? style.saida : style.entrada}`}>
            <div className={style.icone}>
                <img src="/img/carrinho_icone.png" alt="" />
            </div>
            <div className={style.informacoesTransacao}>
                <span>{data}</span>
                <h4>{titulo}</h4>
                <p>{categoria}</p>
                <p>{tipo}</p>
            </div>
            <span className={style.valor}>R${parseFloat(valor).toFixed(2).toString().replace('.',',')}</span>
            <Link to={`/transacao/editar/${id}`} className={style.btnEditar}><FaPencil/></Link>
            <button onClick={()=>{HandleBtnExcluir(id)}} className={style.btnExcluir}><FaTrashCan/></button>
        </div>
    )
}

export default Transacao