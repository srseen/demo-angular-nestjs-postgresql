import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string): Promise<User> {
    // เข้ารหัสรหัสผ่าน
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result === null ? undefined : result;
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await this.userRepository.findOne({ where: { id } });
    return result === null ? undefined : result;
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
