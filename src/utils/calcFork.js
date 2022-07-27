const calcRandom = (q) => {
  let numeros = {};
  for (let i = 0; i < q; i++) {
    const randomNum = Math.floor(Math.random() * 1000 + 1);
    const keyNum = randomNum.toString();

    if (numeros[keyNum]) {
      numeros[keyNum]++;
    } else {
      numeros[keyNum] = 1;
    }
  }
  return numeros;
};

process.on("message", (msg) => {
  const cantidad = parseInt(msg);
  const numeros = calcRandom(cantidad);
  process.send(numeros);
});

module.exports = { calcRandom };
