import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'

const toyLabels = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'select-multiple') {
            value = Array.from(target.selectedOptions, option => option.value || [])
        }
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="price">Max price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <select id="inStock" name="inStock" value={filterByToEdit.inStock || ''} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                <select multiple name="labels" value={filterByToEdit.labels || []} onChange={handleChange}>
                    <option value="">Labels</option>
                    {toyLabels.map(label => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </form>
        </section>
    )
}
