import { PrerecordedTranscriptionResponse } from "@deepgram/sdk/dist/types";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { SkeletonLoader } from "@/components/SkeletonLoader";

const RecordAudio = dynamic(
  () => import("@/components/RecordAudio").then((mod) => mod.RecordAudio),
  { ssr: false, loading: () => <div className="h-[54px] w-full" /> }
);

export default function Home() {
  const { data, isPending, mutate, error, reset } = useMutation<
    {
      data: PrerecordedTranscriptionResponse["results"];
    },
    Error,
    string
  >({
    mutationFn: async (blobUrl: string) => {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const file = new File([blob], "audio-recording");
      return await axios.post(
        "/api/transcribe",
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    retry: true,
    retryDelay: 5000,
  });

  const onAudioRecorded = useCallback(
    (blobUrl: string) => {
      reset();
      mutate(blobUrl);
    },
    [mutate, reset]
  );

  return (
    <div className="pt-4 px-8 pb-8 h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-end">
          <RecordAudio
            onAudioRecorded={onAudioRecorded}
            reset={reset}
            disabled={isPending}
          />
        </div>

        <div className="bg-white flex-1 p-6 max-w-[1000px] w-full rounded-xl shadow-xl">
          {isPending ? (
            <SkeletonLoader />
          ) : (
            data?.data?.channels?.[0]?.alternatives[0].transcript
          )}
        </div>
      </div>
    </div>
  );
}
