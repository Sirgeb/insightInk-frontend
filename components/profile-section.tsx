"use client";

import { useContext, useState } from "react";
import { startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import ProfileAvatar from "./profile-avatar";
import { logoutAction } from "@/app/actions/auth-action";
import { updateProfileInfoAction } from "@/app/actions/user-action";
import { useActionState } from "react";
import { toast } from "@/app/hooks/use-toast";
import { UserContext, UserContextType } from "@/app/context/user-context";

type ActionResponse = {
  ok: boolean;
  message: string;
};

type UpdateProfileData = {
  fullname: string;
  email: string;
};

const initialState: ActionResponse = {
  ok: false,
  message: "",
};

function ProfileSection() {
  const { user, refreshUser } = useContext<UserContextType>(UserContext);
  const [fullname, setFullname] = useState(
    user ? `${user.firstname} ${user.lastname}` : "",
  );
  const [email, setEmail] = useState(user?.email || "");

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    UpdateProfileData
  >(async (prevState, data) => {
    try {
      const result = await updateProfileInfoAction(data);

      if (result.ok) {
        await refreshUser();
        toast({ variant: "default", description: result.message });
      } else {
        toast({ variant: "destructive", description: result.message });
      }

      return result;
    } catch (err) {
      const message = (err as Error).message || "Something went wrong";
      toast({ variant: "destructive", description: message });
      return { ok: false, message };
    }
  }, initialState);

  const handleLogout = async () => {
    await logoutAction();
  };

  const handleSave = () => {
    startTransition(() => {
      formAction({ fullname, email });
    });
  };

  return (
    <section className="flex justify-center mt-10 md:mt-16">
      <div className="w-full max-w-xl border border-white/10 bg-[#0b0f0f] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        {/* Avatar */}
        <ProfileAvatar />

        {/* Profile Form */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-8">
          {/* Name Input */}
          <div className="relative mb-6">
            <Input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="bg-transparent border-white/30 text-white text-center pr-10 focus:border-teal-400 focus:ring-0"
            />
            <Pencil
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-white/30 text-white text-center pr-10 focus:border-teal-400 focus:ring-0"
            />
            <Pencil
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              onClick={handleLogout}
              className="border-white/30 text-white hover:bg-white/10 hover:cursor-pointer"
            >
              Logout
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileSection;
