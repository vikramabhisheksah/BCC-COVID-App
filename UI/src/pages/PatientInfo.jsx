import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";
import axios from "axios";
import configData from "../components/config.json";

const binaryResponse = [
  { id: "1", title: "Yes" },
  { id: "0", title: "No" },
];

const phoneTypes = [
  { id: "1", title: "Landline" },
  { id: "2", title: "Cell" },
  { id: "3", title: "Home" },
];
const bestTime = [
  { id: "1", title: "AM" },
  { id: "2", title: "PM" },
];

const gender = [
  { id: "1", title: "Male" },
  { id: "2", title: "Female" },
  { id: "3", title: "Refused" },
];

const initialFValues = {
  name_first: "",
  name_middle: "",
  name_last: "",
  dob: "",
  phone1: "",
  phone1_type: "",
  phone1_text_yn: "",
  phone2_yn: "",
  phone2: "",
  phone2_type: "",
  phone2_text_yn: "",
  contact_besttime_survey: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  voicemail_yn_survey: "",
  copd_yn_survey: "",
  copd_exacerbation_yn_survey: "",
  smoking_yn_survey: "",
  smoking_now_yn_survey: "",
  smoking_start_survey: "",
  smoking_stop_survey: "",
  smoking_amount_survey: "",
  rx_bp_yn_survey: "",
  rx_bp_survey: "",
  recruitment_source_survey: "",
  recruitment_source_other_survey: "",
  current_age: "",
  gender: "",
  race: "",
  ethnicity: "",
  email_yn: "",
  email: "",

};

export default function PatientInfo() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name_first" in fieldValues)
      temp.name_first = fieldValues.name_first ? "" : "This field is required.";
    if ("name_last" in fieldValues)
      temp.name_first = fieldValues.name_last ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("phone1" in fieldValues)
      temp.phone1 =
        fieldValues.phone1.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("phone2" in fieldValues)
      temp.phone2 =
        fieldValues.phone2.length > 9 ? "" : "Minimum 10 numbers required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // employeeService.insertEmployee(values)
      resetForm();
    }
  };
  const getAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    return age_now;
  };

  const [stateList, setStateList] = useState([]);
  const [surveySourceList, setsurveySourceList] = useState([]);
  const [raceList, setraceList] = useState([]);
  const [ethnicityList, setethnicityList] = useState([]);

  useEffect(() => {
    axios.get(configData.SERVER_URL + "/api/getState").then((res) => {
      setStateList(res.data);
    });

    axios.get(configData.SERVER_URL + "/api/getSurveySource").then((res) => {
      setsurveySourceList(res.data);
    });
    axios.get(configData.SERVER_URL + "/api/getRace").then((res) => {
      setraceList(res.data);
    });
    axios.get(configData.SERVER_URL + "/api/getEthinicityTypes").then((res) => {
      setethnicityList(res.data);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <Controls.Input
            name="name_first"
            label="First Name"
            value={values.name_first}
            onChange={handleInputChange}
            error={errors.name_first}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="name_middle"
            label="Middle Name"
            value={values.name_middle}
            onChange={handleInputChange}
            error={errors.name_middle}
            helptext="Optional"
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="name_last"
            label="Last Name"
            value={values.name_last}
            onChange={handleInputChange}
            error={errors.name_last}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.DatePicker
            name="dob"
            label="Date of Birth"
            value={values.dob}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          {values.dob && (
            <>
              <span>Your Current Age - </span>
              <input readOnly={true} value={getAge(values.dob)} type="text" />
            </>
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="phone1"
            label="Primary Phone Number"
            value={values.phone1}
            onChange={handleInputChange}
            error={errors.phone1}
          />
        </Grid>
        <Grid item xs={4}>
          {values.phone1.length === 10 && (
            <Controls.Select
              name="phone1_type"
              label="Type of phone"
              value={values.phone1_type}
              onChange={handleInputChange}
              options={phoneTypes}
              error={errors.phone1_type}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {values.phone1_type === "2" && (
            <Controls.RadioGroup
              name="phone1_text_yn"
              label="Are you willing to receive text messages at this number?"
              value={values.phone1_text_yn}
              onChange={handleInputChange}
              items={binaryResponse}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="phone2_yn"
            label="Do you have a secondary phone number?"
            value={values.phone2_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        {values.phone2_yn === "1" && (
          <>
            <Grid item xs={4}>
              <Controls.Input
                name="phone2"
                label="Secondary Phone Number"
                value={values.phone2}
                onChange={handleInputChange}
                error={errors.phone2}
              />
            </Grid>
            <Grid item xs={4}>
              {values.phone2.length === 10 && (
                <Controls.Select
                  name="phone2_type"
                  label="Type of phone"
                  value={values.phone2_type}
                  onChange={handleInputChange}
                  options={phoneTypes}
                  error={errors.phone2_type}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              {values.phone2_type === "2" && (
                <Controls.RadioGroup
                  name="phone2_text_yn"
                  label="Are you willing to receive text messages at this number?"
                  value={values.phone2_text_yn}
                  onChange={handleInputChange}
                  items={binaryResponse}
                />
              )}
            </Grid>
          </>
        )}
        <Grid item xs={4}>
          <Controls.Select
            name="contact_besttime_survey"
            label="When is the best time to contact you?"
            value={values.contact_besttime_survey}
            onChange={handleInputChange}
            options={bestTime}
            error={errors.contact_besttime_survey}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="copd_yn_suvoicemail_yn_surveyrvey"
            label="May we leave a voicemail on the above numbers?"
            value={values.voicemail_yn_survey}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="address1"
            label="Address 1 (Building no. & Street name)"
            value={values.address1}
            onChange={handleInputChange}
            error={errors.address1}
            helptext = "Please enter building no. and street name only"
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="address2"
            label="Address 2 (If applicable, Unit/Apt no.)"
            value={values.address2}
            onChange={handleInputChange}
            error={errors.address2}
            helptext = "Please enter unit or apt no."
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="state"
            label="State"
            value={values.state}
            onChange={handleInputChange}
            options={stateList}
            error={errors.state}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="zipcode"
            label="Zipcode"
            value={values.zipcode}
            onChange={handleInputChange}
            error={errors.zipcode}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="copd_yn_survey"
            label="Has a doctor told you that you have Chronic Obstructive Pulmonary Disease (COPD)?"
            value={values.copd_yn_survey}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          {values.copd_yn_survey === "1" && (
            <Controls.RadioGroup
              name="copd_exacerbation_yn_survey"
              label="Have you had a COPD exacerbation (flare-up) requiring treatment within the last 6 weeks?"
              value={values.copd_exacerbation_yn_survey}
              onChange={handleInputChange}
              items={binaryResponse}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="smoking_yn_survey"
            label="Have you ever smoked cigarettes?"
            value={values.smoking_yn_survey}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          {values.smoking_yn_survey === "1" && (
            <Controls.RadioGroup
              name="smoking_now_yn_survey"
              label="Do you now smoke cigarettes (as of 1 month ago)?"
              value={values.smoking_now_yn_survey}
              onChange={handleInputChange}
              items={binaryResponse}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          {values.smoking_yn_survey === "1" && (
            <Controls.Input
              name="smoking_start_survey"
              label="How old were you when you first started regular cigarette smoking?"
              value={values.smoking_start_survey}
              onChange={handleInputChange}
              error={errors.smoking_start_survey}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {values.smoking_now_yn_survey === "0" && (
            <Controls.Input
              name="smoking_stop_survey"
              label="If you stopped smoking cigarettes completely, how old were you when you stopped?"
              value={values.smoking_stop_survey}
              onChange={handleInputChange}
              error={errors.smoking_stop_survey}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          {values.smoking_yn_survey === "1" && (
            <Controls.Input
              name="smoking_amount_survey"
              label="On average of the entire time you smoked, how many cigarettes do/did you smoke/day? "
              value={values.smoking_amount_survey}
              onChange={handleInputChange}
              error={errors.smoking_amount_survey}
              helptext = "cigarettes per day"
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="rx_bp_yn_survey"
            label="Are you using any blood pressure medicines?"
            value={values.rx_bp_yn_survey}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          {values.rx_bp_yn_survey === "1" && (
            <Controls.Input
              name="rx_bp_survey"
              label="Please list the blood pressure medicine you currently use."
              value={values.rx_bp_survey}
              onChange={handleInputChange}
              error={errors.rx_bp_survey}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="recruitment_source_survey"
            label="Where did you hear about us?"
            value={values.recruitment_source_survey}
            onChange={handleInputChange}
            options={surveySourceList}
            error={errors.recruitment_source_survey}
          />
        </Grid>
        <Grid item xs={4}>
          {values.recruitment_source_survey === 99 && (
            <Controls.Input
              name="recruitment_source_other_survey"
              label="Please specify 'Other'"
              value={values.recruitment_source_other_survey}
              onChange={handleInputChange}
              error={errors.recruitment_source_other_survey}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <Controls.Select
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            options={gender}
            error={errors.gender}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="race"
            label="Race"
            value={values.race}
            onChange={handleInputChange}
            options={raceList}
            error={errors.race}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="ethnicity"
            label="Ethnicity"
            value={values.ethnicity}
            onChange={handleInputChange}
            options={ethnicityList}
            error={errors.ethnicity}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="email_yn"
            label="Do you have an e-mail address?"
            value={values.email_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          {values.email_yn === "1" && (
            <Controls.Input
              name="email"
              label="E-mail address"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
