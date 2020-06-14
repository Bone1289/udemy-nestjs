import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task, TaskStatus} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() getTaskFilterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(getTaskFilterDto).length) {
            return this.tasksService.getTaskFilters(getTaskFilterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Post("/:id")
    deleteTask(@Param("id") id: string) {
        this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateStatus(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
        return this.tasksService.updateTask(id, status);
    }
}
