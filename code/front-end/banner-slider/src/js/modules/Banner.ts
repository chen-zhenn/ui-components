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
    const screenWidth = window.innerWidth
    const deskscreen = screenWidth > 640
    const itemsList = this.itemsList.sort((a,b) => a.order - b.order);
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
      const { base, mobile } = itemsList[item]['images']
      const { title, desc } = itemsList[item]

      const srcImageAttr = deskscreen ? base.src : mobile.src
      const widthImageAttr = deskscreen ? base.width : mobile.width
      const heightImageAttr =  deskscreen ? base.height : mobile.height
      const titleImageAttr = title
      const descImageAttr = desc

      const $li = document.createElement("li");
      const $imageFig = document.createElement("figure");
      const $imageCap = document.createElement("figcaption");
      const $imageTitle = document.createElement("h4");
      const $imageDesc = document.createElement("p");
      const $imgElem = document.createElement("img");

      $li.setAttribute("class", "banner__item");
      $imageFig.setAttribute("class", "banner__content -loading");
      $imageCap.setAttribute("class", "banner__caption");
      $imageTitle.setAttribute("class", "banner__title");
      $imageDesc.setAttribute("class", "banner__desc");

      $imgElem.setAttribute("src", `${srcImageAttr}`);
      $imgElem.setAttribute("width", `${widthImageAttr}`);
      $imgElem.setAttribute("class", "banner__image");
      $imgElem.setAttribute("class", "banner__image");

      $list.insertAdjacentElement("beforeend", $li);
      $imageTitle.insertAdjacentHTML("beforeend", `${titleImageAttr}`);
      $imageDesc.insertAdjacentHTML("beforeend", `${descImageAttr}`);
      $imageCap.insertAdjacentElement("beforeend", $imageTitle);
      $imageCap.insertAdjacentElement("beforeend", $imageDesc);
      $imageFig.insertAdjacentElement("beforeend", $imgElem);
      $imageFig.insertAdjacentElement("beforeend", $imageCap);
      $li.insertAdjacentElement("beforeend", $imageFig);
    }

    const $images = Array.from(document.querySelectorAll(".banner__image"));
    const $bannerItem = Array.from(document.querySelectorAll(".banner__item"))

    addEventListener("load", (e) => $bannerItem[0].classList.add("active"))

    addEventListener("resize", (e) => {
      if(window.innerWidth > 640){
        $images
          .forEach(($el,index) => {
            const { base } =  itemsList[index]['images']
            this.setImageResponsiveAttr($el,base.src,base.width)
        })
      }else {
        $images
          .forEach(($el,index) => {
            const { mobile } =  itemsList[index]['images']
            this.setImageResponsiveAttr($el,mobile.src,mobile.width)
        })
      }
    })

    for (let $image of $images) {
      $image.addEventListener("load", (e: Event) => {
        $image.parentElement?.classList.remove("-loading");
      });
    }
  }

  setItemActive(index:number){
    const $bannerItem = Array.from(document.querySelectorAll(".banner__item"))
    for(let $item of $bannerItem) $item.classList.remove("active")
    $bannerItem[index].classList.add("active")
  }

  private setImageResponsiveAttr(el: Element, src:string,width:number | string): void {
    el.setAttribute("src", src)
    el.setAttribute("width", `${width}`)
  }
}
