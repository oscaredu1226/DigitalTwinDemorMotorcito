import { Injectable } from '@angular/core';

import { MotorSensors } from '../../domain/models/motor-sensors.model';
import { MotorStatus } from '../../domain/models/motor-status.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluateMotorStatusUseCase {
  execute(sensors: MotorSensors): MotorStatus {
    if (
      sensors.tempC > 85 ||
      sensors.vibG > 1.0 ||
      sensors.currentA > 18 ||
      sensors.speedRpm < 1600 ||
      sensors.inputVoltageV < 200 ||
      sensors.inputVoltageV > 240 ||
      sensors.operationHours > 1800
    ) {
      return 'Critical';
    }

    if (
      sensors.tempC > 70 ||
      sensors.vibG > 0.7 ||
      sensors.currentA > 14 ||
      sensors.speedRpm < 1700 ||
      sensors.inputVoltageV < 210 ||
      sensors.inputVoltageV > 230 ||
      sensors.operationHours >= 1500
    ) {
      return 'Warning';
    }

    return 'Normal';
  }
}
