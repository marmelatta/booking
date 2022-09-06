import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestEmployeeController } from './support-request-employee.controller';

describe('SupportRequestEmployeeController', () => {
  let controller: SupportRequestEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportRequestEmployeeController],
    }).compile();

    controller = module.get<SupportRequestEmployeeController>(
      SupportRequestEmployeeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
