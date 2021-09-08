import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === "phone1" || name === "phone2" || name === "smoking_start_survey" || name === "smoking_stop_survey" || name === "smoking_amount_survey"){
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            if (onlyNums.length < 11) {
                setValues({
                    ...values,
                    [name]: onlyNums
                });
            }
        }
        else if(name === "dob"){
            var date_new = new Intl.DateTimeFormat('en-US', { month: '2-digit',day: '2-digit', year: 'numeric'}).format(value);
            setValues({
                ...values,
                [name]: date_new
            });
        }
        else{

        setValues({
            ...values,
            [name]: value
        });
    }
        console.log(values);
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

