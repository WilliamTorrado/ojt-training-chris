import { Component, OnInit } from "@angular/core";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Task {
  id: number;
  name: string;
  status: "Pending" | "Processing" | "Completed";
  selected: boolean;
  notes: string;
  showNotes: boolean;
}

type TaskFilter = "All" | "Pending" | "Processing" | "Completed";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  storageBaseKey = "tasks";
  newTask = "";
  editName = "";
  editingTaskId: number | null = null;
  selectAll = false;
  filterBy: TaskFilter = "All";
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  get filteredTasks(): Task[] {
    if (this.filterBy === "All") {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.status === this.filterBy);
  }

  loadTasks(): void {
    const data = localStorage.getItem(this.getStorageKey());
    const parsed = data ? JSON.parse(data) : [];

    this.tasks = parsed.map((task: any, index: number) => ({
      id: task.id || Date.now() + index,
      name: task.name,
      status: task.status || "Pending",
      selected: !!task.selected,
      notes: task.notes || "",
      showNotes: !!task.showNotes
    }));
  }

  saveTasks(): void {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(this.tasks));
  }

  addTask(): void {
    const trimmed = this.newTask.trim();
    if (!trimmed || this.isDuplicateTaskName(trimmed)) {
      return;
    }

    this.tasks.push({
      id: Date.now(),
      name: trimmed,
      status: "Pending",
      selected: false,
      notes: "",
      showNotes: false
    });

    this.newTask = "";
    this.saveTasks();
  }

  isAddDisabled(): boolean {
    const trimmed = this.newTask.trim();
    return !trimmed || this.isDuplicateTaskName(trimmed);
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editName = task.name;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editName = "";
  }

  saveEdit(task: Task): void {
    const trimmed = this.editName.trim();
    if (!trimmed) {
      return;
    }

    task.name = trimmed;
    this.cancelEdit();
    this.saveTasks();
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  deleteSelected(): void {
    this.tasks = this.tasks.filter((task) => !task.selected);
    this.selectAll = false;
    this.saveTasks();
  }

  toggleComplete(task: Task): void {
    task.status = task.status === "Completed" ? "Pending" : "Completed";
    this.saveTasks();
  }

  toggleSelectAll(): void {
    this.tasks.forEach((task) => {
      task.selected = this.selectAll;
    });
  }

  toggleNotes(task: Task): void {
    task.showNotes = !task.showNotes;
    this.saveTasks();
  }

  updateTask(): void {
    this.saveTasks();
  }

  exportPDF(singleTask?: Task): void {
    const doc = new jsPDF();
    let exportTasks: Task[] = [];

    if (singleTask) {
      exportTasks = [singleTask];
    } else {
      exportTasks = this.tasks.filter((task) => task.selected);
      if (exportTasks.length === 0) {
        exportTasks = [...this.tasks];
      }
    }

    const tableData = exportTasks.map((task) => [task.name, task.status, task.notes || "-"]);

    (doc as any).autoTable({
      head: [["Task", "Status", "Notes"]],
      body: tableData,
      startY: 20
    });

    doc.setFontSize(16);
    doc.text("Task List Export", 14, 14);
    doc.save("Tasks.pdf");
  }

  private getStorageKey(): string {
    const userId = localStorage.getItem("token");
    return userId ? this.storageBaseKey + ":" + userId : this.storageBaseKey;
  }

  private isDuplicateTaskName(taskName: string): boolean {
    const normalized = taskName.trim().toLowerCase();
    return this.tasks.some((task) => task.name.trim().toLowerCase() === normalized);
  }
}
