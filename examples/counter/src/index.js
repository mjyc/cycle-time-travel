import xs from 'xstream';
import {run} from '@cycle/run';
import {h, makeDOMDriver} from '@cycle/dom';
import {timeDriver} from '@cycle/time';
import logStreams from '@mjyc/cycle-time-travel';

function view (count$) {
  return count$
    .map((count) => (
      h('div.widget', [
        h('span.count', `Count: ${count}`),
        h('button.increment', 'Increment'),
        h('button.decrement', 'Decrement')
      ])
    )
  );
}

function model ({increment$, decrement$}) {
  const action$ = xs.merge(
    increment$.mapTo(1),
    decrement$.mapTo(-1)
  );

  const count$ = action$.fold((count, value) => count + value, 0);

  return {count$, action$};
}

function intent (DOM) {
  return {
    increment$: DOM.select('.increment').events('click'),
    decrement$: DOM.select('.decrement').events('click')
  };
}

function main({DOM, Time}) {
  const userIntent = intent(DOM);
  const {count$, action$} = model(userIntent);

  const logStream = logStreams(DOM, Time, [
    {stream: count$, label: 'count$'},
    {stream: action$, label: 'action$'}
  ]);

  const app = view(logStream.timeTravel.count$);

  return {
    DOM: xs.combine(app, logStream.DOM)
      .map(vtrees => (
        h('div', vtrees)
      )
    )
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
  Time: timeDriver,
});
