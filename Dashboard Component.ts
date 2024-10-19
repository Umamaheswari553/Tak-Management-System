
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  role: string = '';

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      res => this.tasks = res,
      err => console.error(err)
    );
  }

  updateTaskStatus(taskId: string, newStatus: string) {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe(
      res => this.loadTasks(),
      err => console.error(err)
    );
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isManager() {
    return this.role === 'manager';
  }

  isUser() {
    return this.role === 'user';
  }
}
