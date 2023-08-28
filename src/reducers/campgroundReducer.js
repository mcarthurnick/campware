const initialState = {
    campgrounds: [],
    loading: true, 
    selectedCampground: {},
    selectedCampsite: {}
}


const campgroundReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CAMPGROUNDS':
            let currCampgrounds = {
                ...state,
                campgrounds : action.payload,
                loading: false
            }
            return currCampgrounds
        
        case 'SET_DETAIL_CAMPGROUND':
            let campgroundDetail = {
                ...state,
                selectedCampground: action.payload,
                loading: false
            }
            return campgroundDetail
        
            case 'SET_CAMPSITES':
                let currCampsites = {
                    selectedCampground: {
                        campsites : action.payload,
                    loading: false
                    }
                }
                return currCampsites

        case 'SET_SELECTED_CAMPSITE': 
                let setSelectedCampsite = {
                    ...state,
                    selectedCampsite: action.payload
                }
                return setSelectedCampsite
        
        default:
            return state
        }
}

export default campgroundReducer;