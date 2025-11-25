
import Navbar from "./navbar";

interface LayoutProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function Layout({ children }: LayoutProps) {

    return <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        {children}
    </div>
}