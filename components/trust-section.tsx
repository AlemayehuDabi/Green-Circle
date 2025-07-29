import { CheckCircle, Users, TrendingUp } from 'lucide-react';

export function TrustSection() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Legally Verified',
      description:
        "All startups are approved under Ethiopia's national Startup Law",
    },
    {
      icon: Users,
      title: 'Vetted Founders',
      description: 'Comprehensive background checks and Fayda ID verification',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'Supporting scalable businesses with real market potential',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Why Trust Ethiopia Startup?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
