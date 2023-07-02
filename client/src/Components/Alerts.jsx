import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';

export default function Alerts(props) {
  return (
    <>
    <div style={{height : "1px"}}>
    {props.alert && <div>
        <div className={"alert alert-danger"} style={{ textAlign: "center", width: "25%", margin:"auto", position: "absolute", top: "15px", right: "550px"}}role="alert">
            <ErrorIcon style={{marginRight:"5px"}}/>
            <strong>Error : </strong>{props.alert.msg}
        </div>
    </div>}
    </div>
    </>
  )
}
