import {useState,useEffect,UseParams} from 'react'
import axios from 'axios'
import animalState from '@assets/animal-state.svg'
import { useParams} from 'react-router-dom'

export function AnimalPage() {
    const [animal,setAnimal] = useState([])
    const [vetReport, setVetReport] = useState([])
    const [vetReports, setVetReports] = useState([]);
    const {id} = useParams()

    const userRole = localStorage.getItem('oui')


    useEffect(() => {
        axios.get(`http://localhost:3000/api/animals/${id}`)
        .then(response => {
            setAnimal(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
        
    },[])

    useEffect(() => {
        if (userRole !== 'admin' || 'veterinary' || 'employe') {
            axios.post(`http://localhost:3000/api/animals/visit/${id}`)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        }
    },[])

    useEffect(()=>  {
        axios.get(`http://localhost:3000/api/veterinary`)

        .then(response => {
            setVetReports(response.data)

            setVetReport(vetReports.find(report => report.animalId === id));
        })
        .catch(error => console.log(error))
    },[animal])

    return(
        <section className='animal-page'>

            <div className='titles'>
                <h1>{animal.name}</h1>       
                <p>{animal.race}</p>       
            </div>

            <div className='content'>
                <img src={`http://localhost:3000/api/images/download/${animal.image}`} alt={animal.name}/>
                <div className='animal-info'>
                    <div className='health-state'>
                        <img className='state-logo' src={animalState} />
                        <p>{animal.state}</p>
                    </div>
                    <div>
                        <h3>Commentaire du vétérinaire</h3>
                        {vetReport && <p>{vetReport.detail}</p>}
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default AnimalPage