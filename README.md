# action type 정의하기

- 문자열 내용: 'module 이름/action 이름'
- 프로젝트가 커졌을 때 action 이름이 충돌되지 않게 한다.

```
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```

<br/>

> [17.3.1.1] 액션 타입 정의하기

# Container Component

- Redux store와 연동된 component.

- Component에서 redux store에 접근하여 원하는 state를 받아 오고, action도 dispatch한다.

<br/>

> [17.5] 컨테이너 컴포넌트 만들기

# mapStateToProps / mapDispatchToProps

```
connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
```

### mapStateToProps

Redux store 안의 state를 component의 props로 넘겨주기 위해 설정하는 함수.

### mapDispatchToProps

action 생성 함수를 component의 props로 넘겨주기 위해 사용하는 함수.

<br/>

- connect 함수를 호출하고 나면 또 다른 함수를 반환한다. 반환된 함수에 component를 parameter로 넣어 주면 redux와 연동된 component가 만들어진다.

<br/>

> [17.5.1] CounterContainer 만들기

# connect로 mapStateToProps , mapDispatchToProps 엮어주기

1. mapStateToProps, mapDispatchToProps 사용

```
const mapStateToProps = state => ({
  number: state.counter.number,
});
const mapDispatchToProps = dispatch => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
```

<br/>

2. bindActionCreators 사용

```
import { bindActionCreators } from 'redux';

export default connect(
  (state) => ({
    number: state.counter.number
  }),
  (dispatch) =>
    bindActionCreators(
      {
        increase,
        decrease
      },
      dispatch
    )
)(CounterContainer);

```

<br/>

3. mapDispatchToProps에 해당하는 두번째 parameter를 함수 아닌 객체 형태로 입력

- 두 번째 parameter를 아예 객체 형태로 넣어 주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신해준다.

```
import { bindActionCreators } from 'redux';

export default connect(
  (state) => ({
    number: state.counter.number
  }),
  (dispatch) =>
    bindActionCreators(
      {
        increase,
        decrease
      },
      dispatch
    )
)(CounterContainer);

```

<br/>

> [17.5.1] CounterContainer 만들기

# Redux-actions 라이브러리

1. createAction으로 만든 액션 생성 함수는 parameter로 받아 온 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라 action.id, action.todo와 같이 action.payload라는 이름을 공통적으로 넣어준다.

<br/>

액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용하기 때문에 action.id, action.todo 대신, 공통적으로 action.payload 값을 조회하도록 reducer를 구현해야 한다.

```
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
    [INSERT]: (state, action) => ({
      ...state,
      todos: state.todos.concat(action.payload)
    }),
    [TOGGLE]: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      )
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload)
    })
  },
  initialState
);

export default todos;
```

2. action.payload 객체 비구조화 할당

<br/>

action.payload가 정확히 어떤 값을 의미하는지 더 쉽게 파악할 수 있다.

```
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id = = = id ? { ...todo, done: !todo.done } : todo,
      ),
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id != = id),
    }),
  },
  initialState,
);

export default todos;
```

<br/>

> [17.6.2] todos 모듈에 적용하기

# connect / useSelector, useDispatch

### connect

```
import { connect } from 'react-redux';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default connect(
  (state) => ({
    number: state.counter.number
  }),
  {
    increase,
    decrease
  }
)(CounterContainer);

```

### useSelector, useDispatch

```
import { useSelector, useDispatch } from 'react-redux';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increase())}
      onDecrease={() => dispatch(decrease())}
    />
  );
};

export default CounterContainer;

```

<br/>

> [17.7.1] useSelector로 상태 조회하기,
> [17.7.2] useDispatch를 사용하여 액션 디스패치하기
