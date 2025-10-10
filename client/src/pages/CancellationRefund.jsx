const CancellationRefund = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund</h1>
      <p className="text-sm text-base-content/70 mb-6">
        Last updated on Oct 10 2025
      </p>

      <div className="space-y-6 text-base-content/90">
        <p>
          MILIND KUMAR SAHU believes in helping its customers as far as
          possible, and has therefore a liberal cancellation policy. Under this
          policy:
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
          <ul className="space-y-3 ml-4">
            <li className="flex gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                Cancellations will be considered only if the request is made
                within same day of placing the order. However, the cancellation
                request may not be entertained if the orders have been
                communicated to the vendors/merchants and they have initiated
                the process of shipping them.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                MILIND KUMAR SAHU does not accept cancellation requests for
                perishable items like flowers, eatables etc. However,
                refund/replacement can be made if the customer establishes that
                the quality of product delivered is not good.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Damaged or Defective Items
          </h2>
          <p className="mb-3">
            In case of receipt of damaged or defective items please report the
            same to our Customer Service team. The request will, however, be
            entertained once the merchant has checked and determined the same at
            his own end. This should be reported within same day of receipt of
            the products.
          </p>
          <p>
            In case you feel that the product received is not as shown on the
            site or as per your expectations, you must bring it to the notice of
            our customer service within same day of receiving the product. The
            Customer Service Team after looking into your complaint will take an
            appropriate decision.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Warranty Claims</h2>
          <p>
            In case of complaints regarding products that come with a warranty
            from manufacturers, please refer the issue to them.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Refund Processing</h2>
          <p>
            In case of any Refunds approved by the MILIND KUMAR SAHU, it'll take
            same day for the refund to be processed to the end customer.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-sm">
            For any queries regarding cancellations or refunds, please contact
            our customer service team through the Contact Us page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
