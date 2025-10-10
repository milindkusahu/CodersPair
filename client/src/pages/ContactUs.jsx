const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-sm text-base-content/70 mb-6">
        Last updated on Oct 10 2025
      </p>

      <div className="space-y-6 text-base-content/90">
        <p>You may contact us using the information below:</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Business Information Card */}
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Business Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-base-content/70">
                    Legal Entity Name
                  </p>
                  <p className="text-base">MILIND KUMAR SAHU</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Contact Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mt-0.5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-base-content/70">
                      Email
                    </p>
                    <a
                      href="mailto:contact@milindsahu.com"
                      className="text-base link link-primary break-all"
                    >
                      contact@milindsahu.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Location
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-semibold text-base-content/70 mb-1">
                  City
                </p>
                <p className="text-base">Raipur</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-base-content/70 mb-1">
                  State
                </p>
                <p className="text-base">Chhattisgarh</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-base-content/70 mb-1">
                  Pincode
                </p>
                <p className="text-base">495677</p>
              </div>
            </div>
            <p className="text-sm text-base-content/70 mt-3">India</p>
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="bg-primary/10 p-6 rounded-lg mt-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Have Questions?</h3>
          <p className="text-sm mb-4">
            We're here to help! Reach out to us via phone or email and we'll get
            back to you as soon as possible.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="tel:+91XXXXXXXXXX" className="btn btn-primary btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              Call Us
            </a>
            <a
              href="mailto:contact@milindsahu.com"
              className="btn btn-outline btn-primary btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
