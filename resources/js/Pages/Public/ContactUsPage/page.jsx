import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const ContactUs = ({ canLogin, canRegister, isLoggedIn }) => {
  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="border border-muted rounded-lg shadow-lg overflow-hidden md:flex md:w-3/4 lg:w-2/3 poppins">
          {/* Side Image */}
          <div className="md:w-1/2">
            <img
              src="/assets/Contact-Us-Picture.png"
              alt="Contact Us"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 rubik">
              Get in Touch with Us
            </h2>
            <p className="text-sm text-white-600 mb-6">
              Have any questions, concerns, or feedback? We'd love to hear from you! Please feel free to drop us a message using the form below, and we'll get back to you as soon as possible. We're here to help with anything you need regarding our services, products, or general inquiries.
            </p>

            <form className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white-700"
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400 bg-transparent"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400 bg-transparent"
                  required
                ></textarea>
              </div>

              {/* Additional Info Section */}
              <div className="text-sm text-white-600">
                <p>
                  If you are reaching out for support, please provide as much detail as possible so we can assist you more efficiently. You can also contact us directly at{" "}
                  <a
                    href="mailto:support@usedcarsales.com"
                    className="text-blue-400 underline"
                  >
                    support@usedcarsales.com
                  </a>{" "}
                  for quicker responses.
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* contact information */}
        <section className="text-center mt-5 border border-muted rounded-lg shadow-lg overflow-hidden md:w-3/4 lg:w-2/3 poppins">
          <p className="text-gray-300 leading-relaxed p-8">
            Have questions or need support? Reach out to us at{" "}
            <a href="mailto:support@usedcarsales.com" className="text-blue-500 underline">
              support@usedcarsales.com
            </a>{" "}
            or call us at{" "}
            <a href="tel:+123456789" className="text-blue-500 underline">
              +1 234 567 89
            </a>.
          </p>
        </section>
      </div>
    </GuestLayout>
  );
};

export default ContactUs;
