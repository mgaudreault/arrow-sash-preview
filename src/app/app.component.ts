import { Component } from '@angular/core';
import { SashInformations } from './sash-informations';

// const YELLOW = '#FFFF00';
// const GREEN = '#008000';
// const RED = '#FF0000';
// const BLUE = '#ADD8E6';

const YELLOW = {value: '#FFFF00'};
const GREEN = {value: '#008000'};
const RED = {value: '#FF0000'};
const BLUE = {value: '#ADD8E6'};


@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
    <sash-informations [(sashInformations)]="sashInformations"></sash-informations>
    {{sashInformations | json}}
    <button (click)="draw()">Draw</button>
    <canvas id="canvas" width="300" height="300"></canvas>
  `,
})
export class AppComponent  {
  title = 'Arrow sash preview';
  sashInformations: SashInformations = {
    initialColors: [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, RED, RED, RED, RED, RED, RED, GREEN, GREEN, GREEN, GREEN, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW],
    initialActions: [9,6,4],
    loopBack: 4,
    bob: 'black'
  };

  draw () {
    let obj = {
       colors: ['lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue', 'red', 'red', 'red','red', 'red', 'red', 'green', 'green', 'green', 'green','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
       colorChanges: [9,6,4],
       loopBack: 4
    }
    let c = <HTMLCanvasElement>document.getElementById('canvas');
    console.log(c);
    let ctx= c.getContext('2d');
    ctx.transform(1,0.4,0,1,0,0);

    // Initial draw
    for (var i = 0; i < this.sashInformations.initialColors.length; i++) {
       ctx.fillStyle=this.sashInformations.initialColors[i].value;
       ctx.fillRect(0+i*5,0,5,10);
    }

    var currentLine = this.sashInformations.initialColors;
    var nextLine = [];
    var currentMove = 0;
    var currentChanges = obj.colorChanges.slice(0);
    var currentStop = currentChanges[0];
    var stepsBeforeLoopback = obj.loopBack;
    console.log(currentChanges);

    //Do next line
    for (var line = 1; line < 10; line++) {
       var trameColor = currentLine[0].value;
       for (var i = 0; i < currentLine.length; i++) {
          if (i === currentLine.length - 1) {
             console.log('End of line');
             ctx.fillStyle=trameColor;
          }
          // else if (i !== currentChanges[currentMove]) {
          else if (i !== currentStop) {
             console.log('Normal' + currentLine[i+1]);
             ctx.fillStyle=currentLine[i+1].value;
          } else {
             console.log('Switch');
             ctx.fillStyle=trameColor;
             trameColor = currentLine[i+1].value;
             currentMove++;
             currentStop += currentChanges[currentMove];
             console.log('Color chage to: ' + trameColor);
             console.log('Change at ' + currentStop);
          }
          nextLine.push({value: ctx.fillStyle});
          ctx.fillRect(0+i*5,0+line*10,5,10);
       }
       currentLine = nextLine;
       nextLine = [];
       stepsBeforeLoopback--;
       if (stepsBeforeLoopback !== 0) {
          var nextChanges = [];
          nextChanges = currentChanges;
          nextChanges[0] =  nextChanges[0] -2;
          currentChanges = nextChanges;
       } else {
          currentChanges = obj.colorChanges.slice(0);
          stepsBeforeLoopback = obj.loopBack;
       }

       currentMove = 0;
       currentStop = currentChanges[0];
       console.log(currentChanges);
       console.log(obj.colorChanges);
       console.log(stepsBeforeLoopback);
    }
  }
}
