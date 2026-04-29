import { Motor } from '../../domain/models/motor.model';
import { MotorStatus } from '../../domain/models/motor-status.model';
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
        operationHours: dto.sensors.operation_hours ?? 0,
        inputVoltageV: dto.sensors.input_voltage_v ?? 0,
      },
      twinState: {
        status: this.mapStatus(dto.twin_state.status),
        healthScore: Math.round(dto.twin_state.health_score),
        message: dto.twin_state.message,
      },
    };
  }

  private static mapStatus(status: 'OK' | 'Normal' | 'Warning' | 'Critical'): MotorStatus {
    if (status === 'OK') {
      return 'Normal';
    }

    return status;
  }
}
