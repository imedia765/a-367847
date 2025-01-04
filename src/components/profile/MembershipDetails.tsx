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
        <h3 className="text-lg font-semibold text-dashboard-accent2">Membership Details</h3>
        <RoleBadge role={userRole} />
      </div>
      
      <div className="grid gap-2 bg-dashboard-card/50 p-4 rounded-lg">
        <div>
          <span className="text-sm text-dashboard-muted">Member Number:</span>
          <span className="ml-2 text-dashboard-text">{memberProfile.member_number}</span>
        </div>
        <div>
          <span className="text-sm text-dashboard-muted">Type:</span>
          <span className="ml-2 text-dashboard-text capitalize">{memberProfile.membership_type || 'standard'}</span>
        </div>
        <div>
          <span className="text-sm text-dashboard-muted">Status:</span>
          <span className="ml-2 text-dashboard-text capitalize">{memberProfile.status || 'active'}</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;