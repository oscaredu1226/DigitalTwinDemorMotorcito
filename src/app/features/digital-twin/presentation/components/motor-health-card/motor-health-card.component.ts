import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-motor-health-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motor-health-card.component.html',
  styleUrl: './motor-health-card.component.css',
})
export class MotorHealthCardComponent {
  @Input({ required: true }) healthScore = 0;

  get healthStatusClass(): string {
    if (this.healthScore < 50) {
      return 'critical';
    }

    if (this.healthScore < 80) {
      return 'warning';
    }

    return 'normal';
  }

  get healthLabel(): string {
    if (this.healthScore < 50) {
      return 'Estado crítico';
    }

    if (this.healthScore < 80) {
      return 'Requiere atención';
    }

    return 'Salud estable';
  }

  get normalizedHealthScore(): number {
    if (this.healthScore < 0) {
      return 0;
    }

    if (this.healthScore > 100) {
      return 100;
    }

    return this.healthScore;
  }
}
