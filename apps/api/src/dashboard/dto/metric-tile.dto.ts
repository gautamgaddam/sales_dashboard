import { ApiProperty } from '@nestjs/swagger';

export class MetricTile {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  deltaPct!: number;

  @ApiProperty()
  icon!: string;

  @ApiProperty({ required: false })
  currency?: 'USD';
}
