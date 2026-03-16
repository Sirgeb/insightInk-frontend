"use client";

import { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import UserAvatar from "@/components/user-avatar";
import { UserContext, UserContextType } from "@/app/context/user-context";
import { toast } from "@/app/hooks/use-toast";
import { updateProfilePicture } from "@/app/actions/user-action";
import { Spinner } from "./ui/spinner";

export default function ProfileAvatar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, refreshUser } = useContext<UserContextType>(UserContext);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast({
        variant: "default",
        description: "Only JPG or PNG files are allowed",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        description: "Image must be less than 2MB",
      });
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageUploading(true);
      const res = await updateProfilePicture(formData);

      if (res.ok) {
        toast({
          variant: "default",
          description: res.message,
        });
        await refreshUser();
      } else {
        toast({
          variant: "destructive",
          description: "Failed to upload image",
        });
        setPreviewImage(null);
      }
    } catch {
      toast({
        variant: "destructive",
        description: "Failed to upload image",
      });
      setPreviewImage(null);
    } finally {
      setImageUploading(false);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <UserAvatar
          imageUrl={previewImage ?? user?.picture}
          className="h-32 w-32 md:h-36 md:w-36 border-4 text-orange-400"
        />

        {imageUploading && (
          <Spinner className="absolute bottom-0 left-4 text-primary" />
        )}

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
