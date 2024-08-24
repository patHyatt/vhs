import { Component, ViewEncapsulation } from '@angular/core';

// ChatGPT generated SVG. I can't design/draw...
@Component({
    selector: 'app-cassette',
    standalone: true,
    styleUrls: ['./cassette.component.css'],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div>
        <svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
            <!-- VHS Tape Body -->
            <rect x="20" y="20" width="260" height="140" rx="3" ry="3" fill="#2d2d2d" stroke="#000" stroke-width="3" />

            <!-- Tape Window -->
            <rect x="30" y="40" width="240" height="80" rx="10" ry="10" fill="#000" stroke="#666" stroke-width="2" />

            <!-- Tape Window Inner Details -->
            <rect x="40" y="50" width="50" height="10" rx="5" ry="5" fill="#666" stroke="#444" stroke-width="1" />
            <rect x="200" y="50" width="50" height="10" rx="5" ry="5" fill="#666" stroke="#444" stroke-width="1" />

            <!-- Tape Label -->
            <rect x="30" y="130" width="240" height="15" fill="#333" stroke="#000" stroke-width="2" />

            <!-- Tape Label Text -->
            <text x="35" y="142" fill="#fff" font-family="Arial" font-size="12">V / H / S</text>

            <!-- Tape Reels -->
            <!-- Reel 1 -->
            <circle cx="60" cy="80" r="25" fill="#444" stroke="#222" stroke-width="3" />
            <circle cx="60" cy="80" r="15" fill="#666" />
            <circle cx="60" cy="80" r="5" fill="#333" />

            <!-- Reel 2 -->
            <circle cx="240" cy="80" r="25" fill="#444" stroke="#222" stroke-width="3" />
            <circle cx="240" cy="80" r="15" fill="#666" />
            <circle cx="240" cy="80" r="5" fill="#333" />

            <!-- Tape Spool Detail -->
            <!-- Spool 1 -->
            <circle cx="60" cy="80" r="10" fill="#222" />

            <!-- Spool 2 -->
            <circle cx="240" cy="80" r="10" fill="#222" />

            <!-- Tape Spool Holes -->
            <circle cx="60" cy="80" r="3" fill="#000" />
            <circle cx="240" cy="80" r="3" fill="#000" />

            <!-- Tape Spool Cover Details -->
            <circle class="reel left" cx="60" cy="80" r="18" fill="none" stroke="#888" stroke-width="1"
                    stroke-dasharray="4,2" />
            <circle class="reel right" cx="240" cy="80" r="18" fill="none" stroke="#888" stroke-width="1"
                    stroke-dasharray="4,2" />
        </svg>
    </div>`
})
export class CassetteComponent {
}