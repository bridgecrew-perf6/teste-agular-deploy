export function getRandomColor() {
  const colors = [
    '#7B1FA2',
    '#6A1B9A',
    '#C2185B',
    '#AD1457',

    '#880E4F',
    '#B71C1C',
    '#4527A0',
    '#311B92',

    '#1A237E',
    '#5C6BC0',
    '#5C6BC0',
    '#01579B',

    '#006064',
    '#0097A7',
    '#004D40',
    '#1B5E20',

    '#E65100',
    '#3E2723',
    '#212121',
    '#263238',
  ];

  const min = Math.ceil(0);
  const max = Math.floor(colors.length - 1);
  const idx = Math.floor(Math.random() * (max - min)) + min;

  return colors[idx];
}
