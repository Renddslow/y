const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type YDate = {
  month: string;
  day: number;
  year: number;
}

const START_YEAR = 1750;

const cardinal = (n: number) => {
  const formatter = new Intl.PluralRules('en-us', { type: 'ordinal' });
  const type = formatter.select(n);
  switch (type) {
    case 'one': return `${n}st`;
    case 'two': return `${n}nd`;
    case 'few': return `${n}rd`;
    default: return `${n}th`;
  }
};

const parseDay = (day: number): YDate => {
  const year = START_YEAR - Math.floor(day / 365);

  const dayInYear = day % 365;

  const monthLengths = Array(12).fill(null).map((_, idx) => idx + 1 === 2 ? 28 : 31 - (idx % 7 % 2));

  let acc = 0;
  let monthIndex = 0;

  for (monthIndex; monthIndex < monthLengths.length; monthIndex++) {
    const monthLen = monthLengths[monthIndex];
    acc += monthLen;
    if (dayInYear <= acc) {
      break;
    }
  }

  const month = MONTHS[monthIndex];
  const dayOfMonth = monthLengths[monthIndex] - (acc - dayInYear);

  return {
    month,
    year,
    day: dayOfMonth,
  };
};

export const formatDay = (day: number) => {
  const date = parseDay(day);
  return `${cardinal(date.day)} of ${date.month}, ${date.year} BCE`
};

export default parseDay;
