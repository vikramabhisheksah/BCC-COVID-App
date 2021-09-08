import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";
import axios from "axios";
import configData from "../components/config.json";

const gender = [
  { id: "1", title: "Male" },
  { id: "2", title: "Female" },
  { id: "3", title: "Refused" },
];

const binaryResponse = [
  { id: "1", title: "Yes" },
  { id: "0", title: "No" },
];

const initialFValues = {
  screen_age_yn: "",
  screen_age: "",
  screen_gender: "",
  screen_smoking_yn: "",
  screen_smoking_amount: "",
  screen_smoking_years: "",
  screen_packyears: "",
  screen_20packyears_yn: "",
  screen_pregnancy_yn: "",
  screen_rx_respiratoryinfection_yn: "",
  screen_hx_asthma_yn: "",
  screen_hx_asthma_age: "",
  screen_hx_lungdisease_yn: "",
  screen_hx_lungdisease: "",
  screen_diabetes_yn: "",
  screen_lungcancer_yn: "",
  screen_dx_additional_yn: "",
  screen_investigationaldrug_yn: "",
  screen_hx_atrialfibrillation_yn: "",
  screen_therapy_atrialfibrillation_yn: "",
  screen_treatment_atrialfibrillation_yn: "",
  screen_bph_yn: "",
  screen_treatment_bph_yn: "",
  screen_comments: "",
};

export default function PatientInfo() {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_age_yn"
            label="Are you between the ages of 40-80?"
            value={values.screen_age_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_age"
            label="Specify age"
            value={values.screen_age}
            onChange={handleInputChange}
            error={errors.screen_age}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="screen_gender"
            label="Type of phone"
            value={values.screen_gender}
            onChange={handleInputChange}
            options={gender}
            error={errors.screen_gender}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_smoking_yn"
            label="Are you a current or former smoker?"
            value={values.screen_smoking_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_smoking_amount"
            label="On average, how many packs do or did you smoke per day?"
            value={values.screen_smoking_amount}
            onChange={handleInputChange}
            error={errors.screen_smoking_amount}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_smoking_years"
            label="How many years have you (or had you) smoked?"
            value={values.screen_smoking_years}
            onChange={handleInputChange}
            error={errors.screen_smoking_years}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_packyears"
            label="To calculate pack-years: Packs/day * years smoked = pack years
                        1 pack = 20 cigarettes
                        Pack-year calculation result"
            value={values.screen_packyears}
            onChange={handleInputChange}
            error={errors.screen_packyears}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_20packyears_yn"
            label="Based on your calculation, does the subject have 10 pack-year smoking history?"
            value={values.screen_20packyears_yn}
            onChange={handleInputChange}
            error={errors.screen_20packyears_yn}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_pregnancy_yn"
            label="Are you a current or former smoker?"
            value={values.screen_pregnancy_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_rx_respiratoryinfection_yn"
            label="Have you received a course of antibiotics or systemic steroids for respiratory infection within the past 4 weeks?"
            value={values.screen_rx_respiratoryinfection_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_hx_asthma_age"
            label="Please provide age when diagnosed."
            value={values.screen_hx_asthma_age}
            onChange={handleInputChange}
            error={errors.screen_hx_asthma_age}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_hx_lungdisease_yn"
            label="Do you have a history of lung disease?"
            value={values.screen_hx_lungdisease_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_hx_lungdisease"
            label="Please specify"
            value={values.screen_hx_lungdisease}
            onChange={handleInputChange}
            error={errors.screen_hx_lungdisease}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_diabetes_yn"
            label="Do you have Diabetes Type I?"
            value={values.screen_diabetes_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_lungcancer_yn "
            label="Do you have lung cancer or a history of lung cancer?"
            value={values.screen_lungcancer_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_dx_additional_yn  "
            label="Do you have narrow-angle glaucoma, bladder-neck obstruction or severe renal impairment or urinary retention?"
            value={values.screen_dx_additional_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_investigationaldrug_yn   "
            label="Are you currently or have you in the past 30 days participated in any other clinical trials involving an investigational drug?"
            value={values.screen_investigationaldrug_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_hx_atrialfibrillation_yn    "
            label="Do you have a history of atrial fibrillation?"
            value={values.screen_hx_atrialfibrillation_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_therapy_atrialfibrillation_yn"
            label="Have you been on therapy for your atrial fibrillation for 6 months or more?"
            value={values.screen_therapy_atrialfibrillation_yn}
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_treatment_atrialfibrillation_yn "
            label="Has your atrial fibrillation been well controlled with treatment for 6 months or more?"
            value={values.screen_treatment_atrialfibrillation_yn }
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_bph_yn "
            label="Do you have Benign Prostatic Hyperplasia (BPH)?"
            value={values.screen_bph_yn  }
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.RadioGroup
            name="screen_treatment_bph_yn  "
            label="Are you on stable treatment for BPH?"
            value={values.screen_treatment_bph_yn   }
            onChange={handleInputChange}
            items={binaryResponse}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="screen_comments"
            label="Any other information would you like to provide."
            value={values.screen_comments }
            onChange={handleInputChange}
            error={errors.screen_comments }
          />
        </Grid>
      </Grid>
    </Form>
  );
}
