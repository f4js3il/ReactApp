import React, {Component} from 'react';
import Aux from '../Hoc/Auxiliary/Auxiliary';
import Burger from '../Components/Burger/Burger';
import BuildControls from '../Components/Burger/BuildControls/BuildControls';
import Modal from '../Components/UI/Modal/Modal';
import OrderSummary from '../Components/Burger/OrderSummary/OrderSummary';
//import BackDrop from '../Components/UI/BackDrop/BackDrop';
import axios from '../../src/axios-orders';
import Spinner from '../Components/UI/Spinner/Spinner';
import withErrorHandler from '../Hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        price : 3,
        disabledButton: true,
        purchased: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('ingredients.json')
        .then((response)=> 
        this.setState({ingredients:response.data,
            disabledButton: false
        }) )
        .catch(() => this.setState({error:true}))
    }


    removeIngredientHandler=(type)=>{
        const ingredientList= {...this.state.ingredients};
        if(ingredientList[type]<=0){
            return;
        }
        ingredientList[type] = ingredientList[type]-1;
        const updatedPrice = this.state.price - INGREDIENT_PRICES[type];
        this.setState({ingredients:ingredientList,price:updatedPrice})
        this.isButtonDisabled(ingredientList);
    }

   
    addIngredientHandler=(type) =>{
        console.log(this.state.ingredients);
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]= updatedCount;
        const price = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.price + price;
        this.setState({ingredients:updatedIngredients, price:updatedPrice});
       this.isButtonDisabled(updatedIngredients);

    }

    isDisabled=(type)=>{
        const ingredientList = {...this.state.ingredients};
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
        this.setState({disabledButton:count<=0})
    }

    purchaseHandler=()=>{
        this.setState({purchased:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchased:false});
    }
    purchaseContinueHandler=()=>{
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer:{
                name: 'Shalu',
                address:{
                    street: 'McknightRd',
                    zipCode: 55119,
                    country: 'Germany'
                },
                email: 'test@test.com'  
            },
            deliveryMethod: 'fastest'

        }

        axios.post('/orders.json',order)
        .then(()=> {
                this.setState({loading: false, purchased: false})
            })
        .catch(()=> this.setState({loading: false, purchased: false}));
      
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        let orderSummary = null
        let burger = this.state.error?<p>Ingredients cant be loaded </p>: <Spinner/>;
        

        if(this.state.ingredients){
         burger = (
            <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabledInfo = {disabledInfo}
                price={this.state.price}
                disabledButton={this.state.disabledButton}
                purchased= {this.purchaseHandler}/>
            </Aux>
        )
        orderSummary =   <OrderSummary ingredients= {this.state.ingredients}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.price}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
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

export default withErrorHandler(BurgerBuilder, axios);