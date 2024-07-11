import axios from 'axios'
import ConfirmationModal from './ConfirmationModal'
import {useState} from 'react'

export function DeleteButton({entity,id}) {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
        setOpen(true)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const handleClick = () => {
        axios.delete(`http://localhost:3000/api/${entity}/${id}`)
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

export function UpdateButton({entity,id}) {
    return (
        <a href={`/dashboard/${entity}/update/${id}`} className='update-button'>modifier</a>
    )
}

export default DeleteButton