import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export function UpdateSchedule() {
    const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const [schedules, setSchedules] = useState({})
    const navigate = useNavigate()
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

    const token = localStorage.getItem('authToken');
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    };

    useEffect(() => {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        const fetchSchedules = async () => {
            try {
                const fetchedSchedules = {};
                for (let day of daysOfWeek) {
                    const response = await axios.get(API_URL_BASE + `/api/schedule/${day}`,);
                    fetchedSchedules[day] = response.data.schedule.content;
                }
                setSchedules(fetchedSchedules);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, []);



    const handleChange = (day, content) => {
        setSchedules((prevSchedules) => ({
            ...prevSchedules,
            [day]: content,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (let day of daysOfWeek) {
                console.log(day, schedules[day])
                await axios.put(API_URL_BASE + `/api/schedule/${day}`, { content: schedules[day] }, config)
                .then(response => console.log(response))
            }
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Error updating schedules:', error);
            alert('Error updating schedules. Please try again later.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Modifier Horaires</h1>
                {daysOfWeek.map((day) => (
                    <div key={day}>
                        <label htmlFor={day}>{day}</label>
                        <input
                            type="text"
                            name={day}
                            defaultValue={schedules[day]}
                            onChange={(e) => handleChange(day,e.target.value)}
                        />
                    </div>
                ))}
                <div className="buttons-container">
                    <button type="submit" className="button">Enregistrer</button>
                    <Link to="/admin/dashboard" className="button cancel-button">Retour</Link>
                </div>
            </form>
        </div>
    );
}


export function CreateSchedule() {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const [schedules, setSchedules] = useState(() =>
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: '' }), {})
    );
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const token = localStorage.getItem('authToken');
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    };

    const handleChange = (day, content) => {
        
        setSchedules((prevSchedules) => ({
            ...prevSchedules,
            [day]: content,
        }));
    };

    const handleSubmit = async (e) => {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

        e.preventDefault();
        try {
            for (let day of daysOfWeek) {
                if (schedules[day].trim() !== '') { // Only send non-empty schedules
                    await axios.post(API_URL_BASE + `/api/schedule`, { day, content: schedules[day] }, config);
                }
            }
            alert('Schedules created successfully!');
        } catch (error) {
            console.error('Error creating schedules:', error);
            alert('Error creating schedules. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Create Schedules</h2>
            <form onSubmit={handleSubmit}>
                {daysOfWeek.map((day) => (
                    <div key={day}>
                        <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                        <input
                            type="text"
                            id={day}
                            name={day}
                            value={schedules[day] || ''}
                            onChange={(e) => handleChange(day, e.target.value)}
                        />
                    </div>
                ))}
                <div className="buttons-container">
                    <button type="submit" className="button">Save</button>
                    <Link to="/admin/dashboard" className="button cancel-button">Back</Link>
                </div>
            </form>
        </div>
    );
}


export default UpdateSchedule