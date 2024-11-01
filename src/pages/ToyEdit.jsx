import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = toyService.getLabels()

    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService
            .getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleLabelToggle(label) {
        setToyToEdit(prevToy => {
            const labels = prevToy.labels.includes(label)
                ? prevToy.labels.filter(l => l !== label)
                : [...prevToy.labels, label]
            return { ...prevToy, labels }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log('Cannot save toy', err)
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name : </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price : </label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                    required
                />

                <label>Labels :</label>
                <div className="labels-checkboxes">
                    {labels.map(label => (
                        <div key={label}>
                            <input
                                type="checkbox"
                                id={label}
                                checked={toyToEdit.labels.includes(label)}
                                onChange={() => handleLabelToggle(label)}
                            />
                            <label htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>

                <div className="add-toy-btns">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}
