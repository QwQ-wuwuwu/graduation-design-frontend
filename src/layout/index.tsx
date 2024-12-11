import MainMenu from "./MainMenu";
import HeaderMenu from "./HeaderMenu";

export default function Layout() {
    return <div className="w-full h-full">
        <HeaderMenu></HeaderMenu>
        <MainMenu></MainMenu>
    </div>
}