import React from 'react';
import { TimerView, TimerModel } from './components/Timer';
import { TodoAppView, TodoAppModel } from './components/TodoApp';
import './App.css';

const todoModel = (window.todoAppModel = new TodoAppModel());
const timerModel = (window.timerModel = new TimerModel());

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Daily Pomodoro</h1>
        <TimerView timer={timerModel} />
        <TodoAppView todo={todoModel} />
      </header>
    </div>
  );
};

export default App;
