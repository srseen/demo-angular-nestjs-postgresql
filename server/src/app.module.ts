import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentEntity } from './equipment/equipment.entity/equipment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [EquipmentEntity],
        autoLoadEntities: true,
        synchronize: true, // Note: Set to false in production
      }),
    }),
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
