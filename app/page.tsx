'use client'
import { useState } from "react";
import { callChg } from "./actions/call";

interface StatusState {
  message: string;
  type: "success" | "error" | "";
}

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [status, setStatus] = useState<StatusState>({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      // Send the request to your backend
      await callChg(`${countryCode}${phoneNumber}`);

    } catch (error) {
      setStatus({
        message: "An error occurred. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div className="text-center">
          <p className="mt-2 text-gray-400">Please enter your phone number</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="flex">
              {/* Country Code Dropdown */}
              <div className="relative flex-shrink-0">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                  required
                >
                  <option value="+1">+1 (US/Canada)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+33">+33 (France)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+86">+86 (China)</option>
                  <option value="+81">+81 (Japan)</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                placeholder="Phone number"
                required
              />
            </div>
          </div>

          {status.message && (
            <div
              className={`p-3 rounded ${status.type === "success" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                }`}
            >
              {status.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:text-gray-200"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}