import { Injectable } from '@angular/core';

import { MotorSensors } from '../../domain/models/motor-sensors.model';

@Injectable({
  providedIn: 'root',
})
export class CalculateMotorHealthUseCase {
  execute(sensors: MotorSensors): number {
    let healthScore = 100;

    if (sensors.tempC > 70) {
      healthScore -= 15;
    }

    if (sensors.tempC > 85) {
      healthScore -= 15;
    }

    if (sensors.vibG > 0.7) {
      healthScore -= 15;
    }

    if (sensors.vibG > 1.0) {
      healthScore -= 15;
    }

    if (sensors.currentA > 14) {
      healthScore -= 10;
    }

    if (sensors.currentA > 18) {
      healthScore -= 15;
    }

    if (sensors.speedRpm < 1700) {
      healthScore -= 10;
    }

    if (sensors.speedRpm < 1600) {
      healthScore -= 15;
    }

    if (sensors.inputVoltageV < 210 || sensors.inputVoltageV > 230) {
      healthScore -= 10;
    }

    if (sensors.inputVoltageV < 200 || sensors.inputVoltageV > 240) {
      healthScore -= 15;
    }

    if (sensors.operationHours >= 1500) {
      healthScore -= 10;
    }

    if (sensors.operationHours > 1800) {
      healthScore -= 15;
    }

    return Math.max(0, healthScore);
  }
}
