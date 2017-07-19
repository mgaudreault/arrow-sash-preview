class ColorInfo {
  value: string;
  repeat: number;
}

class StepInfo {
  value: number;
}

export class SashInformations {
  initialColors : Array<ColorInfo>;
  initialActions: Array<StepInfo>;
  loopBack: number;
}
