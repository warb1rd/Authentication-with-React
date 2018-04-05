import React, { Component } from 'react';
import httpClient from '../httpClient.js';

class Login extends Component{
//state is an object with a key called fields which itself is an object with key value pairs
    state = {
        fields: {email:"", password: ""}
    }

    onChangeInput(event){                                                                                               //We don't want to prevent the default action of the form. This function just runs on change(typing)
        this.setState({
            fields: {
                ...this.state.fields, 
                [event.target.name]: event.target.value                                                                 //If event.target.name = email(line26 name), then the value will be what is typed.
            }
        })
    }

    onFormSubmit(event){
        event.preventDefault()
        httpClient.logIn(this.state.fields).then((user)=> {                                                                 //If login is successful, it passes the user info to the next .then (from httpClient.js, line 22)
            this.setState({
                fields: {email: "", password: ""}
            })
            if(user) {
                this.props.onLoginSuccess(user)
                this.props.history.push("/vip")
            }
        })
    }


    render() {
        const { email, password } = this.state.fields                                                                   //Because fields is an object, we destruction email and password with this.state.FIELDS
        return(
            <div className="Login">
                <h1>LOG IN</h1>
                <form onChange={this.onChangeInput.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <input name="email" type="text" placeholder="Email" value={email} />
                    <input name="password" type="password" placeholder="Password" value={password}/>
                    <button>LOG IN</button>
                </form>
            </div>
        )
    };
}

export default Login
//We use this instead of refs/innerrefs because it's easy to change forms and easier to get data from input fields
//when name is added in input, req.body will contain email and password with the input values.
//If anything about the form changes, the onChange form handler(onChangeInput) will run.