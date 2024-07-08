import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import './styles.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App () {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/connexion' element={<LoginPage/>}/>
      </Routes>

    </Router>
    </>
  )
}
export default App
