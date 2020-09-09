import React from 'react';
import CounterContainer from './containers/CounterContaner';
import Todos from './components/Todos';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <br />
      <hr />
      <br />
      <Todos />
    </div>
  );
};

export default App;
