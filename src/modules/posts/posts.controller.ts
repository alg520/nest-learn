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
// import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter) // 模块级过滤器
@UseGuards(DemoGuard) // 模块级守卫
export class PostsController {
  // private readonly demoService: DemoService;
  // constructor(demoService: DemoService){
  //   this.demoService = demoService;
  // }

  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  @Roles('member') // 使用自定义装饰器
  show(@Param('id', ParseIntPipe) id) {
    console.log('id: ', typeof id);
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
