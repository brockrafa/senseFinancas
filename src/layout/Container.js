import styles from './Container.module.css'

function Container(props){
    return (
        <div className={`${styles.container} ${styles.minHeigth}`}>
            <header className={styles.logo}>
                <img src="/img/logo.png" alt="" />
            </header>
            {props.children}
        </div>
    )
}

export default Container