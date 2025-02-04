import { useEffect } from "react";
import { useReactMediaRecorder, RecorderErrors } from "react-media-recorder";
import { Button } from "./Button";
import { Spinner } from "./Spinner";

export const RecordAudio = ({
  onAudioRecorded,
  reset,
  disabled = false,
}: {
  onAudioRecorded: (blobUrl: string) => void;
  disabled?: boolean;
  reset: () => void;
}) => {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    if (mediaBlobUrl && status === "stopped") {
      onAudioRecorded(mediaBlobUrl);
    }
  }, [status, mediaBlobUrl, onAudioRecorded]);

  return (
    <div className="flex flex-col items-end md:items-center md:flex-row gap-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (status === "paused") {
              resumeRecording();
            } else if (status === "recording") {
              pauseRecording();
            } else {
              startRecording();
            }
            // stop retrying any older failed transcriptions
            reset();
          }}
          // todo include more errors
          // is there a better way to check the whole enum?
          disabled={
            disabled ||
            [
              RecorderErrors.NotAllowedError,
              RecorderErrors.NO_RECORDER,
              RecorderErrors.NotFoundError,
            ].includes(status as any)
          }
          theme={status === "recording" ? "danger" : "info"}
        >
          {status !== "paused" && status !== "recording" && <>Start Scribe</>}
          {status === "paused" && <>Resume Scribe</>}
          {status === "recording" && (
            <div className="flex items-center gap-2">
              <span>Pause Scribe</span>
              <Spinner />
            </div>
          )}
        </Button>
        <Button
          disabled={disabled}
          onClick={async () => {
            stopRecording();
          }}
          theme="danger"
        >
          Stop
        </Button>
      </div>
      <div>
        <audio src={mediaBlobUrl} controls />
      </div>
    </div>
  );
};
