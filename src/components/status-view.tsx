interface StatusViewProps {
  title: string;
  type: 'success' | 'warning' | 'error';
}

const TypeColor: Record<StatusViewProps['type'], { bg: string, text: string }> = {
  success: {
    bg: 'bg-green-400',
    text: 'text-green-400'
  },
  warning: {
    bg: 'bg-red-400',
    text: 'text-red-400'
  },
  error: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-400'
  },
}

export function StatusView({ title, type }: StatusViewProps) {
  return (
    <div className="flex items-center gap-2 p-1">
      <div className={`h-1.5 w-1.5 rounded-full ${TypeColor[type].bg}`} />
      <strong className={`font-medium ${TypeColor[type].text}`}>{title}</strong>
    </div>
  );
}
