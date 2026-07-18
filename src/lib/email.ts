import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (
  to: string,
  orderNumber: string,
  customerName: string,
  totalAmount: number
) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1c4bc3; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">SHOMZY</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #111827; margin-top: 0;">Order Confirmed!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${customerName},</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for your order! We've received it and will start processing it right away.</p>
        
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 24px 0;">
          <p style="margin: 0; color: #4b5563;"><strong>Order Number:</strong> ${orderNumber}</p>
          <p style="margin: 8px 0 0 0; color: #4b5563;"><strong>Total Amount:</strong> Rs. ${totalAmount.toLocaleString()}</p>
        </div>

        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">We will send you another email as soon as your order ships.</p>
        
        <div style="margin-top: 32px;">
          <a href="https://shomzy.pk" style="background-color: #1c4bc3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Visit Store</a>
        </div>
      </div>
      <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Shomzy. All rights reserved.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"Shomzy.pk" <' + process.env.SMTP_EMAIL + '>',
    to,
    subject: `Order Confirmation - ${orderNumber}`,
    html: htmlTemplate,
  });
};

export const sendShippingUpdateEmail = async (
  to: string,
  orderNumber: string,
  customerName: string,
  status: string
) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1c4bc3; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">SHOMZY</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #111827; margin-top: 0;">Shipping Update</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hi ${customerName},</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Your order <strong>${orderNumber}</strong> has been marked as <strong>${status}</strong>!</p>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-top: 24px;">If you have any questions, feel free to reply to this email.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"Shomzy.pk" <' + process.env.SMTP_EMAIL + '>',
    to,
    subject: `Shipping Update for Order ${orderNumber}`,
    html: htmlTemplate,
  });
};
