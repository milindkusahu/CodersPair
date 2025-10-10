const ShippingDelivery = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Shipping and Delivery</h1>
      <p className="text-sm text-base-content/70 mb-6">
        Last updated on Oct 10 2025
      </p>

      <div className="space-y-6 text-base-content/90">
        <div className="bg-base-200 p-8 rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto mb-4 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-lg font-medium">
            Shipping is not applicable for this business.
          </p>
          <p className="text-sm mt-2 text-base-content/70">
            CodersPair is a digital platform connecting developers. All services
            are provided online with no physical shipping required.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Digital Service</h2>
          <p>
            As CodersPair operates as a digital networking platform for
            developers, there are no physical products to ship. All features and
            services are accessible instantly through your account once you sign
            up.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Instant Access</h2>
          <p>
            Upon successful registration and login, you can immediately start:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
            <li>Browsing developer profiles</li>
            <li>Sending connection requests</li>
            <li>Building your network</li>
            <li>Collaborating with fellow developers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;
