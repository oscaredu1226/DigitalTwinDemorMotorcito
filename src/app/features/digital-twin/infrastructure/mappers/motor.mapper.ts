import { Motor } from '../../domain/models/motor.model';
import { MotorResponseDto } from '../dtos/motor-response.dto';

export class MotorMapper {
  static fromDto(dto: MotorResponseDto, source: 'api' | 'mock' = 'api'): Motor {
    return {
      deviceId: dto.device_id,
      timestamp: dto.timestamp,
      source,
      sensors: {
        tempC: dto.sensors.temp_c,
        vibG: dto.sensors.vib_g,
        currentA: dto.sensors.current_a,
        speedRpm: dto.sensors.speed_rpm,
        operationHours: dto.sensors.operation_hours,
        inputVoltageV: dto.sensors.input_voltage_v,
      },
      twinState: {
        status: dto.twin_state.status,
        healthScore: dto.twin_state.health_score,
        message: dto.twin_state.message,
      },
    };
  }
}
