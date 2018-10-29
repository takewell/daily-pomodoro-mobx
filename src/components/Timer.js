import React from 'react';
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
      <h2>Pomodoro Memo</h2>
      <p>{calcTime(time)}</p>
      <button className="button" onClick={onClick}>
        {isStop ? 'Play' : 'Stop'}
      </button>
    </div>
  );
}

const POMODORO_TIME = 60 * 25;
export class TimerModel {
  @observable
  time = POMODORO_TIME;
  @observable
  isStop = true;
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
