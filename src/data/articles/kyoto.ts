import { Article } from '../../types/blog.ts';

export const kyotoArticle: Article = {
  id: 'article-kyoto',
  slug: 'kyoto-japan-tradition-temples-tranquility',
  url: '/articles/kyoto-japan.html',
  title: 'Kyoto, Japan — Tradition, Temples and Tranquility',
  subtitle: 'Vermilion torii gate tunnels, meditative Zen rock gardens, whispering bamboo groves, and the living soul of ancient Japan.',
  destination: 'Kyoto',
  country: 'Japan',
  region: 'Asia',
  readTimeMinutes: 14,
  publishDate: 'October 12, 2026',
  author: {
    name: 'Kenji Takahashi',
    role: 'Traditional Arts Curatorial Scholar & Kansai Historian',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Traditional wooden machiya houses and Yasaka Pagoda illuminated along the cobblestone alleys of Higashiyama, Kyoto',
    caption: 'The Yasaka Pagoda soaring above the lantern-lit wooden machiya merchant townhouses of historic Higashiyama.',
    photographer: 'Soragrit Wongsa',
  },
  secondaryImages: [
    {
      url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1000&q=80',
      alt: 'Endless vermilion torii gate tunnels winding through the sacred mountain forest at Fushimi Inari Taisha',
      caption: 'Over 10,000 sacred vermilion torii gates winding up the sacred Mount Inari in mystical woodland silence.',
      photographer: 'Su San Lee',
    },
    {
      url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
      alt: 'Sunlight filtering through towering green bamboo stalks in the Arashiyama Bamboo Grove in Kyoto',
      caption: 'The towering bamboo stalks of Arashiyama swaying softly in the mountain breeze.',
      photographer: 'Susann Schuster',
    },
  ],
  quickFacts: {
    currency: 'Japanese Yen (JPY / ¥) — $1 USD ≈ 152 JPY',
    language: 'Japanese (English signage common in train stations and major sights)',
    idealDuration: '4 to 6 days',
    climate: 'Temperate (Spring 15°C - 21°C, Summer humid 28°C - 34°C, Autumn crisp 14°C - 20°C, Winter 2°C - 9°C)',
    bestMonths: 'Late March to mid-April (Sakura cherry blossoms) & November (Crimson momiji autumn foliage)',
    timezone: 'UTC+9 (JST)',
  },
  sections: {
    introduction: `For over a thousand years, from 794 until the Meiji Restoration in 1868, Kyoto served as the imperial capital of Japan. While modern Tokyo sprints breathlessly into the technological future with neon canyons and skyscraper forests, Kyoto remains the serene guardian of Japan’s aesthetic, philosophical, and spiritual soul. Miraculously spared from the destruction of World War II, the city shelters more than 2,000 Buddhist temples and Shinto shrines, seventeen UNESCO World Heritage monuments, and preserved historic districts where the click-clack of wooden geta sandals still echoes across flagstone pavements.

To walk through Kyoto is to participate in an ancient ritual of mindful contemplation. Here, the world is measured not by speed, but by nuance: the raked gravel lines of a dry landscape Zen garden that symbolize cosmic oceans, the precise geometry of a Tatami tearoom, and the delicate rustle of silk kimono sleeves as a geiko or maiko slips quietly through the lantern-lit alleys of Gion at dusk.`,

    whyDreamDestination: `Kyoto is a dream destination because it invites you into a world governed by "wabi-sabi"—the profound Japanese aesthetic philosophy that finds sublime beauty in transience, impermanence, and natural imperfection. Every stone, garden pond, and cedar beam was placed with centuries of contemplation. Whether you are gazing at the gold-leaf reflection of Kinkaku-ji floating upon the Mirror Pond or watching cherry blossom petals drift like pink snow across the philosopher’s path, Kyoto touches a deep human longing for tranquility and poetic grace.

Furthermore, Kyoto is the birthplace of Japan’s most revered culinary and craft traditions. From multi-course Kaiseki imperial banquets that honor the micro-seasons with artistic precision to centuries-old woodblock printing, Kiyomizu pottery, and hand-whisked Uji matcha tea, Kyoto’s living culture is not preserved under museum glass—it is alive, vibrant, and practiced daily by passionate masters.`,

    majorAttractions: [
      {
        name: 'Fushimi Inari Taisha (Senbon Torii)',
        description: 'Serving as the head shrine among Japan’s 30,000 Shinto shrines dedicated to Inari Okami, the deity of rice, agriculture, commerce, and prosperity, Fushimi Inari Taisha traces its spiritual origins back to 711 CE, predating Kyoto’s establishment as imperial capital.\n\nBehind the main shrine hall lies the mystical mountain trail: a 4-kilometer uphill pilgrimage loop beneath more than 10,000 vibrant vermilion torii gates ("Senbon Torii"), donated over centuries by businesses and merchants seeking fortune. Stone kitsune (fox) statues guard the mossy cedar woods, holding symbolic keys to rice granaries, sheaves of grain, or wisdom jewels in their mouths.',
        location: 'Southern Kyoto (Directly opposite JR Inari Station on JR Nara Line)',
        highlight: 'Hiking past the Yotsutsuji intersection to the quiet upper mountain summit trail at dusk as stone lanterns flicker alive in the silent sacred cedar forest.',
        bestTime: '6:00 AM – 7:30 AM (before crowds) or 7:00 PM for atmospheric night walking',
        ticketInfo: 'Completely free admission; open 24 hours a day, 365 days a year',
        duration: '2 to 3 hours for the complete 4-kilometer mountain summit loop',
        proTip: '90% of tourists turn around at the first twin gate corridor or the Yotsutsuji lookout; continue onward past the crossroads along the circular peak loop for near-total solitude and ancient moss-covered stone shrines.',
      },
      {
        name: 'Kinkaku-ji (The Golden Pavilion / Rokuon-ji)',
        description: 'Originally constructed in 1397 as a retirement villa for Shogun Ashikaga Yoshimitsu and converted into a Rinzai Zen Buddhist temple following his death, Kinkaku-ji is an architectural triumph harmonizing three distinct Japanese design styles across its three tiers: Shinden-zukuri palace style on the ground floor, Buke-zukuri samurai warrior style on the middle floor, and Zen Buddhist temple style on the top.\n\nThe top two stories are completely enveloped in pure gold leaf, crowned by a bronze Chinese phoenix. The pavilion sits beside Kyoko-chi (Mirror Pond), reflecting its shimmering gold facade amidst islands planted with sculpted Japanese black pines.',
        location: 'Kita Ward (Northern Kyoto, Kyoto City Bus #205)',
        highlight: 'Viewing the golden pavilion reflecting in the glass-still surface of Mirror Pond beneath the backdrop of dark green pine-forested mountains.',
        bestTime: 'First morning entry at 9:00 AM when the eastern sun strikes the gold leaf, or late afternoon around 4:00 PM',
        ticketInfo: '¥500 JPY general admission (the paper ticket is an auspicious protective talisman/o-fuda)',
        duration: '1 to 1.5 hours',
        proTip: 'After exiting the garden, walk 15 minutes east along the historic stone path to Ryoan-ji Temple to experience Japan’s most celebrated dry landscape rock garden, creating a perfect morning pairing.',
      },
      {
        name: 'Kiyomizu-dera Temple (Otowa-san)',
        description: 'Perched halfway up Mount Otowa overlooking the historic Higashiyama district, Kiyomizu-dera ("Pure Water Temple") was founded in 778 CE. Its colossal wooden Hondo (Main Hall) features an astonishing veranda cantilevered 13 meters above the hillside, constructed entirely using ancient Japanese joinery without a single metal nail.\n\nBeneath the hall cascades the sacred Otowa Waterfall, channeled into three streams representing longevity, success in studies, and love; pilgrims use long-handled tin cups to drink from one stream to receive its blessing.',
        location: 'Higashiyama Ward (Approached via Ninenzaka and Sannenzaka alleys)',
        highlight: 'Standing on the wooden stage during spring cherry blossom or autumn maple illuminations, gazing across a sea of illuminated treetops toward the illuminated Kyoto Tower in the distance.',
        bestTime: 'Opens early at 6:00 AM; arrive at dawn to walk the wooden stage in silence',
        ticketInfo: '¥400 JPY daytime / ¥400 JPY seasonal night illuminations (Spring & Autumn)',
        duration: '2 to 2.5 hours',
        proTip: 'Approach or depart via the preserved stone steps of Sannenzaka and Ninenzaka to admire centuries-old wooden machiya townhouses, traditional craft studios, and green tea confectioneries.',
      },
      {
        name: 'Arashiyama Bamboo Grove & Tenryu-ji Zen Garden',
        description: 'Rising on the western outskirts of Kyoto along the Oi River, the Arashiyama Bamboo Grove is a towering cathedral of moso bamboo stalks that filter emerald sunlight and sway softly in the alpine mountain breeze, creating a tranquil acoustic rustling recognized by Japan’s Ministry of the Environment as one of the "100 Soundscapes of Japan."\n\nDirectly adjacent lies Tenryu-ji Temple, a UNESCO World Heritage site founded in 1339 whose Sogenchi strolling pond garden, designed by Zen master Muso Soseki, incorporates the surrounding Arashiyama mountain ridge as borrowed scenery ("shakkei").',
        location: 'Ukyo Ward (Arashiyama, JR Saga-Arashiyama or Hankyu Arashiyama Station)',
        highlight: 'Pausing in the center of the bamboo path at 7:00 AM to close your eyes and listen to the hollow bamboo stalks creaking and whispering in the breeze.',
        bestTime: '6:30 AM – 7:30 AM before tour groups and rickshaws arrive',
        ticketInfo: 'Bamboo Grove is free public path open 24/7; Tenryu-ji Garden admission ¥500 JPY',
        duration: '2.5 to 3.5 hours',
        proTip: 'Combine your walk with a visit to Okochi Sanso Villa at the grove’s northern end (¥1,000 JPY including hot matcha and sweet); its pristine gardens offer unmatched tranquil views over Kyoto and the Hozu River Gorge.',
      },
    ],

    thingsToDo: [
      'Stroll the stone-paved alleys of Ninenzaka and Sannenzaka in Higashiyama at dawn before shops open, admiring preserved timber machiya architecture.',
      'Participate in an authentic Chado (Way of Tea) ceremony in a quiet Daitoku-ji temple tearoom, savoring frothy stone-ground Uji matcha and a wagashi sweet.',
      'Walk the 2-kilometer stone Philosopher’s Path (Tetsugaku-no-Michi) alongside a bubbling canal lined with hundreds of cherry trees and tranquil Zen sub-temples.',
      'Explore the historic Gion and Pontocho alleyways at twilight, catching glimpses of apprentice maiko dressed in ornate seasonal hair kanzashi on their way to appointments.',
      'Spend a morning quietly seated on the wooden veranda of Ryoan-ji Temple, contemplating the mystery of its 15 stones arranged in raked white gravel.',
      'Take a day trip to Uji, the historic epicenter of Japanese green tea cultivation, tasting matcha soba noodles and visiting the UNESCO Byodoin Temple.',
    ],

    foodToTry: [
      {
        dish: 'Traditional Kaiseki Ryori',
        description: 'The pinnacle of Japanese multi-course haute cuisine: meticulously presented dishes reflecting the immediate micro-season, showcasing seasonal fish, mountain vegetables, and artistic ceramics.',
        whereToTaste: 'Gion Sasaki, Kikunoi, or a traditional ryokan dinner',
        flavorProfile: 'Subtle, hyper-fresh, seasonal umami, delicate dashi broths, and artistic visual harmony.',
      },
      {
        dish: 'Yudofu (Simmered Soft Tofu)',
        description: 'Delicate cubes of fresh Kyoto silken tofu simmered in hot kombu dashi broth, served with grated ginger, scallions, roasted sesame seeds, and savory dipping sauce.',
        whereToTaste: 'Junsei or Tosuiro in Nanzenji and Higashiyama',
        flavorProfile: 'Creamy, comforting, clean soy sweetness with aromatic herbal accents.',
      },
      {
        dish: 'Kyo-Tsukemono (Kyoto Pickles)',
        description: 'Heirloom Kyoto vegetables (Kyo-yasai) preserved with rice bran, salt, or sake lees, including red shiso-pickled eggplant (shibazuke) and crunchy senmaizuke turnip.',
        whereToTaste: 'Nishiki Market food stalls and pickle specialty shops',
        flavorProfile: 'Crunchy, tangy, refreshing, with herbal sour and earthy savory depth.',
      },
      {
        dish: 'Ceremonial Uji Matcha & Parfaits',
        description: 'Intense stone-ground green tea whisked with bamboo chasen, paired with modern matcha soft-serve parfaits layered with mochi and red bean paste.',
        whereToTaste: 'Tsujiri or Nakamura Tokichi in Gion and Uji',
        flavorProfile: 'Pleasantly astringent, rich chlorophyll notes balanced by sweet earthy creaminess.',
      },
    ],

    bestTimeToVisit: {
      summary: 'Kyoto is legendary for its four distinct seasons, each offering a dramatic change in colors and temple atmosphere.',
      peakSeason: 'Late March to early April (Cherry blossom season / Sakura) and November (Autumn maple foliage / Momiji): extraordinary natural beauty, but maximum hotel demand and heavy foot traffic.',
      shoulderSeason: 'May (Lush fresh green "ao-momiji" foliage, pleasant warm weather) and October (Crisp autumn breezes, comfortable walking conditions, fewer crowds).',
      lowSeason: 'January to February (Chilly winter with rare dusting of snow over temple roofs, providing ethereal, crowd-free contemplation) and July–August (Hot, muggy summer temperatures, though marked by the famous Gion Matsuri festival).',
    },

    howToGetThere: {
      byAir: 'Fly into Kansai International Airport (KIX) near Osaka. The direct JR Haruka Express train transports you straight from KIX to Kyoto Station in just 75 minutes.',
      localTransit: 'The Shinkansen bullet train connects Tokyo to Kyoto Station in just 2 hours and 15 minutes (Tokaido Line). Within Kyoto, navigate via the Kyoto subway lines, city buses, and affordable clean MK taxis.',
      entryRequirements: 'Passport holders from the US, UK, Canada, Australia, and EU receive a 90-day tourist visa waiver upon arrival. Complete the digital Visit Japan Web QR codes for immigration and customs before landing.',
    },

    whereToStay: [
      {
        area: 'Historic Ryokan in Higashiyama',
        vibe: 'Traditional straw tatami mats, cedar wood ofuro soaking tubs, multi-course Kaiseki breakfasts, and zen tranquility',
        idealFor: 'Cultural purists, couples, and travelers seeking authentic Japanese hospitality',
        recommendations: 'Tawaraya Ryokan (Japan’s most storied historic inn), Hiiragiya, or Gion Hatanaka.',
      },
      {
        area: 'Modern Downtown (Shimogyo & Nakagyo Wards)',
        vibe: 'Walkable, surrounded by restaurants, easy subway access, vibrant Nishiki Market proximity',
        idealFor: 'First-time visitors, foodies, and transit efficiency',
        recommendations: 'Ace Hotel Kyoto (Designed by Kengo Kuma), The Thousand Kyoto, or Mitsui Garden Hotel.',
      },
      {
        area: 'Arashiyama River Valley',
        vibe: 'Highland mountain seclusion, peaceful river vistas, bamboo forests, and luxury hot springs',
        idealFor: 'Nature lovers, wellness retreat seekers, and romantic getaways',
        recommendations: 'Hoshinoya Kyoto (Arrive via private riverboat) or Suiran Luxury Collection.',
      },
    ],

    estimatedBudget: {
      currencyName: 'JPY (Japanese Yen) — $1 USD ≈ 152 JPY',
      tiers: [
        {
          tier: 'Budget',
          dailyCost: '¥7,500 – ¥11,000 JPY ($50 – $75 USD)',
          accommodation: 'Design capsule hotel or traditional hostel tatami room (¥4,500–¥7,000)',
          meals: 'Conbini (7-Eleven/FamilyMart) breakfast, delicious ramen and soba noodles, Nishiki Market bites (¥2,000–¥3,000)',
          transport: 'Subway/Bus IC card pass (¥800–¥1,200)',
          activities: 'Temple admission tickets (most range from ¥400–¥600 each)',
        },
        {
          tier: 'Mid-Range',
          dailyCost: '¥22,000 – ¥40,000 JPY ($145 – $265 USD)',
          accommodation: 'Modern boutique hotel near Kyoto Station or Karasuma (¥15,000–¥26,000)',
          meals: 'Sit-down lunches, specialty tonkatsu or tempura, evening izakaya dining with sake (¥5,000–¥9,000)',
          transport: 'Subway, JR trains, and occasional taxi jumps (¥1,500–¥2,500)',
          activities: 'Guided tea ceremony, temple entry passes, kimono rental for a half-day (¥4,000–¥7,000)',
        },
        {
          tier: 'Luxury',
          dailyCost: '¥75,000 – ¥220,000+ JPY ($500 – $1,500+ USD)',
          accommodation: 'Storied traditional ryokan with two Kaiseki meals included (Tawaraya, Hiiragiya, Aman Kyoto) (¥60,000–¥180,000+)',
          meals: 'Michelin-starred three-star Kaiseki dinner (Kikunoi, Hyotei) (¥25,000–¥50,000)',
          transport: 'Chauffeured private hire car (¥20,000–¥40,000/day)',
          activities: 'Private temple after-hours garden meditation, master craft workshops (¥20,000–¥50,000)',
        },
      ],
      moneySavingTips: [
        'Get an IC transit card (ICOCA, Suica, or Pasmo) on your phone wallet; tap seamlessly on all buses, trains, convenience stores, and vending machines.',
        'Japanese convenience stores ("Konbini" like 7-Eleven, Lawson, FamilyMart) sell fresh gourmet onigiri (rice balls), egg salad sandwiches, and hot green tea of astonishingly high quality for $2–$4.',
        'Rent a city bicycle (Kyoto is largely flat and grid-based) to pedal peacefully between Higashiyama, the Philosopher’s Path, and the Kamogawa Riverbanks for just ¥1,000/day.',
      ],
    },

    travelTips: [
      {
        title: 'Master Temple & Shinto Etiquette',
        tip: 'Remove shoes when entering temple main halls and step on wood or tatami, never on raised thresholds. At Shinto shrines, bow twice, clap twice, state your prayer in silence, and bow once more.',
        category: 'Etiquette',
      },
      {
        title: 'Do Not Photograph Geisha in Private Streets',
        tip: 'Respect the working artists of Gion. Taking photos of geiko or maiko without explicit consent or entering private residential alleys marked with no-photo signs is strictly prohibited and subject to fines.',
        category: 'Etiquette',
      },
      {
        title: 'Start Sightseeing at 6:30 AM',
        tip: 'Fushimi Inari and Arashiyama Bamboo Grove are open 24/7 with zero admission gates. Arriving at 6:30 or 7:00 AM allows you to experience these sacred sites in mystical silence before tour crowds appear.',
        category: 'Local Hack',
      },
      {
        title: 'Carry a Small Hand Towel and Trash Bag',
        tip: 'Public trash cans are virtually nonexistent in Japanese cities (you are expected to carry trash back to your hotel or dispose of it at convenience stores). Public restrooms also frequently lack paper hand towels.',
        category: 'Pack',
      },
    ],

    whatMakesItMemorable: `What makes Kyoto unforgettable is its profound gift of stillness. Sit on the polished wooden engawa veranda of a temple like Shoren-in as rain taps gently against moss-covered stone lanterns, breathing in the scent of damp Japanese cedar and burning incense. In that moment of quiet reverie, the modern world melts away, and you feel the continuous heartbeat of twelve hundred years of contemplative beauty.`,

    conclusion: `Kyoto is not just an ancient city; it is a masterclass in living with intention, reverence, and harmony. It reminds us that grace is found in patience, that beauty is amplified by transience, and that a single bowl of tea prepared with presence can quiet a busy world. A journey to Kyoto leaves you not with souvenirs, but with a deeper, quieter perspective on life itself.`,
  },
};
