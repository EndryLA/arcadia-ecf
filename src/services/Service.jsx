import axios from 'axios'
import {useState, useEffect} from 'react'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import { useParams, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import {Link} from 'react-router-dom'


export function GetServices() {
    const [services,setServices] = useState([])
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
    
    useEffect(() => { 
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        axios.get(API_URL_BASE + '/api/services/')
        .then( response => {
            setServices(response.data)
        })
        .catch (error => console.log(error)) 
    }, [])

    return (
        <div className="card-container">
        {(services && services.length > 0) && (
            services.map(service => (
                <ServiceCard key={service._id} title={service.title} content={service.description} />
            ))
        )}
    </div>
    )
}

/* Displays the CRUD table for services dashboard*/
export function ServiceCrud() {
    

    const [services, setServices] = useState([])
    const userRole = localStorage.getItem('userRole')
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const handleDelete = () => {
        <DeleteService />
    }

        useEffect(() => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

            axios.get(API_URL_BASE + '/api/services')
            .then( res => {
                setServices(res.data)
            })
            .catch( error => {
                console.log(error)
            })
        },[])

    return (
        <div className='crud-container'>

        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over services and return table rows */}
                {services.map(service => (
                    <tr key={service._id}>
                        <td>{service.title}</td>
                        <td>{service.description}</td>
                        <td>{<UpdateButton entity='services' id={service._id} user='admin' content='modifier'/>}</td>
                        <td>{<DeleteButton entity='services' id={service._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="buttons-container">
        <Link to={`/${userRole}/services/new`} className='button'>Créer Service</Link>
        <Link to={`/${userRole}/dashboard`} className='button cancel-button'>Retour</Link>

        </div>

        </div>
        
    )
}

/* Form that handles Services Updates*/
export function UpdateService() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const userRole = localStorage.getItem('userRole')



    useEffect(() => {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        axios.get(API_URL_BASE + `/api/services/${id}`)
        .then(response => {
            setTitle(response.data.service.title)
            setDescription(response.data.service.description)
        })
        .catch(error => {
            console.error(error)
        })
    },[])

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`,
        }
    }


    const handleSubmit = (e) => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        e.preventDefault()
        axios.put(API_URL_BASE + `/api/services/${id}`,{title, description},config)
        .then (res => {
            navigate(`/${userRole}/services`)
        })
        .catch (error => {
            console.log(error)
        })
    }

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Titre</label>
                    <input onChange= {(e) => setTitle(e.target.value)} value = {title} name='title' type = 'text'/>
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea  onChange= {(e) => setDescription(e.target.value)} value = {description}  name='description'></textarea>
                </div>
                <div className='buttons-container'>
                <input type='submit' className='button' value='Enregistrer'/>
                <Link to={`/${userRole}/services`} className='button cancel-button'>Retour</Link>
                </div>
            </form>
        )
        
}

export function CreateService() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const userRole = localStorage.getItem('userRole')
    
    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`,
        }
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        axios.post(API_URL_BASE + '/api/services/new', {title,description},config)
        .then((res) => {
            navigate(`/${userRole}/services`)

        })
        .catch(error => console.error(error))
    }

    const cancelClick = () => {
        navigate(`/${userRole}/services`)

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='title'>Titre</label>
                <input onChange={(e) => setTitle(e.target.value)} name='title' type='text'/>
            </div>
            <div>
                <label htmlFor='title'>Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} name='title' type='text'></textarea>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
    )
}


export default ServiceCrud