import { keyBy } from 'lodash'

// Action types
export const ADD_ARTISTS_TYPE = 'ADD_ARTISTS'

// Initial state
const initialState = {
  artists: {},
}

//  Reducer
const artistsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_ARTISTS_TYPE:
      return {
        ...state,
        artists: keyBy(action.payload.artists, 'nombre'),
      }

    default:
      return state
  }
}

export default artistsReducer
