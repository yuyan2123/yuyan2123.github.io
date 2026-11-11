/* ============================================================
   你的內容資料中心 —— 平常只需要改這個檔（雙語）
   ------------------------------------------------------------
   ★ 雙語欄位寫法：{ en: "English", zh: "中文" }
     只想單語時，直接寫字串即可（兩種語言會顯示同一份）。
   ★ 要新增專案：在 PROJECTS 陣列最前面複製一個 { ... } 改內容。
     它會自動出現在首頁精選、專案列表、與專屬詳情頁。
   ★ 圖片放 assets/img/，cover/gallery 填路徑；留空則用漸層底。
     封面裁切位置可用 coverPos 調整（CSS background-position，例：center top）。
   ============================================================ */

window.SITE = {
  name: "Henry",                          // 名字（多為同一份，可留字串）
  brand: "Henry Yu",
  role:    { en: "Computer Vision / Edge AI Engineer", zh: "電腦視覺 / 邊緣 AI 工程師" },
  tagline: { en: "I build vision systems that make sense of what a camera sees — detecting, recognizing, and reading meaning out of images. Into computer vision, image analysis, and a good late-night coffee.",
             zh: "專注電腦視覺與影像分析，開發物件偵測、辨識與資訊擷取系統。平常也喜歡來杯咖啡。" },
  status:  { en: "Open to work", zh: "歡迎工作與合作邀約" },
  location:{ en: "Kaohsiung, Taiwan", zh: "臺灣高雄" },
  resume: "#",                            // 履歷 PDF
  email: "yanheng0803@gmail.com",
  github: "https://github.com/yuyan2123",
  linkedin: "https://www.linkedin.com/in/yuyan2123/",

  marquee: ["Python","Computer Vision","Edge AI","LLM","VLM","Multimodal AI","OCR","Selenium","Playwright"],

  stats: [
    { num: 9, suffix: "+",  label: { en: "Years of coding",   zh: "年開發經驗" } },
    { num: 4, suffix: "",   label: { en: "Completed industry projects", zh: "已完成產學合作計畫" } },
    { num: 8, suffix: "th", label: { en: "Gold Hand Award · National High School Commercial Skills Competition", zh: "全國高級中等學校商業類學生技藝競賽 <span style='white-space:nowrap'>金手獎</span>" } },
  ],

  skills: [
    { group: { en: "AI / Vision",       zh: "AI 與電腦視覺" }, en: "ai-vision", core: ["Python","Computer Vision","OpenCV"],       more: ["OCR","LLM","VLM","Multimodal AI"] },
    { group: { en: "Edge & Automation", zh: "邊緣運算與自動化" },   en: "edge-auto", core: ["Jetson Orin Nano","Edge AI","Linux"],     more: ["Selenium","Playwright","Web scraping"] },
    { group: { en: "UI & Web",          zh: "介面與網頁開發" },     en: "ui-web",    core: ["Tkinter","JavaScript","HTML / CSS"],      more: ["Git","RWD"] },
  ],
};

window.PROJECTS = [
  {
    id: "itri-smart-kiosk",
    title: { en: "Smart Interactive Kiosk", zh: "互動式智慧服務機台" },
    year: "2025",
    summary: { en: "A completed industry-academia project with ITRI: a self-service kiosk that detects approaching users and supports interaction through voice and camera without buttons or menus.",
               zh: "已完成與工研院（ITRI）合作開發的智慧服務機台專案。系統會偵測靠近的使用者，並以語音和影像進行互動，不需要操作觸控螢幕。" },
    tags: [{ en: "Multimodal AI", zh: "多模態 AI" }, { en: "Computer Vision", zh: "電腦視覺" }, { en: "Voice", zh: "語音互動" }, { en: "Edge AI", zh: "邊緣 AI" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/itri-smart-kiosk.png",
    coverPos: "center top",                 // 重點在機台上方的攝影機與麥克風，裁切時貼齊上緣
    accent: "cv1",
    kicker: { en: "Multimodal", zh: "多模態" },
    role: { en: "Team project · with ITRI", zh: "團隊合作，工研院產學計畫" },
    stack: "Python · Computer Vision · VLM · LLM · Jetson Orin Nano",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The idea", zh: "開發背景" },
          body: [{ en: "Most self-service kiosks still lean on touchscreens and nested menus, which can be a real barrier for some people. The goal here was simpler: a kiosk you can just walk up to and talk to, that understands what it sees and hears and answers back naturally.",
                   zh: "一般自助機台需要透過觸控螢幕和多層選單操作，長輩或不熟悉介面的使用者較難上手。這個專案希望改以語音和影像互動，讓使用者靠近機台後，就能直接開口提問。" }] },
        { h: { en: "What it does", zh: "系統功能" },
          body: [{ en: "Everything runs as one hands-free flow — walk up, ask, get an answer.",
                   zh: "從偵測使用者、接收問題到語音回覆，都不需要觸控操作。" }],
          list: [
            { en: "Wakes up on its own when someone approaches", zh: "偵測到有人靠近時，自動啟動互動功能" },
            { en: "Understands spoken questions across multiple languages, including Taiwanese", zh: "支援多語言提問，包含台語" },
            { en: "Reads the scene in front of the camera and reacts to it", zh: "辨識鏡頭前的場景，提供對應的回覆" },
            { en: "Replies out loud in a natural voice", zh: "以自然語音回覆問題" },
          ] },
        { h: { en: "My role", zh: "負責工作" },
          body: [{ en: "Over a roughly year-long collaboration with ITRI and a team from National University of Kaohsiung, I focused on bringing the separate pieces — sensing, listening, seeing and speaking — together into one system that runs as a single, reliable experience.",
                   zh: "與工研院及高雄大學團隊合作約一年。我主要負責整合人員偵測、語音輸入、影像理解與語音回應，讓各模組能串接成完整的互動流程。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "smart-sop",
    title: { en: "Smart SOP Monitor", zh: "智慧 SOP 監控系統" },
    year: "2025",
    summary: { en: "A completed project for a smart-manufacturing partner: a camera system that monitors a workstation and checks each operation against the standard procedure in real time.",
               zh: "已完成與智慧製造業者合作的作業流程監控專案。系統利用攝影機即時辨識工作站的作業流程，確認作業員是否依照 SOP 操作。" },
    tags: [{ en: "Computer Vision", zh: "電腦視覺" }, { en: "Edge AI", zh: "邊緣 AI" }, { en: "Smart manufacturing", zh: "智慧製造" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/smart-sop.png",
    coverPos: "center top",                 // 對齊上緣置中
    accent: "cv2",
    kicker: { en: "Edge vision", zh: "邊緣視覺" },
    role: { en: "Solo project · smart-manufacturing partner", zh: "獨立開發，智慧製造產學計畫" },
    stack: "Python · Computer Vision · Jetson Orin Nano",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The problem", zh: "需求與挑戰" },
          body: [{ en: "On a production line, following the standard operating procedure exactly is what keeps quality consistent — a missed or out-of-order step can turn into a defect or rework later. Checking that by hand is slow and easy to miss.",
                   zh: "產線漏做步驟或操作順序錯誤，可能造成產品瑕疵與重工。但若全程由人員監看，不僅耗費人力，也容易遺漏，因此需要能即時檢查作業流程的系統。" }] },
        { h: { en: "What it does", zh: "系統功能" },
          body: [{ en: "A camera follows the work along with the defined procedure, and speaks up the moment something is off.",
                   zh: "系統依照預先設定的 SOP 追蹤作業進度，在漏做或順序錯誤時立即提醒。" }],
          list: [
            { en: "Watches the workstation through a single camera", zh: "透過單一攝影機監看工作站" },
            { en: "Follows the operation step by step against the defined procedure", zh: "依設定的 SOP 逐步辨識作業進度" },
            { en: "Flags a missed or out-of-order step as it happens", zh: "即時標示漏做或順序錯誤的步驟" },
            { en: "Runs on compact on-site hardware, no cloud needed", zh: "在現場的邊緣裝置執行，不需依賴雲端" },
          ] },
        { h: { en: "My role", zh: "負責工作" },
          body: [{ en: "I owned this one end to end for the partner — from how the steps are defined and tracked to a simple on-site interface the line operators could actually use day to day.",
                   zh: "獨立負責整套系統的開發，包括作業流程設定、步驟辨識與追蹤，以及供現場人員操作的介面。" }] },
        { h: { en: "Outcome", zh: "執行成果" },
          body: [{ en: "It went through several rounds of on-site testing and refinement over the project, ending in a version the partner could run on the floor.",
                   zh: "經過多次現場測試與調整，完成業者可在產線使用的版本。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "label-inspection",
    title: { en: "Label Inspection", zh: "產品標籤辨識系統" },
    year: "2024",
    summary: { en: "Another completed project for the same smart-manufacturing partner: a camera locates product labels, reads their barcodes and returns the data to the system. For text-only labels, OCR extracts the required fields.",
               zh: "與同一家智慧製造業者合作完成的產品標籤辨識專案。系統從攝影機畫面中定位標籤，讀取條碼並回傳資料；若標籤只有文字，則改用 OCR 辨識並擷取所需欄位。" },
    tags: [{ en: "Computer Vision", zh: "電腦視覺" }, { en: "Barcode recognition", zh: "條碼辨識" }, { en: "Smart manufacturing", zh: "智慧製造" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/label-inspection.png",
    accent: "cv3",
    kicker: { en: "Barcode read", zh: "條碼辨識" },
    role: { en: "Solo project · smart-manufacturing partner", zh: "獨立開發，智慧製造產學計畫" },
    stack: "Python · Computer Vision · Barcode · OCR",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The problem", zh: "需求與挑戰" },
          body: [{ en: "The line needs the barcode value from each product's label fed back into the system. Labels don't always sit in the same spot or use the same format, and some carry no barcode at all — only printed text — so a fixed scanner on its own can't reliably get the value every time.",
                   zh: "產線需要讀取產品標籤上的資料，但標籤位置與格式不一，有些只有文字、沒有條碼，單靠固定式掃描器無法處理所有情況。" }] },
        { h: { en: "What it does", zh: "系統功能" },
          body: [{ en: "It finds the label in the camera image, reads the barcode off it, and returns the value to the system — and when there's no barcode, it reads the text instead and filters out the value that's needed.",
                   zh: "先定位畫面中的產品標籤，再辨識條碼並回傳資料。沒有條碼時，改以 OCR 辨識文字，從中擷取系統需要的內容。" }],
          list: [
            { en: "Locates the product label in the camera image", zh: "從攝影機畫面中定位產品標籤" },
            { en: "Decodes the barcode on the label and returns the value to the system", zh: "讀取條碼內容並回傳系統" },
            { en: "Falls back to OCR when a label has no barcode, only text", zh: "支援沒有條碼的標籤，改用 OCR 辨識文字" },
            { en: "Filters the recognized text down to the value that's actually needed", zh: "從辨識結果中擷取指定欄位" },
          ] },
        { h: { en: "My role", zh: "負責工作" },
          body: [{ en: "I built this one end to end for the partner — label detection, barcode decoding, the OCR fallback, and an operator-facing interface — across several rounds of refinement.",
                   zh: "獨立開發標籤偵測、條碼辨識、OCR 與操作介面，並依現場測試結果進行多次調整。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "course-grabber",
    title: { en: "Course Grabber", zh: "自動選課工具" },
    year: "2020 – 2026",
    summary: { en: "A little course-registration tool I hacked together in a day as a freshman — and ended up maintaining for years. It started as something just for me, then classmates kept asking for a copy. The moment registration opens, it locks in the courses you want.",
               zh: "大一時花了一天開發的自動選課工具，原本用來解決自己的選課需求，後來也提供給同學使用，並持續維護多年。工具會在選課開放時自動送出指定課程的選課操作。" },
    tags: [{ en: "Automation", zh: "自動化" }, { en: "Web scraping", zh: "網頁爬蟲" }, { en: "Python", zh: "Python" }, { en: "Side project", zh: "個人專案" }],
    featured: true,
    cover: "assets/img/course-grabber.png",
    accent: "cv4",
    kicker: { en: "Automation", zh: "自動化" },
    role: { en: "Solo project", zh: "獨立開發" },
    stack: "Python · Selenium · Playwright",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "How it started", zh: "開發起因" },
          body: [{ en: "Course registration at my university is a scramble — the popular classes fill within seconds while you sit there hammering refresh. As a freshman I got fed up and, in a single day, wrote a small script to do the watching and grabbing for me. It filled my whole schedule, and I was hooked.",
                   zh: "大一選課時，熱門課程常在開放後很快額滿，需要不斷重新整理頁面。我花了一天開發自動選課程式，協助自己選到想修的課，也開始對實用的自動化工具產生興趣。" }] },
        { h: { en: "How it grew", zh: "後續改版" },
          body: [{ en: "What began as a one-off kept evolving across several semesters. Friends started asking for a copy, so I cleaned it up, gave it a friendlier interface, added logging so you could see exactly what happened, and packaged it into a one-click tool that non-programmers could just run.",
                   zh: "後來陸續有同學詢問能否使用，我便持續整理程式、改善操作介面，並加入執行紀錄。經過數個學期的改版，最後打包成不需要程式背景也能直接使用的工具。" }] },
        { h: { en: "What I took from it", zh: "開發心得" },
          body: [{ en: "It taught me more than any tutorial could: real people relying on it, all the weird edge cases that only show up at 9am on registration day, and why reliability actually matters — a missed grab is someone's missed class. It's still the project I'm quietly most fond of.",
                   zh: "工具開始有人使用後，我才真正體會到穩定性的重要。選課當天的各種例外狀況，都可能影響同學能否選到課，也讓我學會從使用者的角度處理問題。這也是我至今仍很喜歡的一個專案。" }] },
      ],
      gallery: [],
    },
  },
];
