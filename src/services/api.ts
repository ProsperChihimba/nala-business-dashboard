// API service for handling all API calls
const API_BASE_URL = 'https://levelsprotech3.pythonanywhere.com/api';

export interface DoctorRegistrationData {
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
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
}

export const apiService = new ApiService();
export default apiService;