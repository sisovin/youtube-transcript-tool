import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { RequestValidationPipe } from '../../../src/shared/pipes/request-validation.pipe';
import { validate } from 'class-validator';

jest.mock('class-validator');

describe('RequestValidationPipe', () => {
  let pipe: RequestValidationPipe;

  beforeEach(() => {
    pipe = new RequestValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate and transform input', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: class TestDto {
        field: string;
      },
    };

    (validate as jest.Mock).mockResolvedValue([]);

    const value = { field: 'test' };
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
    expect(validate).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should throw BadRequestException if validation fails', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: class TestDto {
        field: string;
      },
    };

    (validate as jest.Mock).mockResolvedValue([
      { property: 'field', constraints: { isString: 'field must be a string' } },
    ]);

    const value = { field: 123 };

    await expect(pipe.transform(value, metadata)).rejects.toThrow(BadRequestException);
  });

  it('should return value if no metatype is provided', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: undefined,
    };

    const value = { field: 'test' };
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should return value if metatype is not to be validated', async () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: String,
    };

    const value = 'test';
    const result = await pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });
});
