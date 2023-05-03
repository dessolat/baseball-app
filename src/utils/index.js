export const getSearchParam = param => new URL(window.location).searchParams.get(param);

export const setSearchParam = (param, value) => {
  const url = new URL(window.location);
  if (typeof param === 'string') {
    url.searchParams.set(param, value);
  } else {
    param.forEach(curParam => url.searchParams.set(curParam.param, curParam.value));
  }
  window.history.replaceState({}, '', url);
};

export const getBeforeAfterFlags = (cards, innings) => {
  const result = { 0: { before: true } };
  for (let i = 0; i < cards.length; i++) {
    const { inning_number } = cards[i];
    const inning = innings[inning_number - 1];
    const { side } = cards[i];
    const {
      top_runs = 0,
      bot_runs = 0,
      top_hits = 0,
      bot_hits = 0,
      top_err = 0,
      bot_err = 0,
      top_lob = 0,
      bot_lob = 0
    } = inning;

    if (i === 0 && i === cards.length) {
      result[i] = {
        ...result[i],
        after: {
          runs: side === 'top' ? top_runs : bot_runs,
          hits: side === 'top' ? top_hits : bot_hits,
          err: side === 'top' ? top_err : bot_err,
          lob: side === 'top' ? top_lob : bot_lob
        }
      };
      continue;
    }

    if (
      i !== 0 &&
      (cards[i].inning_number !== cards[i - 1].inning_number || cards[i].side !== cards[i - 1].side)
    )
      result[i] = { before: true };

    if (
      i === cards.length - 1 ||
      cards[i].inning_number !== cards[i + 1].inning_number ||
      cards[i].side !== cards[i + 1].side
    ) {
      result[i] = {
        ...result[i],
        after: {
          runs: side === 'top' ? top_runs : bot_runs,
          hits: side === 'top' ? top_hits : bot_hits,
          err: side === 'top' ? top_err : bot_err,
          lob: side === 'top' ? top_lob : bot_lob
        }
      };
    }
  }

  return result;
};

export const getShortName = (name, length) => (name.length > length ? name.slice(0, length - 1) + '…' : name);

export const getFixedNumber = (num, digits) => {
  let zeroString = '.';
  for (let i = 1; i <= digits; i++) zeroString += '0';

  return num.toFixed(digits).replace(zeroString, '');
};

export const getObjectsSum = (obj1, obj2, ignoredKeys) => {
  const result = {};

  for (let key in obj1) {
    result[key] = ignoredKeys.includes(key) || obj1[key] === 'inf' ? obj1[key] : +obj1[key] + +obj2[key];
  }

  return result;
};

export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

export const openFullscreen = element => {
  if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE11 */
    element.msRequestFullscreen();
  }
};

export const closeFullscreen = () => {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
    document.exitFullscreen();
};

export const isFullScreen = () => {
  const fullScreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null;

  if (fullScreenElement === null) return false;
  return true;
};

export const getFieldColor = dot =>
  ({
    H: '#1A4C96',
    B1: 'red',
    B2: 'green',
    B3: 'olive'
  }[dot]);

export const getChartColor = num =>
  ({
    '-1': 'lightgray',
    1: '#1A4C96',
    2: 'red',
    3: 'green',
    4: 'olive',
    5: 'yellow',
    6: 'purple',
    7: 'lightgreen'
  }[num]);

export const getRndValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getPitchColorByName = name =>
  ({
    Fastball: '#CE9587',
    Curveball: '#CBC8E5',
    Slider: '#EBE8B0',
    Changeup: '#9BCEA2',
    Submarine: '#B08194',
		Subfastball: '#B18FA1',
    'All Pitches': '#1A4C96'
  }[name]);

export const getPitchСlassColorByName = name =>
  ({
    Fastball: '#ec9599',
    // Fastball: '#D92B33',
    Breaking: '#92d4eb',
    // Breaking: '#24A8D7',
    Offspeed: '#c6dac7',
		'All Pitches': '#1A4C96'
    // Offspeed: '#8DB58E'
  }[name]);

export const getPitchСlassPrimaryColorByName = name =>
  ({
    // Fastball: '#ec9599',
    Fastball: '#D92B33',
    // Breaking: '#92d4eb',
    Breaking: '#24A8D7',
    // Offspeed: '#c6dac7'
    Offspeed: '#8DB58E'
  }[name]);

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getYears = () => {
  const YEARS = [];
  for (let year = 2000; year <= new Date().getFullYear(); year++) {
    YEARS.push(year);
  }

  return YEARS.reverse();
};

export function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s;
    v = h.v;
    h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

export function propsAreEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}
