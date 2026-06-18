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
             zh: "打造看得懂畫面的視覺系統——偵測、辨識，把影像裡的內容讀成可用的資訊。喜歡電腦視覺、影像分析，以及一杯深夜的咖啡。" },
  status:  { en: "Open to work", zh: "開放接案中" },
  location:{ en: "Kaohsiung, Taiwan", zh: "高雄 ● 臺灣" },
  resume: "#",                            // 履歷 PDF
  email: "yanheng0803@gmail.com",
  github: "https://github.com/yuyan2123",
  linkedin: "https://www.linkedin.com/in/yuyan2123/",

  marquee: ["Python","Computer Vision","Edge AI","LLM","VLM","Multimodal AI","OCR","Selenium","Playwright"],

  stats: [
    { num: 9, suffix: "+",  label: { en: "Years of coding",   zh: "年開發經驗" } },
    { num: 4, suffix: "",   label: { en: "Industry projects", zh: "產學合作計畫" } },
    { num: 8, suffix: "th", label: { en: "Gold Hand Award · National High School Commercial Skills Competition", zh: "全國高級中等學校商業類學生技藝競賽 <span style='white-space:nowrap'>金手獎</span>" } },
  ],

  skills: [
    { group: { en: "AI / Vision",       zh: "AI 與電腦視覺" }, en: "ai-vision", core: ["Python","Computer Vision","OpenCV"],       more: ["OCR","LLM","VLM","Multimodal AI"] },
    { group: { en: "Edge & Automation", zh: "邊緣與自動化" },   en: "edge-auto", core: ["Jetson Orin Nano","Edge AI","Linux"],     more: ["Selenium","Playwright","Web scraping"] },
    { group: { en: "UI & Web",          zh: "介面與網頁" },     en: "ui-web",    core: ["Tkinter","JavaScript","HTML / CSS"],      more: ["Git","RWD"] },
  ],
};

window.PROJECTS = [
  {
    id: "itri-smart-kiosk",
    title: { en: "Smart Interactive Kiosk", zh: "互動式智慧服務機台" },
    year: "2025",
    summary: { en: "An industry-academia project with ITRI: a self-service kiosk that notices when someone walks up and lets them interact by voice and camera — no buttons, no menus.",
               zh: "和工研院（ITRI）合作的案子。我們想做一台不必按、也不必滑的服務機台——人走到它面前，它就知道有人來了，接下來用講的就行。" },
    tags: [{ en: "Multimodal AI", zh: "多模態 AI" }, { en: "Computer Vision", zh: "電腦視覺" }, { en: "Voice", zh: "語音互動" }, { en: "Edge AI", zh: "邊緣運算 AI" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/itri-smart-kiosk.png",
    coverPos: "center top",                 // 重點在機台上方的攝影機與麥克風，裁切時貼齊上緣
    accent: "cv1",
    kicker: { en: "Multimodal", zh: "多模態" },
    role: { en: "Team project · with ITRI", zh: "團隊專案 · 與工研院" },
    stack: "Python · Computer Vision · VLM · LLM · Jetson Orin Nano",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The idea", zh: "緣起" },
          body: [{ en: "Most self-service kiosks still lean on touchscreens and nested menus, which can be a real barrier for some people. The goal here was simpler: a kiosk you can just walk up to and talk to, that understands what it sees and hears and answers back naturally.",
                   zh: "一般的自助機台，多半要你戳螢幕、一層一層點進選單，對長輩或不熟操作的人其實不太友善。我們的想法很單純：做一台你走過去、開口問就會回答的機器。它看得到你、聽得懂你說的話，也會好好回應。" }] },
        { h: { en: "What it does", zh: "它能做什麼" },
          body: [{ en: "Everything runs as one hands-free flow — walk up, ask, get an answer.",
                   zh: "整個過程都不用動手：人走近、開口問、它回答。" }],
          list: [
            { en: "Wakes up on its own when someone approaches", zh: "有人走近就自己醒過來，不必先點它一下" },
            { en: "Understands spoken questions across multiple languages, including Taiwanese", zh: "聽得懂好幾種語言的提問，台語也行" },
            { en: "Reads the scene in front of the camera and reacts to it", zh: "看得到鏡頭前的狀況，再決定怎麼回" },
            { en: "Replies out loud in a natural voice", zh: "用接近真人的聲音開口回答" },
          ] },
        { h: { en: "My role", zh: "我負責的部分" },
          body: [{ en: "Over a roughly year-long collaboration with ITRI and a team from National University of Kaohsiung, I focused on bringing the separate pieces — sensing, listening, seeing and speaking — together into one system that runs as a single, reliable experience.",
                   zh: "這個案子和工研院、高雄大學的團隊一起做了大約一年。我主要負責把「看人、聽聲音、讀畫面、開口回話」這幾塊原本各自獨立的東西，兜成一套能從頭順順跑到尾、不會中途卡住的系統。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "smart-sop",
    title: { en: "Smart SOP Monitor", zh: "智慧 SOP 監控系統" },
    year: "2025",
    summary: { en: "An industry project for a smart-manufacturing partner: a camera system that watches a workstation and checks, step by step, that each operation follows the standard procedure — in real time.",
               zh: "和一家智慧製造業者合作的案子。用一支攝影機盯著工作站，一步一步看作業員有沒有照 SOP 做。" },
    tags: [{ en: "Computer Vision", zh: "電腦視覺" }, { en: "Edge AI", zh: "邊緣運算 AI" }, { en: "Smart manufacturing", zh: "智慧製造" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/smart-sop.png",
    coverPos: "center top",                 // 對齊上緣置中
    accent: "cv2",
    kicker: { en: "Edge vision", zh: "邊緣視覺" },
    role: { en: "Solo project · smart-manufacturing partner", zh: "獨立負責 · 與智慧製造業者" },
    stack: "Python · Computer Vision · Jetson Orin Nano",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The problem", zh: "要解決的問題" },
          body: [{ en: "On a production line, following the standard operating procedure exactly is what keeps quality consistent — a missed or out-of-order step can turn into a defect or rework later. Checking that by hand is slow and easy to miss.",
                   zh: "產線上最怕的就是沒照 SOP 來：少做一步、或順序顛倒，當下往往看不出來，要等到後面才變成瑕疵、甚至整批重做。可是叫人從頭盯到尾，不只累，也很容易看漏。" }] },
        { h: { en: "What it does", zh: "它能做什麼" },
          body: [{ en: "A camera follows the work along with the defined procedure, and speaks up the moment something is off.",
                   zh: "攝影機會照著事先排好的流程一起跟，哪裡不對就馬上提醒。" }],
          list: [
            { en: "Watches the workstation through a single camera", zh: "一支攝影機就顧得了整個工作站" },
            { en: "Follows the operation step by step against the defined procedure", zh: "照著設定好的流程，一步步跟著作業員的動作" },
            { en: "Flags a missed or out-of-order step as it happens", zh: "少做、或順序錯的步驟，當場就標出來" },
            { en: "Runs on compact on-site hardware, no cloud needed", zh: "跑在現場一台小裝置上就行，不必連雲端" },
          ] },
        { h: { en: "My role", zh: "我負責的部分" },
          body: [{ en: "I owned this one end to end for the partner — from how the steps are defined and tracked to a simple on-site interface the line operators could actually use day to day.",
                   zh: "這個案子從頭到尾是我一個人扛的。從怎麼定義、怎麼追每一個步驟，到現場人員打開就會用的操作介面，全都自己來。" }] },
        { h: { en: "Outcome", zh: "成果" },
          body: [{ en: "It went through several rounds of on-site testing and refinement over the project, ending in a version the partner could run on the floor.",
                   zh: "中間跑了好幾輪現場測試、邊測邊改，最後交出一個業者可以直接搬到線上用的版本。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "label-inspection",
    title: { en: "Label Inspection", zh: "標籤辨識檢測" },
    year: "2024",
    summary: { en: "Another project for the same smart-manufacturing partner: a camera locates the product label in frame, pulls the required barcode off it, and feeds the value back to the system. When a label carries no barcode — just printed text — it falls back to OCR to filter out the value that's needed.",
               zh: "同一家智慧製造業者的另一個案子。讓攝影機先在畫面中找到產品標籤，再把所需的條碼從標籤上抓出來、回傳給系統。遇到沒有條碼、只有文字的標籤，就改用文字辨識（OCR）把需要的內容過濾出來。" },
    tags: [{ en: "Computer Vision", zh: "電腦視覺" }, { en: "Barcode recognition", zh: "條碼辨識" }, { en: "Smart manufacturing", zh: "智慧製造" }, { en: "Industry collaboration", zh: "產學合作" }],
    featured: true,
    cover: "assets/img/label-inspection.png",
    accent: "cv3",
    kicker: { en: "Barcode read", zh: "條碼辨識" },
    role: { en: "Solo project · smart-manufacturing partner", zh: "獨立負責 · 與智慧製造業者" },
    stack: "Python · Computer Vision · Barcode · OCR",
    links: { repo: "", demo: "", article: "" },
    detail: {
      sections: [
        { h: { en: "The problem", zh: "要解決的問題" },
          body: [{ en: "The line needs the barcode value from each product's label fed back into the system. Labels don't always sit in the same spot or use the same format, and some carry no barcode at all — only printed text — so a fixed scanner on its own can't reliably get the value every time.",
                   zh: "產線需要把每個產品標籤上的條碼值回傳到系統。但標籤的位置、格式不一定一致，有些甚至沒有條碼、只有印上去的文字，光靠固定式掃描器沒辦法每次都穩穩讀到。" }] },
        { h: { en: "What it does", zh: "它能做什麼" },
          body: [{ en: "It finds the label in the camera image, reads the barcode off it, and returns the value to the system — and when there's no barcode, it reads the text instead and filters out the value that's needed.",
                   zh: "它會在攝影機畫面裡找到標籤，把上面的條碼讀出來、回傳值給系統；遇到沒有條碼的，就改讀文字、把需要的內容過濾出來。" }],
          list: [
            { en: "Locates the product label in the camera image", zh: "在攝影機畫面中定位產品標籤" },
            { en: "Decodes the barcode on the label and returns the value to the system", zh: "解出標籤上的條碼，把值回傳給系統" },
            { en: "Falls back to OCR when a label has no barcode, only text", zh: "標籤沒有條碼、只有文字時，改用文字辨識（OCR）" },
            { en: "Filters the recognized text down to the value that's actually needed", zh: "從辨識出來的文字裡，過濾出真正需要的內容" },
          ] },
        { h: { en: "My role", zh: "我負責的部分" },
          body: [{ en: "I built this one end to end for the partner — label detection, barcode decoding, the OCR fallback, and an operator-facing interface — across several rounds of refinement.",
                   zh: "從標籤偵測、條碼解碼、沒有條碼時的文字辨識備援，到給現場人員用的介面，都是我自己一手做完的；中間還來回改了好幾輪才定案。" }] },
      ],
      gallery: [],
    },
  },
  {
    id: "course-grabber",
    title: { en: "Course Grabber", zh: "選課搶課程式" },
    year: "2020 – 2026",
    summary: { en: "A little course-registration tool I hacked together in a day as a freshman — and ended up maintaining for years. It started as something just for me, then classmates kept asking for a copy. The moment registration opens, it locks in the courses you want.",
               zh: "大一花一天寫出來的選課小工具，結果一路養了好幾年——本來只給自己用，後來不少同學都跑來要。開放選課時間一到，它就能穩穩幫你搶下想修的課。" },
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
        { h: { en: "How it started", zh: "怎麼開始的" },
          body: [{ en: "Course registration at my university is a scramble — the popular classes fill within seconds while you sit there hammering refresh. As a freshman I got fed up and, in a single day, wrote a small script to do the watching and grabbing for me. It filled my whole schedule, and I was hooked.",
                   zh: "我們學校的選課根本是一場搶課大戰——熱門的課幾秒就沒了，你只能一直刷頁面。大一被搞煩之後，我花一天寫了個小程式，讓它幫我盯、幫我搶。結果課表一下就排滿，我也從此入坑。" }] },
        { h: { en: "How it grew", zh: "後來怎麼長大的" },
          body: [{ en: "What began as a one-off kept evolving across several semesters. Friends started asking for a copy, so I cleaned it up, gave it a friendlier interface, added logging so you could see exactly what happened, and packaged it into a one-click tool that non-programmers could just run.",
                   zh: "本來只是一次性的東西，卻一路改了好幾個學期。後來同學陸續來要，我就把它整理乾淨、做了比較好用的介面，加上完整紀錄讓人看得到每一步，最後包成一個不會寫程式也能直接點開來用的工具。" }] },
        { h: { en: "What I took from it", zh: "我從中學到的" },
          body: [{ en: "It taught me more than any tutorial could: real people relying on it, all the weird edge cases that only show up at 9am on registration day, and why reliability actually matters — a missed grab is someone's missed class. It's still the project I'm quietly most fond of.",
                   zh: "它教我的比任何教學影片都多：有真實的人在用、選課當天早上九點什麼狀況都會冒出來，也讓我真正體會到「穩定」為什麼重要——少搶到一門，對某個人來說就是少修一堂課。到現在，它都還是我私心最喜歡的作品。" }] },
      ],
      gallery: [],
    },
  },
];
