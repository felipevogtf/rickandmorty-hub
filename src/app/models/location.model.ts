export interface Location{
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type LocationFilter = Partial<Pick<Location, 'name' | 'type' | 'dimension'>>;