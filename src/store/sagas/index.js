import {logOutSaga, checkAuthTimeOutSaga, authUserSaga, authCheckStateSaga} from './auth';
import { initIngredientsSaga } from './burgerBuilder'
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
import {takeEvery, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logOutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeOutSaga ),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga)
}