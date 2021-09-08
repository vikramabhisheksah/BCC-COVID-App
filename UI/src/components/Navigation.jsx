import { Navbar, Nav } from 'react-bootstrap';
import React,{ Component }  from "react";
import "../style.css";


export default class Navigation extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            userRole: this.props.userRole,
        };
    }

    render(){
    return(
        <Navbar collapseOnSelect expand = 'md' className= "color-nav">
            <Navbar.Toggle aria-controls = 'rsponsive-navbar-nav'/>
            <Navbar.Collapse id= 'responsive-navbar-nav'>
                <Nav className='color-font'>
                    <Nav.Link href='/'><h4 className="linkText">Home</h4></Nav.Link>
                    <Nav.Link href='/dashboard'><h4 className="linkText">Dashboard</h4></Nav.Link>
                    {(this.state.userRole === 2 || this.state.userRole === 3) &&
                     <Nav.Link href='/userMgmt'><h4 className="linkText">Administration</h4></Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
    }
}

    