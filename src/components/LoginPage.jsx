function LoginPage() {
    return(
        <form method='post'>
            <h1>Se Connecter</h1>
            <div>
                <label htmlFor='email'>Adresse email</label>
                <input type='email' name='email' id='email'/>
            </div>
            <div>
                <label htmlFor='password'>Mot de passe </label>
                <input type='password' name='password' id='password'/>
            </div>
            <input type='submit' name='submit-button' className='button' value='Se connecter'/>
        </form>
    )

}

export default LoginPage