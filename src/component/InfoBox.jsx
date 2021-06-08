import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import "../App.css";

function InfoBox(props) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${props.active && "infoBox--selected"} ${props.isRed && "infoBox--red"} ${props.isGrey && "infoBox--grey"}`}>
            <CardContent>
                <Typography
                    className="infoBox_title"
                    color="textSecondary">{props.title}</Typography>
                <h2 className={`infoBox_cases ${!props.isRed && 'infoBox_cases--green'} ${props.isGrey && "infoBox_cases--grey"}`}>{props.cases}</h2>
                <Typography
                    className="infoBox_total" color="textSecondary">{props.total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
