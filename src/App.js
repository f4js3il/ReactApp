import React, { Component } from 'react';
import Layout from './Hoc/Auxiliary/Auxiliary';
import BurgerBuilder from './Containers/BurgerBuilder';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
