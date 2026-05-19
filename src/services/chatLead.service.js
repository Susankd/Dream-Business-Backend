const OpenAI = require('openai');
const { ChatLead, ChatHistory } = require('../models');
const { emailService } = require('.');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a smart business development assistant for Dream Business Pvt. Ltd., a leading financial consulting firm based in Kathmandu, Nepal, founded in 2018 by CA. Suraj Kumar Dhakal.

COMPANY INFO:
- Location: CTC Mall, 5th Floor, Kathmandu, Nepal
- Office Hours: Sunday–Friday, 10:00 AM – 5:00 PM Nepal Time
- Phone: +977-9802342602
- Website: dreambusiness.com.np
- 200+ successful client stories since 2018

OUR SERVICES:
1. Fractional CFO Services — Part-time CFO support: financial modeling, cash flow management, investor relations, budget & performance analysis
2. Strategic Business Advisory — Market & competitive analysis, business model design, cost optimization, strategic roadmap
3. Capital Raising & Investment Consulting — Fundraising strategy, pitch deck preparation, investor connections (Angel/VC/PE), deal structuring
4. Project Financing & Bank Loan Advisory — Feasibility studies, project reports, bank negotiations, government subsidies & credit facilities
5. Public Listing & IPO Readiness Consulting — IPO readiness assessment, SEBON compliance, merchant banker coordination, company valuation
6. Business Valuations & Due Diligence — Independent valuations, M&A reports, financial/legal/operational due diligence
7. Corporate Tax, Legal & Foreign Investment Consulting — Tax planning & compliance, FDI advisory, company registration, cross-border legal compliance
8. IT Services (for tech companies) — Outsourced CFO, payroll & compliance, ESOPs & sweat equity, company/branch/FDI registration, tax returns

INDUSTRIES SERVED: IT, Hotel & Tourism, Real Estate, IT-Enabled Services, Hydropower, Manufacturing

YOUR ROLE:
Help potential clients identify which service fits their needs and collect their information for a consultation. Be warm, smart, and conversational.

LANGUAGE DETECTION:
- English messages → respond in English
- Nepali messages → respond in formal Nepali (तपाईं form)
- If ambiguous → ask: "Would you like to continue in English or Nepali? / के तपाईं नेपाली वा अंग्रेजीमा कुरा गर्न चाहनुहुन्छ?"

CONVERSATION FLOW:
1. Warm 1-sentence greeting
2. Ask open question about their business situation
3. Identify the relevant service — ask 1-2 clarifying questions if needed
4. Collect naturally (one at a time, not as a form): full name, phone number, email
5. Ask preferred appointment date and time (Sunday–Friday, 10 AM–5 PM NPT)
6. Once you have name + phone + service + appointment date + time → call save_lead immediately
7. After saving, confirm the team will contact them within 1 business day

RULES:
- Max 2-3 sentences per message
- Ask only ONE question per message
- Never ask for info you already have
- Never be pushy or salesy
- Pricing: "Starting from Rs. 4,000+. I recommend a free discovery call first."
- Unknown questions: "Our expert team will address that in your consultation."
- After save_lead is called: warmly confirm and close — no more questions`;

const SAVE_LEAD_TOOL = {
  type: 'function',
  function: {
    name: 'save_lead',
    description:
      'Save client information to database. Call this when you have: name, phone, service of interest, preferred appointment date and time.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name' },
        email: { type: 'string', description: 'Email address' },
        phone: { type: 'string', description: 'Phone number' },
        service: { type: 'string', description: 'Service they are interested in' },
        industry: { type: 'string', description: 'Their business industry' },
        appointmentDate: { type: 'string', description: 'Preferred date YYYY-MM-DD' },
        appointmentTime: { type: 'string', description: 'Preferred time HH:MM 24-hour' },
        language: { type: 'string', enum: ['english', 'nepali'] },
        notes: { type: 'string', description: 'Brief notes about client needs' },
      },
      required: ['name', 'phone', 'service'],
    },
  },
};

const sendMessage = async (sessionId, userMessage) => {
  let lead = sessionId ? await ChatLead.findOne({ sessionId }) : null;
  if (!lead) {
    const newSessionId = sessionId || crypto.randomUUID();
    lead = await ChatLead.create({ sessionId: newSessionId, conversation: [] });
  }

  lead.conversation.push({ role: 'user', content: userMessage, timestamp: new Date() });
  await ChatHistory.create({ leadId: lead._id, role: 'user', content: userMessage });

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...lead.conversation.map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    tools: [SAVE_LEAD_TOOL],
    tool_choice: 'auto',
    max_tokens: 500,
  });

  const choice = response.choices[0];
  let assistantContent = choice.message.content;
  let leadSaved = false;

  if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls?.length) {
    const toolCall = choice.message.tool_calls[0];
    if (toolCall.function.name === 'save_lead') {
      const data = JSON.parse(toolCall.function.arguments);

      await ChatLead.findOneAndUpdate(
        { sessionId: lead.sessionId },
        {
          $set: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            industry: data.industry,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            language: data.language || 'english',
            notes: data.notes,
          },
        }
      );
      leadSaved = true;

      try {
        const adminEmails = process.env.ADMIN_EMAIL
          ? process.env.ADMIN_EMAIL.split(',').map((e) => e.trim())
          : [];
        const emailHtml = `
          <h2>New Chat Lead from Website</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
          <p><strong>Appointment:</strong> ${data.appointmentDate || 'TBD'} at ${data.appointmentTime || 'TBD'}</p>
          <p><strong>Notes:</strong> ${data.notes || 'None'}</p>
          <hr>
          <p><em>View full conversation in the admin panel.</em></p>
        `;
        for (const to of adminEmails) {
          await emailService.sendBookingNotificationEmail(to, `New Chat Lead: ${data.name}`, emailHtml);
        }
      } catch (err) {
        console.error('Chat lead email error:', err.message);
      }

      const finalMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(1),
        choice.message,
        { role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ success: true }) },
      ];
      const finalResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: finalMessages,
        max_tokens: 300,
      });
      assistantContent = finalResponse.choices[0].message.content;
    }
  }

  lead.conversation.push({ role: 'assistant', content: assistantContent, timestamp: new Date() });
  await ChatHistory.create({ leadId: lead._id, role: 'assistant', content: assistantContent });
  await lead.save();

  return { message: assistantContent, sessionId: lead.sessionId, leadSaved };
};

const getAllLeads = async (filter, options) => ChatLead.paginate(filter, options);

const getLeadById = async (id) => ChatLead.findById(id);

const getLeadHistory = async (leadId) => {
  const docs = await ChatHistory.find({ leadId }).sort({ createdAt: 1 }).lean();
  return docs.map((d) => ({ ...d, id: d._id.toString() }));
};

const getAllConversations = async () => {
  const leads = await ChatLead.find({})
    .select('sessionId name phone email service status language createdAt updatedAt')
    .sort({ updatedAt: -1 })
    .lean();

  const leadsWithLastMsg = await Promise.all(
    leads.map(async (lead) => {
      const lastMsg = await ChatHistory.findOne({ leadId: lead._id })
        .sort({ createdAt: -1 })
        .lean();
      const count = await ChatHistory.countDocuments({ leadId: lead._id });
      return {
        ...lead,
        id: lead._id.toString(),
        lastMessage: lastMsg ? { ...lastMsg, id: lastMsg._id.toString() } : null,
        messageCount: count,
      };
    })
  );

  return leadsWithLastMsg;
};

const updateLeadStatus = async (id, status) =>
  ChatLead.findByIdAndUpdate(id, { $set: { status } }, { new: true });

module.exports = {
  sendMessage,
  getAllLeads,
  getLeadById,
  getLeadHistory,
  getAllConversations,
  updateLeadStatus,
};
