const initialState = {
    campsites: [],
    campgrounds: [],
    loading: true
}


const campsiteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CAMPSITES':
            console.log('action.payload --->', action.payload)
            let currCampsites = {
                campsites : action.payload,
                loading: false
            }
            return currCampsites
        default:
            return state
    }
}

export default campsiteReducer;