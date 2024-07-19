import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import { useParams, useNavigate, Link } from 'react-router-dom'

export function EmployesCrud() {

    const [employes, setEmploye] = useState([])
    const navigate = useNavigate()

    const handleDelete = () => {
        <DeleteService />
    }

    

    useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }
    if (userRole === 'admin') {

        axios.get('http://localhost:3000/api/users/',config)
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
        <Link to='/dashboard/employes/new' className='button'>Créer Employé</Link>
        <Link to='/admin/dashboard/' className='button cancel-button'>Retour</Link>

        </div>

        </div>
        
    )
}

export function CreateEmploye() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const handleSubmit =  (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('authToken')
            const config = {
                headers: {
                    authorization:`Bearer ${token}`
                }
            }
            const userData = {username,password,lastname,firstname,role}

            axios.post('http://localhost:3000/api/users/new', userData, config)
            .then((response)=> console.log(response))
        } catch(error) {
            console.log(error)
        }
    }


    const cancelClick = () => {
        navigate('/admin/dashboard')
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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const token = localStorage.getItem('authToken')
    const config = {headers: {authorization:`Bearer ${token}`}}

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${id}`,config)
        .then(response => {
            console.log('useEffet : ',response)
            setUsername(response.data.username)
            setPassword(response.data.password)
            setLastname(response.data.lastname)
            setFirstname(response.data.firstname)
            setRole(response.data.setRole)
        })
        .catch(error => {
            console.error(error)
        })
    },[])

    


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/animals/${id}`,{username,password, lastname, firstname, role},config)
        .then (res => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch (error => {
            console.log(error)
        })
    }

    const cancelClick = () => {
        navigate('/admin/dashboard')
    }

        return (
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Adresse mail</label>
                <input onChange={(e) => setEmail(e.target.value)} name='email' type='text' value={username}/>
            </div>
            <div>
                <label htmlFor='password'> Nouveau mot de passe</label>
                <input onChange={(e) => setPassword(e.target.value)} name='password' type='password'/>
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
                <select name='role' onChange= {(e) => setRole(e.target.value)}>
                    <option value='employe'>Employé</option>
                    <option value='veterinary'>vétérinaire</option>
                </select>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
        )   
        
}

export default EmployesCrud