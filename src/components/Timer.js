import React from 'react';
import logo from '../logo.svg';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

export const TimerView = observer(({ timer }) => {
  return (
    <Timer
      time={timer.time}
      isStop={timer.isStop}
      calcTime={timer.calcTime}
      onClick={timer.onClick}
    />
  );
});

function Timer({ time, isStop, calcTime, onClick }) {
  return (
    <div>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{
          animation: `App-logo-spin infinite 1500s linear ${
            isStop ? 'paused' : 'running'
          }`
        }}
      />
      <p className="App-color timer-font">{calcTime(time)}</p>
      <button className="switch-bottom " onClick={onClick}>
        {isStop ? 'Start' : 'Stop'}
      </button>
    </div>
  );
}

const POMODORO_TIME = 60 * 25;
export class TimerModel {
  @observable time = POMODORO_TIME;
  @observable isStop = true;

  constructor() {
    this.isBreak = false;
    this.pomoTime = POMODORO_TIME;
    this.breakTime = 60 * 5;
    this.intervalId = null;
  }

  @action
  onClick = () => {
    if (this.isStop) {
      this.start();
    } else {
      this.stop();
    }
  };

  calcTime = time => {
    const totalSeconds = time;
    const minutes = (totalSeconds / 60) >> 0;
    const seconds = totalSeconds % 60;
    return [minutes, seconds]
      .map(value => String(value < 10 ? '0' + value : value))
      .join(':');
  };

  start = () => {
    this.isStop = false;
    this.intervalId = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.switchContext(this.isBreak);
        this.isBreak = !this.isBreak;
      }
    }, 1000);
  };

  switchContext = isBreak => {
    this.stop();
    if (isBreak) {
      this.time = this.pomoTime;
    } else {
      this.time = this.breakTime;
    }
  };

  stop = () => {
    this.isStop = true;
    clearInterval(this.intervalId);
  };
}
