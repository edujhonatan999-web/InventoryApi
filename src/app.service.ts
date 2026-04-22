import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverActive(): string {
    return 'Server is active!';
  }
}
