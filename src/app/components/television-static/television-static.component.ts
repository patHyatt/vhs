import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-television-static',
    templateUrl: './television-static.component.html',
    standalone: true,
})
export class TelevisionStaticComponent implements OnInit {
    ngOnInit(): void {
        this.setupCanvas();
    }

    setupCanvas(): void {
        // Static/Noise generation code from: https://codepen.io/matthewhudson/pen/KOPxNv
        const canvas = document.getElementById('static-canvas')! as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function generateNoise(ctx: CanvasRenderingContext2D) {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;        // red
                data[i + 1] = value;    // green
                data[i + 2] = value;    // blue
                data[i + 3] = 255;      // alpha
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // Animate the noise generation
        function animateStatic() {
            generateNoise(ctx);
            requestAnimationFrame(animateStatic);
        }

        animateStatic();
    }

}