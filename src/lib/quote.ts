type ProjectResponses = {
  [key: string]: string;
};

const estimatedHours: Record<string, number> = {
  project_type: {
    'MVP (Minimum Viable Product)': 200,
    'MLP (Minimum Lovable Product)': 300,
    Prototype: 150
  },
  primary_goal: {
    'Validate an idea': 50,
    'Attract investors': 70,
    'Test market demand': 100,
    'Launch quickly': 120
  },
  target_audience: {
    Consumers: 30,
    Businesses: 40,
    Developers: 50,
    'Non-profit organizations': 60,
    Other: 20
  },
  platform: {
    Web: 100,
    iOS: 120,
    Android: 120,
    Desktop: 150,
    'Cross-platform': 200
  },
  core_features_auth: {
    Yes: 40,
    No: 0,
    'Not sure yet': 20
  },
  core_features_dashboard: {
    Yes: 50,
    No: 0,
    'Not sure yet': 25
  },
  core_features_notifications: {
    Yes: 30,
    No: 0,
    'Not sure yet': 15
  },
  core_features_thirdPartyIntegrations: {
    Yes: 60,
    No: 0,
    'Not sure yet': 30
  },
  timeline: {
    '1 month': 160,
    '2-3 months': 320,
    '3-6 months': 640,
    Flexible: 480
  },
  budget: {
    'Less than $10,000': 150,
    '$10,000 - $25,000': 250,
    '$25,000 - $50,000': 350,
    'Greater than $50,000': 500
  },
  existing_assets_mockups: {
    Yes: -20,
    No: 0,
    'Not sure yet': 10
  },
  existing_assets_wireframes: {
    Yes: -20,
    No: 0,
    'Not sure yet': 10
  },
  existing_assets_codebase: {
    Yes: -50,
    No: 0,
    'Not sure yet': 20
  },
  user_flow: {
    'Simple and intuitive': 50,
    'Highly interactive': 100,
    'Data-heavy workflows': 150,
    Other: 75
  },
  scalability: {
    'Not important': 0,
    'Moderately important': 50,
    'Very important': 100
  },
  tech_stack: {
    'Yes, I have specific requirements': 50,
    'No, I’m open to suggestions': 0
  },
  maintenance: {
    Yes: 50,
    No: 0,
    'Not sure yet': 25
  },
  competitors: {
    None: 10,
    '1-3 competitors': 30,
    '3-5 competitors': 50,
    'More than 5 competitors': 100
  },
  analytics: {
    Yes: 30,
    No: 0,
    'Not sure yet': 10
  },
  testing: {
    'Basic functionality testing': 20,
    'Extensive testing with QA team': 100,
    None: 0
  },
  future_features: {
    Yes: 100,
    No: 0,
    'Not sure yet': 50
  },
  team: {
    'Yes, a full team': -50,
    Partially: 0,
    'No, I’m outsourcing everything': 100
  },
  communication: {
    'Weekly updates': 10,
    'Bi-weekly updates': 20,
    'Ad-hoc updates': 5,
    'Daily standups': 50
  }
};

// Function to calculate total estimated hours
export function calculateEstimatedHours(responses: ProjectResponses): number {
  let totalHours = 0;

  for (const key in responses) {
    const responseValue = responses[key];
    const hours = estimatedHours[key]?.[responseValue] || 0;
    totalHours += hours;
  }

  return totalHours;
}

// Function to calculate monthly cost based on timeline
export function calculateCostPerMonth(
  totalHours: number,
  timeline: string,
  hourlyRate: number
): number {
  const months = {
    '1 month': 1,
    '2-3 months': 2.5, // average
    '3-6 months': 4.5, // average
    Flexible: 6
  };

  const projectMonths = months[timeline] || 6; // Default to 6 months if timeline is missing
  return (totalHours * hourlyRate) / projectMonths;
}

// Example Usage
const exampleResponses: ProjectResponses = {
  project_type: 'MVP (Minimum Viable Product)',
  primary_goal: 'Validate an idea',
  target_audience: 'Consumers',
  platform: 'Web',
  core_features_auth: 'Yes',
  core_features_dashboard: 'No',
  core_features_notifications: 'Yes',
  core_features_thirdPartyIntegrations: 'No',
  timeline: '2-3 months',
  budget: '$10,000 - $25,000',
  existing_assets_mockups: 'Yes',
  existing_assets_wireframes: 'No',
  existing_assets_codebase: 'Not sure yet',
  user_flow: 'Simple and intuitive',
  scalability: 'Moderately important',
  tech_stack: 'No, I’m open to suggestions',
  maintenance: 'Yes',
  competitors: '3-5 competitors',
  analytics: 'Yes',
  testing: 'Basic functionality testing',
  future_features: 'Yes',
  team: 'No, I’m outsourcing everything',
  communication: 'Weekly updates'
};

const hourlyRate = 50; // Example hourly rate in dollars
const totalHours = calculateEstimatedHours(exampleResponses);
const monthlyCost = calculateCostPerMonth(totalHours, exampleResponses.timeline, hourlyRate);

console.log('Total Estimated Hours:', totalHours);
console.log('Monthly Cost:', monthlyCost);
