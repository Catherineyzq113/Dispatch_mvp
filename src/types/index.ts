export type StatusType = 'success' | 'warning' | 'error' | 'pending' | 'neutral';

export type ActionType = 
  | 'Proactive Outreach' 
  | 'Follow-up' 
  | 'Booking Confirmation' 
  | 'Post-Repair Check' 
  | 'Alert Triage' 
  | 'Sensor Alert' 
  | 'Risk Assessment' 
  | 'Appointment Booked' 
  | 'Reminder Sent';

export interface Message {
  id: string;
  sender: 'agent' | 'customer';
  content: string;
  timestamp: string;
}

export interface TriggerContext {
  sensorReading?: string;
  weatherCondition?: string;
  sealAge?: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  decision: string;
}

export interface FeedEntry {
  id: string;
  agentName: string;
  actionType: ActionType;
  timestamp: Date;
  customerName: string;
  unitId: string;
  doorModel: string;
  summary: string;
  outcome: StatusType;
  outcomeLabel: string;
  confidence: number;
  revenue?: number;
  triggerContext: TriggerContext;
  conversation: Message[];
  isNew?: boolean;
}

export interface DoorUnit {
  id: string;
  model: string;
  installYear: number;
  customerName: string;
  status: StatusType;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number;
  lastService?: string;
  sensorStatus: 'active' | 'inactive' | 'error';
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
}

export interface ForecastData {
  date: string;
  precipitation: number;
  maxTemp: number;
  minTemp: number;
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface Stats {
  unitsMonitored: number;
  alertsActive: number;
  agentsWorking: number;
  appointmentsBooked: number;
  revenueGenerated: number;
}
