import type { DoorUnit } from '@/types';

export const doorUnits: DoorUnit[] = [
  {
    id: 'SLD-4820',
    model: 'ASE 67 Slide',
    installYear: 2021,
    customerName: 'Maria Chen',
    status: 'error',
    riskLevel: 'High',
    riskScore: 78,
    lastService: '2024-08-15',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-3291',
    model: 'ASE 80 Lift',
    installYear: 2023,
    customerName: 'James Wilson',
    status: 'success',
    riskLevel: 'Low',
    riskScore: 18,
    lastService: '2024-11-20',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-7744',
    model: 'ASE 80 Lift',
    installYear: 2024,
    customerName: 'Sarah Park',
    status: 'success',
    riskLevel: 'Low',
    riskScore: 12,
    lastService: '2024-12-01',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-1053',
    model: 'ASE 67 Slide',
    installYear: 2022,
    customerName: 'Robert Kim',
    status: 'warning',
    riskLevel: 'Medium',
    riskScore: 52,
    lastService: '2024-06-10',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-6217',
    model: 'ASE 80 Lift',
    installYear: 2020,
    customerName: 'Lisa Thompson',
    status: 'error',
    riskLevel: 'Critical',
    riskScore: 85,
    lastService: '2024-03-22',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-9382',
    model: 'ASE 67 Slide',
    installYear: 2023,
    customerName: 'Michael Brown',
    status: 'success',
    riskLevel: 'Low',
    riskScore: 22,
    lastService: '2024-09-05',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-4451',
    model: 'ASE 80 Lift',
    installYear: 2021,
    customerName: 'Emily Davis',
    status: 'warning',
    riskLevel: 'Medium',
    riskScore: 48,
    lastService: '2024-07-18',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-2903',
    model: 'ASE 67 Slide',
    installYear: 2022,
    customerName: 'David Martinez',
    status: 'success',
    riskLevel: 'Low',
    riskScore: 28,
    lastService: '2024-10-12',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-5567',
    model: 'ASE 80 Lift',
    installYear: 2020,
    customerName: 'Jennifer Lee',
    status: 'warning',
    riskLevel: 'High',
    riskScore: 65,
    lastService: '2024-05-30',
    sensorStatus: 'error',
  },
  {
    id: 'SLD-8834',
    model: 'ASE 67 Slide',
    installYear: 2024,
    customerName: 'Christopher Taylor',
    status: 'success',
    riskLevel: 'Low',
    riskScore: 8,
    lastService: '2024-12-15',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-1129',
    model: 'ASE 80 Lift',
    installYear: 2021,
    customerName: 'Amanda White',
    status: 'pending',
    riskLevel: 'Medium',
    riskScore: 42,
    lastService: '2024-08-28',
    sensorStatus: 'active',
  },
  {
    id: 'SLD-3677',
    model: 'ASE 67 Slide',
    installYear: 2019,
    customerName: 'Kevin Johnson',
    status: 'error',
    riskLevel: 'Critical',
    riskScore: 92,
    lastService: '2024-02-14',
    sensorStatus: 'active',
  },
];

export function getUnitById(id: string): DoorUnit | undefined {
  return doorUnits.find(unit => unit.id === id);
}

export function getUnitsByStatus(status: string): DoorUnit[] {
  if (status === 'all') return doorUnits;
  return doorUnits.filter(unit => unit.status === status);
}

export function getUnitsByRiskLevel(level: string): DoorUnit[] {
  if (level === 'all') return doorUnits;
  return doorUnits.filter(unit => unit.riskLevel.toLowerCase() === level.toLowerCase());
}
