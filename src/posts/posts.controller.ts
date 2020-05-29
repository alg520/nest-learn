import { Controller, Get, Headers, Param, Post, Body, Query, Request } from '@nestjs/common';
import { CreatePost } from './post.dto';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers('authorization') headers, @Query() query, @Request() request) {
    console.log(
      headers,
      query,
      request
    )
    return [
      {
        title: '2233113~',
      },
    ];
  }


  @Get(':id')
  show(@Param() params) {
    console.log(params)
    return { 
      title: `Post ${params.id}`,
      subtitle: "subtitle"
     }
  }

  @Post()
  store(@Body() post: CreatePost){
    console.log(post)
  }
}
