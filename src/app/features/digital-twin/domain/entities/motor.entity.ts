import { Motor } from '../models/motor.model';

export class MotorEntity {
  constructor(private readonly motor: Motor) {}

  get data(): Motor {
    return this.motor;
  }

  get isNormal(): boolean {
    return this.motor.twinState.status === 'Normal';
  }

  get isWarning(): boolean {
    return this.motor.twinState.status === 'Warning';
  }

  get isCritical(): boolean {
    return this.motor.twinState.status === 'Critical';
  }

  get visualStatusClass(): string {
    if (this.isCritical) {
      return 'critical';
    }

    if (this.isWarning) {
      return 'warning';
    }

    return 'normal';
  }

  get statusLabel(): string {
    if (this.isCritical) {
      return 'Crítico';
    }

    if (this.isWarning) {
      return 'Advertencia';
    }

    return 'Normal';
  }

  get needsPreventiveMaintenance(): boolean {
    return this.motor.sensors.operationHours >= 1500;
  }

  get hasVoltageRisk(): boolean {
    const voltage = this.motor.sensors.inputVoltageV;
    return voltage < 200 || voltage > 240;
  }

  get hasOverload(): boolean {
    return this.motor.sensors.currentA > 18;
  }

  get hasLowRpm(): boolean {
    return this.motor.sensors.speedRpm < 1600;
  }
}
