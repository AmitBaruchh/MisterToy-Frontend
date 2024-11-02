import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'

const toyLabels = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit, filterByToEdit.sortBy])

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
        if (field === 'desc') {
            value = target.checked ? -1 : 1
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                sortBy: { ...prevFilter.sortBy, desc: value },
            }))
        } else if (field === 'type') {
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                sortBy: { ...prevFilter.sortBy, type: value },
            }))
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter and Sort</h2>
            <form onSubmit={onSubmitFilter} className="filter-form">
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

                <label htmlFor="labels">Labels:</label>
                <select multiple name="labels" value={filterByToEdit.labels || []} onChange={handleChange}>
                    <option value="all">Labels</option>
                    {toyLabels.map(label => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>

                <select name="type" value={filterByToEdit.sortBy.type} onChange={handleChange}>
                    <option value="">Sort by</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Date</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="desc"
                        checked={filterByToEdit.sortBy.desc < 0}
                        onChange={handleChange}
                    />
                    Descending
                </label>
            </form>
        </section>
    )
}
