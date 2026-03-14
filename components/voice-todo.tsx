"use client";

import { ReactMediaRecorder } from "react-media-recorder";
import { Mic, Square } from "lucide-react";

export default function VoiceTodo() {
  return (
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="w-full max-w-3xl mx-auto">
          {/* Recorder Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f0f] p-6 backdrop-blur-md">
            <h2 className="text-lg md:text-xl text-gray-300 mb-4">
              Capture Your Day
            </h2>

            {/* Mic Button */}
            <div className="flex justify-center mb-6">
              {status !== "recording" ? (
                <button
                  onClick={startRecording}
                  className="h-20 w-20 flex items-center justify-center rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400/10 transition"
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

            {/* Fake waveform */}
            <div className="w-full h-16 flex items-center justify-center mb-6">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
            </div>

            {/* Status */}
            <div className="text-sm text-gray-400 mb-3">
              {status === "recording"
                ? "Recording..."
                : status === "stopped"
                  ? "Recording complete"
                  : "Ready to record"}
            </div>

            {/* Audio Playback */}
            {mediaBlobUrl && (
              <audio src={mediaBlobUrl} controls className="w-full" />
            )}
          </div>
        </div>
      )}
    />
  );
}
