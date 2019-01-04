const map = fn => arr => arr.map(fn);

const filter = fn => arr => arr.filter(fn);

const prop = name => obj => obj[name];

const propEq = (name, val) => obj => obj[name] === val;

const propMatch = (name, fn) => obj => fn(obj[name]);

const retry = (times, fn) => fn().catch(err => times > 0 ? retry(times - 1, fn) : Promise.reject(err));

const awaitValues = obj => Promise.all(Object.values(obj));

//const arr = [10, 20, 30];

// Promise.resolve([2,3,4,5,6,7,8,9,10])
//   .then(map(i => i+1))
//   .then(filter(i => i % 2 === 0))
//   .then(console.log);

//Promise.resolve([ {name: 'gustavo', age: 17},  {name: 'dasda', age: 8}, {name: 'gasdasdds', age: 11},])
  //.then(map(prop('name')))
  //.then(filter(propEq('name', 'gustavo')))
  // .then(filter(propMatch('age', n => n < 20)))
  // .then(console.log);


  // awaitValues({ lol: Promise.resolve(1), wut: Promise.resolve(2) }).then(console.log);

  // bom, tentem aí implementar:

  // - array.map(prop(“name”))
  // - array.filter(propEq(“name”, “algum nome”))
  // - array.filter(propMatch(“age”, age => age < 10)
  // - retry(10, () => fetch(…))
  // - awaitValues({ lol: Promise.resolve(1), wut: Promise.resolve(2) }) // => { lol: 1, wut: 2 }