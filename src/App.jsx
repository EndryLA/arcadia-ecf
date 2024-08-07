import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import ContactPage from './components/ContactPage'
import ServicePage from './components/ServicePage'
import AdminPage from './components/AdminPage'
import HabitatsPage from './components/HabitatsPage'
import ServiceCrud, {CreateService, UpdateService} from './services/Service'
import {EmployesCrud, CreateEmploye, UpdateEmploye} from './services/Employe'
import {CreateHabitat, HabitatCrud, UpdateHabitat} from './services/Habitat'

import AnimalsCrud, { AnimalVisits, CreateAnimal, UpdateAnimal } from './services/Animal'

import './styles.css'
import CommentsCrud from './services/Comment'
import { CommentHabitat, CreateVetReport, GetVetReports, VetReportCrud } from './services/VetReport'
import HabitatPage from './components/HabitatPage'
import { CreateFeedingReport, FeedingCrud, GetFeedingReports } from './services/FeedingReport'
import EmployePage from './components/EmployePage'
import VeterinaryPage from './components/VeterinaryPage'
import AnimalPage from './components/AnimalPage'
import UpdateSchedule from './services/Schedule'

function App () {
  
  const userRole = localStorage.getItem('userRole')
  const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
  

  return (
    <>
    <Router>
    <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/connexion' element={<LoginPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/services' element={<ServicePage/>}/>
        <Route path='/habitats' element={<HabitatsPage/>}/>
        <Route path='/habitats/:id' element={<HabitatPage/>}/>
        <Route path='/animals/:id' element={<AnimalPage/>}/>

        {/* Admin Routes */ }

        {userRole === 'admin' ? (
          <>
        <Route path='/admin/dashboard' element={<AdminPage />} />
        <Route path='/admin/services' element={<ServiceCrud />} />
        <Route path='/admin/services/new' element={<CreateService />} />
        <Route path={`/admin/services/update/:id`} element={<UpdateService/>} />

        <Route path='/admin/employes' element={<EmployesCrud />} />
        <Route path='/admin/employes/new' element={<CreateEmploye />} />
        <Route path='/admin/employes/update/:id' element={<UpdateEmploye />} />

        <Route path='/admin/habitats' element={<HabitatCrud />} />
        <Route path='/admin/habitats/new' element={<CreateHabitat />} />
        <Route path={`/admin/habitats/update/:id`} element={<UpdateHabitat/>} />

        <Route path='/admin/animals/' element={<AnimalsCrud />} />
        <Route path='/admin/animals/new' element={<CreateAnimal />} />
        <Route path={`/admin/animals/update/:id`} element={<UpdateAnimal/>} />
        <Route path={`/admin/animals/visits`} element={<AnimalVisits/>} />

        <Route path='/admin/veterinary-reports/' element={<GetVetReports />} />

        <Route path='/admin/schedule/' element={<UpdateSchedule />} />

        </>
        ) : (
          <>
          </>
        )}

        {/* Employe Routes */ }

        {userRole === 'employe' ? (
          <>
        <Route path='/employe/dashboard' element={<EmployePage/>}/>
        <Route path={`/employe/comments`} element={<CommentsCrud/>} />
        <Route path={'/employe/feed'} element={<FeedingCrud/>}/>
        <Route path={'/employe/services'} element={<ServiceCrud/>}/>
        <Route path={'/employe/services/new'} element={<CreateService/>}/>
        <Route path={'/employe/feed/update/:id'} element={<CreateFeedingReport/>}/>
        </>

        ) : <></>}

        {/*Veterinary Routes*/}

        {userRole === 'veterinary' ? (
        <>
        <Route path={`/veterinary/dashboard`} element={<VeterinaryPage/>} />
        <Route path={`/veterinary/reports`} element={<GetFeedingReports/>} />
        <Route path={`/veterinary/habitats/comment`} element={<CommentHabitat/>} />
        <Route path={`/veterinary/new-report/`} element={<CreateVetReport/>} />
        <Route path={`/veterinary/update/:id`} element={<CreateVetReport/>} />
        </>)
        : <></>}

        













      </Routes>
    <Footer />
    </Router>
    </>
  )
}
export default App
