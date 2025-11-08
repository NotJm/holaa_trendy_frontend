import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IActivity } from '../../core/interfaces/activity.interface';
import { ImageControlComponent } from '../ui/controls/image-control/image-control.component';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'list-activitys',
  standalone: true,
  imports: [CommonModule, ImageControlComponent],
  templateUrl: './activitys.component.html',
})
export class ActivitysComponent {
  @Input({ required: true }) activitys!: IActivity[];

  avatarPlaceholderUri: string =
    'https://ui-avatars.com/api/?rounded=true&background=000&color=fff&name=';
}
