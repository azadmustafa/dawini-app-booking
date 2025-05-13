
import { createContext, useState, ReactNode, useContext } from 'react';
import { Doctor, Appointment, addAppointment as addNewAppointment } from '../data/mockData';

interface AppContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  myAppointments: Appointment[];
  addAppointment: (doctorId: string, date: string, time: string) => Appointment;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const addAppointment = (doctorId: string, date: string, time: string) => {
    const newAppointment = addNewAppointment(doctorId, date, time);
    setMyAppointments([...myAppointments, newAppointment]);
    return newAppointment;
  };

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        myAppointments,
        addAppointment,
        selectedDoctor,
        setSelectedDoctor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
