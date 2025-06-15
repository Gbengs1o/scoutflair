// src/app/admin/users/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

type Profile = { id: string; full_name: string; role: string; email: string };

const ManageUsersPage = () => {
  const { profile: adminProfile, loading: isAdminLoading } = useUser();
  const router = useRouter();
  const supabase = createClient();

  const [players, setPlayers] = useState<Profile[]>([]);
  const [coaches, setCoaches] = useState<Profile[]>([]);
  const [scouts, setScouts] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Security Check: Redirect if not an admin
  useEffect(() => {
    if (!isAdminLoading && adminProfile?.role !== 'ADMIN') {
      router.push('/dashboard'); // Or show an "Access Denied" message
    }
  }, [adminProfile, isAdminLoading, router]);

  // Fetch all users
  useEffect(() => {
    if (adminProfile?.role === 'ADMIN') {
      const fetchAllUsers = async () => {
        setIsLoading(true);
        // We need to join with the auth.users table to get emails
        const { data: allProfiles, error } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            role,
            users:auth_users(email)
          `);

        if (error) {
          console.error("Error fetching users:", error);
        } else if (allProfiles) {
          // Flatten and categorize the data
          const enrichedProfiles = allProfiles.map(p => ({ ...p, email: p.users.email }));
          setPlayers(enrichedProfiles.filter(p => p.role === 'PLAYER'));
          setCoaches(enrichedProfiles.filter(p => p.role === 'COACH'));
          setScouts(enrichedProfiles.filter(p => p.role === 'SCOUT'));
        }
        setIsLoading(false);
      };
      fetchAllUsers();
    }
  }, [adminProfile, supabase]);

  const handleImpersonate = async (userId: string) => {
    // This will be our next step
    alert(`Impersonate feature to be built for user: ${userId}`);
  };

  if (isAdminLoading || isLoading) return <div>Loading and verifying access...</div>;
  if (adminProfile?.role !== 'ADMIN') return <div>Access Denied.</div>;

  return (
    <div>
      <h1>Manage All Users</h1>
      {/* Render lists of players, coaches, and scouts */}
      {/* You can map over these arrays and display each user with an "Impersonate" button */}
    </div>
  );
};

export default ManageUsersPage;