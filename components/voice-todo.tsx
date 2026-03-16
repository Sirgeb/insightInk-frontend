"use client";

import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { transcribeAudio } from "@/app/actions/transcribe-action";
import TodoList from "./todo-list";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false },
);

export default function VoiceTodo() {
  const [isPending, startTransition] = useTransition();
  const [transcription, setTranscription] = useState<string | null>(null);

  // Function to handle the blob once recording stops
  const handleStop = async (blobUrl: string, blob: Blob) => {
    const formData = new FormData();
    const file = new File([blob], "recording.wav", { type: blob.type });
    formData.append("audio", file);

    startTransition(async () => {
      const response = await transcribeAudio(formData);
      if (response.success) {
        //@ts-ignore
        setTranscription(response.tasks);
        console.log("Transcription:", response.tasks);
      } else {
        console.error("Transcription failed:", response.error);
      }
    });
  };

  return (
    <>
      <ReactMediaRecorder
        audio
        onStop={handleStop}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div className="w-full max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-[#0b0f0f] p-6 backdrop-blur-md">
              <h2 className="text-lg md:text-xl text-gray-300 mb-4 max-sm:mb-16">
                Capture Your Day
              </h2>

              <div className="flex justify-center mb-6">
                {status !== "recording" ? (
                  <button
                    onClick={startRecording}
                    disabled={isPending}
                    className="h-20 w-20 flex items-center justify-center rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400/10 transition disabled:opacity-50"
                  >
                    <Mic size={32} />
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="h-20 w-20 flex items-center justify-center rounded-full border border-red-400 text-red-400 animate-pulse"
                  >
                    <Square size={28} />
                  </button>
                )}
              </div>

              {/* Visual Feedback / Loading State */}
              <div className="w-full h-16 flex items-center justify-center mb-6">
                {isPending ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2
                      className="text-orange-400 animate-spin"
                      size={24}
                    />
                    <span className="text-xs text-orange-400">
                      Transcribing...
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
                )}
              </div>

              <div className="text-sm text-gray-400 mb-3">
                {status === "recording"
                  ? "Recording..."
                  : isPending
                    ? "Processing audio..."
                    : status === "stopped"
                      ? "Recording complete"
                      : "Ready to record"}
              </div>

              {mediaBlobUrl && !isPending && (
                <audio src={mediaBlobUrl} controls className="w-full mt-4" />
              )}
            </div>
          </div>
        )}
      />
      <TodoList tasks={transcription} />
    </>
  );
}
