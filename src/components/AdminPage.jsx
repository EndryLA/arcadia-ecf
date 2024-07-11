import ServiceCrud from "@services/Service"
import {useState} from 'react'

function AdminPage() {
    const [active, setActive] = useState('services')

    const handleClick = (menu) => {
        setActive(menu)
    }
    
    return(
        <>
        <h2>Panneau de configuration</h2>
        <nav className="admin-menu">
            <ul>
                <li className={active === 'services' ? 'active' : ''} onClick={() => handleClick('services')}>Services</li>
                <li className={active === 'habitats' ? 'active' : ''} onClick={() => handleClick('habitats')}>Habitats</li>
                <li className={active === 'animals' ? 'active' : ''} onClick={() => handleClick('animals')}>Animaux</li>
                <li  className={active === 'employes' ? 'active' : ''}onClick={() => handleClick('employes')}>Employés</li>
                <li  className={active === 'schedule' ? 'active' : ''}onClick={() => handleClick('schedule')}>Horaires</li>
            </ul>
        </nav>
       <div>
            {active === 'services' && <ServiceCrud/> }
            {active === 'habitats' && <div>Page habitats</div> }
            {active === 'animals' && <div>Page animaux</div> }
            {active === 'employes' && <div>Page employés</div> }
            {active === 'schedule' && <div>Page de configuration d'horaires</div> }
       </div>
       </>
    )
}
export default AdminPage