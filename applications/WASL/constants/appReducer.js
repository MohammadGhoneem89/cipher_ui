
const iState = {
    loading: false,
    tiles: []
};

export default function reducer(state=iState, action) {
    switch (action.type) {
        case "FETCH_TILES": {
            return {...state, loading: true}
        }
        case "FETCH_TILES_FULFILLED": {
            return {...state, loading: false, tiles: action.payload}
        }
    }

    return state
}