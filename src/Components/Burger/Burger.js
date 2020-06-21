import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients =[];
    Object.entries(props.ingredients).forEach(
        (entry)=> {
            for( let i=1; i<=entry[1];i++){
                transformedIngredients.push(<BurgerIngredient key={i+entry[0]} type={entry[0]}/>);
            }
        }
    )
        if(transformedIngredients.reduce((initial, final)=> initial.concat(final),[]).length ===0){
            transformedIngredients = <p>Please add ingredients</p>
        };
    return(
<div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
</div>
    ) 
}


export default burger;

