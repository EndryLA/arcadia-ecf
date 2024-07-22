function ConfirmationModal({confirmFunction,cancelFunction, isOpen, message}){
    
    const confirmDelete = () => {
        confirmFunction()
    }
    const cancelDelete = () => {
        cancelFunction()
    }



    return(
        <dialog open = {isOpen ? 'open' : ''}>
            <p>Êtes-vous sur de vouloir supprimer cet élément ?</p>
            <button onClick={confirmDelete}>Oui</button>
            <button onClickCapture={cancelDelete}>Non</button>
        </dialog>
    )

}

export default ConfirmationModal