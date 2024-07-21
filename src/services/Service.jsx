import axios from 'axios'
import {useState, useEffect} from 'react'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import { useParams, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import {Link} from 'react-router-dom'


/* Displays all the services in the service page */
export function GetServices() {
    const [services,setServices] = useState([])

    useEffect(() => { 
        axios.get('http://localhost:3000/api/services/')
        .then( response => {
            console.log(response)
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

    const handleDelete = () => {
        <DeleteService />
    }

        useEffect(() => {
            axios.get('http://localhost:3000/api/services')
            .then( res => {
                setServices(res.data)
                console.log(res.data)
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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const userRole = localStorage.getItem('userRole')


    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/services/${id}`)
        .then(response => {
            console.log('useEffet : ',response)
            setTitle(response.data.service.title)
            setDescription(response.data.service.description)
        })
        .catch(error => {
            console.error(error)
        })
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/services/${id}`,{title, description})
        .then (res => {
            console.log(res)
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
                <input type='submit' className='button' value='Enregistrer'/>
            </form>
        )
        
}

/* Form that handles creation of services*/ 
export function CreateService() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const userRole = localStorage.getItem('userRole')


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/services/new', {title,description})
        .then((res) => {
            console.log(res)
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