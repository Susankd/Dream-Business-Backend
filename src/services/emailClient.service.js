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
            <td style="background:linear-gradient(135deg,${PRIMARY_DARK} 0%,${PRIMARY} 100%);padding:28px 40px 28px;text-align:center;">
              <img src="${LOGO_URL}" width="110" alt="Dream Business" style="display:block;margin:0 auto 14px;max-width:110px;" />
              <div style="width:40px;height:2px;background:${GOLD};margin:0 auto 12px;border-radius:2px;"></div>
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

const buildItIndustryTemplate = ({ ownerName, businessName } = {}) => {
  const greeting = ownerName ? `Dear ${ownerName},` : 'Dear Valued Client,';
  const businessLine = businessName
    ? `We are reaching out to <strong>${businessName}</strong> with a suite of specialized financial and business solutions built exclusively for the IT industry.`
    : 'We are reaching out with a suite of specialized financial and business solutions built exclusively for the IT industry.';

  const services = [
    {
      icon: '🏢',
      title: 'Company / Branch / FDI Registration',
      desc: 'Seamless registration and setup for IT companies, branch offices, and FDI ventures — full regulatory compliance guaranteed.',
    },
    {
      icon: '💼',
      title: 'Payroll & Compliance Management',
      desc: 'Efficient payroll systems, salary structuring, and statutory compliance that save time and eliminate errors.',
    },
    {
      icon: '⚖️',
      title: 'Tax, Financial & Legal Consulting',
      desc: 'End-to-end corporate tax planning, financial structuring, and legal frameworks tailored for IT firms.',
    },
    {
      icon: '📊',
      title: 'Accounting & Outsourcing Solutions',
      desc: 'Full accounting support — bookkeeping, reporting, and outsourced finance departments for growing IT businesses.',
    },
    {
      icon: '📋',
      title: 'Personal & Corporate Tax Returns',
      desc: 'Timely and accurate filing that minimizes risks and maximizes tax efficiency for both companies and founders.',
    },
    {
      icon: '🎯',
      title: 'ESOPs & Sweat Equity Structuring',
      desc: 'Design and manage Employee Stock Option Plans and sweat equity frameworks to attract and retain top IT talent.',
    },
    {
      icon: '📈',
      title: 'Outsourced CFO Services',
      desc: 'Strategic financial leadership on demand — budgeting, fundraising, and investor reporting without full-time cost.',
    },
    {
      icon: '💰',
      title: 'Personal Wealth Management',
      desc: 'Helping IT founders and professionals grow and safeguard personal wealth with tailored investment and tax strategies.',
    },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>IT Industry Solutions – Dream Business Pvt. Ltd.</title>
</head>
<body style="margin:0;padding:0;background-color:#f0edf7;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0edf7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(68,27,152,0.12);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,${PRIMARY_DARK} 0%,${PRIMARY} 100%);padding:28px 40px 28px;text-align:center;">
              <img src="${LOGO_URL}" width="110" alt="Dream Business" style="display:block;margin:0 auto 14px;max-width:110px;" />
              <div style="width:40px;height:2px;background:${GOLD};margin:0 auto 12px;border-radius:2px;"></div>
              <p style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">IT Industry</p>
              <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0 0 10px;line-height:1.3;">
                Comprehensive Business &amp;<br/>Financial Solutions
              </h1>
              <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0;line-height:1.6;">
                Helping IT startups, software companies, and global tech ventures<br/>
                scale with ease through end-to-end registration, compliance,<br/>and financial management.
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

              <p style="color:#1a1a2e;font-size:16px;line-height:1.7;margin:0 0 12px;">
                ${greeting}
              </p>
              <p style="color:#333350;font-size:15px;line-height:1.8;margin:0 0 10px;">
                ${businessLine}
              </p>
              <p style="color:#333350;font-size:15px;line-height:1.8;margin:0 0 32px;">
                The IT industry requires <strong style="color:${PRIMARY};">speed and precision</strong> to compete globally.
                Our team of Chartered Accountants and business experts offers specialized solutions
                to address these unique needs — ensuring your business stays compliant, efficient, and ready for growth.
              </p>

              <!-- ── SERVICES HEADING ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;">
                <tr>
                  <td style="padding:0 0 4px;">
                    <p style="color:${PRIMARY};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0;">
                      Our IT Industry Services
                    </p>
                    <p style="color:#666680;font-size:13px;margin:4px 0 0;line-height:1.5;">
                      A complete suite designed to handle the complexities of the IT sector —
                      so you can focus on innovation.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Gold underline -->
              <div style="width:40px;height:2px;background:${GOLD};border-radius:2px;margin:12px 0 24px;"></div>

              <!-- ── SERVICES GRID (2 columns) ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px;">
                ${services.reduce((rows, svc, i) => {
                  if (i % 2 === 0) {
                    const next = services[i + 1];
                    rows.push(`
                  <tr>
                    <td style="padding:0 6px 12px 0;width:50%;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%"
                        style="background:#f8f5ff;border-radius:10px;border-top:3px solid ${PRIMARY};">
                        <tr>
                          <td style="padding:18px 16px;">
                            <p style="font-size:22px;margin:0 0 8px;">${svc.icon}</p>
                            <p style="color:#1a1a2e;font-size:13px;font-weight:700;margin:0 0 6px;line-height:1.4;">${svc.title}</p>
                            <p style="color:#666680;font-size:12px;margin:0;line-height:1.6;">${svc.desc}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    ${next ? `
                    <td style="padding:0 0 12px 6px;width:50%;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%"
                        style="background:#f8f5ff;border-radius:10px;border-top:3px solid ${GOLD};">
                        <tr>
                          <td style="padding:18px 16px;">
                            <p style="font-size:22px;margin:0 0 8px;">${next.icon}</p>
                            <p style="color:#1a1a2e;font-size:13px;font-weight:700;margin:0 0 6px;line-height:1.4;">${next.title}</p>
                            <p style="color:#666680;font-size:12px;margin:0;line-height:1.6;">${next.desc}</p>
                          </td>
                        </tr>
                      </table>
                    </td>` : '<td style="width:50%;"></td>'}
                  </tr>`);
                  }
                  return rows;
                }, []).join('')}
              </table>

              <!-- ── WHY US STRIP ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:linear-gradient(135deg,#fdf9ec,#f8f5ff);border-radius:12px;border-left:4px solid ${GOLD};margin:0 0 32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="color:${PRIMARY};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 14px;">
                      Why Partner With Us?
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${[
                        'Specialized expertise in IT industry dynamics',
                        'Integrated legal, tax, and financial services under one roof',
                        'Cost-effective outsourced solutions — pay for what you need',
                        'Proven experience with startups and global tech ventures',
                        'CA-led team with 200+ success stories since 2018',
                      ].map(point => `
                      <tr>
                        <td style="padding:0 0 8px;vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-right:10px;vertical-align:middle;">
                                <div style="width:7px;height:7px;background:${GOLD};border-radius:50%;"></div>
                              </td>
                              <td style="color:#333350;font-size:13px;line-height:1.5;">${point}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── CTA ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:linear-gradient(135deg,${PRIMARY_DARK},${PRIMARY});border-radius:12px;margin:0 0 32px;">
                <tr>
                  <td style="padding:36px 40px;text-align:center;">
                    <p style="color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px;">
                      Simplify Your Business &amp; Financial Journey
                    </p>
                    <p style="color:#ffffff;font-size:18px;font-weight:700;margin:0 0 6px;line-height:1.4;">
                      Whether you're building a startup or<br/>managing a multinational IT operation
                    </p>
                    <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 28px;line-height:1.6;">
                      We're here to provide expert support for every stage of your growth.
                    </p>
                    <a href="https://www.dreambusiness.com.np?service=IT+Services"
                       style="display:inline-block;background:${GOLD};color:#1a1a2e;font-size:16px;font-weight:700;
                              padding:16px 44px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
                      Book Consultation →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#666680;font-size:13px;line-height:1.7;margin:0;">
                Have questions? Reach us at
                <a href="mailto:support@dreambusiness.com.np" style="color:${PRIMARY};text-decoration:none;">
                  support@dreambusiness.com.np
                </a> or call
                <strong style="color:#1a1a2e;">+977-9802342602</strong>.
                Office hours: Sunday–Friday, 10 AM – 5 PM NPT.
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
  it_industry: {
    label: 'IT Industry Solutions',
    subject: 'Comprehensive Business & Financial Solutions for Your IT Company',
    build: buildItIndustryTemplate,
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

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 60 * 1000; // 1 minute between batches

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};

const processCampaignInBackground = async (campaignId, recipients, tmpl, subject, clientMap) => {
  const batches = chunk(recipients, BATCH_SIZE);

  for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
    if (batchIdx > 0) {
      await sleep(BATCH_DELAY_MS);
    }

    const batch = batches[batchIdx];

    for (const email of batch) {
      const client = clientMap[email];
      const html = tmpl.build({
        ownerName: client?.ownerName,
        businessName: client?.businessName,
      });

      let resultEntry;
      try {
        await emailService.sendBookingNotificationEmail(email, subject, html);
        resultEntry = { email, status: 'sent' };
      } catch (err) {
        const reason = err?.response?.body?.message || err?.message || 'Unknown error';
        console.error(`[Campaign ${campaignId}] Failed → ${email}: ${reason}`);
        resultEntry = { email, status: 'failed', failReason: reason };
      }

      await EmailCampaign.findByIdAndUpdate(campaignId, {
        $push: { recipientResults: resultEntry },
        $inc: {
          sentCount: resultEntry.status === 'sent' ? 1 : 0,
          failedCount: resultEntry.status === 'failed' ? 1 : 0,
        },
      });
    }
  }

  // Mark campaign as final status once all batches done
  const campaign = await EmailCampaign.findById(campaignId);
  const finalStatus =
    campaign.failedCount === 0 ? 'sent' :
    campaign.sentCount === 0 ? 'failed' : 'partial';

  await EmailCampaign.findByIdAndUpdate(campaignId, { $set: { status: finalStatus } });
  console.log(`[Campaign ${campaignId}] Complete — ${campaign.sentCount} sent, ${campaign.failedCount} failed`);
};

const sendCampaign = async ({ recipients, template, customSubject }) => {
  const tmpl = TEMPLATES[template];
  if (!tmpl) throw new Error(`Unknown template: ${template}`);

  const subject = customSubject || tmpl.subject;
  const clients = await EmailClient.find({ email: { $in: recipients } }).lean();
  const clientMap = Object.fromEntries(clients.map((c) => [c.email, c]));

  const campaign = await EmailCampaign.create({
    subject,
    template,
    recipients,
    sentCount: 0,
    failedCount: 0,
    status: 'processing',
    batchSize: BATCH_SIZE,
    batchDelayMinutes: BATCH_DELAY_MS / 60000,
  });

  // Fire and forget — do not await
  processCampaignInBackground(campaign._id, recipients, tmpl, subject, clientMap).catch((err) =>
    console.error(`[Campaign ${campaign._id}] Background error:`, err.message)
  );

  return {
    campaignId: campaign._id,
    status: 'processing',
    totalRecipients: recipients.length,
    batches: chunk(recipients, BATCH_SIZE).length,
    batchSize: BATCH_SIZE,
    estimatedMinutes: Math.ceil(recipients.length / BATCH_SIZE),
  };
};

const getCampaigns = async (options) => EmailCampaign.paginate({}, options);

const getCampaignById = async (id) => EmailCampaign.findById(id);

module.exports = {
  createClient,
  getAllClients,
  getClientsByCategory,
  getClientById,
  updateClient,
  deleteClient,
  sendCampaign,
  getCampaigns,
  getCampaignById,
  TEMPLATES,
};
