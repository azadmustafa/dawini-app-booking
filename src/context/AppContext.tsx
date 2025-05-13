
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { 
  Doctor, 
  Appointment, 
  User,
  Question,
  Answer,
  addAppointment as addNewAppointment,
  login as authLogin,
  register as authRegister,
  addQuestion as createQuestion,
  addAnswer as createAnswer,
  questions as initialQuestions,
} from '../data/mockData';

interface AppContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  myAppointments: Appointment[];
  addAppointment: (doctorId: string, date: string, time: string) => Appointment;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  // Auth related
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => User;
  // Questions and Answers
  questions: Question[];
  addQuestion: (category: string, title: string, content: string) => Question | null;
  addAnswer: (questionId: string, content: string) => Answer | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Questions state
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    
    const storedAppointments = localStorage.getItem('myAppointments');
    if (storedAppointments) {
      setMyAppointments(JSON.parse(storedAppointments));
    }
    
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('myAppointments', JSON.stringify(myAppointments));
  }, [myAppointments]);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addAppointment = (doctorId: string, date: string, time: string) => {
    if (!isAuthenticated) {
      throw new Error('يجب تسجيل الدخول لحجز موعد');
    }
    
    const newAppointment = addNewAppointment(doctorId, date, time);
    setMyAppointments([...myAppointments, newAppointment]);
    return newAppointment;
  };

  const login = (email: string, password: string) => {
    const user = authLogin(email, password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const register = (userData: Omit<User, 'id'>) => {
    const newUser = authRegister(userData);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const addQuestion = (category: string, title: string, content: string): Question | null => {
    if (!isAuthenticated || !currentUser) {
      return null;
    }

    const newQuestion = createQuestion(currentUser.id, category, title, content);
    setQuestions([...questions, newQuestion]);
    return newQuestion;
  };

  const addAnswer = (questionId: string, content: string): Answer | null => {
    if (!isAuthenticated || !currentUser || currentUser.role !== 'doctor') {
      return null;
    }

    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) return null;

    const answer = createAnswer(questionId, currentUser.id, content);
    if (!answer) return null;

    const updatedQuestion = {
      ...questions[questionIndex],
      status: 'answered' as const,
      answers: [...questions[questionIndex].answers, answer]
    };

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = updatedQuestion;
    
    setQuestions(updatedQuestions);
    return answer;
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
        currentUser,
        isAuthenticated,
        login,
        logout,
        register,
        questions,
        addQuestion,
        addAnswer,
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
