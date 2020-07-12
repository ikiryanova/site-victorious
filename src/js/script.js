import menuModule from './modules/menu';
import {modalModule} from './modules/modal';
import sliderModule from './modules/slider';
import formsModule from './modules/forms';

window.addEventListener('DOMContentLoaded', function () {

  menuModule();
  modalModule('.close', '.modal', '.modal-open');
  sliderModule();
  formsModule();


});