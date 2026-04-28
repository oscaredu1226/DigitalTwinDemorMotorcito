import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-motor-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motor-metric-card.component.html',
  styleUrl: './motor-metric-card.component.css',
})
export class MotorMetricCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value: string | number = '';
  @Input({ required: true }) unit = '';
  @Input() description = '';
  @Input() status: 'normal' | 'warning' | 'critical' = 'normal';
}
