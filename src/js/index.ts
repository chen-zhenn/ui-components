import { Slider } from "./banner/Slider.js"

addEventListener("DOMContentLoaded", (e) => {
  const $wrap: HTMLElement | null = document.getElementById("hero");
  init($wrap);
});

function init($wrap: HTMLElement | null): void {

  const items = [
    {
      image: "assets/b-1.jpg",
      title: "Legenda da imagem 1",
      width: 1920,
      height: 960,
      order: 1
    },
    {
      image: "assets/b-2.jpg",
      title: "Legenda da imagem 2",
      width: 1920,
      height: 960,
      order: 2
    },
    {
      image: "assets/b-3.jpg",
      title: "Legenda da imagem 3",
      width: 1920,
      height: 960,
      order: 3
    },
    {
      image: "assets/b-4.jpg",
      title: "Legenda da imagem 4",
      width: 1920,
      height: 960,
      order: 4
    },
  ];

  const slide = new Slider($wrap, items, 3);
  slide.animate();
}
