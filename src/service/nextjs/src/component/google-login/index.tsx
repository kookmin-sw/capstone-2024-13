"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import GoogleLogo from "./icon";
import style from "@/style/component/google-login/index.module.css";

export const GoogleLoginButton = (props: {
    text?: string;
    width?: number | string;
    height?: number | string;
    setName: Dispatch<SetStateAction<string | undefined>>;
    setEmail: Dispatch<SetStateAction<string | undefined>>;
}) => {
    const text = props.text || "Google 계정으로 로그인하기";
    const width = props.width || "100%";
    const height = props.height || "100%";
    const { setName, setEmail } = props;
    //const handleGoogleLogin = useGoogleLogin({
    //    onSuccess: (codeResponse) => {
    //        axios
    //            .get("https://www.googleapis.com/userinfo/v2/me", {
    //                headers: {
    //                    Authorization: `Bearer ${codeResponse.access_token}`,
    //                },
    //            })
    //            .then((response) => {
    //                setName(response.data.name);
    //                setEmail(response.data.email);
    //            })
    //            .catch((error) => {
    //                console.error(error);
    //                alert(error.response.data.message);
    //            });
    //    },
    //});

    return (
        <div
            style={{ width, height }}
            className={style.container}
            onClick={() => {
                //handleGoogleLogin();
            }}
        >
            <GoogleLogo />
            <span>{text}</span>
        </div>
    );
};
