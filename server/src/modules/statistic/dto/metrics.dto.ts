import { ChartDto } from './chart.dto';

export class MetricsDto {
    readonly total!: number | null;
    readonly chart!: ChartDto[];
}
