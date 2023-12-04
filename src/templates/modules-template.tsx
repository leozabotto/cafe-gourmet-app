export interface ModulesTemplateProps {
  children: React.ReactNode;
  subtitle: string;
  disableLogo?: boolean;
}

export function ModulesTemplate({
  children,
  subtitle,
  disableLogo,
}: ModulesTemplateProps) {
  return (
    <div className="container flex min-h-full flex-col items-center justify-center gap-16">
      {!disableLogo && (
        <div className="flex flex-col items-center">
          <img className="w-3/4" src="/logo.svg" />
        </div>
      )}
      <div className="flex flex-col items-center gap-5">
        <h4 className="font-open-sans text-muted-foreground">{subtitle}</h4>
        {children}
      </div>
    </div>
  );
}
