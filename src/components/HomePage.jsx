import Header from './Header'
import HeroImage from '@assets/hero-image.jpg'

function Hero() {
    return (
            <section className='hero-section'>
            <img src={HeroImage} alt="cerfs dans des bois"/>
            <div>
                <h1>Rencontrez les animaux sauvages de Brocéliande</h1>
                <p>Situé au cœur de la forêt enchantée de Brocéliande, le Zoo de Brocéliande vous invite à un voyage extraordinaire à la découverte de la faune sauvage.</p>
                <a className='button' href=''>Je Découvre</a>
            </div>
        </section>
    )
}

function HomePage() {
    return (
        <>
        <Header />
        <Hero />

        </>
    )
}

export default HomePage