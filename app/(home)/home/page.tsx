import Navbar from "@/components/navbar";
import TodoList from "@/components/todo-list";
import VoiceTodo from "@/components/voice-todo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-10">
      {/* Header */}
      <Navbar />

      {/* Recorder */}
      <VoiceTodo />
    </main>
  );
}
