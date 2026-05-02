import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}