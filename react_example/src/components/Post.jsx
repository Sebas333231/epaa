import { useState } from "react"
import axios from "axios"

export function Formulario() {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [publication, setPublication] = useState('')
    const [messgae, setMessgae] = useState('')

    const handleClick = (e) => {
        e.preventDefault()

        const newBook = { name, author, publication }

        axios.post('http://localhost:3000/data', newBook)
            .then(response => {
                console.log(response.data)
                setMessgae('Libro agregado con éxito!')
                setName(name)
                setAuthor(author)
                setPublication(publication)
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    alert('Book already exists')
                } else {
                    setMessgae(err.message)
                    console.error(err)
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Publication:</label>
                    <input
                        type="text"
                        value={publication}
                        onChange={(e) => setPublication(e.target.value)}
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
            {messgae && <p>{messgae}</p>}
        </div>
    )
}