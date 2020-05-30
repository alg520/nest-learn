import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  // HttpException,
  // HttpStatus,
  // ForbiddenException,
  // UseFilters,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
// import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter) // 模块级过滤器
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
  show(@Param('id', ParseIntPipe) id) {
    console.log('id: ', typeof id);
    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  // @UseFilters(DemoFilter) // 方法级过滤器
  @UsePipes(ValidationPipe)
  store(@Body() post: CreatePostDto) {
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限');
    this.demoService.create(post);
  }
}
