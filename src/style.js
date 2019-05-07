import {h} from '@cycle/dom';

export default function stylesheet () {
  return (
    h('style', `
    .time-travel {
      position: fixed;
      bottom: 0;
      background: lightgray;
      width: 100%;
      -moz-user-select: none;
      -webkit-user-select: none;
    }

    .stream-value {
      position: absolute;
      border-radius: 30px;
      background: #FAFAFA;
      color: black;
      padding: 2px 8px;
      text-align: center;
      margin: 6px 6px 6px 16px;
      white-space: nowrap;
      border: 1px solid lightgray;
      box-shadow: 0px 1px 1px gray;
    }

    .stream {
      height: 45px;
      font-size: 1.7em;
      font-family: Helvetica;
      border-top: #CFCFCF 1px solid;
    }

    .stream.feature {
      height: 90px;
    }

    .stream.feature .stream-value {
      height: 64px;
      font-size: 0.5em;
      padding: 8px;
      white-space: pre;
      text-align: left;
    }

    .stream-title {
      margin: 5px;
      color: #757575;
      position: fixed;
    }

    .stream-marker {
      position: fixed;
      height: 100%;
      border-left: 1px solid red;
      border-right: 1px solid darkred;
      width: 0px;
      left: 72%;
    }

    .stream:nth-child(even) {
      background: #D9D9D9;
    }

    .stream:nth-child(odd) {
      background: #C2C2C2;
    }

    .widget {
      display: inline-block;
    }

    .count {
      margin: 10px;
    }
  `)
  );
}
