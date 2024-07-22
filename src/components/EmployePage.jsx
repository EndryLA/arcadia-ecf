import {Link} from 'react-router-dom'

function EmployePage() {
    return(
        <>
            <div >
            <h1>Espace employé</h1>
                <ul className='dashboard-navigation'>
                <li><Link to='/employe/comments' className='button'>Commentaires</Link></li>
                <li><Link to='/employe/feed' className='button'>Nourrir animal</Link></li>
                <li><Link to='/employe/services' className='button'>Modifier Services</Link></li> 
                </ul>
            </div>
        </>
    )
} 

export default EmployePage