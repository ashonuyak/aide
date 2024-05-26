import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/utils/generic-repository';

import { UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserRepository extends GenericRepository<UserDocument>(UserModel) {}
