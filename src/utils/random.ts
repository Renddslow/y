const TRIBES = [
  'Reuben',
  'Simeon',
  'Levi',
  'Judah',
  'Issachar',
  'Zebulun',
  'Dan',
  'Naphtali',
  'Asher',
  'Gad',
  'Benjamin',
  'Ephraim',
  'Manasseh',
];

export const startingAge = () => {
  const min = 21;
  const max = 51;
  return Math.floor(Math.random() * (max - min) + min);
};

export const birthday = () => {
  return Math.floor(Math.random() * 365) + 1;
};

export const tribe = () => {
  const idx = Math.floor(Math.random() * TRIBES.length);
  return TRIBES[idx];
};
