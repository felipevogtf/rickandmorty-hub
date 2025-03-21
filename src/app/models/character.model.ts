export interface Character{
  id: number;
  name: string;
  status: 'alive' | 'dead' | 'unknown';
  species: string;
  type: string;
  gender: 'famale' | 'male' | 'genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharacterFilter = Partial<Pick<Character, 'name' | 'status' | 'species' | 'type' | 'gender'>>;
