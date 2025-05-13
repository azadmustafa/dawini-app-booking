
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
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Doctor Categories
export const categories: DoctorCategory[] = [
  {
    id: "cat1",
    name: "General",
    arabicName: "طب عام",
    icon: "stethoscope",
    count: 42
  },
  {
    id: "cat2",
    name: "Dentist",
    arabicName: "طب الأسنان",
    icon: "tooth",
    count: 28
  },
  {
    id: "cat3",
    name: "Ophthalmologist",
    arabicName: "طب العيون",
    icon: "eye",
    count: 15
  },
  {
    id: "cat4",
    name: "Pediatrician",
    arabicName: "طب الأطفال",
    icon: "baby",
    count: 24
  },
  {
    id: "cat5",
    name: "Cardiologist",
    arabicName: "طب القلب",
    icon: "heart-pulse",
    count: 18
  },
  {
    id: "cat6",
    name: "Dermatologist",
    arabicName: "طب الجلدية",
    icon: "allergens",
    count: 21
  }
];

// Mock Doctors Data
export const doctors: Doctor[] = [
  {
    id: "doc1",
    name: "د. محمد عبدالله",
    specialty: "طب عام",
    rating: 4.8,
    reviewCount: 124,
    image: "/doctors/doctor1.jpg",
    experience: 10,
    location: "مستشفى المركز الطبي",
    price: 150,
    availableDates: [
      "2025-05-14",
      "2025-05-15",
      "2025-05-16",
      "2025-05-20"
    ],
    about: "الدكتور محمد عبدالله هو طبيب عام ذو خبرة تزيد عن 10 سنوات في مجالات صحة الأسرة والرعاية الأولية والطب الوقائي. تخرج من كلية الطب بجامعة القاهرة وأكمل تدريبه في مستشفى المركز الطبي."
  },
  {
    id: "doc2",
    name: "د. سارة الأحمد",
    specialty: "طب الأسنان",
    rating: 4.9,
    reviewCount: 87,
    image: "/doctors/doctor2.jpg",
    experience: 8,
    location: "عيادة الأسنان المتقدمة",
    price: 200,
    availableDates: [
      "2025-05-14",
      "2025-05-17",
      "2025-05-18",
      "2025-05-19"
    ],
    about: "الدكتورة سارة الأحمد هي طبيبة أسنان متخصصة في علاج وتجميل الأسنان. لديها خبرة 8 سنوات في مجال طب الأسنان التجميلي وتقويم الأسنان."
  },
  {
    id: "doc3",
    name: "د. أحمد محمود",
    specialty: "طب العيون",
    rating: 4.7,
    reviewCount: 56,
    image: "/doctors/doctor3.jpg",
    experience: 12,
    location: "مركز النور للعيون",
    price: 250,
    availableDates: [
      "2025-05-15",
      "2025-05-16",
      "2025-05-17",
      "2025-05-21"
    ],
    about: "الدكتور أحمد محمود طبيب عيون متخصص في جراحة الليزك وعلاج أمراض العيون المختلفة. خريج كلية الطب بجامعة عين شمس ولديه خبرة 12 عامًا في مجال طب وجراحة العيون."
  },
  {
    id: "doc4",
    name: "د. ليلى خالد",
    specialty: "طب الأطفال",
    rating: 4.9,
    reviewCount: 143,
    image: "/doctors/doctor4.jpg",
    experience: 15,
    location: "مستشفى الأطفال التخصصي",
    price: 180,
    availableDates: [
      "2025-05-14",
      "2025-05-16",
      "2025-05-18",
      "2025-05-20"
    ],
    about: "الدكتورة ليلى خالد هي استشارية طب أطفال حاصلة على الزمالة البريطانية في طب الأطفال. تتمتع بخبرة 15 عامًا في تشخيص وعلاج أمراض الأطفال المختلفة."
  },
  {
    id: "doc5",
    name: "د. خالد الصالح",
    specialty: "طب القلب",
    rating: 4.8,
    reviewCount: 92,
    image: "/doctors/doctor5.jpg",
    experience: 14,
    location: "مركز القلب التخصصي",
    price: 300,
    availableDates: [
      "2025-05-15",
      "2025-05-17",
      "2025-05-19",
      "2025-05-21"
    ],
    about: "الدكتور خالد الصالح هو استشاري أمراض القلب والأوعية الدموية. حاصل على الزمالة الأمريكية في أمراض القلب ولديه خبرة 14 عامًا في تشخيص وعلاج أمراض القلب المختلفة."
  },
  {
    id: "doc6",
    name: "د. نورا سعيد",
    specialty: "طب الجلدية",
    rating: 4.7,
    reviewCount: 78,
    image: "/doctors/doctor6.jpg",
    experience: 9,
    location: "عيادة الجلدية المتخصصة",
    price: 220,
    availableDates: [
      "2025-05-14",
      "2025-05-16",
      "2025-05-18",
      "2025-05-20"
    ],
    about: "الدكتورة نورا سعيد متخصصة في أمراض الجلد والتجميل. حاصلة على دكتوراه في أمراض الجلد من جامعة الإسكندرية ولديها خبرة 9 سنوات في مجال العناية بالبشرة والعلاجات التجميلية المتقدمة."
  }
];

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
