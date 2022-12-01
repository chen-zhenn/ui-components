import { Slider } from "./modules/Slider.js"

addEventListener("DOMContentLoaded", (e) => {
  const $wrap: HTMLElement | null = document.getElementById("hero");
  init($wrap);
});

function init($wrap: HTMLElement | null): void {

  const items = [
    {
      image: "assets/b-1.jpg",
      title: "Cyberpunk City",
      desc: "A picture is worth a thousand words!",
      width: 1920,
      height: 960,
      order: 1
    },
    {
      image: "assets/b-2.jpg",
      title: "Lights City",
      desc: "A picture is worth a thousand words!",
      width: 1920,
      height: 960,
      order: 2
    },
    {
      image: "assets/b-3.jpg",
      title: "Surrealism art",
      desc: "A picture is worth a thousand words!",
      width: 1920,
      height: 960,
      order: 3
    },
    {
      image: "assets/b-4.jpg",
      title: "Concept art",
      desc: "A picture is worth a thousand words!",
      width: 1920,
      height: 960,
      order: 4
    },
  ];

  const slide = new Slider($wrap, items, 3);
  slide.animate();
}
