import React, { Component } from "react";
import logo from "../bcc_logo.png";
import "../style.css";
import Navigation from "./Navigation";

export class Navbar extends Component {
  
  render() {
    return (
      <React.Fragment>
      <nav className="navbar navbar-custom">
        <div className="logo">
          <img src={logo} alt="Brand Logo" width="200" padding="10px"></img>
        </div>
        <div className = "userprofile">
          <span className="username">{this.props.name} </span>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-person-circle"
            fill="#B11F24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            />
          </svg>
        </div>
      </nav>
      <Navigation userRole={this.props.userRole}/>
      </React.Fragment>
    );
  }
}

export default Navbar;
