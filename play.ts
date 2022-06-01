const users = [
  { name: 'Jhon', age: 20 },
  { name: 'Bob', age: 30 },
  { name: 'Mary', age: 40 },
  { name: 'Ann', age: 50 },
  { name: 'Elena', age: 60 },
  { name: 'Alex', age: 20 },
  { name: 'Kate', age: 30 },
];

// check how many times age repeated
const ageCount = users.reduce((acc, user) => {
  if (acc[user.age]) {
    acc[user.age] += 1;
  } else {
    acc[user.age] = 1;
  }
  return acc;
}, {});

const ageCount2 = users.filter(user => (user.age > 30 ? user : null)).map(user => user.name);
const ageCount3 = users.reduce((acc, user) => {
  user.age > 30 ? acc.push(user.name) : null;
  return acc;
}, []);

console.log(ageCount);
console.log(ageCount2);
console.log(ageCount3);
