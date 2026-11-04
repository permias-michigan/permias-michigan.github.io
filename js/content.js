// Edit this file to update the site. See README.md for examples.
window.SITE = {
  email: "rissaa@umich.edu", // Confirm this is the current org email.
  instagram: "",             // Paste a full link, and the site shows it.
  linkedin: "",

  // Only list people who agreed to appear on a public website.
  team: [
    { name: "Viola", role: "Public Relations Officer", major: "Computer Engineering", bio: "", photo: "", linkedin: "" }
    // Add the rest of the team here, one line per person.
  ],
  members: [
    // { name: "Name", major: "Computer Science", year: "2028", photo: "assets/team/name.jpg" }
  ],

  // Add every event here. The site uses "date" to show it as upcoming or past.
  // Use the last day of the event in YYYY-MM-DD format.
  events: [
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
        { when: "March 20", title: "Photography Contest", where: "Submission deadline" },
        { when: "March 27", title: "Indonesian Movie Screening", where: "Weiser Hall, Room 110, 5 to 7 pm" },
        { when: "March 28", title: "Angklung Musical Workshop", where: "International House Ann Arbor, 2 to 3 pm" },
        { when: "April 2", title: "Batik Coloring Workshop", where: "Weiser Hall, 3 to 5 pm" },
        { when: "April 3", title: "Festival Night", where: "Michigan League Ballroom, 5 to 8 pm" }
      ],
      quote: { text: "You are not only students; you are cultural ambassadors of Indonesia.", by: "Dwisuryo Indroyono Soesilo, Indonesian Ambassador to the U.S. and U-M alum" },
      photos: [
        // { src: "assets/events/icf-2026/festival-night.jpg", caption: "Festival Night" }
      ],
      links: [
        { label: "Read about the Ambassador's visit", url: "https://prod.lsa.umich.edu/content/ii-directory/cseas/en/news-events/news/search-news/indonesian-ambassador-and-consulate-general-visit-michigan-for-i.html" },
        { label: "See the U-M event listing", url: "https://events.umich.edu/event/146309" }
      ]
    },
    {
      id: "icn-2025", date: "2025-03-22",
      title: "Indonesian Cultural Night 2025",
      theme: "Rhythms of Archipelago: The Face of Indonesia",
      dateLabel: "March 22, 2025",
      summary: "Gamelan, traditional dances, a costume contest, and a play about RA Kartini.",
      overview: ["This annual showcase combined music, dance, and theater, including a play about RA Kartini's advocacy for women's education and why it still matters today."],
      highlights: ["Gamelan music", "Ratoe Jaroh, Sajojo, and Balinese dances", "A contest for audience members wearing their own traditional costumes"],
      photos: [],
      links: [{ label: "See the Arts at Michigan listing", url: "https://artsatmichigan.umich.edu/studentorgs/directory/view.php?id=519" }]
    },
    {
      id: "icn-2024", date: "2024-04-13",
      title: "Indonesian Cultural Night 2024",
      dateLabel: "April 13, 2024",
      summary: "A comedic folktale performance, trivia, traditional instruments, and free Indonesian food.",
      overview: ["This cultural showcase introduced the U-M community to Indonesia through a humorous take on a traditional folktale."],
      highlights: ["A comedic Indonesian folktale performance", "An interactive Indonesian trivia game", "Traditional instrument performance", "Free Indonesian food"],
      photos: [],
      links: [{ label: "See the Arts at Michigan listing", url: "https://artsatmichigan.umich.edu/studentorgs/directory/view.php?id=519" }]
    },
    {
      id: "icn-2023", date: "2023-04-01",
      title: "Indonesian Cultural Night 2023",
      theme: "Majapahit",
      dateLabel: "April 1, 2023",
      summary: "Dances, plays, and traditional food. Tickets sold out within a week.",
      overview: ["Inspired by the ancient Majapahit kingdom, this night celebrated the culture and traditions of the Indonesian archipelago. Tickets sold out within a week, and guests came from outside Ann Arbor."],
      highlights: ["Dramas based on local folktales", "Instrumental performances", "Traditional dances from several regions", "Indonesian food at intermission"],
      photos: [],
      links: [{ label: "Read the event recap", url: "https://prod.lsa.umich.edu/content/ii-directory/islamicstudies/en/news-events/news/search-news/recap-icn-2023.html" }]
    },
    {
      id: "icn-2018", date: "2018-03-09",
      title: "Indonesian Cultural Night 2018",
      theme: "Dari Sabang Sampai Merauke",
      dateLabel: "March 9, 2018",
      summary: "Student dramas, music, and dances celebrating Indonesia's multiculturalism.",
      overview: ["Students of all arts backgrounds performed in a program celebrating Indonesia's multiculturalism, from Sabang to Merauke. Audience members were invited to dance and sing with the performers."],
      highlights: ["Dramas based on local folktales", "Instrumental performances", "Dances from several regions", "Indonesian food after the show"],
      photos: [],
      links: [{ label: "See the U-M event listing", url: "https://events.umich.edu/event/50477" }]
    },
    {
      id: "icn-2017", date: "2017-02-18",
      title: "Indonesian Cultural Night 2017",
      dateLabel: "February 2017",
      venue: "Rackham Auditorium",
      summary: "More than 200 people gathered for speakers, performances, and dance.",
      overview: ["More than 200 students and community members came to Rackham Auditorium for a public celebration of Indonesian culture, with performers from several nationalities."],
      highlights: ["Traditional dances and songs", "An orchestra performance", "Traditional food"],
      photos: [],
      links: [{ label: "See the U-M event listing", url: "https://events.umich.edu/event/38988" }]
    }
  ]
};
