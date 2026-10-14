export interface Attraction {
  name: string;
  description: string;
  location: string;
  highlight: string;
  bestTime?: string;
  ticketInfo?: string;
  duration?: string;
  proTip?: string;
}

export interface FoodItem {
  dish: string;
  description: string;
  whereToTaste: string;
  flavorProfile: string;
}

export interface StayOption {
  area: string;
  vibe: string;
  idealFor: string;
  recommendations: string;
}

export interface BudgetTier {
  tier: 'Budget' | 'Mid-Range' | 'Luxury';
  dailyCost: string;
  accommodation: string;
  meals: string;
  transport: string;
  activities: string;
}

export interface TravelTip {
  title: string;
  tip: string;
  category: 'Etiquette' | 'Transit' | 'Money' | 'Safety' | 'Pack' | 'Local Hack';
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption: string;
  photographer?: string;
}

export interface Article {
  id: string;
  slug: string;
  url: string;
  title: string;
  subtitle: string;
  seoTitle?: string;
  metaDescription?: string;
  aeo?: {
    famousForQuestion: string;
    famousForAnswer: string;
    bestPlacesQuestion: string;
    bestPlacesAnswer: string;
  };
  destination: string;
  country: string;
  region: 'Asia' | 'Europe' | 'North America' | 'Middle East' | 'Oceania';
  readTimeMinutes: number;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: ArticleImage;
  secondaryImages: ArticleImage[];
  quickFacts: {
    currency: string;
    language: string;
    idealDuration: string;
    climate: string;
    bestMonths: string;
    timezone: string;
  };
  // The 12 required long-form sections:
  sections: {
    introduction: string;
    whyDreamDestination: string;
    majorAttractions: Attraction[];
    thingsToDoSummary?: string;
    thingsToDo: string[];
    foodToTry: FoodItem[];
    bestTimeToVisit: {
      summary: string;
      peakSeason: string;
      shoulderSeason: string;
      lowSeason: string;
    };
    howToGetThere: {
      byAir: string;
      localTransit: string;
      entryRequirements: string;
    };
    whereToStaySummary?: string;
    whereToStay: StayOption[];
    estimatedBudget: {
      currencyName: string;
      tiers: BudgetTier[];
      moneySavingTips: string[];
    };
    travelTips: TravelTip[];
    whatMakesItMemorable: string;
    conclusion: string;
  };
}
