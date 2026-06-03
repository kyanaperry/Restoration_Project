/* =============================================================
   ESCAPE FROM KIRTLAND — SCRIPT.JS
   BYU REL C 225 Foundations of the Restoration

   Narrative frame: Kirtland, January 12, 1838 — escape the crisis
   Puzzle content: The full story of the Restoration (1820–1836)

   Historical sources:
   - Joseph Smith–History (Pearl of Great Price)
   - Saints: The Standard of Truth, Vol. 1 (2018)
   - Joseph Smith Papers Project (josephsmithpapers.org)
   - Church History Topics (ChurchofJesusChrist.org)
   - D&C section headings (13, 20, 76, 88, 89, 110)
   - BYU Religious Studies Center (rsc.byu.edu)
   ============================================================= */

// =============================================================
// GAME STATE
// =============================================================
const gameState = {
    currentScreen: 'intro',
    scores: { p1: 0, p2: 0, p3: 0, p4: 0 },
    maxScores: { p1: 8, p2: 6, p3: 5, p4: 5 },
    completed: { p1: false, p2: false, p3: false, p4: false }
};

// =============================================================
// PUZZLE 1 DATA — RESTORATION TIMELINE
// Eight key events, 1820–1836
// Sources: Joseph Smith–History; D&C headings; josephsmithpapers.org; Saints vol. 1
// =============================================================
const timelineEvents = [
    {
        id: 'a',
        title: 'The First Vision',
        hint: 'Joseph Smith, Sacred Grove — Spring 1820',
        correctOrder: 1,
        explainer: 'In the spring of 1820, Joseph Smith prayed in a grove of trees near his home in Manchester, New York. God the Father and Jesus Christ appeared to him — the opening event of the Restoration, restoring the knowledge that God is a personal, knowable being who communicates with mankind. (Joseph Smith–History 1:14–20; Pearl of Great Price)'
    },
    {
        id: 'b',
        title: 'Moroni\'s First Visit',
        hint: 'The Angel Moroni; Gold Plates revealed — September 21–22, 1823',
        correctOrder: 2,
        explainer: 'On the night of September 21–22, 1823, the angel Moroni appeared three times to Joseph Smith, telling him of an ancient record engraved on gold plates and of the work Joseph had been called to do. Joseph visited the Hill Cumorah annually for four years before receiving the plates. (Joseph Smith–History 1:29–49)'
    },
    {
        id: 'c',
        title: 'Joseph Receives the Gold Plates',
        hint: 'Hill Cumorah, Palmyra, New York — September 22, 1827',
        correctOrder: 3,
        explainer: 'After four years of annual visits to the Hill Cumorah, Joseph Smith received the gold plates on September 22, 1827, along with the Urim and Thummim for translation. The translation process began shortly after, with Oliver Cowdery serving as primary scribe beginning in April 1829. (Joseph Smith–History 1:59; josephsmithpapers.org)'
    },
    {
        id: 'd',
        title: 'Aaronic Priesthood Restored',
        hint: 'John the Baptist, Susquehanna River — May 15, 1829',
        correctOrder: 4,
        explainer: 'John the Baptist appeared to Joseph Smith and Oliver Cowdery on the banks of the Susquehanna River in Harmony, Pennsylvania, and conferred the Aaronic Priesthood upon them — restoring the authority to baptize by immersion for the remission of sins. (D&C 13; Joseph Smith–History 1:68–72)'
    },
    {
        id: 'e',
        title: 'Melchizedek Priesthood Restored',
        hint: 'Peter, James, and John — Late May or June 1829',
        correctOrder: 5,
        explainer: 'Peter, James, and John — the ancient Apostles of Jesus Christ — appeared to Joseph and Oliver near the Susquehanna River and restored the Melchizedek Priesthood and the holy apostleship, including the keys necessary to lead the Church. (D&C 27:12; Church History Topics, ChurchofJesusChrist.org)'
    },
    {
        id: 'f',
        title: 'Book of Mormon Published',
        hint: 'E.B. Grandin Print Shop, Palmyra, New York — March 26, 1830',
        correctOrder: 6,
        explainer: 'The Book of Mormon: An Account Written by the Hand of Mormon was first published on March 26, 1830, by printer E.B. Grandin in Palmyra, New York. Five thousand copies were printed. It stands as a second witness of Jesus Christ and physical evidence of Joseph\'s prophetic calling. (josephsmithpapers.org; Saints: The Standard of Truth, ch. 10)'
    },
    {
        id: 'g',
        title: 'The Church Organized',
        hint: 'Peter Whitmer Sr. farm, Fayette, New York — April 6, 1830',
        correctOrder: 7,
        explainer: 'On April 6, 1830, the Church of Christ (later renamed The Church of Jesus Christ of Latter-day Saints) was officially organized at the home of Peter Whitmer Sr. in Fayette, New York, with approximately fifty or sixty people present. (D&C 20:1; Saints: The Standard of Truth, ch. 10)'
    },
    {
        id: 'h',
        title: 'Kirtland Temple Dedicated',
        hint: 'Kirtland, Ohio — March 27, 1836',
        correctOrder: 8,
        explainer: 'The Kirtland Temple — the first temple built in this dispensation — was dedicated on March 27, 1836, by Joseph Smith. One week later, Christ, Moses, Elias, and Elijah appeared there and restored essential dispensational keys (D&C 110). This sacred building stands just outside, even now threatened by the crisis unfolding around you. (D&C 109–110; Saints: The Standard of Truth, ch. 30)'
    }
];

// =============================================================
// PUZZLE 2 DATA — SOURCE EVALUATION
// General Restoration-history source types
// Sources: josephsmithpapers.org; Saints vol. 1; Church History Topics
// =============================================================
const sourcesData = [
    {
        id: 1,
        num: 'Source 1',
        name: 'Joseph Smith\'s 1838–39 History ("History of the Church")',
        description: 'A detailed first-person narrative dictated by Joseph Smith beginning in 1838, covering his early life, the First Vision, and the coming forth of the Book of Mormon. Now published and annotated in the Joseph Smith Papers Project.',
        options: [
            'A. Primary source — a firsthand account written by a participant in the events; valuable for understanding the Restoration when read alongside other historical evidence.',
            'B. Secondary source — written after the events by someone interpreting earlier materials; useful for context but not direct eyewitness evidence.',
            'C. Unreliable source — written from a personal perspective that may influence interpretation; should be approached cautiously and compared with other records.',
            'D. Anonymous source — a historical account with uncertain authorship and limited verification; difficult to evaluate for historical reliability.'
        ],
        correctIndex: 0,
        explanation: '✅ Correct! This is a primary source — written by Joseph Smith himself. Primary sources are firsthand accounts from participants or witnesses. All sources carry a perspective; a historian\'s task is to acknowledge that and corroborate with other accounts. This history is preserved and annotated in the Joseph Smith Papers Project (josephsmithpapers.org) and is foundational to any serious study of the Restoration.'
    },
    {
        id: 2,
        num: 'Source 2',
        name: 'An Anti-Mormon Pamphlet from 1838',
        description: 'A pamphlet written by a critic of the Church in 1838 claiming that Joseph Smith fabricated the First Vision and that the gold plates never existed. The author never met Joseph Smith personally and wrote from a clearly adversarial position.',
        options: [
            'A. Highly reliable primary source — written by a contemporary critic of Joseph Smith; useful because opposition perspectives are often considered more objective.',
            'B. Secondary source with clear bias — useful for understanding critical views of the period, but its claims should be evaluated against stronger firsthand evidence.',
            'C. Limited historical source — reflects public criticism of the time period, though historians should generally avoid relying on strongly opinionated accounts.',
            'D. Primary source from the period — written during the same historical era and therefore useful as direct evidence of what actually occurred.'
        ],
        correctIndex: 1,
        explanation: '✅ Correct! This pamphlet is a secondary source (the author had no firsthand knowledge) with obvious adversarial bias. Good historians don\'t automatically discard biased sources — they account for the bias, note the author\'s motivation, and test specific claims against corroborating primary evidence. Neither total acceptance nor total dismissal is sound historical method. (Church History Topics; josephsmithpapers.org)'
    },
    {
        id: 3,
        num: 'Source 3',
        name: 'The Joseph Smith Papers (Documentary Edition)',
        description: 'A multi-volume scholarly project published by the Church Historian\'s Press, providing annotated transcriptions of original Joseph Smith documents — journals, letters, revelation manuscripts, and histories. Peer-reviewed by academic scholars and includes complex as well as faith-affirming documents.',
        options: [
            'A. Biased Church-sponsored publication — reflects a faith-based perspective and should be examined carefully alongside independent historical scholarship.',
            'B. Secondary historical source — summarizes earlier documents and interpretations, making it useful but not always definitive evidence on its own.',
            'C. Scholarly documentary edition — peer-reviewed and carefully annotated, making it one of the strongest collections of Restoration source materials available.',
            'D. Online historical resource — provides access to documents and interpretations, though researchers should verify sources and editorial standards.'
        ],
        correctIndex: 2,
        explanation: '✅ Correct! The Joseph Smith Papers Project (josephsmithpapers.org) is a peer-reviewed, scholarly documentary edition widely respected by both Latter-day Saint and secular historians. It presents original documents with rigorous academic annotations. Church affiliation of the publisher does not disqualify a work when its methodology is sound and its editorial process transparent.'
    },
    {
        id: 4,
        num: 'Source 4',
        name: 'An Unsourced Social Media Post',
        description: 'A Facebook post with the caption: "Joseph Smith said: \'The Constitution will hang by a thread and the Elders of Israel will save it.\'" The post provides no citation, no date, no source document, and no context.',
        options: [
            'A. Potentially reliable — attributed quotes from Joseph Smith may preserve authentic teachings, though additional historical context is often necessary.',
            'B. Moderately reliable — social media posts can sometimes share accurate historical material, though sources should be verified carefully.',
            'C. Unreliable source — a quotation without citation, date, or document cannot be verified and should not be treated as responsible historical evidence.',
            'D. Possible primary source — because it claims to repeat Joseph Smith’s words, historians may consider it useful if supported by stronger documentation.'
        ],
        correctIndex: 2,
        explanation: '✅ Correct! A claim with no citation, date, or source document cannot be evaluated. Good historical practice always asks: Where did this come from? Can it be traced to an original document? (Note: A version of this quote does appear in reported statements, but responsible historians cite the specific source and context — not a social media post. Making it untraceable makes it unusable as evidence.)'
    },
    {
        id: 5,
        num: 'Source 5',
        name: 'Lucy Mack Smith\'s Memoir (1845)',
        description: 'A memoir dictated by Joseph Smith\'s mother, Lucy Mack Smith, around 1845, describing the family\'s experiences leading up to and during the early Restoration, including Moroni\'s visits, Joseph\'s character, and the coming forth of the Book of Mormon.',
        options: [
            'A. Primary source from a family witness — valuable for understanding early Restoration events, though historians compare it with other records and perspectives.',
            'B. Limited historical source — close family relationships may influence perspective, meaning historians should evaluate its claims alongside additional evidence.',
            'C. Valuable historical account — provides detailed memories of early events, though no source should be assumed completely objective or free from perspective.',
            'D. Secondary historical source — written after many events occurred and shaped by memory, making corroboration with additional sources important.'
        ],
        correctIndex: 0,
        explanation: '✅ Correct! Lucy Mack Smith was a close eyewitness to many early Restoration events and is a primary source. Historians value her memoir for its intimate family perspective. Like all sources, it is read critically — memory written years after events may vary in detail — but her accounts are corroborated by other evidence and preserved in the Joseph Smith Papers. Multiple independent witnesses agreeing on core facts is strong historical evidence.'
    },
    {
        id: 6,
        num: 'Source 6',
        name: 'Church History Topics on ChurchofJesusChrist.org',
        description: 'Scholarly articles written and reviewed by Church historians on subjects like the First Vision, the Book of Mormon translation, priesthood restoration, and the Kirtland Temple. They acknowledge historical complexity, cite primary sources, and address difficult questions transparently.',
        options: [
            'A. Church-affiliated source — may reflect a faith-based perspective, so historians should compare its conclusions with other historical scholarship.',
            'B. Reliable secondary source — carefully researched and based on primary documents, making it a strong starting point for Restoration study.',
            'C. Primary historical source — officially published by the Church and useful for understanding institutional perspectives on historical events.',
            'D. Limited historical source — addresses difficult issues openly, though historians should still examine how interpretations are presented.'  
        ],
        correctIndex: 1,
        explanation: '✅ Correct! The Church History Topics essays are written by trained historians, cite primary documents, and are notable for their transparent engagement with historically complex subjects. They are reliable secondary sources and an excellent starting point — always follow their footnotes back to the primary sources they reference for deeper study. (ChurchofJesusChrist.org/study/history/topics)'
    }
];

// =============================================================
// PUZZLE 3 DATA — REVELATION MATCHING
// Five Kirtland-era D&C revelations matched to historical context
// Sources: D&C section headings; Saints vol. 1; Church History Topics
// =============================================================
const matchingData = [
    {
        id: 0,
        revelation: 'D&C 13\n"The keys of the ministering of angels, and of the gospel of repentance, and of baptism by immersion."',
        revShort: 'D&C 13 — Aaronic Priesthood',
        context: 'May 1829: John the Baptist restored the Aaronic Priesthood to Joseph Smith and Oliver Cowdery near the Susquehanna River.',
        ctxShort: 'John the Baptist, Susquehanna River, 1829'
    },
    {
        id: 1,
        revelation: 'D&C 76\n"The Vision" — a sweeping revelation showing three kingdoms of glory: celestial, terrestrial, and telestial.',
        revShort: 'D&C 76 — The Vision',
        context: 'Feb 1832, Hiram, Ohio: Joseph Smith and Sidney Rigdon received a vision of the kingdoms of glory while revising the New Testament.',
        ctxShort: 'Joseph & Sidney Rigdon, Hiram, Ohio, 1832'
    },
    {
        id: 2,
        revelation: 'D&C 121\n"O God, where art thou?" — a revelation from Liberty Jail teaching about suffering, endurance, and righteous priesthood leadership.',
        revShort: 'D&C 121 — Liberty Jail',
        context: 'Mar 1839, Liberty, Missouri: Joseph Smith dictated this revelation while imprisoned, pleading for the suffering Saints and receiving words of peace and instruction.',
        ctxShort: 'Joseph in Liberty Jail, Missouri, 1839'
    },
    {
        id: 3,
        revelation: 'D&C 89\n"The Word of Wisdom" — counsel on health: avoiding tobacco, alcohol, and hot drinks; emphasizing grains, herbs, and fruits.',
        revShort: 'D&C 89 — Word of Wisdom',
        context: 'Feb 1833, Kirtland: Received after concerns at the School of the Prophets led Joseph Smith to seek guidance on health and the care of the body.',
        ctxShort: 'Emma\'s concern, School of the Prophets, 1833'
    },
    {
        id: 4,
        revelation: 'D&C 110\nJesus Christ, Moses, Elias, and Elijah appear in the Kirtland Temple, each restoring essential dispensational keys.',
        revShort: 'D&C 110 — Kirtland Temple Visions',
        context: 'Apr 1836, Kirtland Temple: Jesus Christ, Moses, Elias, and Elijah appeared and restored priesthood keys to Joseph Smith and Oliver Cowdery.',
        ctxShort: 'Kirtland Temple, one week after dedication, 1836'
    }
];

// =============================================================
// PUZZLE 4 DATA — MODERN APPLICATION
// Connecting Restoration principles to the living Church today
// =============================================================
const modernQuestions = [
    {
        id: 1,
        question: 'The First Vision established that God the Father and Jesus Christ are separate, distinct, glorified beings who communicate personally with mankind. How does this foundational truth shape the Church\'s core teachings today — and why does it still matter as you carry the Restoration out of Kirtland?',
        options: [
            'A. It is viewed mainly as a symbolic event that encourages faith in God, though modern Church teachings rely more heavily on later revelations.',
            'B. It shapes the Church’s understanding of the Godhead, prayer, and God’s nature — affirming that God is personal, distinct, and involved in human lives.',
            'C. It teaches that divine communication is possible, though experiences like the First Vision are generally limited to prophets with authority.',
            'D. It influenced the early Restoration significantly, though later revelations are considered more central to the Church’s teachings today.'
        ],
        correctIndex: 1,
        explanation: '✅ Correct! The First Vision is the foundational event of the entire Restoration. It directly shapes Latter-day Saint theology: God has a glorified body, He hears and answers personal prayers, and mankind is made in His literal image. This "open heavens" reality — that God communicates with His children — remains a defining characteristic of the Church today. (Saints vol. 1, ch. 1; Church History Topics: "First Vision")'
    },
    {
        id: 2,
        question: 'The Aaronic and Melchizedek Priesthoods were restored through ordained messengers — John the Baptist, Peter, James, and John — in an unbroken, physical chain of authority. Why does this matter for priesthood ordinances performed in the Church today?',
        options: [
            'A. Personal faith is considered sufficient for ordinances, meaning sincere believers may perform baptisms and sacred acts without formal authority.',
            'B. Priesthood authority belongs mainly to ancient Apostles, meaning modern ordinances are symbolic reminders rather than divinely authorized acts.',
            'C. Priesthood authority must be properly conferred through a line traceable to Jesus Christ, making ordinances valid and recognized before God.',
            'D. Priesthood authority comes automatically with Church membership, allowing baptized believers to participate fully in sacred ordinances.'      
        ],
        correctIndex: 2,
        explanation: '✅ Correct! The Restoration of the priesthood means the Church holds divine authority — not self-appointed, but traceable through an unbroken line from Jesus Christ. This is why the Church teaches that ordinances performed without proper priesthood authority cannot bind in heaven (Matthew 16:19). Every ordination in the Church today connects back to these events on the banks of the Susquehanna River. (D&C 13; D&C 27:12)'
    },
    {
        id: 3,
        question: 'During the Kirtland period (1831–1838), Joseph Smith received over 60 revelations now found in the Doctrine and Covenants — addressing everything from the nature of God to dietary health to temple worship. What principle about revelation does this pattern teach the Church today?',
        options: [
            'A. Most essential revelation was completed in the early Restoration, meaning modern leaders focus mainly on preserving earlier teachings and doctrine.',
            'B. Revelation is primarily reserved for Church leaders, though members might receive personal guidance for individual decisions and questions.',
            'C. God continues to guide His Church through living prophets, revealing His will gradually as circumstances and spiritual needs develop over time.',
            'D. The Doctrine and Covenants provides the Church’s main doctrinal foundation, meaning later revelation serves mostly to clarify earlier instruction.'
        ],
        correctIndex: 2,
        explanation: '✅ Correct! The Kirtland period demonstrates that God reveals His will progressively — addressing practical and doctrinal needs as they arise. This pattern of continuing revelation through a living prophet is why the President of the Church is sustained as prophet, seer, and revelator, and why the Church remains open to adding to the body of scripture when the Lord directs (see Articles of Faith 1:9; 2 Nephi 28:30).'
    },
    {
        id: 4,
        question: 'The early Saints gathered to Kirtland and later to Missouri and Nauvoo, building Zion — a covenant community dedicated to the Lord\'s purposes. Now you are leaving Kirtland. How does the principle of "gathering" live on in the modern Church?',
        options: [
            'A. Gathering still emphasizes physical relocation, with members encouraged to unite in Utah where the Church can be strengthened together.',
            'B. Gathering today focuses on strengthening local congregations, making covenants, and building Zion through worship, service, and temple ordinances.',
            'C. Gathering was mainly important during the early Restoration, with modern Church members focusing more on personal discipleship than community building.',
            'D. Gathering is mostly symbolic today, encouraging spiritual unity and belief without requiring major commitments through ordinances or service.'
        ],
        correctIndex: 1,
        explanation: '✅ Correct! President Russell M. Nelson and earlier prophets have taught that the gathering of Israel is the greatest cause on earth — and it happens through missionary work, covenant keeping, and building the Church in every nation. Members no longer gather to a single city; instead, they build Zion where they are, find strength in local wards and stakes, and gather to temples worldwide. What began in Kirtland continues in every nation today. (D&C 110; Isaiah 2:2–3)'
    },
    {
        id: 5,
        question: 'The Book of Mormon was translated "by the gift and power of God" and published in 1830 as a companion to the Bible. As you flee Kirtland tonight, this record travels with you. What role does it play as the keystone of the Restoration?',
        options: [
            'A. The Book of Mormon is valued mainly as a historical and cultural record, offering insight into early beliefs but limited doctrinal authority today.',
            'B. The Book of Mormon supports the Bible and provides useful teachings, though most core doctrine is still understood primarily through biblical scripture.',
            'C. The Book of Mormon serves as the keystone of the Restoration, testifying of Jesus Christ and confirming Joseph Smith’s prophetic calling through spiritual witness.',
            'D. The Book of Mormon played an important role in the early Restoration, though later revelations and teachings now hold greater doctrinal emphasis.'
        ],
        correctIndex: 2,
        explanation: '✅ Correct! Joseph Smith called the Book of Mormon "the most correct of any book on earth" and "the keystone of our religion." It is a second testament of Jesus Christ — a record of God\'s dealings with ancient peoples in the Americas — and evidence of the Restoration itself. Readers are promised a personal witness of its truth through the Holy Ghost (Moroni 10:4–5). It remains central to missionary work, family study, and personal conversion today and always.'
    }
];

// =============================================================
// PUZZLE 3 STATE
// =============================================================
let selectedRevId = null;
let currentMatches = {};
let matchColorIndex = 0;

// =============================================================
// DRAG-AND-DROP STATE (Puzzle 1)
// =============================================================
let draggingItem = null;
let shuffledEvents = [];

// =============================================================
// UTILITY FUNCTIONS
// =============================================================
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    gameState.currentScreen = id;
}

function showFeedback(id, type, titleText, bodyHtml, scoreText) {
    const box = document.getElementById('feedback-' + id);
    if (!box) return;
    box.className = 'feedback-box show ' + type;
    box.innerHTML = `
        <div class="feedback-title">${titleText}</div>
        ${scoreText ? `<div class="feedback-score">${scoreText}</div>` : ''}
        <div class="feedback-body">${bodyHtml}</div>
    `;
}

function showUnlockAnimation(icon, msg, sub, callback) {
    const overlay = document.getElementById('unlock-overlay');
    document.getElementById('unlock-icon').textContent = icon;
    document.getElementById('unlock-msg').textContent = msg;
    document.getElementById('unlock-sub').textContent = sub;
    overlay.classList.add('show');
    setTimeout(() => {
        overlay.classList.remove('show');
        if (callback) callback();
    }, 2400);
}

function updateProgressHeader(completedPuzzleNum) {
    for (let i = 1; i <= 4; i++) {
        const step = document.getElementById('step-' + i);
        const conn = document.getElementById('conn-' + i);
        if (i < completedPuzzleNum) {
            step.className = 'step completed';
            step.textContent = '✓';
        } else if (i === completedPuzzleNum) {
            step.className = 'step active';
            step.textContent = i;
        } else {
            step.className = 'step locked';
            step.textContent = i;
        }
        if (conn && i < completedPuzzleNum) conn.classList.add('lit');
    }
    if (completedPuzzleNum > 4) {
        for (let i = 1; i <= 4; i++) {
            const step = document.getElementById('step-' + i);
            step.className = 'step completed';
            step.textContent = '✓';
            const conn = document.getElementById('conn-' + i);
            if (conn) conn.classList.add('lit');
        }
        document.querySelector('.header-lock').textContent = '🌅';
    }
}

// =============================================================
// GAME START / RESTART
// =============================================================
function startGame() {
    updateProgressHeader(1);
    buildTimeline();
    showScreen('screen-puzzle1');
}

function restartGame() {
    gameState.scores = { p1: 0, p2: 0, p3: 0, p4: 0 };
    gameState.completed = { p1: false, p2: false, p3: false, p4: false };
    selectedRevId = null;
    currentMatches = {};
    matchColorIndex = 0;

    for (let i = 1; i <= 4; i++) {
        const step = document.getElementById('step-' + i);
        step.className = 'step locked';
        step.textContent = i;
        const conn = document.getElementById('conn-' + i);
        if (conn) conn.classList.remove('lit');
    }
    document.querySelector('.header-lock').textContent = '🕯️';

    ['1','2','3','4'].forEach(n => {
        const fb = document.getElementById('feedback-' + n);
        if (fb) { fb.className = 'feedback-box'; fb.innerHTML = ''; }
    });

    showScreen('screen-intro');
}

// =============================================================
// PUZZLE 1 — TIMELINE (Drag and Drop)
// =============================================================
function buildTimeline() {
    shuffledEvents = shuffle(timelineEvents);
    const list = document.getElementById('timeline-list');
    list.innerHTML = '';

    shuffledEvents.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.setAttribute('draggable', 'true');
        item.dataset.id = event.id;
        item.innerHTML = `
            <div class="drag-handle">⋮⋮</div>
            <div class="event-body">
                <div class="event-title">${event.title}</div>
                <div class="event-hint">${event.hint}</div>
            </div>
            <div class="event-position"></div>
        `;
        list.appendChild(item);
    });

    setupDragDrop();
}

function shuffleTimeline() {
    const fb = document.getElementById('feedback-1');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
    buildTimeline();
}

function setupDragDrop() {
    const list = document.getElementById('timeline-list');

    list.addEventListener('dragstart', e => {
        const item = e.target.closest('.timeline-item');
        if (!item) return;
        draggingItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    list.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const target = e.target.closest('.timeline-item');
        if (target && target !== draggingItem) {
            list.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            target.classList.add('drag-over');
        }
    });

    list.addEventListener('dragleave', e => {
        const target = e.target.closest('.timeline-item');
        if (target) target.classList.remove('drag-over');
    });

    list.addEventListener('drop', e => {
        e.preventDefault();
        const target = e.target.closest('.timeline-item');
        if (target && target !== draggingItem) {
            target.classList.remove('drag-over');
            const allItems = [...list.children];
            const dragIdx = allItems.indexOf(draggingItem);
            const targetIdx = allItems.indexOf(target);
            if (dragIdx < targetIdx) {
                list.insertBefore(draggingItem, target.nextSibling);
            } else {
                list.insertBefore(draggingItem, target);
            }
        }
    });

    list.addEventListener('dragend', () => {
        list.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('dragging', 'drag-over');
        });
        draggingItem = null;
    });
}

function checkTimeline() {
    const list = document.getElementById('timeline-list');
    const items = [...list.querySelectorAll('.timeline-item')];
    let correctCount = 0;

    items.forEach((item, index) => {
        const id = item.dataset.id;
        const event = timelineEvents.find(e => e.id === id);
        const posEl = item.querySelector('.event-position');
        const correct = event.correctOrder === (index + 1);
        item.classList.remove('correct', 'wrong');
        posEl.textContent = event.correctOrder;

        if (correct) {
            item.classList.add('correct');
            correctCount++;
        } else {
            item.classList.add('wrong');
        }
    });

    gameState.scores.p1 = correctCount;

    if (correctCount === 8) {
        gameState.completed.p1 = true;
        showFeedback(
            '1', 'success',
            '✅ Perfect — The Road Ahead is Clear!',
            `You correctly placed all 8 events in chronological order. You know the full story — from the Sacred Grove in 1820 to the Kirtland Temple in 1836. That knowledge is yours to carry.<br><br>
            <em>The Restoration unfolded from the First Vision through the temple dedication, each event building upon the last as the Lord restored His Church "line upon line."</em>
            <br><br><button class="btn-next" onclick="nextChallenge(1)">Proceed to Challenge 2: Evaluating the Sources →</button>`,
            '8 / 8 Correct ✓'
        );
        updateProgressHeader(2);
    } else if (correctCount >= 5) {
        showFeedback(
            '1', 'partial',
            `📜 Close — ${correctCount}/8 Correct`,
            `You placed <strong>${correctCount} of 8</strong> events correctly. The numbers on each card show their correct positions. Review and try again, or continue when ready.<br><br>
            <button class="btn-next" onclick="retryTimeline()">↩ Try Again</button>
            &nbsp;&nbsp;
            <button class="btn-next" onclick="nextChallenge(1)">Continue Anyway →</button>`,
            `${correctCount} / 8 Correct`
        );
    } else {
        showFeedback(
            '1', 'error',
            `🔒 Not Yet — ${correctCount}/8 Correct`,
            `You placed <strong>${correctCount} of 8</strong> events correctly. Review the hint dates on each card and try again.<br><br>
            <button class="btn-next" onclick="retryTimeline()">↩ Try Again</button>`,
            `${correctCount} / 8 Correct`
        );
    }

    setTimeout(() => {
        document.getElementById('feedback-1').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

function retryTimeline() {
    const list = document.getElementById('timeline-list');
    list.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('correct', 'wrong');
        item.querySelector('.event-position').textContent = '';
    });
    const fb = document.getElementById('feedback-1');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
    buildTimeline();
}

// =============================================================
// PUZZLE 2 — SOURCE EVALUATION
// =============================================================
function buildSources() {
    const container = document.getElementById('source-cards');
    container.innerHTML = '';

    sourcesData.forEach(source => {
        const card = document.createElement('div');
        card.className = 'source-card';
        card.id = 'source-card-' + source.id;

        const optionsHtml = source.options.map((opt, idx) => `
            <label class="source-option" id="src-opt-${source.id}-${idx}">
                <input type="radio" name="source-${source.id}" value="${idx}"
                    onchange="selectSourceOption(${source.id}, ${idx})">
                <span>${opt}</span>
            </label>
        `).join('');

        card.innerHTML = `
            <div class="source-card-num">${source.num}</div>
            <div class="source-name">${source.name}</div>
            <div class="source-description">"${source.description}"</div>
            <div class="source-options" id="src-opts-${source.id}">${optionsHtml}</div>
            <div class="source-result" id="src-result-${source.id}"></div>
        `;
        container.appendChild(card);
    });
}

function selectSourceOption(sourceId, optIdx) {
    const container = document.getElementById('src-opts-' + sourceId);
    container.querySelectorAll('.source-option').forEach(el => el.classList.remove('selected'));
    document.getElementById(`src-opt-${sourceId}-${optIdx}`).classList.add('selected');
}

function checkSources() {
    let correctCount = 0;
    let allAnswered = true;

    sourcesData.forEach(source => {
        const selected = document.querySelector(`input[name="source-${source.id}"]:checked`);
        if (!selected) { allAnswered = false; return; }

        const userIdx = parseInt(selected.value);
        const card = document.getElementById('source-card-' + source.id);
        const resultEl = document.getElementById('src-result-' + source.id);
        const correct = userIdx === source.correctIndex;

        card.classList.remove('correct', 'wrong');
        card.classList.add(correct ? 'correct' : 'wrong');

        if (correct) {
            correctCount++;
            resultEl.className = 'source-result correct-result';
            resultEl.innerHTML = source.explanation;
        } else {
            resultEl.className = 'source-result wrong-result';
            resultEl.innerHTML = `❌ Not quite. The best answer was: <strong>${source.options[source.correctIndex]}</strong><br><br>${source.explanation}`;
        }
    });

    if (!allAnswered) {
        showFeedback('2', 'error', '⚠️ Evaluate All Sources',
            'Make sure you have selected an answer for all six sources before submitting.', null);
        return;
    }

    gameState.scores.p2 = correctCount;

    if (correctCount === 6) {
        gameState.completed.p2 = true;
        showFeedback('2', 'success', '✅ Sources Evaluated — Truth Secured!',
            `You correctly evaluated all 6 sources. You can distinguish primary accounts from biased polemics, peer-reviewed scholarship from unsourced claims — skills that matter whenever the history of the Restoration is contested.<br><br>
            <button class="btn-next" onclick="nextChallenge(2)">Proceed to Challenge 3: Revelation Matching →</button>`,
            '6 / 6 Correct ✓');
        updateProgressHeader(3);
    } else if (correctCount >= 4) {
        showFeedback('2', 'partial', `📜 Good Work — ${correctCount}/6 Correct`,
            `You evaluated <strong>${correctCount} of 6</strong> correctly. Review the explanations on each source card, then continue.<br><br>
            <button class="btn-next" onclick="nextChallenge(2)">Continue to Challenge 3 →</button>`,
            `${correctCount} / 6 Correct`);
    } else {
        showFeedback('2', 'error', `🔒 Study the Sources — ${correctCount}/6 Correct`,
            `You evaluated <strong>${correctCount} of 6</strong> correctly. Read each explanation carefully — they contain the key criteria historians use to evaluate Restoration sources.<br><br>
            <button class="btn-next" onclick="retrySources()">↩ Try Again</button>`,
            `${correctCount} / 6 Correct`);
    }

    setTimeout(() => {
        document.getElementById('feedback-2').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

function retrySources() {
    sourcesData.forEach(source => {
        document.getElementById('source-card-' + source.id).classList.remove('correct', 'wrong');
        const resultEl = document.getElementById('src-result-' + source.id);
        resultEl.className = 'source-result';
        resultEl.innerHTML = '';
        document.querySelectorAll(`input[name="source-${source.id}"]`).forEach(r => r.checked = false);
        document.getElementById('src-opts-' + source.id).querySelectorAll('.source-option').forEach(el => el.classList.remove('selected'));
    });
    const fb = document.getElementById('feedback-2');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
}

// =============================================================
// PUZZLE 3 — REVELATION MATCHING
// =============================================================
function buildMatching() {
    const revContainer = document.getElementById('rev-items');
    const ctxContainer = document.getElementById('ctx-items');
    revContainer.innerHTML = '';
    ctxContainer.innerHTML = '';
    document.getElementById('match-status-list').innerHTML = '';
    currentMatches = {};
    selectedRevId = null;
    matchColorIndex = 0;

    const shuffledCtx = shuffle(matchingData);

    matchingData.forEach(item => {
        const revEl = document.createElement('div');
        revEl.className = 'rev-item';
        revEl.id = 'rev-' + item.id;
        revEl.dataset.id = item.id;
        revEl.innerHTML = `<strong>${item.revShort.split('—')[0].trim()}</strong><br>
            <span style="font-family:Cinzel,serif;font-size:0.8rem;color:var(--text-light);">${item.revShort.split('—').slice(1).join('—').trim()}</span><br>
            <small style="opacity:0.65;font-style:italic;font-size:0.8em;">${item.revelation.split('\n')[1]}</small>`;
        revEl.onclick = () => selectRevelation(item.id);
        revContainer.appendChild(revEl);
    });

    shuffledCtx.forEach(item => {
        const ctxEl = document.createElement('div');
        ctxEl.className = 'ctx-item';
        ctxEl.id = 'ctx-' + item.id;
        ctxEl.dataset.id = item.id;
        ctxEl.innerHTML = `<strong>${item.ctxShort}</strong><br>
            <small style="font-style:italic;opacity:0.75;font-size:0.83em;">${item.context.substring(0, 100)}…</small>`;
        ctxEl.onclick = () => selectContext(item.id);
        ctxContainer.appendChild(ctxEl);
    });

    updateMatchPanel();
}

function selectRevelation(revId) {
    const revEl = document.getElementById('rev-' + revId);
    if (revEl.classList.contains('matched')) return;
    document.querySelectorAll('.rev-item.selected').forEach(el => el.classList.remove('selected'));
    if (selectedRevId === revId) { selectedRevId = null; return; }
    selectedRevId = revId;
    revEl.classList.add('selected');
}

function selectContext(ctxId) {
    if (selectedRevId === null) return;
    const ctxEl = document.getElementById('ctx-' + ctxId);
    if (ctxEl.classList.contains('matched')) return;

    const existingRevForCtx = Object.entries(currentMatches).find(([r, c]) => c === ctxId);
    if (existingRevForCtx) removeMatch(parseInt(existingRevForCtx[0]));
    if (currentMatches[selectedRevId] !== undefined) removeMatch(selectedRevId);

    const colorIdx = matchColorIndex % 5;
    matchColorIndex++;

    currentMatches[selectedRevId] = ctxId;

    const revEl = document.getElementById('rev-' + selectedRevId);
    revEl.classList.remove('selected');
    revEl.classList.add('matched', 'matched-' + colorIdx);
    revEl.dataset.colorIdx = colorIdx;

    ctxEl.classList.add('matched', 'matched-' + colorIdx);
    ctxEl.dataset.colorIdx = colorIdx;

    updateMatchPanel();
    selectedRevId = null;
}

function removeMatch(revId) {
    const ctxId = currentMatches[revId];
    if (ctxId === undefined) return;
    const revEl = document.getElementById('rev-' + revId);
    const ctxEl = document.getElementById('ctx-' + ctxId);
    const colorIdx = revEl ? revEl.dataset.colorIdx : 0;
    if (revEl) { revEl.classList.remove('matched', 'matched-' + colorIdx); delete revEl.dataset.colorIdx; }
    if (ctxEl) { ctxEl.classList.remove('matched', 'matched-' + colorIdx); delete ctxEl.dataset.colorIdx; }
    delete currentMatches[revId];
    updateMatchPanel();
}

function clearMatches() {
    Object.keys(currentMatches).forEach(id => removeMatch(parseInt(id)));
    document.querySelectorAll('.rev-item,.ctx-item').forEach(el => {
        const base = el.classList.contains('rev-item') ? 'rev-item' : 'ctx-item';
        el.className = base;
        delete el.dataset.colorIdx;
    });
    currentMatches = {};
    matchColorIndex = 0;
    selectedRevId = null;
    updateMatchPanel();
    const fb = document.getElementById('feedback-3');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
}

function updateMatchPanel() {
    const panel = document.getElementById('match-status-list');
    panel.innerHTML = '';
    const matchCount = Object.keys(currentMatches).length;

    if (matchCount === 0) {
        panel.innerHTML = '<div style="color:#c9a227;font-size:0.8rem;font-family:Cinzel,serif;text-align:center;opacity:0.6;line-height:1.6;">Click a revelation,<br>then a context</div>';
        return;
    }

    Object.entries(currentMatches).forEach(([revId, ctxId], i) => {
        const revEl = document.getElementById('rev-' + revId);
        const colorIdx = revEl ? revEl.dataset.colorIdx : 0;
        const pair = document.createElement('div');
        pair.className = `match-pair match-pair-${colorIdx}`;
        pair.innerHTML = `✓ Pair ${i + 1}`;
        panel.appendChild(pair);
    });

    const remaining = 5 - matchCount;
    if (remaining > 0) {
        const rem = document.createElement('div');
        rem.style.cssText = 'font-size:0.75rem;color:#c9a227;opacity:0.6;font-family:Cinzel,serif;text-align:center;margin-top:6px;';
        rem.textContent = `${remaining} remaining`;
        panel.appendChild(rem);
    }
}

function checkMatching() {
    if (Object.keys(currentMatches).length < 5) {
        showFeedback('3', 'error', '⚠️ Match All Five',
            'Please match all five revelations to their historical context before submitting.', null);
        return;
    }

    let correctCount = 0;
    let explanations = [];

    Object.entries(currentMatches).forEach(([revId, ctxId]) => {
        const correct = parseInt(revId) === parseInt(ctxId);
        const item = matchingData.find(m => m.id === parseInt(revId));
        const revEl = document.getElementById('rev-' + revId);
        const ctxEl = document.getElementById('ctx-' + ctxId);
        const colorIdx = revEl ? revEl.dataset.colorIdx : 0;

        revEl.classList.remove('matched', ...['0','1','2','3','4'].map(n => 'matched-' + n));
        ctxEl.classList.remove('matched', ...['0','1','2','3','4'].map(n => 'matched-' + n));

        if (correct) {
            correctCount++;
            revEl.classList.add('correct-match');
            ctxEl.classList.add('correct-match');
            explanations.push(`✅ <strong>${item.revShort.split('—')[0].trim()}</strong>: ${item.context}`);
        } else {
            revEl.classList.add('wrong-match');
            ctxEl.classList.add('wrong-match');
            explanations.push(`❌ <strong>${item.revShort.split('—')[0].trim()}</strong> was mismatched. Correct: ${item.ctxShort}`);
        }
    });

    gameState.scores.p3 = correctCount;

    const expHtml = '<ul style="margin-top:10px;padding-left:18px;display:flex;flex-direction:column;gap:8px;">' +
        explanations.map(e => `<li style="font-size:0.9rem;line-height:1.5;">${e}</li>`).join('') + '</ul>';

    if (correctCount === 5) {
        gameState.completed.p3 = true;
        showFeedback('3', 'success', '✅ All Matches Correct — Revelations Remembered!',
            `Perfect score! You correctly matched all five Kirtland-era revelations to their historical context. These truths travel with you out of Kirtland.<br>${expHtml}<br>
            <button class="btn-next" onclick="nextChallenge(3)">Proceed to Challenge 4: Modern Application →</button>`,
            '5 / 5 Correct ✓');
        updateProgressHeader(4);
    } else if (correctCount >= 3) {
        showFeedback('3', 'partial', `📜 Nearly There — ${correctCount}/5 Correct`,
            `You matched <strong>${correctCount} of 5</strong> correctly. Review the results and try again, or continue.<br>${expHtml}<br>
            <button class="btn-next" onclick="retryMatching()">↩ Try Again</button>
            &nbsp;&nbsp;
            <button class="btn-next" onclick="nextChallenge(3)">Continue Anyway →</button>`,
            `${correctCount} / 5 Correct`);
    } else {
        showFeedback('3', 'error', `🔒 Study the Revelations — ${correctCount}/5`,
            `You matched <strong>${correctCount} of 5</strong> correctly. Review the Kirtland context of each D&C section and try again.<br>${expHtml}<br>
            <button class="btn-next" onclick="retryMatching()">↩ Try Again</button>`,
            `${correctCount} / 5 Correct`);
    }

    setTimeout(() => {
        document.getElementById('feedback-3').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

function retryMatching() {
    buildMatching();
    const fb = document.getElementById('feedback-3');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
}

// =============================================================
// PUZZLE 4 — MODERN APPLICATION
// =============================================================
function buildModern() {
    const container = document.getElementById('modern-questions');
    container.innerHTML = '';

    modernQuestions.forEach((q, index) => {
        const block = document.createElement('div');
        block.className = 'modern-question';
        block.id = 'modern-q-' + q.id;

        const optHtml = q.options.map((opt, idx) => `
            <label class="answer-option" id="mod-opt-${q.id}-${idx}">
                <input type="radio" name="modern-${q.id}" value="${idx}"
                    onchange="selectModernOption(${q.id}, ${idx})">
                <span>${opt}</span>
            </label>
        `).join('');

        block.innerHTML = `
            <div class="question-num">Question ${index + 1} of 5</div>
            <div class="question-text">${q.question}</div>
            <div class="answer-options">${optHtml}</div>
            <div class="question-result" id="mod-result-${q.id}"></div>
        `;
        container.appendChild(block);
    });
}

function selectModernOption(qId, optIdx) {
    const block = document.getElementById('modern-q-' + qId);
    block.querySelectorAll('.answer-option').forEach(el => el.classList.remove('selected'));
    document.getElementById(`mod-opt-${qId}-${optIdx}`).classList.add('selected');
}

function checkModern() {
    let correctCount = 0;
    let allAnswered = true;

    modernQuestions.forEach(q => {
        const selected = document.querySelector(`input[name="modern-${q.id}"]:checked`);
        if (!selected) { allAnswered = false; return; }

        const userIdx = parseInt(selected.value);
        const block = document.getElementById('modern-q-' + q.id);
        const resultEl = document.getElementById('mod-result-' + q.id);
        const correct = userIdx === q.correctIndex;

        block.classList.remove('correct', 'wrong');
        block.classList.add(correct ? 'correct' : 'wrong');

        if (correct) {
            correctCount++;
            resultEl.className = 'question-result correct-result';
            resultEl.innerHTML = q.explanation;
        } else {
            resultEl.className = 'question-result wrong-result';
            resultEl.innerHTML = `❌ The best answer was: <strong>${q.options[q.correctIndex]}</strong><br><br>${q.explanation}`;
        }
    });

    if (!allAnswered) {
        showFeedback('4', 'error', '⚠️ Answer All Questions',
            'Please answer all five questions before submitting.', null);
        return;
    }

    gameState.scores.p4 = correctCount;

    if (correctCount === 5) {
        gameState.completed.p4 = true;
        showFeedback('4', 'success', '✅ Final Challenge Complete — Escape Successful!',
            `You answered all 5 questions correctly. You carry the Restoration forward — not just as history, but as living truth for the Church today.<br><br>
            <button class="btn-next" onclick="goToFinal()">🌅 View Final Reflection →</button>`,
            '5 / 5 Correct ✓');
        updateProgressHeader(5);
    } else if (correctCount >= 3) {
        showFeedback('4', 'partial', `📜 Almost There — ${correctCount}/5 Correct`,
            `You answered <strong>${correctCount} of 5</strong> correctly. Review the explanations and then proceed.<br><br>
            <button class="btn-next" onclick="goToFinal()">🌅 Continue to Final Reflection →</button>`,
            `${correctCount} / 5 Correct`);
    } else {
        showFeedback('4', 'error', `🔒 Keep Reflecting — ${correctCount}/5`,
            `You answered <strong>${correctCount} of 5</strong> correctly. Read each explanation and consider how these principles live in the Church today.<br><br>
            <button class="btn-next" onclick="retryModern()">↩ Try Again</button>
            &nbsp;&nbsp;
            <button class="btn-next" onclick="goToFinal()">Continue to Final →</button>`,
            `${correctCount} / 5 Correct`);
    }

    setTimeout(() => {
        document.getElementById('feedback-4').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

function retryModern() {
    modernQuestions.forEach(q => {
        document.getElementById('modern-q-' + q.id).classList.remove('correct', 'wrong');
        const resultEl = document.getElementById('mod-result-' + q.id);
        resultEl.className = 'question-result';
        resultEl.innerHTML = '';
        document.querySelectorAll(`input[name="modern-${q.id}"]`).forEach(r => r.checked = false);
        document.querySelectorAll(`[id^="mod-opt-${q.id}-"]`).forEach(el => el.classList.remove('selected'));
    });
    const fb = document.getElementById('feedback-4');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
}

// =============================================================
// NAVIGATION
// =============================================================
function nextChallenge(completedNum) {
    const icons = { 1: '📜', 2: '🔑', 3: '🌍' };
    const labels = {
        1: 'Evaluating the Sources',
        2: 'Revelation Matching',
        3: 'Modern Application'
    };
    showUnlockAnimation(
        icons[completedNum] || '🚪',
        `Challenge ${completedNum} Complete!`,
        `Moving to Challenge ${completedNum + 1}: ${labels[completedNum]}…`,
        () => showScreen('screen-puzzle' + (completedNum + 1))
    );
}

function goToFinal() {
    showUnlockAnimation(
        '🌅',
        'You Have Escaped Kirtland!',
        'Preparing your final reflection…',
        () => {
            buildFinalScreen();
            showScreen('screen-final');
        }
    );
}

function buildFinalScreen() {
    const s = gameState.scores;
    const m = gameState.maxScores;
    const total = s.p1 + s.p2 + s.p3 + s.p4;
    const maxTotal = m.p1 + m.p2 + m.p3 + m.p4;
    const pct = Math.round((total / maxTotal) * 100);

    document.getElementById('final-score-display').innerHTML = `
        <h3>Your Final Score</h3>
        <div class="score-grid">
            <div class="score-item">
                <div class="score-item-label">Challenge 1<br>Timeline</div>
                <div class="score-item-value">${s.p1}/${m.p1}</div>
            </div>
            <div class="score-item">
                <div class="score-item-label">Challenge 2<br>Sources</div>
                <div class="score-item-value">${s.p2}/${m.p2}</div>
            </div>
            <div class="score-item">
                <div class="score-item-label">Challenge 3<br>Revelations</div>
                <div class="score-item-value">${s.p3}/${m.p3}</div>
            </div>
            <div class="score-item">
                <div class="score-item-label">Challenge 4<br>Application</div>
                <div class="score-item-value">${s.p4}/${m.p4}</div>
            </div>
        </div>
        <div class="score-total">
            Total Score: <span>${total} / ${maxTotal}</span> &nbsp;(${pct}%)
        </div>
    `;
}

// =============================================================
// INITIALIZE
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    buildTimeline();
    buildSources();
    buildMatching();
    buildModern();
    updateMatchPanel();
});
