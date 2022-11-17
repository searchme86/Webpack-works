import Heading from './components/heading/heading.js';
import KiwiImage from './components/kiwi-image/kiwi-image';

const heading = new Heading();
heading.render();
const kiwiImage = new KiwiImage();
kiwiImage.render();

// 'HelloWorldApp/HelloWorldButton'

// 1. HelloWorldApp 은 kiwi dev webpack의, 'remotes'의 HelloWorldApp을 가리킴

// kiwi
//  new ModuleFederationPlugin({
//    name: 'kiwiApp',
//    remotes: {
//      HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
//    },
//  }),

// 2. HelloWorldButton은 hello-world의 webpack dev의 HelloWorldButton을 가리킨다

// hello-button
// new ModuleFederationPlugin({
//   name: 'HelloWorldApp',
//   filename: 'remoteEntry.js',
//   exposes: {
//     './HelloWorldButton':
//       './src/components/hello-world-button/hello-world-button.js',
//   },
// }),

import('HelloWorldApp/HelloWorldButton').then(
  // HelloWorldButtonModule은 hello-world-button.js을 가리킴
  // default로 export 했기 때문에 가능함(export default)
  (HelloWorldButtonModule) => {
    const HelloWorldButton = HelloWorldButtonModule.default;
    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
);
