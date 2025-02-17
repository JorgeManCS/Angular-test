export interface Song {
    id?: number;
    title: string;
    artist: number | number[];
    poster: string;
    genre: string | string[] | any;
    company?: number | number[] | null;
    country: string;
    year: number;
    rating?: number;
  }
  