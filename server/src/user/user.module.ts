import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // สำคัญมาก! ต้องมีบรรทัดนี้
  ],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // export ทั้ง UserService และ TypeOrmModule
})
export class UsersModule {}
