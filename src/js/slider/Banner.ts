import { Controls } from "./Controls.js";
import { Iitems } from "./interfaces";

export abstract class Banner extends Controls {
  public wrap: HTMLElement | null;
  public itemsList: Iitems[];
  public time: number = 3.5;

  public container: HTMLElement;
  private _list: HTMLElement;

  constructor(wrap: HTMLElement | null, itemsList: Iitems[], time: number) {
    super(wrap, itemsList, time);

    this.wrap = wrap;
    this.itemsList = itemsList;
    this.container = document.createElement("div");
    this._list = document.createElement("ul");
    this.mountImages();
  }

  mountImages(): void {
    const itemsList = this.itemsList;
    const $wrap = this.wrap;
    const $container = this.container;
    const $list = this._list;
    const widthContainer = itemsList.length * 100;

    $wrap?.classList.add("banner");
    $container.setAttribute("id", "banner");
    $container.setAttribute("class", "banner__container -image");
    $container.setAttribute("data-index", "0");
    $list.setAttribute("class", "banner__list");

    $container.style.width = `${widthContainer}%`;

    $container.insertAdjacentElement("beforeend", $list);
    $wrap?.insertAdjacentElement("afterbegin", $container);

    for (let item in itemsList) {
      const $li = document.createElement("li");
      const $imageFig = document.createElement("figure");
      const $imageTitle = document.createElement("figcaption");
      const $imgElem = document.createElement("img");

      $li.setAttribute("class", "banner__item");
      $imageFig.setAttribute("class", "banner__content -loading");
      $imageTitle.setAttribute("class", "banner__title");

      $imgElem.setAttribute("src", `${itemsList[item].image}`);
      $imgElem.setAttribute("width", `${itemsList[item].width}`);
      $imgElem.setAttribute("class", "banner__image");
      $imgElem.setAttribute("class", "banner__image");

      $list.insertAdjacentElement("beforeend", $li);
      $imageTitle.insertAdjacentHTML("beforeend", itemsList[item].title);
      $imageFig.insertAdjacentElement("beforeend", $imgElem);
      $imageFig.insertAdjacentElement("beforeend", $imageTitle);
      $li.insertAdjacentElement("beforeend", $imageFig);
    }

    const $images = Array.from(document.querySelectorAll(".banner__image"));

    for (let $image of $images) {
      $image.addEventListener("load", (e: Event) => {
        $image.parentElement?.classList.remove("-loading");
      });
    }
  }
}
