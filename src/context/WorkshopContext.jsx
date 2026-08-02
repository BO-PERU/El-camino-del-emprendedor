import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const WorkshopContext = createContext({});

export const WorkshopProvider = ({ children }) => {
  const { user } = useAuth();
  const [participant, setParticipant] = useState(null);
  const [loadingWorkshop, setLoadingWorkshop] = useState(true);

  useEffect(() => {
    if (!user) {
      setParticipant(null);
      setLoadingWorkshop(false);
      return;
    }

    // If it's a mock user, just set a mock participant
    if (user.id === 'mock-123') {
      setParticipant({ id: 'mock-participant-123', user_id: 'mock-123', workshop_id: 'mock-workshop' });
      setLoadingWorkshop(false);
      return;
    }

    const initWorkshop = async () => {
      try {
        // 1. Get or create a default workshop
        let { data: workshop } = await supabase
          .from('workshops')
          .select('*')
          .eq('status', 'active')
          .limit(1)
          .single();

        if (!workshop) {
          // If Mario logs in, he's admin, so he can create the default workshop
          if (user.role === 'admin' || user.role === 'superadmin') {
             const { data: newWorkshop, error } = await supabase
               .from('workshops')
               .insert({ name: 'Taller Pan y Tortas Base', facilitator_id: user.id })
               .select()
               .single();
             if (error) throw error;
             workshop = newWorkshop;
          } else {
             // If a normal user logs in and no workshop exists, this is an edge case.
             // We can't let them proceed until an admin creates one.
             console.error("No active workshop found.");
             setLoadingWorkshop(false);
             return;
          }
        }

        // 2. Get or create participant record for this user in this workshop
        let { data: participantRecord } = await supabase
          .from('participants')
          .select('*')
          .eq('user_id', user.id)
          .eq('workshop_id', workshop.id)
          .single();

        if (!participantRecord) {
          const { data: newParticipant, error } = await supabase
            .from('participants')
            .insert({ user_id: user.id, workshop_id: workshop.id })
            .select()
            .single();
          if (error) throw error;
          participantRecord = newParticipant;
        }

        setParticipant(participantRecord);
      } catch (err) {
        console.error("Error initializing workshop:", err);
      } finally {
        setLoadingWorkshop(false);
      }
    };

    initWorkshop();
  }, [user]);

  const updateParticipant = (newData) => {
    setParticipant(prev => ({ ...prev, ...newData }));
  };

  return (
    <WorkshopContext.Provider value={{ participant, loadingWorkshop, updateParticipant }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => useContext(WorkshopContext);
