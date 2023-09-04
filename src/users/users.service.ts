import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    //await user.$set('roles', [role.id]); также используется для установки связи между пользователями и ролью. Метод $set также предоставляется Sequelize и используется для установки новых значений связи. В данном случае, 'roles' указывает на ассоциацию (связь) roles, определенную в модели User, а [role.id] представляет массив идентификаторов ролей, которые нужно установить для пользователя. Таким образом, эта строка заменяет существующие связи ролей пользователя на новые значения.
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
  async addRole(dto: AddRoleDto) {
    const { value, userId } = dto;
    const user = await this.userRepository.findByPk(userId);
    const role = await this.roleService.getRoleByValue(value);

    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    //await user.$add('role', role.id); используется для добавления связи между пользователями и ролью. Метод $add предоставляется Sequelize и предназначен для установки связи между моделями. В данном случае, 'role' указывает на ассоциацию (связь) roles, определенную в модели User, а role.id - это идентификатор роли, которую нужно добавить для пользователя. Таким образом, эта строка добавляет роль к пользователю.
    await user.$add('role', role.id);
    return user;
  }

  async banUser(dto: BanUserDto) {
    const { userId, banReason } = dto;
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.banned = true;
    user.banReason = banReason;
    await user.save();
    return user;
  }
}
