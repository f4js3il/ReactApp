import React from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
  return props=> { 
    const[error, clearError ] = useHttpErrorHandler(axios);
      return (
        <Aux>
          <Modal show={error} clicked={clearError}>
            {error ? error.message : null}
          </Modal>
          <WrapperComponent {...props} />
        </Aux>
      );
    
  };
};

export default withErrorHandler;
