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
    if (this.sensors.tempC > 80) {
      return 'warning';
    }

    return 'normal';
  }

  getVibrationStatus(): MetricStatus {
    if (this.sensors.vibG > 3.0) {
      return 'warning';
    }

    return 'normal';
  }

  getCurrentStatus(): MetricStatus {
    return 'normal';
  }

  getRpmStatus(): MetricStatus {
    return 'normal';
  }

  getOperationHoursStatus(): MetricStatus {
    return 'normal';
  }

  getVoltageStatus(): MetricStatus {
    return 'normal';
  }
}
