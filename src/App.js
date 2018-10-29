import React from 'react';
import { TimerView, TimerModel } from './components/Timer';
import { TodoAppView, TodoAppModel } from './components/TodoApp';
import logo from './logo.svg';
import './App.css';

const todoModel = (window.todoAppModel = new TodoAppModel());
const timerModel = (window.timerModel = new TimerModel());

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TimerView timer={timerModel} />
        <TodoAppView todo={todoModel} />
      </header>
    </div>
  );
};

export default App;
