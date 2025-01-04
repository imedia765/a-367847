import RoleBadge from './RoleBadge';
import { Member } from '@/types/member';

interface MembershipDetailsProps {
  memberProfile: Member;
  userRole: string | null;
}

const MembershipDetails = ({ memberProfile, userRole }: MembershipDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Membership Details</h3>
        <RoleBadge role={userRole} />
      </div>
      
      <div className="grid gap-2">
        <div>
          <span className="text-sm text-gray-500">Member Number:</span>
          <span className="ml-2">{memberProfile.member_number}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Type:</span>
          <span className="ml-2 capitalize">{memberProfile.membership_type || 'standard'}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status:</span>
          <span className="ml-2 capitalize">{memberProfile.status || 'active'}</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;