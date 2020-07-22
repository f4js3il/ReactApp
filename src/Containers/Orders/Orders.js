import React,{Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
    }

render(){
    let orders = <Spinner/>;
    if(!this.props.loading){
        orders =  this.props.orders.map(order=><Order
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price.toFixed(2)}/>)
    }
    return(<div>
        {orders}
    </div>);
}
}

const mapStateToProps= (state)=>{
    return{
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onFetchOrders: (token)=>dispatch(actions.fetchOrders(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders, axios));