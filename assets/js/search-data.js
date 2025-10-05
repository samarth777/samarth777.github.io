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
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Research publications at top-tier conferences and workshops including NAACL, CVPR, ICCV, ICML, EMNLP, and CODS-COMAD.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "AI/ML projects spanning quantum computing, multilingual AI, distributed systems, and real-world applications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "My GitHub profile and open-source projects including manimator, SynthDoc, HyperCluster, and more.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "My detailed curriculum vitae including education, research experience, publications, projects, and technical skills.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "post-ai-meets-quantum-computing-my-journey-at-ibm-research",
        
          title: "AI Meets Quantum Computing: My Journey at IBM Research",
        
        description: "Building agentic AI systems for quantum computing workflows at IBM Quantum",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/quantum-ai-ibm/";
          
        },
      },{id: "post-the-gemma-sutras-teaching-ai-to-read-sanskrit",
        
          title: "The Gemma Sutras: Teaching AI to Read Sanskrit",
        
        description: "Fine-tuning Gemma 3 for Sanskrit Sandhi Splitting - bridging ancient language with modern AI",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sanskrit-nlp/";
          
        },
      },{id: "post-mudra-vlm-teaching-ai-to-understand-bharatanatyam",
        
          title: "Mudra-VLM: Teaching AI to Understand Bharatanatyam",
        
        description: "Using Vision-Language Models to recognize classical Indian dance gestures",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/mudra-vlm/";
          
        },
      },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/plotly/";
          
        },
      },{id: "post-winning-the-meta-llama-impact-grant-building-multilingual-ai",
        
          title: "Winning the Meta Llama Impact Grant: Building Multilingual AI",
        
        description: "How our work on the Nayana dataset earned a $100,000 Meta Llama Impact Grant and why multilingual AI matters",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/meta-llama-grant/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/photo-gallery/";
          
        },
      },{id: "post-manimator-from-research-papers-to-visual-magic",
        
          title: "Manimator: From Research Papers to Visual Magic",
        
        description: "How we built an AI tool that transforms research papers into animated explanations and reached 15,000+ users in one week",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/manimator-launch/";
          
        },
      },{id: "post-hypercluster-democratizing-llms-through-p2p-computing",
        
          title: "HyperCluster: Democratizing LLMs Through P2P Computing",
        
        description: "Building a peer-to-peer distributed framework for running large language models on consumer hardware",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/distributed-llms/";
          
        },
      },{id: "post-kissandial-bringing-ai-to-rural-india-via-voice-calls",
        
          title: "KissanDial: Bringing AI to Rural India via Voice Calls",
        
        description: "Building a voice-based AI agent to help farmers access critical agricultural information",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/ai-for-farmers/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-a-post-with-tabs",
        
          title: "a post with tabs",
        
        description: "this is what included tabs in a post could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/tabs/";
          
        },
      },{id: "post-a-post-with-typograms",
        
          title: "a post with typograms",
        
        description: "this is what included typograms code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/typograms/";
          
        },
      },{id: "post-a-post-that-can-be-cited",
        
          title: "a post that can be cited",
        
        description: "this is what a post that can be cited looks like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/post-citation/";
          
        },
      },{id: "post-a-post-with-pseudo-code",
        
          title: "a post with pseudo code",
        
        description: "this is what included pseudo code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/pseudocode/";
          
        },
      },{id: "post-a-post-with-code-diff",
        
          title: "a post with code diff",
        
        description: "this is how you can display code diffs",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/code-diff/";
          
        },
      },{id: "post-a-post-with-advanced-image-components",
        
          title: "a post with advanced image components",
        
        description: "this is what advanced image components could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/advanced-images/";
          
        },
      },{id: "post-a-post-with-vega-lite",
        
          title: "a post with vega lite",
        
        description: "this is what included vega lite code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/vega-lite/";
          
        },
      },{id: "post-a-post-with-geojson",
        
          title: "a post with geojson",
        
        description: "this is what included geojson code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/geojson-map/";
          
        },
      },{id: "post-a-post-with-echarts",
        
          title: "a post with echarts",
        
        description: "this is what included echarts code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/echarts/";
          
        },
      },{id: "post-a-post-with-chart-js",
        
          title: "a post with chart.js",
        
        description: "this is what included chart.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/chartjs/";
          
        },
      },{id: "post-a-post-with-tikzjax",
        
          title: "a post with TikZJax",
        
        description: "this is what included TikZ code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tikzjax/";
          
        },
      },{id: "post-a-post-with-bibliography",
        
          title: "a post with bibliography",
        
        description: "an example of a blog post with bibliography",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/post-bibliography/";
          
        },
      },{id: "post-a-post-with-jupyter-notebook",
        
          title: "a post with jupyter notebook",
        
        description: "an example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/jupyter-notebook/";
          
        },
      },{id: "post-a-post-with-custom-blockquotes",
        
          title: "a post with custom blockquotes",
        
        description: "an example of a blog post with custom blockquotes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/custom-blockquotes/";
          
        },
      },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
        
          title: "a post with table of contents on a sidebar",
        
        description: "an example of a blog post with table of contents on a sidebar",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/sidebar-table-of-contents/";
          
        },
      },{id: "post-a-post-with-audios",
        
          title: "a post with audios",
        
        description: "this is what included audios could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/audios/";
          
        },
      },{id: "post-a-post-with-videos",
        
          title: "a post with videos",
        
        description: "this is what included videos could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/videos/";
          
        },
      },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
        
          title: "displaying beautiful tables with Bootstrap Tables",
        
        description: "an example of how to use Bootstrap Tables",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tables/";
          
        },
      },{id: "post-a-post-with-table-of-contents",
        
          title: "a post with table of contents",
        
        description: "an example of a blog post with table of contents",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/table-of-contents/";
          
        },
      },{id: "post-a-post-with-giscus-comments",
        
          title: "a post with giscus comments",
        
        description: "an example of a blog post with giscus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/giscus-comments/";
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "post-a-post-with-redirect",
        
          title: "a post with redirect",
        
        description: "you can also redirect to assets like pdf",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/example_pdf.pdf";
          
        },
      },{id: "post-a-post-with-diagrams",
        
          title: "a post with diagrams",
        
        description: "an example of a blog post with diagrams",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/diagrams/";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/distill/";
          
        },
      },{id: "post-a-post-with-twitter",
        
          title: "a post with twitter",
        
        description: "an example of a blog post with twitter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/twitter/";
          
        },
      },{id: "post-a-post-with-disqus-comments",
        
          title: "a post with disqus comments",
        
        description: "an example of a blog post with disqus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/disqus-comments/";
          
        },
      },{id: "post-a-post-with-math",
        
          title: "a post with math",
        
        description: "an example of a blog post with some math",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/math/";
          
        },
      },{id: "post-a-post-with-code",
        
          title: "a post with code",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/code/";
          
        },
      },{id: "post-a-post-with-images",
        
          title: "a post with images",
        
        description: "this is what included images could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/images/";
          
        },
      },{id: "post-a-post-with-formatting-and-links",
        
          title: "a post with formatting and links",
        
        description: "march &amp; april, looking forward to summer",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/formatting-and-links/";
          
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
          section: "News",},{id: "news-thrilled-to-have-papers-on-nayana-accepted-at-naacl-25-cvpr-25-and-iccv-25-workshops",
          title: 'Thrilled to have papers on Nayana accepted at NAACL ‘25, CVPR ‘25, and...',
          description: "",
          section: "News",},{id: "news-papers-on-sanskrit-nlp-and-manimator-accepted-at-icml-25-and-emnlp-25-workshops",
          title: 'Papers on Sanskrit NLP and Manimator accepted at ICML ‘25 and EMNLP ‘25...',
          description: "",
          section: "News",},{id: "news-our-paper-mudra-vlm-on-bharatanatyam-mudra-recognition-accepted-at-iccv-25-workshop",
          title: 'Our paper Mudra-VLM on Bharatanatyam mudra recognition accepted at ICCV ‘25 workshop! 🎭...',
          description: "",
          section: "News",},{id: "news-excited-to-join-ibm-research-india-as-a-quantum-research-intern-working-on-ai-for-quantum-computing-rocket",
          title: 'Excited to join IBM Research India as a Quantum Research Intern working on...',
          description: "",
          section: "News",},{id: "projects-emostream",
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
          description: "Peer-to-peer distributed framework for deploying quantized LLMs on edge devices",
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
          description: "Synthetic dataset generation for multilingual Vision-Language Models",
          section: "Projects",handler: () => {
              window.location.href = "/projects/nayana/";
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
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
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
