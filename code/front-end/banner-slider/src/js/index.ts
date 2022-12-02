import { Slider } from "./modules/Slider.js"

addEventListener("DOMContentLoaded", (e) => {
  const $wrap: HTMLElement | null = document.getElementById("hero");
  init($wrap);
});

function init($wrap: HTMLElement | null): void {

  const items = [
    {
      images: {
        base: {
          src: "assets/b-1.jpg",
          width: 1920,
          height: 960
        },
        mobile: {
          src: "assets/b-1-mobile.jpg",
          width: 640,
          height: 900
        }
      },
      title: "Cyberpunk City",
      desc: "A picture is worth a thousand words!",
      order: 1
    },
    {
      images: {
        base: {
          src: "assets/b-2.jpg",
          width: 1920,
          height: 960
        },
        mobile: {
          src: "assets/b-2-mobile.jpg",
          width: 640,
          height: 900
        }
      },
      title: "Lights City",
      desc: "A picture is worth a thousand words!",
      order: 2
    },
    {
      images: {
        base: {
          src: "assets/b-3.jpg",
          width: 1920,
          height: 960
        },
        mobile: {
          src: "assets/b-3-mobile.jpg",
          width: 640,
          height: 900
        }
      },
      title: "Surrealism art",
      desc: "A picture is worth a thousand words!",
      order: 3
    },
    {
      images: {
        base: {
          src: "assets/b-4.jpg",
          width: 1920,
          height: 960
        },
        mobile: {
          src: "assets/b-4-mobile.jpg",
          width: 640,
          height: 900
        }
      },
      title: "Concept art",
      desc: "A picture is worth a thousand words!",
      order: 4
    },
  ];

  const slide = new Slider($wrap, items, 3);
  slide.animate();
}
