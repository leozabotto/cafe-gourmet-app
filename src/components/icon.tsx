import { icons } from "lucide-react";

export interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: string | number;
}

export function Icon({ name, color = "hsl(var(--foreground))", size = "16" }: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon color={color} size={size} strokeWidth="2.5" />
  );
}
