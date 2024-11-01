import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService
            .getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>
                Toy name: <span>{toy.name}</span>
            </h1>
            <h1>
                Toy price: <span>${toy.price}</span>
            </h1>
            <h1>
                Labels: <span>{toy.labels.join(' ,')}</span>
            </h1>
            <h1>{toy.inStock ? 'In stock' : 'Not in stock'}</h1>
            <button>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                <Link to={`/toy`}>Back</Link>
            </button>
        </section>
    )
}
