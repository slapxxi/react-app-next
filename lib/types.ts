export type ID = string;

export interface FirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface UserSettings {
  useDarkMode: boolean;
}

export interface Item {
  id: ID;
  title: string;
}

export interface Store {
  items: Item[];
}

export interface DB {
  items: { [id: string]: Item };
}
