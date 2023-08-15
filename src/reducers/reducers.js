import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer'
import campgroundReducer from "../reducers/campgroundReducer";
import feedReducer from "../reducers/feedReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    campground: campgroundReducer,
    feed: feedReducer
})

export default rootReducer;