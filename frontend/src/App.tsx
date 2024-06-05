import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useHook } from './useHook'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Child title={"Hello"}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

interface ChildProps {
  title: string;
}

const Child: React.FC<React.PropsWithChildren<ChildProps>> = ({title}) => {
  const { result, error, loading } = useHook()
  const [counter, setCounter] = useState(0)

  if (loading) {
    <></>
  }

  return (
    <>
      <h1>{title}</h1>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter => counter + 1)}>Increment</button>
      <h1>{result}</h1>
    </>
  )
}

export default App;
