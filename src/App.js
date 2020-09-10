import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <br />
      <hr />
      <br />
      <TodosContainer />
    </div>
  );
};

export default App;
