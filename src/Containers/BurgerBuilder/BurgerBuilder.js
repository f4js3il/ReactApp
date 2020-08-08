import React, { useState, useEffect, useCallback} from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import { useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';


const  burgerBuilder =(props)=>{

   const[purchased,setPurchased]= useState(false);

    const ings = useSelector(state=> state.burgerBuilder.ingredients);
    const price = useSelector(state=> state.burgerBuilder.price);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated= useSelector(state=> state.auth.token!==null);


   const dispatch = useDispatch();
   const onIngredientAdded = (ingName)=> dispatch(actions.addIngredient(ingName));
   const onIngredientRemoved = (ingName)=> dispatch(actions.removeIngredient(ingName));
   const onInitIngredients = useCallback( () => dispatch(actions.initIngredients()),[]);
   const onInitPurchase = ()=>dispatch(actions.purchaseInit());
   const onSetAuthRedirectPath= (path)=> dispatch(actions.setAuthRedirectPath(path));
   
   useEffect(()=>{
       onInitIngredients()},[onInitIngredients]);

//    const isDisabled=(type)=>{
//         const ingredientList = {...props.ingredients};
//         if(ingredientList[type]<=0){
//             return true;
//         }
//         return false;
//     }

  const  isButtonDisabled=(ingredients)=>{
        let count = 0;
        const ingredientList = {...ingredients};
        for (let key in ingredientList){
            count = count+ingredientList[key];
        }

        return count<=0
        //this.setState({disabledButton:count<=0})
    }

  const  purchaseHandler=()=>{
        if(isAuthenticated){
            setPurchased(true);
        }else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }
    }

  const  purchaseCancelHandler=()=>{
      setPurchased(false);
    }

 const   purchaseContinueHandler=()=>{
        onInitPurchase();
        props.history.push('/checkout');
    }


        const disabledInfo = {...ings};
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        let orderSummary = null
        let burger = error?<p>Ingredients cant be loaded </p>: <Spinner/>;
        

        if(ings){
         burger = (
            <Aux>
            <Burger ingredients={ings}/>
            <BuildControls 
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabledInfo = {disabledInfo}
                price={price}
                disabledButton={isButtonDisabled(ings)}
                purchased= {purchaseHandler}
                isAuthenticated={isAuthenticated}/>
            </Aux>
        )
        orderSummary =   <OrderSummary ingredients= {ings}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={price}/>
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }
        return(
            <Aux>
           <Modal show={purchased} clicked={purchaseCancelHandler}>
            {orderSummary}
           </Modal>
            {burger}
            </Aux>
        );
    

}


export default withErrorHandler(burgerBuilder, axios);