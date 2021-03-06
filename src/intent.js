import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import makeTimeTravelPosition$ from './calculate-time-travel-position';

function getMousePosition (ev) {
  return {
    x: ev.clientX,
    y: ev.clientY
  };
}

export default function intent (DOM) {
  const mousePosition$ = DOM.select('.stream').events('mousemove')
    .map(getMousePosition)
    .startWith({x: 0, y: 0});

  const click$ = DOM.select('.stream').events('mousedown');
  const release$ = fromEvent(document.body, 'mouseup');

  const dragging$ = xs.merge(
    click$.mapTo(true),
    release$.mapTo(false)
  ).startWith(false);

  const playingClick$ = DOM.select('.pause').events('click')
    .fold((previous, _) => !previous, false)
    .startWith(false);

  const playing$ = xs.combine(
    dragging$,
    playingClick$,
  ).map(([dragging, playingClick]) => {
    if (dragging) {
      return false;
    }

    return playingClick;
  }).remember();

  const timeTravelPosition$ = makeTimeTravelPosition$(mousePosition$, dragging$);

  return {
    timeTravelPosition$,
    playing$
  };
}
