import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build_purposes");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      orderNumber,
      fullName,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      address,
    } = body;

    if (!email || !orderNumber) {
      return NextResponse.json(
        { error: "Missing required fields (email, orderNumber)" },
        { status: 400 }
      );
    }

    // Format currency helper
    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(val);
    };

    // Construct the luxury HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation - ${orderNumber}</title>
          <style>
            body {
              font-family: 'Playfair Display', Georgia, serif;
              background-color: #0b0b0b;
              color: #e5e5e5;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #111111;
              border: 1px solid rgba(212, 175, 55, 0.15);
              padding: 40px;
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              border-bottom: 1px solid rgba(212, 175, 55, 0.1);
              padding-bottom: 30px;
              margin-bottom: 30px;
            }
            .logo {
              color: #d4af37;
              font-size: 28px;
              letter-spacing: 4px;
              font-weight: bold;
              text-transform: uppercase;
              text-decoration: none;
            }
            .greeting {
              font-size: 18px;
              line-height: 1.6;
              margin-bottom: 20px;
              color: #ffffff;
            }
            .intro-text {
              font-size: 14px;
              color: #a3a3a3;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .order-details {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .order-details th {
              text-align: left;
              border-bottom: 1px solid rgba(212, 175, 55, 0.15);
              padding-bottom: 10px;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #d4af37;
            }
            .order-details td {
              padding: 15px 0;
              border-bottom: 1px dotted rgba(255, 255, 255, 0.05);
              font-size: 14px;
              color: #e5e5e5;
            }
            .summary-row {
              font-size: 14px;
              color: #a3a3a3;
            }
            .summary-row.total {
              font-size: 16px;
              color: #ffffff;
              font-weight: bold;
            }
            .address-box {
              background-color: rgba(212, 175, 55, 0.02);
              border: 1px solid rgba(212, 175, 55, 0.08);
              padding: 20px;
              margin-bottom: 30px;
              border-radius: 4px;
            }
            .address-title {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #d4af37;
              margin-bottom: 8px;
              font-weight: bold;
            }
            .address-content {
              font-size: 13px;
              line-height: 1.6;
              color: #a3a3a3;
            }
            .footer {
              text-align: center;
              border-top: 1px solid rgba(212, 175, 55, 0.1);
              padding-top: 30px;
              margin-top: 40px;
              font-size: 11px;
              color: #737373;
              line-height: 1.8;
            }
            .footer a {
              color: #d4af37;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">OREN</div>
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #a3a3a3; margin-top: 5px;">Luxury Jewellery</div>
            </div>
            
            <div class="greeting">Dear ${fullName},</div>
            
            <div class="intro-text">
              Thank you for choosing Oren. We are pleased to confirm that your order <strong>#${orderNumber}</strong> has been received and is currently being prepared by our master artisans. Below is your detailed purchase summary.
            </div>
            
            <table class="order-details">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item: any) => `
                  <tr>
                    <td>
                      <div style="font-weight: bold; color: #ffffff;">${item.name}</div>
                      <div style="font-size: 11px; color: #a3a3a3; margin-top: 3px;">Size: ${item.size}</div>
                    </td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right; font-family: monospace;">${formatCurrency(item.price)}</td>
                  </tr>
                `
                  )
                  .join("")}
                
                <tr class="summary-row">
                  <td colspan="2" style="border: none; padding-top: 20px; text-align: right;">Subtotal:</td>
                  <td style="border: none; padding-top: 20px; text-align: right; font-family: monospace;">${formatCurrency(subtotal)}</td>
                </tr>
                <tr class="summary-row">
                  <td colspan="2" style="border: none; padding-top: 5px; text-align: right;">Tax (3%):</td>
                  <td style="border: none; padding-top: 5px; text-align: right; font-family: monospace;">${formatCurrency(tax)}</td>
                </tr>
                <tr class="summary-row">
                  <td colspan="2" style="border: none; padding-top: 5px; text-align: right;">Shipping:</td>
                  <td style="border: none; padding-top: 5px; text-align: right; font-family: monospace;">${
                    shipping === 0 ? "Complimentary" : formatCurrency(shipping)
                  }</td>
                </tr>
                <tr class="summary-row total">
                  <td colspan="2" style="border: none; padding-top: 15px; text-align: right; border-top: 1px solid rgba(212, 175, 55, 0.15);">Total:</td>
                  <td style="border: none; padding-top: 15px; text-align: right; border-top: 1px solid rgba(212, 175, 55, 0.15); color: #d4af37; font-family: monospace;">${formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="address-box">
              <div class="address-title">Shipping Address</div>
              <div class="address-content">
                <strong>${fullName}</strong><br>
                ${address}
              </div>
            </div>
            
            <div style="font-size: 13px; color: #a3a3a3; line-height: 1.6; margin-bottom: 20px;">
              <strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}<br>
              <strong>Status:</strong> Processing
            </div>
            
            <div class="footer">
              This is a secure system confirmation email regarding your luxury purchase.<br>
              If you have any inquiries, please contact our concierge line or email support.<br>
              <br>
              © ${new Date().getFullYear()} OREN Luxury Jewellers. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email via Resend
    // NOTE: On Resend's free tier without a verified domain, 'from' must be "onboarding@resend.dev"
    // and 'to' must be your account owner email (usually the email you signed up with).
    // Once you verify your domain, you can change 'from' to your verified sender (e.g., "orders@yourdomain.com").
    const fromSender = process.env.RESEND_FROM_EMAIL || "orders@striker4u.me";

    const { data, error } = await resend.emails.send({
      from: `OREN Luxury <${fromSender}>`,
      to: email,
      subject: `Order Confirmation #${orderNumber} — OREN`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Internal Server Error in mail route:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
