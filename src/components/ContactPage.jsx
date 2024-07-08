function ContactPage() {
    return (
        <form method='post'> 
        <h1>Nous Contacter</h1> 
        <div>
            <label htmlFor='lastname'>Nom</label>
            <input id='lastname' name='lastname'/> 
        </div>
        <div>
            <label htmlFor='firstname'>Prénom</label>
            <input id='firstname' name='firstname'/> 
        </div>
        <div>
            <label htmlFor='email'>Adresse mail</label>
            <input type='email' id='email' name='email'/> 
        </div>
        <div>
            <label htmlFor="message">Message</label>
            <textarea name='message' ></textarea>
        </div>
        <input type="submit" className='button'/>
    </form>
    )
}

export default ContactPage