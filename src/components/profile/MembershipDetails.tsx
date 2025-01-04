import RoleBadge from './RoleBadge';

interface MembershipDetailsProps {
  memberNumber: string;
  role: string | null;
  membershipType?: string;
  status?: string;
}

const MembershipDetails = ({ memberNumber, role, membershipType = 'standard', status = 'active' }: MembershipDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Membership Details</h3>
        <RoleBadge role={role} />
      </div>
      
      <div className="grid gap-2">
        <div>
          <span className="text-sm text-gray-500">Member Number:</span>
          <span className="ml-2">{memberNumber}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Type:</span>
          <span className="ml-2 capitalize">{membershipType}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status:</span>
          <span className="ml-2 capitalize">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;