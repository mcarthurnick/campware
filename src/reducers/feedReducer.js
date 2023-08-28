const initialState = {
    campgrounds: [],
    loading: true, 
    selectedCampground: {},
    selectedCampsite: {},
    campsites: [], 
    filteredCampsites: []
}

const feedReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CAMPGROUND_FEED':
            let feedCampgrounds = {
                ...state,
                campgrounds : action.payload.campgrounds,
                campsites: action.payload.campsites,
                filteredCampsites: action.payload.campsites
            }
            return feedCampgrounds

        case 'FILTER_BY_AMENITIES':
            let filteredSiteByAmenity = {
                ...state,
                filteredCampsites: action.payload
            }

            return filteredSiteByAmenity

        case 'SET_CAMPSITE_FEED':

            let setCampsiteFeed = {
                ...state,
                campsites: action.payload
            }

            return setCampsiteFeed

        case 'SET_SELECTED_CAMPSITE':
                let setSelectedCampsite = {
                    ...state,
                    selectedCampsite: action.payload
                }

            return setSelectedCampsite

        case 'SET_CAMPSITE_FAVORITE':
            let campsiteFavorite = {
                ...state,

            }

            return campsiteFavorite

        default:
            return state
    }
}

export default feedReducer;
