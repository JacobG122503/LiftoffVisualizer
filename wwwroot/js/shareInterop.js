window.shareInterop = (function () {
    let _lastBlob = null;

    function buildCanvas(stats) {
        const W = 1080, H = 1350;
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d');

        // Background
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, '#1a0a00');
        bg.addColorStop(1, '#3d1200');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
        for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

        // Glow accent
        const glow = ctx.createRadialGradient(W * 0.75, H * 0.2, 0, W * 0.75, H * 0.2, 500);
        glow.addColorStop(0, 'rgba(230,81,0,0.4)');
        glow.addColorStop(1, 'rgba(230,81,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // Badge
        ctx.fillStyle = '#E65100';
        ctx.beginPath(); ctx.roundRect(80, 80, 290, 52, 26); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 26px system-ui, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏋️ Liftoff Visualizer', 100, 106);

        // Headline
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 92px system-ui, sans-serif';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText('My Lifting', 80, 260);
        ctx.fillStyle = '#E65100';
        ctx.fillText('Journey', 80, 365);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '32px system-ui, sans-serif';
        ctx.fillText(`Since ${stats.sinceDate}`, 80, 420);

        // Divider
        const div = ctx.createLinearGradient(80, 0, W - 80, 0);
        div.addColorStop(0, 'rgba(230,81,0,0.9)');
        div.addColorStop(1, 'rgba(230,81,0,0)');
        ctx.fillStyle = div;
        ctx.fillRect(80, 455, W - 160, 2);

        // Primary stats — 2x2 grid
        const primary = [
            { label: 'Total Workouts', value: stats.totalWorkouts.toLocaleString() },
            { label: 'Exercises Tracked', value: stats.exerciseCount.toLocaleString() },
            { label: 'Total Lbs Lifted', value: Math.round(stats.totalVolume).toLocaleString() },
            { label: 'Total Sets', value: stats.totalSets.toLocaleString() },
        ];
        const colW = (W - 160) / 2, rowH = 160, startY = 475;
        primary.forEach((item, i) => {
            const x = 80 + (i % 2) * colW, y = startY + Math.floor(i / 2) * rowH;
            ctx.fillStyle = 'rgba(255,255,255,0.07)';
            ctx.beginPath(); ctx.roundRect(x + 8, y + 8, colW - 16, rowH - 16, 14); ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 52px system-ui, sans-serif';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(item.value, x + 26, y + 76);
            ctx.fillStyle = 'rgba(255,255,255,0.45)';
            ctx.font = '24px system-ui, sans-serif';
            ctx.fillText(item.label, x + 26, y + 114);
        });

        // Divider 2
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(80, 815, W - 160, 1);

        // Secondary stats — 3 per row
        const secondary = [
            { label: 'Longest Streak', value: `${stats.longestStreak}d 🔥` },
            { label: 'Longest Break', value: `${stats.longestBreak}d 😴` },
            { label: 'Total Reps', value: stats.totalReps.toLocaleString() + ' 💪' },
            { label: 'Heaviest Lift', value: `${stats.heaviestLift} lbs` },
            { label: 'Avg / Week', value: `${stats.avgWorkoutsPerWeek}x` },
            { label: 'Busiest Day', value: stats.busiestDay },
        ];
        const secColW = (W - 160) / 3, secRowH = 120, secY = 835;
        secondary.forEach((item, i) => {
            const x = 80 + (i % 3) * secColW, y = secY + Math.floor(i / 3) * secRowH;
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath(); ctx.roundRect(x + 6, y + 6, secColW - 12, secRowH - 12, 12); ctx.fill();
            ctx.fillStyle = '#E65100';
            ctx.font = 'bold 36px system-ui, sans-serif';
            ctx.textBaseline = 'alphabetic';
            // Clip long strings
            let val = item.value;
            while (ctx.measureText(val).width > secColW - 28 && val.length > 3) val = val.slice(0, -1);
            if (val !== item.value) val += '…';
            ctx.fillText(val, x + 18, y + 58);
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.font = '20px system-ui, sans-serif';
            ctx.fillText(item.label, x + 18, y + 90);
        });

        // Favourite exercise highlight
        ctx.fillStyle = 'rgba(230,81,0,0.15)';
        ctx.beginPath(); ctx.roundRect(80, 1085, W - 160, 100, 16); ctx.fill();
        ctx.strokeStyle = 'rgba(230,81,0,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(80, 1085, W - 160, 100, 16); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '22px system-ui, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText('Favorite exercise', 108, 1118);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px system-ui, sans-serif';
        let fav = stats.favoriteExercise;
        while (ctx.measureText(fav).width > W - 280 && fav.length > 3) fav = fav.slice(0, -1);
        if (fav !== stats.favoriteExercise) fav += '…';
        ctx.fillText('⭐ ' + fav, 108, 1152);

        // Most improved
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '22px system-ui, sans-serif';
        ctx.fillText('Most improved', 600, 1118);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px system-ui, sans-serif';
        let imp = stats.mostImprovedExercise;
        while (ctx.measureText(imp).width > 360 && imp.length > 3) imp = imp.slice(0, -1);
        if (imp !== stats.mostImprovedExercise) imp += '…';
        ctx.fillText('📈 ' + imp, 600, 1152);

        // Days badge
        ctx.fillStyle = '#E65100';
        const daysStr = `${stats.daysSinceStart} days strong 💪`;
        ctx.font = 'bold 30px system-ui, sans-serif';
        const daysW = ctx.measureText(daysStr).width + 48;
        ctx.beginPath(); ctx.roundRect(W - daysW - 80, H - 110, daysW, 58, 29); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.fillText(daysStr, W - daysW - 56, H - 81);

        return canvas;
    }

    return {
        generatePreview: function (stats) {
            return new Promise((resolve) => {
                const canvas = buildCanvas(stats);
                canvas.toBlob((blob) => {
                    if (_lastBlob) URL.revokeObjectURL(_lastBlob._url);
                    const url = URL.createObjectURL(blob);
                    _lastBlob = { blob, url, stats };
                    resolve(url);
                }, 'image/png');
            });
        },

        shareFromPreview: async function () {
            if (!_lastBlob) return;
            const { blob, stats } = _lastBlob;
            const file = new File([blob], 'my-lifting-journey.png', { type: 'image/png' });
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'My Lifting Journey',
                        text: `${stats.totalWorkouts} workouts tracked with Liftoff Visualizer!`
                    });
                    return;
                } catch (e) { /* fall through */ }
            }
            const a = document.createElement('a');
            a.href = _lastBlob.url;
            a.download = 'my-lifting-journey.png';
            a.click();
        }
    };
})();
