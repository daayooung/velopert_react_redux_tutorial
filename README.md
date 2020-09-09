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

# Container Component

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
