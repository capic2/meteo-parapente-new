import preview from '../../../.storybook/preview';
import { Controls } from './Controls';
import { fn } from 'storybook/test';

const meta = preview.meta({
  component: Controls,
  title: 'Components/Controls',
  args: {
    fileName: undefined,
    onFileSelected: fn(),
    onPlayClicked: fn(),
    onResetClicked: fn(),
    onRecordToggled: fn(),
    onAltitudeChanged: fn(),
    onSpeedChanged: fn(),
    onProgressChanged: fn(),
  },
});

export const WithFile = meta.story({
  args: {
    fileName: 'file.gpx',
    index: 0,
    total: 10,
  },
});

export const WithoutFile = meta.story({
  args: {
    fileName: undefined,
  },
});
