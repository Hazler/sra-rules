import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SRArules80 } from 'src/data/sra-saannot-8.0';
import { SRArules81 } from 'src/data/sra-saannot-8.1';

/**
 * Service for rules related functionalities
 */
@Injectable({
  providedIn: 'root'
})
export class RulesService {

  /**
   * Name for the font size cookie value.
   */
  static readonly RuleSetCookie: string = 'CurrentRuleSet';

  /**
   * All available rule sets.
   */
  private static availableRuleSets: any[] = [SRArules81, SRArules80];

  /**
   * Names for available rule sets
   */
  static AvailableRuleSetNames: string[] = RulesService.availableRuleSets.map(r => r.title);

  /**
   * The rules data
   */
  private data: BehaviorSubject<any> = new BehaviorSubject(RulesService.availableRuleSets[0]);

  /**
   * Observable for rules data
   */
  data$: Observable<any> = this.data.asObservable();

  constructor(private cookieService: CookieService) {
    if (cookieService.check(RulesService.RuleSetCookie))
      this.changeRules(cookieService.get(RulesService.RuleSetCookie));
  }

  /**
   * Changes rules to the rule set matching with given name
   * @param rulesName Name of the rules to set
   */
  changeRules(rulesName: string) {
    let ruleSet = RulesService.availableRuleSets.find(r => r.title == rulesName);
    if (ruleSet) {
      this.data.next(ruleSet);
      this.cookieService.set(RulesService.RuleSetCookie, ruleSet.title);
    }
  }

  /**
   * Gets the name of the current rule set
   * @returns Name of the current rule set
   */
  getCurrentName(): string {
    return this.data.getValue()?.title;
  }

}
