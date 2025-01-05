import { Card } from "@/components/ui/card";
import CollectorInfo from "./analyzer/CollectorInfo";
import DatabaseConfig from "./analyzer/DatabaseConfig";
import MemberDetails from "./analyzer/MemberDetails";
import SecurityAnalysis from "./analyzer/SecurityAnalysis";
import UserRoles from "./analyzer/UserRoles";
import RolesTable from "./RolesTable";

const MemberAnalyzer = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-dashboard-text mb-4">System Analysis</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4 bg-dashboard-card border-dashboard-border">
          <CollectorInfo />
        </Card>
        <Card className="p-4 bg-dashboard-card border-dashboard-border">
          <DatabaseConfig />
        </Card>
        <Card className="p-4 bg-dashboard-card border-dashboard-border">
          <MemberDetails />
        </Card>
        <Card className="p-4 bg-dashboard-card border-dashboard-border">
          <SecurityAnalysis />
        </Card>
        <Card className="p-4 bg-dashboard-card border-dashboard-border">
          <UserRoles />
        </Card>
      </div>

      <RolesTable />
    </div>
  );
};

export default MemberAnalyzer;