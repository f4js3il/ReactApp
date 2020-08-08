import React from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../Hoc/Auxiliary/Auxiliary';

const modal =(props)=>{
    //  shouldComponentUpdate(nextProps, nextState){
    //     return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    //  }

  
        return(
            <Aux>
            <BackDrop show={props.show} purchaseCancel={props.clicked}/>
            <div className={classes.Modal}
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show? '1' : '0'
            }} >
                {props.children}
            </div>
            </Aux>
        );
    
}

export default React.memo(modal,(prevProps, nextProps)=> (nextProps.show === prevProps.show) || (nextProps.children === prevProps.children));
