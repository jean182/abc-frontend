function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColorHex() {
  const hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i += 1) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default (response) => {
  return response.map((item) => {
    const backgroundColor = [
      getRandomColorHex(),
      getRandomColorHex(),
      getRandomColorHex(),
      getRandomColorHex(),
    ];
    return {
      label: item.username,
      data: [
        {
          x: item.probabilityScale,
          y: item.impactScale,
          r: Math.round(getRandomNumber(5, 15)),
        },
      ],
      backgroundColor,
      borderColor: backgroundColor,
      borderWidth: 1,
    };
  });
};
