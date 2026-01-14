import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import { Package, Sparkles } from "lucide-react";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Enhanced Design */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-8 md:py-12">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
        
        <div className="relative wrapper">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon with Glow Effect */}
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="p-3 bg-white rounded-xl">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            {/* Title with Gradient Text */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-white">Create </span>
                <span className="bg-gradient-to-r from-cyan-300 to-yellow-300 bg-clip-text text-transparent">
                  Package
                </span>
              </h1>
              
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                Craft the perfect package for your customer with our easy-to-use form
                <Sparkles className="inline-block w-5 h-5 ml-2 text-yellow-300" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="wrapper py-8 md:py-12">
        {/* Form Card with Glassmorphism Effect */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Package Details
                  </h2>
                  <p className="text-sm text-gray-600">
                    Fill in all the necessary information below
                  </p>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 md:p-8">
              <EventForm userId={userId} type="Create" />
            </div>
            
            {/* Card Footer */}
            <div className="px-8 py-4 bg-gray-50/50 border-t">
              <p className="text-sm text-gray-500 text-center">
                Your package will be created instantly and available for customers
              </p>
            </div>
          </div>
          
          {/* Tips Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Pro Tips</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• Add clear descriptions to help customers understand the package</li>
                  <li>• Set competitive pricing to attract more customers</li>
                  <li>• Include high-quality images for better engagement</li>
                  <li>• Specify all terms and conditions clearly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;