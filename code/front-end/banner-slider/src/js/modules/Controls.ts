import { Iitems, Icontrols } from "./interfaces";
import { Slide } from "./Slide.js";

export abstract class Controls extends Slide {
  public wrap: HTMLElement | null;

  constructor(wrap: HTMLElement | null, itemsList: Iitems[], time: number) {
    super(itemsList, time);

    this.wrap = wrap;
    this.mountControls();
  }

  mountControls() {
    const self = this;
    const $wrap = this.wrap;
    const itemsList = this.itemsList;
    const $controlWrap = document.createElement("div");
    const $controlProgressBar = document.createElement("div");
    const $controlPrimary = document.createElement("div");
    const $controlSecondary = document.createElement("div");

    const controls: Icontrols[] = [
      {
        type: "prev",
        elem: "div",
        label: "Prev",
        order: 0,
      },
      {
        type: "pause",
        elem: "div",
        label: "Pause",
        order: 1,
      },
      {
        type: "play",
        elem: "div",
        label: "Play",
        order: 2,
      },
      {
        type: "next",
        elem: "div",
        label: "Next",
        order: 3,
      },
    ];

    $controlWrap.setAttribute("id", "controls");
    $controlWrap.setAttribute("class", "banner__control");
    $controlPrimary.setAttribute("class", "banner__control_primary -primary");
    $controlSecondary.setAttribute(
      "class",
      "banner__control_secondary -secondary"
    );
    $controlProgressBar.setAttribute("id", "progress-bar");
    $controlProgressBar.setAttribute("class", "banner__control_progress");

    $controlWrap.insertAdjacentElement("beforeend", $controlProgressBar);
    $controlWrap.insertAdjacentElement("beforeend", $controlPrimary);
    $controlWrap.insertAdjacentElement("beforeend", $controlSecondary);

    $wrap?.insertAdjacentElement("beforeend", $controlWrap);

    for (let item in controls) {
      const $control = document.createElement(`${controls[item].elem}`);
      const $controlLabel = document.createElement("span")

      $control.setAttribute("id", `control-${controls[item].type}`);
      $control.setAttribute(
        "class",
        `banner__control_item -${controls[item].type}`
      );
      $controlLabel.setAttribute("class", "banner__control_label")

      $controlLabel.insertAdjacentHTML("beforeend", controls[item].label);

      $control.insertAdjacentElement("beforeend", $controlLabel);
      $controlPrimary.insertAdjacentElement("beforeend", $control);
    }

    for (let item in itemsList) {
      const $control = document.createElement("span");

      $control.setAttribute("class", `banner__control_item -nav  control-nav`);
      $control.setAttribute("data-index", `${(itemsList[item].order) - 1}`);

      $controlSecondary.insertAdjacentElement("beforeend", $control);
    }

    addEventListener("load", (e) => {
      const $controlWrap = document.getElementById("controls");
      const $controlNav = Array.from(document.querySelectorAll(".control-nav"));
      const $controlPrev = document.getElementById("control-prev");
      const $controlNext = document.getElementById("control-next");
      const $controlPlay = document.getElementById("control-play");
      const $controlPause = document.getElementById("control-pause");

      $controlNav[0].classList.add("active")

      for(let $nav of $controlNav) $nav
        .addEventListener("click", e => {
          const state = $controlWrap?.classList.contains("-paused")
          const navIndex = parseInt(`${$nav.getAttribute("data-index")}`)
          
          if(state) return
          
          self.nav(navIndex)
          $nav.classList.add("active")
        })
      
      $controlPrev?.addEventListener("click", (e) => self.prev());
      $controlNext?.addEventListener("click", (e) => self.next());
      $controlPlay?.addEventListener("click", (e) => self.play());
      $controlPause?.addEventListener("click", (e) => self.pause());

      $controlPrev!.style.transform = `translate3d(0,-${
        $wrap!.clientHeight * 0.5
      }px,0)`;
      $controlNext!.style.transform = `translate3d(0,-${
        $wrap!.clientHeight * 0.5
      }px,0)`;
    });

    addEventListener("resize", (e) => {
      const $controlPrev = document.getElementById("control-prev");
      const $controlNext = document.getElementById("control-next");
      const $controlPlay = document.getElementById("control-play");
      const $controlPause = document.getElementById("control-pause");

      $controlPrev!.style.transform = `translate3d(0,-${
        $wrap!.clientHeight * 0.5
      }px,0)`;
      $controlNext!.style.transform = `translate3d(0,-${
        $wrap!.clientHeight * 0.5
      }px,0)`;
    });
  }

  renderProgressBar(n: number) {
    const $progressBar = document.getElementById("progress-bar");
    const progressTimer = n * 100;

    $progressBar!.style.width = `${progressTimer}%`;
  }

  setNavActive(index:number){
    const $controlNav = Array.from(document.querySelectorAll(".control-nav"))
    for(let $nav of $controlNav) $nav.classList.remove("active")
    $controlNav[index].classList.add("active")
  }

  setPaused(){
    const $controlPause = document.getElementById("controls");
    $controlPause?.classList.add("-paused")
    return 0
  }

  setPlaying(){
    const $controlPause = document.getElementById("controls");
    $controlPause?.classList.remove("-paused")
    return 1
  }
}
