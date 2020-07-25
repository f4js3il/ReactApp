import React, {Component} from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';



export class BurgerBuilder extends Component{

    

    state = {
        purchased: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    isDisabled=(type)=>{
        const ingredientList = {...this.props.ingredients};
        if(ingredientList[type]<=0){
            return true;
        }
        return false;
    }

    isButtonDisabled=(ingredients)=>{
        let count = 0;
        const ingredientList = {...ingredients};
        for (let key in ingredientList){
            count = count+ingredientList[key];
        }

        return count<=0
        //this.setState({disabledButton:count<=0})
    }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
        this.setState({purchased:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchased:false});
    }
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        let orderSummary = null
        let burger = this.props.error?<p>Ingredients cant be loaded </p>: <Spinner/>;
        

        if(this.props.ings){
         burger = (
            <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabledInfo = {disabledInfo}
                price={this.props.price}
                disabledButton={this.isButtonDisabled(this.props.ings)}
                purchased= {this.purchaseHandler}
                isAuthenticated={this.props.isAuthenticated}/>
            </Aux>
        )
        orderSummary =   <OrderSummary ingredients= {this.props.ings}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price}/>
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }
        return(
            <Aux>
           <Modal show={this.state.purchased} clicked={this.purchaseCancelHandler}>
            {orderSummary}
           </Modal>
            {burger}
            </Aux>
        );
    }

}
const mapStateToProps = (state)=>{
    return{
       ings: state.burgerBuilder.ingredients,
       price: state.burgerBuilder.price,
       error: state.burgerBuilder.error,
       isAuthenticated: state.auth.token!==null
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));