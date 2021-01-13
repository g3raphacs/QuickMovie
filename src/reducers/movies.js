import { ADD_MOVIE, REMOVE_MOVIE, GET_MOVIES, GET_NUMBER } from '../actions';


const initialState = {
    movies: [],
    number: 0
}

export const movieReducer = (state = initialState , action) => {

    switch (action.type){
        case ADD_MOVIE:
            console.log('ADD_MOVIE' , action.payload)
            return {
                movies: action.payload,
                number: action.payload.length
            }
        case REMOVE_MOVIE:
            console.log('REMOVE_MOVIE' , action.payload)
            return {
                movies: action.payload,
                number: state.number -1
            }
        case GET_MOVIES:
            console.log('GET_MOVIES' , action.payload)
            return {
                ...state,
                movies: action.payload
            }
        case GET_NUMBER:
            console.log('GET_NUMBER' , action.payload)
            return {
                ...state,
                number: action.payload
            }
        default:
            return state;
    }
}