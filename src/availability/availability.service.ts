import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  findAll() {
    return `This action returns all availability`;
  }
}
