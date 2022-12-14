import { Iitems, Islide } from "./interfaces";

export abstract class Slide implements Islide {
  itemsList: Iitems[];
  time: number = 3.5;

  index: number = 0;
  slideinterval: number = 0;
  translate: number = 0;
  progressTimer: number = 0;
  state: number = 1

  container: HTMLElement;

  constructor(itemsList: Iitems[], time: number) {
    this.container = document.createElement("div");
    this.itemsList = itemsList;
  }

  public pause(): void {
    const state = this.setPaused()
    clearInterval(this.slideinterval);
    this.setState(state)
  }

  public play(): void {
    const state = this.setPlaying()
    this.animate();
    this.setState(state)
  }

  public next(): void {
    const state = this.state
    const $container = this.container;
    const images = this.itemsList;
    const elemIndex = `${$container.getAttribute("data-index")}`;
    const index =
      this.index == parseInt(elemIndex) ? this.index : parseInt(elemIndex);
    const nextIndex = index + 1 < images.length ? index + 1 : images.length - 1;
    const progressTimer = nextIndex / (images.length - 1);

    if(!state) return

    clearInterval(this.slideinterval);
    this.setIndex(nextIndex);
    this.setTranslate();
    this.move();
    this.setProgressTimer(progressTimer);
    this.renderProgressBar(progressTimer);
    this.setNavActive(nextIndex);
    this.setItemActive(nextIndex);
    this.animate();
  }

  public prev(): void {
    const state = this.state
    const $container = this.container;
    const images = this.itemsList;
    const elemIndex = `${$container.getAttribute("data-index")}`;
    const index =
      this.index == parseInt(elemIndex) ? this.index : parseInt(elemIndex);
    const prevIndex = index ? index - 1 : 0;
    const progressTimer = prevIndex / (images.length - 1);

    if(!state) return

    clearInterval(this.slideinterval);
    this.setIndex(prevIndex);
    this.setTranslate();
    this.move();
    this.setProgressTimer(progressTimer);
    this.renderProgressBar(progressTimer);
    this.setNavActive(prevIndex);
    this.setItemActive(prevIndex);
    this.animate();
  }

  public nav(index?: number | null): void {
    const state = this.state
    const navIndex = parseInt(`${index}`);
    const images = this.itemsList;
    const progressTimer = navIndex / (images.length - 1);

    if(!state) return

    clearInterval(this.slideinterval);
    this.setIndex(navIndex);
    this.setTranslate();
    this.move();
    this.setProgressTimer(progressTimer);
    this.renderProgressBar(progressTimer);
    this.setNavActive(navIndex);
    this.setItemActive(navIndex);
    this.animate();
  }

  animate(): void {
    const self = this;
    const $container = this.container;
    const images = this.itemsList;
    const widthContainer = images.length * 100;
    const time = this.time * 1000;

    const slideInterval = setInterval(start, time);
    this.slideinterval = slideInterval;

    let currentIndex = this.index;

    function start() {
      currentIndex < images.length - 1
        ? (currentIndex = currentIndex + 1)
        : (currentIndex = 0);
      const progressTimer = currentIndex / (images.length - 1);

      self.setIndex(currentIndex);
      self.setTranslate();
      self.move();
      self.setProgressTimer(progressTimer);
      self.renderProgressBar(progressTimer);
      self.setNavActive(currentIndex);
      self.setItemActive(currentIndex);
    }
  }

  setIndex(index: number = this.index): void {
    this.index = index;
  }

  setTranslate(translate: number = this.translate) {
    const images = this.itemsList;
    const currentIndex = this.index;
    const translated = (currentIndex / images.length) * 100;

    this.translate = translated;
  }

  move(index: number = this.index, translate: number = this.translate) {
    const $container = this.container;
    const images = this.itemsList;

    $container.setAttribute("data-index", index.toString());
    $container.style.transform = `translate3d(-${translate}%,0,0)`;
  }

  setProgressTimer(progress: number): void {
    this.progressTimer = progress;
  }

  setState(state:number): void {
    this.state = state
  }

  abstract renderProgressBar(n: number): void;

  abstract setNavActive(index: number | string): void;

  abstract setItemActive(index: number | string): void;

  abstract setPaused(): number

  abstract setPlaying(): number
}
