import Dog from './Dog.js';
import ShelterDog from './ShelterDog.js';
import { add, multiply, divide } from './utils.js';

console.log('from index files');

const elton = new Dog('elton', 'Aussie', 0.5);
elton.bark();

console.log(add(4, 5));
console.log(multiply(4, 5));
console.log(divide(10, 2));

const buffy = new ShelterDog('Buffy', 'Pitbull', 5, 'Desert Spring Shelter');
