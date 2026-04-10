window.themeHelper = {
    _applyAccent: function (hex) {
        if (!hex || !/^#[0-9a-fA-F]{6}$/.test(hex)) return;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const adj = v => '#' + [r, g, b].map(c => Math.max(0, Math.min(255, c + v)).toString(16).padStart(2, '0')).join('');
        const root = document.documentElement;
        root.style.setProperty('--primary', hex);
        root.style.setProperty('--primary-light', adj(30));
        root.style.setProperty('--primary-lighter', adj(70));
        root.style.setProperty('--primary-dark', adj(-30));
        root.style.setProperty('--primary-bg', `rgba(${r},${g},${b},0.08)`);
        root.style.setProperty('--primary-bg-hover', `rgba(${r},${g},${b},0.14)`);
        root.style.setProperty('--border-hover', `rgba(${r},${g},${b},0.3)`);
        root.style.setProperty('--shadow-card-hover', `0 8px 24px rgba(${r},${g},${b},0.12)`);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            // Mix primary at ~8% into dark card bg (#1A1A1A = 26,26,26)
            const mr = Math.round(26 + (r - 26) * 0.08);
            const mg = Math.round(26 + (g - 26) * 0.08);
            const mb = Math.round(26 + (b - 26) * 0.08);
            root.style.setProperty('--bg-card-hover', `rgb(${mr},${mg},${mb})`);
        } else {
            // Mix primary at ~5% into white card bg
            const mr = Math.round(255 + (r - 255) * 0.05);
            const mg = Math.round(255 + (g - 255) * 0.05);
            const mb = Math.round(255 + (b - 255) * 0.05);
            root.style.setProperty('--bg-card-hover', `rgb(${mr},${mg},${mb})`);
        }
    },

    // Apply accent colors to CSS vars only (during color picker drag — no save, no chart refresh)
    setAccentCssOnly: function (hex) {
        this._applyAccent(hex);
    },

    // Apply accent + save to localStorage (called on commit/preset click)
    setAccent: function (hex) {
        this._applyAccent(hex);
        try { localStorage.setItem('lv-accent', hex); } catch (e) { }
    },

    setMode: function (isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        try { localStorage.setItem('lv-theme', isDark ? 'dark' : 'light'); } catch (e) { }
        // Re-apply accent so --bg-card-hover recalculates for new base color
        try {
            const accent = localStorage.getItem('lv-accent') || '#E65100';
            this._applyAccent(accent);
        } catch (e) { }
    }
};

// Apply saved preferences immediately when this script loads (prevents flash)
(function () {
    try {
        const theme = localStorage.getItem('lv-theme') || 'light';
        const accent = localStorage.getItem('lv-accent') || '#E65100';
        document.documentElement.setAttribute('data-theme', theme);
        window.themeHelper._applyAccent(accent);
    } catch (e) { }
})();
