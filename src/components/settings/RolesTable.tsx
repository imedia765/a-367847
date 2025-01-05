import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

interface RoleMember {
  full_name: string;
  member_number: string;
  role: string;
  collector_number?: string;
}

const RolesTable = () => {
  const { data: members, isLoading } = useQuery({
    queryKey: ['roles-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select(`
          full_name,
          member_number,
          number as collector_number,
          user_roles (
            role
          )
        `)
        .order('member_number');

      if (error) {
        console.error('Error fetching members:', error);
        return [];
      }

      return data.map(member => ({
        full_name: member.full_name,
        member_number: member.member_number,
        collector_number: member.collector_number,
        role: member.user_roles?.[0]?.role || 'member'
      })) as RoleMember[];
    }
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const admins = members?.filter(m => m.role === 'admin') || [];
  const collectors = members?.filter(m => m.role === 'collector') || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-dashboard-text">
          <Users className="h-5 w-5" />
          System Roles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Member Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Collector Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((member) => (
              <TableRow key={member.member_number}>
                <TableCell className="font-medium">{member.full_name}</TableCell>
                <TableCell>{member.member_number}</TableCell>
                <TableCell className="text-dashboard-accent3">Admin</TableCell>
                <TableCell>{member.collector_number || '-'}</TableCell>
              </TableRow>
            ))}
            {collectors.map((member) => (
              <TableRow key={member.member_number}>
                <TableCell className="font-medium">{member.full_name}</TableCell>
                <TableCell>{member.member_number}</TableCell>
                <TableCell className="text-dashboard-accent2">Collector</TableCell>
                <TableCell>{member.collector_number || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RolesTable;