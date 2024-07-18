import {useState, useEffect} from 'react'
import axios from 'axios'
import { UpdateButton, DeleteButton } from '../components/CrudButtons'
import {useNavigate, Link} from 'react-router-dom'


export function VetReportCrud() {
    const [vetReports, setVetReports] = useState([])
    const [animals,setAnimals] = useState([])

    

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const getAnimalNameById = (id) => {
        const animal = animals.find(animal => animal._id === id);
        return animal.name
    };


    useEffect(() => {

        axios.get('http://localhost:3000/api/animals',config)
        .then(response => {setAnimals(response.data)})
        .catch(error => console.log(error))


        axios.get('http://localhost:3000/api/veterinary',config)
        .then(response => setVetReports(response.data))
        .catch(response => console.log(response.data)) 
    },[])

    return(
        <div className='crud-container'>
        

        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Detail</th>
                    <th>Animal</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over services and return table rows */}
                {vetReports.map(vetReport => (
                    <tr key={vetReport._id}>
                        <td>{formatDate(vetReport.date)}</td>
                        <td>{vetReport.detail}</td>
                        <td>{getAnimalNameById(vetReport.animalId)}</td>
                        <td>{<UpdateButton entity='veterinary' id={vetReport._id} />}</td>
                        <td>{<DeleteButton entity='veterinary' id={vetReport._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to='/veterinary/new' className='button'>Créer rapport</Link>

        </div>  
    )
}


export function CreateVetReport() {
    const [animals,setAnimals] = useState([])
    const [date,setDate]=useState('')
    const [detail, setDetail] = useState('')
    const [authorId, setAuthorId] = useState('66965737a4dbf1ca7614d8fd')
    const [animalId, setAnimalId] = useState('')
    const navigate = useNavigate()

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }

    function getAnimalName(animalsArray){
        return animalsArray.find((name => name === animalId))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/veterinary/new',{date,detail, animalId, authorId},config)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
        navigate('/veterinary')
    }

    

    useEffect(() => {
        axios.get(`http://localhost:3000/api/animals/`)
        .then(response => setAnimals(response.data))
        .catch(error => console.error(error))

        axios.get('http://localhost:3000/api/users',config)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },[])

    return(
        <form onSubmit={handleSubmit}> 
            <div>
                <label htmlFor='date'>Date</label>
                <input type='date' onChange={(e) => setDate(e.target.value)} name='date'/>
            </div>
            <div>
                <label htmlFor='detail'>Detail</label>
                <textarea name='detail' onChange={(e) => setDetail(e.target.value)}></textarea>
            </div>
            <div>
                <label htmlFor='animalId'>Animal</label>
                <select onChange={(e) => setAnimalId(e.target.value)}>
                    <option>Selectionnez un animal</option>
                    {animals.map(animal => (
                        <option value={animal._id} key={animal._id}>{animal.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type='hidden' value={authorId} name='authorId'/>
            </div>
            <input type='submit' value='Enregistrer' className='button'/>
        </form>
    )

}

export function CommentHabitat() {
    const [habitats,setHabitats] = useState([])
    const [habitatId,setHabitatId] = useState('')
    const [comment,setComment] = useState('')

    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }


    useEffect(() => {
        axios.get(`http://localhost:3000/api/habitats`,config)
        .then(response => {
            setHabitats(response.data)
        })
        .catch(error => console.log(error))
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/api/habitats/${habitatId}`,{_id:habitatId,commentaire:comment},config)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='_id'>Habitat</label>
                <select onChange={e => setHabitatId(e.target.value)} name='_id'>
                    <option>Sélectionnez un habitat</option>
                    {habitats.map(habitat => (
                        <option key={habitat._id} value={habitat._id}>{habitat.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='commentaire'>Commentaire</label>
                <textarea onChange={(e) => setComment(e.target.value)} name='commentaire'></textarea>
            </div>
            <input type='submit' className='button'/>
        </form>
    )
}
