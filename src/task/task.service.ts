import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    createTask(task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks);
        return task;
    }
}
