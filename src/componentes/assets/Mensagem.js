import { useEffect,useState } from 'react'
import style from './Mensagem.module.css'

function Mensagem({texto,status}){

    const [visivel,setVisivel] = useState()

    useEffect(()=>{
        if(!texto){
            setVisivel(false)
            return
        }

        setVisivel(true)

        const timer = setTimeout(()=>{
            setVisivel(false)
        },4000)
        console.log('aqui')
        return ()=>clearTimeout(timer)

    },[texto])


    return (
        <>
            {
                visivel && (
                    <div className={`${style.containerMensagem} ${status == 'success' ? style.success : style.error}`}>
                        <p>{texto}</p>
                    </div>
                )
            }
            
        </>
    )
}

export default Mensagem