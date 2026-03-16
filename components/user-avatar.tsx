import { UserContext } from "@/app/context/user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/get-initials";
import { useContext } from "react";

type UserAvatarProps = {
  imageUrl?: string;
  className?: string;
};

function UserAvatar({ imageUrl, className }: UserAvatarProps) {
  const { user } = useContext(UserContext);

  return (
    <Avatar className={className}>
      <AvatarImage src={!!imageUrl ? imageUrl : "/assets/anonymous.png"} />
      <AvatarFallback>
        {getInitials(`${user?.firstname} ${user?.lastname}`)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
