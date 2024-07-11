import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ContactPage from './components/ContactPage'
import ServicePage from './components/ServicePage'
import AdminPage from './components/AdminPage'
import {CreateService, UpdateService} from './services/Service'


import './styles.css'

function App () {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/connexion' element={<LoginPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/services' element={<ServicePage/>}/>

        <Route path='/dashboard/services' element={<AdminPage />} />
        <Route path='/dashboard/services/new' element={<CreateService />} />
        <Route path={`/dashboard/services/update/:id`} element={<UpdateService/>} />




      </Routes>
    </Router>
    <Footer />
    </>
  )
}
export default App
