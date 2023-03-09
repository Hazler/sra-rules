import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SRArules80 } from 'src/data/sra-saannot-8.0';
import { Rules } from '../model/rules';

/**
 * Service for rules related functionalities
 */
@Injectable({
  providedIn: 'root'
})
export class RulesService {

  /**
   * The rules data
   */
  private data: BehaviorSubject<any> = new BehaviorSubject(SRArules80);

  /**
   * Observable for rules data
   */
  data$: Observable<any> = this.data.asObservable();

}
