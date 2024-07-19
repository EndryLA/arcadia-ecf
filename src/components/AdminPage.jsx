import {Link, useNavigate} from 'react-router-dom'


function AdminPage() {
    const userRole = localStorage.getItem('userRole')
    const navigate = useNavigate()
    if (userRole !== 'admin') {
        navigate('/')
    } else {

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
                    <li><Link to='/admin/veterinary-reports' className='button'>Voir Rapports Vétérinaires</Link></li> 
                    </ul>
                </div>
            </>
        )
    }
} 

export default AdminPage