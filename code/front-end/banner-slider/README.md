<div align="center">
    <img src="src/assets/demo.2.gif" title="Demo Ui component Banner Slider" alt="Demo Ui component Banner Slider">
</div>

## About

Ui component totally reusable and configurable, without any additional libraries or frameworks.  

:globe_with_meridians: __Demo page__: :point_right: [here](https://chen-zhenn.github.io/ui-components/banner-slider)
### Features   

:ballot_box_with_check: __Configurable__ 

:ballot_box_with_check: __Reusable__
   
:ballot_box_with_check: __Responsive__      

### How use

__1.__ Create a instance of class Slider passing the following parameters:

__wrap__: A selector container to slider.  
__items__: A array of object containing elements to banner as image, dimensions and etc.  
__time__: A number to timer of slider.  

**i.e**:

```
const items = [{
    image: "image-path/file",
    title: "image title",
    desc: "image description",
    width: 1920,
    height: 960,
    order: 1
},{...}]

const slide = new Slider($wrap, items, 3);
```


__2.__ Call the method which animate slider

```
...
slide.animate()
```

## :boom: Boom!

### :rocket: Installation

In root project folder from **banner-slider**.

Make a copy renaming the file tsconfig.json.sample to tsconfig.json.

To Linux: `cp tsconfig.json.sample tsconfig.json`

Run scripts:

```
yarn install
yarn dev
```

__Production__:

```
yarn build
``` 

### :stuck_out_tongue_winking_eye: That's all folks!
