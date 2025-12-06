
export interface DataPoint {
  x: number;
  value: number;
  label?: string;
}

export interface DetailedDataPoint extends DataPoint {
  emotion: string;
}

export type MovieKey = 
  | 'Batman Begins' 
  | 'The Prestige' 
  | 'The Dark Knight' 
  | 'Inception' 
  | 'The Dark Knight Rises' 
  | 'Interstellar' 
  | 'Dunkirk' 
  | 'Tenet' 
  | 'Oppenheimer';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
