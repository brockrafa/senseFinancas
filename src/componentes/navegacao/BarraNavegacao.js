import { useEffect } from 'react'
import style from './BarraNavegacao.module.css'
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'

function BarraNavegacao({pagina}){

    return (
        <nav className={style.barraNavegacao}>
            <div className={style.logo}>
                <img src="/img/avatar.jpeg" alt="Descrição da imagem" />
                <span>Lauren</span>
            </div>
            <ul className={style.menu}>
                <li>
                    <Link to="/" className={`${pagina == 'Despesas' ? style.active : ''}`}>Transações</Link>
                </li>
                <li>
                    <Link to="/despesas/create" className={`${pagina == 'novaDespesa' ? style.active : ''}`}>Nova despesa</Link>
                </li>
            </ul>
            <div className={style.rodape}>
                <h3>Rafael Raposo - 2023</h3>
            </div>
        </nav>
    )
}

export default BarraNavegacao