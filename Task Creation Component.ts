
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task = { title: '', description: '', assignedTo: '' };

  constructor(private taskService: TaskService, private router: Router) {}

  createTask() {
    this.taskService.createTask(this.task).subscribe(
      res => {
        console.log('Task created successfully');
        this.router.navigate(['/dashboard']);
      },
      err => console.error(err)
    );
  }
}
