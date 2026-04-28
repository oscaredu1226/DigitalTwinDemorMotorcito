import { Motor } from '../../domain/models/motor.model';
import { MotorResponseDto } from '../dtos/motor-response.dto';

export class MotorMapper {
  static fromDto(dto: MotorResponseDto, source: 'api' | 'mock' = 'api'): Motor {
    return {
      deviceId: dto.device_id,
      timestamp: dto.timestamp,
      source,
      sensors: {
        tempC: Number(dto.sensors.temp_c.toFixed(2)),
        vibG: Number(dto.sensors.vib_g.toFixed(2)),
        currentA: Number(dto.sensors.current_a.toFixed(2)),
        speedRpm: Math.round(dto.sensors.speed_rpm),
        operationHours: dto.sensors.operation_hours ?? 1240,
        inputVoltageV: dto.sensors.input_voltage_v ?? 220,
      },
      twinState: {
        status: dto.twin_state.status,
        healthScore: dto.twin_state.health_score,
        message: dto.twin_state.message,
      },
    };
  }
}
