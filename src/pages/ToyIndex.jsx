import { useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import { Link } from 'react-router-dom'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys().catch(err => {
            console.log('Cannot load toys:', err)
        })
    }, [])

    function onRemoveToy(toyId) {
        console.log('toyId:', toyId)

        removeToyOptimistic(toyId)
            .then(() => {
                console.log('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then(savedToy => {
                console.log('Toy Added', savedToy._id)
            })
            .catch(err => {
                console.log('Cannot add toy)', err)
            })
    }

    return (
        <section className="toy-index">
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className="add-btn" onClick={onAddToy}>
                    Add Random Toy 🧸
                </button>
                {!isLoading ? <ToyList toys={toys} onRemoveToy={onRemoveToy} /> : <div>Loading...</div>}
                <hr />
            </main>
        </section>
    )
}
