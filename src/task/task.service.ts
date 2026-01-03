import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    createTask(task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks);
        return task;
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);
        if (foundTask.length) {
            return foundTask[0];
        }
        throw new NotFoundException(`Task with id ${id} not found`);
    }

    findAll(params: FindAllParameters): TaskDto[] {   
        let filteredTasks = this.tasks;

        return this.tasks.filter(t => {
            let matche = true;
            if (params.title !== undefined && !t.title.includes(params.title)) {
                matche = false
            }
            if (params.status !== undefined && !t.status.includes(params.status)) {
                matche = false
            }
            return matche;
        })
    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task;
            return;
        }
        throw new HttpException(`Task not found ${task.id}`, HttpStatus.BAD_REQUEST);
    }

    delete(id: string) {
        let taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1);
            return;
        }
        throw new HttpException(`Task not found ${id}`, HttpStatus.BAD_REQUEST);
    }
}