import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Timer } from './timer.model';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timer: Timer = {
      hours: 0,
      minutes: 0,
      seconds: 0,
  };
  isRun: boolean = false;
  private timerSub: Subscription;

  constructor(public timerService: TimerService) { }

  ngOnInit() {
    this.timerSub = this.timerService.getTimerUpdateListener()
    .subscribe(data => {
      const { time, isRun } = data;
      for (const timeItems in time) {
        if(time[timeItems].toString().length === 1) {
          time[timeItems] = "0" + time[timeItems];
        } else {
          time[timeItems] = time[timeItems].toString();
        }
      }
      this.timer = time;
      this.isRun = isRun;
    })
    this.timerService.getInitialTime();
  }

  onStartStop(startStop) {
    if(startStop === 'start') {
      this.timerService.startTimer();
    } else {

    }
  }

  onWait() {
    console.log('onWait');
  }

  onReset() {
    console.log('onReset');
  }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
  }
  
}
