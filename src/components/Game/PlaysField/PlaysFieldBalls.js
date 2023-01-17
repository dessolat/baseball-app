import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlaysFieldBall from './PlaysFieldBall';

const PlaysFieldBalls = ({ coords, coeff, currentMoment }) => {
  const [pauseBallsCount, setPauseBallsCount] = useState(0);

  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const preferredVideoState = useSelector(state => state.game.preferredVideoState);

  useEffect(() => {
    if (preferredVideoState !== 2) return;

    setPauseBallsCount(0);

    setTimeout(() => {
      setPauseBallsCount(1);
    }, 40);
  }, [currentMoment]);

  useEffect(() => {
    if (pauseBallsCount === 0) return;

    let graphTimeout;
    if (pauseBallsCount < coords.length) {
      graphTimeout = setTimeout(() => setPauseBallsCount(prev => prev + 1), 40);
      return;
    }

    return () => {
      clearTimeout(graphTimeout);
    };
    // eslint-disable-next-line
  }, [pauseBallsCount]);

  const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

  const SECONDS_SRC = currentMoment.video
    ? {
        pitch: {
          timeStart:
            currentMoment.metering?.pitch?.time_start_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            currentMoment.metering?.pitch?.time_end_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      }
    : {};

  const { time_start: pitchTimeStart, time_end: pitchTimeEnd } = currentMoment.metering?.pitch || {};
  const totalPitchTime = pitchTimeEnd - pitchTimeStart;
  const timePerBall = totalPitchTime / coords.length;

  const isCount = pitchTimeStart < videoCurrentTime && SECONDS_SRC.pitch?.timeEnd >= videoCurrentTime;
  const count = preferredVideoState === 2 ? pauseBallsCount : isCount ? Math.ceil((videoCurrentTime - pitchTimeStart) / timePerBall) : coords.length;
  return (
    <>
      {useMemo(
        () =>
          coords
            .slice(0, count)
            .map((coord, i) => (
              <PlaysFieldBall key={i} coord={coord} index={i} coeff={coeff} coordsLength={coords.length} />
            )),
        [count, coords]
      )}
    </>
  );
};

export default PlaysFieldBalls;
