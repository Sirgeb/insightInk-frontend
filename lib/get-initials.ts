export function getInitials(fullname: string): string {
  if (!fullname) return "";

  const words = fullname.trim().split(" ").filter(Boolean);

  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}
