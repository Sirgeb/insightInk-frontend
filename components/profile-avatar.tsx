"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import UserAvatar from "@/components/user-avatar";

export default function ProfileAvatar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("Selected file:", file);
      // later you can upload or preview it
    }
  };

  return (
    <>
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <UserAvatar className="h-32 w-32 md:h-36 md:w-36 border-4 text-orange-400" />

        {/* Upload Button */}
        <Button
          variant="secondary"
          onClick={openFileExplorer}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 hover:cursor-pointer text-white"
        >
          <Camera size={16} />
          Upload Profile Image
        </Button>
      </div>
    </>
  );
}
