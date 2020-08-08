import React,{useState} from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const layout= (props)=> {

 const [sideDrawerVisible, isSideDrawerVisible] =  useState(false)
 

    const sideDrawerClosedHandler = () =>{
        isSideDrawerVisible(false);
    }

    const sideDrawerToggleHandler = () =>{
        isSideDrawerVisible(!sideDrawerVisible);
    }


        return(
            <Aux>
             <ToolBar 
             drawerToggleClicked={sideDrawerToggleHandler}
             isAuthenticated={props.isAuthenticated}/>
             <SideDrawer open = {sideDrawerVisible}
              closed={sideDrawerClosedHandler}  
              isAuthenticated={props.isAuthenticated}/>
                <main className={classes.Content}>
                    {props.children}
                    </main>
            </Aux>
        )
    
 
}

const mapStateToProps = (state) =>{
    return{
        isAuthenticated : state.auth.token!==null
    }
}
export default connect(mapStateToProps)(layout);