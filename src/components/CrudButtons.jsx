import axios from 'axios'
import ConfirmationModal from './ConfirmationModal'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export function DeleteButton({entity,id}) {
    const [open, setOpen] = useState(false)
    const token = localStorage.getItem('authToken')
    const config = {headers: {authorization:`Bearer ${token}`}}

    const handleConfirm = () => {
        setOpen(true)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const handleClick = () => {
        axios.delete(`http://localhost:3000/api/${entity}/${id}`,config)
        .then(() => {
            console.log(`deleted ${entity} with id of ${id}`)
            window.location.reload()
        })
        .catch(error => console.error(error))
    }

    return (
        <>
        <button onClick = {handleConfirm} className='delete-button'> Supprimer </button>
        {open && <ConfirmationModal isOpen = {open} confirmFunction={handleClick} cancelFunction={handleCancel}/>}
        </>
    )
}

export function UpdateButton({entity,id,user,content}) {
    return (
        <Link to={`/${user}/${entity}/update/${id}`} className='update-button'>{content}</Link>
    )
}

/* THIS IS USED FOR MY COMMENTS CRUD */
export function ToggleButton({ id, isValid }) {
    const [active, setActive] = useState(isValid);
    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            authorization:`Bearer ${token}`
        }
    }
    const handleClick = () => {
        setActive(!active);
    }

    useEffect(() => {
        axios.put(`http://localhost:3000/api/comments/${id}`,{isValid: active},config)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },[active])

    return (
        <div>
            <label className="switch">
                <input type="checkbox" onClick={handleClick} checked={active} />
                <span className="slider round"></span>
            </label>
        </div>
    );
}


export default DeleteButton