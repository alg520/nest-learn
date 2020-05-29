import { Module } from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [DemoService]
})
export class PostsModule {}
