import xs from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';

export default function timeTravelStreams (streams, time$) {
  const timeTravel = {};

  streams.forEach((recordedStream, index) => {
    timeTravel[streams[index].label] = xs.combine(
      time$,
      recordedStream
    ).map(([time, events]) => (
      events.slice(0).reverse().find(val => val.timestamp <= time) || undefined
    )).filter(thing => thing !== undefined && thing.value !== undefined)
      .map(v => v.value)
      .compose(dropRepeats());
  });

  return timeTravel;
}
