const baseStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f4;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 30px 20px;
    text-align: center;
  }
  .logo {
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  }
  .content {
    padding: 40px 30px;
  }
  .greeting {
    font-size: 24px;
    color: #333333;
    margin-bottom: 20px;
  }
  .message {
    font-size: 16px;
    color: #666666;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  .button {
    display: inline-block;
    padding: 14px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
  }
  .button:hover {
    opacity: 0.9;
  }
  .footer {
    background-color: #f8f8f8;
    padding: 20px 30px;
    text-align: center;
    font-size: 14px;
    color: #999999;
  }
  .divider {
    height: 1px;
    background-color: #e0e0e0;
    margin: 30px 0;
  }
  .highlight {
    color: #667eea;
    font-weight: bold;
  }
`;

const newConnectionRequestTemplate = (fromUserName, toUserName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">👨‍💻 CodersPair</h1>
        </div>
        <div class="content">
          <h2 class="greeting">Hey ${toUserName}! 👋</h2>
          <p class="message">
            Great news! <span class="highlight">${fromUserName}</span> wants to connect with you on CodersPair.
          </p>
          <p class="message">
            This could be the start of an amazing collaboration. Check out their profile and see if you'd like to connect!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://coderspair.com/requests" class="button">View Request</a>
          </div>
          <div class="divider"></div>
          <p class="message" style="font-size: 14px; color: #999999;">
            Don't want to connect? No worries! You can ignore this request anytime.
          </p>
        </div>
        <div class="footer">
          <p>© 2025 CodersPair. Connecting developers worldwide.</p>
          <p>You're receiving this because someone sent you a connection request.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for daily digest
const dailyDigestTemplate = (requestCount) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">👨‍💻 CodersPair</h1>
        </div>
        <div class="content">
          <h2 class="greeting">Daily Summary 📊</h2>
          <p class="message">
            You have <span class="highlight">${requestCount} pending connection request${requestCount > 1 ? "s" : ""}</span> waiting for your response!
          </p>
          <p class="message">
            These developers are interested in connecting with you. Take a moment to review their profiles and build your network.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://coderspair.com/requests" class="button">Review Requests</a>
          </div>
          <div class="divider"></div>
          <p class="message" style="font-size: 14px; color: #999999;">
            💡 Tip: A strong network opens doors to new opportunities, collaborations, and friendships!
          </p>
        </div>
        <div class="footer">
          <p>© 2025 CodersPair. Connecting developers worldwide.</p>
          <p>You're receiving this daily digest because you have pending requests.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for connection accepted
const connectionAcceptedTemplate = (acceptedByName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">👨‍💻 CodersPair</h1>
        </div>
        <div class="content">
          <h2 class="greeting">🎉 Connection Accepted!</h2>
          <p class="message">
            Awesome news! <span class="highlight">${acceptedByName}</span> accepted your connection request.
          </p>
          <p class="message">
            You're now connected and can start collaborating, sharing ideas, or just chatting about code!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://coderspair.com/connections" class="button">View Connection</a>
          </div>
          <div class="divider"></div>
          <p class="message" style="font-size: 14px; color: #999999;">
            💬 Start the conversation and make the most of your new connection!
          </p>
        </div>
        <div class="footer">
          <p>© 2025 CodersPair. Connecting developers worldwide.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  newConnectionRequestTemplate,
  dailyDigestTemplate,
  connectionAcceptedTemplate,
};
