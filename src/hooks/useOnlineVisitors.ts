import { useEffect, useState } from "react";

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomBoolean() {
    return Math.random() < 0.5;
}
export function useOnlineVistiors() {
    const [canChangeOnlineNumber, setCanChangeOnlineNumber] = useState(false);
    const [onlineVisitors, setOnlineVisitors] = useState(
        getRandomNumber(100, 150)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCanChangeOnlineNumber(getRandomBoolean());
        }, 3_000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (canChangeOnlineNumber)
            setOnlineVisitors(onlineVisitors + getRandomNumber(1, 7));
        else setOnlineVisitors(onlineVisitors - getRandomNumber(1, 5));
    }, [canChangeOnlineNumber]);
    return { onlineVisitors }
}