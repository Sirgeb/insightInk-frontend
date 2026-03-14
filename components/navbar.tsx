"use client";

import { useRouter } from "next/navigation";
import UserAvatar from "./user-avatar";

function Navbar() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center max-w-5xl mx-auto mb-10">
      <h1
        onClick={() => router.push("/home")}
        className="text-xl md:text-2xl font-semibold hover:cursor-pointer"
      >
        Insight<span className="text-emerald-400">Ink</span>
      </h1>

      <div
        className="hover:cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <UserAvatar />
      </div>
    </header>
  );
}

export default Navbar;
