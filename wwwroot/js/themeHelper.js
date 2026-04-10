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
