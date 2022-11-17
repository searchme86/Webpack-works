import Kiwi from './carrot.png';
import './kiwi-image.scss';

class KiwiImage {
  render() {
    const img = document.createElement('img');
    img.src = Kiwi;
    img.alt = 'kiwi';
    img.classList.add('kiwi-image');

    const bodyDomElement = document.querySelector('body');
    bodyDomElement.appendChild(img);
  }
}

export default KiwiImage;
