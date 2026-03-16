"use client";

import { useRouter } from "next/navigation";
import UserAvatar from "./user-avatar";
import { useContext } from "react";
import { UserContext, UserContextType } from "@/app/context/user-context";

function Navbar() {
  const router = useRouter();
  const { user } = useContext<UserContextType>(UserContext);

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
        <UserAvatar imageUrl={user?.picture} />
      </div>
    </header>
  );
}

export default Navbar;
