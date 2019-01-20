import xs from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';

export default function makeTime$ (Time, playing$, timeTravelPosition$) {
  const time$ = Time.animationFrames().map(frame => frame.time);
  return xs.combine(time$, playing$)
    .fold((oldTime, [actualTime, playing]) => {
      if (playing) {
        const deltaTime = oldTime.actualTime === null
          ? 0 : actualTime - oldTime.actualTime;
        return {appTime: oldTime.appTime + deltaTime, actualTime};
      }

      return {appTime: oldTime.appTime, actualTime};
    }, {appTime: 0, actualTime: null})
    .map(time => time.appTime)
    .compose(sampleCombine(timeTravelPosition$))
    .map(([time, timeTravel]) => time - timeTravel)
    .startWith(0);
}
