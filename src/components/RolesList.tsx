import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, UserCheck } from "lucide-react";

interface RoleMember {
  full_name: string;
  member_number: string;
  role: string;
}

const RolesList = () => {
  const { data: roleMembers, isLoading } = useQuery({
    queryKey: ['role-members'],
    queryFn: async () => {
      console.log('Fetching role members...');
      
      const { data: members, error } = await supabase
        .from('members')
        .select(`
          full_name,
          member_number,
          user_roles!inner (
            role
          )
        `)
        .order('member_number');

      if (error) {
        console.error('Error fetching role members:', error);
        throw error;
      }

      return members as RoleMember[];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const admins = roleMembers?.filter(member => member.role === 'admin') || [];
  const collectors = roleMembers?.filter(member => member.role === 'collector') || [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-dashboard-text mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-dashboard-accent1" />
          Administrators
        </h3>
        <div className="space-y-3">
          {admins.map((admin) => (
            <Card key={admin.member_number} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dashboard-text">{admin.full_name}</p>
                  <p className="text-sm text-dashboard-muted">Member #{admin.member_number}</p>
                </div>
                <Badge variant="outline" className="bg-dashboard-accent1/20 text-dashboard-accent1 border-0">
                  Admin
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-dashboard-text mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-dashboard-accent2" />
          Collectors
        </h3>
        <div className="space-y-3">
          {collectors.map((collector) => (
            <Card key={collector.member_number} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dashboard-text">{collector.full_name}</p>
                  <p className="text-sm text-dashboard-muted">Member #{collector.member_number}</p>
                </div>
                <Badge variant="outline" className="bg-dashboard-accent2/20 text-dashboard-accent2 border-0">
                  Collector
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesList;