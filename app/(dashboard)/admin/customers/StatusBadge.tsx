// components/StatusBadge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: "active" | "inactive" | "vip";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    vip: "bg-purple-100 text-purple-800",
  };

  return (
    <Badge variant="outline" className={cn("px-2 py-0.5 rounded-full", statusStyles[status])}>
      {status === 'vip' ? 'VIP' : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};