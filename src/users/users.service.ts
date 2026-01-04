import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { v7 as uuidv7 } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDto[]=[
        { id: uuidv7(), username: 'admin', password: 'admin' }
    ]

    create(newUser: UserDto) {
        newUser.id = uuidv7();
        newUser.password = bcryptHashSync(newUser.password, 10);
        this.users.push(newUser);
    }

    findByUsername(username: string): UserDto | undefined {
        return this.users.find(user => user.username === username);
    }
}
