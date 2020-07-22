import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props)=>(
    <ul className={classes.NavigationItems}> 
        <NavigationItem link= "/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated?  <NavigationItem link= "/orders" >Orders</NavigationItem> : null}
        {props.isAuthenticated?   <NavigationItem link= "/logOut" >LogOut</NavigationItem>
        :   <NavigationItem link= "/auth" >Authentication</NavigationItem>}
      
    </ul>

);


export default  navigationItems;