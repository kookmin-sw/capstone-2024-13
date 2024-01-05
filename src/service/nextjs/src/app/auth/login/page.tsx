"use client";

import { GoogleLoginButton } from "@/component/google-login";
import style from "@/style/app/auth/login/page.module.css";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);

    return (
        <div className={style.container}>
            <Image
                src="/You-know-what.png"
                alt="You know what"
                width={1025}
                height={488}
                priority={true}
            />
            <GoogleLoginButton
                width={"63cqw"}
                height={"11cqw"}
                setName={setName}
                setEmail={setEmail}
            />
        </div>
    );
};

export default LoginPage;
