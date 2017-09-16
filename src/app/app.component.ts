import { Component } from '@angular/core';
import { SashInformations } from './sash-informations';
import { FLAMME_NETTE, ASSOMPTION } from './presets';
let blur = require('./blur');

// const YELLOW = '#FFFF00';
// const GREEN = '#008000';
// const RED = '#FF0000';
// const BLUE = '#ADD8E6';

const YELLOW = {value: '#FFFF00', repeat: 14};
const ORANGE = {value: '#ffa200', repeat: 12};
const RED = {value: '#FF0000', repeat: 12};
const DARKRED = {value: '#7b0000', repeat: 12};
const BLACK = {value: '#000000', repeat: 12}
const BLACK_1 = {value: '#000000', repeat: 1}
const WHITE_1 = {value: '#FFFFFF', repeat: 1}

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <div class='main-flex'>
    <div>
      <h2>Modèles de base</h2>
      <button (click)="setFlame()">Flamme nette</button>
      <button (click)="setAssomption()">Assomption</button>
      <h2>Actions</h2>
      <button (click)="draw()">Dessiner</button>
      <br>
      <sash-informations [(sashInformations)]="sashInformations"></sash-informations>
      <br>
    </div>
    <div>
      <canvas id="canvas" width={{canvasWidth}} height={{canvasHeight}}></canvas>
    </div>
  </div>
  `,
  styles: [
    'div.main-flex {display: flex;}',
    'div.main-flex div {padding: 2em;}'
  ]
})
export class AppComponent  {
  title = 'Planificateur de ceinture fléchée';
  sashInformations: SashInformations = {
    initialColors: [YELLOW, ORANGE, RED, DARKRED, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1, WHITE_1, BLACK_1],
    initialActions: [{value:24},{value:12},{value:12}, {value:12}],
    loopBack: 12,
    blur: 4
  };
  canvasHeight = CANVAS_HEIGHT;
  canvasWidth = CANVAS_WIDTH;

  setFlame () {
    this.sashInformations.initialColors = FLAMME_NETTE.colors;
    this.sashInformations.initialActions = FLAMME_NETTE.actions;
    this.sashInformations.loopBack = FLAMME_NETTE.length;
    this.draw ();
  }

  setAssomption () {
    this.sashInformations.initialColors = ASSOMPTION.colors;
    this.sashInformations.initialActions = ASSOMPTION.actions;
    this.sashInformations.loopBack = ASSOMPTION.length;
    this.draw ();
  }

  draw () {
    let c = <HTMLCanvasElement>document.getElementById('canvas');
    console.log(c);
    let ctx= c.getContext('2d');


    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.transform(1,0.4,0,1,0,0);

    let offset = 1;
    // let offset = 0;

    // Define initial line
    let initialLine = [];

    for (let i = 0; i < this.sashInformations.initialColors.length; i++) {
      for (let j = 0; j < this.sashInformations.initialColors[i].repeat; j++) {
        initialLine.push(this.sashInformations.initialColors[i].value);
      }
    }

    // Initial draw
    for (let i = 0; i < initialLine.length; i = i+(1+offset)) {
      ctx.fillStyle=initialLine[i];
      ctx.fillRect(0+(i/(1+offset))*5,0,5,10);
    }

    // Define inital actions
    let initalActions = []
    for (let i = 0; i < this.sashInformations.initialActions.length; i++) {
      initalActions.push(this.sashInformations.initialActions[i].value);
    }

    // Basic init
    var currentLine = initialLine;
    var nextLine = [];
    var currentMove = 0;
    var currentChanges = initalActions;
    var currentStop = currentChanges[0];
    var stepsBeforeLoopback = this.sashInformations.loopBack;

    // console.log(currentChanges);

    //Do next line
    for (var line = 1; line < 80; line++) {
       var trameColor = currentLine[0];
       for (var i = 0; i < currentLine.length; i++) {
          if (i === currentLine.length - 1) {
             console.log('End of line');
             ctx.fillStyle=trameColor;
            // ctx.fillStyle=currentLine[i+1];
          }
          // else if (i !== currentChanges[currentMove]) {
          else if (i !== currentStop) {
            //  console.log('Normal' + currentLine[i+1]);
             ctx.fillStyle=currentLine[i+1];
          } else {
            //  console.log('Switch');
             ctx.fillStyle=trameColor;
             trameColor = currentLine[i+1];
             currentMove++;
             if (currentMove < currentChanges.length) {
               currentStop += currentChanges[currentMove];
              //  console.log('Color chage to: ' + trameColor);
              //  console.log('Change at ' + currentStop);
             }
          }
          nextLine.push(ctx.fillStyle);
          if(i%(1+offset) === 0) {
            ctx.fillRect(0+(i/(1+offset))*5,0+line*10,5,10);
          }
       }
       currentLine = nextLine;
       nextLine = [];
       stepsBeforeLoopback--;
       if (stepsBeforeLoopback !== 0) {
          var nextChanges = [];
          nextChanges = currentChanges.slice(0);
          nextChanges[0] =  nextChanges[0]-2;
          currentChanges = nextChanges;
       } else {
          currentChanges = initalActions.slice(0);
          stepsBeforeLoopback = this.sashInformations.loopBack;
       }

       currentMove = 0;
       currentStop = currentChanges[0];
      //  console.log(currentChanges);
      //  console.log(stepsBeforeLoopback);
    }
    blur.stackBlurCanvasRGB('canvas', 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, this.sashInformations.blur);
  }
}
