import carrot from './carrot.png';
import altTxt from './altText.txt';

function addImage() {
  const img = document.createElement('img');
  img.alt = altTxt;
  img.width = 300;
  img.src = carrot;
  const body = document.querySelector('body');
  body.appendChild(img);
}

export default addImage;
