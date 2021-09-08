import React, { Component } from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import "./App.css";
// import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
// import RequestForm from "./Components/patientInfo";
// import Dashbord from "./Components/dashbord";
import Navbar from "../components/navbar";
// import Uploader from "./Components/fileUpload";
// import Admin from "../pages/createAdmin";
import Patient from "../pages/Patient";
// import configData from "./Components/config.json";
// import axios from "axios";


class App extends Component {
constructor(props){
  super(props);
    this.state = {
      userRole:1,
      isReady:true,
    };
}

// componentDidMount() {
//     //this.pullUserRole();
//     axios
//     .post(configData.SERVER_URL +"/api/getUserRole", {email:this.state.email})
//     .then((res) => {
//         console.log(res);
//         this.setState({
//             userRole:res.data[0].user_role
//         });
//         this.setState({isReady: true});
//     })
//     .catch((err) => {
//     console.log("User doesnot exist in the Role table. User role : Requestor");
//     this.setState({isReady: true})
//     });
// }


  render() {
    
    if (this.state.isReady){
      return (
              <div className="App">

                <div id="page-wrap">
                  <Router>
                    <Navbar name= {this.state.username} userRole={this.state.userRole}/>
                    <Route exact path="/" render={(props) => (<Patient/>)}/>
                    {/* <Route exact path="/dashboard" render={
                      (props) => (<Dashbord {...props} email={this.state.email} userRole={this.state.userRole}/>)}/>
                    <Route exact path="/upload" render={(props) => (<Uploader {...props} email={this.state.email} />)}/>
                    <Route exact path="/userMgmt" render={(props) => 
                      (this.state.userRole===2 || this.state.userRole===3) ? (<Admin {...props} />):(<RequestForm {...props} email={this.state.email} />)}/> */}
                  </Router>
                </div>
              </div>
            );
      }else{
        return (<p>Loading...</p>);
      }
  }
}

export default App;
