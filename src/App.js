import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

import NovaDespesa from './pages/NovaDespesa'
import Transacoes from './pages/Transacoes'
import EditarTransacao from './pages/EditarTransacao'

import BarraNavegacao from './componentes/navegacao/BarraNavegacao'

import Container from './layout/Container'

function App() {

  const [pagina,setPagina] = useState()

  function verificaBaseDados(){
    if(!localStorage.getItem("sense_db")){
      let obj = []
      obj = JSON.stringify(obj)
      localStorage.setItem('sense_db',obj)
    }
  }

  useEffect(()=>{
    verificaBaseDados()
  },[])

  return (
     <Router>
      <BarraNavegacao pagina={pagina}></BarraNavegacao>
      <Container customClass="minHeight">
        <Routes>
              <Route path='/' element={<Transacoes setPagina={setPagina}/>}></Route>
              <Route path='/despesas/create' element={<NovaDespesa  setPagina={setPagina} />} ></Route>
              <Route path='/transacao/editar/:id' element={<EditarTransacao  setPagina={setPagina} />} ></Route>
        </Routes>
      </Container>
    </Router>

  );
}

export default App;
