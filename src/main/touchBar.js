/*
!! Temporarily disabled to focus on more important things.
If you want to try it anyway (it's half-finished) uncomment
lines 2 and 38 of main/index.js !!

Implementation of Touch Bar-based functionality into Braindead.
Theoretically supports multiple different Touch Bar layouts for
different routes (screens).
*/

import { TouchBar } from 'electron'; // eslint-disable-line
import redir from './index';
const { TouchBarButton, TouchBarSpacer, TouchBarPopover } = TouchBar;

// Generate template.
const initTB = () => {
  const addTB = new TouchBarButton({
    label: '➕ Add',
    backgroundColor: '#c6d4ff',
    click: () => {
      redir('/visual');
    },
  });
  const explainTB = new TouchBarButton({
    label: '👩‍🏫 Explain',
    backgroundColor: '#7a82ab',
    click: () => {
      // redir('/explain');
    },
  });
  const overlayTB = new TouchBarButton({
    label: '🕶 Overlay View',
    backgroundColor: '#4f65ad',
    click: () => {
      // redir('/overlay');
    },
  });
  const problemsTB = new TouchBarButton({
    label: '⚠️ Problems',
    backgroundColor: '#7a82ab',
    click: () => {
      // redir('/problems');
    },
  });
  const pythonTB = new TouchBarButton({
    label: '🐍 Python',
    backgroundColor: '#c6d4ff',
    click: () => {
      // redir('/python');
    },
  });
  const javascriptTB = new TouchBarButton({
    label: '☕️ JavaScript',
    backgroundColor: '#4f65ad',
    click: () => {
      // redir('/javascript');
    },
  });
  const swiftTB = new TouchBarButton({
    label: '🍎 Swift',
    backgroundColor: '#7a82ab',
    click: () => {
      // redir('/swift');
    },
  });
  const inputTB = new TouchBarPopover({
    label: '⌨️ Input',
    items: [addTB, explainTB, overlayTB, problemsTB],
  });
  const outputTB = new TouchBarPopover({
    label: '💻 Output',
    items: [pythonTB, javascriptTB, swiftTB],
  });
  const touchBar = new TouchBar([inputTB, new TouchBarSpacer(['small']), outputTB]);

  return touchBar;
};

export default initTB();
