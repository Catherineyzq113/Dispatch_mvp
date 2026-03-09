import type { FeedEntry, ActionType, StatusType } from '@/types';

export const initialFeedData: FeedEntry[] = [
  {
    id: 'feed-001',
    agentName: 'Agent Aria',
    actionType: 'Appointment Booked',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    customerName: 'Maria Chen',
    unitId: 'SLD-4820',
    doorModel: 'ASE 67 Sliding Door',
    summary: 'Preventive seal inspection booked for Wednesday 9am. Pre-rain maintenance.',
    outcome: 'success',
    outcomeLabel: 'Booked',
    confidence: 91,
    revenue: 285,
    triggerContext: {
      sensorReading: 'Moisture 340% above baseline',
      weatherCondition: '48mm rainfall forecast (Thu-Fri)',
      sealAge: '3.2 years (replacement at 4yr avg)',
      riskScore: 78,
      riskLevel: 'High',
      decision: 'Proactive outreach recommended',
    },
    conversation: [
      {
        id: 'msg-001',
        sender: 'agent',
        content: "Hi Maria, this is ProSlide Door Services. Our monitoring system detected a moisture issue on your sliding door (unit installed 2021). With heavy rain expected Thursday, we recommend a preventive seal inspection. Would Wednesday or Thursday morning work?",
        timestamp: '10:42 AM',
      },
      {
        id: 'msg-002',
        sender: 'customer',
        content: "Wednesday works. How much does the inspection cost?",
        timestamp: '10:44 AM',
      },
      {
        id: 'msg-003',
        sender: 'agent',
        content: "The inspection is $285 including parts if a seal replacement is needed. Your unit is still within the extended warranty period so parts are covered. I have 9am or 11am available Wednesday.",
        timestamp: '10:44 AM',
      },
      {
        id: 'msg-004',
        sender: 'customer',
        content: "9am please",
        timestamp: '10:45 AM',
      },
      {
        id: 'msg-005',
        sender: 'agent',
        content: "Confirmed for Wednesday 9am. Please clear 2ft of space near the door track. You'll receive a reminder tomorrow. Thank you Maria!",
        timestamp: '10:45 AM',
      },
    ],
  },
  {
    id: 'feed-002',
    agentName: 'Agent Nova',
    actionType: 'Proactive Outreach',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago - LIVE
    customerName: 'David Martinez',
    unitId: 'SLD-2903',
    doorModel: 'ASE 67 Sliding Door',
    summary: 'High moisture detected with incoming storm. Live conversation in progress - customer asking questions about the service.',
    outcome: 'pending',
    outcomeLabel: 'Awaiting Response',
    confidence: 82,
    triggerContext: {
      sensorReading: 'Moisture 280% above baseline',
      weatherCondition: '55mm rainfall forecasted for Thursday evening + SW winds 35km/h',
      sealAge: '2.5 years',
      riskScore: 72,
      riskLevel: 'High',
      decision: 'Immediate proactive outreach - 48hr weather window',
    },
    conversation: [
      {
        id: 'msg-live-001',
        sender: 'agent',
        content: "Hello David, this is ProSlide Door Services. Our sensors detected elevated moisture on your sliding door, and with heavy rain forecast for tonight, we'd like to schedule a quick inspection. Are you available tomorrow morning?",
        timestamp: '10:55 AM',
      },
      {
        id: 'msg-live-002',
        sender: 'customer',
        content: "What do you mean by elevated moisture? Is there a leak?",
        timestamp: '10:57 AM',
      },
      {
        id: 'msg-live-003',
        sender: 'agent',
        content: "Not a leak yet - our sensors show the seal is starting to let in more moisture than normal. It's at 280% of baseline, which means it's degrading. The good news is we can fix it before any water damage occurs. The inspection takes about 30 minutes.",
        timestamp: '10:58 AM',
      },
    ],
  },
  {
    id: 'feed-003',
    agentName: 'Agent Nova',
    actionType: 'Proactive Outreach',
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    customerName: 'Lisa Thompson',
    unitId: 'SLD-6217',
    doorModel: 'ASE 80 Lift Door',
    summary: 'Critical moisture levels detected. Immediate outreach initiated. Customer responsive, booking in progress.',
    outcome: 'pending',
    outcomeLabel: 'In Progress',
    confidence: 87,
    triggerContext: {
      sensorReading: 'Moisture 520% above baseline - CRITICAL',
      weatherCondition: 'Heavy rain incoming (62mm forecast)',
      sealAge: '4.8 years (overdue replacement)',
      riskScore: 85,
      riskLevel: 'Critical',
      decision: 'Urgent outreach - priority scheduling',
    },
    conversation: [
      {
        id: 'msg-006',
        sender: 'agent',
        content: "Hello Lisa, this is ProSlide Door Services. Our sensors are showing critical moisture levels on your sliding door unit SLD-6217. With significant rainfall forecasted, we need to schedule an urgent inspection to prevent potential water damage. Are you available for a technician visit today or tomorrow?",
        timestamp: '10:34 AM',
      },
      {
        id: 'msg-007',
        sender: 'customer',
        content: "That sounds serious. What does critical mean exactly?",
        timestamp: '10:36 AM',
      },
      {
        id: 'msg-008',
        sender: 'agent',
        content: "Critical means our sensors are detecting moisture levels more than 5 times above normal, which indicates the seal may be compromised. The good news is we've caught this early before any interior damage. We have slots at 2pm today or 9am tomorrow. Which works better?",
        timestamp: '10:37 AM',
      },
    ],
  },
  {
    id: 'feed-004',
    agentName: 'Agent Echo',
    actionType: 'Follow-up',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    customerName: 'Robert Kim',
    unitId: 'SLD-1053',
    doorModel: 'ASE 67 Sliding Door',
    summary: 'Follow-up on service completed last week. Customer satisfied, no issues reported. Scheduled next routine check.',
    outcome: 'success',
    outcomeLabel: 'Completed',
    confidence: 95,
    triggerContext: {
      sensorReading: 'Post-service baseline established',
      weatherCondition: 'Stable conditions',
      sealAge: '2.8 years',
      riskScore: 15,
      riskLevel: 'Low',
      decision: 'Routine follow-up completed',
    },
    conversation: [
      {
        id: 'msg-009',
        sender: 'agent',
        content: "Hi Robert, this is ProSlide following up on the seal replacement we completed last Tuesday. How is everything performing? Any questions about the maintenance we performed?",
        timestamp: '10:25 AM',
      },
      {
        id: 'msg-010',
        sender: 'customer',
        content: "Everything is working great! The door slides much smoother now. Thanks for checking in.",
        timestamp: '10:28 AM',
      },
      {
        id: 'msg-011',
        sender: 'agent',
        content: "Wonderful to hear! I've scheduled your next routine check for 6 months from now. You'll get a reminder 2 weeks before. Have a great day!",
        timestamp: '10:29 AM',
      },
    ],
  },
  {
    id: 'feed-005',
    agentName: 'Agent Aria',
    actionType: 'Alert Triage',
    timestamp: new Date(Date.now() - 22 * 60 * 1000), // 22 minutes ago
    customerName: 'Kevin Johnson',
    unitId: 'SLD-3677',
    doorModel: 'ASE 67 Sliding Door',
    summary: 'Multiple sensor anomalies detected. Escalated to human operator for review due to complex failure pattern.',
    outcome: 'warning',
    outcomeLabel: 'Needs Review',
    confidence: 62,
    triggerContext: {
      sensorReading: 'Erratic moisture readings - sensor fault suspected',
      weatherCondition: 'Moderate rain expected',
      sealAge: '5.8 years (significantly overdue)',
      riskScore: 92,
      riskLevel: 'Critical',
      decision: 'Escalate to human operator - complex case',
    },
    conversation: [
      {
        id: 'msg-012',
        sender: 'agent',
        content: "[SYSTEM] Alert triage initiated for unit SLD-3677. Multiple conflicting sensor readings detected. Pattern analysis inconclusive. Recommend human review before customer outreach.",
        timestamp: '10:18 AM',
      },
    ],
  },
  {
    id: 'feed-006',
    agentName: 'Agent Nova',
    actionType: 'Booking Confirmation',
    timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    customerName: 'Jennifer Lee',
    unitId: 'SLD-5567',
    doorModel: 'ASE 80 Lift Door',
    summary: 'Appointment confirmed for tomorrow 2pm. Customer reminded to clear access area.',
    outcome: 'success',
    outcomeLabel: 'Confirmed',
    confidence: 98,
    revenue: 340,
    triggerContext: {
      sensorReading: 'Elevated moisture - monitoring',
      weatherCondition: 'Rain expected Friday',
      sealAge: '4.2 years',
      riskScore: 65,
      riskLevel: 'High',
      decision: 'Preventive service scheduled',
    },
    conversation: [
      {
        id: 'msg-013',
        sender: 'agent',
        content: "Hi Jennifer, confirming your appointment for tomorrow (Thursday) at 2pm for seal inspection on unit SLD-5567. Please ensure 2ft of clearance around the door track. Reply CONFIRM to verify or RESCHEDULE if you need to change.",
        timestamp: '10:05 AM',
      },
      {
        id: 'msg-014',
        sender: 'customer',
        content: "CONFIRM",
        timestamp: '10:07 AM',
      },
      {
        id: 'msg-015',
        sender: 'agent',
        content: "Thank you! Your appointment is confirmed for Thursday 2pm. You'll receive a reminder 24 hours before. See you then!",
        timestamp: '10:07 AM',
      },
    ],
  },
  {
    id: 'feed-007',
    agentName: 'Agent Echo',
    actionType: 'Sensor Alert',
    timestamp: new Date(Date.now() - 48 * 60 * 1000), // 48 minutes ago
    customerName: 'Emily Davis',
    unitId: 'SLD-4451',
    doorModel: 'ASE 80 Lift Door',
    summary: 'Moisture sensor triggered threshold alert. Risk assessment initiated.',
    outcome: 'neutral',
    outcomeLabel: 'Monitoring',
    confidence: 78,
    triggerContext: {
      sensorReading: 'Moisture 180% above baseline',
      weatherCondition: 'Light rain today, clearing tomorrow',
      sealAge: '3.5 years',
      riskScore: 48,
      riskLevel: 'Medium',
      decision: 'Continue monitoring - threshold watch',
    },
    conversation: [],
  },
  {
    id: 'feed-008',
    agentName: 'Agent Aria',
    actionType: 'Post-Repair Check',
    timestamp: new Date(Date.now() - 65 * 60 * 1000), // 1 hour 5 min ago
    customerName: 'James Wilson',
    unitId: 'SLD-3291',
    doorModel: 'ASE 80 Lift Door',
    summary: '48-hour post-repair check completed. All sensors reading normal. Customer satisfaction survey sent.',
    outcome: 'success',
    outcomeLabel: 'Completed',
    confidence: 96,
    triggerContext: {
      sensorReading: 'All readings within normal range',
      weatherCondition: 'Dry conditions',
      sealAge: '1.5 years (new seal installed)',
      riskScore: 12,
      riskLevel: 'Low',
      decision: 'Post-repair verification complete',
    },
    conversation: [
      {
        id: 'msg-016',
        sender: 'agent',
        content: "Hi James, just checking in after the track alignment we completed on Monday. Everything sliding smoothly?",
        timestamp: '9:50 AM',
      },
      {
        id: 'msg-017',
        sender: 'customer',
        content: "Yes, perfect! Much quieter now.",
        timestamp: '9:52 AM',
      },
      {
        id: 'msg-018',
        sender: 'agent',
        content: "Excellent! I've sent a brief satisfaction survey to your email. Your feedback helps us improve. Thanks for choosing ProSlide!",
        timestamp: '9:53 AM',
      },
    ],
  },
  {
    id: 'feed-009',
    agentName: 'Agent Nova',
    actionType: 'Proactive Outreach',
    timestamp: new Date(Date.now() - 82 * 60 * 1000), // 1 hour 22 min ago
    customerName: 'Amanda White',
    unitId: 'SLD-1129',
    doorModel: 'ASE 80 Lift Door',
    summary: 'Customer declined service. Preferred to wait. Scheduled follow-up in 2 weeks.',
    outcome: 'neutral',
    outcomeLabel: 'Declined',
    confidence: 88,
    triggerContext: {
      sensorReading: 'Moisture 145% above baseline',
      weatherCondition: 'Rain expected next week',
      sealAge: '3.8 years',
      riskScore: 42,
      riskLevel: 'Medium',
      decision: 'Respect customer choice - schedule follow-up',
    },
    conversation: [
      {
        id: 'msg-019',
        sender: 'agent',
        content: "Hi Amanda, our monitoring shows slightly elevated moisture on your door seal. With rain forecast next week, we'd recommend a quick inspection. Would Thursday or Friday work?",
        timestamp: '9:35 AM',
      },
      {
        id: 'msg-020',
        sender: 'customer',
        content: "Thanks but I'm busy this month. Maybe next month?",
        timestamp: '9:38 AM',
      },
      {
        id: 'msg-021',
        sender: 'agent',
        content: "Of course, I understand. I'll check back in two weeks to see if your schedule opens up. In the meantime, if you notice any drafts or sticking, please call us right away. Have a great day!",
        timestamp: '9:39 AM',
      },
    ],
  },
  {
    id: 'feed-010',
    agentName: 'Agent Echo',
    actionType: 'Reminder Sent',
    timestamp: new Date(Date.now() - 95 * 60 * 1000), // 1 hour 35 min ago
    customerName: 'Sarah Park',
    unitId: 'SLD-7744',
    doorModel: 'ASE 80 Lift Door',
    summary: '24-hour appointment reminder sent. Customer acknowledged.',
    outcome: 'success',
    outcomeLabel: 'Acknowledged',
    confidence: 99,
    triggerContext: {
      sensorReading: 'Routine maintenance - no issues',
      weatherCondition: 'Clear',
      sealAge: '0.8 years',
      riskScore: 8,
      riskLevel: 'Low',
      decision: 'Routine reminder sent',
    },
    conversation: [
      {
        id: 'msg-022',
        sender: 'agent',
        content: "Reminder: Your ProSlide maintenance appointment is tomorrow at 10am for unit SLD-7744. Please ensure clear access to the door track. Reply OK to confirm receipt.",
        timestamp: '9:22 AM',
      },
      {
        id: 'msg-023',
        sender: 'customer',
        content: "OK, see you tomorrow",
        timestamp: '9:25 AM',
      },
    ],
  },
  {
    id: 'feed-011',
    agentName: 'Agent Aria',
    actionType: 'Risk Assessment',
    timestamp: new Date(Date.now() - 110 * 60 * 1000), // 1 hour 50 min ago
    customerName: 'Michael Brown',
    unitId: 'SLD-9382',
    doorModel: 'ASE 67 Sliding Door',
    summary: 'Automated risk assessment completed. No action required at this time.',
    outcome: 'neutral',
    outcomeLabel: 'No Action',
    confidence: 94,
    triggerContext: {
      sensorReading: 'All readings normal',
      weatherCondition: 'Favorable conditions',
      sealAge: '1.8 years',
      riskScore: 18,
      riskLevel: 'Low',
      decision: 'Continue routine monitoring',
    },
    conversation: [],
  },
];

// Template for generating new feed entries
export function generateFeedEntry(
  actionType: ActionType,
  unitId: string,
  customerName: string,
  doorModel: string,
  outcome: StatusType,
  outcomeLabel: string,
  confidence: number,
  summary: string,
  triggerContext: {
    sensorReading: string;
    weatherCondition: string;
    sealAge: string;
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    decision: string;
  },
  revenue?: number
): FeedEntry {
  return {
    id: `feed-${Date.now()}`,
    agentName: ['Agent Aria', 'Agent Nova', 'Agent Echo'][Math.floor(Math.random() * 3)],
    actionType,
    timestamp: new Date(),
    customerName,
    unitId,
    doorModel,
    summary,
    outcome,
    outcomeLabel,
    confidence,
    revenue,
    triggerContext,
    conversation: [],
    isNew: true,
  };
}

// Pre-built conversation templates
export const conversationTemplates = {
  booking: [
    {
      sender: 'agent' as const,
      content: "Hi there, this is ProSlide Door Services. Our monitoring detected elevated moisture on your sliding door. With rain forecasted, we recommend a preventive inspection. Are you available Wednesday or Thursday?",
      timestamp: 'Just now',
    },
  ],
  followUp: [
    {
      sender: 'agent' as const,
      content: "Hello! Following up on the service we completed last week. How is everything performing?",
      timestamp: 'Just now',
    },
  ],
  reminder: [
    {
      sender: 'agent' as const,
      content: "Reminder: Your ProSlide appointment is scheduled for tomorrow. Please ensure clear access to the door area.",
      timestamp: 'Just now',
    },
  ],
};
