import React from 'react';
import {
  CalendarClock,
  CircleAlert,
  ClipboardCheck,
  CloudFog,
  CloudSnow,
  Construction,
  Info,
  ListChecks,
  MapPin,
  Route,
  ShieldCheck,
  Signpost,
  Snowflake,
  TrafficCone,
  TriangleAlert,
} from 'lucide-react';

/**
 * Resolves an icon component from the string key stored in advisory data.
 * Keeping icons behind a string key means advisory records stay serialisable
 * and can be stored in a database later without changing the UI.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CloudSnow,
  CloudFog,
  Construction,
  Signpost,
  ShieldCheck,
  Info,
  CircleAlert,
  TriangleAlert,
  TrafficCone,
  CalendarClock,
  Snowflake,
  Route,
  ListChecks,
  ClipboardCheck,
  MapPin,
};

export const AdvisoryIcon: React.FC<{ name?: string; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  const Icon = (name && ICON_MAP[name]) || CircleAlert;
  return <Icon className={className} aria-hidden="true" />;
};

export default AdvisoryIcon;
