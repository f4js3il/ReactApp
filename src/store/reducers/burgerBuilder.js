import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  price: 3,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

let updatedIngredients = {};
let updatedIngredient = {};

const addIngredient=(state,actions)=>{
    updatedIngredient = {
        [actions.ingredientName]: state.ingredients[actions.ingredientName] + 1,
      };
      updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      return updateObject(state, {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[actions.ingredientName],
        building: true
      });
}

const removeIngredient=(state,actions)=>{
    updatedIngredient = {
        [actions.ingredientName]: state.ingredients[actions.ingredientName] - 1,
      };
      updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      return updateObject(state, {
        ingredients: updatedIngredients,
        price: state.price - INGREDIENT_PRICES[actions.ingredientName],
        building: true
      });
}

const setIngredient=(state, actions)=>{
    return updateObject(state, {
        ingredients: {
          salad: actions.ingredients.salad,
          bacon: actions.ingredients.bacon,
          cheese: actions.ingredients.cheese,
          meat: actions.ingredients.meat,
          building: false
        },
        price: 3,
        error: false,
      });
}

const fetchIngredientsFailed=(state, actions)=>{
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state,actions); 
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,actions);
    case actionTypes.SET_INGREDIENT: return setIngredient(state,actions);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, actions)
    default:return state;
  }
};

export default reducer;
