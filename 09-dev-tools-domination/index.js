// Console

// Regular
console.log('hello');

// Interpolated
console.log('Hello I am a %s string!', '💩');

// Styled
console.log('%c I am some great text', 'background:red;');

// Warning
console.warn('OH NOOO');

// Error
console.error('Shit!');

// Info
console.info('Crocodiles eat 3-4 people per year');

// Testing
const var1 = 1;
const var2 = 2;

console.assert(var1 !== var2, 'That is wrong!');

// Clearing
/* console.clear(); */

// Viewing DOM Elements
const $paragraph = document.querySelector('p');

console.log($paragraph); // The element itself
console.dir($paragraph); // Element properties

// Grouping together
const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 },
];

dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// counting
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');

// timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd('fetching data');
    console.log(data);
  });

// Tables
console.table(dogs);
