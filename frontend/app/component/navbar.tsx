import Link from "next/link";
import { Button } from "../atom/button";

interface NavbarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function Navbar ({}:NavbarProps){

    return <header className="w-full py-4 border-b bg-white/80 backdrop-blur-md fixed top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <h1 onClick={() => window.scrollTo({ top: 0 })} className="text-2xl font-bold cursor-pointer">DashBuilder</h1>

      <nav className="flex items-center gap-6">
        <a href="#features" className="hover:text-blue-600">Features</a>
        <a href="#pricing" className="hover:text-blue-600">Pricing</a>
        <a href="/login" className="hover:text-blue-600">Login</a>

        <Link href="/signup" passHref>
          <Button className="rounded-xl px-6">Sign Up</Button>
        </Link>
      </nav>
    </div>
  </header>
}