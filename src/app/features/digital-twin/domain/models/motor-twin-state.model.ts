import { MotorStatus } from './motor-status.model';

export interface MotorTwinState {
  status: MotorStatus;
  healthScore: number;
  message: string;
}
