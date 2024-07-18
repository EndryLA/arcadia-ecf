import {Link} from 'react-router-dom'

function AdminPage() {
    return(
        <>
            <div >
            <h1>Espace Administrateur</h1>
                <ul className='dashboard-navigation'>
                <li><Link to='/admin/services' className='button'>Voir Services</Link></li>
                <li><Link to='/admin/employes' className='button'>Voir Employés</Link></li>
                <li><Link to='/admin/habitats' className='button'>Voir Habitats</Link></li> 
                <li><Link to='/admin/animals' className='button'>Voir Animaux</Link></li> 
                <li><Link to='/admin/schedule' className='button'>Modifier Horaires</Link></li> 
                </ul>
            </div>
        </>
    )
} 

export default AdminPage