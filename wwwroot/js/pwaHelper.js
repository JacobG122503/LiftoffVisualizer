window.pwaHelper = (function () {
    function isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches
            || window.navigator.standalone === true;
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function getBrowser() {
        const ua = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(ua);
        const isAndroid = /Android/.test(ua);

        if (isIOS) {
            if (/CriOS/.test(ua)) return 'ios-chrome';
            if (/FxiOS/.test(ua)) return 'ios-firefox';
            if (/EdgiOS/.test(ua)) return 'ios-edge';
            return 'ios-safari';
        }
        if (isAndroid) {
            if (/SamsungBrowser/.test(ua)) return 'android-samsung';
            if (/Firefox/.test(ua)) return 'android-firefox';
            if (/Chrome/.test(ua)) return 'android-chrome';
            return 'android-other';
        }
        return 'desktop';
    }

    return { isMobile, isStandalone, getBrowser };
})();
