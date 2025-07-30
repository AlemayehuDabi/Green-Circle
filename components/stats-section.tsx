export function StatsSection() {
  const stats = [
    { value: '150+', label: 'Verified Startups' },
    { value: '25+', label: 'Industry Sectors' },
    { value: '500+', label: 'Active Investors' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="mb-2 text-3xl font-bold text-emerald-500">
                {stat.value}
              </div>
              <div className="text-gray-800">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
