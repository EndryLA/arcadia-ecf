import {useState} from 'react'
import axios from 'axios'

function ContactPage() {

    const [lastname,setLastname] = useState('')
    const [firstname,setFirstname] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    
    
    const handleSubmit = (e) => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        e.preventDefault()
        console.log(firstname, lastname, email, message)
        axios.post(API_URL_BASE + '/api/contact/send',{email,lastname,firstname,message})
        .then(response => {
            console.log(response)
            alert('Votre message a bien été envoyé !')
        })
        .catch(error => console.log(error))


    }


    return (
        <form method='post' onSubmit={handleSubmit}> 
        <h1>Nous Contacter</h1> 
        <div>
            <label htmlFor='lastname'>Nom</label>
            <input id='lastname' name='lastname' onChange={e => setLastname(e.target.value)}/> 
        </div>
        <div>
            <label htmlFor='firstname'>Prénom</label>
            <input id='firstname' name='firstname' onChange={e => setFirstname(e.target.value)}/> 
        </div>
        <div>
            <label htmlFor='email'>Adresse mail</label>
            <input type='email' id='email' name='email' onChange={e => setEmail(e.target.value)}/> 
        </div>
        <div>
            <label htmlFor="message">Message</label>
            <textarea name='message' type='text' onChange={e => setMessage(e.target.value)} ></textarea>
        </div>
        <input type="submit" className='button'/>
    </form>
    )
}

export default ContactPage