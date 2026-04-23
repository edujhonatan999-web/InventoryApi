import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { MovementsModule } from './movements/movements.module';
import { TicketsModule } from './tickets/tickets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'AlienX2026',
      database: 'inventoryV2',
      autoLoadEntities: true,
      synchronize: false,
    }
  ),
   UserModule, RolModule, CategoriesModule, ProductsModule, MovementsModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
