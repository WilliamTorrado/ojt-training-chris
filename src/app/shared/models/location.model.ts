export interface Province {
  code: string;
  name: string;
}

export interface TownCity {
  code: string;
  name: string;
  provinceCode?: string;
}

export interface Barangay {
  code: string;
  name: string;
  townCityCode?: string;
}
