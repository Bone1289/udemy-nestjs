import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./tasks.model";
import {v4 as uuidv4} from 'uuid';
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, status: TaskStatus): Task {
        const taskToUpdate = this.getTaskById(id);
        taskToUpdate.status = status;
        return taskToUpdate;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id != id);
    }

    getTaskFilters(filterDto: GetTaskFilterDto): Task[] {
        const {status, search} = filterDto;
        let filteredTasks = this.getAllTasks();
        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status === status);
        }
        if (search) {
            filteredTasks = filteredTasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return filteredTasks;

    }
}
