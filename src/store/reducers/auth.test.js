import reducer from './auth';
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer',()=>{
    it('it should return the initial state',()=>{
        expect(reducer(undefined ,{})).toEqual({
            token : null,
            userId : null,
            error: null,
            loading: false,
            authRedirect:'/'
        }

        )
    })

    it('it should store token upon login',()=>{
        expect(reducer({
            token : null,
            userId : null,
            error: null,
            loading: false,
            authRedirect:'/'
        } ,{
                type: actionTypes.AUTH_SUCCESS,
                token : 'user-token',
                userId: 'user-id',
                error: null,
                loading : false
            
        })).toEqual({
            token : 'user-token',
            userId : 'user-id',
            error: null,
            loading: false,
            authRedirect:'/'
        }

        )
    })
})