const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest.model");
const sendEmail = require("./sendEmail");
const { dailyDigestTemplate } = require("./emailTemplates");

cron.schedule("27 19 * * *", async () => {
  // Send emails to all people who got requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    // Group requests by recipient email
    const emailMap = new Map();

    pendingRequests.forEach((req) => {
      const email = req.toUserId.emailId;
      const name = req.toUserId.firstName;

      if (!emailMap.has(email)) {
        emailMap.set(email, { name, count: 0 });
      }
      emailMap.get(email).count++;
    });

    console.log(`Sending digest emails to ${emailMap.size} users`);

    for (const [email, data] of emailMap) {
      // Send Emails with HTML template
      const htmlBody = dailyDigestTemplate(data.count);
      const textBody = `You have ${data.count} pending connection request${data.count > 1 ? "s" : ""}. Please login to CodersPair.com to review them.`;

      await sendEmail.run(
        email,
        `You have ${data.count} pending connection request${data.count > 1 ? "s" : ""}`,
        htmlBody,
        textBody,
      );
    }

    console.log(`Successfully sent ${emailMap.size} digest emails`);
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});
