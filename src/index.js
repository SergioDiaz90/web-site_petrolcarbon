import "./styles/index.scss";
import Slider from './js/slider';
import { FormData } from "./js/form";
import SliderClients from "./js/slider-clientes";
import { HandlerNavigation } from "./js/handlerNavigation";
import { AddFiles } from "./js/addFiles";


(function () {
    new Slider ('.slider', true );
    new SliderClients('.sliderVariousImage-content');
    new HandlerNavigation();
    new AddFiles();
    new FormData();
})();
