import { useState, useEffect, useMemo, useCallback } from 'react';
import { StatsStrip } from '@/components/StatsStrip';
import { WeatherBar } from '@/components/WeatherBar';
import { UnitList } from '@/components/UnitList';
import { ActivityFeed } from '@/components/ActivityFeed';
import { useWeather, defaultLocations } from '@/hooks/useWeather';
import { doorUnits } from '@/data/unitData';
import { initialFeedData, generateFeedEntry } from '@/data/feedData';
import { calculateLeakageRisk } from '@/data/riskCalculation';
import type { FeedEntry, Stats, Location } from '@/types';
import { Zap, Settings, Bell } from 'lucide-react';

function App() {
  // Weather state
  const { location, weather, forecast, loading: weatherLoading, changeLocation } = useWeather(defaultLocations[0]);
  
  // Calculate risk score based on weather
  const riskScore = useMemo(() => {
    if (!weather) return 0;
    return calculateLeakageRisk(weather);
  }, [weather]);

  // Feed state
  const [feedEntries, setFeedEntries] = useState<FeedEntry[]>(initialFeedData);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Filter feed entries by selected unit
  const filteredFeedEntries = useMemo(() => {
    if (!selectedUnitId) return feedEntries;
    return feedEntries.filter(entry => entry.unitId === selectedUnitId);
  }, [feedEntries, selectedUnitId]);

  // Calculate stats
  const stats: Stats = useMemo(() => {
    const unitsMonitored = doorUnits.length;
    const alertsActive = doorUnits.filter(u => u.riskLevel === 'High' || u.riskLevel === 'Critical').length;
    const agentsWorking = 3; // Fixed for demo
    const appointmentsBooked = feedEntries.filter(
      e => e.actionType === 'Appointment Booked' || e.actionType === 'Booking Confirmation'
    ).length;
    const revenueGenerated = feedEntries.reduce((sum, e) => sum + (e.revenue || 0), 0);

    return {
      unitsMonitored,
      alertsActive,
      agentsWorking,
      appointmentsBooked,
      revenueGenerated,
    };
  }, [feedEntries]);

  // Real-time simulation - add new feed entries periodically
  useEffect(() => {
    const simulationActions = [
      {
        actionType: 'Sensor Alert' as const,
        outcome: 'neutral' as const,
        outcomeLabel: 'Monitoring',
        confidence: 78,
        summary: 'Moisture sensor triggered threshold alert. Risk assessment initiated.',
      },
      {
        actionType: 'Proactive Outreach' as const,
        outcome: 'pending' as const,
        outcomeLabel: 'In Progress',
        confidence: 85,
        summary: 'Customer contacted regarding preventive maintenance. Awaiting response.',
      },
      {
        actionType: 'Risk Assessment' as const,
        outcome: 'success' as const,
        outcomeLabel: 'No Action',
        confidence: 92,
        summary: 'Automated risk assessment completed. No action required at this time.',
      },
    ];

    const interval = setInterval(() => {
      const randomUnit = doorUnits[Math.floor(Math.random() * doorUnits.length)];
      const randomAction = simulationActions[Math.floor(Math.random() * simulationActions.length)];
      
      const newEntry = generateFeedEntry(
        randomAction.actionType,
        randomUnit.id,
        randomUnit.customerName,
        randomUnit.model,
        randomAction.outcome,
        randomAction.outcomeLabel,
        randomAction.confidence,
        randomAction.summary,
        {
          sensorReading: 'Moisture 145% above baseline',
          weatherCondition: weather ? `${weather.rainfall}mm rain, ${weather.windSpeed}km/h wind` : 'Stable conditions',
          sealAge: `${(2024 - randomUnit.installYear + Math.random()).toFixed(1)} years`,
          riskScore: randomUnit.riskScore,
          riskLevel: randomUnit.riskLevel,
          decision: randomAction.summary,
        },
        // Simulation doesn't generate revenue (would need successful booking outcome)
        undefined
      );

      setFeedEntries(prev => [newEntry, ...prev].slice(0, 50)); // Keep max 50 entries

      // Remove isNew flag after animation
      setTimeout(() => {
        setFeedEntries(prev => 
          prev.map(e => e.id === newEntry.id ? { ...e, isNew: false } : e)
        );
      }, 2000);
    }, 15000 + Math.random() * 10000); // Random interval between 15-25 seconds

    return () => clearInterval(interval);
  }, [weather]);

  const handleLocationChange = useCallback((newLocation: Location) => {
    changeLocation(newLocation);
  }, [changeLocation]);

  const handleUpdateEntry = useCallback((updatedEntry: FeedEntry) => {
    setFeedEntries(prev => 
      prev.map(e => e.id === updatedEntry.id ? updatedEntry : e)
    );
  }, []);

  return (
    <div className="min-h-screen bg-dispatch-bg text-dispatch-text">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dispatch-bg/95 backdrop-blur-sm border-b border-dispatch-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-dispatch-accent-green/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-dispatch-accent-green" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-dispatch-text tracking-tight">Dispatch <span className="text-dispatch-text-secondary font-normal">(ASE Sliding door system)</span></h1>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-dispatch-text-secondary uppercase tracking-wider">AI Service Coordination</p>
                  <span className="text-dispatch-border">|</span>
                  <p className="text-[10px] text-dispatch-text-tertiary">Powered by real weather data · Open-Meteo API</p>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-dispatch-card-hover text-dispatch-text-secondary hover:text-dispatch-text transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-dispatch-card-hover text-dispatch-text-secondary hover:text-dispatch-text transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-dispatch-accent-green/20 flex items-center justify-center ml-2">
                <span className="text-xs font-semibold text-dispatch-accent-green">DM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Stats Strip */}
          <StatsStrip stats={stats} />

          {/* Weather Bar */}
          <WeatherBar
            location={location}
            weather={weather}
            forecast={forecast}
            riskScore={riskScore}
            locations={defaultLocations}
            onLocationChange={handleLocationChange}
            loading={weatherLoading}
          />

          {/* Two Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-280px)] min-h-[500px]">
            {/* Left Panel - Unit List */}
            <UnitList
              units={doorUnits}
              selectedUnitId={selectedUnitId}
              onSelectUnit={setSelectedUnitId}
              className="h-full"
            />

            {/* Right Panel - Activity Feed */}
            <ActivityFeed
              entries={filteredFeedEntries}
              onUpdateEntry={handleUpdateEntry}
              className="h-full"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dispatch-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center text-xs text-dispatch-text-secondary">
            <span>ProSlide Door Systems · v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
