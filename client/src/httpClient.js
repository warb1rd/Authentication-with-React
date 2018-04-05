import axios from 'axios';
import jwtDecode from 'jwt-decode';                                                 //It is given a token and decodes it to current user payload

const httpClient = axios.create();

httpClient.getToken = function() {
    return localStorage.getItem("token")                                            //If we saved an item called token in local storage, this method will look for "token"
}

httpClient.setToken = function(token){
    localStorage.setItem("token", token)
    return token
}

httpClient.getCurrentUser = function() {
    const token = this.getToken                                                     //Got it from line 6 function
    if(token) return jwtDecode(token)
    return null
}

httpClient.logIn = function(fields) {
    return this({method: "post", url: "/api/users/login", data:fields})             
    .then((serverResponse) => {
        console.log(serverResponse.data)                                            //If right creds are entered in input 
        const { token } = serverResponse.data
        if(token) {                                                                 //Every request that is sent will set a header called token with value of whatever we get from serverResponse by default
            this.defaults.headers.common.token = this.setToken(token)               //"this" is httpClient - specific to axios - we can go into httpClients and start setting defaults
            return jwtDecode(token)                                                 //jwtDecode decodes the payload of correct token and returns the current user. If login is successful, it passes the user info to the next .then (as seen in login.js, line 21)
        } else {
            return false
        }
    })
}

//identical to the login function
httpClient.signUp = function(userInfo) {
    return this({method: "post", url: "/api/users", data:userInfo})             
    .then((serverResponse) => {
        console.log(serverResponse.data)                                            
        const { token } = serverResponse.data
        if(token) {                                                                 
            this.defaults.headers.common.token = this.setToken(token)               
            return jwtDecode(token)                                                 
        } else {
            return false
        }
    })
}

httpClient.logOut = function(){
    //clear the token
    localStorage.removeItem("token")
    //tell axios to stop using the token in requests
    delete this.defaults.headers.common.token
    return true
}

export default httpClient

//These methods return promises that allows us to chain a bunch of .thens
//this.setToken saves token in local storage and spits the token back when called.