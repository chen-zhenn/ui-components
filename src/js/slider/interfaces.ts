export interface Iitems {
  image: string;
  title: string;
  width: number;
  height: number;
  order: number;
}

export interface Icontrols {
  type: string;
  elem: string;
  label: string;
  order: number;
}

export interface Islide {
    container: HTMLElement;
    itemsList: Iitems[];
    time: number;
    index: number;
    slideinterval: number
    translate: number
    progressTimer: number
}

