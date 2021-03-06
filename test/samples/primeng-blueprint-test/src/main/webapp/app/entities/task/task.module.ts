import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimengtestSharedModule } from 'app/shared/shared.module';
import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskUpdateComponent } from './task-update.component';
import { taskRoute } from './task.route';

@NgModule({
  imports: [PrimengtestSharedModule, RouterModule.forChild(taskRoute)],
  declarations: [TaskComponent, TaskDetailComponent, TaskUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimengtestTaskModule {}
