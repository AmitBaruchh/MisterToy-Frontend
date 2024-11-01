import { toyService } from '../../services/toy.service'
import { SET_TOYS, SET_IS_LOADING } from '../reducers/toy.reducer'

import { store } from '../store'

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
