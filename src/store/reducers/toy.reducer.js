export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, cmd = {}) {
    let toys
    switch (cmd.type) {
        // Toys
        case SET_TOYS:
            return { ...state, toys: cmd.toys, lastToys: state.toys }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy],
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => (toy._id === cmd.toy._id ? cmd.toy : toy)),
            }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys,
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys],
            }
        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default:
            return state
    }
}
