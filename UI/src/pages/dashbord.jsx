import React, { Component } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import MultipleValueTextInput from 'react-multivalue-text-input';


import "../style.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  // selectFilter,
} from "react-bootstrap-table2-filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-multivalue-text-input/build/styles/styles.scss"
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import axios from "axios";
import cellEditFactory from 'react-bootstrap-table2-editor';
import configData from "./config.json";
import ClipLoader from "react-spinners/ClipLoader";

export class Dashbord extends Component {
  constructor(props) {
    super(props);

    this.onChangeActionType = this.onChangeActionType.bind(this);
    this.onchangeRejectionReason = this.onchangeRejectionReason.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);



    this.state = {
      filesData: [],
      nonSelected:[],
      selected: [],
      isHidden: true,
      new_status:"",
      show_rejection_reason:"fresh-field-wrapper hide_data",
      rejection_reason:"",
      approver:this.props.email,
      userRole: this.props.userRole,
      loading:false
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  pullData(){
    this.setState({loading:true});
    axios
    .get(configData.SERVER_URL + "/api/getall", {
      headers: {
        'userRole': this.state.userRole,
        'requesterEmail':this.state.approver,
      }})
      .then((response) => {
      this.setState({
        filesData: response.data,
      })
      this.handleUnSelect(response.data);
      })
      .catch(error => {
        console.error('There was an error in fetching data !', error);
      })
      .finally(()=>{
        this.setState({
          loading:false // stop spinner (in response/error)
        });
      })
      
  }

  componentDidMount() {
    console.log(this.state.userRole);
    this.pullData();
  }

  onChangeActionType (e){
    console.log("dropdown value"+e.value);
    
    this.setState({
      new_status: e.value,
    });
    if (e.value === 3){
      console.log("unhide"+this.state.new_status);
      this.setState({
        show_rejection_reason:"fresh-field-wrapper",
      });
    }else{
      this.setState({
        show_rejection_reason:"fresh-field-wrapper hide_data",
      });
    }
  };

  onchangeRejectionReason(e){
    console.log(e.target.value);
    this.setState({
      rejection_reason: e.target.value,
    });
  };

  onClickSubmit(){
    if ((this.state.new_status === "")||(this.state.new_status ===3 && this.state.rejection_reason === "")){
      toast.error("Please populate the mandatory fields")
    }else{
      this.updateRequestStatus()
    }
                          
  };

  updateRequestStatus = () => {
    console.log(this.state.selected);
    if(this.state.new_status !== ""){
      console.log(this.state.approver);
      axios
        .post(configData.SERVER_URL +"/api/update", {selected : this.state.selected, new_status: this.state.new_status, rejection_reason:this.state.rejection_reason, approver:this.state.approver})
        .then((res) => {
          // then print response status
          console.log(res);
          if(res.data==="Please select requests to process.")
          {toast.warning(res.data);}
          else{toast.success("Request status modified successfully.");}
          
          this.pullData();
          this.setState(() => ({
            selected: [],
            new_status: "",
          }));
          setTimeout(()=>window.location.reload(),1000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unknown Error in Modifying status");
          setTimeout(()=>window.location.reload(),1000);
        });
    }else{
      toast.error("Select the New Status from Dropdown");
    }
  };

  handleUnSelect = (data) => {
    var ids = data.map(r => {
      if(r.request_status==="Completed" ||r.request_status==="WIP" )return r.Request_id; 
      else return ""});
    
    console.log(ids);
    this.setState(() => ({
      nonSelected: ids,
    }));
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.Request_id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.Request_id),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = this.state.filesData.map((r) => r.Request_id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };

  addItemMultipleSO=(item, allItems) =>{
    console.log(allItems);
    axios
    .post(configData.SERVER_URL +"/api/filterMultipleSO",{SO: allItems}, {
      headers: {
        'userRole': this.state.userRole,
        'requesterEmail':this.state.approver,
      }})
    .then((response) => {
      this.setState({
        filesData: response.data,
      });
      this.handleUnSelect(response.data);
    });
  }


  render() {
    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div className="div_export">
          <button type="button" className="fresh-button" onClick={handleClick}>Export to CSV</button>
        </div>
      );
    };

    const actionSelect = [
      { label: "Pending Approval", value: 1 },
      { label: "Approve", value: 2 },
      { label: "Reject", value: 3 },
      { label: "OA to be sent", value: 5 },
      {label: "PO Date to be changed", value:6},
      { label: "Completed", value: 7 },
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      clickToEdit: true,
      selected: this.state.selected,
      nonSelectable: this.state.nonSelected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      bgColor: 'rgb(240, 190, 185)'
    };

    const columns = [
      {
        dataField: "Request_id",
        text: "REQ ID",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "creation_date",
        text: "Creation Date",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        sort: true,
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "updateion_date",
        text: "Updation Date",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "date_order_registered",
        text: "Document Date",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "request_zone",
        text: "Zone",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "request_type",
        text: "Request Type",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "requestor_type",
        text: "Requestor Type",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "request_reason",
        text: "Request Reason",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "request_flow",
        text: "Request Flow",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "sales_order",
        text: "Sales Order",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "sales_org",
        text: "Sales Organization",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "ship_to_country",
        text: "Ship To Country",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "sku_no",
        text: "SKU No.",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "material_no",
        text: "Material",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "old_value",
        text: "Old Value",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
        
      },
      {
        dataField: "new_value",
        text: "New Value",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "new_shipping_point",
        text: "New Shipping Point",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "request_status",
        text: "Request Status",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "bot_status",
        text: "Bot Status",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "bot_comments",
        text: "Comments/Reason for Rejection",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "requester_email",
        text: "Requester Email",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
        style: {'white-space': 'nowrap'} ,
      },
      {
        dataField: "additional_notification_to",
        text: "Additional Notification To",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        style: {'white-space': 'nowrap'} ,
       
      },
      {
        dataField: "additional_information",
        text: "Additional Information",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "quotation_number",
        text: "Quotation",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "credit_block",
        text: "Credit Block",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "delivery_block",
        text: "Delivery Block",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
      },
      {
        dataField: "inco_terms",
        text: "Incoterms",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "sold_to_num",
        text: "Sold-To Number",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "Reason_Rej",
        text: "Reason For Rejection",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "po_date",
        text: "Customer PO Date",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "cust_po_num",
        text: "Customer PO Number",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "delivery_no",
        text: "Delivery Number",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "shipment_no",
        text: "Shipment Number",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "order_type",
        text: "Sales Document Type",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
      {
        dataField: "approver",
        text: "Request Status Last Modified by",
        filter: textFilter({className:"filter_style", style:{fontSize:'0.75rem'}}),
        editable: false,
      },
    ];
    
    return (
    <div className="Dashbored_div">
      <div className="div_approve_reject_wrapper ">
        <div className = {this.state.userRole===3||this.state.userRole===4?"":"hide_data"}>
          <div className="div_approve_reject"> 
            <label className="fresh-label" for="fresh-action">
              <span className="fresh-title">
              <span className="reminder">* </span>Modify Selected :
              </span>
            </label>
            <Select options={actionSelect} onChange={this.onChangeActionType} 
            />
          </div>
          <div className={this.state.show_rejection_reason}>
            <label className="fresh-label" for="fresh-rejection-reason">
              <span className="fresh-title">
                <span className="reminder">* </span>Rejection Reason&nbsp;
              </span>
            </label>
            <input
            className="fresh-input css-yk16xz-control"
            onChange={this.onchangeRejectionReason}
            type="text"
            value={this.state.rejection_reason}
            ></input>
          </div>
          <button
            type="button"
            className="submit fresh-button "
            onClick={this.onClickSubmit}
          >
            Submit
          </button>
        </div>
        <div className="advanced-Search">
          <label className="fresh-label" for="fresh-advanced-search">
            <span className="fresh-title">
              Advanced Search <span className= "reminder">(separate multiple entries with COMMA or ENTER)</span>
            </span>
          </label>
          <MultipleValueTextInput
              onItemAdded={this.addItemMultipleSO}
              onItemDeleted={this.addItemMultipleSO}
              label="Sales Order"
              name="item-input"
              placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
              deleteButton={<span>[x]</span>}
          />
        </div>
      </div>
      <div className = "container-body">
        <ToolkitProvider
          bootstrap4
          keyField="Request_id"
          data = {this.state.filesData}
          columns={columns}
          
          exportCSV={{
            fileName:"RequestList.csv",
            exportAll:false,
            onlyExportFiltered:true,
            onlyExportSelection:false,
          }}
        >{
          props =>(
            <div>
              <MyExportCSV { ...props.csvProps } />
              <BootstrapTable 
                filter={filterFactory()}
                filterPosition="top" 
                pagination={ paginationFactory({sizePerPage:50,}) }
                selectRow={selectRow}
                headerClasses="cust_header-class"
                wrapperClasses="table-responsive"
                cellEdit={ cellEditFactory({ mode: 'dbclick',
                afterSaveCell: (oldValue, newValue, row, column) => {
                  var req = { newValue: newValue, req_no: row.Request_id };
                  console.log(req);
                  axios
                        .post(configData.SERVER_URL +"/api/updateCell/update",req)
                        .then((res) => {
                          console.log(res);
                          toast.success("Updated Additional Notification for "+ row.Request_id );
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error("Error in updating Additional Notification");
                        });
                  this.pullData();             
                }, 
              }) }
                { ...props.baseProps } />
            </div>
          )
          }</ToolkitProvider>
        </div>
        <ToastContainer />
        {this.state.loading && <ClipLoader loading={this.state.loaded}/>}
    </div>
    );
  }
}

export default Dashbord;
