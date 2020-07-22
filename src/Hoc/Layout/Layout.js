import React,{Component} from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () =>{
        this.setState(
            (prevState)=>{
                return{showSideDrawer: !prevState.showSideDrawer};
            }
        );
    }

    render(){
        return(
            <Aux>
             <ToolBar 
             drawerToggleClicked={this.sideDrawerToggleHandler}
             isAuthenticated={this.props.isAuthenticated}/>
             <SideDrawer open = {this.state.showSideDrawer}
              closed={this.sideDrawerClosedHandler}  
              isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                    </main>
            </Aux>
        )
    }
 
}

const mapStateToProps = (state) =>{
    return{
        isAuthenticated : state.auth.token!==null
    }
}
export default connect(mapStateToProps)(Layout);