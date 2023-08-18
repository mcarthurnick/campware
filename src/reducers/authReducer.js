const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the token
    error: null,
    success: false, // for monitoring the registration process.
  }

const authReducer = (state = initialState, action) => {
    switch(action.type) {
       case 'SET_USER':
            let newUser = {
                ...state,
                userInfo: action.payload
            }
            return newUser  
            
        case 'LOGOUT_USER':
            return initialState
       
        default: 
            return state
        }
}

export default authReducer;