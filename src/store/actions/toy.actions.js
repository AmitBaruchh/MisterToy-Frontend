import { toyService } from '../../services/toy.service.js'
import {
    SET_TOYS,
    SET_IS_LOADING,
    UPDATE_TOY,
    ADD_TOY,
    REMOVE_TOY,
    TOY_UNDO,
    SET_FILTER_BY,
} from '../reducers/toy.reducer.js'

import { store } from '../store.js'

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService
        .query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys')
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService
        .save(toy)
        .then(savedToy => {
            console.log('savedToy:', savedToy)
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService
        .remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService
        .remove(toyId)
        .then(() => {})
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
