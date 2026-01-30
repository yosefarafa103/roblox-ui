import { useEffect, useState } from "react";

export function useDeivce() {
    const [currentDevice, setCurrentDevice] = useState<
        "mobile" | "computer" | "tablet" | ""
    >("");
    useEffect(() => {
        (function () {
            if (/mobile/gi.test(navigator.userAgent)) setCurrentDevice("mobile");
            else if (/win/gi.test(navigator.userAgent)) setCurrentDevice("computer");
            else setCurrentDevice("tablet");
        })();
    }, []);
    return { currentDevice }
}