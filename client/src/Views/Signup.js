import React, { Component } from 'react';
import httpClient from '../httpClient.js';

class Signup extends Component{
//state is an object with a key called fields which itself is an object with key value pairs
    state = {
        fields: {name: "", email:"", password: ""}
    }

    onChangeInput(event){                                                                                               
        this.setState({
            fields: {
                ...this.state.fields, 
                [event.target.name]: event.target.value                                                                 
            }
        })
    }

    onFormSubmit(event){
        event.preventDefault()
        httpClient.signUp(this.state.fields).then((user)=> {                                                                 
            this.setState({
                fields: {name: "", email: "", password: ""}
            })
            if(user) {
                this.props.onSignupSuccess(user)
                this.props.history.push("/vip")
            }
        })
    }


    render() {
        const { name, email, password } = this.state.fields                                                                   
        return(
            <div className="Signup">
                <h1>SIGN UP</h1>
                <form onChange={this.onChangeInput.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <input name="name" type="text" placeholder="name" value={name} />  
                    <input name="email" type="text" placeholder="Email" value={email} />
                    <input name="password" type="password" placeholder="Password" value={password}/>
                    <button>SIGN UP</button>
                </form>
            </div>
        )
    };
}

export default Signup
