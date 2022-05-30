export interface IPin {
  pin_1: number;
  pin_2: number;
}

export type Pin1 = Omit<IPin, 'pin_2'>;
export type Pin2 = Omit<IPin, 'pin_1'>;
