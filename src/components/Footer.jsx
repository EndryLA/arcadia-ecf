import { useState, useEffect } from 'react';
import axios from 'axios';

export function Footer() {
    const daysOfTheWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const [schedule, setSchedule] = useState({});
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const getSchedule = async (day) => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        try {
            const response = await axios.get(API_URL_BASE + `/api/schedule/${day}`);
            return response.data.schedule.content;
        } catch (error) {
            console.error(`Erreur lors du fetch de ${day}:`, error);
            return '...';
        }
    };

    useEffect(() => {
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
        
        const fetchSchedules = async () => {
            const fetchedSchedules = {};
            for (const day of daysOfTheWeek) {
                const scheduleContent = await getSchedule(day);
                fetchedSchedules[day] = scheduleContent;
            }
            setSchedule(fetchedSchedules);
        };

        fetchSchedules();
    }, []);

    return (
        <footer>
            <div className='footer-content'>
                
                <div>
                    <h4>Horaires du  Zoo</h4>
                    <ul>
                        {daysOfTheWeek.map(day => (
                            <li key={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}: {schedule[day] || 'Chargement...'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className='copyright-notice'>copyright © 2024 Endry LUNDY.</p>
        </footer>
    );
}

export default Footer