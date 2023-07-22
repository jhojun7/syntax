import React, { useState, memo } from "react";

const Child = memo((props) => {
  let i = 0;
  while (i < 3000000000) i++;
  console.log("render Child");
  return <button onClick={props.onClick}>Child: {props.count}</button>;
});

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // Child 컴포넌트가 memo화 되어있지만 여기서 함수를 넘겨주면서 재렌더링이 다시 된다. (1)
  const onClick = () => {
    setCount2(count2 + 1);
  };

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>App: {count1}</button>
      {/* Child 컴포넌트가 memo화 되어있지만 여기서 함수를 넘겨주면서 재렌더링이 다시 된다. (2) */}
      <Child onClick={onClick} count={count2} />
    </>
  );
}

export default App;
