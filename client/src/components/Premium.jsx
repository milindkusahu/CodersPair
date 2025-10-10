import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [membershipType, setMembershipType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/premium/verify`);

      if (res.data.isPremium) {
        setIsUserPremium(true);
        setMembershipType(res.data.membershipType);
      }
    } catch (error) {
      console.error("Error verifying premium:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(`${BASE_URL}/payment/create`, {
        membershipType: type,
      });

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "CodersPair",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If user is premium, show only their subscribed plan
  if (isUserPremium) {
    return (
      <div className="py-20 max-w-5xl mx-auto px-4">
        <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Your Premium Membership
        </h1>
        <p className="text-center text-base-content/70 md:text-lg mt-2">
          You are currently enjoying premium benefits
        </p>

        <div className="flex justify-center mt-10">
          {/* Silver Plan - Show only if user has silver */}
          {membershipType === "silver" && (
            <div className="card bg-base-200 shadow-lg border-2 border-secondary relative max-w-md w-full">
              <div className="card-body">
                <div className="badge badge-success absolute -top-3 left-1/2 -translate-x-1/2">
                  Active Subscription
                </div>
                <div className="flex flex-col items-center border-b border-base-300 pb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-base-content font-medium text-xl">
                      Silver
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-secondary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="mb-3 text-4xl font-bold">$49</span>
                  <span className="text-base-content/70 text-sm">
                    For 3 months
                  </span>
                </div>

                <div className="space-y-4 py-9">
                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      Chat with other people
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      100 connection requests/day
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      Blue verified badge
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content/70">
                      Priority profile visibility
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content/70">
                      Email support
                    </span>
                  </div>
                </div>

                <button className="btn btn-secondary w-full mt-4" disabled>
                  Already Subscribed
                </button>
              </div>
            </div>
          )}

          {/* Gold Plan - Show only if user has gold */}
          {membershipType === "gold" && (
            <div className="card bg-gradient-to-br from-amber-500/10 to-yellow-500/10 shadow-lg border-2 border-warning relative max-w-md w-full">
              <div className="card-body">
                <div className="badge badge-success absolute -top-3 left-1/2 -translate-x-1/2">
                  Active Subscription
                </div>
                <div className="flex flex-col items-center border-b border-base-300 pb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-base-content font-medium text-xl">
                      Gold
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-warning"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="mb-3 text-4xl font-bold">$89</span>
                  <span className="text-base-content/70 text-sm">
                    For 6 months
                  </span>
                </div>

                <div className="space-y-4 py-9">
                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      Chat with other people
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      Unlimited connection requests
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content font-semibold">
                      Blue verified badge
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content/70">
                      Top profile visibility
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm text-base-content/70">
                      Priority support
                    </span>
                  </div>
                </div>

                <button className="btn btn-warning w-full mt-4" disabled>
                  Already Subscribed
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="alert alert-info max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You're enjoying all the premium benefits! Your subscription will
              auto-renew unless cancelled.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If user is not premium, show all plans
  return (
    <div className="py-20 max-w-5xl mx-auto px-4">
      <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
        Premium Membership
      </h1>
      <p className="text-center text-base-content/70 md:text-lg mt-2">
        Upgrade your networking experience and connect with more developers
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {/* Free Plan */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col items-center border-b border-base-300 pb-6">
              <span className="mb-6 text-base-content font-medium text-xl">
                Free
              </span>
              <span className="mb-3 text-4xl font-bold">$0</span>
              <span className="text-base-content/70 text-sm">Forever free</span>
            </div>

            <div className="space-y-4 py-9">
              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-primary text-sm text-primary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  Browse developer profiles
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-primary text-sm text-primary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  10 connection requests per day
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-base-300 text-sm text-base-content/50">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
                <span className="text-sm text-base-content/50">
                  No chat feature
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-base-300 text-sm text-base-content/50">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
                <span className="text-sm text-base-content/50">
                  No verified badge
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-base-300 text-sm text-base-content/50">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
                <span className="text-sm text-base-content/50">
                  Basic profile visibility
                </span>
              </div>
            </div>

            <button className="btn btn-outline btn-primary w-full mt-4">
              Current Plan
            </button>
          </div>
        </div>

        {/* Silver Plan */}
        <div className="card bg-base-200 shadow-lg border-2 border-secondary relative">
          <div className="card-body">
            <div className="badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2">
              Popular
            </div>
            <div className="flex flex-col items-center border-b border-base-300 pb-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-base-content font-medium text-xl">
                  Silver
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-secondary"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="mb-3 text-4xl font-bold">$49</span>
              <span className="text-base-content/70 text-sm">For 3 months</span>
            </div>

            <div className="space-y-4 py-9">
              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  Chat with other people
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  100 connection requests/day
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  Blue verified badge
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  Priority profile visibility
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-secondary text-sm text-secondary-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  Email support
                </span>
              </div>
            </div>

            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-secondary w-full mt-4"
            >
              Upgrade to Silver
            </button>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="card bg-gradient-to-br from-amber-500/10 to-yellow-500/10 shadow-lg border-2 border-warning relative">
          <div className="card-body">
            <div className="badge badge-warning absolute -top-3 left-1/2 -translate-x-1/2">
              Best Value
            </div>
            <div className="flex flex-col items-center border-b border-base-300 pb-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-base-content font-medium text-xl">
                  Gold
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-warning"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="mb-3 text-4xl font-bold">$89</span>
              <span className="text-base-content/70 text-sm">For 6 months</span>
            </div>

            <div className="space-y-4 py-9">
              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  Chat with other people
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  Unlimited connection requests
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content font-semibold">
                  Blue verified badge
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  Top profile visibility
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-5 place-content-center rounded-full bg-warning text-sm text-warning-content">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-sm text-base-content/70">
                  Priority support
                </span>
              </div>
            </div>

            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-warning w-full mt-4"
            >
              Upgrade to Gold
            </button>
          </div>
        </div>
      </div>

      {/* FAQ or Additional Info Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Go Premium?</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Stand out from the crowd with a verified badge, connect with unlimited
          developers, and unlock direct messaging to build meaningful
          collaborations.
        </p>
      </div>
    </div>
  );
};

export default Premium;
