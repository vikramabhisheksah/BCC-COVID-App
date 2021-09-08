import React, {useState} from 'react'
import PatientInfo from "./PatientInfo";
import ScreenInfo from "./ScreenInfo";
// import PageHeader from "../../components/PageHeader";
// import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));





export default function Patient() {

    const classes = useStyles();
    const [page, setPage] = useState(1);

    function goNextPage() {
        if (page === 2) return;
        setPage((page) => page + 1);
      }

    return (
        <>
            {/* <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}
            <Paper className={classes.pageContent}>
                {page === 1 && <PatientInfo nextPage = {goNextPage}/>}
                {page === 2 && <ScreenInfo nextPage = {goNextPage}/>}
            </Paper>
        </>
    )
}
