import React, { Component } from 'react';
import { Link, Switch , Route, Redirect } from 'react-router-dom';
import Home from './Views/Home.js';
import Login from './Views/Login.js';
import Signup from './Views/Signup.js';
import httpClient from './httpClient.js'

class App extends Component {

  state = {
    currentUser: httpClient.getCurrentUser()                                          
  }

  onLoginSuccess(user){
      this.setState({
        currentUser: user                                                                            //user = current user
      })
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">
        {currentUser? (<div>{currentUser.name}</div>) : null}                                       {/*ternary operator instead of if statement. If its the current user, display name.*/}
        <div>
          <Link to="/">HOME</Link>
          <Link to="/vip">VIP</Link>                                                                {/*This will be a protected route*/}
          <Link to="/login">LOGIN</Link>
          <Link to="/signup">SIGN UP</Link>
          <Link to="/logout">LOGOUT</Link>       
        </div>

        <Switch>

          <Route path="/login" render={(routeProps) => {                                    
            return <Login {...routeProps} onLoginSuccess={this.onLoginSuccess.bind(this)}/>         
          }}/>

          <Route path="/signup" render={(routeProps) => {                                    
            return <Signup {...routeProps} onSignupSuccess={this.onLoginSuccess.bind(this)}/>        //Do the same thing as loginsuccess                                //
          }}/>

          <Route path="/logout" render={(routeProps) => {
            httpClient.logOut()
            setTimeout(() => { this.setState({currentUser: null})})                                  //Clears current user and redirects                        
            return <Redirect to= "/login" />
          }} />

          <Route path="/vip" render={(routeProps) => {
            return currentUser? <h1>VIP, welcome!</h1> : <Redirect to="/login"/>
          }}/>
          
          <Route path="/" component={Home}/>
          
        </Switch>
      </div>
        
    );
  }
}

export default App;
// {/*We use render instead of component to add custom props*/}