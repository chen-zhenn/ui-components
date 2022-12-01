import { Iitems } from "./interfaces";
import { Banner } from "./Banner.js";

export class Slider extends Banner {
  constructor(wrap: HTMLElement | null, itemsList: Iitems[], time: number) {
    super(wrap, itemsList, time);
  }
}
