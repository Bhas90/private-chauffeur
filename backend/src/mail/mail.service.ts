import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";

import nodemailer from "nodemailer";

import { MailSettingsService } from "../mail-settings/mail-settings.service";
import { ReportProblemMailDto } from "./dto/report-problem-mail.dto";
import { ContactMailDto } from "./dto/contact-mail.dto";
import { QuoteMailDto } from "./dto/quote-mail.dto";

@Injectable()
export class MailService {
  constructor(
    private readonly mailSettingsService:
      MailSettingsService,
  ) {}

  /* =======================================================
     CREATE SMTP TRANSPORTER
  ======================================================= */

  private async createTransporter() {
    const settings =
      await this.mailSettingsService.getInternalSettings();

    if (!settings.enabled) {
      throw new BadRequestException(
        "Mail sending is currently disabled.",
      );
    }

    if (
      !settings.smtpHost ||
      !settings.smtpPort ||
      !settings.smtpUsername ||
      !settings.smtpPassword
    ) {
      throw new BadRequestException(
        "SMTP configuration is incomplete.",
      );
    }

    return {
      transporter:
        nodemailer.createTransport({
          host: settings.smtpHost,

          port: settings.smtpPort,

          secure:
            settings.smtpSecure,

          auth: {
            user:
              settings.smtpUsername,

            pass:
              settings.smtpPassword,
          },
        }),

      settings,
    };
  }

  /* =======================================================
     VERIFY SMTP
  ======================================================= */

  async verifyConnection() {
    const {
      transporter,
    } = await this.createTransporter();

    await transporter.verify();

    return {
      success: true,

      message:
        "SMTP connection verified successfully.",
    };
  }

  /* =======================================================
     SEND TEST EMAIL
  ======================================================= */

  async sendTestEmail(
    recipient: string,
  ) {
    const {
      transporter,
      settings,
    } = await this.createTransporter();

    if (!settings.fromEmail) {
      throw new BadRequestException(
        "From email is not configured.",
      );
    }

    const fromName =
      settings.fromName ||
      "Private Chauffeur Melbourne";

    await transporter.sendMail({
      from:
        `"${fromName}" <${settings.fromEmail}>`,

      to:
        recipient,

      replyTo:
        settings.replyToEmail ||
        settings.fromEmail,

      subject:
        "Private Chauffeur Melbourne – Test Email",

      text:
        "This is a test email from the Private Chauffeur Melbourne website. Your SMTP configuration is working correctly.",

      html: `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td
        align="center"
        style="padding:32px 14px;"
      >
        <table
          width="620"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:620px;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:30px;
                background:#10283f;
              "
            >
              <div
                style="
                  color:#c6a66b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                SMTP Verification
              </div>

              <h1
                style="
                  margin:9px 0 0;
                  color:#ffffff;
                  font-size:25px;
                "
              >
                Private Chauffeur Melbourne
              </h1>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:34px 30px;
              "
            >
              <div
                style="
                  width:52px;
                  height:52px;
                  margin:0 auto 18px;
                  border-radius:50%;
                  background:#f5eddb;
                  color:#9e7d43;
                  font-size:25px;
                  line-height:52px;
                "
              >
                ✓
              </div>

              <h2
                style="
                  margin:0;
                  color:#10283f;
                  font-size:22px;
                "
              >
                SMTP Test Successful
              </h2>

              <p
                style="
                  margin:12px auto 0;
                  max-width:470px;
                  color:#65717c;
                  font-size:14px;
                  line-height:1.7;
                "
              >
                Your website email
                configuration is working
                correctly.
              </p>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:22px 30px;
                background:#0b1e2f;
                color:#8495a3;
                font-size:11px;
              "
            >
              Private Chauffeur Melbourne
              Website Administration
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return {
      success: true,

      message:
        `Test email sent successfully to ${recipient}.`,
    };
  }

  /* =======================================================
     QUOTE REQUEST
  ======================================================= */

  async sendQuoteRequest(
    dto: QuoteMailDto,
  ) {
    const {
      transporter,
      settings,
    } = await this.createTransporter();

    if (!settings.fromEmail) {
      throw new BadRequestException(
        "From email is not configured.",
      );
    }

    const fromName =
      settings.fromName ||
      "Private Chauffeur Melbourne";

    const journeyType =
      dto.tripType === "return"
        ? "Return Journey"
        : "One Way";

    /* =====================================================
       ADMIN EMAIL
    ===================================================== */

    if (settings.sendAdminEmail) {
      if (!settings.adminEmail) {
        throw new BadRequestException(
          "Admin recipient email is not configured.",
        );
      }

      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          settings.adminEmail,

        replyTo:
          dto.email,

        subject:
          `New Chauffeur Enquiry – ${dto.fullName} – ${dto.pickupDate}`,

        text:
          this.buildAdminQuoteText(
            dto,
            journeyType,
          ),

        html:
          this.buildAdminQuoteEmail(
            dto,
            journeyType,
            settings,
          ),
      });
    }

    /* =====================================================
       CUSTOMER AUTO-REPLY
    ===================================================== */

    if (
      settings.sendCustomerAutoReply
    ) {
      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          dto.email,

        replyTo:
          settings.replyToEmail ||
          settings.fromEmail,

        subject:
          "Your chauffeur enquiry has been received",

        text:
          this.buildCustomerQuoteText(
            dto,
            journeyType,
            settings,
          ),

        html:
          this.buildCustomerQuoteEmail(
            dto,
            journeyType,
            settings,
          ),
      });
    }

    /* =====================================================
       WHATSAPP MESSAGE PREPARATION
    ===================================================== */

    if (
      settings.sendWhatsappNotification &&
      settings.whatsappNumber
    ) {
      const whatsappMessage =
        this.buildAdminWhatsAppMessage(
          dto,
          journeyType,
        );

      if (
        process.env.NODE_ENV !==
        "production"
      ) {
        console.log(
          "WhatsApp notification prepared:",
          whatsappMessage,
        );
      }

      /*
       * Later:
       *
       * await this.whatsappService
       *   .sendLeadNotification(
       *     settings.whatsappNumber,
       *     whatsappMessage,
       *   );
       */
    }

    return {
      success: true,

      message:
        "Quote request submitted successfully.",
    };
  }

  /* =======================================================
     CONTACT REQUEST
  ======================================================= */

  async sendContactRequest(
    dto: ContactMailDto,
  ) {
    const {
      transporter,
      settings,
    } = await this.createTransporter();

    if (!settings.fromEmail) {
      throw new BadRequestException(
        "From email is not configured.",
      );
    }

    const fromName =
      settings.fromName ||
      "Private Chauffeur Melbourne";

    const contactMethod =
      dto.preferredContact ===
      "whatsapp"
        ? "WhatsApp"
        : dto.preferredContact ===
            "email"
          ? "Email"
          : "Phone";

    /* =====================================================
       ADMIN EMAIL
    ===================================================== */

    if (settings.sendAdminEmail) {
      if (!settings.adminEmail) {
        throw new BadRequestException(
          "Admin recipient email is not configured.",
        );
      }

      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          settings.adminEmail,

        replyTo:
          dto.email,

        subject:
          `New Website Enquiry – ${dto.subject}`,

        text:
          this.buildAdminContactText(
            dto,
            contactMethod,
          ),

        html:
          this.buildAdminContactEmail(
            dto,
            contactMethod,
            settings,
          ),
      });
    }

    /* =====================================================
       CUSTOMER AUTO-REPLY
    ===================================================== */

    if (
      settings.sendCustomerAutoReply
    ) {
      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          dto.email,

        replyTo:
          settings.replyToEmail ||
          settings.fromEmail,

        subject:
          "We've received your enquiry | Private Chauffeur Melbourne",

        text:
          this.buildCustomerContactText(
            dto,
            contactMethod,
            settings,
          ),

        html:
          this.buildCustomerContactEmail(
            dto,
            contactMethod,
            settings,
          ),
      });
    }

    return {
      success: true,

      message:
        "Your enquiry has been received successfully.",
    };
  }

  /* =======================================================
     REPORT PROBLEM REQUEST
  ======================================================= */

  async sendProblemReport(
    dto: ReportProblemMailDto,
    attachment?: Express.Multer.File,
  ) {
    const {
      transporter,
      settings,
    } = await this.createTransporter();

    if (!settings.fromEmail) {
      throw new BadRequestException(
        "From email is not configured.",
      );
    }

    const fromName =
      settings.fromName ||
      "Private Chauffeur Melbourne";

    const contactMethod =
      dto.preferredContact ===
      "whatsapp"
        ? "WhatsApp"
        : dto.preferredContact ===
            "phone"
          ? "Phone"
          : "Email";

    /* =====================================================
       ADMIN SUPPORT EMAIL
    ===================================================== */

    if (settings.sendAdminEmail) {
      if (!settings.adminEmail) {
        throw new BadRequestException(
          "Admin recipient email is not configured.",
        );
      }

      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          settings.adminEmail,

        replyTo:
          dto.email,

        subject:
          `Problem Report – ${dto.category} – ${dto.fullName}`,

        text:
          this.buildAdminProblemText(
            dto,
            contactMethod,
            Boolean(attachment),
          ),

        html:
          this.buildAdminProblemEmail(
            dto,
            contactMethod,
            Boolean(attachment),
            settings,
          ),

        attachments:
          attachment
            ? [
                {
                  filename:
                    attachment.originalname,

                  content:
                    attachment.buffer,

                  contentType:
                    attachment.mimetype,
                },
              ]
            : [],
      });
    }

    /* =====================================================
       CUSTOMER ACKNOWLEDGEMENT
    ===================================================== */

    if (
      settings.sendCustomerAutoReply
    ) {
      await transporter.sendMail({
        from:
          `"${fromName}" <${settings.fromEmail}>`,

        to:
          dto.email,

        replyTo:
          settings.replyToEmail ||
          settings.fromEmail,

        subject:
          "We've received your support request | Private Chauffeur Melbourne",

        text:
          this.buildCustomerProblemText(
            dto,
            contactMethod,
            settings,
          ),

        html:
          this.buildCustomerProblemEmail(
            dto,
            contactMethod,
            settings,
          ),
      });
    }

    return {
      success: true,

      message:
        "Your problem report has been submitted successfully.",
    };
  }

  /* =======================================================
     ADMIN PROBLEM TEXT
  ======================================================= */

  private buildAdminProblemText(
    dto: ReportProblemMailDto,
    contactMethod: string,
    hasAttachment: boolean,
  ) {
    const lines = [
      "NEW PROBLEM REPORT",
      "Private Chauffeur Melbourne",
      "",
      "CUSTOMER DETAILS",
      `Name: ${dto.fullName}`,
      `Email: ${dto.email}`,
      `Mobile: ${dto.phone}`,
      `Preferred Contact: ${contactMethod}`,
      "",
      "PROBLEM DETAILS",
      `Category: ${dto.category}`,
      `Subject: ${dto.subject}`,
    ];

    if (
      dto.bookingReference
    ) {
      lines.push(
        `Booking Reference: ${dto.bookingReference}`,
      );
    }

    if (dto.journeyDate) {
      lines.push(
        `Journey Date: ${dto.journeyDate}`,
      );
    }

    lines.push(
      `Attachment: ${
        hasAttachment
          ? "Attached"
          : "No attachment"
      }`,
      "",
      "DESCRIPTION",
      dto.description,
      "",
      "ACTION REQUIRED",
      "Please review this support report and contact the customer.",
    );

    return lines.join("\n");
  }

  /* =======================================================
     CUSTOMER PROBLEM TEXT
  ======================================================= */

  private buildCustomerProblemText(
    dto: ReportProblemMailDto,
    contactMethod: string,
    settings: any,
  ) {
    const lines = [
      "PRIVATE CHAUFFEUR MELBOURNE",
      "",
      `Hi ${dto.fullName},`,
      "",
      "Thank you for contacting Private Chauffeur Melbourne.",
      "",
      "We've received your support report and our team will review the information provided.",
      "",
      `Category: ${dto.category}`,
      `Subject: ${dto.subject}`,
    ];

    if (
      dto.bookingReference
    ) {
      lines.push(
        `Booking Reference: ${dto.bookingReference}`,
      );
    }

    if (dto.journeyDate) {
      lines.push(
        `Journey Date: ${dto.journeyDate}`,
      );
    }

    lines.push(
      "",
      `Preferred contact method: ${contactMethod}`,
      "",
      "If your issue relates to an immediate or upcoming journey, please contact our team directly.",
    );

    if (
      settings.businessPhone
    ) {
      lines.push(
        "",
        `Phone: ${settings.businessPhone}`,
      );
    }

    if (
      settings.whatsappNumber
    ) {
      lines.push(
        `WhatsApp: ${settings.whatsappNumber}`,
      );
    }

    if (settings.fromEmail) {
      lines.push(
        `Email: ${settings.fromEmail}`,
      );
    }

    if (
      settings.websiteUrl
    ) {
      lines.push(
        `Website: ${settings.websiteUrl}`,
      );
    }

    lines.push(
      "",
      "Private Chauffeur Melbourne",
    );

    return lines.join("\n");
  }

  /* =======================================================
     ADMIN PROBLEM EMAIL
  ======================================================= */

  private buildAdminProblemEmail(
    dto: ReportProblemMailDto,
    contactMethod: string,
    hasAttachment: boolean,
    settings: any,
  ) {
    const customerPhone =
      dto.phone.replace(
        /[^0-9+]/g,
        "",
      );

    const customerWhatsapp =
      this.normaliseWhatsappNumber(
        dto.phone,
      );

    const callUrl =
      customerPhone
        ? `tel:${customerPhone}`
        : "";

    const emailUrl =
      `mailto:${encodeURIComponent(
        dto.email,
      )}`;

    const whatsappUrl =
      customerWhatsapp
        ? `https://wa.me/${customerWhatsapp}?text=${encodeURIComponent(
            `Hi ${dto.fullName}, this is Private Chauffeur Melbourne regarding the support report you submitted.`,
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
>
<tr>
<td
  align="center"
  style="padding:32px 14px;"
>

<table
  width="680"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:680px;
    background:#ffffff;
    border-radius:14px;
    overflow:hidden;
  "
>

<tr>
<td
  style="
    padding:30px 32px;
    background:#10283f;
  "
>
  <div
    style="
      color:#c6a66b;
      font-size:11px;
      font-weight:700;
      letter-spacing:2px;
      text-transform:uppercase;
    "
  >
    Customer Support
  </div>

  <h1
    style="
      margin:8px 0 0;
      color:#ffffff;
      font-size:27px;
    "
  >
    New Problem Report
  </h1>

  <p
    style="
      margin:8px 0 0;
      color:#b9c4ce;
      font-size:14px;
    "
  >
    Private Chauffeur Melbourne
  </p>
</td>
</tr>

<tr>
<td
  style="
    padding:20px 32px;
    background:#fff4ec;
  "
>
  <strong
    style="
      display:block;
      color:#9a572c;
      font-size:14px;
    "
  >
    Support follow-up required
  </strong>

  <span
    style="
      display:block;
      margin-top:5px;
      color:#76543d;
      font-size:13px;
      line-height:1.6;
    "
  >
    Review the customer's report
    and respond using their
    preferred contact method:
    ${this.escapeHtml(
      contactMethod,
    )}.
  </span>
</td>
</tr>

<tr>
<td
  style="
    padding:30px 32px 8px;
  "
>
  ${this.emailSectionTitle(
    "Customer Details",
  )}

  ${this.emailInfoTable([
    [
      "Full Name",
      dto.fullName,
    ],
    [
      "Email",
      dto.email,
    ],
    [
      "Mobile",
      dto.phone,
    ],
    [
      "Preferred Contact",
      contactMethod,
    ],
  ])}
</td>
</tr>

<tr>
<td
  style="
    padding:18px 32px;
  "
>
  ${
    callUrl
      ? `
        <a
          href="${callUrl}"
          style="
            display:inline-block;
            margin:4px;
            padding:12px 17px;
            border-radius:24px;
            background:#10283f;
            color:#ffffff;
            text-decoration:none;
            font-size:12px;
            font-weight:700;
          "
        >
          Call Customer
        </a>
      `
      : ""
  }

  <a
    href="${emailUrl}"
    style="
      display:inline-block;
      margin:4px;
      padding:12px 17px;
      border-radius:24px;
      background:#c6a66b;
      color:#10283f;
      text-decoration:none;
      font-size:12px;
      font-weight:700;
    "
  >
    Reply by Email
  </a>

  ${
    whatsappUrl
      ? `
        <a
          href="${whatsappUrl}"
          style="
            display:inline-block;
            margin:4px;
            padding:12px 17px;
            border-radius:24px;
            background:#f2f4f6;
            color:#10283f;
            text-decoration:none;
            font-size:12px;
            font-weight:700;
          "
        >
          WhatsApp
        </a>
      `
      : ""
  }
</td>
</tr>

<tr>
<td
  style="
    padding:20px 32px 8px;
  "
>
  ${this.emailSectionTitle(
    "Issue Details",
  )}

  ${this.emailInfoTable([
    [
      "Category",
      dto.category,
    ],
    [
      "Subject",
      dto.subject,
    ],
    [
      "Booking Reference",
      dto.bookingReference,
    ],
    [
      "Journey Date",
      dto.journeyDate,
    ],
    [
      "Attachment",
      hasAttachment
        ? "Attached to this email"
        : "No attachment",
    ],
  ])}
</td>
</tr>

<tr>
<td
  style="
    padding:26px 32px 32px;
  "
>
  ${this.emailSectionTitle(
    "Customer Description",
  )}

  <div
    style="
      margin-top:14px;
      padding:20px;
      border:1px solid #e4e8eb;
      border-radius:8px;
      background:#fafbfc;
      color:#53606c;
      font-size:14px;
      line-height:1.75;
      white-space:pre-wrap;
    "
  >
    ${this.escapeHtml(
      dto.description,
    )}
  </div>
</td>
</tr>

<tr>
<td
  style="
    padding:25px 32px;
    background:#0b1e2f;
    color:#9cabb7;
    font-size:12px;
    line-height:1.7;
  "
>
  <strong
    style="color:#ffffff;"
  >
    Private Chauffeur Melbourne
  </strong>

  ${
    settings.businessPhone
      ? `
        <br />
        ${this.escapeHtml(
          settings.businessPhone,
        )}
      `
      : ""
  }

  ${
    settings.adminEmail
      ? `
        <br />
        ${this.escapeHtml(
          settings.adminEmail,
        )}
      `
      : ""
  }

  <br /><br />

  This support report was
  submitted through the
  Private Chauffeur Melbourne
  website.
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
    `;
  }

  /* =======================================================
     CUSTOMER PROBLEM EMAIL
  ======================================================= */

  private buildCustomerProblemEmail(
    dto: ReportProblemMailDto,
    contactMethod: string,
    settings: any,
  ) {
    const website =
      settings.websiteUrl ||
      "https://privatechauffeurmelbourne.com.au";

    const websiteBase =
      website.replace(/\/$/, "");

    const businessPhone =
      settings.businessPhone ||
      "";

    const whatsapp =
      this.normaliseWhatsappNumber(
        settings.whatsappNumber,
      );

    const callUrl =
      businessPhone
        ? `tel:${businessPhone.replace(
            /[^0-9+]/g,
            "",
          )}`
        : "";

    const whatsappUrl =
      whatsapp
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
            "Hi Private Chauffeur Melbourne, I recently submitted a support report and need assistance.",
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
>
<tr>
<td
  align="center"
  style="padding:30px 12px;"
>

<table
  width="680"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:680px;
    background:#ffffff;
    border-radius:14px;
    overflow:hidden;
  "
>

<tr>
<td
  align="center"
  style="
    padding:35px 30px;
    background:#10283f;
  "
>
  <div
    style="
      color:#c6a66b;
      font-size:11px;
      font-weight:700;
      letter-spacing:2px;
      text-transform:uppercase;
    "
  >
    Customer Support · Melbourne
  </div>

  <h1
    style="
      margin:10px 0 0;
      color:#ffffff;
      font-size:28px;
    "
  >
    Private Chauffeur Melbourne
  </h1>
</td>
</tr>

<tr>
<td
  align="center"
  style="
    padding:36px 32px 20px;
  "
>
  <div
    style="
      width:54px;
      height:54px;
      margin:0 auto 18px;
      border-radius:50%;
      background:#f5eddb;
      color:#9e7d43;
      line-height:54px;
      font-size:26px;
    "
  >
    ✓
  </div>

  <h2
    style="
      margin:0;
      color:#10283f;
      font-size:25px;
    "
  >
    We've received your
    support report.
  </h2>

  <p
    style="
      max-width:520px;
      margin:14px auto 0;
      color:#65717c;
      font-size:15px;
      line-height:1.75;
    "
  >
    Hi
    ${this.escapeHtml(
      dto.fullName,
    )},
    thank you for providing
    the details. Our team will
    review your report and
    respond using your preferred
    contact method.
  </p>
</td>
</tr>

<tr>
<td
  style="
    padding:16px 32px 28px;
  "
>
  <div
    style="
      padding:20px;
      background:#f7f5f0;
      border-left:
        4px solid #c6a66b;
    "
  >
    ${this.emailInfoTable([
      [
        "Category",
        dto.category,
      ],
      [
        "Subject",
        dto.subject,
      ],
      [
        "Booking Reference",
        dto.bookingReference,
      ],
      [
        "Journey Date",
        dto.journeyDate,
      ],
      [
        "Preferred Contact",
        contactMethod,
      ],
    ])}
  </div>
</td>
</tr>

<tr>
<td
  style="
    padding:0 32px 28px;
  "
>
  <div
    style="
      padding:20px;
      background:#fff9ec;
      border-left:
        4px solid ​:contentReference[oaicite:2]{index=2}​
            "
  >
    <strong
      style="
        display:block;
        color:#10283f;
        font-size:14px;
      "
    >
      ${this.escapeHtml(
        dto.subject,
      )}
    </strong>

    <p
      style="
        margin:8px 0 0;
        color:#65717c;
        font-size:13px;
        line-height:1.7;
      "
    >
      Category:
      ${this.escapeHtml(
        dto.category,
      )}
    </p>

    <p
      style="
        margin:5px 0 0;
        color:#65717c;
        font-size:13px;
        line-height:1.7;
      "
    >
      Preferred contact:
      ${this.escapeHtml(
        contactMethod,
      )}
    </p>
  </div>
</td>
</tr>

<tr>
<td
  style="
    padding:0 32px 28px;
  "
>
  <h3
    style="
      margin:0;
      color:#10283f;
      font-size:18px;
    "
  >
    What happens next?
  </h3>

  <p
    style="
      margin:10px 0 0;
      color:#65717c;
      font-size:14px;
      line-height:1.75;
    "
  >
    Our support team will review
    the information you submitted,
    including any booking reference,
    journey date and supporting file.
  </p>

  <p
    style="
      margin:10px 0 0;
      color:#65717c;
      font-size:14px;
      line-height:1.75;
    "
  >
    We will contact you using your
    preferred method as soon as
    reasonably possible.
  </p>
</td>
</tr>

<tr>
<td
  style="
    padding:0 32px 30px;
  "
>
  <div
    style="
      padding:20px;
      background:#fff4ec;
      border-left:
        4px solid #c6a66b;
      color:#76543d;
      font-size:14px;
      line-height:1.7;
    "
  >
    <strong
      style="
        display:block;
        margin-bottom:5px;
        color:#9a572c;
      "
    >
      Is your journey urgent?
    </strong>

    If this issue relates to an
    immediate or upcoming journey,
    please call or message our team
    directly rather than waiting for
    an email response.
  </div>
</td>
</tr>

<tr>
<td
  align="center"
  style="
    padding:0 24px 34px;
  "
>
  ${
    callUrl
      ? `
        <a
          href="${callUrl}"
          style="
            display:inline-block;
            margin:5px;
            padding:14px 22px;
            border-radius:28px;
            background:#10283f;
            color:#ffffff;
            text-decoration:none;
            font-size:13px;
            font-weight:700;
          "
        >
          Call Our Team
        </a>
      `
      : ""
  }

  ${
    whatsappUrl
      ? `
        <a
          href="${whatsappUrl}"
          style="
            display:inline-block;
            margin:5px;
            padding:14px 22px;
            border-radius:28px;
            background:#c6a66b;
            color:#10283f;
            text-decoration:none;
            font-size:13px;
            font-weight:700;
          "
        >
          Message on WhatsApp
        </a>
      `
      : ""
  }

  <a
    href="${websiteBase}/contact"
    style="
      display:inline-block;
      margin:5px;
      padding:13px 22px;
      border:1px solid #dfe4e8;
      border-radius:28px;
      color:#10283f;
      text-decoration:none;
      font-size:13px;
      font-weight:700;
    "
  >
    Contact Us
  </a>
</td>
</tr>

<tr>
<td
  align="center"
  style="
    padding:26px 28px;
    background:#f8fafb;
    border-top:
      1px solid #edf0f2;
  "
>
  <a
    href="${websiteBase}/services"
    style="${this.footerLinkStyle()}"
  >
    Services
  </a>

  <span
    style="
      padding:0 7px;
      color:#c6a66b;
    "
  >
    •
  </span>

  <a
    href="${websiteBase}/fleet"
    style="${this.footerLinkStyle()}"
  >
    Fleet
  </a>

  <span
    style="
      padding:0 7px;
      color:#c6a66b;
    "
  >
    •
  </span>

  <a
    href="${websiteBase}/service-areas"
    style="${this.footerLinkStyle()}"
  >
    Service Areas
  </a>

  <span
    style="
      padding:0 7px;
      color:#c6a66b;
    "
  >
    •
  </span>

  <a
    href="${websiteBase}/contact"
    style="${this.footerLinkStyle()}"
  >
    Contact
  </a>
</td>
</tr>

<tr>
<td
  align="center"
  style="
    padding:30px 28px;
    background:#0b1e2f;
    color:#9faeba;
    font-size:11px;
    line-height:1.7;
  "
>
  <strong
    style="
      display:block;
      color:#ffffff;
      font-size:16px;
    "
  >
    Private Chauffeur Melbourne
  </strong>

  ${
    settings.businessPhone
      ? `
        <div
          style="
            margin-top:10px;
          "
        >
          ${this.escapeHtml(
            settings.businessPhone,
          )}
        </div>
      `
      : ""
  }

  ${
    settings.fromEmail
      ? `
        <div>
          ${this.escapeHtml(
            settings.fromEmail,
          )}
        </div>
      `
      : ""
  }

  ${
    settings.businessAddress
      ? `
        <div>
          ${this.escapeHtml(
            settings.businessAddress,
          )}
        </div>
      `
      : ""
  }

  <div
    style="
      margin-top:18px;
    "
  >
    <a
      href="${websiteBase}/privacy-policy"
      style="
        color:#9faeba;
        text-decoration:none;
      "
    >
      Privacy Policy
    </a>

    <span
      style="
        padding:0 8px;
      "
    >
      |
    </span>

    <a
      href="${websiteBase}/terms"
      style="
        color:#9faeba;
        text-decoration:none;
      "
    >
      Terms & Conditions
    </a>
  </div>

  <p
    style="
      max-width:480px;
      margin:15px auto 0;
      color:#748695;
      font-size:10px;
      line-height:1.65;
    "
  >
    You received this email
    because you submitted a
    support request through the
    Private Chauffeur Melbourne
    website.
  </p>

  <p
    style="
      margin:10px 0 0;
      color:#5f7483;
      font-size:10px;
    "
  >
    © ${new Date().getFullYear()}
    Private Chauffeur Melbourne.
    All rights reserved.
  </p>
</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>
    `;
  }

  /* =======================================================
     ADMIN CONTACT TEXT
  ======================================================= */

  private buildAdminContactText(
    dto: ContactMailDto,
    contactMethod: string,
  ) {
    const lines = [
      "NEW WEBSITE ENQUIRY",
      "Private Chauffeur Melbourne",
      "",
      `Name: ${dto.fullName}`,
      `Email: ${dto.email}`,
      `Mobile: ${dto.mobile}`,
      `Preferred Contact: ${contactMethod}`,
      `Subject: ${dto.subject}`,
      `Service: ${dto.service || "General Enquiry"}`,
      "",
      "MESSAGE",
      dto.message,
      "",
      "ACTION REQUIRED",
      "Please review and respond to the customer.",
    ];

    return lines.join("\n");
  }

  /* =======================================================
     CUSTOMER CONTACT TEXT
  ======================================================= */

  private buildCustomerContactText(
    dto: ContactMailDto,
    contactMethod: string,
    settings: any,
  ) {
    const lines = [
      "PRIVATE CHAUFFEUR MELBOURNE",
      "",
      `Hi ${dto.fullName},`,
      "",
      "Thank you for contacting Private Chauffeur Melbourne.",
      "",
      `We've received your enquiry regarding: ${dto.subject}`,
      "",
      `Preferred contact method: ${contactMethod}`,
      "",
      "Our team will review your message and respond as soon as practical.",
      "",
      "For time-sensitive chauffeur requirements, please call or message our team directly.",
    ];

    if (settings.businessPhone) {
      lines.push(
        "",
        `Phone: ${settings.businessPhone}`,
      );
    }

    if (settings.whatsappNumber) {
      lines.push(
        `WhatsApp: ${settings.whatsappNumber}`,
      );
    }

    if (settings.fromEmail) {
      lines.push(
        `Email: ${settings.fromEmail}`,
      );
    }

    if (settings.websiteUrl) {
      lines.push(
        `Website: ${settings.websiteUrl}`,
      );
    }

    lines.push(
      "",
      "Private Chauffeur Melbourne",
    );

    return lines.join("\n");
  }

  /* =======================================================
     ADMIN CONTACT EMAIL
  ======================================================= */

  private buildAdminContactEmail(
    dto: ContactMailDto,
    contactMethod: string,
    settings: any,
  ) {
    const customerPhone =
      dto.mobile.replace(
        /[^0-9+]/g,
        "",
      );

    const customerWhatsapp =
      this.normaliseWhatsappNumber(
        dto.mobile,
      );

    const callLink =
      customerPhone
        ? `tel:${customerPhone}`
        : "";

    const emailLink =
      `mailto:${encodeURIComponent(
        dto.email,
      )}`;

    const whatsappLink =
      customerWhatsapp
        ? `https://wa.me/${customerWhatsapp}?text=${encodeURIComponent(
            `Hi ${dto.fullName}, this is Private Chauffeur Melbourne regarding your website enquiry.`,
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td
        align="center"
        style="padding:32px 14px;"
      >
        <table
          width="680"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:680px;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
          "
        >
          <tr>
            <td
              style="
                padding:30px 32px;
                background:#10283f;
              "
            >
              <div
                style="
                  color:#c6a66b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                New Website Enquiry
              </div>

              <h1
                style="
                  margin:8px 0 0;
                  color:#ffffff;
                  font-size:27px;
                "
              >
                Customer Contact Request
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#b9c4ce;
                  font-size:14px;
                "
              >
                Private Chauffeur Melbourne
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px 32px;
                background:#fff8e8;
              "
            >
              <strong
                style="
                  color:#8a672c;
                "
              >
                Follow-up required
              </strong>

              <p
                style="
                  margin:5px 0 0;
                  color:#715b36;
                  font-size:13px;
                  line-height:1.6;
                "
              >
                Customer prefers to be
                contacted via
                ${this.escapeHtml(
                  contactMethod,
                )}.
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:30px 32px 8px;
              "
            >
              ${this.emailSectionTitle(
                "Customer Details",
              )}

              ${this.emailInfoTable([
                [
                  "Full Name",
                  dto.fullName,
                ],
                [
                  "Email",
                  dto.email,
                ],
                [
                  "Mobile",
                  dto.mobile,
                ],
                [
                  "Preferred Contact",
                  contactMethod,
                ],
                [
                  "Subject",
                  dto.subject,
                ],
                [
                  "Service",
                  dto.service ||
                    "General Enquiry",
                ],
              ])}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:18px 32px;
              "
            >
              ${
                callLink
                  ? `
                    <a
                      href="${callLink}"
                      style="
                        display:inline-block;
                        margin:4px;
                        padding:12px 17px;
                        border-radius:24px;
                        background:#10283f;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:12px;
                        font-weight:700;
                      "
                    >
                      Call Customer
                    </a>
                  `
                  : ""
              }

              <a
                href="${emailLink}"
                style="
                  display:inline-block;
                  margin:4px;
                  padding:12px 17px;
                  border-radius:24px;
                  background:#c6a66b;
                  color:#10283f;
                  text-decoration:none;
                  font-size:12px;
                  font-weight:700;
                "
              >
                Reply by Email
              </a>

              ${
                whatsappLink
                  ? `
                    <a
                      href="${whatsappLink}"
                      style="
                        display:inline-block;
                        margin:4px;
                        padding:12px 17px;
                        border-radius:24px;
                        background:#f2f4f6;
                        color:#10283f;
                        text-decoration:none;
                        font-size:12px;
                        font-weight:700;
                      "
                    >
                      WhatsApp
                    </a>
                  `
                  : ""
              }
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px 32px 32px;
              "
            >
              ${this.emailSectionTitle(
                "Customer Message",
              )}

              <div
                style="
                  margin-top:14px;
                  padding:20px;
                  background:#fafbfc;
                  border:1px solid #e4e8eb;
                  border-radius:8px;
                  color:#53606c;
                  font-size:14px;
                  line-height:1.75;
                "
              >
                ${this.escapeHtml(
                  dto.message,
                )}
              </div>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:25px 32px;
                background:#0b1e2f;
                color:#9cabb7;
                font-size:12px;
                line-height:1.7;
              "
            >
              <strong
                style="
                  color:#ffffff;
                "
              >
                Private Chauffeur Melbourne
              </strong>

              ${
                settings.businessPhone
                  ? `
                    <br />
                    ${this.escapeHtml(
                      settings.businessPhone,
                    )}
                  `
                  : ""
              }

              ${
                settings.websiteUrl
                  ? `
                    <br />
                    ${this.escapeHtml(
                      settings.websiteUrl,
                    )}
                  `
                  : ""
              }

              <br /><br />

              This enquiry was submitted
              through the website contact form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  /* =======================================================
     CUSTOMER CONTACT EMAIL
  ======================================================= */

  private buildCustomerContactEmail(
    dto: ContactMailDto,
    contactMethod: string,
    settings: any,
  ) {
    const website =
      settings.websiteUrl ||
      "https://privatechauffeurmelbourne.com.au";

    const websiteBase =
      website.replace(/\/$/, "");

    const businessPhone =
      settings.businessPhone || "";

    const whatsappNumber =
      this.normaliseWhatsappNumber(
        settings.whatsappNumber,
      );

    const callUrl =
      businessPhone
        ? `tel:${businessPhone.replace(
            /[^0-9+]/g,
            "",
          )}`
        : "";

    const whatsappUrl =
      whatsappNumber
        ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hi Private Chauffeur Melbourne, I recently submitted a website enquiry.",
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td
        align="center"
        style="padding:30px 12px;"
      >
        <table
          width="680"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:680px;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:35px 30px;
                background:#10283f;
              "
            >
              <div
                style="
                  color:#c6a66b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                Private Travel · Melbourne
              </div>

              <h1
                style="
                  margin:10px 0 0;
                  color:#ffffff;
                  font-size:28px;
                "
              >
                Private Chauffeur Melbourne
              </h1>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:36px 32px 20px;
              "
            >
              <div
                style="
                  width:54px;
                  height:54px;
                  margin:0 auto 18px;
                  border-radius:50%;
                  background:#f5eddb;
                  color:#9e7d43;
                  line-height:54px;
                  font-size:26px;
                "
              >
                ✓
              </div>

              <h2
                style="
                  margin:0;
                  color:#10283f;
                  font-size:25px;
                "
              >
                We've received your enquiry.
              </h2>

              <p
                style="
                  max-width:520px;
                  margin:14px auto 0;
                  color:#65717c;
                  font-size:15px;
                  line-height:1.75;
                "
              >
                Hi
                ${this.escapeHtml(
                  dto.fullName,
                )},
                thank you for contacting
                Private Chauffeur Melbourne.
                Our team has received your
                message and will review it
                shortly.
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:16px 32px 28px;
              "
            >
              <div
                style="
                  padding:20px;
                  background:#f7f5f0;
                  border-left:
                    4px solid #c6a66b;
                "
              >
                <strong
                  style="
                    display:block;
                    color:#10283f;
                  "
                >
                  ${this.escapeHtml(
                    dto.subject,
                  )}
                </strong>

                <p
                  style="
                    margin:8px 0 0;
                    color:#65717c;
                    font-size:13px;
                    line-height:1.7;
                  "
                >
                  Preferred contact:
                  ${this.escapeHtml(
                    contactMethod,
                  )}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:0 32px 28px;
              "
            >
              <h3
                style="
                  margin:0;
                  color:#10283f;
                  font-size:18px;
                "
              >
                Need assistance sooner?
              </h3>

              <p
                style="
                  color:#65717c;
                  font-size:14px;
                  line-height:1.7;
                "
              >
                For same-day, next-day or
                time-sensitive chauffeur
                requirements, contact our
                team directly.
              </p>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:0 24px 34px;
              "
            >
              ${
                callUrl
                  ? `
                    <a
                      href="${callUrl}"
                      style="
                        display:inline-block;
                        margin:5px;
                        padding:14px 22px;
                        border-radius:28px;
                        background:#10283f;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:13px;
                        font-weight:700;
                      "
                    >
                      Call Our Team
                    </a>
                  `
                  : ""
              }

              ${
                whatsappUrl
                  ? `
                    <a
                      href="${whatsappUrl}"
                      style="
                        display:inline-block;
                        margin:5px;
                        padding:14px 22px;
                        border-radius:28px;
                        background:#c6a66b;
                        color:#10283f;
                        text-decoration:none;
                        font-size:13px;
                        font-weight:700;
                      "
                    >
                      Message on WhatsApp
                    </a>
                  `
                  : ""
              }

              <a
                href="${websiteBase}/get-a-quote"
                style="
                  display:inline-block;
                  margin:5px;
                  padding:13px 22px;
                  border:
                    1px solid #dfe4e8;
                  border-radius:28px;
                  color:#10283f;
                  text-decoration:none;
                  font-size:13px;
                  font-weight:700;
                "
              >
                Request a Quote
              </a>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:26px 28px;
                background:#f8fafb;
                border-top:
                  1px solid #edf0f2;
              "
            >
              <a
                href="${websiteBase}/services"
                style="${this.footerLinkStyle()}"
              >
                Services
              </a>

              <span
                style="
                  padding:0 7px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/fleet"
                style="${this.footerLinkStyle()}"
              >
                Fleet
              </a>

              <span
                style="
                  padding:0 7px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/service-areas"
                style="${this.footerLinkStyle()}"
              >
                Service Areas
              </a>

              <span
                style="
                  padding:0 7px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/contact"
                style="${this.footerLinkStyle()}"
              >
                Contact
              </a>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:30px 28px;
                background:#0b1e2f;
                color:#9faeba;
                font-size:11px;
                line-height:1.7;
              "
            >
              <strong
                style="
                  display:block;
                  color:#ffffff;
                  font-size:16px;
                "
              >
                Private Chauffeur Melbourne
              </strong>

              ${
                settings.businessPhone
                  ? `
                    <div
                      style="
                        margin-top:10px;
                      "
                    >
                      ${this.escapeHtml(
                        settings.businessPhone,
                      )}
                    </div>
                  `
                  : ""
              }

              ${
                settings.fromEmail
                  ? `
                    <div>
                      ${this.escapeHtml(
                        settings.fromEmail,
                      )}
                    </div>
                  `
                  : ""
              }

              ${
                settings.businessAddress
                  ? `
                    <div>
                      ${this.escapeHtml(
                        settings.businessAddress,
                      )}
                    </div>
                  `
                  : ""
              }

              <div
                style="
                  margin-top:18px;
                "
              >
                <a
                  href="${websiteBase}/privacy-policy"
                  style="
                    color:#9faeba;
                    text-decoration:none;
                  "
                >
                  Privacy Policy
                </a>

                <span
                  style="
                    padding:0 8px;
                  "
                >
                  |
                </span>

                <a
                  href="${websiteBase}/terms"
                  style="
                    color:#9faeba;
                    text-decoration:none;
                  "
                >
                  Terms & Conditions
                </a>
              </div>

              <p
                style="
                  max-width:480px;
                  margin:15px auto 0;
                  color:#748695;
                  font-size:10px;
                "
              >
                You received this email
                because you submitted an
                enquiry through the Private
                Chauffeur Melbourne website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  /* =======================================================
     ADMIN QUOTE EMAIL
  ======================================================= */

  private buildAdminQuoteEmail(
    dto: QuoteMailDto,
    journeyType: string,
    settings: any,
  ) {
    const customerPhone =
      dto.mobile.replace(
        /[^0-9+]/g,
        "",
      );

    const customerWhatsapp =
      this.normaliseWhatsappNumber(
        dto.mobile,
      );

    const callLink =
      customerPhone
        ? `tel:${customerPhone}`
        : "";

    const emailLink =
      `mailto:${encodeURIComponent(
        dto.email,
      )}`;

    const whatsappLink =
      customerWhatsapp
        ? `https://wa.me/${customerWhatsapp}?text=${encodeURIComponent(
            `Hi ${dto.fullName}, this is Private Chauffeur Melbourne regarding your chauffeur enquiry for ${dto.pickupDate}.`,
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td
        align="center"
        style="padding:32px 14px;"
      >
        <table
          width="680"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:680px;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
          "
        >
          <tr>
            <td
              style="
                padding:30px 32px;
                background:#10283f;
              "
            >
              <div
                style="
                  color:#c6a66b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                New Website Lead
              </div>

              <h1
                style="
                  margin:8px 0 0;
                  color:#ffffff;
                  font-size:27px;
                "
              >
                New Chauffeur Quote Request
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#b9c4ce;
                  font-size:14px;
                "
              >
                Private Chauffeur Melbourne
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px 32px;
                background:#fff8e8;
              "
            >
              <strong
                style="
                  color:#8a672c;
                "
              >
                New enquiry — follow-up required
              </strong>

              <p
                style="
                  margin:5px 0 0;
                  color:#715b36;
                  font-size:13px;
                  line-height:1.6;
                "
              >
                Review the journey and
                contact the customer to
                confirm availability,
                pricing and booking details.
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:30px 32px 8px;
              "
            >
              ${this.emailSectionTitle(
                "Customer Details",
              )}

              ${this.emailInfoTable([
                [
                  "Full Name",
                  dto.fullName,
                ],
                [
                  "Email",
                  dto.email,
                ],
                [
                  "Mobile",
                  dto.mobile,
                ],
                [
                  "Service",
                  dto.serviceRequired,
                ],
              ])}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:18px 32px;
              "
            >
              ${
                callLink
                  ? `
                    <a
                      href="${callLink}"
                      style="
                        display:inline-block;
                        margin:4px;
                        padding:12px 17px;
                        background:#10283f;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:24px;
                        font-size:12px;
                        font-weight:700;
                      "
                    >
                      Call Customer
                    </a>
                  `
                  : ""
              }

              <a
                href="${emailLink}"
                style="
                  display:inline-block;
                  margin:4px;
                  padding:12px 17px;
                  background:#c6a66b;
                  color:#10283f;
                  text-decoration:none;
                  border-radius:24px;
                  font-size:12px;
                  font-weight:700;
                "
              >
                Reply by Email
              </a>

              ${
                whatsappLink
                  ? `
                    <a
                      href="${whatsappLink}"
                      style="
                        display:inline-block;
                        margin:4px;
                        padding:12px 17px;
                        background:#f2f4f6;
                        color:#10283f;
                        text-decoration:none;
                        border-radius:24px;
                        font-size:12px;
                        font-weight:700;
                      "
                    >
                      WhatsApp
                    </a>
                  `
                  : ""
              }
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:28px 32px 8px;
              "
            >
              ${this.emailSectionTitle(
                "Journey Details",
              )}

              <div
                style="
                  margin-top:14px;
                  padding:20px;
                  background:#f7f5f0;
                  border-left:
                    4px solid #c6a66b;
                  border-radius:6px;
                  color:#10283f;
                  font-size:16px;
                  font-weight:700;
                  line-height:1.6;
                "
              >
                ${this.escapeHtml(
                  dto.pickupLocation,
                )}

                <span
                  style="
                    color:#c6a66b;
                    padding:0 5px;
                  "
                >
                  →
                </span>

                ${this.escapeHtml(
                  dto.destination,
                )}
              </div>

              ${this.emailInfoTable([
                [
                  "Pick-up Date",
                  dto.pickupDate,
                ],
                [
                  "Pick-up Time",
                  dto.pickupTime,
                ],
                [
                  "Journey Type",
                  journeyType,
                ],
                [
                  "Passengers",
                  dto.passengers,
                ],
                [
                  "Preferred Vehicle",
                  dto.preferredVehicle,
                ],
                [
                  "Luggage",
                  dto.luggageRequirements,
                ],
                [
                  "Flight Number",
                  dto.flightNumber,
                ],
              ])}
            </td>
          </tr>

          ${
            dto.additionalRequirements
              ? `
                <tr>
                  <td
                    style="
                      padding:28px 32px;
                    "
                  >
                    ${this.emailSectionTitle(
                      "Additional Requirements",
                    )}

                    <div
                      style="
                        margin-top:14px;
                        padding:18px;
                        border:
                          1px solid #e4e8eb;
                        border-radius:8px;
                        background:#fafbfc;
                        color:#53606c;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      ${this.escapeHtml(
                        dto.additionalRequirements,
                      )}
                    </div>
                  </td>
                </tr>
              `
              : ""
          }

          <tr>
            <td
              style="
                padding:25px 32px;
                background:#0b1e2f;
                color:#9cabb7;
                font-size:12px;
                line-height:1.7;
              "
            >
              <strong
                style="
                  color:#ffffff;
                "
              >
                Private Chauffeur Melbourne
              </strong>

              ${
                settings.businessPhone
                  ? `
                    <br />
                    ${this.escapeHtml(
                      settings.businessPhone,
                    )}
                  `
                  : ""
              }

              ${
                settings.adminEmail
                  ? `
                    <br />
                    ${this.escapeHtml(
                      settings.adminEmail,
                    )}
                  `
                  : ""
              }

              ${
                settings.websiteUrl
                  ? `
                    <br />
                    ${this.escapeHtml(
                      settings.websiteUrl,
                    )}
                  `
                  : ""
              }

              <br /><br />

              This enquiry was submitted
              through the Private Chauffeur
              Melbourne website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  /* =======================================================
     CUSTOMER QUOTE EMAIL
  ======================================================= */

  private buildCustomerQuoteEmail(
    dto: QuoteMailDto,
    journeyType: string,
    settings: any,
  ) {
    const website =
      settings.websiteUrl ||
      "https://privatechauffeurmelbourne.com.au";

    const websiteBase =
      website.replace(/\/$/, "");

    const businessPhone =
      settings.businessPhone || "";

    const whatsappNumber =
      settings.whatsappNumber || "";

    const cleanPhone =
      businessPhone.replace(
        /[^0-9+]/g,
        "",
      );

    const cleanWhatsapp =
      this.normaliseWhatsappNumber(
        whatsappNumber,
      );

    const callUrl =
      cleanPhone
        ? `tel:${cleanPhone}`
        : "";

    const whatsappUrl =
      cleanWhatsapp
        ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
            `Hi Private Chauffeur Melbourne, I recently submitted a chauffeur quote request for ${dto.pickupDate}.`,
          )}`
        : "";

    return `
<!DOCTYPE html>

<html>
<body
  style="
    margin:0;
    padding:0;
    background:#eef1f3;
    font-family:Arial,Helvetica,sans-serif;
    color:#17212b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td
        align="center"
        style="padding:30px 12px;"
      >
        <table
          width="680"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:680px;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:35px 30px;
                background:#10283f;
              "
            >
              <div
                style="
                  color:#c6a66b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                Private Travel · Melbourne
              </div>

              <h1
                style="
                  margin:10px 0 0;
                  color:#ffffff;
                  font-size:28px;
                "
              >
                Private Chauffeur Melbourne
              </h1>

              <p
                style="
                  margin:9px 0 0;
                  color:#bbc6cf;
                  font-size:14px;
                "
              >
                Professional chauffeur travel,
                personally arranged.
              </p>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:36px 32px 18px;
              "
            >
              <div
                style="
                  width:54px;
                  height:54px;
                  margin:0 auto 18px;
                  border-radius:50%;
                  background:#f5eddb;
                  color:#9e7d43;
                  font-size:26px;
                  line-height:54px;
                "
              >
                ✓
              </div>

              <div
                style="
                  color:#9e7d43;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                "
              >
                Enquiry Received
              </div>

              <h2
                style="
                  margin:9px auto 0;
                  max-width:540px;
                  color:#10283f;
                  font-size:25px;
                "
              >
                Your chauffeur enquiry
                is with our booking team.
              </h2>

              <p
                style="
                  max-width:530px;
                  margin:15px auto 0;
                  color:#65717c;
                  font-size:15px;
                  line-height:1.75;
                "
              >
                Hi
                <strong>
                  ${this.escapeHtml(
                    dto.fullName,
                  )}
                </strong>,
                thank you for contacting
                Private Chauffeur Melbourne.
                We've received your journey
                details and will review
                availability and pricing.
              </p>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:22px 32px 30px;
              "
            >
              <div
                style="
                  border:
                    1px solid #e3e7ea;
                  border-radius:10px;
                  overflow:hidden;
                "
              >
                <div
                  style="
                    padding:14px 20px;
                    background:#f7f5f0;
                    color:#9e7d43;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:1.5px;
                    text-transform:uppercase;
                  "
                >
                  Your Journey
                </div>

                <div
                  style="
                    padding:22px 20px;
                  "
                >
                  <div
                    style="
                      color:#10283f;
                      font-size:17px;
                      font-weight:700;
                      line-height:1.6;
                    "
                  >
                    ${this.escapeHtml(
                      dto.pickupLocation,
                    )}

                    <span
                      style="
                        padding:0 7px;
                        color:#c6a66b;
                      "
                    >
                      →
                    </span>

                    ${this.escapeHtml(
                      dto.destination,
                    )}
                  </div>

                  ${this.emailInfoTable([
                    [
                      "Pick-up Date",
                      dto.pickupDate,
                    ],
                    [
                      "Pick-up Time",
                      dto.pickupTime,
                    ],
                    [
                      "Journey Type",
                      journeyType,
                    ],
                    [
                      "Passengers",
                      dto.passengers,
                    ],
                    [
                      "Service",
                      dto.serviceRequired,
                    ],
                    [
                      "Preferred Vehicle",
                      dto.preferredVehicle,
                    ],
                    [
                      "Flight Number",
                      dto.flightNumber,
                    ],
                  ])}
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:4px 32px 30px;
              "
            >
              <div
                style="
                  color:#9e7d43;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                "
              >
                What Happens Next
              </div>

              <h3
                style="
                  margin:8px 0 0;
                  color:#10283f;
                  font-size:20px;
                "
              >
                From enquiry to your
                confirmed journey.
              </h3>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top:16px;"
              >
                ${this.customerStep(
                  "1",
                  "We review your journey",
                  "Our booking team checks your travel requirements, vehicle suitability and availability.",
                )}

                ${this.customerStep(
                  "2",
                  "We prepare your quotation",
                  "We'll provide the relevant pricing and booking information for your requested journey.",
                )}

                ${this.customerStep(
                  "3",
                  "You confirm your booking",
                  "Your journey is confirmed once availability, pricing and final booking details have been agreed.",
                )}
              </table>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:0 32px 30px;
              "
            >
              <div
                style="
                  padding:20px;
                  border-left:
                    4px solid #c6a66b;
                  background:#fff9ec;
                  color:#715b36;
                  font-size:14px;
                  line-height:1.7;
                "
              >
                <strong
                  style="
                    display:block;
                    margin-bottom:5px;
                    color:#8a672c;
                  "
                >
                  Travelling soon?
                </strong>

                For same-day, next-day or
                time-sensitive journeys,
                call or message our team
                directly for faster
                assistance.
              </div>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:0 24px 34px;
              "
            >
              ${
                callUrl
                  ? `
                    <a
                      href="${callUrl}"
                      style="
                        display:inline-block;
                        margin:5px;
                        padding:14px 22px;
                        border-radius:28px;
                        background:#10283f;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:13px;
                        font-weight:700;
                      "
                    >
                      Call Our Team
                    </a>
                  `
                  : ""
              }

              ${
                whatsappUrl
                  ? `
                    <a
                      href="${whatsappUrl}"
                      style="
                        display:inline-block;
                        margin:5px;
                        padding:14px 22px;
                        border-radius:28px;
                        background:#c6a66b;
                        color:#10283f;
                        text-decoration:none;
                        font-size:13px;
                        font-weight:700;
                      "
                    >
                      Message on WhatsApp
                    </a>
                  `
                  : ""
              }

              <a
                href="${websiteBase}/fleet"
                style="
                  display:inline-block;
                  margin:5px;
                  padding:13px 22px;
                  border:
                    1px solid #dfe4e8;
                  border-radius:28px;
                  color:#10283f;
                  text-decoration:none;
                  font-size:13px;
                  font-weight:700;
                "
              >
                View Our Fleet
              </a>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:0 32px 32px;
              "
            >
              <div
                style="
                  padding:17px 19px;
                  border:
                    1px solid #e4e8eb;
                  border-radius:8px;
                  background:#fafbfc;
                  color:#65717c;
                  font-size:12px;
                  line-height:1.7;
                "
              >
                <strong
                  style="
                    color:#10283f;
                  "
                >
                  Please note:
                </strong>

                Submitting a quotation
                request does not confirm
                your booking, vehicle
                availability or final
                price.
              </div>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:27px 28px;
                background:#f8fafb;
                border-top:
                  1px solid #edf0f2;
              "
            >
              <a
                href="${websiteBase}/services"
                style="${this.footerLinkStyle()}"
              >
                Services
              </a>

              <span
                style="
                  padding:0 6px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/fleet"
                style="${this.footerLinkStyle()}"
              >
                Fleet
              </a>

              <span
                style="
                  padding:0 6px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/service-areas"
                style="${this.footerLinkStyle()}"
              >
                Service Areas
              </a>

              <span
                style="
                  padding:0 6px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/blog"
                style="${this.footerLinkStyle()}"
              >
                Travel Guides
              </a>

              <span
                style="
                  padding:0 6px;
                  color:#c6a66b;
                "
              >
                •
              </span>

              <a
                href="${websiteBase}/contact"
                style="${this.footerLinkStyle()}"
              >
                Contact
              </a>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:32px 28px;
                background:#0b1e2f;
                color:#9faeba;
                font-size:11px;
                line-height:1.7;
              "
            >
              <strong
                style="
                  display:block;
                  color:#ffffff;
                  font-size:17px;
                "
              >
                Private Chauffeur Melbourne
              </strong>

              ${
                settings.businessPhone
                  ? `
                    <div
                      style="
                        margin-top:10px;
                      "
                    >
                      ${this.escapeHtml(
                        settings.businessPhone,
                      )}
                    </div>
                  `
                  : ""
              }

              ${
                settings.fromEmail
                  ? `
                    <div>
                      ${this.escapeHtml(
                        settings.fromEmail,
                      )}
                    </div>
                  `
                  : ""
              }

              ${
                settings.businessAddress
                  ? `
                    <div>
                      ${this.escapeHtml(
                        settings.businessAddress,
                      )}
                    </div>
                  `
                  : ""
              }

              ${
                whatsappUrl
                  ? `
                    <div
                      style="
                        margin-top:14px;
                      "
                    >
                      <a
                        href="${whatsappUrl}"
                        style="
                          color:#c6a66b;
                          text-decoration:none;
                          font-weight:700;
                        "
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  `
                  : ""
              }

              <div
                style="
                  margin-top:18px;
                "
              >
                <a
                  href="${websiteBase}/privacy-policy"
                  style="
                    color:#9faeba;
                    text-decoration:none;
                  "
                >
                  Privacy Policy
                </a>

                <span
                  style="
                    padding:0 8px;
                  "
                >
                  |
                </span>

                <a
                  href="${websiteBase}/terms"
                  style="
                    color:#9faeba;
                    text-decoration:none;
                  "
                >
                  Terms & Conditions
                </a>
              </div>

              <p
                style="
                  max-width:500px;
                  margin:15px auto 0;
                  color:#748695;
                  font-size:10px;
                "
              >
                You received this email
                because you submitted a
                chauffeur quotation request
                through the Private Chauffeur
                Melbourne website.
              </p>

              <p
                style="
                  margin:10px 0 0;
                  color:#5f7483;
                  font-size:10px;
                "
              >
                © ${new Date().getFullYear()}
                Private Chauffeur Melbourne.
                All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  /* =======================================================
     ADMIN QUOTE TEXT
  ======================================================= */

  private buildAdminQuoteText(
    dto: QuoteMailDto,
    journeyType: string,
  ) {
    const lines = [
      "NEW CHAUFFEUR QUOTE REQUEST",
      "Private Chauffeur Melbourne",
      "",
      "CUSTOMER DETAILS",
      `Name: ${dto.fullName}`,
      `Email: ${dto.email}`,
      `Mobile: ${dto.mobile}`,
      `Service: ${dto.serviceRequired}`,
      "",
      "JOURNEY DETAILS",
      `Pick-up: ${dto.pickupLocation}`,
      `Destination: ${dto.destination}`,
      `Date: ${dto.pickupDate}`,
      `Time: ${dto.pickupTime}`,
      `Journey Type: ${journeyType}`,
      `Passengers: ${dto.passengers}`,
    ];

    if (dto.preferredVehicle) {
      lines.push(
        `Preferred Vehicle: ${dto.preferredVehicle}`,
      );
    }

    if (dto.luggageRequirements) {
      lines.push(
        `Luggage: ${dto.luggageRequirements}`,
      );
    }

    if (dto.flightNumber) {
      lines.push(
        `Flight Number: ${dto.flightNumber}`,
      );
    }

    if (
      dto.additionalRequirements
    ) {
      lines.push(
        "",
        "ADDITIONAL REQUIREMENTS",
        dto.additionalRequirements,
      );
    }

    lines.push(
      "",
      "ACTION REQUIRED",
      "Please review availability and contact the customer.",
    );

    return lines.join("\n");
  }

  /* =======================================================
     CUSTOMER QUOTE TEXT
  ======================================================= */

  private buildCustomerQuoteText(
    dto: QuoteMailDto,
    journeyType: string,
    settings: any,
  ) {
    const lines = [
      "PRIVATE CHAUFFEUR MELBOURNE",
      "",
      `Hi ${dto.fullName},`,
      "",
      "Thank you for contacting Private Chauffeur Melbourne.",
      "",
      "We have received your chauffeur enquiry. Our booking team will review your journey, vehicle requirements, availability and pricing.",
      "",
      "YOUR JOURNEY",
      `${dto.pickupLocation} → ${dto.destination}`,
      "",
      `Date: ${dto.pickupDate}`,
      `Time: ${dto.pickupTime}`,
      `Journey Type: ${journeyType}`,
      `Passengers: ${dto.passengers}`,
      `Service: ${dto.serviceRequired}`,
    ];

    if (dto.preferredVehicle) {
      lines.push(
        `Preferred Vehicle: ${dto.preferredVehicle}`,
      );
    }

    if (dto.flightNumber) {
      lines.push(
        `Flight Number: ${dto.flightNumber}`,
      );
    }

    lines.push(
      "",
      "WHAT HAPPENS NEXT?",
      "1. We review your journey and availability.",
      "2. We prepare the relevant quotation and booking information.",
      "3. Your booking is confirmed once availability, pricing and final details have been agreed.",
      "",
      "TRAVELLING SOON?",
      "For same-day, next-day or time-sensitive journeys, call or message our team directly for faster assistance.",
      "",
      "Please note: submitting a quotation request does not confirm your booking, vehicle availability or final price.",
    );

    if (settings.businessPhone) {
      lines.push(
        "",
        `Phone: ${settings.businessPhone}`,
      );
    }

    if (settings.whatsappNumber) {
      lines.push(
        `WhatsApp: ${settings.whatsappNumber}`,
      );
    }

    if (settings.fromEmail) {
      lines.push(
        `Email: ${settings.fromEmail}`,
      );
    }

    if (settings.websiteUrl) {
      lines.push(
        `Website: ${settings.websiteUrl}`,
      );
    }

    lines.push(
      "",
      "Private Chauffeur Melbourne",
    );

    return lines.join("\n");
  }

  /* =======================================================
     ADMIN WHATSAPP TEMPLATE
  ======================================================= */

  private buildAdminWhatsAppMessage(
    dto: QuoteMailDto,
    journeyType: string,
  ) {
    const lines = [
      "🚘 *NEW CHAUFFEUR ENQUIRY*",
      "",
      "👤 *CUSTOMER*",
      `Name: ${dto.fullName}`,
      `Mobile: ${dto.mobile}`,
      `Email: ${dto.email}`,
      "",
      "📍 *JOURNEY*",
      dto.pickupLocation,
      "↓",
      dto.destination,
      "",
      `📅 Date: ${dto.pickupDate}`,
      `🕐 Time: ${dto.pickupTime}`,
      `↔️ Trip: ${journeyType}`,
      `👥 Passengers: ${dto.passengers}`,
      "",
      `🚘 Service: ${dto.serviceRequired}`,
    ];

    if (dto.preferredVehicle) {
      lines.push(
        `🚙 Vehicle: ${dto.preferredVehicle}`,
      );
    }

    if (
      dto.luggageRequirements
    ) {
      lines.push(
        `🧳 Luggage: ${dto.luggageRequirements}`,
      );
    }

    if (dto.flightNumber) {
      lines.push(
        `✈️ Flight: ${dto.flightNumber}`,
      );
    }

    if (
      dto.additionalRequirements
    ) {
      lines.push(
        "",
        "📝 *SPECIAL REQUIREMENTS*",
        dto.additionalRequirements,
      );
    }

    lines.push(
      "",
      "⚡ *ACTION REQUIRED*",
      "Please review availability and contact the customer.",
      "",
      "🌐 Private Chauffeur Melbourne Website Lead",
    );

    return lines.join("\n");
  }

  /* =======================================================
     EMAIL SECTION TITLE
  ======================================================= */

  private emailSectionTitle(
    title: string,
  ) {
    return `
      <div
        style="
          color:#9e7d43;
          font-size:11px;
          font-weight:700;
          letter-spacing:1.5px;
          text-transform:uppercase;
        "
      >
        ${this.escapeHtml(
          title,
        )}
      </div>
    `;
  }

  /* =======================================================
     EMAIL INFORMATION TABLE
  ======================================================= */

  private emailInfoTable(
    rows: Array<
      [
        string,
        string | undefined,
      ]
    >,
  ) {
    const validRows =
      rows.filter(
        ([, value]) =>
          Boolean(
            value?.trim(),
          ),
      );

    return `
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          margin-top:12px;
          border-collapse:collapse;
        "
      >
        ${validRows
          .map(
            ([label, value]) => `
              <tr>
                <td
                  width="38%"
                  valign="top"
                  style="
                    width:38%;
                    padding:11px 8px;
                    border-bottom:
                      1px solid #edf0f2;
                    color:#65717c;
                    font-size:12px;
                    font-weight:700;
                    line-height:1.5;
                  "
                >
                  ${this.escapeHtml(
                    label,
                  )}
                </td>

                <td
                  valign="top"
                  style="
                    padding:11px 8px;
                    border-bottom:
                      1px solid #edf0f2;
                    color:#17212b;
                    font-size:13px;
                    line-height:1.55;
                  "
                >
                  ${this.escapeHtml(
                    value || "",
                  )}
                </td>
              </tr>
            `,
          )
          .join("")}
      </table>
    `;
  }

  /* =======================================================
     CUSTOMER STEP
  ======================================================= */

  private customerStep(
    number: string,
    title: string,
    description: string,
  ) {
    return `
      <tr>
        <td
          width="44"
          valign="top"
          style="
            padding:8px 0;
          "
        >
          <div
            style="
              width:30px;
              height:30px;
              border-radius:50%;
              background:#f5eddb;
              color:#9e7d43;
              text-align:center;
              font-size:12px;
              font-weight:700;
              line-height:30px;
            "
          >
            ${this.escapeHtml(
              number,
            )}
          </div>
        </td>

        <td
          valign="top"
          style="
            padding:8px 0;
          "
        >
          <strong
            style="
              display:block;
              color:#10283f;
              font-size:13px;
              line-height:1.5;
            "
          >
            ${this.escapeHtml(
              title,
            )}
          </strong>

          <span
            style="
              display:block;
              margin-top:4px;
              color:#65717c;
              font-size:12px;
              line-height:1.65;
            "
          >
            ${this.escapeHtml(
              description,
            )}
          </span>
        </td>
      </tr>
    `;
  }

  /* =======================================================
     FOOTER LINK STYLE
  ======================================================= */

  private footerLinkStyle() {
    return `
      color:#10283f;
      font-size:12px;
      font-weight:700;
      text-decoration:none;
    `;
  }

  /* =======================================================
     NORMALISE WHATSAPP NUMBER
  ======================================================= */

  private normaliseWhatsappNumber(
    value?: string | null,
  ) {
    if (!value) {
      return "";
    }

    let number =
      value.replace(
        /\D/g,
        "",
      );

    if (
      number.startsWith("04")
    ) {
      number =
        `61${number.substring(
          1,
        )}`;
    }

    return number;
  }

  /* =======================================================
     ESCAPE HTML
  ======================================================= */

  private escapeHtml(
    value: string,
  ) {
    return value
      .replace(
        /&/g,
        "&amp;",
      )
      .replace(
        /</g,
        "&lt;",
      )
      .replace(
        />/g,
        "&gt;",
      )
      .replace(
        /"/g,
        "&quot;",
      )
      .replace(
        /'/g,
        "&#039;",
      );
  }
}