import { Droplet, Layers, Gauge, BatteryCharging, Zap, Sparkles, Thermometer, Timer, Radio, Heart, Droplets, BatteryFull, Shield, ArrowUp, Calendar, Clock } from 'lucide-react'
import './FeatureCard.css'

const ICONS = {
  droplet: Droplet, layers: Layers, gauge: Gauge,
  'battery-charging': BatteryCharging, zap: Zap, sparkles: Sparkles,
  thermometer: Thermometer, timer: Timer, radio: Radio, heart: Heart,
  droplets: Droplets, 'battery-full': BatteryFull, shield: Shield,
  'arrow-up': ArrowUp, calendar: Calendar, clock: Clock,
}

export default function FeatureCard({ icon, title, description }) {
  const Icon = ICONS[icon] || Droplet
  return (
    <div className="fcard">
      <div className="fcard-icon">
        <Icon size={26} strokeWidth={1.4} />
      </div>
      <h3 className="fcard-title">{title}</h3>
      {description && <p className="fcard-desc">{description}</p>}
    </div>
  )
}
