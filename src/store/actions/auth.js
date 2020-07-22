import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}


export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut())
        },
        expirationTime*1000 )
        
    }
}

export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }

}


export const auth = (email,password, isSignUp)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData ={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = isSignUp? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLDi1X5zh-b_ox3q_D5zD6uHKjeIPJ6Ec' :
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLDi1X5zh-b_ox3q_D5zD6uHKjeIPJ6Ec'
        axios.post(url,authData)
        .then(
        response =>  { 
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        }
        )
        .catch(error => dispatch(authFail(error.response.data.error)));

    }

   
}

export const setAuthRedirectPath = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        const localId = localStorage.getItem('userId')
        if(!token){
            dispatch(logOut());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate>new Date()){
                const authData ={
                    idToken: token,
                    localId: localId
                }
                dispatch(authSuccess(authData))
                dispatch(checkAuthTimeOut((expirationDate.getTime()- new Date().getTime())/1000))
            }else{
                dispatch(logOut());
            }
        }

    }
}