const initialState = {
    campgrounds: [],
    loading: true, 
    selectedCampground: {}
}

const feedReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CAMPGROUND_FEED':
            let feedCampgrounds = {
                ...state,
                campgrounds : action.payload, 
                loading: false
            }
            return feedCampgrounds

        default:
            return state
    }
}

export default feedReducer;
