import React, {Component} from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
      state ={
          error: null
      }
      componentDidMount(){
          axios.interceptors.response.use(res=> res, error=>{
                this.setState({error: error});
          })
          axios.interceptors.request.use((request)=>{
            this.setState({error: null});
            return request;
          })
            
      }
      errorHandler =()=>{
        this.setState({error:null})
      }
      
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} clicked={this.errorHandler}>{this.state.error? this.state.error.message: null}</Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
