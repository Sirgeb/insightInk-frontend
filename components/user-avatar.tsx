import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  imageUrl?: string;
  className?: string;
};

function UserAvatar({ imageUrl, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={!!imageUrl ? imageUrl : "/assets/anonymous.png"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
