import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ContactPage from './components/ContactPage'

function App () {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/connexion' element={<LoginPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
      </Routes>
    </Router>
    <Footer />
    </>
  )
}
export default App
