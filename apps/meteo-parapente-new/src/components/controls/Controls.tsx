import { Slider } from '@meteo-parapente-new/design-system';

interface ControlsProps {
  fileName: string | undefined;
  index?: number;
  total?: number;
  onFileSelected: () => void;
  onPlayClicked: () => void;
  onResetClicked: () => void;
  onRecordToggled: () => void;
  onAltitudeChanged: () => void;
  onSpeedChanged: () => void;
  onProgressChanged: () => void;
}

const Controls = ({
  fileName,
  index,
  total,
  onFileSelected,
  onPlayClicked,
  onResetClicked,
  onRecordToggled,
  onAltitudeChanged,
  onSpeedChanged,
  onProgressChanged,
}: ControlsProps) => {
  return (
    <div className="absolute top-5 left-5 z-10 bg-white p-5 rounded-lg shadow-md min-w-80 overflow-auto">
      <h3 className="mb-4 mt-0 ml-0 mr-0 text-lg font-bold">Lecteur GPX</h3>
      {fileName === undefined ? (
        <input
          type="file"
          accept=".gpx"
          onChange={onFileSelected}
          className="mb-4 w-full p-1"
        />
      ) : (
        <>
          <span className="text-lg font-bold text-gray-600">{fileName}</span>
          <div className="flex gap-3 mb-4">
            <button
              id="play-button"
              onClick={() => {
                onPlayClicked();
              }}
              className="flex p-3 bg-cyan-600 text-white border-0 rounded-sm cursor-pointer font-medium"
            >
              ▶ Play
            </button>

            <button
              id="reset-button"
              onClick={onResetClicked}
              className="py-2.5 px-5 bg-cyan-600 text-white border-0 rounded-sm cursor-pointer font-medium"
            >
              ⏮ Reset
            </button>

            {/* ✅ Bouton d'enregistrement */}
            <button
              id="record-button"
              onClick={onRecordToggled}
              className="py-2.5 px-5 bg-amber-600 text-white border-0 rounded-sm cursor-pointer font-medium"
            >
              🎥 Enregistrer
            </button>
          </div>

          <div id="altitude-controls" className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium">Altitude:</label>
              <span
                id="altitude-value"
                className="text-sm font-bold text-green-400"
              >
                +0m
              </span>
            </div>
            <input
              type="range"
              min="-500"
              max="500"
              step="1"
              defaultValue="0"
              onChange={onAltitudeChanged}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-700 mt-0.5">
              <span>-500m</span>
              <span>+500m</span>
            </div>
          </div>

          <div id="speed-controls" style={{ marginBottom: '15px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              <label style={{ fontSize: '14px', fontWeight: '500' }}>
                Vitesse:
              </label>
              <span
                id="speed-value"
                style={{
                  fontSize: '14px',
                  color: '#3b82f6',
                  fontWeight: 'bold',
                }}
              >
                1x
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="32"
              step="1"
              defaultValue="1"
              onChange={onSpeedChanged}
              style={{ width: '100%' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#666',
                marginTop: '2px',
              }}
            >
              <span>1x (temps réel)</span>
              <span>32x</span>
            </div>
          </div>

          <Slider
            minValue={0}
            maxValue={0}
            defaultValue={0}
            onChange={onProgressChanged}
          />
        </>
      )}
    </div>
  );
};

export { Controls };
