import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Timer } from './timer.model';

@Injectable({providedIn: 'root'})
export class TimerService {
    private initialTimer: Timer = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    private updateTimer = new Subject<{
        time: Timer,
        isRun: boolean,
    }>();

    private timer = null;

    getInitialTime() {
        return this.updateTimer.next({ time: this.initialTimer, isRun: false });
    }

    getTimerUpdateListener() {
        return this.updateTimer.asObservable();
    }

    runTimer() {
        let {
            seconds,
            minutes,
            hours,
        } = this.initialTimer
        if (seconds === 59 && minutes === 59) {
            hours += 1;
            minutes = 0;
            seconds = 0
        } else if(seconds === 59) {
            minutes += 1;
            seconds = 0;
        } else {
            seconds +=1
        }

        console.log('this.initialTimer  ', this.initialTimer)
    }

    startTimer() {
        this.timer = setInterval( this.runTimer() , 1000);
    }
}