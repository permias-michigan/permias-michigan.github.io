// Edit this file to update the site. See README.md for examples.
window.SITE = {
  email: "rissaa@umich.edu", // Confirm this is the current org email.
  instagram: "",             // Paste a full link, and the site shows it.
  linkedin: "",

  // Optional big photo for the top of the homepage, such as:
  // heroPhoto: "assets/events/icf-2026/festival-night.jpg"
  // Leave it empty to show the live batik pattern instead.
  heroPhoto: "assets/events/icf-2026/hero.jpg",

  // Only list people who agreed to appear on a public website.
  // Add a section for each department, in the order you want them shown.
  departments: [
    {
      name: "Board",
      about: "Select anyone to read their profile.",
      people: [
        { name: "Adli", photo: "assets/team/adli.jpg", role: "", degree: "Master of Public Policy, 2027", interests: "", upFor: "Dancing, traveling, and running", food: "Sate" },
        { name: "Beatrice", photo: "assets/team/beatrice.jpg", role: "Director, Creative Department", degree: "Master of Social Work, 2026", interests: "", upFor: "Playing games and traveling", food: "Bakmi Ayam" },
        { name: "Bryan", photo: "assets/team/bryan.jpg", role: "", degree: "Master of Public Policy, 2027", interests: "", upFor: "Solo traveling", food: "Ayam Geprek" },
        { name: "Cita", photo: "assets/team/cita.jpg", role: "", degree: "M.S.E. in Construction Engineering & Management, 2027", interests: "", upFor: "Playing badminton", food: "Bakso, Sate Madura, and Siomay" },
        { name: "Fian", photo: "assets/team/fian.jpg", role: "", degree: "M.Eng. in Automotive Engineering, 2026", interests: "Automotive powertrain and safety design, and the stock exchange", upFor: "Sports, e-Football, and hiking", food: "Seruit" },
        { name: "Hemas", photo: "assets/team/hemas.jpg", role: "", degree: "Master of Business Administration, 2027", interests: "Digital transformation, strategy, and operations", upFor: "Golfing", food: "Nasi Goreng" },
        { name: "Kayla", photo: "assets/team/kayla.jpg", role: "", degree: "B.S.E. in Chemical Engineering, 2029", interests: "Process optimization, machine learning, and metals", upFor: "Playing guitar and piano, taekwondo, and watching movies", food: "Rujak Cingur" },
        { name: "Nathanael", photo: "assets/team/nathanael.jpg", role: "", degree: "Master of Public Health in Health Management and Policy, 2027", interests: "", upFor: "Playing tennis and the gym", food: "Nasi Padang" },
        { name: "Raffi", photo: "assets/team/raffi.jpg", role: "", degree: "M.S.E. in Naval Architecture and Marine Engineering, 2027", interests: "Sustainable maritime energy", upFor: "Playing cards and board games", food: "Ayam Geprek" },
        { name: "Sarah", photo: "assets/team/sarah.jpg", role: "", degree: "Master of Business Administration, 2027", interests: "", upFor: "Reading and journaling", food: "Pempek" },
        { name: "Sophie", photo: "assets/team/sophie.jpg", role: "", degree: "B.S.E. in Industrial and Operations Engineering, 2029", interests: "", upFor: "Baking, swimming, and going on walks", food: "Nasi Timbel" },
        { name: "Viola", photo: "assets/team/viola.jpg", role: "Public Relations Officer", degree: "B.S.E. in Computer Engineering, 2028", interests: "Software, data science, and machine learning/AI", upFor: "Learning new sports and instruments", food: "Babi Panggang Karo" },
        { name: "Zulio", photo: "assets/team/zulio.jpg", role: "", degree: "Master of Public Policy, 2027", interests: "Behavioral science and decision-making, mental health, poverty and inequality, and international development", upFor: "Reading, walking, and poetry and fiction writing", food: "Sate Ayam Madura" }
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
      // Add the real date and details. The date below only sets its place in the list.
      id: "batik-day", date: "2026-10-02", dateUnconfirmed: true,
      title: "Batik Day",
      summary: "A community celebration of batik, a traditional Indonesian art.",
      overview: ["A community celebration of batik, a traditional Indonesian art."],
      highlights: [],
      photos: [],
      links: []
    },
    {
      // Add the real date and details. The date below only sets its place in the list.
      id: "fall-prof-dev", date: "2026-10-01", dateUnconfirmed: true,
      title: "Fall Prof & Dev Program",
      summary: "Details coming soon.",
      overview: [],
      highlights: [],
      photos: [],
      links: []
    },
    {
      id: "icf-2026", date: "2026-04-03", featured: true,
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
