const { EmailClient, EmailCampaign } = require('../models');
const { emailService } = require('.');

// ─── HTML Email Templates ─────────────────────────────────────────────────────

const LOGO_URL = 'https://www.dreambusiness.com.np/assets/logo-db-CvSpjC0G.png';
const PRIMARY = '#441b98';
const PRIMARY_DARK = '#2e1166';
const GOLD = '#d4a017';
const GOLD_LIGHT = '#f5d06a';

const buildBusinessRegistrationTemplate = ({ ownerName, businessName } = {}) => {
  const greeting = ownerName ? `Dear ${ownerName},` : 'Dear Valued Client,';
  const businessLine = businessName
    ? `We are delighted to assist <strong>${businessName}</strong> in its journey toward formal business registration.`
    : 'We are delighted to assist your business in its journey toward formal business registration.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Business Registration Services – Dream Business Pvt. Ltd.</title>
</head>
<body style="margin:0;padding:0;background-color:#f0edf7;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0edf7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(68,27,152,0.12);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,${PRIMARY_DARK} 0%,${PRIMARY} 100%);padding:48px 40px 36px;text-align:center;">
              <img src="${LOGO_URL}" width="180" alt="Dream Business" style="display:block;margin:0 auto 24px;max-width:180px;" />
              <div style="width:50px;height:3px;background:${GOLD};margin:0 auto 20px;border-radius:2px;"></div>
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px;letter-spacing:0.3px;">
                Business Registration Services
              </h1>
              <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0;">
                Your trusted financial consulting partner in Nepal
              </p>
            </td>
          </tr>

          <!-- ── GOLD STRIP ── -->
          <tr>
            <td style="background:linear-gradient(90deg,${GOLD} 0%,${GOLD_LIGHT} 50%,${GOLD} 100%);height:4px;"></td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:44px 40px 36px;">

              <p style="color:#1a1a2e;font-size:16px;line-height:1.7;margin:0 0 20px;">
                ${greeting}
              </p>
              <p style="color:#333350;font-size:15px;line-height:1.8;margin:0 0 24px;">
                ${businessLine} At <strong style="color:${PRIMARY};">Dream Business Pvt. Ltd.</strong>,
                we specialize in making your business registration seamless, compliant, and efficient —
                so you can focus on growing your vision.
              </p>

              <!-- ── SERVICE HIGHLIGHTS BOX ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:linear-gradient(135deg,#f8f5ff,#fdf9ec);border-radius:12px;border-left:4px solid ${GOLD};margin:0 0 32px;">
                <tr>
                  <td style="padding:28px 28px 20px;">
                    <p style="color:${PRIMARY};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px;">
                      What We Offer
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${[
                        ['🏢', 'Company & Branch Registration', 'Private Ltd., Public Ltd., Partnership, and FDI companies'],
                        ['📋', 'Legal Compliance & Documentation', 'PAN/VAT registration, MOA, AOA, and all regulatory filings'],
                        ['🌐', 'Foreign Direct Investment (FDI)', 'End-to-end FDI advisory and registration support'],
                        ['💼', 'Post-Registration Support', 'Ongoing compliance, renewals, and business advisory'],
                      ].map(([icon, title, desc]) => `
                      <tr>
                        <td style="padding:0 0 14px;vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:20px;padding-right:14px;vertical-align:top;">${icon}</td>
                              <td>
                                <p style="color:#1a1a2e;font-size:14px;font-weight:700;margin:0 0 3px;">${title}</p>
                                <p style="color:#666680;font-size:13px;margin:0;line-height:1.5;">${desc}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── WHY CHOOSE US ── -->
              <p style="color:#1a1a2e;font-size:15px;font-weight:700;margin:0 0 16px;">
                Why Choose Dream Business?
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
                ${[
                  ['200+', 'Successful registrations since 2018'],
                  ['CA-Led', 'Expert team led by CA. Suraj Kumar Dhakal'],
                  ['End-to-End', 'From registration to ongoing compliance'],
                  ['Fast Track', 'Efficient processing with minimal delays'],
                ].map(([stat, label]) => `
                <tr>
                  <td style="padding:0 0 12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:10px;height:10px;background:${GOLD};border-radius:50%;vertical-align:middle;padding-right:12px;"></td>
                        <td style="font-size:14px;color:#333350;vertical-align:middle;">
                          <strong style="color:${PRIMARY};">${stat}</strong> — ${label}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- ── CTA ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:linear-gradient(135deg,${PRIMARY_DARK},${PRIMARY});border-radius:12px;margin:0 0 32px;">
                <tr>
                  <td style="padding:32px;text-align:center;">
                    <p style="color:#ffffff;font-size:16px;font-weight:600;margin:0 0 20px;line-height:1.5;">
                      Ready to register your business?<br/>
                      <span style="font-weight:400;font-size:14px;opacity:0.85;">
                        Book a free consultation with our experts today.
                      </span>
                    </p>
                    <a href="https://www.dreambusiness.com.np?service=Business+Registration"
                       style="display:inline-block;background:${GOLD};color:#1a1a2e;font-size:15px;font-weight:700;
                              padding:14px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
                      Book Free Consultation →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#666680;font-size:13px;line-height:1.7;margin:0;">
                If you have any questions, feel free to reach us at
                <a href="mailto:support@dreambusiness.com.np" style="color:${PRIMARY};text-decoration:none;">
                  support@dreambusiness.com.np
                </a> or call us at
                <strong style="color:#1a1a2e;">+977-9802342602</strong>.
              </p>

            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#ece8f5;"></div>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,${PRIMARY_DARK},${PRIMARY});padding:32px 40px;text-align:center;">
              <img src="${LOGO_URL}" width="120" alt="Dream Business" style="display:block;margin:0 auto 16px;opacity:0.9;" />
              <p style="color:rgba(255,255,255,0.9);font-size:13px;margin:0 0 8px;font-weight:600;">
                Dream Business Pvt. Ltd.
              </p>
              <p style="color:rgba(255,255,255,0.65);font-size:12px;margin:0 0 16px;line-height:1.7;">
                CTC Mall, 5th Floor, Kathmandu, Nepal<br/>
                Sun–Fri: 10:00 AM – 5:00 PM NPT
              </p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://www.dreambusiness.com.np" style="color:${GOLD_LIGHT};font-size:12px;text-decoration:none;">Website</a>
                  </td>
                  <td style="color:rgba(255,255,255,0.3);font-size:12px;">|</td>
                  <td style="padding:0 8px;">
                    <a href="mailto:support@dreambusiness.com.np" style="color:${GOLD_LIGHT};font-size:12px;text-decoration:none;">Email</a>
                  </td>
                  <td style="color:rgba(255,255,255,0.3);font-size:12px;">|</td>
                  <td style="padding:0 8px;">
                    <a href="tel:+9779802342602" style="color:${GOLD_LIGHT};font-size:12px;text-decoration:none;">+977-9802342602</a>
                  </td>
                </tr>
              </table>
              <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">
                © ${new Date().getFullYear()} Dream Business Pvt. Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
};

const TEMPLATES = {
  business_registration: {
    label: 'Business Registration',
    subject: 'Register Your Business with Dream Business Pvt. Ltd.',
    build: buildBusinessRegistrationTemplate,
  },
};

// ─── Service Functions ────────────────────────────────────────────────────────

const createClient = async (body) => EmailClient.create(body);

const getAllClients = async (filter, options) => EmailClient.paginate(filter, options);

const getClientsByCategory = async (category) =>
  EmailClient.find({ businessCategory: category, status: 'active' }).lean();

const getClientById = async (id) => EmailClient.findById(id);

const updateClient = async (id, body) =>
  EmailClient.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });

const deleteClient = async (id) => EmailClient.findByIdAndDelete(id);

const sendCampaign = async ({ recipients, template, customSubject }) => {
  const tmpl = TEMPLATES[template];
  if (!tmpl) throw new Error(`Unknown template: ${template}`);

  const clients = await EmailClient.find({ email: { $in: recipients }, status: 'active' }).lean();
  const clientMap = Object.fromEntries(clients.map((c) => [c.email, c]));

  let sentCount = 0;
  let failedCount = 0;

  for (const email of recipients) {
    const client = clientMap[email];
    const html = tmpl.build({
      ownerName: client?.ownerName,
      businessName: client?.businessName,
    });
    const subject = customSubject || tmpl.subject;
    try {
      await emailService.sendBookingNotificationEmail(email, subject, html);
      sentCount++;
    } catch (err) {
      console.error(`Failed to send to ${email}:`, err.message);
      failedCount++;
    }
  }

  const campaign = await EmailCampaign.create({
    subject: customSubject || tmpl.subject,
    template,
    recipients,
    sentCount,
    failedCount,
    status: failedCount === 0 ? 'sent' : sentCount === 0 ? 'failed' : 'partial',
  });

  return { sentCount, failedCount, campaignId: campaign._id };
};

const getCampaigns = async (options) => EmailCampaign.paginate({}, options);

module.exports = {
  createClient,
  getAllClients,
  getClientsByCategory,
  getClientById,
  updateClient,
  deleteClient,
  sendCampaign,
  getCampaigns,
  TEMPLATES,
};
