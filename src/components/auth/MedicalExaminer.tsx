import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MedicalExaminer = () => {
  return (
    <div className="space-y-8">
      <div className="bg-dashboard-card rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-white mb-6">Medical Examiner Process</h2>
        <p className="text-dashboard-text mb-4">
          To understand our comprehensive Medical Examiner Death Certification process, please review our detailed Medical Examiner Flow Chart.
        </p>
        <Button variant="outline" className="text-dashboard-accent1 border-dashboard-accent1 hover:bg-dashboard-accent1 hover:text-white">
          View Flow Chart
        </Button>
      </div>

      <Card className="bg-dashboard-card text-white">
        <CardHeader>
          <CardTitle className="text-2xl">CEMETERY FEES AND CHARGES</CardTitle>
          <p className="text-sm text-gray-300">Effective from 1st April 2024</p>
          <p className="text-sm text-gray-300">Under section 15 (1) of the Local Authorities Cemeteries Orders 1977</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-4">Graves without Exclusive Right of Burial</h3>
            <ul className="space-y-2 text-gray-200">
              <li>• Forget Me Not Garden Child Burial - No charge</li>
              <li>• Stillborn/Child (up to 16 years) - No charge</li>
              <li>• Child from outside East Staffordshire - £48.00</li>
              <li>• Person over 16 years - £792.00</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Graves with Exclusive Right of Burial</h3>
            <ul className="space-y-2 text-gray-200">
              <li>• Purchase of Exclusive Right of Burial - £1,245.00</li>
              <li>• Purchase for cremated remains - £433.00</li>
              <li>• Stillborn/Child (up to 16 years) - No charge</li>
              <li>• Child from outside East Staffordshire - £48.00</li>
              <li>• Person over 16 years - £792.00</li>
              <li>• Additional cost for bricked grave - £219.00</li>
              <li>• Burial of cremated remains - £219.00</li>
              <li>• Admin charge for multiple interments - £54.00</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Miscellaneous Charges</h3>
            <ul className="space-y-2 text-gray-200">
              <li>• Transfer of ownership - £57.00</li>
              <li>• Slabbing or sealing a grave - £168.00</li>
              <li>• Exhumation preparation (admin) - £1,265.00</li>
              <li>• Register searches with copy - £26.00</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Monuments and Inscriptions</h3>
            <ul className="space-y-2 text-gray-200">
              <li>• Standard gravestone (max: 1,350mm x 914mm x 460mm) - £378.00</li>
              <li>• Cremated remains memorial (max: 610mm x 610mm x 460mm) - £378.00</li>
              <li>• Vase (unless part of memorial) - £94.00</li>
              <li>• Additional inscription - £122.00</li>
              <li>• Forget-Me-Not Memorial - £60.00</li>
              <li>• Forget-Me-Not Vase - £48.00</li>
              <li>• Forget-Me-Not Plaque (double, inc. VAT) - £227.00</li>
              <li>• Kerb memorial - £889.00</li>
              <li>• Full kerbset with headstone - £1,267.00</li>
              <li>• Memorial replacement fee - £120.00</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Out of Hours Services</h3>
            <p className="text-gray-200">Monday to Friday 4-7pm (subject to staff availability and lighting):</p>
            <p className="text-gray-200">£180.00 per hour (50% reduction if less than 30 minutes)</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Burial Times</h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-200">
              <div>January: 2:30pm - 3:30pm</div>
              <div>February: 3:30pm - 4:30pm</div>
              <div>March: 4:00pm - 5:00pm</div>
              <div>April-August: 5:45pm - 6:45pm</div>
              <div>September: 5:30pm - 6:30pm</div>
              <div>October: 4:00pm - 5:00pm</div>
              <div>November: 2:45pm - 3:45pm</div>
              <div>December: 2:30pm - 3:30pm</div>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Standing Regulations</h3>
            <div className="text-gray-200 space-y-4">
              <p>The fees apply only to Borough of East Staffordshire residents at time of death (minimum 12 months residency required).</p>
              <p>Non-residents face triple fees for interment and Exclusive Right of Burial, except if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The deceased lived in the Borough within the last 20 years for over 5 years</li>
                <li>The deceased was a former resident (5+ years) who moved to a rest/nursing home outside the Borough within the last 20 years</li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalExaminer;