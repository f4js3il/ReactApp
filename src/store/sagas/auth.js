import {put, call} from 'redux-saga/effects';
import * as actions from '../actions/index'; 
import { delay } from 'redux-saga/effects';
import axios from 'axios';

export function* logOutSaga(action){
  yield call([localStorage,"removeItem"],"token")
  yield call([localStorage,"removeItem"],"expirationDate")
  yield call([localStorage,"removeItem"],"userId")
  yield put(actions.logOutSucceed());
}

export function* checkAuthTimeOutSaga(action){
 yield delay(action.expirationTime*1000);
 yield put(actions.logOut());
}

export function* authUserSaga(action){
  yield put(actions.authStart())
  const authData ={
      email: action.email,
      password: action.password,
      returnSecureToken: true
  }
  let url = action.isSignUp? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLDi1X5zh-b_ox3q_D5zD6uHKjeIPJ6Ec' :
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLDi1X5zh-b_ox3q_D5zD6uHKjeIPJ6Ec'
 
  try{
    const response = yield  axios.post(url,authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn*1000);
    yield  localStorage.setItem('token',response.data.idToken);
    yield  localStorage.setItem('expirationDate',expirationDate);
    yield  localStorage.setItem('userId',response.data.localId);
    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));
  }catch(error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action){
  const token = yield localStorage.getItem('token');
  const localId = yield localStorage.getItem('userId')
  if(!token){
    yield put(actions.logOut())
  }else{
      const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
      if(expirationDate>new Date()){
          const authData ={
              idToken: token,
              localId: localId
          }
          yield put(actions.authSuccess(authData));
          yield put(actions.checkAuthTimeOut((expirationDate.getTime()- new Date().getTime())/1000))
      }else{
         yield put(actions.logOut());
      }
  }

}