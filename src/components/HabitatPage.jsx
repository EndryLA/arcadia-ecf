import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import {useState, useEffect} from 'react'



export default function HabitatPage() {
    const {id} = useParams()
    const [habitat,setHabitat] = useState([])
    const [animals,setAnimals] = useState([])
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE



    useEffect(() => {
        axios.get(API_URL_BASE + `/api/habitats/${id}`)
        .then(response => {
            console.log(response)
            setHabitat(response.data)
        })
        .catch(error => console.log(error))

        axios.get(API_URL_BASE + `/api/animals`)
        .then(response => {
            const filteredAnimals = response.data.filter(animal => animal.habitatId === id);
            setAnimals(filteredAnimals);
            console.log('animals :', animals)
            
        })
        .catch(error => console.log(error))
    },[])

    return (
        <section className='habitat-page'>
            <h1>{habitat.name}</h1>
            <img src={API_URL_BASE + `/api/images/download/${habitat.image}`}></img>
            <p>{habitat.description}</p>
            <h2>Animaux de l'habitat</h2>
            <div className='card-container'>
                {animals.map(animal => (
                <div className='animal-card' key={animal._id}>
                    <img src={API_URL_BASE + `/api/images/download/${animal.image}`}></img>
                    <div>
                        <h3>{animal.name}</h3>
                        <p>{animal.race}</p>
                    </div>
                    <Link to={`/animals/${animal._id}`}  className='button'>Visiter</Link>
                </div>
                ))}
            </div>
        </section>
    )
}
