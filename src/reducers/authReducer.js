const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }

const authReducer = (state = initialState, action) => {
    switch(action.type) {
       
       
       
        default: 
            return state
        }
}

export default authReducer;