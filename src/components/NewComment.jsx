import { useState } from 'react';
import axios from 'axios';

function NewComment() {
    const [pseudo, setPseudo] = useState('');
    const [comment, setComment] = useState('');
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_URL_BASE + '/api/comments/new', {
                pseudo: pseudo,
                comment: comment,
                isValid:false
            });
            console.log('Comment posted:', response.data);
            alert('Votre commentaire a bien été envoyé !')

            // Clear form fields after successful submission
            setPseudo('');
            setComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='pseudo'>Pseudo</label>
                <input
                    type='text'
                    onChange={e => setPseudo(e.target.value)}
                    name='pseudo'
                    value={pseudo}
                    required
                />
            </div>
            <div>
                <label htmlFor='comment'>Commentaire</label>
                <textarea
                    type='text'
                    onChange={e => setComment(e.target.value)}
                    placeholder='Votre commentaire...'
                    name='comment'
                    value={comment}
                    required
                ></textarea>
            </div>
            <input type='submit' value='Envoyer' className='button'/>
        </form>
    );
}

export default NewComment;
