import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: string | null;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  if (!role) return null;

  const variant = role === 'admin' ? 'destructive' : role === 'collector' ? 'secondary' : 'default';
  
  return (
    <span className="inline-flex">
      <Badge variant={variant} className="capitalize">
        {role}
      </Badge>
    </span>
  );
};

export default RoleBadge;