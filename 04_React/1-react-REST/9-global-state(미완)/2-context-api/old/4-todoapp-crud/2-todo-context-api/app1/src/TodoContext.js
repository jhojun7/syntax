import React, { useReducer, createContext, useContext, useRef } from 'react'

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
]

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo)
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// 2. Context 만들기(1) : state와 dispatch를 Context 통하여 다른 컴포넌트에서 바로 사용 할 수 있게 해준다.
// 하나의 Context 를 만들어서 state 와 dispatch를 함께 넣어주는 대신, 두개의 Context를 만들어서 따로 따로 넣어준다.
// 이렇게 하면 dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지할 수 있고, 사용 과정도 더 편리해진다.
const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
// nextId 값 관리하기 : state를 위한 Context와 dispatch를 위한 Context에 더해, nextId 값을 위한 Context를 만들기
const TodoNextIdContext = createContext()

// 1. Reducer 만들기 : useReducer를 사용하여 상태를 관리하는 TodoProvider 컴포넌트 만들기
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos)
  // nextId : 새로운 항목을 추가 할 때 사용 할 고유 ID이다. 이 값은 useRef를 사용하여 관리한다.
  const nextId = useRef(5)

  return (
    // 2. Context 만들기(2) : 아래의 코드를 통해 알 수 있듯이, App 내의 컴포넌트를 전부 Provider로 감싸야 쓸 수 있다.
    /*
      사용방법은, 
      Context에서 사용 할 값을 지정 할 때 아래처럼 Provider 컴포넌트를 렌더링하고 value를 설정해주고,
      props 로 받아온 children 값을 내부에 렌더링하면 된다.
      그 후, 다른 컴포넌트에서 state 나 dispatch를 다음처럼 사용하면 된다.

      > src/components/Sample.js

      import React, { useContext } from 'react'
      import { TodoStateContext, TodoDispatchContext } from '../TodoContext'

      function Sample() {
        const state = useContext(TodoStateContext)
        const dispatch = useContext(TodoDispatchContext)
        return <div>Sample</div>
      }
    */
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

// 3. Custom Hook 만들기 : 컴포넌트에서 useContext를 직접 사용하는 대신, useContext를 사용하는 커스텀 Hook 만들기
/* 
  이렇게 해주면 나중에 이렇게 사용 할 수 있다. 조금 더 사용성이 편하다.

  > src/components/Sample.js

  import React from 'react'
  import { useTodoState, useTodoDispatch } from '../TodoContext'

  function Sample() {
    const state = useTodoState()
    const dispatch = useTodoDispatch()
    return <div>Sample</div>
  }

  물론, 취향에 따라 useContext를 컴포넌트에서 바로 사용해도(아래를 쓰지 않고 2번 주석의 방식으로 구현해도) 상관은 없다. 
*/
export function useTodoState() {
  return useContext(TodoStateContext)
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext)
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext)
}
