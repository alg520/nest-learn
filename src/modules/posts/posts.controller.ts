import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ForbiddenException,
  // HttpException,
  // HttpStatus,
  // ForbiddenException,
  // UseFilters,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoGuard } from '../../core/guards/demo.guard';
import { DemoRolesGuard } from '../../core/guards/demo-roles.guard';
import { Roles } from '../../core/decorator/roles.decorator';
import { LoggingInterceptor } from '../../core/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../../core/interceptors/errors.interceptor';
// import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter) // 模块级过滤器
// @UseGuards(DemoGuard) // 模块级守卫
// @UseInterceptors(LoggingInterceptor) // 模块级拦截器
export class PostsController {
  // private readonly demoService: DemoService;
  // constructor(demoService: DemoService){
  //   this.demoService = demoService;
  // }

  constructor(private readonly demoService: DemoService) {}

  @Get()
  // @UseInterceptors(TransformInterceptor) // 方法级拦截器
  @UseInterceptors(ErrorsInterceptor)
  @Roles('member') // 使用自定义装饰器
  index() {
    throw new ForbiddenException();
    // return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    // console.log('id: ', typeof id);
    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  // @UseFilters(DemoFilter) // 方法级过滤器
  // @UseGuards(DemoGuard) // 方法级守卫
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles', ['member'])
  @Roles('member') // 使用自定义装饰器
  store(@Body() post: CreatePostDto) {
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限');
    this.demoService.create(post);
  }
}
