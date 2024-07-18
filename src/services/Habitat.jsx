import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import {Link} from 'react-router-dom'


export function GetHabitats() {
    const [habitats,setHabitats] = useState([])

    useEffect(() => { 
        axios.get('http://localhost:3000/api/habitats/')
        .then( response => {
            setHabitats(response.data)
        })
        .catch (error => console.log(error)) 
    }, [])

    return (
        <section className='habitats-page'>
            <h1>Découvrez nos habitats</h1>
            <div className="card-container">
            {(habitats && habitats.length > 0) && (
                habitats.map(habitat => (
                    <div key={habitat._id} className='habitat-card'>
                        <img src={habitat.image}/>
                        <h3>{habitat.name}</h3>
                        <Link to={`/habitats/${habitat._id}`} className='button'>Visiter</Link>
                    </div>
                ))
            )}
            </div>
        </section>

    )
}

export function HabitatCrud() {

    const [habitats, sethabitats] = useState([])

    const handleDelete = () => {
        <DeleteService />
    }

        useEffect(() => {
            axios.get('http://localhost:3000/api/habitats')
            .then( res => {
                sethabitats(res.data)
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
                    <th>Nom d'habitat</th>
                    <th>Commentaire</th>
                    <th>Description</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over habitats and return table rows */}
                {habitats.map(habitat => (
                    <tr key={habitat._id}>
                        <td>{habitat.name}</td>
                        <td>{habitat.commentaire}</td>
                        <td>{habitat.description}</td>
                        <td><img src={habitat.image}/></td>
                        <td>{<UpdateButton entity='habitats' id={habitat._id} />}</td>
                        <td>{<DeleteButton entity='habitats' id={habitat._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to='/dashboard/habitats/new' className='button'>Créer Habitat</Link>

        </div>
        
    )
}

export function CreateHabitat() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [commentaire, setCommentaire] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/habitats/new', {name,description,commentaire,image })
        .then((res) => {
            console.log(res)
        navigate('/dashboard/')

        })
        .catch(error => console.error(error))
        console.log(image)
    }

    const cancelClick = () => {
        navigate('/dashboard/')
    }

    return (
        <form onSubmit={handleSubmit} method='post'>
            <div>
                <label htmlFor='name'>Nom d'habitat</label>
                <input onChange={(e) => setName(e.target.value)} name='name' type='text'/>
            </div>
            <div>
                <label htmlFor='commentaire'>Commentaire</label>
                <input onChange={(e) => setCommentaire(e.target.value)} name='commentaire' type='text'/>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} name='description' type='text'></textarea>
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input onChange={(e) => setImage(e.target.value)} name='image' type='text'/>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
    )
}

export function UpdateHabitat() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [commentaire, setCommentaire] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/habitats/${id}`)
        .then(response => {
            console.log('useEffet : ',response)
            setName(response.data.name)
            setDescription(response.data.description)
            setImage(response.data.image)
            setCommentaire(response.data.commentaire)
        })
        .catch(error => {
            console.error(error)
        })
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/habitats/${id}`,{name,commentaire, image, description})
        .then (res => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch (error => {
            console.log(error)
        })
    }

        return (
            <form onSubmit={handleSubmit} method='post'>
            <div>
                <label htmlFor='name'>Nom d'habitat</label>
                <input onChange={(e) => setName(e.target.value)} name='name' type='text' value={name}/>
            </div>
            <div>
                <label htmlFor='commentaire'>Commentaire</label>
                <input onChange={(e) => setCommentaire(e.target.value)} name='commentaire' type='text' value={commentaire}/>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} name='description' type='text' value={description}></textarea>
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input onChange={(e) => setImage(e.target.value)} name='image' type='text' value={image}/>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
            </div>
        </form>
        )
        
}

export default CreateHabitat