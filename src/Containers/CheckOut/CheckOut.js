import React,{Component} from 'react';
import CheckOutSummary from '../../Components/CheckOutSummary/CheckOutSummary';
import ContactData from '../CheckOut/ContactData/ContactData';
import {Route} from 'react-router-dom';

class CheckOut extends Component{
    state={
        ingredients:null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1];

            }else{
            ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients ,price: price})
    }

    checkOutContinueHandler=()=>{
        this.props.history.replace('checkout/contact-data');
    }
    checkOutCancelHandler=()=>{
        this.props.history.goBack();
    }

    render(){
        console.log('props in checkOut are', this.props);
        return(
            <div>
            <CheckOutSummary 
            ingredients={this.state.ingredients}
            checkOutContinued={this.checkOutContinueHandler}
            checkOutCancelled={this.checkOutCancelHandler}/>
           <Route path={this.props.match.path+'/contact-data'} 
           render={(props)=>(<ContactData 
            ingredients={this.state.ingredients}
            price={this.state.price}
            {...props}/>)}/>
            </div>
        );
    }
}

export default CheckOut;