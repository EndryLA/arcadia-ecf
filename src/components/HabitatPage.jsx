import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'


export default function HabitatPage() {
    const {id} = useParams()
    const [habitat,setHabitat] = useState([])
    const [animals,setAnimals] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3000/api/habitats/${id}`)
        .then(response => {
            console.log(response)
            setHabitat(response.data)
        })
        .catch(error => console.log(error))

        axios.get(`http://localhost:3000/api/animals`)
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
            <img src={habitat.image}></img>
            <p>{habitat.description}</p>
            <h2>Animaux de l'habitat</h2>
            <div className='card-container'>
                {animals.map(animal => (
                <div className='animal-card' key={animal._id}>
                    <img src={animal.image}></img>
                    <div>
                        <h3>{animal.name}</h3>
                        <p>{animal.race}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    )
}
