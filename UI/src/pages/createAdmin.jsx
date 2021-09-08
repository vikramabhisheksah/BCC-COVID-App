import React, { Component } from "react";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import filterFactory, {
    textFilter,
  } from "react-bootstrap-table2-filter";
  import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import Select from "react-select";
// import configData from "../Components/config.json";

export class AdminPane extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roleSelect:"",
            userEmail:"",
            showUserAdmin:"hide_data",
            showViewUsers:"hide_data",
            actionSelect:"",
            filesData:[],
        };
    }

    onChangeAction=(e) =>{ 
        console.log(e.value);
        if(e.value ===1){
            this.setState({
                showUserAdmin:"",
                showViewUsers:"hide_data",
                actionSelect:e.value,
            });
        }else{
            this.setState({
                showUserAdmin:"hide_data",
                showViewUsers:"",
                actionSelect:e.value,
            });
        }
    };

    onChangeRoleType=(e) =>{ 
        console.log(e.value);
        this.setState({
            roleSelect:e.value,
        });
        axios.post(configData.SERVER_URL + "/api/userlist",{role:(e.value)})
            .then((response) => {
            this.setState({
              filesData: response.data,
            });
            console.log(response.data)
        });
    }

    onchangeUserEmail=(e) =>{ 
        console.log(e.target.value);
        this.setState({
            userEmail:e.target.value,
        });
    };
    
    onSubmit=(e)=>{
        if (this.userEmail!=="" && this.roleSelect!==""){
            var req= {role: this.state.roleSelect, user : this.state.userEmail};
            console.log(req);
            axios
                .post(configData.SERVER_URL +"/api/updateRole", req)
                .then((res) => {
                    console.log(res);
                    toast.success("Role updated successfully");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Error in updating Role");
                });
                
                setTimeout(()=>window.location.reload(),2000);
        }        
    }

    render(){
        const actionSelect = [
            { label: "User Administration", value: 1 },
            { label: "View Users", value: 2 },
          ];
        const roleSelect = [
            { label: "Requestor", value: 1 },
            { label: "Admin", value: 2 },
            { label: "Admin & Approver", value: 3 },
            { label: "Approver", value: 4 },
          ];
        const elevatedRoles = [

            { label: "Admin", value: 2 },
            { label: "Admin & Approver", value: 3 },
            { label: "Approver", value: 4 },
        ];
        const columns = [
            {
                dataField: "user_email",
                text: "User Email ",
                filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
            },
        ]

    return (
        <div className="admin-panel">
            <div className="select-action">
                <label className="fresh-label" for="fresh-request_zone">
                    <span className="fresh-title">
                        <span className="reminder">* </span> Select Action&nbsp;
                    </span>
                </label>
                <Select options={actionSelect} onChange={this.onChangeAction}/>
            </div>

            <div className = {this.state.showUserAdmin}>
                
                <div className="fresh-form">
                    <h4>User Administration</h4>
                    <h6 className="reminder">* Mandatory fields</h6>
                    <div className="fresh-field-wrapper">
                        <label className="fresh-label" for="fresh-request_zone">
                            <span className="fresh-title">
                                <span className="reminder">* </span> Select Role&nbsp;
                            </span>
                        </label>
                        <Select options={roleSelect} onChange={this.onChangeRoleType}/>
                    </div>

                    <div className="fresh-field-wrapper">
                        <label className="fresh-label" for="fresh-additional_notification_to">
                            <span className="fresh-title">
                                <span className="reminder">*</span>Enter User Email&nbsp;
                            </span>
                        </label>

                        <input
                        className="fresh-input css-yk16xz-control"
                        onChange ={this.onchangeUserEmail}
                        type="text"
                        value={this.state.userEmail}
                        ></input>
                    </div>

                    <div className="fresh-field-wrapper">
                        <button
                        className="fresh-button cust_btn-cls"
                        onClick={this.onSubmit}
                        >
                        Submit&nbsp;
                        </button>
                    </div>
                </div>
            </div>
            <div className={this.state.showViewUsers}>
                
                <div className="fresh-field-wrapper_select_role">
                    <h4>View Users</h4>
                    <h6 className="reminder">* Mandatory fields</h6>
                    <div className="fresh-field-wrapper">
                        <label className="fresh-label" for="fresh-request_zone">
                            <span className="fresh-title">
                                <span className="reminder">* </span> Select Role&nbsp;
                            </span>
                        </label>
                        <Select options={elevatedRoles} onChange={this.onChangeRoleType}/>
                        <div className = {this.state.roleSelect?"":"hide_data"}>
                            <BootstrapTable
                            bootstrap4
                            keyField="user_email"
                            data={this.state.filesData}
                            columns={columns}
                            filter={filterFactory()}
                            pagination={ paginationFactory() }
                            headerClasses="cust_header-class"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={3000}></ToastContainer>
        </div>
    
        );
    }

}
export default AdminPane;