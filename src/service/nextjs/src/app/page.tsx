import Image from "next/image";
import style from "@/style/app/index.module.css";
import { ChatIcon, MenuIcon } from "./icon";

const Header = () => {
    return (
        <div className={style.header}>
            <div>아니 근데 오늘 진짜</div>
            <div>
                <MenuIcon width={"80cqw"} height={"80cqh"} />
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className={style.footer}>
            <div>
                <div>
                    <ChatIcon width={"80cqw"} height={"80cqh"} />
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <div className={style.container}>
            <Header />
            <div>
                <Image
                    src="/You-know-what.png"
                    alt="You know what"
                    width={1025}
                    height={488}
                />
            </div>
            <Footer />
        </div>
    );
}
