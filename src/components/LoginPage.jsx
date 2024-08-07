import axios from 'axios'
import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'


function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token,setToken] = useState(null)
    const navigate = useNavigate()
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const handleSubmit = async (e) => {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        e.preventDefault()
        try {
            const response = await axios.post(API_URL_BASE + '/api/users/auth',{username,password})
            
            if(response) {
            const {firstname, lastname, userId, role} = response.data
            localStorage.setItem('authToken',response.data.token)
            localStorage.setItem('userRole',role)
            navigate('/')
            }

        } catch(error){
            setError('La tentative de connexion a échoué :' + error.message)
            
        }
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken',token)
        } else {
            localStorage.removeItem('authToken')
        }
    },[token])
    return(
        <form method='post' onSubmit={handleSubmit}>
            <h1>Se Connecter</h1>
            <div>
                <label htmlFor='username'>Adresse email</label>
                <input type='email' name='username' onChange = {(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>Mot de passe </label>
                <input type='password' name='password' id='password' onChange = {(e) => setPassword(e.target.value)}/>
            </div>
            <div className='errors-div'>
                {error && <p>Adresse mail ou mot de passe invalide </p>}
            </div>
            <input type='submit' name='submit-button' className='button' value='Se connecter'/>
        </form>
    )

}



export default LoginPage