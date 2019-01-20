import xs from 'xstream';
import {h} from '@cycle/dom';

import renderStreams from './render-streams';
import stylesheet from './style';

export default function timeTravelBarView (name, time$, playing$, recordedStreams) {
  return xs.combine(time$, playing$, ...recordedStreams)
    .map(([currentTime, playing, ...streamValues]) => {
      return h(name, [
        stylesheet(),
        h('button.pause', playing ? 'Pause' : 'Play'),
        renderStreams(currentTime, ...streamValues)
      ]);
    });
}
