import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddBelbinAnswerResultsDto } from './dto/user.dto';
import { BelbinRole } from 'src/common/enums/belbin.enum';
import { LoggerService } from 'src/common/helpers/winston.logger';

@Injectable()
export class BelbinService {
  constructor(private readonly logger: LoggerService) {}

  async calculate(
    data: AddBelbinAnswerResultsDto[],
  ): Promise<Record<BelbinRole, number>> {
    const results: Record<BelbinRole, number> = Object.values(
      BelbinRole,
    ).reduce((acc, role) => {
      acc[role] = 0;
      return acc;
    }, {} as Record<BelbinRole, number>);

    data.forEach((entry) => {
      const { role, value } = entry;

      if (!(role in BelbinRole)) {
        throw new HttpException(
          `Invalid Belbin role: ${role}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      results[role as BelbinRole] += value;
    });

    const totalPoints: number = this.calculateTotalPoints(results);

    this.validateTotalPoints(totalPoints);

    return results;
  }

  calculateTotalPoints(results: Record<BelbinRole, number>): number {
    return Object.values(results).reduce((acc, current) => acc + current, 0);
  }

  validateTotalPoints(totalPoints: number): void {
    if (totalPoints !== 30) {
      throw new HttpException(
        `Total points must be exactly 30. Received: ${totalPoints}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
