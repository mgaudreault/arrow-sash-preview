import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SashInformations, ColorInfo, StepInfo } from './sash-informations';

@Component({
  selector: 'sash-informations',
  template: `

  <h4>Coleurs et répétition de la couleur</h4>
  <ul>
    <li *ngFor="let item of sashInformations.initialColors; index as idx">

      <input [(colorPicker)]="item.value" [style.background]="item.value" [value]="item.value"/>
      <input type="number" [(ngModel)]="item.repeat"/>
      <button (click)="removeColor(idx)">Retirer</button>
    </li>
    <li>
      <input [(colorPicker)]="colorToAdd" [style.background]="colorToAdd" [value]="colorToAdd"/><input type="number" [(ngModel)]="colorRepeat"/><button (click)="addColor()">Ajouter</button>
    </li>
  </ul>
  <h4>Changements de couleurs</h4>
  <ul>
    <li *ngFor="let action of sashInformations.initialActions; index as idx">
      <input type="number" [(ngModel)]="action.value" placeholder="Valeur à ajouter"/> <button (click)="remove(idx)">Retirer</button>
    </li>
    <li>
      <input type="number" [(ngModel)]="toAdd" placeholder="Valeur à ajouter"/> <button (click)="add()">Ajouter</button>
    </li>
  </ul>
  <h4>Nombre de rang avant le retour a zéro du patron</h4>
  <input type="number" [(ngModel)]="sashInformations.loopBack" placeholder="Nombre de rang du plan"/>
  <h4>Force de l'effet de flou</h4>
  <input type="number" [(ngModel)]="sashInformations.blur" placeholder="Effet de flou"/>
  <h4>Chaine de sauvegarde</h4>
  <button (click)="generateString()">Générer</button>
  <textarea [(ngModel)]="currentSash" placeholder=""></textarea>
  <h4>Chaine de chargement</h4>
  <textarea [(ngModel)]="loadString" placeholder="Entrez la chaine sauvegardée."></textarea>
  <button (click)="loadSash()">Charger</button>
  `,
  styles: [
  ]
})

export class SashInformationsComponent {
  @Input() sashInformations: SashInformations;
  @Output() sashInformationsChange = new EventEmitter<SashInformations>();

  toAdd: number;

  colorToAdd: string;
  colorRepeat: number;

  currentSash: string;
  loadString: string;

  constructor () {
    this.sashInformationsChange.emit(this.sashInformations);
  }

  remove (idx: number) {
    this.sashInformations.initialActions.splice(idx,1);
  }

  removeColor (idx: number) {
    this.sashInformations.initialColors.splice(idx, 1);
  }

  add () {
    this.sashInformations.initialActions.push({value: this.toAdd});
    this.toAdd = 0;
  }

  addColor () {
    this.sashInformations.initialColors.push({value: this.colorToAdd, repeat: this.colorRepeat})
    this.colorToAdd = '';
    this.colorRepeat = 0;
  }

  generateString () {
    this.currentSash = JSON.stringify({
      colors: this.sashInformations.initialColors,
      steps: this.sashInformations.initialActions,
      length: this.sashInformations.loopBack
    });
  }

  loadSash () {
    let sashObj = JSON.parse(this.loadString);
    this.sashInformations.initialColors = sashObj.colors;
    this.sashInformations.initialActions = sashObj.steps;
    this.sashInformations.loopBack = sashObj.length;
  }
}
