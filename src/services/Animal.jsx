import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {DeleteButton, UpdateButton} from '../components/CrudButtons'
import {Link} from 'react-router-dom'

export function AnimalsCrud() {

    const [animals, setAnimals] = useState([])

    const handleDelete = () => {
        <DeleteService />
    }

        useEffect(() => {
            axios.get('http://localhost:3000/api/animals')
            .then( res => {
                setAnimals(res.data)
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
                    <th>habitat</th>
                    <th>Race</th>
                    <th>Nom</th>
                    <th>Etat</th>
                    <th>image</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over habitats and return table rows */}
                {animals.map(animal => (
                    <tr key={animal._id}>
                        <td>{animal.habitatId}</td>
                        <td>{animal.race}</td>
                        <td>{animal.name}</td>
                        <td>{animal.state}</td>
                        <td><img src={`http://localhost:3000/api/images/download/${animal.image}`}/></td>
                        <td>{<UpdateButton entity='animals' id={animal._id} content='modifier' user='admin'/>}</td>
                        <td>{<DeleteButton entity='animals' id={animal._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='buttons-container'>
        <Link to='/admin/animals/new' className='button'>Créer Animal</Link>
        <Link to='/admin/dashboard' className='button cancel-button'>Retour</Link>

        </div>


        </div>
        
    )
}

export function CreateAnimal() {
    const [habitatId, setHabitatId] = useState('')
    const [race, setRace] = useState('')
    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const [habitats,setHabitats] = useState([])

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`,
            "Content-Type":'multipart/form-data'
        }
    }

    useEffect(  () => {
        async function  fetchData() {
            const response = await axios.get('http://localhost:3000/api/habitats')
            setHabitats(response.data)
        }
        fetchData()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('image', image);
    
            const uploadResponse = await axios.post('http://localhost:3000/api/upload', formData, config);
            const uploadedFilename = uploadResponse.data.Image.filename;
    
            const animalData = { name, habitatId, state, race, image: uploadedFilename };
    
            await axios.post('http://localhost:3000/api/animals/new', animalData)
            .then(() => navigate('/admin/animals'))
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cancelClick = () => {
        navigate('/admin/animals')
    }

    return (
        <form onSubmit={handleSubmit} method='post' encType='multipart/data-form'>
            <div>
                <label htmlFor='habitatId'>Habitat</label>
                <select onChange={e => setHabitatId(e.target.value)} name='habitatId' value={habitatId}>
                    <option>Sélectionnez un habitat</option>
                    {habitats.map((habitat) => (
                        <option key = {habitat._id} value={habitat._id}>{habitat.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='race'>Race</label>
                <input onChange={(e) => setRace(e.target.value)} name='race' type='text'/>
            </div>
            <div>
                <label htmlFor='name'>Nom</label>
                <input onChange={(e) => setName(e.target.value)} name='name' type='text'/>
            </div>
            <div>
                <label htmlFor='state'>Etat</label>
                <input onChange={(e) => setState(e.target.value)} name='state' type='text'/>
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input onChange={(e) => setImage(e.target.files[0])} name='image' type='file'/>
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
    )
}

export function UpdateAnimal() {
    const [habitatId, setHabitatId] = useState('')
    const [name, setName] = useState('')
    const [race, setRace] = useState('')
    const [image, setImage] = useState('')
    const [state, setState] = useState('')
    const [habitats,setHabitats] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/api/animals/${id}`)
        .then(response => {
            console.log('useEffet : ',response)
            setHabitatId(response.data.habitatId)
            setName(response.data.name)
            setImage(response.data.image)
            setState(response.data.state)
            setRace(response.data.race)
        })
        .catch(error => {
            console.error(error)
        })
        axios.get('http://localhost:3000/api/habitats')
        .then(response => {
            setHabitats(response.data)
        })
        .catch(error => console.log(error))
    },[])


   /*  const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/animals/${id}`,{name,habitatId, image, race, state})
        .then (res => {
            console.log(res)
            navigate('/admin/animals')
        })
        .catch (error => {
            console.log(error)
        })
    } */

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`,
            "Content-Type":'application/json'
        }
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        try {
            let uploadedFilename = image;

            if (image instanceof File) {
                const formData = new FormData();
                formData.append('image', image);

                const uploadConfig = {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": 'multipart/form-data'
                    }
                };

                const uploadResponse = await axios.post('http://localhost:3000/api/upload', formData, uploadConfig);
                uploadedFilename = uploadResponse.data.image.filename;
            }

            const animalData = { name, habitatId, state, race, image: uploadedFilename };
            const updateConfig = {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            };

            const response = await axios.put(`http://localhost:3000/api/animals/${id}`, animalData, updateConfig);
            console.log(response);
            navigate('/admin/animals');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cancelClick = () => {
        navigate('/admin/animals/')
    }

        return (
            <form onSubmit={handleSubmit2} encType='multipart/form-data'>
            <div>
                <label htmlFor='habitatId'>Habitat</label>
                <select onChange={e => setHabitatId(e.target.value)} name='habitatId' value={habitatId}>
                    {habitats.map((habitat) => (
                        <option key = {habitat._id} value={habitat._id}>{habitat.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='race'>Race</label>
                <input onChange={(e) => setRace(e.target.value)} name='race' type='text' value={race}/>
            </div>
            <div>
                <label htmlFor='name'>Nom</label>
                <input onChange={(e) => setName(e.target.value)} name='name' type='text' value={name}/>
            </div>
            <div>
                <label htmlFor='state'>Etat</label>
                <input onChange={(e) => setState(e.target.value)} name='state' type='text' value={state}/>
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input onChange={(e) => setImage(e.target.files[0])} name='image' type='file' />
            </div>
            <div className='buttons-container'>
                <input type='submit' value='Enregistrer' name='submit' className='button'/>
                <input onClick = {cancelClick} type='submit' value='Annuler' name='cancel-submit' className='button cancel-button'/>
            </div>
        </form>
        )
        
}

export function AnimalVisits() {
    const [animals, setAnimals] = useState([])
    const [sortOrder, setSortOrder] = useState('decroissant');

        useEffect(() => {
            axios.get('http://localhost:3000/api/animals')
            .then( res => {
                setAnimals(res.data)
            })
            .catch( error => {
                console.log(error)
            })
        },[])

        const sortedAnimals = [...animals].sort((a, b) => {
            if (sortOrder === 'croissant') {
                return parseInt(a.visits) - parseInt(b.visits);
            } else {
                return parseInt(b.visits) - parseInt(a.visits);
            }
        });

        console.log(sortedAnimals)

    return (
        <div className='crud-container'>
        <div className='filtres'>
                <label>Trier par visites:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value='croissant'>Croissant</option>
                    <option value='decroissant'>Décroissant</option>
                </select>
            </div>

        <table>
            <thead>
                <tr>
                    <th>Habitat</th>
                    <th>Nom</th>
                    <th>Race</th>
                    <th>visites</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over habitats and return table rows */}
                {sortedAnimals.map(animal => (
                    <tr key={animal._id}>
                        <td>{animal.habitatId}</td>
                        <td>{animal.name}</td>
                        <td>{animal.race}</td>
                        <td>{animal.visits}</td>
                        <td><img src={`http://localhost:3000/api/images/download/${animal.image}`}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='buttons-container'>
        <Link to='/admin/dashboard' className='button cancel-button'>Retour</Link>

        </div>


        </div>
       
    )
}
export default AnimalsCrud