import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../Components/Logo/Logo';
import classes from './SideDrawer.css';
import BackDrop from '../../../Components/UI/BackDrop/BackDrop';
import Aux from '../../../Hoc/Auxiliary/Auxiliary'

const sideDrawer = (props)=>{
    let attachedClasses =[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }

    return(
        <Aux>
        <BackDrop purchaseCancel={props.closed} show={props.open}/>
        <div  className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </div>
        </Aux>
    );
}





export default sideDrawer;