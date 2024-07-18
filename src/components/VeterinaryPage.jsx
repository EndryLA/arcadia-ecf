import {Link} from 'react-router-dom'

function VeterinaryPage() {
    return(
        <>
            <div >
            <h1>Espace Vétérinaire</h1>
                <ul className='dashboard-navigation'>
                <li><Link to='/veterinary/new-report' className='button'>Créer Rapport Vétérinaire</Link></li>
                <li><Link to='/veterinary/habitats/comment' className='button'>Commenter Habitat</Link></li>
                <li><Link to='/employe/services' className='button'>Modifier Services</Link></li> 
                </ul>
            </div>
        </>
    )
} 

export default VeterinaryPage