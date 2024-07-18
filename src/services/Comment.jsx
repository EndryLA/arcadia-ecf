import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import {UpdateButton, DeleteButton, ToggleButton} from '../components/CrudButtons'

export function CommentsCrud(){
    const [comments,setComments] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/comments')
        .then((response) => {
          setComments(response.data)
        })
        .catch(error => console.log(error))
    },[])

    return(
        <div className='crud-container'>

        <table>
            <thead>
                <tr>
                    <th>Pseudo</th>
                    <th>Commentaire</th>
                </tr>
            </thead>
            <tbody>
                {comments.map(comment => (
                    <tr key={comment._id}>
                        <td>{comment.pseudo}</td>
                        <td>{comment.comment}</td>
                        <td>{<ToggleButton id={comment._id} isValid={comment.isValid}/>}</td>
                        <td>{<DeleteButton entity='comments' id={comment._id}/>}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        </div>
    )
}


export function GetComments(){
    const [comments, setComments] = useState([])

    useEffect( () => {
        axios.get('http://localhost:3000/api/comments')
        .then(response => setComments(response.data))
        .catch(error => console.log(error))
    },[])

    return(
        <div className='comments-container'>
            {comments.map(comment => (
                comment.isValid ? 
                <div className='comment' key={comment._id}>
                    <h3>{comment.pseudo}</h3>
                    <p>{comment.comment}</p>
                </div> 
                : null
            ))}
        </div>
    )
}

export default CommentsCrud