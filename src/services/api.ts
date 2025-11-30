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

export interface PatientRegistrationData {
  username: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_group?: string;
  allergies?: string;
  medical_history?: string;
  purpose?: string;
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
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_group?: string;
  allergies?: string;
  medical_history?: string;
  purpose?: string;
  created_at?: string;
  updated_at?: string;
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

export interface BloodPressureReading {
  id: number;
  patient: number;
  systolic_pressure: number;
  diastolic_pressure: number;
  pulse_rate?: number;
  reading_date?: string;
  reading_time?: string;
  notes?: string;
  image?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface LearnArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
  image_url?: string;
  author: {
    id: number;
    first_name: string;
    last_name: string;
    specialization: string;
  };
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateLearnArticleRequest {
  title: string;
  description: string;
  content: string;
  doctor?: number;
  tags?: string[];
  image_url?: string;
}

export interface UpdateLearnArticleRequest {
  title?: string;
  description?: string;
  content?: string;
  tags?: string[];
  image_url?: string;
  is_published?: boolean;
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

export interface DoctorNoteExtended extends Omit<DoctorNote, 'patient' | 'doctor'> {
  patient: AppointmentPatient;
  doctor: {
    id: number;
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
    };
    specialization: string;
    license_number: string;
    phone_number: string;
    address: string;
    experience_years: number;
    bio?: string;
    profile_picture?: string;
    consultation_fee: string;
    is_available: boolean;
  };
  date_of_clerkship?: string;
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
    
    // Ensure headers are properly merged - Authorization header must be preserved
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    
    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      // Log request for debugging (without sensitive token data)
      if (config.headers && typeof config.headers === 'object') {
        const headers = config.headers as Record<string, string>;
        const hasAuth = !!headers['Authorization'];
        console.log('API Request:', {
          url,
          method: config.method || 'GET',
          hasAuthorization: hasAuth,
          authPrefix: hasAuth ? headers['Authorization']?.substring(0, 15) + '...' : 'MISSING',
        });
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Log full request details for 403 errors
        if (response.status === 403) {
          const headers = config.headers as Record<string, string>;
          console.error('🚫 403 Forbidden Error Details:', {
            url: url,
            method: config.method,
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            requestHeaders: {
              'Authorization': headers['Authorization'] ? `${headers['Authorization'].substring(0, 15)}...` : 'MISSING',
              'Content-Type': headers['Content-Type'] || 'MISSING',
            },
            requestBody: config.body ? (typeof config.body === 'string' ? JSON.parse(config.body) : config.body) : 'NONE',
            hasAuthHeader: !!headers['Authorization'],
            authHeaderFormat: headers['Authorization'] ? (headers['Authorization'].startsWith('Token ') ? 'CORRECT (Token prefix)' : 'WRONG FORMAT') : 'MISSING'
          });
        } else {
          console.error('API Error Details:', {
            status: response.status,
            statusText: response.statusText,
            url: url,
            errorData: errorData,
            hasAuthHeader: !!(config.headers && (config.headers as Record<string, string>)['Authorization'])
          });
        }
        
        // Special handling for 403 Forbidden errors
        if (response.status === 403) {
          throw new Error(
            errorData.detail || 
            'You do not have permission to perform this action. Please ensure you are logged in as a doctor.'
          );
        }

        // Temporary workaround: treat 500 from learn articles endpoints as success
        // This is to handle a backend quirk where the operation succeeds but returns 500
        if (response.status === 500 && url.includes('/learn/articles/')) {
          console.warn('Treating 500 from learn articles endpoint as success (temporary workaround)');
          return undefined as unknown as T;
        }
        
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

      // Gracefully handle empty/non-JSON responses (e.g., 204 or backends returning no body)
      const contentType = response.headers.get('content-type') || '';
      if (response.status === 204 || !contentType.includes('application/json')) {
        return undefined as unknown as T;
      }

      // Some servers return 200 with empty body; handle safely
      const rawText = await response.text();
      if (!rawText) {
        return undefined as unknown as T;
      }
      try {
        return JSON.parse(rawText) as T;
      } catch {
        // If parsing fails, return undefined to avoid throwing despite successful status
        return undefined as unknown as T;
      }
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

  // Patient registration
  async registerPatient(data: PatientRegistrationData): Promise<AppointmentPatient> {
    return this.request<AppointmentPatient>('/patients/register/', {
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

  // Get patient notes with full details
  async getPatientNotesDetails(patientId: number, token: string): Promise<DoctorNoteExtended[]> {
    try {
      const response = await this.request<DoctorNoteExtended[]>(`/appointments/doctor-notes/patient_notes/?patient_id=${patientId}`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log('getPatientNotesDetails response:', response);
      return response;
    } catch (error) {
      console.error('Error in getPatientNotesDetails:', error);
      throw error;
    }
  }

  // Update existing doctor schedule
  async updateDoctorSchedule(
    scheduleId: number,
    scheduleData: Partial<AddScheduleRequest>,
    token: string
  ): Promise<ScheduleItem> {
    return this.request<ScheduleItem>(`/doctors/schedules/${scheduleId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
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

  // Blood Pressure Readings API methods
  // Add blood pressure reading
  async addBloodPressureReading(readingData: Omit<BloodPressureReading, 'id' | 'created_at' | 'updated_at' | 'image_url'>, token: string): Promise<BloodPressureReading> {
    return this.request<BloodPressureReading>('/patients/blood-pressure-readings/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readingData),
    });
  }

  // Get blood pressure readings for patient
  async getPatientBloodPressureReadings(patientId: number, token: string): Promise<BloodPressureReading[]> {
    return this.request<BloodPressureReading[]>(`/patients/blood-pressure-readings/patient_readings/?patient_id=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get latest blood pressure reading for patient
  async getLatestBloodPressureReading(patientId: number, token: string): Promise<BloodPressureReading> {
    return this.request<BloodPressureReading>(`/patients/blood-pressure-readings/latest_reading/?patient_id=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Get all blood pressure readings with filtering
  async getBloodPressureReadings(patientId: number, token: string): Promise<PaginatedResponse<BloodPressureReading>> {
    return this.request<PaginatedResponse<BloodPressureReading>>(`/patients/blood-pressure-readings/?patient=${patientId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Update blood pressure reading
  async updateBloodPressureReading(readingId: number, readingData: Partial<Omit<BloodPressureReading, 'id' | 'created_at' | 'updated_at' | 'image_url'>>, token: string): Promise<BloodPressureReading> {
    return this.request<BloodPressureReading>(`/patients/blood-pressure-readings/${readingId}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readingData),
    });
  }

  // Delete blood pressure reading
  async deleteBloodPressureReading(readingId: number, token: string): Promise<void> {
    return this.request<void>(`/patients/blood-pressure-readings/${readingId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  // Learn Articles API methods
  // Create learn article (doctor only)
  async createLearnArticle(articleData: CreateLearnArticleRequest, token: string): Promise<LearnArticle> {
    if (!token) {
      throw new Error('Doctor token is required. Please login as a doctor.');
    }

    // Log request details for debugging
    console.log('Creating learn article with:', {
      endpoint: '/learn/articles/',
      hasToken: !!token,
      tokenPrefix: token.substring(0, 10) + '...',
      articleData: {
        ...articleData,
        doctor: articleData.doctor || 'NOT SET'
      }
    });

    try {
      const response = await this.request<LearnArticle>('/learn/articles/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      return response;
    } catch (error) {
      // Enhanced error handling for 403 errors
      if (error instanceof Error && error.message.includes('403')) {
        throw new Error('You must be a doctor to create articles. Please login as a doctor.');
      }
      throw error;
    }
  }

  // Get all learn articles (public)
  async getLearnArticles(params?: {
    doctor?: number;
    is_published?: boolean;
    search?: string;
    ordering?: string;
  }): Promise<PaginatedResponse<LearnArticle>> {
    const queryParams = new URLSearchParams();
    if (params?.doctor) queryParams.append('doctor', params.doctor.toString());
    if (params?.is_published !== undefined) queryParams.append('is_published', params.is_published.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/learn/articles/?${queryString}` : '/learn/articles/';
    
    return this.request<PaginatedResponse<LearnArticle>>(endpoint);
  }

  // Get single learn article (public)
  async getLearnArticle(articleId: number): Promise<LearnArticle> {
    return this.request<LearnArticle>(`/learn/articles/${articleId}/`);
  }

  // Update learn article (doctor only - author only)
  async updateLearnArticle(
    articleId: number,
    articleData: UpdateLearnArticleRequest & { doctor?: number },
    token: string,
    doctorId?: number,
    method: 'PATCH' | 'PUT' = 'PATCH',
  ): Promise<LearnArticle> {
    const payload = { ...articleData } as UpdateLearnArticleRequest & { doctor?: number };
    if (doctorId && !payload.doctor) {
      payload.doctor = doctorId;
    }
    return this.request<LearnArticle>(`/learn/articles/${articleId}/`, {
      method,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }

  // Delete learn article (doctor only - author only)
  async deleteLearnArticle(articleId: number, token: string, doctorId?: number): Promise<void> {
    const body = doctorId ? { doctor: doctorId } : undefined;
    return this.request<void>(`/learn/articles/${articleId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // Get articles by tags (public)
  async getLearnArticlesByTags(tags: string[]): Promise<LearnArticle[]> {
    const tagsString = tags.join(',');
    return this.request<LearnArticle[]>(`/learn/articles/by_tags/?tags=${tagsString}`);
  }
}

export const apiService = new ApiService();
export default apiService;