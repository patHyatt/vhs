import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'tinyduration'


@Pipe({
    name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {
    transform(value?: string) {
        if (!value)
            return 'unknown';

        const duration = parse(value);
        if (duration.days ?? 0 > 0)
            return `${duration.days}d ${duration.hours}h ${duration.minutes}m`;

        if (duration.hours ?? 0 > 0)
            return `${duration.hours}h ${duration.minutes}m`;

        return `${duration.minutes}m`;
    }
}