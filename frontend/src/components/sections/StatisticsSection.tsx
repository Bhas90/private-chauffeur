import {
  FiClock,
  FiMap,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import "./statisticsSection.css";

const statistics = [
  {
    icon: FiClock,
    value: "24/7",
    label: "Booking Availability",
  },
  {
    icon: FiTruck,
    value: "6",
    label: "Executive Fleet Options",
  },
  {
    icon: FiMap,
    value: "20+",
    label: "Melbourne Areas Covered",
  },
  {
    icon: FiStar,
    value: "100%",
    label: "Journey-Focused Service",
  },
];

export default function StatisticsSection() {
  return (
    <section className="statistics-section">
      <div className="container">
        <div className="statistics-section__grid">
          {statistics.map(({ icon: Icon, value, label }) => (
            <article key={label}>
              <Icon />

              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}