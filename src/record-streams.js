import sampleCombine from 'xstream/extra/sampleCombine';

function recordStream (streamInfo, time$) {
  const recordedStream = streamInfo.stream
    .compose(sampleCombine(time$)).map(([ev, time]) => ({
      timestamp: time, value: ev
    }))
    .fold((events, newEvent) => {
      const newEvents = events.concat([newEvent]);

      newEvents.label = streamInfo.label;
      newEvents.options = {feature: streamInfo.feature || false};

      return newEvents;
    }, []);

  recordedStream.label = streamInfo.label;

  return recordedStream;
}

export default function recordStreams (streams, time$) {
  return streams.map(streamInfo => recordStream(streamInfo, time$));
}
