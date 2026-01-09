
export interface DataPoint {
  x: number;
  value: number;
  label?: string;
}

export interface DetailedDataPoint extends DataPoint {
  emotion: string;
}

export type MovieKey = 
  | 'Following'
  | 'Memento'
  | 'Insomnia'
  | 'Batman Begins' 
  | 'The Prestige' 
  | 'The Dark Knight' 
  | 'Inception' 
  | 'The Dark Knight Rises' 
  | 'Interstellar' 
  | 'Dunkirk' 
  | 'Tenet' 
  | 'Oppenheimer';

export interface MovieMetadata {
  year: number;
  boxOffice: number; // in USD
  imdbRating: number;
  genre: string;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
