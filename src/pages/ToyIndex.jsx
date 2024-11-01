import { useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys().catch(err => {
            console.log('Cannot load toys:', err)
        })
    }, [filterBy])

    function onRemoveToy(toyId) {
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

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className="toy-index">
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className="add-btn" onClick={onAddToy}>
                    Add Random Toy 🧸
                </button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading ? <ToyList toys={toys} onRemoveToy={onRemoveToy} /> : <div>Loading...</div>}
                <hr />
            </main>
        </section>
    )
}
