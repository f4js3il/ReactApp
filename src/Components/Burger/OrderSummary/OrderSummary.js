import React,{Component} from 'react';
import Aux from '../../../Hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component{
  render(){
    const  ingredientList = Object.keys(this.props.ingredients).map(
      (ingredientKey)=>{
         return <li key={ingredientKey}>
           <span style={{textTransform:'capitalize'}}>{ingredientKey}: </span>
           {this.props.ingredients[ingredientKey]}</li>
      });
    return(
    <Aux>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients</p>
    <ul>
    {ingredientList}
    </ul>
    <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
    <Button btnType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
    </Aux>
    )
  }

  }




export default OrderSummary;