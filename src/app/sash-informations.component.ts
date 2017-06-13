import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SashInformations } from './sash-informations';

@Component({
  selector: 'sash-informations',
  template: `
  <ul class="color-display">
       <li *ngFor="let item of sashInformations.initialColors" [ngStyle]="{'background-color': item.value}"></li>
  </ul>
  
  <ul>
    <li *ngFor="let item of sashInformations.initialColors">
      <input [(colorPicker)]="item.value" [style.background]="item.value" [value]="item.value"/>
    </li>
  </ul>
  `,
  styles: [
    'ul.color-display { list-style-type:none; }',
    'ul.color-display li {display: inline-block; width: 5px; height: 10px; border-width:1px; border-color:black; border-style:solid;}'
  ]
})

export class SashInformationsComponent {
  @Input() sashInformations: SashInformations;
  @Output() sashInformationsChange = new EventEmitter<SashInformations>();

  constructor () {
    this.sashInformationsChange.emit(this.sashInformations);
  }
}
