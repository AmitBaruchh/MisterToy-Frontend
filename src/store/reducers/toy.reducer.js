export const SET_TOYS = 'SET_TOYS'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, cmd = {}) {
    let toys
    switch (cmd.type) {
        // Toys
        case SET_TOYS:
            return { ...state, toys: cmd.toys, lastToys: state.toys }

        default:
            return state
    }
}
