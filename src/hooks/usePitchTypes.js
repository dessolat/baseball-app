import { useSelector } from 'react-redux';

const usePitchTypes = (num, isFull = true) => {
  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

	if (num === null || num === undefined) return

  const textIndex = isFull ? 0 : 1;

  return pitchTypes[num][textIndex];
};

export default usePitchTypes;
