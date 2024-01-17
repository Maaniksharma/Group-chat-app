import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import PageLoader from './PageLoader';
import GroupsUI from './GroupsUi';

const Groups = () => {
  const { groups, fetchGroups, fetchInvitations } = useAuth();
  const [hasFetchedGroups, setHasFetchedGroups] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchInitialData = async () => {
    setIsLoading(true);
    await fetchInvitations();
    await fetchGroups();
    setIsLoading(false);
  };
  useEffect(() => {
    if (!hasFetchedGroups) {
      fetchInitialData();
      setHasFetchedGroups(true);
    }
  }, [hasFetchedGroups]);
  if (isLoading) return <PageLoader />;
  else return <GroupsUI groups={groups} />;
};

export default Groups;
