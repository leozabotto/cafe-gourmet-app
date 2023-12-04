import {
  Icon,
  IconProps,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ".";

interface ButtonIconProps
  extends Omit<IconProps, "name">,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  description: string;
  icon: IconProps["name"];
}

export function ButtonIcon({
  title,
  description,
  icon,
  color,
  size,
  disabled,
  ...props
}: ButtonIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`flex gap-2 rounded-full p-2 transition-colors ${
              disabled ? "cursor-not-allowed" : ""
            } ${!disabled ? "hover:bg-accent-foreground/10" : ""}`}
            {...props}
          >
            <Icon name={icon} color={color} size={size} />{" "}
            {title && (
              <span className="font-semibold" style={{ color }}>
                {title}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
