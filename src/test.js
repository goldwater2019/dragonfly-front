a = [1,2,3,4]
b = {
    name: "xinsen",
    age: 33
}
for (let temp in b) {
    console.log(temp);
    console.log(b[temp])
}

for (let temp of a) {
    console.log(temp);
}

a = 33
console.log(a === b.age)