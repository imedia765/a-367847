import { supabase } from "@/integrations/supabase/client";
import type { Member } from "@/types/member";

export async function verifyMember(memberNumber: string): Promise<Member> {
  console.log('Verifying member:', memberNumber);
  const normalized = memberNumber.trim().toUpperCase();
  
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('member_number', normalized)
    .single();

  if (error) {
    console.error('Error verifying member:', error);
    throw new Error('Member not found. Please check your member number.');
  }

  console.log('Member found:', data);
  return data;
}

export async function signInMember(memberNumber: string): Promise<any> {
  console.log('Attempting to sign in member:', memberNumber);
  const normalized = memberNumber.trim().toUpperCase();
  
  try {
    // First verify the member exists and get their email
    const member = await verifyMember(normalized);
    if (!member.email) {
      throw new Error('No email found for this member');
    }

    // Attempt to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: member.email,
      password: normalized,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      throw signInError;
    }

    if (!signInData.user) {
      // If sign in fails, try to create the account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: member.email,
        password: normalized,
        options: {
          data: {
            member_number: normalized,
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw signUpError;
      }

      // Update member record with auth_user_id
      if (signUpData.user) {
        await supabase
          .from('members')
          .update({ auth_user_id: signUpData.user.id })
          .eq('member_number', normalized);
      }

      return signUpData.user;
    }

    return signInData.user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}