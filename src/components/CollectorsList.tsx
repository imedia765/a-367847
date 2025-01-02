import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Database } from '@/integrations/supabase/types';
import { UserCheck, Users } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TotalCount from "@/components/TotalCount";
import CollectorMembers from "@/components/CollectorMembers";
import PrintButtons from "@/components/PrintButtons";
import { useToast } from "@/hooks/use-toast";

type MemberCollector = Database['public']['Tables']['members_collectors']['Row'];
type Member = Database['public']['Tables']['members']['Row'];

const CollectorsList = () => {
  const { toast } = useToast();

  // Fetch all members for the master print functionality
  const { data: allMembers, isError: membersError } = useQuery({
    queryKey: ['all_members'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('member_number', { ascending: true });
        
        if (error) throw error;
        return data as Member[];
      } catch (error) {
        console.error('Error fetching members:', error);
        toast({
          title: "Error",
          description: "Failed to fetch members list",
          variant: "destructive",
        });
        throw error;
      }
    },
  });

  const { 
    data: collectors, 
    isLoading: collectorsLoading, 
    error: collectorsError 
  } = useQuery({
    queryKey: ['members_collectors'],
    queryFn: async () => {
      console.log('Fetching collectors from members_collectors...');
      try {
        const { data: collectorsData, error: collectorsError } = await supabase
          .from('members_collectors')
          .select(`
            id,
            name,
            prefix,
            number,
            email,
            phone,
            active,
            created_at,
            updated_at
          `)
          .order('number', { ascending: true });
        
        if (collectorsError) {
          console.error('Error fetching collectors:', collectorsError);
          throw collectorsError;
        }

        const collectorsWithCounts = await Promise.all(collectorsData?.map(async (collector) => {
          const { count } = await supabase
            .from('members')
            .select('*', { count: 'exact', head: true })
            .eq('collector', collector.name);
          
          return {
            ...collector,
            memberCount: count || 0
          };
        }) || []);

        return collectorsWithCounts;
      } catch (error) {
        console.error('Error processing collectors:', error);
        toast({
          title: "Error",
          description: "Failed to fetch collectors information",
          variant: "destructive",
        });
        throw error;
      }
    },
  });

  // Calculate total members across all collectors
  const totalMembers = collectors?.reduce((total, collector) => total + (collector.memberCount || 0), 0) || 0;

  if (collectorsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (collectorsError || membersError) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-red-500">Error loading data</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!collectors?.length) {
    return (
      <div className="text-center py-8 text-dashboard-text">
        No collectors found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TotalCount 
        items={[
          {
            count: totalMembers,
            label: "Total Members",
            icon: <Users className="w-6 h-6 text-blue-400" />
          },
          {
            count: collectors.length,
            label: "Total Collectors",
            icon: <UserCheck className="w-6 h-6 text-purple-400" />
          }
        ]}
      />
      <div className="flex justify-end mb-4">
        <PrintButtons allMembers={allMembers} />
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {collectors.map((collector) => (          
          <AccordionItem
            key={collector.id}
            value={collector.id}
            className="bg-dashboard-card border border-white/10 rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dashboard-accent1 flex items-center justify-center text-white font-medium">
                    {collector.prefix}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{collector.name}</p>
                      <span className="text-sm text-gray-400">#{collector.number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-dashboard-text">
                      <UserCheck className="w-4 h-4" />
                      <span>Collector</span>
                      <span className="text-purple-400">({collector.memberCount} members)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PrintButtons collectorName={collector.name || ''} />
                  <div className={`px-3 py-1 rounded-full ${
                    collector.active 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {collector.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3 mt-2">
                {collector.memberCount > 0 ? (
                  <CollectorMembers collectorName={collector.name || ''} />
                ) : (
                  <p className="text-sm text-gray-400">No members assigned to this collector</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CollectorsList;