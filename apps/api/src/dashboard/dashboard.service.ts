import { Injectable } from '@nestjs/common';
import { MetricTile } from './dto/metric-tile.dto';
import { MetricsResponse } from './dto/metrics-response.dto';

@Injectable()
export class DashboardService {
  getMetrics(): MetricsResponse {
    const tiles: MetricTile[] = [
      { label: 'Total Sales', value: 1000, deltaPct: 6, icon: 'payments', currency: 'USD' },
      { label: 'Total Order', value: 300, deltaPct: 5, icon: 'receipt' },
      { label: 'Product Sold', value: 5, deltaPct: 12, icon: 'sell' },
      { label: 'New Customers', value: 8, deltaPct: 0.5, icon: 'person_add' },
    ];
    return { tiles };
  }
}
