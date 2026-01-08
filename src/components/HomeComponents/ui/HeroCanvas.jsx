'use client';

import React, { useEffect, useRef } from 'react';

// Simple Simplex Noise implementation
const createNoise3D = () => {
    const r = new Float32Array(256);
    for (let i = 0; i < 256; i++) r[i] = Math.random();

    const grad3 = [
        [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
        [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
        [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
    ];

    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 0; i < 256; i++) {
        const j = Math.floor(Math.random() * 256);
        [p[i], p[j]] = [p[j], p[i]];
    }

    const perm = new Uint8Array(512);
    const permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
        perm[i] = p[i & 255];
        permMod12[i] = perm[i] % 12;
    }

    const F3 = 1 / 3;
    const G3 = 1 / 6;

    return (x, y, z) => {
        let n0, n1, n2, n3;

        const s = (x + y + z) * F3;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);

        const t = (i + j + k) * G3;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;

        const x0 = x - X0;
        const y0 = y - Y0;
        const z0 = z - Z0;

        let i1, j1, k1;
        let i2, j2, k2;

        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1; j1 = 0; k1 = 0;
                i2 = 1; j2 = 1; k2 = 0;
            } else if (x0 >= z0) {
                i1 = 1; j1 = 0; k1 = 0;
                i2 = 1; j2 = 0; k2 = 1;
            } else {
                i1 = 0; j1 = 0; k1 = 1;
                i2 = 1; j2 = 0; k2 = 1;
            }
        } else {
            if (y0 < z0) {
                i1 = 0; j1 = 0; k1 = 1;
                i2 = 0; j2 = 1; k2 = 1;
            } else if (x0 < z0) {
                i1 = 0; j1 = 1; k1 = 0;
                i2 = 0; j2 = 1; k2 = 1;
            } else {
                i1 = 0; j1 = 1; k1 = 0;
                i2 = 1; j2 = 1; k2 = 0;
            }
        }

        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;

        const x2 = x0 - i2 + 2 * G3;
        const y2 = y0 - j2 + 2 * G3;
        const z2 = z0 - k2 + 2 * G3;

        const x3 = x0 - 1 + 3 * G3;
        const y3 = y0 - 1 + 3 * G3;
        const z3 = z0 - 1 + 3 * G3;

        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;

        const compute = (idx, x, y, z) => {
            let t = 0.6 - x * x - y * y - z * z;
            if (t < 0) return 0;
            t *= t;
            return t * t * (
                grad3[idx][0] * x +
                grad3[idx][1] * y +
                grad3[idx][2] * z
            );
        };

        n0 = compute(permMod12[ii + perm[jj + perm[kk]]], x0, y0, z0);
        n1 = compute(permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1);
        n2 = compute(permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2);
        n3 = compute(permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3);

        return 32 * (n0 + n1 + n2 + n3);
    };
};

export const HeroCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const noise3D = createNoise3D();
        let animationFrameId;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', onMouseMove);

        const render = () => {
            time += 0.005;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let isDarkBg = false;

            try {
                const el = canvas.parentElement || document.body;
                const bg = window.getComputedStyle(el).backgroundColor;
                const rgb = bg.match(/\d+/g);

                if (rgb && rgb.length >= 3) {
                    const r = +rgb[0];
                    const g = +rgb[1];
                    const b = +rgb[2];
                    const a = rgb[3] ? parseFloat(rgb[3]) : 1;

                    if (a > 0) {
                        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                        isDarkBg = luminance < 128;
                    } else {
                        isDarkBg = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    }
                }
            } catch {
                isDarkBg = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }

            const baseStr = isDarkBg ? '255, 255, 255' : '0, 0, 0';
            const baseOpacity = isDarkBg ? 0.15 : 0.05;

            const gap = 30;
            const amplitude = 50;
            const frequency = 0.002;
            const numLines = Math.ceil(canvas.height / gap) + 5;

            for (let i = 0; i < numLines; i++) {
                const yBase = i * gap;
                ctx.beginPath();

                for (let x = 0; x < canvas.width; x += 10) {
                    const noiseVal = noise3D(x * frequency, i * 0.1, time);
                    const y = yBase + noiseVal * amplitude;
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }

                const distY = Math.abs(yBase - mouseRef.current.y);
                const radius = 250;

                if (distY < radius) {
                    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                    const mX = mouseRef.current.x / canvas.width;
                    const spread = 0.15;

                    const start = Math.max(0, mX - spread);
                    const end = Math.min(1, mX + spread);
                    const peak = Math.min(1, baseOpacity + 0.6 * (1 - distY / radius));

                    grad.addColorStop(0, `rgba(${baseStr}, ${baseOpacity})`);
                    grad.addColorStop(start, `rgba(${baseStr}, ${baseOpacity})`);
                    grad.addColorStop(mX, `rgba(${baseStr}, ${peak})`);
                    grad.addColorStop(end, `rgba(${baseStr}, ${baseOpacity})`);
                    grad.addColorStop(1, `rgba(${baseStr}, ${baseOpacity})`);

                    ctx.strokeStyle = grad;
                } else {
                    ctx.strokeStyle = `rgba(${baseStr}, ${baseOpacity})`;
                }

                ctx.lineWidth = 1;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        />
    );
};
