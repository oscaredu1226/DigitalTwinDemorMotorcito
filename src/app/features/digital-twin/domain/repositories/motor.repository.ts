import { Observable } from 'rxjs';
import { Motor } from '../models/motor.model';

export abstract class MotorRepository {
  abstract getCurrentMotorData(): Observable<Motor>;
}
