export interface imageAttr {
  src: string
  width: number
  height: number
}
export interface images {
  base: imageAttr;
  mobile: imageAttr
}

export interface Iitems {
  images: images;
  title: string;
  desc: string;
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

