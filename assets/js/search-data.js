// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications on AI for science, quantum machine learning, multilingual vision-language models, and distributed AI systems.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Selected research systems and things I have built.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Experience, education, selected projects, awards, and technical background.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-posters-i-liked-at-icml-2026",
        
          title: "Posters I liked at ICML 2026",
        
        description: "A curated gallery of 114 research posters that caught my eye on the floor at ICML 2026 in Seoul, South Korea.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/icml-2026-posters/";
          
        },
      },{id: "post-death-of-happiness",
        
          title: "Death of Happiness",
        
        description: "A small moment during pooja that left me thinking for hours",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/death-of-happiness/";
          
        },
      },{id: "post-reflections-on-2025",
        
          title: "Reflections on 2025",
        
        description: "My very first blog - a look back at an incredible year",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/reflections-on-2025/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-won-the-amd-pervasive-ai-hackathon-in-the-robotics-ai-category-and-received-an-amd-kria-kr260-fpga",
          title: 'Won the AMD Pervasive AI Hackathon in the Robotics AI Category and received...',
          description: "",
          section: "News",},{id: "news-manimator-featured-as-hugging-face-space-of-the-week-and-reached-15-000-uses-within-a-week-star",
          title: 'Manimator featured as Hugging Face Space of the Week and reached 15,000+ uses...',
          description: "",
          section: "News",},{id: "news-awarded-the-100-000-meta-llama-impact-grant-for-advancing-multilingual-genai-with-the-nayana-project-tada",
          title: 'Awarded the $100,000 Meta Llama Impact Grant for advancing multilingual GenAI with the...',
          description: "",
          section: "News",},{id: "news-our-work-on-nayana-was-accepted-at-workshops-co-located-with-naacl-2025-cvpr-2025-and-iccv-2025",
          title: 'Our work on Nayana was accepted at workshops co-located with NAACL 2025, CVPR...',
          description: "",
          section: "News",},{id: "news-the-gemma-sutras-and-manimator-were-accepted-at-workshops-co-located-with-emnlp-2025-and-icml-2025",
          title: 'The Gemma Sutras and Manimator were accepted at workshops co-located with EMNLP 2025...',
          description: "",
          section: "News",},{id: "news-our-paper-mudra-vlm-on-bharatanatyam-mudra-recognition-accepted-at-iccv-25-workshop",
          title: 'Our paper Mudra-VLM on Bharatanatyam mudra recognition accepted at ICCV ‘25 workshop! 🎭...',
          description: "",
          section: "News",},{id: "news-joined-ibm-research-india-as-a-quantum-research-intern-working-on-agentic-and-retrieval-augmented-tools-for-quantum-computing-workflows",
          title: 'Joined IBM Research India as a Quantum Research Intern, working on agentic and...',
          description: "",
          section: "News",},{id: "news-presented-benchmarking-the-quantum-frontier-at-the-5th-international-conference-on-ai-ml-systems",
          title: 'Presented Benchmarking the Quantum Frontier at the 5th International Conference on AI-ML Systems....',
          description: "",
          section: "News",},{id: "news-joined-the-advanced-reasoning-team-at-microsoft-research-india-to-work-on-reinforcement-learning-synthetic-environments-and-tool-using-language-models",
          title: 'Joined the Advanced Reasoning team at Microsoft Research India to work on reinforcement...',
          description: "",
          section: "News",},{id: "news-earthinfer-our-work-on-agentic-reasoning-over-satellite-imagery-was-accepted-at-the-wacv-2026-cv4eo-workshop",
          title: 'EarthInfer, our work on agentic reasoning over satellite imagery, was accepted at the...',
          description: "",
          section: "News",},{id: "news-hypercluster-was-published-at-dais-2026-following-a-poster-presentation-at-the-aaai-2026-ml4wireless-workshop",
          title: 'HyperCluster was published at DAIS 2026, following a poster presentation at the AAAI...',
          description: "",
          section: "News",},{id: "news-presented-reviewarena-as-a-spotlight-paper-and-contributed-talk-at-the-icml-2026-ai-for-science-workshop-in-seoul",
          title: 'Presented ReviewArena as a Spotlight paper and contributed talk at the ICML 2026...',
          description: "",
          section: "News",},{id: "news-joined-ibm-research-as-a-research-engineer-in-the-algorithms-and-applications-team-working-on-ai-and-quantum-algorithms-for-science",
          title: 'Joined IBM Research as a Research Engineer in the Algorithms and Applications team,...',
          description: "",
          section: "News",},{id: "projects-earthinfer",
          title: 'EarthInfer',
          description: "Agentic reasoning with dynamically generated modalities for Earth observation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/earthinfer/";
            },},{id: "projects-emostream",
          title: 'EmoStream',
          description: "Real-time emoji streaming and visualization system using Kafka and Spark",
          section: "Projects",handler: () => {
              window.location.href = "/projects/emostream/";
            },},{id: "projects-the-gemma-sutras",
          title: 'The Gemma Sutras',
          description: "Fine-tuning Gemma 3 for Sanskrit Sandhi Splitting",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gemma-sutras/";
            },},{id: "projects-hypercluster",
          title: 'HyperCluster',
          description: "Decentralized LLM inference across a self-organizing peer-to-peer device cluster",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hypercluster/";
            },},{id: "projects-kissandial",
          title: 'KissanDial',
          description: "Voice call-based AI agent assistant for farmers",
          section: "Projects",handler: () => {
              window.location.href = "/projects/kissandial/";
            },},{id: "projects-manimator",
          title: 'manimator',
          description: "AI-powered tool to transform research papers into animated visual explanations",
          section: "Projects",handler: () => {
              window.location.href = "/projects/manimator/";
            },},{id: "projects-mudra-vlm",
          title: 'Mudra-VLM',
          description: "Vision-Language Models for Bharatanatyam mudra recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mudra-vlm/";
            },},{id: "projects-nayana-amp-synthdoc",
          title: 'Nayana &amp;amp; SynthDoc',
          description: "Document-centric vision-language models and synthetic data across 22 languages",
          section: "Projects",handler: () => {
              window.location.href = "/projects/nayana/";
            },},{id: "projects-reviewarena",
          title: 'ReviewArena',
          description: "A large-scale cross-conference dataset and benchmark for LLM peer review",
          section: "Projects",handler: () => {
              window.location.href = "/projects/reviewarena/";
            },},{id: "projects-smartguardian",
          title: 'SmartGuardian',
          description: "Autonomous car system combining IoT with AI for remote control and monitoring",
          section: "Projects",handler: () => {
              window.location.href = "/projects/smartguardian/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%61%6D%61%72%74%68%70%72%61%6B%61%73%68%38@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/samarth777", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/samarth-prakash", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=q1o7V-wAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
