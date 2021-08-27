import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntitySchema, getConnection } from 'typeorm';

interface UniqueValidationArguments extends ValidationArguments {
  constraints: [EntitySchema, string, string?];
  object: Record<string, any>;
}

@ValidatorConstraint({ async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  async validate(
    value: string,
    { constraints, object }: UniqueValidationArguments,
  ): Promise<boolean> {
    const [entity, column, excludeColumn] = constraints;
    const { [excludeColumn]: excludeValue } = object;
    const query = getConnection()
      .getRepository(entity)
      .createQueryBuilder()
      .where(`${column} = :value`, { value });

    if (excludeColumn) {
      query.andWhere(`${excludeColumn} <> :excludeValue`, {
        excludeValue,
      });
    }

    const exists = await query.getCount();
    return !(exists > 0);
  }

  defaultMessage({ property }: ValidationArguments): string {
    return `The ${property} has already been taken.`;
  }
}
