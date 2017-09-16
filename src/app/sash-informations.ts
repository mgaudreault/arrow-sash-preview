export class ColorInfo extends Object {
  value: string;
  repeat: number;
}

export class StepInfo extends Object {
  value: number;
}

export class SashInformations {
  initialColors : Array<ColorInfo>;
  initialActions: Array<StepInfo>;
  loopBack: number;
  blur: number;
}
