import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/entities/User';
import { ProductModule } from './product/product.module';
import { Product } from './entity/entities/Product';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.test',
      // production 환경일 때는 configModule이 환경변수 파일을 무시한다.
      // prod할 때는 따로 넣기로 하자.
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/entities/*js'],
      migrations: [__dirname + '/src/migrations/*.ts'],
      cli: { migrationsDir: 'src/migrations' },
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([User, Product]),
    UserModule,
    AuthModule,
    ProductModule,
  ],

  controllers: [AppController],
  providers: [AppService, UserService, ProductService],
})
export class AppModule {}
