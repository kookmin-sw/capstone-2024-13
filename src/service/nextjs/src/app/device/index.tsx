"use client";

import { ReactNode, useEffect, useState } from "react";
import style from "@/style/app/device/index.module.css";
import MobileDetect from "mobile-detect";

const Device = (props: { children: ReactNode }) => {
    const { children } = props;
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mobileDetect = new MobileDetect(window.navigator.userAgent);

        setIsMobile(mobileDetect.mobile() !== null);
    }, [isMobile]);

    return (
        isMobile !== null && (
            <div className={isMobile ? style.mobile : style.desktop}>
                {children}
            </div>
        )
    );
};

export default Device;
