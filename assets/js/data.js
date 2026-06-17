/* ============================================================
   你的內容資料中心 —— 平常只需要改這個檔（雙語）
   ------------------------------------------------------------
   ★ 雙語欄位寫法：{ en: "English", zh: "中文" }
     只想單語時，直接寫字串即可（兩種語言會顯示同一份）。
   ★ 要新增專案：在 PROJECTS 陣列最前面複製一個 { ... } 改內容。
     它會自動出現在首頁精選、專案列表、與專屬詳情頁。
   ★ 圖片放 assets/img/，cover/gallery 填路徑；留空則用漸層底。
   ============================================================ */

window.SITE = {
  name: "Henry",                          // 名字（多為同一份，可留字串）
  brand: "Henry Yu",
  role:    { en: "Backend / Full-stack Engineer", zh: "後端 / 全端 軟體工程師" },
  tagline: { en: "I turn complex systems into clean, maintainable building blocks. Into distributed architecture, performance tuning, and a good late-night coffee.",
             zh: "專注於把複雜的系統，拆成乾淨、好維護的小元件。喜歡分散式架構、效能調校，以及一杯深夜的咖啡。" },
  status:  { en: "Open to work", zh: "開放接案中" },
  location:{ en: "Kaohsiung, Taiwan", zh: "高雄，臺灣" },
  resume: "#",                            // 履歷 PDF
  email: "yanheng0803@gmail.com",
  github: "https://github.com/yuyan2123",
  linkedin: "https://www.linkedin.com/in/yuyan2123/",

  marquee: ["Go","Rust","TypeScript","Kubernetes","PostgreSQL","React","Docker","gRPC","Redis","Node.js"],

  stats: [
    { num: 5,  suffix: "+", label: { en: "Years of experience", zh: "年開發經驗" } },
    { num: 30, suffix: "+", label: { en: "Projects shipped",     zh: "完成專案" } },
    { num: 12, suffix: "k", label: { en: "GitHub stars",         zh: "GitHub 星數" } },
  ],

  skills: [
    { group: { en: "Backend",  zh: "後端" }, en: "backend",  core: ["Go","Node.js","PostgreSQL"], more: ["Rust","Python","Redis","gRPC"] },
    { group: { en: "Frontend", zh: "前端" }, en: "frontend", core: ["TypeScript","React","HTML / CSS"], more: ["Next.js","Tailwind","Vite"] },
    { group: { en: "Tooling",  zh: "工具" }, en: "devops",   core: ["Docker","Git","Linux"], more: ["Kubernetes","GitHub Actions","Terraform"] },
  ],
};

window.PROJECTS = [
  {
    id: "job-queue",
    title: { en: "Job Queue", zh: "分散式任務佇列" },
    year: "2026",
    summary: { en: "A 200-line lightweight job queue in Go that handles tens of thousands of tasks per minute with zero external dependencies.",
               zh: "200 行 Go 寫成的輕量任務佇列，不依賴外部服務即可支撐每分鐘上萬筆任務。" },
    tags: [{ en: "Go", zh: "Go" }, { en: "gRPC", zh: "gRPC" }, { en: "Concurrency", zh: "並發" }],
    featured: true,
    cover: "",
    accent: "cv1",
    role: { en: "Solo project", zh: "獨立開發" },
    stack: "Go · gRPC · BadgerDB",
    links: { repo: "#", demo: "", article: "#" },
    detail: {
      sections: [
        { h: { en: "Why I built it", zh: "為什麼要做" },
          body: [{ en: "The team relied on Redis as a queue, but the ops cost and single point of failure pushed me to try something lighter. Goal: zero external deps, single binary, fast enough.",
                   zh: "團隊原本用 Redis 當佇列，但維運成本與單點風險讓我想試試更輕量的方案。目標是：零外部依賴、單一執行檔、夠快。" }] },
        { h: { en: "How it works", zh: "怎麼做的" },
          body: [{ en: "The core uses only Go channels and goroutines for scheduling, with BadgerDB for persistence.",
                   zh: "核心只用 Go 的 channel 與 goroutine 排程，搭配 BadgerDB 做持久化。" }],
          list: [
            { en: "Retries with exponential backoff", zh: "支援重試與指數退避" },
            { en: "Priority queues", zh: "任務優先權佇列" },
            { en: "Graceful shutdown, no dropped tasks", zh: "優雅關閉，不掉任務" },
            { en: "gRPC interface, language-agnostic", zh: "gRPC 介面，跨語言可用" },
          ] },
        { h: { en: "Outcome", zh: "成果" },
          body: [{ en: "Stable at ~12k tasks/min on a single 4-core box, under 60MB memory, running in production for a year.",
                   zh: "在單機 4 核環境下穩定支撐每分鐘約 1.2 萬筆任務，記憶體佔用低於 60MB，已在生產環境運行一年。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "inside-sqlite",
    title: { en: "Inside SQLite", zh: "SQLite 原理導讀" },
    year: "2025",
    summary: { en: "An interactive docs site that animates how a B-tree stores a single row of data.",
               zh: "互動式技術文件站，用動畫圖解 B-tree 如何儲存一列資料。" },
    tags: [{ en: "Teaching", zh: "教學" }, { en: "Visualization", zh: "視覺化" }, { en: "SQLite", zh: "SQLite" }],
    featured: true,
    cover: "",
    accent: "cv2",
    role: { en: "Solo project", zh: "獨立開發" },
    stack: "TypeScript · Canvas",
    links: { repo: "#", demo: "#", article: "" },
    detail: {
      sections: [
        { h: { en: "The idea", zh: "緣起" },
          body: [{ en: "Many people use SQL without knowing how the database works underneath. I wanted to make it visible.",
                   zh: "很多人會用 SQL 卻不知道資料庫底層怎麼運作。我想做一個「看得到」的教學。" }] },
        { h: { en: "Contents", zh: "內容" },
          body: [{ en: "Ten interactive animations break down the relationship between pages, cells and B-trees.",
                   zh: "用十張可互動的動畫，逐步拆解 page、cell、B-tree 的關係。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "homelab-cloud",
    title: { en: "Homelab Cloud", zh: "居家 K3s 自架雲" },
    year: "2025",
    summary: { en: "Three old machines turned into a K3s cluster — a full write-up of self-hosting my private cloud.",
               zh: "三台舊機器組成 K3s 叢集，自架私有雲的完整踩雷紀錄。" },
    tags: [{ en: "Kubernetes", zh: "Kubernetes" }, { en: "DevOps", zh: "DevOps" }, { en: "Self-hosted", zh: "自架" }],
    featured: true,
    cover: "",
    accent: "cv3",
    role: { en: "Solo project", zh: "獨立開發" },
    stack: "K3s · Traefik · Longhorn",
    links: { repo: "", demo: "", article: "#" },
    detail: {
      sections: [
        { h: { en: "Motivation", zh: "動機" },
          body: [{ en: "I wanted to keep my data in my own hands and practice Kubernetes ops along the way.",
                   zh: "想把資料留在自己手上，也順便練習 Kubernetes 維運。" }] },
        { h: { en: "Pitfalls I hit", zh: "踩到的雷" }, body: [],
          list: [
            { en: "MetalLB setup on a home network", zh: "家用網路的 MetalLB 設定" },
            { en: "Longhorn storage disk alignment", zh: "儲存層 Longhorn 的磁碟對齊" },
            { en: "Cross-node DNS resolution", zh: "跨節點 DNS 解析" },
          ] },
      ],
      gallery: [],
    },
  },
  {
    id: "realtime-chat",
    title: { en: "Realtime Chat", zh: "即時聊天系統" },
    year: "2024",
    summary: { en: "A realtime chat for tens of thousands of concurrent users, with read receipts and message persistence.",
               zh: "支援萬人同時在線的即時聊天，含已讀回條與訊息持久化。" },
    tags: [{ en: "Node.js", zh: "Node.js" }, { en: "WebSocket", zh: "WebSocket" }, { en: "React", zh: "React" }],
    featured: false,
    cover: "",
    accent: "cv4",
    role: { en: "Team of two", zh: "兩人團隊" },
    stack: "Node.js · Socket.IO · React",
    links: { repo: "#", demo: "#", article: "" },
    detail: {
      sections: [
        { h: { en: "Highlights", zh: "重點" },
          body: [{ en: "Built around WebSockets, handling connection management, message broadcast and reconnection.",
                   zh: "以 WebSocket 為核心，處理連線管理、訊息廣播與斷線重連。" }] },
      ],
      gallery: [],
    },
  },
];
