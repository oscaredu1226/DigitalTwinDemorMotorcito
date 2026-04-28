import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MotorSensors } from '../../../domain/models/motor-sensors.model';
import { MotorMetricCardComponent } from '../motor-metric-card/motor-metric-card.component';

type MetricStatus = 'normal' | 'warning' | 'critical';

@Component({
  selector: 'app-motor-sensors-panel',
  standalone: true,
  imports: [CommonModule, MotorMetricCardComponent],
  templateUrl: './motor-sensors-panel.component.html',
  styleUrl: './motor-sensors-panel.component.css',
})
export class MotorSensorsPanelComponent {
  @Input({ required: true }) sensors!: MotorSensors;

  getTemperatureStatus(): MetricStatus {
    if (this.sensors.tempC > 85) {
      return 'critical';
    }

    if (this.sensors.tempC > 70) {
      return 'warning';
    }

    return 'normal';
  }

  getVibrationStatus(): MetricStatus {
    if (this.sensors.vibG > 1.0) {
      return 'critical';
    }

    if (this.sensors.vibG > 0.7) {
      return 'warning';
    }

    return 'normal';
  }

  getCurrentStatus(): MetricStatus {
    if (this.sensors.currentA > 18) {
      return 'critical';
    }

    if (this.sensors.currentA > 14) {
      return 'warning';
    }

    return 'normal';
  }

  getRpmStatus(): MetricStatus {
    if (this.sensors.speedRpm < 1600) {
      return 'critical';
    }

    if (this.sensors.speedRpm < 1700) {
      return 'warning';
    }

    return 'normal';
  }

  getOperationHoursStatus(): MetricStatus {
    if (this.sensors.operationHours > 1800) {
      return 'critical';
    }

    if (this.sensors.operationHours >= 1500) {
      return 'warning';
    }

    return 'normal';
  }

  getVoltageStatus(): MetricStatus {
    if (this.sensors.inputVoltageV < 200 || this.sensors.inputVoltageV > 240) {
      return 'critical';
    }

    if (this.sensors.inputVoltageV < 210 || this.sensors.inputVoltageV > 230) {
      return 'warning';
    }

    return 'normal';
  }
}
