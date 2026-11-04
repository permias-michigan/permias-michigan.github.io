// Edit this file to update the site. See README.md for examples.
window.SITE = {
  email: "michiganpermias@gmail.com",
  instagram: "https://www.instagram.com/indonesia.umich/",
  linkedin: "",

  // Optional Google Form links. When set, these replace the email options.
  joinForm: "",
  alumniForm: "",

  // Only list alumni who agreed to appear on this public website.
  // Format: { name: "Name", year: "2024", field: "Public Policy", role: "Analyst, Company", city: "Jakarta", linkedin: "https://..." }
  alumni: [],

  // Photos that fade in and out at the top of the homepage. Leave empty to show only the batik pattern.
  heroPhotos: [
    { src: "assets/events/icf-2026/hero.jpg", pos: "60% 60%" },
    { src: "assets/events/welcome-party/group.jpg", pos: "50% 62%" },
    { src: "assets/events/batik-day/setup.jpg", pos: "60% 50%" },
    { src: "assets/events/icf-2026/ballroom.jpg", pos: "50% 50%" }
  ],

  // Only list people who agreed to appear on a public website.
  // Add a section for each department, in the order you want them shown.
  // Optional profile fields: pronouns, bio, undergrad, clubs: ["Club name"], linkedin.
  departments: [
    {
      name: "Leadership",
      about: "",
      people: [
        { name: "Raffi", photo: "assets/team/raffi.jpg", role: "President", degree: "M.S.E. in Naval Architecture and Marine Engineering, 2027", interests: "Sustainable maritime energy", upFor: "Playing cards and board games", food: "Ayam Geprek" },
        { name: "Zulio", photo: "assets/team/zulio.jpg", role: "Vice President", degree: "Master of Public Policy, 2027", interests: "Behavioral science and decision-making, mental health, poverty and inequality, and international development", upFor: "Reading, walking, and poetry and fiction writing", food: "Sate Ayam Madura" }
      ]
    },
    {
      name: "Chief of Staff",
      about: "",
      people: [
        { name: "Fian", photo: "assets/team/fian.jpg", role: "Chief of Staff", degree: "M.Eng. in Automotive Engineering, 2026", interests: "Automotive powertrain and safety design, and the stock exchange", upFor: "Sports, e-Football, and hiking", food: "Seruit" },
        { name: "Sarah", photo: "assets/team/sarah.jpg", role: "Assistant Chief of Staff", degree: "Master of Business Administration, 2027", interests: "", upFor: "Reading and journaling", food: "Pempek" }
      ]
    },
    {
      name: "Treasury",
      about: "",
      people: [
        { name: "Kayla", photo: "assets/team/kayla.jpg", role: "Treasurer", degree: "B.S.E. in Chemical Engineering, 2029", interests: "Process optimization, machine learning, and metals", upFor: "Playing guitar and piano, taekwondo, and watching movies", food: "Rujak Cingur" },
        { name: "Bryan", photo: "assets/team/bryan.jpg", role: "Assistant Treasurer", degree: "Master of Public Policy, 2027", interests: "", upFor: "Solo traveling", food: "Ayam Geprek" }
      ]
    },
    {
      name: "Creative",
      about: "Creative direction, visual identity, and publications.",
      people: [
        { name: "Beatrice", photo: "assets/team/beatrice.jpg", role: "Director, Creative Department", degree: "Master of Social Work, 2026", interests: "", upFor: "Playing games and traveling", food: "Bakmi Ayam" }
      ]
    },
    {
      name: "Procurement & Inventory",
      about: "Venues, equipment, and event logistics.",
      people: [
        { name: "Puspita", photo: "assets/team/puspita.jpg", role: "Chief of Procurement & Inventory", degree: "M.S. in Sustainability and Environment (Geospatial Data Sciences), 2027", interests: "Geospatial applications in urban sustainability, environmental justice, and climate resilience", upFor: "Pottery, swimming, reading depressing novels, and collecting vinyls", food: "Tahu and Tempe" },
        { name: "Sophie", photo: "assets/team/sophie.jpg", role: "Assistant Chief of Procurement & Inventory", degree: "B.S.E. in Industrial and Operations Engineering, 2029", interests: "", upFor: "Baking, swimming, and going on walks", food: "Nasi Timbel" }
      ]
    },
    {
      name: "Internal Department",
      about: "Member bonding, new student support, and professional development.",
      people: [
        { name: "Cita", photo: "assets/team/cita.jpg", role: "Director", degree: "M.S.E. in Construction Engineering & Management, 2027", interests: "", upFor: "Playing badminton", food: "Bakso, Sate Madura, and Siomay" },
        { name: "Adli", photo: "assets/team/adli.jpg", role: "Co-Director", degree: "Master of Public Policy, 2027", interests: "", upFor: "Dancing, traveling, and running", food: "Sate" }
      ]
    },
    {
      name: "External Department",
      about: "Public relations, alumni and partner relationships, and cultural events.",
      people: [
        { name: "Nathanael", photo: "assets/team/nathanael.jpg", role: "Director", degree: "Master of Public Health in Health Management and Policy, 2027", interests: "", upFor: "Playing tennis and the gym", food: "Nasi Padang" },
        { name: "Hemas", photo: "assets/team/hemas.jpg", pronouns: "She/Her/Hers", bio: "Born and raised in Indonesia, Hemas earned a degree in Agribusiness and spent eight years at Indonesia's largest bank, working across operations transformation, customer experience, performance, and strategy.", undergrad: "Sebelas Maret University", clubs: ["General Management Club", "Human Capital Club", "Michigan Business Women - MBA", "Asian American Business Association", "Southeast Asia Business Association", "Detroit Initiative at Ross"], role: "Co-Director", degree: "Master of Business Administration, 2027", interests: "Digital transformation, strategy, and operations", upFor: "Golfing", food: "Nasi Goreng" },
        { name: "Viola", photo: "assets/team/viola.jpg", role: "Co-Director", degree: "B.S.E. in Computer Engineering, 2028", interests: "Software, data science, and machine learning/AI", upFor: "Learning new sports and instruments", food: "Babi Panggang Karo" }
      ]
    }
  ],
  members: [
    // { name: "Name", major: "Computer Science", year: "2028", photo: "assets/team/name.jpg" }
  ],

  // Add every event here. The site uses "date" to show it as upcoming or past.
  // Use the last day of the event in YYYY-MM-DD format.
  events: [
    {
      id: "natw", date: "2026-11-12", category: "Cultural event",
      title: "Night Around the World (NATW)",
      dateLabel: "November 12, 2026",
      venue: "The Diag",
      summary: "Visit the PERMIAS batik booth at Night Around the World on the Diag.",
      overview: ["PERMIAS will open a batik booth at Night Around the World. Come say hello and experience batik with us."],
      highlights: ["PERMIAS batik booth"],
      photos: [],
      links: [{ label: "See the event on Instagram", url: "https://www.instagram.com/p/De9nCp8Rh21/" }]
    },
    {
      id: "batik-day", date: "2026-10-22", category: "Cultural event",
      title: "Batik Day",
      theme: "Batik Experience: Wear the Story of Indonesia",
      dateLabel: "October 22, 2026, 12 to 2 pm",
      venue: "The Diag",
      summary: "Batik on the Diag, with a pattern display, try-ons, and a photo booth.",
      overview: [
        "We brought batik to the Diag so the U-M community could learn its stories, try it on, and take a piece of Indonesia home in a photo.",
        "Batik is more than a fabric. Its patterns carry the history and identity of communities across Indonesia, and UNESCO has recognized Indonesian batik as intangible cultural heritage since 2009."
      ],
      highlights: ["Open to everyone at U-M", "Batik fabric samples", "Map of batik across Indonesia", "Try-ons", "Photo booth", "Rewards for joining in"],
      scheduleTitle: "How it worked",
      scheduleStart: 0,
      schedule: [
        { when: "Step 1", title: "Discover batik", where: "At the display table", text: "Fabric samples, pattern photos, and a batik map of Indonesia introduced batik's history and regional diversity.", photo: "assets/events/batik-day/map.jpg" },
        { when: "Step 2", title: "Experience batik", where: "At the clothing rack", text: "Visitors could examine the fabrics, hear about each piece from our volunteers, and try on batik clothing.", photo: "assets/events/batik-day/display.jpg" },
        { when: "Step 3", title: "Capture the moment", where: "At the photo booth", text: "Guests took photos in batik with our custom frame and received a small reward for joining in.", photo: "assets/events/batik-day/setup.jpg" }
      ],
      photos: [
        { src: "assets/events/batik-day/setup.jpg", caption: "Setting up on the Diag" },
        { src: "assets/events/batik-day/display.jpg", caption: "Learning about batik at the display table" },
        { src: "assets/events/batik-day/map.jpg", caption: "Batik throughout Indonesia" },
        { src: "assets/events/batik-day/team.jpg", caption: "The team on the Diag" }
      ],
      links: [{ label: "Explore the interactive batik map", url: "https://www.iwarebatik.org/interactive-map/?lang=id" }]
    },
    {
      id: "fall-prof-dev", date: "2026-10-25", featured: true, cardPos: "center 63%", category: "Internal event",
      title: "Professional Development Program: Building Your Career",
      theme: "Real stories and career advice from Indonesians working in the US",
      dateLabel: "October 25, 2026, 2 pm",
      venue: "Munger Residence, Multimedia Room (Lower Lobby)",
      summary: "Career stories and advice from two Indonesians working in the U.S.",
      overview: ["Two guest speakers shared their career paths and talked with students about career opportunities in the U.S."],
      speakers: [
        { name: "Hari Budi", role: "Delivery Vehicle Preparation Specialist at Tesla", url: "https://www.linkedin.com/in/hari-budi-7120901b9" },
        { name: "Muhammad Siddiq", role: "Geotechnical Engineer at Soils & Structures, U-M Class of 2026", url: "https://www.linkedin.com/in/muhammad-siddiq-abdulloh" }
      ],
      photos: [
        { src: "assets/events/prof-dev/poster.jpg", caption: "Event poster" },
        { src: "assets/events/prof-dev/session.jpg", caption: "Talking careers at Munger Residence" }
      ],
      links: []
    },
    {
      id: "welcome-party-2026", date: "2026-09-05", category: "Internal event", cardPos: "center 62%",
      title: "Fall 2026 Welcome Party",
      theme: "Welcome to Fall 2026, Wolverines!",
      dateLabel: "September 5, 2026, 3 to 6 pm",
      venue: "Nichols Arboretum Picnic Area",
      summary: "A potluck picnic to welcome new and returning students after the first week of classes.",
      overview: ["New and returning students took a break after the first week of classes for a potluck picnic in the Arb, with good food, new friendships, and stories about life at U-M and in Ann Arbor."],
      highlights: ["Potluck picnic", "Open to new and current students", "Meeting fellow Indonesian students"],
      photos: [
        { src: "assets/events/welcome-party/group.jpg", caption: "Together at the Arb" },
        { src: "assets/events/welcome-party/group-2.jpg", caption: "Welcoming a new semester" }
      ],
      links: []
    },
    {
      id: "icf-2026", date: "2026-04-03", cardDate: "20 March to 3 April 2026", category: "Cultural event",
      title: "Indonesian Cultural Festival 2026",
      theme: "Islands of Rhythm, Oceans of Stories: Experience Indonesia",
      dateLabel: "March 20 to April 3, 2026",
      venue: "Weiser Hall, International House Ann Arbor, and Michigan League Ballroom",
      summary: "A month of film, music, batik, and photography, ending with Festival Night.",
      overview: ["A month of film, angklung, batik, and photography, ending with a Festival Night of gamelan, traditional dance, live music, and Indonesian food."],
      highlights: [
        "Welcoming remarks from Ambassador Soesilo", "Gamelan Kyai Telaga Madu", "Traditional dances", "Live band", "Hands-on batik"
      ],
      schedule: [
        { when: "March 20", title: "Photography Contest", where: "Submission deadline", text: "Photos exploring cultural identity, traditions, and heritage within the U-M community." },
        { when: "March 27", title: "Indonesian Movie Screening", where: "Weiser Hall, Room 110, 5 to 7 pm", text: "A screening of Gundala (2019), the superhero film directed by Joko Anwar and based on the classic Indonesian comic." },
        { when: "March 28", title: "Angklung Musical Workshop", where: "International House Ann Arbor, 2 to 3 pm", text: "A hands-on introduction to angklung, the bamboo instrument from West Java." },
        { when: "April 2", title: "Batik Coloring Workshop", where: "Weiser Hall, 3 to 5 pm", text: "Guests learned about wax-resist batik and made their own designs to take home." },
        { when: "April 3", title: "Festival Night", where: "Michigan League Ballroom, 5 to 8 pm", text: "Gamelan, traditional dance, live music, games, and a shared Indonesian dinner." }
      ],
      quote: { text: "You are not only students; you are cultural ambassadors of Indonesia.", by: "Dwisuryo Indroyono Soesilo, Indonesian Ambassador to the U.S. and U-M alum" },
      photos: [
        { src: "assets/events/icf-2026/on-stage.jpg", caption: "On stage at Festival Night" },
        { src: "assets/events/icf-2026/festival-stage.jpg", caption: "The Festival Night stage" },
        { src: "assets/events/icf-2026/ballroom.jpg", caption: "A full Michigan League Ballroom" },
        { src: "assets/events/icf-2026/dancing.jpg", caption: "Dancing together on stage" },
        { src: "assets/events/icf-2026/live-music.jpg", caption: "Live music at Festival Night" },
        { src: "assets/events/icf-2026/welcome.jpg", caption: "Remarks from the Festival Night stage" },
        { src: "assets/events/icf-2026/guests.jpg", caption: "Guests dressed in batik" },
        { src: "assets/events/icf-2026/backdrop.jpg", caption: "At the festival photo backdrop" },
        { src: "assets/events/icf-2026/gathering.jpg", caption: "Guests gathering outside the ballroom" },
        { src: "assets/events/icf-2026/crowd.jpg", caption: "The view from the back of the room" }
      ],
      links: [
        { label: "Read about the Ambassador's visit", url: "https://prod.lsa.umich.edu/content/ii-directory/cseas/en/news-events/news/search-news/indonesian-ambassador-and-consulate-general-visit-michigan-for-i.html" },
        { label: "See the U-M event listing", url: "https://events.umich.edu/event/146309" }
      ]
    }
  ]
};
