export const ME = {
  name: "Adéla Polková",
  title: "Software Engineering Student",
  location: "Bzenec, Czech Republic",
  phone: "+420 736 417 100",
  email: "adelka.polkova@gmail.com",
  github: "https://github.com/apolkova",
  linkedin:
    "https://www.linkedin.com/in/ad%C3%A9la-polkov%C3%A1-642144382/",
};

export const ABOUT_ME = `I'm a 24-year-old software engineering student from the Czech Republic, currently learning how to turn coffee, bugs, and questionable life choices into working code.

I chose software engineering because it combines creativity, problem-solving, and the possibility of building the kind of life I want — ideally one with a good job, plenty of freedom, and fewer error messages.

I enjoy learning new things, solving problems, and pretending I knew the solution all along. When I'm not coding, you'll usually find me traveling, gaming, or occasionally reading a good book to prove that I still have hobbies away from a screen.

I'm excited to explore the world, meet new people, and see where life — and my debugging skills — take me.`;

export const INTERESTS = {
  hobbies: [
    "Traveling",
    "Gaming",
    "Reading",
    "Creative problem-solving",
  ],

  interests: [
    "Backend development",
    "Applied machine learning",
    "Natural-language interfaces",
    "Computer vision",
    "Cybersecurity fundamentals",
  ],
};


export const WIDGETS = {
  profile: {
    image: "assets/gallery/profile2.JPEG",
    title: "Hi, I'm Adél",
    text:
      "Welcome to my portfolio. Open some files and have a look around! 0:)",
  },

  stickyNote: {
    title: "Reminder",
    items: [
      {
        text: "Finish portfolio",
        completed: true,
      },
      {
        text: "Drink water",
        completed: false,
      },
      {
        text: "Get hired",
        completed: false,
      }
    ],
  },

  nowPlaying: {
    title: "Now Playing",

    songs: [
      {
        title: "Cherry Pie",
        artist: "Warrant",
        duration: 201,
        cover: "assets/music/cherrypie.jpg",
      },
      {
        title: "Self Aware",
        artist: "Temper City",
        duration: 205,
        cover: "assets/music/selfaware.jpg",
      },
      {
        title: "Planeta",
        artist: "Bispo & Bárbara Tinoco",
        duration: 216,
        cover: "assets/music/planeta.jpg",
      },
      {
        title: "Eternity",
        artist: "Alex Warren",
        duration: 180,
        cover: "assets/music/eternity.jpg",
      },
      {
        title: "Wonderwall",
        artist: "Oasis",
        duration: 258,
        cover: "assets/music/wonderwall.jpg",
      },
      {
        title: "Est-ce que tu m’aimes?",
        artist: "GIMS",
        duration: 237,
        cover: "assets/music/estcetumaimes.jpg",
      },
      {
        title: "Skin and Bones",
        artist: "David Kushner",
        duration: 214,
        cover: "assets/music/skinandbones.jpg",
      },
    ],
  },

  thoughts: [
    "It works on my machine.",
    "One more small change...",
    "This bug has become personal.",
    "Sleep schedule currently in beta.",
    "Quick side project — famous last words.",
    "Currently powered by coffee and stubbornness.",
    "No bugs, only unexpected features.",
  ],
};



export const DESKTOP_README = {
  title: "README.md",

  introduction:
    "Welcome to my interactive desktop portfolio. This website behaves like a small desktop operating system: open files, explore project folders, drag windows, and use the menu bar or dock to navigate.",

  sections: [
    {
      title: "How to use it",

      items: [
        "Double-click desktop icons to open them.",
        "Drag icons and windows to rearrange the desktop.",
        "Use File for quick access to content.",
        "Use Edit to copy contact links or reset the layout.",
        "Use View to show or hide important files, projects, and the dock.",
        "Use Window to manage currently open windows.",
        "Use Help to reopen this guide or view keyboard shortcuts.",
      ],
    },
    {
      title: "Project structure",

      items: [
        "index.html contains semantic structure and SVG icon templates.",
        "css/style.css contains all presentation rules.",
        "js/data.js stores personal content and project data.",
        "js/script.js contains desktop, menu, Notes, and window behavior.",
        "assets contains optional images and gallery content.",
      ],
    },
  ],
};

export const CV = {
  headline: ME.title,

  summary:
    "Computer Engineering student specializing in backend development, applied machine learning, and natural-language-to-SQL systems. Currently completing an Erasmus internship at INESC TEC, building a local-first NL-to-SQL pipeline with FastAPI, LangGraph, and Ollama for a manufacturing dataset. Seeking a junior software engineer role to apply experience with Python backend systems, LLM tooling, and database engineering.",

  sections: [
    {
      title: "Experience",

      entries: [
        {
          heading:
            "Research Intern – Natural Language to SQL Translation",

          organization:
            "INESC TEC · Erasmus Internship",

          date: "February - June 2026",

          items: [
            "Built a NL-to-SQL system using RAG and agent-based pipelines.",
            "Worked with LangGraph, ReAct, and a custom orchestrator.",
            "Ran inference locally with Ollama to keep data on-premise.",
          ],
        },
        {
          heading:
            "Computer Vision Application Developer",

          organization:
            "BIP Project · Estonia",

          date: "October 2025",

          items: [
            "Built a desktop computer-vision application for Enefit Industry.",
            "Detected mining safety-protocol violations from camera feeds.",
            "Project evaluated excellent by stakeholders.",
          ],
        },
      ],
    },
    {
      title: "Education",

      entries: [
        {
          heading: "MSc, Software Engineering",

          organization:
            "Tomas Bata University – Faculty of Applied Informatics, Zlín",

          date: "Starting September 2026",

          items: [],
        },
        {
          heading: "Erasmus+ Exchange",

          organization:
            "Polytechnic of Porto, Portugal",

          date: "February 2026 – June 2026",

          items: [],
        },
        {
          heading: "BSc, Software Engineering",

          organization:
            "Tomas Bata University – Faculty of Applied Informatics, Zlín",

          date: "September 2022 – 2025",

          items: [],
        },
        {
          heading: "Erasmus+ Exchange",

          organization:
            "University of Agder, Norway",

          date: "January 2024 – June 2024",

          items: [],
        },
        {
          heading: "Matriculation Exam",

          organization:
            "SHAPE American High School, Belgium",

          date: "September 2021 – June 2022",

          items: [],
        },
        {
          heading: "Secondary School",

          organization:
            "Pavel Tigrid Language Grammar School, Ostrava",

          date: "September 2018 – June 2021",

          items: [],
        },
      ],
    },
    {
      title: "Technical Skills",

      groups: [
        {
          label: "Languages",

          value:
            "Python, Java, C, C++, C#, JavaScript, Kotlin, SQL",
        },
        {
          label: "Frameworks & Libraries",

          value:
            "FastAPI, LangGraph, ASP.NET Core, React, Vue.js",
        },
        {
          label: "Databases & Tools",

          value:
            "SQL Server, Git, Docker, Ollama, Robot Framework",
        },
        {
          label: "Other",

          value:
            "RAG, computer vision, machine learning fundamentals, web scraping",
        },
      ],
    },
    {
      title: "Certifications",

      items: [
        "Certificate in Advanced English — Cambridge Assessment, C1, 2022",
        "DELF A2 — French, 2017",
      ],
    },
    {
      title: "Languages",

      items: [
        "Czech — native",
        "English — C1",
        "French — A2",
      ],
    },
  ],
};

export const NOTES = [
  {
    id: "about",
    label: "About",

    content: {
        eyebrow: "The lore behind the person",
        title: "About Me",

        paragraphs: [
        "So, my dad decided that my name would be Adéla. It was apparently quite a popular name in the year I was born, ngl. And well, that was 24 years ago... almost a quarter of a century. GG.",

        "I have been glued to a computer for as long as I can remember. That is probably one of the reasons I decided to follow the computer-science path as my career 0:). So far, I am genuinely loving the path I chose.",

        "I believe in the butterfly effect — especially after playing Life is Strange and Until Dawn. Also, have you played Dispatch? Contact me immediately if you have. We need to discussssss.",

        "In my free time, you will usually find me at home, glued to my computer, either working on something or playing video games — or, as my parents describe it, screaming at the screen. There is also a chance you will find me fast-and-furiousing through the streets. Legally and responsibly, of course. Obviously.The third option is skincare + bed + movie/TVshow. A flawless combination, honestly.",

        "Oh, and in case you could not tell by now: I am a Taurus. That probably explains the stubbornness, the need for everything to be perfect, and the strong emotional relationship I have with food.",

        "I have also been selected to go to TEXAS, BABY! Yee-haw. I am incredibly excited to experience the famous USA while improving my machine-learning and cybersecurity skills. It is going to be one hell of a ride!",
        ],

        skillsTitle: "I can do...",

        skills: [
        {
            icon: "🧠",
            title: "Machine Learning",
            description:
            "Machine-learning fundamentals, computer vision, local language models, RAG systems, and natural-language interfaces.",
        },
        {
            icon: "🌐",
            title: "Web Development",
            description:
            "Backend services, APIs, databases, responsive websites, and full-stack applications.",
        },
        {
            icon: "📱",
            title: "Applications",
            description:
            "Desktop and mobile applications using technologies such as Kotlin, C#, JavaScript, Java, and Python.",
        },
        {
            icon: "📷",
            title: "Photography",
            description:
            "Travel photography, portraits, visual storytelling, editing, and creative composition.",
        },
        {
            icon: "🔐",
            title: "Cybersecurity",
            description:
            "Cybersecurity fundamentals, networking, safe programming practices, cryptography, and educational security tools.",
        },
        {
            icon: "🎨",
            title: "Creative Work",
            description:
            "Painting, drawing, digital art, interface design, creative coding, and unusual project ideas.",
        },
        {
            icon: "🛠️",
            title: "Problem Solving",
            description:
            "Breaking complicated problems into manageable pieces, testing ideas, fixing bugs, and refusing to give up until things work.",
        },
        {
            icon: "☕",
            title: "Working Too Much",
            description:
            "Turning caffeine, stubbornness, and an unreasonable need for perfection into completed projects.",
        },
        ],

        funFactsTitle: "Fun Facts",

        funFacts: [
        {
            icon: "🔔",
            text:
            "I collect bells. I am deadly serious. I currently own more than 30 of them.",
        },
        {
            icon: "🚗",
            text:
            "I change the tyres on my own car. No man needed 💅",
        },
        {
            icon: "🌍",
            text:
            "I have lived in Belgium, Norway, and Portugal.",
        },
        {
            icon: "👩‍🦰",
            text:
            "I occasionally use my hair colour as an excuse when I do not understand something. It is a strategic decision.",
        },
        {
            icon: "🍫",
            text:
            "When I am stressed, buy me chocolate. Thank you in advance.",
        },
        {
            icon: "😴",
            text:
            "Sleep is for the weak — a statement I usually regret the following morning.",
        },
        {
            icon: "✨",
            text:
            "I need things to be perfect... or else!",
        },
        {
            icon: "🤖",
            text:
            "I love new technology and I am constantly amazed by how far we have come.",
        },
        {
            icon: "⚖️",
            text:
            "Quality over quantity. Always.",
        },
        {
            icon: "🎬",
            text:
            "I am mentally dating Dylan O'Brien. He has not been informed yet.",
        },
        ],
    },
    },

  {
    id: "cv",
    label: "CV",

    content: {
        eyebrow: "A completely serious professional document",
        title: "Please hire me 😭",

        introduction: {
        title: "My extremely convincing application",
        text:
            "Please hire me. I need a job. I am a good person and a good listener, I swear.",
        },

        paragraphs: [
        "Believe it or not, I am also a bit of a workaholic. If I get the job, there is a very real possibility that I will do far too much overtime simply because I need everything to be perfect and I want to prove that hiring me was an excellent decision.",

        "I genuinely cannot let myself do badly at work. Like, literally. My brain would not allow it. I would think about one slightly imperfect task at 2:00 in the morning and then open my laptop to fix it. Hehe.",

        "I learn quickly, care deeply about the quality of my work, and enjoy solving problems. I am also friendly, curious, responsible, and capable of pretending that a mysterious bug has not emotionally affected me.",

        "In conclusion: I bring technical skills, determination, perfectionism, questionable sleeping habits, and a strong desire to be useful.",
        ],

        button: {
        label: "Read my actual CV →",
        action: "cv",
        },
    },
    },

  {
    id: "interests",
    label: "Interests",

    content: {
        eyebrow: "Things I spend my time and money on",
        title: "Hobbies & Interests",

        introduction:
        "I have many hobbies because apparently choosing one personality trait was not enough.",

        groups: [
        {
            title: "Professional screen watcher",
            items: [
            "Watching movies and TV shows like it is a full-time occupation",
            "Gaming — peacefully, until the game gives me a reason not to be peaceful",
            "Reading, whenever my attention span allows it",
            "Coding projects for my own use because existing solutions are sometimes not dramatic enough",
            ],
        },
        {
            title: "Outside activities",
            items: [
            "Traveling and collecting memories, photos, and unnecessary souvenirs",
            "Photography",
            "Going to the gym and pretending I enjoy every exercise",
            "Climbing",
            "Visiting theme parks",
            "Riding every roller coaster available",
            "Being an unapologetic adrenaline junkie",
            "Hopefully riding a motorcycle soon",
            ],
        },
        {
            title: "Creative chaos",
            items: [
            "Junk journaling",
            "Painting",
            "Drawing",
            "Digital art",
            "Photography and photo editing",
            "Organizing things until they look suspiciously perfect",
            ],
        },
        {
            title: "Important lifestyle activities",
            items: [
            "Fooddd!!",
            "Trying restaurants and discovering new food",
            "Skincare 💅",
            "Shopping during sales because paying full price hurts emotionally",
            "Cars",
            "Learning about new technology and being amazed by how far we have come",
            ],
        },
        ],
    },
    },

  {
    id: "bucket-list",
    label: "Bucket List",
    content: {
      eyebrow:
        "Dreams, plans, and questionable ideas",
      title: "Bucket List",

      introduction:
        "Some things are completed. Some are still waiting for the right time, enough courage, or cheaper plane tickets.",

      items: [
        {
          text: "Study abroad",
          completed: true,
        },
        {
          text: "Try climbing",
          completed: true,
        },
        {
          text:
            "Work on an international software project",
          completed: true,
        },
        {
          text: "Visit Morocco",
          completed: true,
        },
        {
          text: "See the northern lights",
          completed: false,
        },
        {
          text: "Visit Asia",
          completed: false,
        },
        {
          text:
            "Take a long train journey across Europe - Denmark",
          completed: false,
        },
        {
          text:
            "HYROX",
          completed: false,
        },
        {
          text: "Learn how to surf",
          completed: false,
        },
        {
          text:
            "Go on a spontaneous trip with no detailed plan",
          completed: false,
        },
        {
          text:
            "Create a photography project from my travels",
          completed: false,
        },
        {
          text:
            'Become confident enough to say "it works on my machine"',
          completed: false,
        },
        {
          text:
            "Visit USA",
          completed: false,
        },
      ],
    },
  },

  {
    id: "contact",
    label: "Contact",
    content: {
      eyebrow: "You found the contact page",
      title: "Contact",

      introduction:
        "Feel free to contact me about software projects, job opportunities, collaborations, photography, travel recommendations, or good coffee.",

      items: [
        {
          icon: "✉️",
          title: "Email",
          value: "adelka.polkova@gmail.com",
          href: "mailto:adelka.polkova@gmail.com",
        },
        {
          icon: "📞",
          title: "Phone",
          value: "+420 736 417 100",
          href: "tel:+420736417100",
        },
        {
          icon: "💻",
          title: "GitHub",
          value: "github.com/apolkova",
          href: "https://github.com/apolkova",
          external: true,
        },
        {
          icon: "💼",
          title: "LinkedIn",
          value: "View my profile",
          href:
            "https://www.linkedin.com/in/ad%C3%A9la-polkov%C3%A1-642144382/",
          external: true,
        },
        {
          icon: "📍",
          title: "Location",
          value: "Bzenec, Czech Republic",
        },
      ],
    },
  },

  {
    id: "bank-info",
    label: "Bank Information",
    locked: true,
    content: {
      eyebrow: "Protected document",
      title: "No access granted",
      text:
        "This information is protected by an extremely advanced security system.",
      message: "Nice try, though.",
      icon: "🔒",
    },
  },
];

export const PROJECTS = [
  {
    name: "WebTesting",

    description:
      "Software testing project featuring organized test sets, manual and automated test cases, keyword-based workflows, hierarchy, and detailed documentation. Webiste that was tested for this porject was www.bzenec.cz",

    technologies: [
      "HTML",
      "Testing",
      "Automation",
    ],

    link:
      "https://github.com/apolkova/WebTesting",
  },


  {
    name: "ELearningPlatform",

    description:
      "An ASP.NET Core e-learning platform for course management, enrollments, modules, learning materials, tests, questions, and role-based student and administrator areas.",

    technologies: [
      "C#",
      "ASP.NET Core",
      "Layered Architecture",
    ],

    link:
      "https://github.com/apolkova/ELearningPlatform",
  },


  {
    name: "Photobooth",

    description:
      "A cross-platform desktop photobooth application built with C++ and Qt 6.",

    technologies: [
      "C++",
      "Qt 6",
      "Qt Multimedia",
      "CMake",
    ],

    link: "https://github.com/apolkova/Photobooth",

    gallery: [
      {
        type: "single",
        src: "assets/projects/photobooth/main-window.png",
        caption: "Main Photobooth application window",
        className: "large-screenshot",
      },
      {
        type: "countdown",
        caption: "Countdown sequence",
        images: [
          "assets/projects/photobooth/countdown-3.png",
          "assets/projects/photobooth/countdown-2.png",
          "assets/projects/photobooth/countdown-1.png",
          "assets/projects/photobooth/countdown-snap.png",
        ],
      },
      {
        type: "single",
        src: "assets/projects/photobooth/photostrip-completed.png",
        caption: "Completed Photobooth window",
        className: "large-screenshot",
      },
      {
        type: "single",
        src: "assets/projects/photobooth/photostrip.png",
        caption: "Completed photo strip",
        className: "photo-strip-image",
      },
    ],
  },
  {
    name: "Movie App",

    description:
      "A mobile movie application that uses a movie API to search titles, display detailed movie information, and manage favorites and a watchlist. This project helped me practice mobile UI design, API integration, and state management.",

    technologies: [
      "Kotlin",
      "Android",
      "Mobile",
      "API Integration",
    ],

    link: "https://github.com/apolkova/movie-app",

    gallery: [
      {
        type: "mosaic",
        caption: "Movie App screens",
        images: [
          {
            src: "assets/projects/movieapp/homepage.png",
            caption: "Home page",
          },
          {
            src: "assets/projects/movieapp/searchpage.png",
            caption: "Movie search",
          },
          {
            src: "assets/projects/movieapp/moviepage.png",
            caption: "Movie detail page",
          },
          {
            src: "assets/projects/movieapp/watchlistpage.png",
            caption: "Watchlist",
          },
          {
            src: "assets/projects/movieapp/favoritepage.png",
            caption: "Favorites",
          },
          {
            src: "assets/projects/movieapp/loading.png",
            caption: "Loading screen",
          },
        ],
      },
    ],
  },
  {
    name: "GYMRAT",

    description:
      "An application for gym users to track progress, organize fitness activity, and receive helpful tips.",

    technologies: [
      "TypeScript",
      "Fitness",
      "Application",
    ],

    link:
      "https://github.com/apolkova/GYMRAT",

  },
  
  
  {
    name: "AstroSphere",

    description:
      "A mobile space-exploration app using NASA API endpoints for astronomy content, asteroid data, and other space-related features. This project gave me the opportunity to try Ionic for the first time and learn how Angular and Capacitor can be used to build a mobile application.",
    technologies: [
      "TypeScript",
      "Angular",
      "Ionic",
      "Capacitor",
      "Mobile App",
    ],

    link: "https://github.com/apolkova/AstroSphere-Vol2",

    gallery: [
      {
        type: "mosaic",
        caption: "AstroSphere app screens",
        images: [
          {
            src: "assets/projects/astrosphere/home.png",
            caption: "Astronomy Picture of the Day",
          },
          {
            src: "assets/projects/astrosphere/news.png",
            caption: "Space News",
          },
          {
            src: "assets/projects/astrosphere/space-quiz.png",
            caption: "Space Quiz",
          },
          {
            src: "assets/projects/astrosphere/asteroids.png",
            caption: "Asteroids NeoWs",
          },
          {
            src: "assets/projects/astrosphere/sidemenu.png",
            caption: "Navigation Menu",
          },
        ],
      },
    ],
  },

  {
    name: "Plastic Bottle Detector",

    description:
      "A desktop computer-vision application for plastic bottle quality control using a custom-trained YOLOv8 model. The app detects the bottle, cap, label, and liquid, then marks the inspection as PASS only when all required components are present. This project gave me practical experience with object detection, dataset preparation, model training, evaluation, and deploying an AI model in a CustomTkinter desktop interface.",

    technologies: [
      "Python",
      "YOLOv8",
      "Ultralytics",
      "OpenCV",
      "CustomTkinter",
      "Computer Vision",
      "Object Detection",
    ],

    link: "https://github.com/apolkova/PlasticBottleDetector",

    gallery: [
      {
        type: "wide-grid",
        caption: "Plastic Bottle Quality Control app",
        images: [
          {
            src: "assets/projects/plastic-bottle-detector/dashboard.png",
            caption: "Quality Control Dashboard",
          },
          {
            src: "assets/projects/plastic-bottle-detector/pass-result.png",
            caption: "Successful PASS Inspection",
          },
          {
            src: "assets/projects/plastic-bottle-detector/failed-result.png",
            caption: "FAILED Inspection",
          },
          {
            src: "assets/projects/plastic-bottle-detector/live-camera.png",
            caption: "Live Camera Detection",
          },
        ],
      },
    ],
  },


  {
    name: "Cryptology",

    description:
      "A collection of educational cryptography applications built in Python with Tkinter. The project explores classical ciphers, public-key encryption, key generation, file signing, and signature verification through separate graphical desktop tools.",

    technologies: [
      "Python",
      "Tkinter",
      "Cryptography",
      "RSA",
      "Digital Signatures",
    ],

    link: "https://github.com/apolkova/Cryptology",

    gallery: [
      {
        type: "single",
        src: "assets/projects/cryptology/affine-cipher.png",
        caption:
          "Affine Cipher — encryption and decryption using user-defined keys",
        className: "large-screenshot",
      },
      {
        type: "single",
        src: "assets/projects/cryptology/playfair-cipher.png",
        caption:
          "Playfair Cipher — keyword matrix, plaintext preparation, encryption, and decryption",
        className: "large-screenshot",
      },
      {
        type: "single",
        src: "assets/projects/cryptology/adfgvx-cipher.png",
        caption:
          "ADFG(X) and ADFGVX Cipher — Polybius square and columnar transposition",
        className: "large-screenshot",
      },
      {
        type: "single",
        src: "assets/projects/cryptology/rsa-cipher.png",
        caption:
          "RSA Cipher — key generation, asymmetric encryption, and decryption",
        className: "large-screenshot",
      },
      {
        type: "single",
        src: "assets/projects/cryptology/digital-signature.png",
        caption:
          "Digital Signature — key loading, file signing, and signature verification",
        className: "large-screenshot",
      },
    ],
  },
];

export const GALLERY = [
  {
    src:
      "assets/gallery/IMG_1619.JPEG",

    caption:
      "Gaudeasmus Brno",
  },
  {
    src:
      "assets/gallery/profile2.JPEG",

    caption:
      "This is me in Marroco",
  },
  {
    src:
      "assets/gallery/IMG_2501.JPEG",

    caption:
      "Gaming everywhere I go",
  },
  {
    src:
      "assets/gallery/IMG_1369.JPEG",

    caption:
      "big collector, love physical memories :)",
  },
  {
    src:
      "assets/gallery/IMG_8258.JPEG",

    caption:
      "egypt",
  },
  {
    src:
      "assets/gallery/IMG_5448.JPEG",

    caption:
      "NO (R) WAY",
  },
  {
    src:
      "assets/gallery/IMG_5406 (1).JPEG",

    caption:
      "always trying something new, yet traditional :p",
  },
  {
    src:
      "assets/gallery/IMG_6038.JPEG",

    caption:
      "azores",
  },
  {
    src:
      "assets/gallery/IMG_7620.JPEG",

    caption:
      "me and my cat ♥",
  },



];