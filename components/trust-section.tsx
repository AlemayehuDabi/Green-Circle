import { CheckCircle, Users, TrendingUp, Shield } from 'lucide-react';

export function TrustSection() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Legally Verified',
      description:
        "Every startup is verified against Ethiopia's national Startup Law and business registry.",
    },
    {
      icon: Users,
      title: 'Vetted Founders',
      description: 'Comprehensive background checks and Fayda ID verification for all core team members.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'We curate scalable businesses with real traction, filtering out noise for investors.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 mb-4">
            <Shield className="h-4 w-4" />
            <span>Safety First</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Trust Green Circle?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We don't just list startups; we certify them. Our rigorous 3-step vetting process ensures quality and transparency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 hover:-translate-y-1"
              >
                {/* Icon Container - Starts Grey, turns Green on Hover */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-400 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 group-hover:rotate-3">
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}