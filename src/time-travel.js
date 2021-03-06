import intent from './intent';
import makeTime$ from './time';
import record from './record-streams';
import timeTravelStreams from './time-travel-streams';
import timeTravelBarView from './view';
import scopedDOM from './scoped-dom';

export default function TimeTravel (DOM, Time, streams, name = '.time-travel') {
  const {timeTravelPosition$, playing$} = intent(scopedDOM(DOM, name));

  const time$ = makeTime$(Time, playing$, timeTravelPosition$);

  const recordedStreams = record(streams, time$);

  const timeTravel = timeTravelStreams(recordedStreams, time$);

  return {
    DOM: timeTravelBarView(name, time$, playing$, recordedStreams),
    timeTravel
  };
}
