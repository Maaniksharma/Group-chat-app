import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import PageLoader from './PageLoader';
import GroupsUI from './GroupsUi';

const Groups = () => {
  const { groups, fetchGroups } = useAuth();
  const [hasFetchedGroups, setHasFetchedGroups] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!hasFetchedGroups) {
      setIsLoading(true);
      fetchGroups();
      setHasFetchedGroups(true);
      setIsLoading(false);
    }
  }, [hasFetchedGroups]);
  if (isLoading) return <PageLoader />;
  else return <GroupsUI groups={groups} />;
};

export default Groups;
