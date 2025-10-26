import logo from "../../public/assets/favicon.svg";
import { useRouter } from "next/navigation";
import { useLogout } from "../utils/logout";
import Image from "next/image";

const CommonHeader = () => {
    const router = useRouter();
    const { handleLogout } = useLogout(); // use your custom hook

    const onLogout = () => {
        handleLogout(); // clears redux + localStorage + shows toast
        router.push("/"); // redirects to login
    };

    return (
        <div className="flex items-center justify-between mb-12 bg-white shadow-sm rounded-xl px-6 py-4 border border-gray-100">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3">
                <Image
                    src={logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="text-2xl font-bold text-gray-800">EduPortal</h1>
            </div>

            {/* Right: Logout Button */}
            <button
                onClick={onLogout}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition-all"
            >
                Logout
            </button>
        </div>
    );
};

export default CommonHeader;
