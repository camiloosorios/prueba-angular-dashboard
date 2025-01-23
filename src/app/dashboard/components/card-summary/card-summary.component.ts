import { Component, Input, OnInit } from '@angular/core';
import { Info, LucideAngularModule, MoveDownRight, MoveUpRight, TrendingUp } from 'lucide-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { HlmTooltipComponent, HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'app-card-summary',
  imports: [
    LucideAngularModule,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmButtonDirective,
  ],
  templateUrl: './card-summary.component.html',
  styles: ``
})
export class CardSummaryComponent implements OnInit {
  @Input() icon! : any;
  @Input() total! : string;
  @Input() average! : number;
  @Input() title! : string;
  @Input() tooltipText! : string;
  
  readonly infoIcon = Info
  trendingIcon = TrendingUp;
  
  ngOnInit(): void {
    if (this.average < 20) {
      this.trendingIcon = MoveDownRight;
    } else if (this.average > 20 && this.average < 70) {
      this.trendingIcon = MoveUpRight;
    } else {
      this.trendingIcon = TrendingUp;
    }
  }

}
