import {useState, useEffect} from 'react'
import axios from 'axios'
import { UpdateButton, DeleteButton } from '../components/CrudButtons'
import {useNavigate, Link} from 'react-router-dom'


export function VetReportCrud() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
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

        axios.get(API_URL_BASE + '/api/animals',config)
        .then(response => {setAnimals(response.data)})
        .catch(error => console.log(error))


        axios.get(API_URL_BASE + '/api/veterinary',config)
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
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


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
        axios.post(API_URL_BASE + '/api/veterinary/new',{date,detail, animalId, authorId},config)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
        navigate('/veterinary/dashboard')
    }

    

    useEffect(() => {
        axios.get(API_URL_BASE + `/api/animals/`)
        .then(response => setAnimals(response.data))
        .catch(error => console.error(error))
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
    const navigate = useNavigate()
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }


    useEffect(() => {
        axios.get(API_URL_BASE + `/api/habitats`,config)
        .then(response => {
            setHabitats(response.data)
        })
        .catch(error => console.log(error))
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(API_URL_BASE + `/api/habitats/${habitatId}`,{_id:habitatId,commentaire:comment},config)
        .then(() => navigate('/veterinary/dashboard'))
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



export function GetVetReports() {
    const [vetReports, setVetReports] = useState([]);
    const [animals, setAnimals] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vetReportsResponse, animalsResponse] = await Promise.all([
                    axios.get(API_URL_BASE + '/api/veterinary'),
                    axios.get(API_URL_BASE + '/api/animals')
                ]);
                setVetReports(vetReportsResponse.data);
                setAnimals(animalsResponse.data);
            } catch (err) {
                
            }
        };

        fetchData();
    }, []);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const animalNames = animals.reduce((acc, animal) => {
        acc[animal._id] = animal.name;
        return acc;
    }, {});

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAnimalChange = (e) => {
        setSelectedAnimalId(e.target.value);
    };

    const filteredReports = vetReports.filter(vetReport => {
        const matchesDate = selectedDate ? vetReport.date.startsWith(selectedDate) : true;
        const matchesAnimal = selectedAnimalId ? vetReport.animalId === selectedAnimalId : true;
        return matchesDate && matchesAnimal;
    });


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
                        <th>Date</th>
                        <th>Animal</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map(vetReport => (
                        <tr key={vetReport._id}>
                            <td>{formatDate(vetReport.date)}</td>
                            <td>{animalNames[vetReport.animalId]}</td>
                            <td>{vetReport.detail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/admin/dashboard' className='button cancel-button'>Retour</Link>
        </div>
    );
}

export default CreateVetReport