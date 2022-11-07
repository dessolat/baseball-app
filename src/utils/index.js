export const getSearchParam = param => new URL(window.location).searchParams.get(param);

export const setSearchParam = (param, value) => {
  const url = new URL(window.location);
	if (typeof param === 'string') {
		url.searchParams.set(param, value);
	} else {
		param.forEach(curParam => url.searchParams.set(curParam.param, curParam.value))
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

export const closeFullscreen = () => document.exitFullscreen();