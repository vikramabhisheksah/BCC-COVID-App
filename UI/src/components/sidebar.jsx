import React,{ Component }  from "react";
import { slide as Menu } from "react-burger-menu";

export default class SideBar extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            showDashboard: "menu-item hide_data",
            showAdministration: "menu-item hide_data",
            userRole: this.props.userRole,
            email :this.props.email,
        };
    }

    
    render(){
    return (
    <Menu {...this.props}>
        <a id="RequestForm" className="menu-item" href="/">Home</a>
        <a id="Dashbord" className="menu-item" href="/dashboard">Dashboard</a>
        {(this.state.userRole === 2 || this.state.userRole === 3) && (<a id="Admin" className="menu-item" href="/userMgmt">Administration</a>)}
    </Menu>
    );
}
};

