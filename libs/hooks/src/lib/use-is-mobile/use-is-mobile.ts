import { useMemo } from 'react';

const getMobileDetect = (userAgent: string) => {
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isOpera = Boolean(userAgent.match(/Opera Mini/i));
    const isWindows = Boolean(userAgent.match(/IEMobile/i));
    const isSSR = Boolean(userAgent.match(/SSR/i));
    const isMobile = isAndroid || isIos || isOpera || isWindows;
    const isDesktop = !isMobile && !isSSR;

    return {
        isMobile,
        isDesktop,
        isAndroid,
        isIos,
        isSSR
    };
};

export function useIsMobile() {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    const deviceInfo = useMemo(() => getMobileDetect(userAgent), [userAgent]);

    return deviceInfo;
}

export default useIsMobile;
