import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from './core/filters/demo.filter';
import { DemoGuard } from './core/guards/demo.guard';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new DemoFilter()); // 全局级过滤器
  // app.useGlobalGuards(new DemoGuard()); // 全局守卫
  // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
  await app.listen(3000);
}
bootstrap();
