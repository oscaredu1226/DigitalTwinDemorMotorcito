import { MotorSensors } from './motor-sensors.model';
import { MotorTwinState } from './motor-twin-state.model';

export interface Motor {
  deviceId: string;
  timestamp: string;
  sensors: MotorSensors;
  twinState: MotorTwinState;
  source?: 'api' | 'mock';
}
