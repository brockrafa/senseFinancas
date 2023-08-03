import style from './Home.module.css'
function Home(){
    return (
        <div>
            <h1 className={style.titulo}>Relação de Saídas X Entradas</h1>
            <section className={style.containerIndicadores}>
                <div className={style.cardIndicador}>
                    <h3>Total de despesas</h3>
                    <span>R$199,99</span>
                </div>
                <div className={style.cardIndicador}>
                    <h3>Total de entradas</h3>
                    <span>R$199,99</span>
                </div>
            </section>
            
        </div>
    )
}

export default Home