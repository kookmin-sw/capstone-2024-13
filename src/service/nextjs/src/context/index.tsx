import { ReactNode } from "react";

const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

const ContextProviders = (props: { children: ReactNode }) => {
    const { children } = props;

    return children;
    //<GoogleOAuthProvider clientId={clientId}>
    //</GoogleOAuthProvider>
};

export default ContextProviders;
