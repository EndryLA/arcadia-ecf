import Header from './Header'
import ServiceCard from './ServiceCard'
import HeroImage from '@assets/hero-image.jpg'
import LionImage from '@assets/lion.jpg'
import MonkeyImage from '@assets/singe.jpeg'
import PerroquetImage from '@assets/perroquet.jpg'
import NewComment from './NewComment'
import { GetComments } from '../services/Comment'
import {Link} from 'react-router-dom'

function Hero() {
    return (
            <section className='hero-section'>
            <img src={HeroImage} alt="cerfs dans des bois"/>
            <div>
                <h1>Rencontrez les animaux sauvages de Brocéliande</h1>
                <p>Situé au cœur de la forêt enchantée de Brocéliande, le Zoo de Brocéliande vous invite à un voyage extraordinaire à la découverte de la faune sauvage.</p>
                <Link className='button' to='/habitats'>Je Découvre</Link>
            </div>
        </section>
    )
}

function Habitats() {
    return (
        
        <section className='habitats-section'>
            <div className='habitat'>
                <img src={LionImage}/>
                <div className='habitat-info'>
                    <h3>La jungle du roi</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quidem nulla est quos quibusdam natus vitae minus sit. Facere distinctio natus magni qui nisi! Optio eius veritatis voluptatibus reprehenderit maxime? Nesciunt deleniti facilis eaque maiores alias, doloribus nulla provident praesentium!</p>
                    <Link className='button' to='/habitats/6698ed9276e97699626e7b49'>Visiter</Link>
                </div>
             </div> 
             <div className='habitat habitat-reverse'>
                <img src={PerroquetImage}/>
                <div className='habitat-info'>
                    <h3>La cage aux oiseaux</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quidem nulla est quos quibusdam natus vitae minus sit. Facere distinctio natus magni qui nisi! Optio eius veritatis voluptatibus reprehenderit maxime? Nesciunt deleniti facilis eaque maiores alias, doloribus nulla provident praesentium!</p>
                    <Link className='button' to='/habitats/6698f5634cb36756423ba637'>Visiter</Link>
                </div>
             </div> 

             <div className='habitat'>
                <img src={MonkeyImage}/>
                <div className='habitat-info'>
                    <h3>Singes en folie</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quidem nulla est quos quibusdam natus vitae minus sit. Facere distinctio natus magni qui nisi! Optio eius veritatis voluptatibus reprehenderit maxime? Nesciunt deleniti facilis eaque maiores alias, doloribus nulla provident praesentium!</p>
                    <Link className='button' to='/habitats/6698f5d84cb36756423ba63f'>Visiter</Link>
                </div>
             </div>  
        </section>
        
    )
}

function HomePageServices() {
    return (
        <>
        <h2>Nos Services</h2>
        <div className='card-container'>
            <ServiceCard 
            title='Tour du zoo en petit train' 
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            />
            <ServiceCard 
            title='Lorem Ipsum' 
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            />
            <ServiceCard 
            title='Lorem Ipsum' 
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            />
        </div>
        </>
    )
}

function HomePage() {
    return (
        <>
        <Hero />
        <Habitats />
        <HomePageServices />
        <h2>Commentaires</h2>
        <GetComments/>
        <h2>Laissez un avis !</h2>
        <NewComment />
        </>
    )
}

export default HomePage