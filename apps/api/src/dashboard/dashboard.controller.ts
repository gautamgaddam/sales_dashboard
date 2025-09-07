import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MetricsResponse } from './dto/metrics-response.dto';

@ApiTags('dashboard')
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get('metrics')
  @ApiOkResponse({ type: MetricsResponse })
  getMetrics(): MetricsResponse {
    return this.svc.getMetrics();
  }
}
