export interface MotorResponseDto {
  device_id: string;
  timestamp: string;
  sensors: MotorSensorsResponseDto;
  twin_state: MotorTwinStateResponseDto;
  id?: string;
}

export interface MotorSensorsResponseDto {
  temp_c: number;
  vib_g: number;
  current_a: number;
  speed_rpm: number;
  operation_hours?: number;
  input_voltage_v?: number;
}

export interface MotorTwinStateResponseDto {
  status: 'Normal' | 'Warning' | 'Critical';
  health_score: number;
  message: string;
}
