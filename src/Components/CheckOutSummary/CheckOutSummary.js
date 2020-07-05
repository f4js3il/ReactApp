import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckOutSummary.css'
const CheckOutSummary=(props)=>(
    <div className={classes.CheckOutSummary}>
        <h1>We hope you like the Burger</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={props.checkOutCancelled}>Cancel </Button>
        <Button btnType="Success" clicked={props.checkOutContinued}>Continue </Button>
    </div>
)

export default CheckOutSummary;