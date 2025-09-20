import React from 'react';
import Featured from '../../assets/svg/featured.svg';

const Features = () => {
  const features = [
    {
      title: 'Share team inboxes',
      description:
        'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
      link: 'Learn more',
    },
    {
      title: 'Connect with customers',
      description:
        'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.',
      link: 'Learn more',
    },
    {
      title: 'Deliver instant answers',
      description:
        'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
      link: 'Learn more',
    },
    {
      title: 'Connect the tools you already use',
      description:
        'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.',
      link: 'Learn more',
    },
    {
      title: 'Manage your team with reports',
      description:
        "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
      link: 'Learn more',
    },
    {
      title: 'Our people make the difference',
      description:
        "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
      link: 'Learn more',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header Section */}
      <div className="text-left mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          How to Begin
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="pt-8">
            <div className="flex flex-col items-start mb-4">
              <img
                src={Featured}
                className="h-10 w-10 text-yellow-500 mr-3 flex-shrink-0"
                alt="Feature icon"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4 pl-13">{feature.description}</p>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 pl-13 inline-block"
            >
              {feature.link} <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
