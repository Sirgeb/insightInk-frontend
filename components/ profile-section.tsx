import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import ProfileAvatar from "./profile-avatar";

function ProfileSection() {
  return (
    // Profile Section
    <section className="flex justify-center mt-10 md:mt-16">
      <div className="w-full max-w-xl border border-white/10 bg-[#0b0f0f] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        {/* Avatar */}
        <ProfileAvatar />

        {/* Name Input */}
        <div className="mt-8">
          <div className="relative">
            <Input
              defaultValue="Alexander Thompson"
              className="bg-transparent border-white/30 text-white text-center pr-10 focus:border-teal-400 focus:ring-0"
            />

            <Pencil
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Save Changes
          </Button>
          <Button
            variant="destructive"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
