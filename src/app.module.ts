import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClaseModule } from './clase/clase.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app')}),
    TypeOrmModule.forRoot({
       type: "mysql",
       host: "localhost",
       port: 3306,
       username: "root",
       password: "Sombra2907!",
       database: "escolar",
       entities: [
          "dist/**/**.entity{.ts,.js}"//ver
       ],
       "synchronize": false}),
       CiudadModule,
       ProfesorModule,
       EstudianteModule,
       EscuelaModule,
       ClaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
