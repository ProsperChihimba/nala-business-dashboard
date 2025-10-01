// API service for handling all API calls
const API_BASE_URL = 'https://levelsprotech3.pythonanywhere.com/api';

export interface DoctorRegistrationData {
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  password: string;
  specialization: string;
  license_number: string;
  phone_number: string;
  address: string;
  experience_years: number;
  bio?: string;
  profile_picture?: string;
  is_available?: boolean;
}

export interface DoctorResponse {
  id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  specialization_display: string;
  license_number: string;
  phone_number: string;
  address: string;
  experience_years: number;
  bio?: string;
  profile_picture?: string;
  is_available: boolean;
  schedules: any[];
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthError {
  non_field_errors?: string[];
  username?: string[];
  password?: string[];
}

export interface ScheduleItem {
  id?: number;
  day_of_week: number;
  day_name?: string;
  start_time: string;
  end_time: string;
  consultation_fee: number;
  is_available: boolean;
}

export interface AddScheduleRequest {
  day_of_week: number;
  start_time: string;
  end_time: string;
  consultation_fee: number;
  is_available: boolean;
}

export interface AppointmentPatient {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
}

export interface AppointmentDoctor {
  id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  specialization_display: string;
}

export interface Appointment {
  id: number;
  patient: AppointmentPatient;
  doctor: AppointmentDoctor;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  appointment_type_display: string;
  status: string;
  status_display: string;
  symptoms: string;
  notes: any[];
  prescription: string;
  created_at: string;
  updated_at: string;
}

export interface PatientVital {
  id: number;
  systolic_pressure: number;
  diastolic_pressure: number;
  random_blood_glucose: number;
  pulse_rate: number;
  oxygen_saturation: number;
  temperature: number;
  respiratory_rate: number;
  height: number;
  weight: number;
  created_at: string;
  patient: number;
}

export interface LabTest {
  id: number;
  patient: number;
  doctor: number;
  file_number: string;
  test_date: string;
  test_time: string;
  laboratory_name: string;
  test_type: string;
  status: string;
  test_takes: number;
  recorded_details: string;
  notes?: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvestigationResult {
  id: number;
  test_name: string;
  normal_range: string;
  result: string;
  unit: string;
  is_normal: boolean;
  reference_value: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorNote {
  id: number;
  patient: number;
  doctor: number;
  file_number: string;
  note_type: string;
  note_type_display: string;
  recorded_by: string;
  recorded_details: string;
  diagnosis?: string;
  symptoms?: string;
  treatment_plan?: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Prescription {
  id: number;
  patient: number;
  doctor: number;
  file_number: string;
  prescription_date: string;
  prescription_time: string;
  prescription_details: string;
  status: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  id: number;
  prescription: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData
        });
        
        // Format validation errors for better display
        if (errorData && typeof errorData === 'object') {
          const errorMessages: string[] = [];
          
          // Handle field-specific validation errors
          Object.keys(errorData).forEach(key => {
            if (Array.isArray(errorData[key])) {
              errorMessages.push(`${key}: ${errorData[key].join(', ')}`);
            } else if (typeof errorData[key] === 'string') {
              errorMessages.push(`${key}: ${errorData[key]}`);
            }
          });
          
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join('; '));
          }
        }
        
        throw new Error(
          errorData.message || 
          errorData.detail || 
          `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Doctor registration
  async registerDoctor(data: DoctorRegistrationData): Promise<DoctorResponse> {
    return this.request<DoctorResponse>('/doctors/doctors/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get specific doctor details
  async getDoctor(id: number): Promise<DoctorResponse> {
    return this.request<DoctorResponse>(`/doctors/doctors/${id}/`);
  }

  // Get all doctors (paginated)
  async getDoctors(): Promise<PaginatedResponse<DoctorResponse>> {
    return this.request<PaginatedResponse<DoctorResponse>>('/doctors/doctors/');
  }

  // Doctor login - CORRECTED ENDPOINT
  async loginDoctor(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('Login attempt with credentials:', credentials);
    console.log('Login endpoint:', `${API_BASE_URL}/api-token-auth/`);
    
    return this.request<LoginResponse>('/api-token-auth/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Get doctor profile with authentication (using specific doctor ID)
  async getDoctorProfile(doctorId: number, token: string): Promise<DoctorResponse> {
    return this.request<DoctorResponse>(`/doctors/doctors/${doctorId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get doctor profile by username (for login flow)
  async getDoctorByUsername(username: string, token: string): Promise<DoctorResponse> {
    const response = await this.request<PaginatedResponse<DoctorResponse>>(`/doctors/doctors/?username=${username}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    
    if (response.results && response.results.length > 0) {
      return response.results[0]; // Return the first matching doctor
    } else {
      throw new Error('Doctor not found');
    }
  }


  // Change doctor password
  async changeDoctorPassword(
    token: string, 
    oldPassword: string, 
    newPassword: string
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>('/doctors/change-password/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirm: newPassword
      }),
    });
  }

  // Add doctor schedule
  async addDoctorSchedule(
    doctorId: number,
    token: string,
    scheduleData: AddScheduleRequest
  ): Promise<ScheduleItem> {
    return this.request<ScheduleItem>(`/doctors/doctors/${doctorId}/add_schedule/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    });
  }

  // Get doctor schedule
  async getDoctorSchedule(doctorId: number, token: string): Promise<ScheduleItem[]> {
    return this.request<ScheduleItem[]>(`/doctors/doctors/${doctorId}/schedule/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get doctor appointments
  async getDoctorAppointments(doctorId: number, token: string): Promise<Appointment[]> {
    return this.request<Appointment[]>(`/appointments/appointments/doctor_appointments/?doctor_id=${doctorId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get patient details by ID
  async getPatient(patientId: number, token: string): Promise<AppointmentPatient> {
    return this.request<AppointmentPatient>(`/patients/patients/${patientId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get patient vitals by patient ID
  async getPatientVitals(patientId: number, token: string): Promise<PaginatedResponse<PatientVital>> {
    return this.request<PaginatedResponse<PatientVital>>(`/patients/vitals/?patient=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Add patient vitals
  async addPatientVital(vitalData: Omit<PatientVital, 'id' | 'created_at'>, token: string): Promise<PatientVital> {
    return this.request<PatientVital>('/patients/vitals/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vitalData),
    });
  }

  // Add lab test for patient
  async addLabTest(labTestData: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<LabTest> {
    return this.request<LabTest>('/lab-tests/tests/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(labTestData),
    });
  }

  // Get lab tests for patient
  async getPatientLabTests(patientId: number, token: string): Promise<PaginatedResponse<LabTest>> {
    return this.request<PaginatedResponse<LabTest>>(`/lab-tests/tests/?patient=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Add investigation result
  async addInvestigationResult(resultData: Omit<InvestigationResult, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<InvestigationResult> {
    return this.request<InvestigationResult>('/lab-tests/investigation-results/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    });
  }

  // Add doctor note (including clerk sheet)
  async addDoctorNote(noteData: Omit<DoctorNote, 'id' | 'created_at' | 'updated_at' | 'note_type_display'>, token: string): Promise<DoctorNote> {
    return this.request<DoctorNote>('/appointments/doctor-notes/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
  }

  // Get doctor notes for patient
  async getPatientDoctorNotes(patientId: number, token: string): Promise<PaginatedResponse<DoctorNote>> {
    return this.request<PaginatedResponse<DoctorNote>>(`/appointments/doctor-notes/?patient=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get clerk sheets for patient
  async getPatientClerkSheets(patientId: number, token: string): Promise<PaginatedResponse<DoctorNote>> {
    return this.request<PaginatedResponse<DoctorNote>>(`/appointments/doctor-notes/?patient=${patientId}&note_type_display=Clerk%20Sheet`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Add prescription for patient
  async addPrescription(prescriptionData: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<Prescription> {
    return this.request<Prescription>('/prescriptions/prescriptions/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prescriptionData),
    });
  }

  // Get prescriptions for patient
  async getPatientPrescriptions(patientId: number, token: string): Promise<PaginatedResponse<Prescription>> {
    return this.request<PaginatedResponse<Prescription>>(`/prescriptions/prescriptions/?patient=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Add medication to prescription
  async addMedication(medicationData: Omit<Medication, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<Medication> {
    return this.request<Medication>('/prescriptions/medications/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicationData),
    });
  }

  // Get medications for prescription
  async getPrescriptionMedications(prescriptionId: number, token: string): Promise<PaginatedResponse<Medication>> {
    return this.request<PaginatedResponse<Medication>>(`/prescriptions/medications/?prescription=${prescriptionId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
export default apiService;