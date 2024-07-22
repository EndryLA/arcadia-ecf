import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { UpdateButton,DeleteButton } from '../components/CrudButtons'





export function FeedingCrud() {

    const [animals,setAnimals] = useState([])
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE



    useEffect(() => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        axios.get(API_URL_BASE + '/api/animals')
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
                        <td>{<UpdateButton entity='feed' id={animal._id} user='employe' content='nourrir' />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to='/employe/dashboard'className='button cancel-button'>Retour</Link>

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
    const navigate = useNavigate()
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const token = localStorage.getItem('authToken')
            const config = {
                headers: {
                    authorization:`Bearer ${token}`
                }
            }
    
    useEffect(() => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        axios.get(API_URL_BASE + `/api/animals/${id}`,config)
        .catch(error => console.log(error))
    },[])

    const handleSubmit = (e) => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        e.preventDefault()
        axios.post(API_URL_BASE + '/api/feed/new',{animalId:id,date:date,food:food,quantity:quantity},config)
            .then(response => {
                console.log(response)
                navigate('/employe/feed')
            })
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

export function GetFeedingReports() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
    const [animals, setAnimals] = useState([]);
    const [feedingReports, setFeedingReports] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAnimalId, setSelectedAnimalId] = useState('');

    const token = localStorage.getItem('authToken');
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
    }

    useEffect(() => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        const fetchData = async () => {
            try {
                const animalResponse = await axios.get(API_URL_BASE + '/api/animals', config);
                setAnimals(animalResponse.data);
                
                const feedResponse = await axios.get(API_URL_BASE + '/api/feed', config);
                setFeedingReports(feedResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [config]);

    const getAnimalName = (animalId) => {
        const animal = animals.find(a => a._id === animalId);
        return animal ? animal.name : 'Nom non renseigné';
    };

    const filteredReports = feedingReports.filter(feedingReport => {
        const matchesDate = selectedDate ? feedingReport.date.startsWith(selectedDate) : true;
        const matchesAnimal = selectedAnimalId ? feedingReport.animalId === selectedAnimalId : true;
        return matchesDate && matchesAnimal;
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAnimalChange = (e) => {
        setSelectedAnimalId(e.target.value);
    };

    return (
        <div className='crud-container'>
            <div className='filtres'>
                <label>Filtrer par date:</label>
                    <input type='date' value={selectedDate} onChange={handleDateChange} />
                <label> Filtrer par animal</label>
                    <select value={selectedAnimalId} onChange={handleAnimalChange}>
                        <option value=''>Tous</option>
                        {animals.map(animal => (
                            <option key={animal._id} value={animal._id}>{animal.name}</option>
                        ))}
                    </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Date</th>
                        <th>Food</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map(report => (
                        <tr key={report._id}>
                            <td>{getAnimalName(report.animalId)}</td>
                            <td>{formatDate(report.date)}</td>
                            <td>{report.food}</td>
                            <td>{report.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/veterinary/dashboard' className='button cancel-button'>
                Retour
            </Link>
        </div>
    );
}