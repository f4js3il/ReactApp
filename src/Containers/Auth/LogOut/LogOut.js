import React, {useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const logOut = (props) =>{

    const {onLogOut} = props;

    useEffect(()=>{
        onLogOut()
    },[onLogOut])
        return <Redirect to="/"/>;
}

const mapDispatchToProps =(dispatch)=>{
return {
    onLogOut : () => dispatch(actions.logOut()) 
}
}
export default connect(null,mapDispatchToProps)(logOut);