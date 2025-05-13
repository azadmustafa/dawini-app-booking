
import { faker } from '@faker-js/faker/locale/ar';

export interface DoctorCategory {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  count: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  image: string;
  experience: number;
  location: string;
  price: number;
  availableDates: string[];
  about: string;
  bio?: string;
  specializations?: string[];
  languages?: string[];
  education?: string[];
  certificates?: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profileImage?: string;
  role: 'patient' | 'doctor' | 'admin';
}

export interface Question {
  id: string;
  patientId: string;
  category: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'answered';
  answers: Answer[];
}

export interface Answer {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  specialty: string;
  content: string;
  date: string;
}

// Doctor Categories
export const categories: DoctorCategory[] = [
  {
    id: "cat1",
    name: "General",
    arabicName: "طب عام",
    icon: "stethoscope",
    count: 72
  },
  {
    id: "cat2",
    name: "Dentist",
    arabicName: "طب الأسنان",
    icon: "tooth",
    count: 65
  },
  {
    id: "cat3",
    name: "Ophthalmologist",
    arabicName: "طب العيون",
    icon: "eye",
    count: 48
  },
  {
    id: "cat4",
    name: "Pediatrician",
    arabicName: "طب الأطفال",
    icon: "baby",
    count: 57
  },
  {
    id: "cat5",
    name: "Cardiologist",
    arabicName: "طب القلب",
    icon: "heart-pulse",
    count: 42
  },
  {
    id: "cat6",
    name: "Dermatologist",
    arabicName: "طب الجلدية",
    icon: "allergens",
    count: 53
  },
  {
    id: "cat7",
    name: "Neurologist",
    arabicName: "طب الأعصاب",
    icon: "brain",
    count: 38
  },
  {
    id: "cat8",
    name: "Orthopedic",
    arabicName: "طب العظام",
    icon: "bone",
    count: 45
  },
  {
    id: "cat9",
    name: "Psychiatrist",
    arabicName: "الطب النفسي",
    icon: "brain",
    count: 32
  },
  {
    id: "cat10",
    name: "Gynecologist",
    arabicName: "طب النساء",
    icon: "female",
    count: 48
  }
];

// Generate random doctors (500)
function generateRandomDoctors(count: number): Doctor[] {
  const specialties = categories.map(cat => cat.arabicName);
  const randomDoctors: Doctor[] = [];

  for (let i = 0; i < count; i++) {
    const specialtyIndex = faker.number.int({ min: 0, max: specialties.length - 1 });
    const specialty = specialties[specialtyIndex];
    
    // Generate 3-5 random dates in the next 30 days
    const availableDates: string[] = [];
    const numDates = faker.number.int({ min: 3, max: 5 });
    const today = new Date();
    
    for (let j = 0; j < numDates; j++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + faker.number.int({ min: 1, max: 30 }));
      availableDates.push(futureDate.toISOString().split('T')[0]);
    }

    // Create languages array
    const langCount = faker.number.int({ min: 1, max: 3 });
    const languages = [];
    const possibleLangs = ["العربية", "الإنجليزية", "الفرنسية", "الألمانية", "الإسبانية"];
    for (let l = 0; l < langCount; l++) {
      languages.push(possibleLangs[faker.number.int({ min: 0, max: possibleLangs.length - 1 })]);
    }

    // Create specializations
    const specCount = faker.number.int({ min: 1, max: 4 });
    const specializations = [];
    for (let s = 0; s < specCount; s++) {
      specializations.push(faker.medicine.medicinalName());
    }

    // Create education background
    const education = [
      `بكالوريوس في ${specialty} من جامعة ${faker.location.city()}`,
      `${faker.helpers.maybe(() => `ماجستير في ${faker.medicine.medicinalName()} من جامعة ${faker.location.city()}`, { probability: 0.6 })}`
    ].filter(Boolean);

    // Create certificates
    const certCount = faker.number.int({ min: 0, max: 3 });
    const certificates = [];
    for (let c = 0; c < certCount; c++) {
      certificates.push(`شهادة في ${faker.medicine.medicinalName()} (${2010 + faker.number.int({ min: 0, max: 13 })})`);
    }

    const doctor: Doctor = {
      id: `doc${i + 1}`,
      name: `د. ${faker.person.fullName()}`,
      specialty,
      rating: Number(faker.finance.amount({ min: 3.5, max: 5, dec: 1 })),
      reviewCount: faker.number.int({ min: 5, max: 300 }),
      image: `/doctors/doctor${(i % 6) + 1}.jpg`,
      experience: faker.number.int({ min: 1, max: 30 }),
      location: `${faker.helpers.arrayElement(['عيادة', 'مستشفى', 'مركز'])} ${faker.company.name()}`,
      price: faker.helpers.arrayElement([100, 150, 200, 250, 300, 350, 400, 450, 500]),
      availableDates,
      about: faker.lorem.paragraph({ min: 2, max: 4 }),
      bio: faker.lorem.paragraph(),
      specializations,
      languages,
      education: education as string[],
      certificates
    };

    randomDoctors.push(doctor);
  }

  return randomDoctors;
}

// Generate 500 random doctors
export const doctors: Doctor[] = generateRandomDoctors(500);

// Time slots for appointments
export const timeSlots = [
  "9:00 صباحًا",
  "9:30 صباحًا",
  "10:00 صباحًا",
  "10:30 صباحًا",
  "11:00 صباحًا",
  "11:30 صباحًا",
  "12:00 ظهرًا",
  "12:30 ظهرًا",
  "1:00 مساءً",
  "1:30 مساءً",
  "2:00 مساءً",
  "2:30 مساءً",
  "3:00 مساءً",
  "3:30 مساءً",
  "4:00 مساءً",
  "4:30 مساءً",
  "5:00 مساءً",
  "5:30 مساءً"
];

// Mock users
export const users: User[] = [
  {
    id: 'user1',
    fullName: 'أحمد خالد',
    email: 'ahmed@example.com',
    phoneNumber: '05XXXXXXXX',
    password: 'password123',
    profileImage: '/profile/avatar1.jpg',
    role: 'patient'
  },
  {
    id: 'user2',
    fullName: 'سارة محمد',
    email: 'sara@example.com',
    phoneNumber: '05XXXXXXXX',
    password: 'password123',
    profileImage: '/profile/avatar2.jpg',
    role: 'patient'
  }
];

// Mock questions
export const questions: Question[] = [
  {
    id: 'q1',
    patientId: 'user1',
    category: 'طب عام',
    title: 'أعاني من صداع مستمر منذ أسبوع',
    content: 'أعاني من صداع مستمر في الجانب الأيمن من الرأس منذ أسبوع تقريباً، هل هذا يستدعي زيارة الطبيب أم يمكن علاجه بالمسكنات؟',
    date: '2025-05-10',
    status: 'answered',
    answers: [
      {
        id: 'a1',
        doctorId: 'doc1',
        doctorName: doctors[0].name,
        doctorImage: doctors[0].image,
        specialty: doctors[0].specialty,
        content: 'إذا كان الصداع مستمراً لمدة أسبوع فينصح بزيارة الطبيب لتقييم الحالة، خاصة إذا كان في جهة واحدة من الرأس. قد تحتاج لفحوصات إضافية لتحديد السبب.',
        date: '2025-05-11'
      }
    ]
  },
  {
    id: 'q2',
    patientId: 'user2',
    category: 'طب الأسنان',
    title: 'ألم في ضرس العقل',
    content: 'بدأت أشعر بألم في منطقة ضرس العقل العلوي، وأحياناً ينتشر الألم إلى الأذن. هل يجب خلع الضرس أم هناك علاجات أخرى؟',
    date: '2025-05-12',
    status: 'pending',
    answers: []
  }
];

// Initial empty appointments array
export let appointments: Appointment[] = [];

// Function to add a new appointment
export const addAppointment = (doctorId: string, date: string, time: string): Appointment => {
  const newAppointment: Appointment = {
    id: `app-${Date.now()}`,
    doctorId,
    date,
    time,
    status: 'pending'
  };
  appointments = [...appointments, newAppointment];
  return newAppointment;
};

// Function to find appointments
export const getAppointmentsByDoctorId = (doctorId: string) => {
  return appointments.filter(app => app.doctorId === doctorId);
};

// Function to get a doctor by id
export const getDoctorById = (id: string) => {
  return doctors.find(doctor => doctor.id === id);
};

// Function to add new question
export const addQuestion = (patientId: string, category: string, title: string, content: string): Question => {
  const newQuestion: Question = {
    id: `q-${Date.now()}`,
    patientId,
    category,
    title,
    content,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    answers: []
  };
  
  return newQuestion;
};

// Function to add answer to question
export const addAnswer = (questionId: string, doctorId: string, content: string): Answer | null => {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;
  
  const newAnswer: Answer = {
    id: `a-${Date.now()}`,
    doctorId,
    doctorName: doctor.name,
    doctorImage: doctor.image,
    specialty: doctor.specialty,
    content,
    date: new Date().toISOString().split('T')[0],
  };
  
  return newAnswer;
};

// Authentication functions
export const login = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const register = (userData: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: `user-${Date.now()}`,
    ...userData
  };
  
  users.push(newUser);
  return newUser;
};
