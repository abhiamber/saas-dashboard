import Link from "next/link";
import { Button } from "../atom/button";
import Image from "next/image";

export function HomeLogOut(){
    return(
        <div >
    
          {/* Hero Section */}
          <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Build Custom Dashboards in Minutes — <span className="text-blue-600">No Code</span>.
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  A powerful multi-tenant dashboard builder for startups & businesses. Create dashboards, add widgets, manage user roles, and integrate data sources effortlessly.
                </p>
                <div className="flex gap-4">
                  <Link href="/signup" passHref>
                    <Button className="px-6 py-3 rounded-xl">Get Started</Button>
                  </Link>
    
                  <a href="#demo">
                    <Button variant="outline" className="px-6 py-3 rounded-xl">View Demo</Button>
                  </a>
                </div>
              </div>
    
              {/* Dashboard Image Preview */}
              <div className="shadow-xl rounded-2xl overflow-hidden border">
                <Image
                  src="https://i0.wp.com/www.phdata.io/wp-content/uploads/2024/02/dashboard-preview.png"
                  alt="Dashboard Preview"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
    
          {/* Features Section */}
          <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
    
              <div className="grid md:grid-cols-3 gap-10">
                <div className="p-6 bg-white rounded-2xl shadow-md">
                  <h4 className="text-xl font-semibold mb-2">⚡ Drag & Drop Widgets</h4>
                  <p className="text-gray-600">Build dashboards visually with simple drag-and-drop features.</p>
                </div>
    
                <div className="p-6 bg-white rounded-2xl shadow-md">
                  <h4 className="text-xl font-semibold mb-2">🏢 Multi-Tenant Support</h4>
                  <p className="text-gray-600">Isolation of client data and dashboards for SaaS use cases.</p>
                </div>
    
                <div className="p-6 bg-white rounded-2xl shadow-md">
                  <h4 className="text-xl font-semibold mb-2">📊 Real-Time Widgets</h4>
                  <p className="text-gray-600">Charts, tables, KPIs, and analytics widgets ready to plug in.</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Pricing Section */}
          <section id="pricing" className="py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold mb-12">Pricing</h3>
    
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl border shadow-sm">
                  <h4 className="text-xl font-semibold mb-4">Starter</h4>
                  <p className="text-gray-600 mb-6">Perfect for individual developers.</p>
                  <p className="text-3xl font-bold mb-6">$9/mo</p>
                  <Link href="/signup" passHref>
                    <Button className="rounded-xl px-6">Choose Plan</Button>
                  </Link>
                </div>
    
                <div className="p-8 rounded-2xl border shadow-md bg-blue-50">
                  <h4 className="text-xl font-semibold mb-4">Pro</h4>
                  <p className="text-gray-600 mb-6">Best for small teams & startups.</p>
                  <p className="text-3xl font-bold mb-6">$29/mo</p>
                  <Link href="/signup" passHref>
                    <Button className="rounded-xl px-6">Choose Plan</Button>
                  </Link>
                </div>
    
                <div className="p-8 rounded-2xl border shadow-sm">
                  <h4 className="text-xl font-semibold mb-4">Enterprise</h4>
                  <p className="text-gray-600 mb-6">Advanced features & custom SLAs.</p>
                  <p className="text-3xl font-bold mb-6">Custom</p>
                  <Link href="/contact" passHref>
                    <Button className="rounded-xl px-6">Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="py-10 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} DashBuilder. All rights reserved.</p>
          </footer>
        </div>
        );
}