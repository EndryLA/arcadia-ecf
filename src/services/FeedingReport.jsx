import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { UpdateButton,DeleteButton } from '../components/CrudButtons'




export function FeedingCrud() {

    const [animals,setAnimals] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3000/api/animals')
        .then(response => setAnimals(response.data))
        .catch(error => console.log(error))
    },[])

    const handleDelete = () => {
        <DeleteService />
    }


    
    return (
        <div className='crud-container'>
           <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Nourriture recommandée</th>
                    <th>Grammage</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over services and return table rows */}
                {animals.map(animal => (
                    <tr key={animal._id}>
                        <td>{animal.name}</td>
                        <td>{animal.recommendedFood }</td>
                        <td>{animal.foodGrammage }</td>
                        <td>{<UpdateButton entity='feed' id={animal._id} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        

        </div>
        
    )
}


export function CreateFeedingReport() {
    const [animals,setAnimals] = useState([])
    const [date,setDate] = useState('')
    const [food,setFood] = useState('')
    const [quantity,setQuantity] = useState('')
    const [animal,setAnimal] = useState('')
    const {id} = useParams()

    const token = localStorage.getItem('authToken')
            const config = {
                headers: {
                    authorization:`Bearer ${token}`
                }
            }
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/animals/${id}`,config)
        .then(response => setAnimal(response.data))
        .catch(error => console.log(error))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/feed/new',{animalId:id,date:date,food:food,quantity:quantity},config)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return(
        <form onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor='date'>Date</label>
                <input type='datetime-local' name='date' onChange={e => setDate(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='food'>Nourriture</label>
                <input type='text' name='food' onChange={e => setFood(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='quantity'>Quantité</label>
                <input type='text' name='food' onChange={e => setQuantity(e.target.value)}/>
            </div>
            <input type='submit' className='button' value='Enregistrer'/>
        </form>
    )
}