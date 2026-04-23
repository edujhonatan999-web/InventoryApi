import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './rol.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
