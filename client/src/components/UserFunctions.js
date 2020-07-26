import axios from 'axios'

/* Register function, will post the data accepted from user input into
    the database */
export const register = (newUser) => {
    return axios
        .post("https://orbital-trackr.herokuapp.com/api/users/" + "signup", { 
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            localStorage.setItem('username', response.data.username)
        })
        .catch(err => {

        })
}

/* Register function, will post the data accepted from user input into
    the database, and compare if they match */
export const login = (user) => {
    return axios
        .post("https://orbital-trackr.herokuapp.com/api/users/" + "signin", {
            usernameOrEmail: user.username,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {

        })
}