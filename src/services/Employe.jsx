import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import { useParams, useNavigate, Link } from 'react-router-dom'

export function EmployesCrud() {

    const [employes, setEmploye] = useState([])
    const navigate = useNavigate()
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const handleDelete = () => {
        <DeleteService />
    }

    

    useEffect(() => {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
    const userRole = localStorage.getItem('userRole')
    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }
    if (userRole === 'admin') {

        axios.get(API_URL_BASE + '/api/users/',config)
        .then( res => {
            setEmploye(res.data)
        })
        .catch( error => {
            console.log(error)
        })
    } else {
        navigate('/')
    }
        
    },[])

    return (
        <div className='crud-container'>

        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Poste</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over services and return table rows */}
                {employes.map(employe => (
                    <tr key={employe._id}>
                        <td>{employe.username}</td>
                        <td>{employe.lastname}</td>
                        <td>{employe.firstname}</td>
                        <td>{employe.role === 'veterinary' ? 'vétérinaire' : 'employé'}</td>
                        <td>{<UpdateButton entity='employes' id={employe._id} content='modifier' user='admin'/>}</td>
                        <td>{<DeleteButton entity='users' id={employe._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='buttons-container'>
        <Link to='/admin/employes/new' className='button'>Créer Employé</Link>
        <Link to='/admin/dashboard/' className='button cancel-button'>Retour</Link>

        </div>

        </div>
        
    )
}

export function CreateEmploye() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const handleSubmit =  (e) => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        e.preventDefault()
        try {
            const token = localStorage.getItem('authToken')
            const config = {
                headers: {
                    authorization:`Bearer ${token}`
                }
            }
            const userData = {username,password,lastname,firstname,role}

            axios.post(API_URL_BASE + '/api/users/new', userData, config)
            .then(() => {
                const userData = {
                    email:username,
                    lastname:lastname,
                    firstname:firstname,
                    message:`Nous vous informons de la création de votre espace personnel, votre adresse mail de connexion est : ${username}. Veuillez vous rapprocher de votre administrateur afin d'obtenir le mot de passe.`
                }
                axios.post(API_URL_BASE + '/api/contact/send',userData,config)
                .then(() => navigate('/admin/employes'))
            })
        } catch(error) {
            console.log(error)
        }
    }


    const cancelClick = () => {
        navigate('/admin/employes')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Adresse mail</label>
                <input onChange={(e) => setUsername(e.target.value)} name='username' type='text'/>
            </div>
            <div>
                <label htmlFor='password'> Mot de passe</label>
                <input onChange={(e) => setPassword(e.target.value)} name='password' type='password'/>
            </div>
            <div>
                <label htmlFor='lastname'>Nom</label>
                <input onChange={(e) => setLastname(e.target.value)} name='lastname' type='text'/>
            </div>
            <div>
                <label htmlFor='firstname'>Prénom</label>
                <input onChange={(e) => setFirstname(e.target.value)} name='firstname' type='text'/>
            </div>
            <div>
                <label htmlFor='role'>Poste</label>
                <select name='role' onChange= {(e) => setRole(e.target.value)}>
                    <option>Selectionnez un poste</option>
                    <option value='employe'>Employé</option>
                    <option value='veterinary'>Vétérinaire</option>
                </select>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
    )
}

export function UpdateEmploye() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const token = localStorage.getItem('authToken')
    const config = {headers: {authorization:`Bearer ${token}`}}
    const [formData,setFormData] = ('')

    useEffect(() => {
        axios.get(API_URL_BASE + `/api/users/${id}`,config)
        .then(response => {
            console.log('useEffet : ',response)
            setUsername(response.data.username)
            setPassword('')
            setLastname(response.data.lastname)
            setFirstname(response.data.firstname)
            setRole(response.data.role)
        })
        .catch(error => {
            console.error(error)
        })
    },[])

    
   
    const handleSubmit = (e) => {
        e.preventDefault()
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        axios.put(API_URL_BASE + `/api/users/${id}`,{username, firstname,lastname, role},config)
        .then (res => {
            console.log(res)
            navigate('/admin/employes')
        })
        .catch (error => {
            console.log(error)
        })
    }

    const cancelClick = () => {
        navigate('/admin/dashboard')
    }

        return (
            <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor='username'>Adresse mail</label>
                <input onChange={(e) => setUsername(e.target.value)} name='username' type='text' value={username}/>
            </div>
            
            <div>
                <label htmlFor='lastname'>Nom</label>
                <input onChange={(e) => setLastname(e.target.value)} name='lastname' type='text'value={lastname}/>
            </div>
            <div>
                <label htmlFor='firstname'>Prénom</label>
                <input onChange={(e) => setFirstname(e.target.value)} name='firstname' type='text' value={firstname}/>
            </div>
            <div>
                <label htmlFor='role'>Poste</label>
                <select name='role' onChange= {(e) => setRole(e.target.value)} value={role}>
                    <option value='employe'>Employé</option>
                    <option value='veterinary'>vétérinaire</option>
                </select>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick}  value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
        )   
        
}

export default EmployesCrud