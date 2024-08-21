import { useState } from "react"
import axios from "axios"

export function Formulario() {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [publication, setPublication] = useState('')
    const [messgae, setMessgae] = useState('')
    const [modal, setModal] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()

        const newBook = { name, author, publication }

        axios.post('http://localhost:3000/data', newBook)
            .then(response => {
                if (name == null || author == null || publication == null) {
                    alert('Todos los campos son obligatorios.')
                } else {
                    console.log(response.data)
                    setMessgae('Libro agregado con éxito!')
                    setName(name)
                    setAuthor(author)
                    setPublication(publication)
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setModal(!modal)
                } else {
                    setMessgae(err.message)
                    console.error(err)
                }
            })
    }

    return (
        <div>
            <div className="form-container">
                <h1>Formulario</h1>
                <form className="form" onSubmit={handleClick}>
                    <div className="form-group">
                        <label >Nombre</label>
                        <input type="text" id="email" name="email" required value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label >Autor</label>
                        <input type="text" id="email" name="email" required value={author}
                            onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label >Publicacion</label>
                        <input type="text" id="email" name="email" required value={publication}
                            onChange={(e) => setPublication(e.target.value)} />
                    </div>
                    <button className="form-submit-btn" type="submit">Submit</button>
                </form>
            </div>
            {
                modal ? (
                    /* From Uiverse.io by vinodjangid07 */
                    <div className="card">
                        <div className="card-content">
                            <p className="card-heading">Delete file?</p>
                            <p className="card-description">Lorem ipsum dolor sit amet, consectetur adi</p>
                        </div>
                        <div className="card-button-wrapper">
                            <button className="card-button secondary" onClick={() =>{
                                setModal(!modal)
                            }}>Cancel</button>
                        </div>
                        <button className="exit-button">
                            <svg height="20px" viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                ) : (console.log("epaaaaaaaaa"))
            }
            {messgae && <p>{messgae}</p>}
        </div>
    )
}
