import { ApiProperty } from '@nestjs/swagger';
import { MetricTile } from './metric-tile.dto';

export class MetricsResponse {
  @ApiProperty({ type: [MetricTile] })
  tiles!: MetricTile[];
}
