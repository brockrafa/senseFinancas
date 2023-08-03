import { useEffect } from 'react'
import style from './TabelaTransacoes.module.css'
import { FaPencil, FaTrashCan } from "react-icons/fa6";


function TabelaTransacoes({ despesas, setDespesas }){
    function editarItem(){
        console.log('Editar')
    }
    function excluirItem(id){
        let d = despesas.filter((de)=> de.id != id)
        setDespesas(d)

        localStorage.setItem('sense_db',JSON.stringify(d))
    }
    return (
        <div className={style.tabelaTransacoes}>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        despesas.map((d,index)=>(
                            <tr key={index}>
                                <td>{d.titulo}</td>
                                <td>{d.tipo}</td>
                                <td>{d.categoria}</td>
                                <td>R${d.valor}</td>
                                <td>{d.data}</td>
                                <td>
                                    <FaPencil onClick={editarItem}/>
                                    <FaTrashCan onClick={()=>{excluirItem(d.id)}}/>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
               
            </table>
        </div>
    )
}

export default TabelaTransacoes