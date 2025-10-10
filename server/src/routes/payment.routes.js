const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const router = express.Router();
const razorpayInstance = require("../utils/razorpay");
const { Payment } = require("../models/payment.model");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const { User } = require("../models/user.model");

router.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    // Validate membership type
    if (!membershipAmount[membershipType]) {
      return res.status(400).json({ msg: "Invalid membership type" });
    }

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
        userId: req.user._id.toString(),
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: {
        firstName: order.notes.firstName,
        lastName: order.notes.lastName,
        membershipType: order.notes.membershipType,
      },
    });

    const savedPayment = await payment.save();

    // Return back my order details to frontend
    res.json({
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
      notes: {
        ...savedPayment.notes,
        emailId: emailId,
      },
    });
  } catch (err) {
    console.error("Payment creation error:", err);
    res.status(500).json({ msg: err.message });
  }
});

router.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      console.log("Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    const eventType = req.body.event;
    const paymentDetails = req.body.payload.payment.entity;

    console.log("Webhook received:", eventType, paymentDetails.order_id);

    // Find payment record
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
      console.log("Payment not found for order:", paymentDetails.order_id);
      return res.status(404).json({ msg: "Payment not found" });
    }

    // Update payment status and paymentId
    payment.status = paymentDetails.status;
    payment.paymentId = paymentDetails.id;
    await payment.save();

    // Handle successful payment
    if (
      eventType === "payment.captured" &&
      paymentDetails.status === "captured"
    ) {
      const user = await User.findById(payment.userId);

      if (!user) {
        console.log("User not found:", payment.userId);
        return res.status(404).json({ msg: "User not found" });
      }

      // Update user to premium
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;

      await user.save();

      console.log(
        `User ${user._id} upgraded to ${payment.notes.membershipType} membership`,
      );
    }

    // Handle failed payment
    if (eventType === "payment.failed") {
      console.log("Payment failed for order:", paymentDetails.order_id);
    }

    // Return success response to Razorpay
    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ msg: err.message });
  }
});

router.get("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Return only the necessary fields
    return res.json({
      isPremium: user.isPremium || false,
      membershipType: user.membershipType || null,
    });
  } catch (err) {
    console.error("Premium verification error:", err);
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
