import React, { Component } from "react";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./fileUpload";
import axios from "axios";
import Select from "react-select";
import Moment from "moment";
import configData from "./config.json";

export class ReqForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeZone = this.onChangeZone.bind(this);
    this.onChangeRequestType = this.onChangeRequestType.bind(this);
    this.onChangeRequestFlow = this.onChangeRequestFlow.bind(this);
    this.onChangeRequesterType = this.onChangeRequesterType.bind(this);
    this.onChangeNewShippingPoint = this.onChangeNewShippingPoint.bind(this);
    this.onChangeOldValue = this.onChangeOldValue.bind(this);
    this.onChangeNewValue = this.onChangeNewValue.bind(this);
    this.onchangeSalesOrder = this.onchangeSalesOrder.bind(this);
    this.onChangeRequestReason = this.onChangeRequestReason.bind(this);
    this.onChangeQuotation = this.onChangeQuotation.bind(this);
    this.onChangePlant_Mapping = this.onChangePlant_Mapping.bind(this);
    this.onChangeShipping_point_In_NewValue = this.onChangeShipping_point_In_NewValue.bind(this);
    this.onchangeAdditionalInformation = this.onchangeAdditionalInformation.bind(this);
    this.onchangeAdditionalNotificationTo = this.onchangeAdditionalNotificationTo.bind(this);

    this.state = {
      showPopup: false,
      showNewShippingPoint: "fresh-field-wrapper hide_data",
      showValue: "fresh-field-wrapper hide_data",
      newValueFieldType: "text",
      newValueReadOnly: false,
      request_zone: "",
      request_type: "",
      request_flow: "3",
      requester_type: "",
      new_shipping_point: "",
      old_value: "",
      new_value: "",
      requester_email: this.props.email,
      sales_order: "",
      quotation: "",
      request_reason: "",
      plant_mapping: "",
      salse_org: "",
      shipping_point_mapping: "",
      additional_Information: "",
      additional_notification_to:"",
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  componentDidUpdate() {
    console.log("this called");
    console.log(this.state);
  }

  onChangeZone(e) {
    console.log(e.value);
    this.setState({
      request_zone: e.value,
      sales_order:"",
    });
    if (e.value === 1 && this.state.request_type === 5) {
      this.setState({
        showNewShippingPoint: "fresh-field-wrapper",
      });
    } else {
      this.setState({
        showNewShippingPoint: "fresh-field-wrapper hide_data",
      });
    }
  }
  onChangeRequestType(e) {
    console.log(e.value);
    this.setState({
      request_type: e.value,
      old_value: "",
      sales_order:"",
    });
    console.log("line no 77");

    if (e.value === 5 && this.state.request_zone === 1) {
      this.setState({
        showNewShippingPoint: "fresh-field-wrapper",
      });
    } else {
      this.setState({
        showNewShippingPoint: "fresh-field-wrapper hide_data",
      });
    }
    if (e.value === 1) {
      this.setState({
        showValue: "fresh-field-wrapper hide_data",
      });
    } else {
      this.setState({
        showValue: "fresh-field-wrapper",
      });
    }
    console.log(e.value);
    if (e.value === 3) {
      this.setState({
        newValueFieldType: "date",
        new_value: "",
      });
    }
    else {
      this.setState({
        newValueFieldType: "text",
        new_value: "",
      });
    }
  }

  
  onChangePlant_Mapping(e) {
    console.log(e.label);
    this.setState({
      new_value: e.label.substr(0, 4),
      shipping_point_mapping:"",
    });

    if(this.state.request_zone === 1){
      var spData = {plant_code:e.label.substr(0, 4),request_zone:this.state.request_zone};
      console.log("getting shipping point :" + spData);
      axios
      .post(configData.SERVER_URL +"/api/getShippingPoint",spData)
      .then((res) => {
        console.log(res);
        this.setState({
          shipping_point_mapping: res.data,
        });
      });
    }

  }
  onChangeShipping_point_In_NewValue(e) {
    console.log(e.label);
    this.setState({
      new_value: e.label,
    });
  }
  onChangeRequestFlow(e) {
    console.log(e.value);
    this.setState({
      request_flow: e.value,
    });
  }
  onChangeRequesterType(e) {
    console.log(e.value);
    this.setState({
      requester_type: e.value,
      sales_order:"",
    });
  }
  onChangeNewShippingPoint(e) {
    console.log(e.label);
    this.setState({
      new_shipping_point: e.label,
    });
  }
  onChangeOldValue(e) {
    console.log(e.target.value);
    this.setState({
      old_value: e.target.value,
    });
  }
  onChangeNewValue(e) {
    console.log(e.target.value);
    var val = e.target.value;
    console.log("request type :" + this.state.request_type);
    var exitFlag = false;
    if (this.state.request_type === 2) {
      if (isNaN(e.target.value) && e.target.value !== "") {
        exitFlag = true;
        return;
      }
    }
    console.log(val);
    console.log(val.includes("."));
    if (e.target.value.includes(".") === true) {
      exitFlag = true;
      return;
    }
    console.log(this.state.request_type);

    if (this.state.request_type === 7) {
      if (val.length > 6) {
        exitFlag = true;
      }else if(val.length===6){
        
        if (!(((val.substr(0,2).toUpperCase())==="MX")&&(isNaN(val.substr(2,1)))&&(isNaN(val.substr(3,1)))&&(!isNaN(val.substr(4,2)))))
        {
          console.log("Done")
          this.setState({
            new_value: "",
          });
          return;
        }
      }
    } else if (this.state.request_type === 4) {
      if (val.length > 20) {
        exitFlag = true;
      }
    } else if (this.state.request_type === 5) {
      if (val.length > 4) {
        exitFlag = true;
      }
    } else if (this.state.request_type === 6) {
      if (val.length > 4) {
        exitFlag = true;
      }
    }
    console.log("flag=" + exitFlag);
    if (exitFlag === true) {
      return;
    }
    this.setState({
      new_value: e.target.value,
    });
  }

  onchangeSalesOrder(e) {
    console.log(e.target.value);
    if (!Number(e.target.value) && e.target.value !== "") {
      return;
    }
    if (e.target.value.includes(".") === true) {
      return;
    }
    if (e.target.value.length > 8) {
      return;
    }
    this.setState({
      sales_order: e.target.value,
    });
    console.log(this.state.sales_order);
    var val = { value: e.target.value };
    if (e.target.value.length >= 8) {
      axios
        .post(configData.SERVER_URL +"/api/filterData/findSo", val)
        .then((res) => {
          // then print response status
          console.log(res.data);
          console.log(res.data.length);
          // console.log(res.data[0].Invoice);
          if (res.data.length > 0) {
            if (res.data[0].Quotation === null) {
              this.setState({
                quotation: "",
              });
            } else {
              this.setState({
                quotation: res.data[0].Quotation,
              });
            }
            this.setState({
              salse_org: res.data[0].sales_org,
            });

            if (this.state.request_type === 4) {
              this.setState({
                old_value: res.data[0].Customer_Ref_PO,
              });
            } else if (this.state.request_type === 3) {
              this.setState({
                old_value: Moment(res.data[0].Mad).format("DD-MM-YYYY"),
              });
            } else if (this.state.request_type === 5) {
              this.setState({
                old_value: res.data[0].Delivery_Plant_ID,
              });
              const reqData={sales_org:res.data[0].sales_org,request_zone:this.state.request_zone};
              console.log("getting plant :"+reqData);
              axios
                .post(configData.SERVER_URL +"/api/getPlant", reqData)
                .then((res) => {
                  // then print response status
                  console.log(res);
                  this.setState({
                    plant_mapping: res.data,
                    newValueFieldType: "plant",
                  });
                });
            
             } else if (this.state.request_type === 6) {
              this.setState({
                old_value: res.data[0].Shipping_Point,
              });
              var spData2 = {plant_code:res.data[0].Delivery_Plant_ID,request_zone:this.state.request_zone};
                console.log("getting shipping point :" + spData2.data);
                axios
                .post(configData.SERVER_URL +"/api/getShippingPoint",spData2)
                .then((res) => {
                  console.log(res);
                  this.setState({
                    shipping_point_mapping: res.data,
                    newValueFieldType: "shipping point",
                  });
                });
            } else if (this.state.request_type === 7) {
              this.setState({
                old_value: res.data[0].Route,
              });
            } else if (this.state.request_type === 2) {
              this.setState({
                old_value: res.data[0].quantity_orderd,
                newValueReadOnly: false,
              });
            }
          } else {
            toast.warning("No data found for the sales order.");
          }
        });
    } else {
      this.setState({
        old_value: "",
      });
    }
  }
  onChangeQuotation(e) {
    console.log(e.target.value);
    this.setState({
      quotation: e.target.value,
    });
  }
  onChangeRequestReason(e) {
    console.log(e.value);
    this.setState({
      request_reason: e.value,
    });

  }

  onchangeAdditionalInformation(e) {
    console.log(e.target.value);
    this.setState({
      additional_Information: e.target.value,
    });
  }

  onchangeAdditionalNotificationTo(e) {
    console.log(e.value);
    this.setState({
      additional_notification_to: e.target.value,
    });
  }

  downloadExcelFile = () => {
    console.log("download request send.");
    axios({
      url: configData.SERVER_URL +"/exportTemp/", //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Download.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      toast.success("Template downloaded successfully.");
    });
  };

  onSubmit = (data) => {
    console.log(data);
    var val = { value: this.state.sales_order };
    axios
      .post(configData.SERVER_URL +"/api/filterData/findSo", val)
      .then((res) => {
        // then print response status
        console.log(res.data);
        console.log(res.data.length);
        console.log(this.state);
        if (res.data.length > 0) {
          axios
            .post(
              configData.SERVER_URL +"/api/filterData/GetDuplicate",
              this.state
            )
            .then((res) => {
              // then print response status
              console.log(res.data[0].Column0);
              if (res.data[0].Column0 === 0) {
                if (this.state.newValueFieldType === "date") {
                  this.setState({
                    new_value: Moment(this.state.new_value).format(
                      "DD-MM-YYYY"
                    ),
                  });
                }
                console.log(this.state);
                if (
                  this.state.new_value !== "" ||
                  this.state.request_type === 1
                ) {
                  
                      var val = { value: this.state.sales_order };
                      console.log("sales order no."+val);
                      axios
                        .post(configData.SERVER_URL +"/api/filterData/fetchZCDP", val)
                        .then((ZCDPres) => {
                          console.log(ZCDPres.data[0]);
                            //var val = { value: this.state.sales_order };
                            axios
                              .post(configData.SERVER_URL +"/api/filterData/updateZCDP", ZCDPres.data[0])
                              .then((res) => {
                                console.log(res);
                                axios
                                  .post(configData.SERVER_URL +"/api/filterData/fetchZXXVL", val)
                                  .then((ZXXVLres) => {
                                    console.log(ZXXVLres.data[0]);
                                      axios
                                        .post(configData.SERVER_URL +"/api/filterData/updateZXXVL", ZXXVLres.data[0])
                                        .then((res) => {
                                          console.log(res);
                                          axios
                                          .post(configData.SERVER_URL +"/api/add/new", this.state)
                                          .then((res) => {
                                            console.log(res);  
                                            toast.success("Request raised successfully.");
                                            setTimeout(()=>window.location.reload(),1000);
                                            })
                                            .catch((err) => {
                                              console.log(err);
                                              toast.error("Error in upload.");
                                            });
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                          toast.error("Error in inserting zxxvl");
                                        });
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    toast.error("Error in fetching zxxvl");
                                  });
                              })
                              .catch((err) => {
                                console.log(err);
                                toast.error("Error in inserting zcdp");
                              });
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error("Error in fetching zcdp");
                        });
                        
                } else {
                  toast.error("Request not allowed.");
                }
              } else {
                console.log(res.data[0]);
                toast.warning(
                  "There is already a request in server with same details."
                );
              }
            })
            .catch((err) => {
              // then print response status
              console.log(err);
              toast.error("Error in upload.");
            });
        } else {
          toast.error(
            "No Data found for the Sales Order. Unable to submit request."
          );
        }
      });
  };

  onCancle = () => {
    window.location.reload(true);
  };


  render() {
    // var plantSelect=[this.state.plant_mapping];

    const zoneSelect = [
      { label: "Mexico", value: 1 },
      { label: "Europe", value: 2 },
      { label: "NAZ", value: 3 },
    ];
    const typeSelect = [
      { label: "Cancellation", value: 1 },
      { label: "QTY change", value: 2 },
      { label: "MAD", value: 3 },
      { label: "PO Number", value: 4 },
      { label: "Plant", value: 5 },
      { label: "Shipping Point", value: 6 },
      { label: "Route", value: 7 },
    ];
    const requesterTypeSelect = [
      { label: "Customer", value: 1 },
      { label: "Demand Planning / Central Planning", value: 2 },
      { label: "Transport Planning", value: 3 },
      { label: "Commercial", value: 4 },
      { label: "Order Taking", value: 5 },
      { label: "Inventory Deployment BE", value: 6 },
      { label: "Inventory Deployment DE", value: 7 },
      { label: "Inventory Deployment UK", value: 8 },
      { label: "Inventory Deployment Exports", value: 9 },
      { label: "US BSC", value: 10 },
    ];
    // const FlowSelect = [
    //   { label: "Existing Flow", value: 1 },
    //   { label: "No Flow", value: 2 },
    // ];
    const ReasonSelect = [
      { label: "Customer request", value: 1 },
      { label: "Material issue", value: 2 },
      { label: "Production issue", value: 3 },
      { label: "Quality issue", value: 4 },
      { label: "Capacity issue in loading point", value: 5 },
      { label: "Validation", value: 6 },
      { label: "Processing Mistake", value: 7 },
    ];

    return (
      <div className="page">
        
        <div className="Download_btn">
          <button
            type="button"
            className="fresh-button cust_btn-cls"
            onClick={this.downloadExcelFile}
          >
            Download Template
          </button>
          <button
            type="button"
            className="fresh-button cust_btn-cls"
            onClick={this.togglePopup.bind(this)}
          >
            Upload multiple request Document
          </button>
        </div>

        <div className="UploaderNreview">
          {this.state.showPopup ? (
            <FileUpload
              id="FileUpload"
              text='Click "Close Button" to hide popup'
              closePopup={this.togglePopup.bind(this)}
              email = {this.state.requester_email}
            />
          ) : null}
        </div>

        <div className="fresh-form">
          <h4>Request Form</h4>
          <h5 className="reminder">* Mandatory fields</h5>
          <div className="fresh-field-wrapper request_zone">
            <label className="fresh-label" for="fresh-request_zone">
              <span className="fresh-title">
                <span className="reminder">* </span> Zone&nbsp;
              </span>
            </label>
            <Select options={zoneSelect} onChange={this.onChangeZone} />
          </div>
          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-request_type">
              <span className="fresh-title">
                <span className="reminder">* </span>Request Type&nbsp;
              </span>
            </label>
            <Select options={typeSelect} onChange={this.onChangeRequestType} />
          </div>

          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-requester_type">
              <span className="fresh-title">
                <span className="reminder">* </span>Requester Type&nbsp;
              </span>
            </label>
            <Select
              options={requesterTypeSelect}
              onChange={this.onChangeRequesterType}
            />
          </div>
          
          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-sales_order">
              <span className="fresh-title">
                <span className="reminder">* </span>Sales Order&nbsp;
              </span>
            </label>
            
            <input
              id="fresh-sales_order-user-profile"
              className="fresh-input css-yk16xz-control"
              onChange={this.onchangeSalesOrder}
              required={true}
              type="text"
              value={this.state.sales_order}
            ></input>
          </div>
          
          <div className={this.state.showValue}>
            <label className="fresh-label" for="fresh-old_value">
              <span className="fresh-title">
                <span className="reminder">* </span>Old Value&nbsp;
              </span>
            </label>
            <input
              id="fresh-old_value-user-profile"
              className="fresh-input css-yk16xz-control"
              onChange={this.onChangeOldValue}
              value={this.state.old_value}
              readOnly={true}
            ></input>
          </div>
          <div className={this.state.showValue}>
            <label className="fresh-label" for="fresh-new_value">
              <span className="fresh-title">
                <span className="reminder">* </span>New Value&nbsp;
              </span>
            </label>
            {this.state.newValueFieldType === "text" && (
              <input
                id="fresh-new_value-user-profile"
                className="fresh-input css-yk16xz-control"
                onChange={this.onChangeNewValue}
                type={this.state.newValueFieldType}
                readOnly={this.state.newValueReadOnly}
                value={this.state.new_value}
              ></input>
            )}
            {this.state.newValueFieldType === "date" && (
              <input
                id="fresh-new_value-user-profile"
                className="fresh-input css-yk16xz-control"
                onChange={this.onChangeNewValue}
                type={this.state.newValueFieldType}
                readOnly={this.state.newValueReadOnly}
                value={this.state.new_value}
                min={Moment().format("YYYY-MM-DD")}
              ></input>
            )}
            {this.state.newValueFieldType === "plant" && (
              <Select
                options={this.state.plant_mapping}
                onChange={this.onChangePlant_Mapping}
              />
            )}
            {this.state.newValueFieldType === "shipping point" && (
              <Select
                options={this.state.shipping_point_mapping}
                onChange={this.onChangeShipping_point_In_NewValue}
              />
            )}
          </div>
          <div className={this.state.showNewShippingPoint}>
              <label className="fresh-label" for="fresh-new_shipping_point">
                <span className="fresh-title">
                  <span className="reminder">* </span>New Shipping Point&nbsp;
                </span>
              </label>
              <Select options={this.state.shipping_point_mapping} onChange={this.onChangeNewShippingPoint} />
          </div>


          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-request_reason">
              <span className="fresh-title">
                <span className="reminder">* </span>Request Reason&nbsp;
              </span>
            </label>
            <Select
              options={ReasonSelect}
              onChange={this.onChangeRequestReason}
            />
          </div>

          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-additional information">
              <span className="fresh-title">
                <span className="reminder"></span>Additional Information&nbsp;
              </span>
            </label>
            <input
              id="fresh-additional information-user-profile"
              className="fresh-input css-yk16xz-control"
              onChange={this.onchangeAdditionalInformation}
              type="text"
              value={this.state.additional_Information}
            ></input>
          </div>

          <div className="fresh-field-wrapper">
            <label className="fresh-label" for="fresh-additional_notification_to">
              <span className="fresh-title">
                <span className="reminder"></span>Additional Notification To&nbsp;
              </span>
            </label>

            <input
              id = "fresh-additional_notification_to-user-profile"
              className="fresh-input css-yk16xz-control"
              onChange ={this.onchangeAdditionalNotificationTo}
              type="text"
              value={this.state.additional_notification_to}
            ></input>
          </div>


          <div className="fresh-field-wrapper">
            <button
              className="fresh-button cust_btn-cls"
              onClick={this.onSubmit}
            >
              Submit&nbsp;
            </button>
            <button
              className="fresh-button cust_btn-cls"
              onClick={this.onCancle}
            >
              Cancel
            </button>
          </div>
        </div>
        <ToastContainer autoClose={3000}></ToastContainer>
      </div>
    );
  }
}

export default ReqForm;
