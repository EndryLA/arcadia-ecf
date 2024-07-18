import axios from 'axios'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token,setToken] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/users/auth',{username,password})
            
            if(response) {

                //setToken(response.data.token)
                await localStorage.setItem('authToken',response.data.token)
                await localStorage.setItem('userRole',response.data.role)

                console.log(response.data.token)
            }

        } catch(error){
            setError('Login Failed :' + error.message)
            
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
            <input type='submit' name='submit-button' className='button' value='Se connecter'/>
        </form>
    )

}

export default LoginPage