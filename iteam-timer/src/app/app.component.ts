import { Component } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <div class="main">
    <h1>Timer</h1>
    <div class="timer">
      {{hours}}:{{minutes}}:{{seconds}}
    </div>
    <button (click)="startStop()">Start/Stop</button>
    <button (dblclick)="wait()">Wait</button>
    <button (click)="reset()">Reset</button>
  </div>
  `,
  styles: [
    `
      .main {
        width: 300px;
        margin: auto;
        margin-top: 5%;
        padding: 3%;
        text-align: center;
        border: 2px solid yellow;
      }

      .timer {
        font-size: 25px;
        margin: 20px 0;
      }

      button {
        width: 80px;
        height: 30px;
        font-size: 14px;
        background-color: yellow;
        border: 1px solid black;
        border-radius: 2px;
        cursor: pointer;
      }

      button:not(:last-of-type) {
        margin-right: 20px;
      }
    `
  ]
})
export class AppComponent {
  counter$: Observable<number>;
  sub$: Subscription;
  hours: any;
  minutes: any;
  seconds: any;
  time: any;
  toSeconds: number;
  toMinutes: number;
  toHours: number;
  timerPaused: boolean = false;

  constructor() {
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
    this.time = 0;
  }

  subscr() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.counter$ = timer(0, 1000);
    this.sub$ = this.counter$
      .subscribe(t => {
      if(!this.timerPaused) {
        this.toSeconds = this.time % 60;
        this.toMinutes = Math.floor(this.time / 60);
        this.toHours = Math.floor(this.time / (60 * 60));

        this.seconds = (this.toSeconds < 10 ? '0' : '') + this.toSeconds;
        this.minutes = (this.toMinutes < 10 ? '0' : '') + Math.floor(t / 60);
        this.hours = (this.toHours < 10 ? '0' : '') + Math.floor(t / (60 * 60));
        this.time += 1
      }
    });
  }

  unsubscr() {
    this.sub$.unsubscribe();
  }

  // Start/Stop button
  startStop() {
    if (this.hours !== '00' || this.minutes !== '00' || this.seconds !== '00') {
      if (this.timerPaused === true) {
        this.timerPaused = false;
      } else {
        this.time = 0;
        this.unsubscr();
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
      }
    } else { // start
      this.subscr();
    }
  }

  // Wait button
  wait() {
    this.timerPaused = true;
  }

  // Reset button
  reset() {
    this.timerPaused = false;
    this.time = 0;
    this.unsubscr();
    this.subscr();
  }
}
