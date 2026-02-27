import { createFileRoute } from '@tanstack/react-router';
import { CesiumComponentRef, Viewer } from 'resium';
import {
  ArcType,
  CallbackProperty,
  Cartesian3,
  Cartographic,
  Color,
  ConstantPositionProperty,
  Entity as CesiumEntity,
  GpxDataSource,
  JulianDate,
  Rectangle,
  Terrain,
  Viewer as CesiumViewer,
} from 'cesium';
import { ChangeEvent, useCallback, useRef } from 'react';

export const Route = createFileRoute('/trace/')({
  component: Index,
});

// Interface pour typer les propriétés internes de Cesium
interface CesiumPositionPropertyInternal {
  _property?: {
    _times?: JulianDate[];
  };
}

export function Index() {
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const allPositionsRef = useRef<Cartesian3[]>([]);
  const basePositionsRef = useRef<Cartesian3[]>([]);
  const timestampsRef = useRef<number[]>([]);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const fileNameRef = useRef('');
  const speedRef = useRef(1);
  const altitudeOffsetRef = useRef(0);
  const realTimeStartRef = useRef<number>(0);
  const gpxStartTimeRef = useRef<number>(0);

  const polylineEntityRef = useRef<CesiumEntity | null>(null);
  const cursorEntityRef = useRef<CesiumEntity | null>(null);
  const startEntityRef = useRef<CesiumEntity | null>(null);
  const visiblePositionsRef = useRef<Cartesian3[]>([]);
  const cursorPositionPropertyRef = useRef<ConstantPositionProperty | null>(null);

  // ✅ Refs pour l'enregistrement vidéo
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const isRecordingRef = useRef(false);

  const applyAltitudeOffset = useCallback((positions: Cartesian3[], offset: number) => {
    return positions.map(pos => {
      const cartographic = Cartographic.fromCartesian(pos);
      return Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height + offset
      );
    });
  }, []);

  const extractTimestamps = useCallback((dataSource: GpxDataSource): number[] => {
    const timestamps: number[] = [];

    dataSource.entities.values.forEach((entity) => {
      if (!entity.position) return;

      const positionProperty = entity.position as unknown as CesiumPositionPropertyInternal;

      if (positionProperty._property?._times) {
        positionProperty._property._times.forEach((julianDate) => {
          timestamps.push(JulianDate.toDate(julianDate).getTime());
        });
      } else if (entity.availability) {
        try {
          const start = entity.availability.start;
          const stop = entity.availability.stop;

          if (start && stop) {
            timestamps.push(JulianDate.toDate(start).getTime());
            timestamps.push(JulianDate.toDate(stop).getTime());
          }
        } catch (e) {
          console.warn('Could not extract timestamps', e);
        }
      }
    });

    return timestamps;
  }, []);

  const updateUI = () => {
    const controlsDiv = document.getElementById('controls-content');
    if (controlsDiv && allPositionsRef.current.length > 0) {
      controlsDiv.innerHTML = `
        <div style="margin-bottom: 15px;">
          <strong>${fileNameRef.current}</strong>
          <div style="font-size: 12px; color: #666; margin-top: 5px;">
            ${currentIndexRef.current + 1} / ${allPositionsRef.current.length} points
          </div>
        </div>
      `;
    }
  };

  // ✅ Démarrer l'enregistrement
  const startRecording = useCallback(async () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    try {
      const canvas = viewer.canvas as HTMLCanvasElement;
      const stream = canvas.captureStream(60); // 60 FPS

      recordedChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 8000000, // 8 Mbps
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `gpx-animation-${Date.now()}.webm`;
        a.click();

        URL.revokeObjectURL(url);
        isRecordingRef.current = false;

        const recordButton = document.getElementById('record-button');
        if (recordButton) {
          recordButton.textContent = '🎥 Enregistrer';
          recordButton.style.background = '#ef4444';
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      isRecordingRef.current = true;

      const recordButton = document.getElementById('record-button');
      if (recordButton) {
        recordButton.textContent = '⏹ Arrêter';
        recordButton.style.background = '#dc2626';
      }

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Erreur lors du démarrage de l\'enregistrement');
    }
  }, []);

  // ✅ Arrêter l'enregistrement
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      mediaRecorderRef.current.stop();
      console.log('Recording stopped');
    }
  }, []);

  // ✅ Toggle enregistrement
  const toggleRecording = useCallback(() => {
    if (isRecordingRef.current) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [startRecording, stopRecording]);

  const pause = useCallback(() => {
    console.log('Pause called');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPlayingRef.current = false;
    const playButton = document.getElementById('play-button');
    if (playButton) playButton.textContent = '▶ Play';
  }, []);

  const play = useCallback(() => {
    console.log('Play called');

    if (intervalRef.current) {
      console.log('Already playing, returning');
      return;
    }

    if (allPositionsRef.current.length === 0) {
      console.error('No positions to play!');
      return;
    }

    isPlayingRef.current = true;
    const playButton = document.getElementById('play-button');
    if (playButton) playButton.textContent = '⏸ Pause';

    realTimeStartRef.current = Date.now();
    gpxStartTimeRef.current = timestampsRef.current[currentIndexRef.current];

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current >= allPositionsRef.current.length - 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        isPlayingRef.current = false;
        const btn = document.getElementById('play-button');
        if (btn) btn.textContent = '▶ Play';
        return;
      }

      const speed = speedRef.current;

      const elapsedRealTime = Date.now() - realTimeStartRef.current;
      const elapsedGpxTime = elapsedRealTime * speed;
      const targetGpxTime = gpxStartTimeRef.current + elapsedGpxTime;

      let targetIndex = currentIndexRef.current;
      for (let i = currentIndexRef.current; i < timestampsRef.current.length; i++) {
        if (timestampsRef.current[i] <= targetGpxTime) {
          targetIndex = i;
        } else {
          break;
        }
      }

      if (targetIndex > currentIndexRef.current) {
        currentIndexRef.current = targetIndex;
        visiblePositionsRef.current = allPositionsRef.current.slice(0, currentIndexRef.current + 1);

        if (cursorPositionPropertyRef.current) {
          cursorPositionPropertyRef.current.setValue(
            allPositionsRef.current[currentIndexRef.current]
          );
        }

        const slider = document.getElementById('progress-slider') as HTMLInputElement;
        if (slider) slider.value = currentIndexRef.current.toString();

        updateUI();
      }
    }, 16);
  }, []);

  const handleFileUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('File upload started');
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) {
      console.error('Viewer not ready');
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Loading file:', file.name);

    try {
      const url = URL.createObjectURL(file);
      const dataSource = await GpxDataSource.load(url);
      console.log('DataSource loaded');

      const positions: Cartesian3[] = [];
      dataSource.entities.values.forEach((entity) => {
        if (entity.polyline && entity.polyline.positions) {
          const pos = entity.polyline.positions.getValue(JulianDate.now());
          if (pos && Array.isArray(pos)) {
            positions.push(...pos);
          }
        }
      });

      let timestamps = extractTimestamps(dataSource);

      if (timestamps.length === 0 || timestamps.length !== positions.length) {
        console.warn('No timestamps found, generating based on estimated speed');
        const avgSpeedKmh = 5;
        const avgSpeedMs = avgSpeedKmh * 1000 / 3600;

        timestamps = [Date.now()];
        for (let i = 1; i < positions.length; i++) {
          const distance = Cartesian3.distance(positions[i - 1], positions[i]);
          const timeMs = (distance / avgSpeedMs) * 1000;
          timestamps.push(timestamps[i - 1] + timeMs);
        }
      }

      URL.revokeObjectURL(url);

      console.log('Total positions:', positions.length);
      console.log('Total timestamps:', timestamps.length);
      console.log('Duration:', (timestamps[timestamps.length - 1] - timestamps[0]) / 1000 / 60, 'minutes');

      if (positions.length === 0) {
        alert('Aucun point trouvé dans le GPX');
        return;
      }

      basePositionsRef.current = positions;
      allPositionsRef.current = positions;
      timestampsRef.current = timestamps;
      currentIndexRef.current = 0;
      fileNameRef.current = file.name;
      visiblePositionsRef.current = [positions[0]];

      console.log('Cleaning old entities...');
      if (polylineEntityRef.current) viewer.entities.remove(polylineEntityRef.current);
      if (cursorEntityRef.current) viewer.entities.remove(cursorEntityRef.current);
      if (startEntityRef.current) viewer.entities.remove(startEntityRef.current);

      console.log('Creating new entities...');

      polylineEntityRef.current = viewer.entities.add({
        polyline: {
          positions: new CallbackProperty(() => {
            return visiblePositionsRef.current;
          }, false),
          width: 5,
          material: Color.RED,
          clampToGround: false,
          arcType: ArcType.NONE,
        },
      });

      cursorPositionPropertyRef.current = new ConstantPositionProperty(positions[0]);

      cursorEntityRef.current = viewer.entities.add({
        position: cursorPositionPropertyRef.current,
        point: {
          pixelSize: 12,
          color: Color.YELLOW,
          outlineColor: Color.BLACK,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });

      startEntityRef.current = viewer.entities.add({
        position: positions[0],
        point: {
          pixelSize: 10,
          color: Color.GREEN,
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });

      viewer.scene.globe.depthTestAgainstTerrain = true;

      console.log('Flying to track...');
      viewer.camera.flyTo({
        destination: Rectangle.fromCartesianArray(positions),
        duration: 2,
      });

      updateUI();

      console.log('Showing controls...');
      const playButton = document.getElementById('play-button');
      const resetButton = document.getElementById('reset-button');
      const recordButton = document.getElementById('record-button');
      const slider = document.getElementById('progress-slider') as HTMLInputElement;
      const speedControls = document.getElementById('speed-controls');
      const altitudeControls = document.getElementById('altitude-controls');

      if (playButton) {
        playButton.style.display = 'inline-block';
        console.log('Play button shown');
      }
      if (resetButton) resetButton.style.display = 'inline-block';
      if (recordButton) recordButton.style.display = 'inline-block';
      if (speedControls) speedControls.style.display = 'block';
      if (altitudeControls) altitudeControls.style.display = 'block';
      if (slider) {
        slider.style.display = 'block';
        slider.max = (positions.length - 1).toString();
        slider.value = '0';
      }

      console.log('File loaded successfully');

    } catch (error) {
      console.error('Error loading GPX:', error);
      alert(`Erreur: ${error}`);
    }
  }, [extractTimestamps]);

  const reset = useCallback(() => {
    console.log('Reset called');
    pause();
    currentIndexRef.current = 0;

    if (allPositionsRef.current.length > 0) {
      visiblePositionsRef.current = [allPositionsRef.current[0]];

      if (cursorPositionPropertyRef.current) {
        cursorPositionPropertyRef.current.setValue(allPositionsRef.current[0]);
      }

      const slider = document.getElementById('progress-slider') as HTMLInputElement;
      if (slider) slider.value = '0';

      updateUI();
    }
  }, [pause]);

  const handleSliderChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    pause();
    const index = Number(e.target.value);
    currentIndexRef.current = index;

    if (allPositionsRef.current.length > 0) {
      visiblePositionsRef.current = allPositionsRef.current.slice(0, index + 1);

      if (cursorPositionPropertyRef.current) {
        cursorPositionPropertyRef.current.setValue(allPositionsRef.current[index]);
      }

      updateUI();
    }
  }, [pause]);

  const handleSpeedChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    speedRef.current = newSpeed;

    const speedValue = document.getElementById('speed-value');
    if (speedValue) speedValue.textContent = `${newSpeed}x`;

    if (isPlayingRef.current) {
      pause();
      setTimeout(() => play(), 50);
    }
  }, [pause, play]);

  const handleAltitudeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const offset = Number(e.target.value);
    altitudeOffsetRef.current = offset;

    const altitudeValue = document.getElementById('altitude-value');
    if (altitudeValue) {
      altitudeValue.textContent = offset >= 0 ? `+${offset}m` : `${offset}m`;
    }

    if (basePositionsRef.current.length > 0) {
      allPositionsRef.current = applyAltitudeOffset(basePositionsRef.current, offset);
      visiblePositionsRef.current = allPositionsRef.current.slice(0, currentIndexRef.current + 1);

      if (cursorPositionPropertyRef.current) {
        cursorPositionPropertyRef.current.setValue(
          allPositionsRef.current[currentIndexRef.current]
        );
      }
    }
  }, [applyAltitudeOffset]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          minWidth: '320px',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
          Lecteur GPX
        </h3>

        <input
          type="file"
          accept=".gpx"
          onChange={handleFileUpload}
          style={{ marginBottom: '15px', width: '100%', padding: '5px' }}
        />

        <div id="controls-content"></div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            id="play-button"
            onClick={() => {
              console.log('Button clicked, isPlaying:', isPlayingRef.current);
              if (isPlayingRef.current) {
                pause();
              } else {
                play();
              }
            }}
            style={{
              display: 'none',
              flex: 1,
              padding: '10px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            ▶ Play
          </button>

          <button
            id="reset-button"
            onClick={reset}
            style={{
              display: 'none',
              padding: '10px 20px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            ⏮ Reset
          </button>

          {/* ✅ Bouton d'enregistrement */}
          <button
            id="record-button"
            onClick={toggleRecording}
            style={{
              display: 'none',
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            🎥 Enregistrer
          </button>
        </div>

        <div id="altitude-controls" style={{ display: 'none', marginBottom: '15px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Altitude:
            </label>
            <span
              id="altitude-value"
              style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}
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
            onChange={handleAltitudeChange}
            style={{ width: '100%' }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#666',
            marginTop: '2px'
          }}>
            <span>-500m</span>
            <span>+500m</span>
          </div>
        </div>

        <div id="speed-controls" style={{ display: 'none', marginBottom: '15px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Vitesse:
            </label>
            <span
              id="speed-value"
              style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 'bold' }}
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
            onChange={handleSpeedChange}
            style={{ width: '100%' }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#666',
            marginTop: '2px'
          }}>
            <span>1x (temps réel)</span>
            <span>32x</span>
          </div>
        </div>

        <input
          id="progress-slider"
          type="range"
          min="0"
          max="0"
          defaultValue="0"
          onChange={handleSliderChange}
          style={{ display: 'none', width: '100%' }}
        />
      </div>

      <Viewer
        ref={viewerRef}
        full
        terrain={Terrain.fromWorldTerrain()}
        animation={false}
        timeline={false}
        baseLayerPicker={false}
      />
    </div>
  );
}
