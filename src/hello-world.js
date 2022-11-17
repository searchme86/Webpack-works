import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';

const helloWorldButton = new HelloWorldButton();
const heading = new Heading();

helloWorldButton.render();
heading.render();

if (process.env.NODE_ENV === 'production') {
  console.log('production mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('development mode');
}
