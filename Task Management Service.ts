// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get tasks by role (admin, manager, user)
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Create a new task (admin/manager access)
  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, taskData);
  }

  // Update task status (user access)
  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${taskId}`, { status });
  }

  // Assign task to user (manager access)
  assignTask(taskId: string, userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/assign/${taskId}`, { userId });
  }
}
