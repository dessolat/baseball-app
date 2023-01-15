import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PlaysFieldBall from './PlaysFieldBall';

const PlaysFieldBalls = ({ coords, coeff, currentMoment }) => {
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);

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
  const count = isCount ? Math.ceil((videoCurrentTime - pitchTimeStart) / timePerBall) : 0;

  return (
    <>
      {useMemo(
        () =>
          coords
            .slice(0, count)
            .map((coord, i) => (
              <PlaysFieldBall key={i} coord={coord} index={i} coeff={coeff} coordsLength={coords.length} />
            )),
        [count]
      )}
    </>
  );
};

export default PlaysFieldBalls;
