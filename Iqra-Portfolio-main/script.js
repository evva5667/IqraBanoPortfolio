// Function to pause all videos and iframes
function pauseAllVideos() {
    // Pause all video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
        }
        video.currentTime = 0;
        // Remove autoplay attribute to prevent auto-restart
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'metadata');
    });
    
    // Stop all iframes (YouTube, Canva, LoveFreq, Afternoon Nap, etc.)
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const src = iframe.src;
        if (src) {
            // Stop hover/preview embeds (mute autoplay previews) by unloading them
            if (iframe.dataset && iframe.dataset.previewVideo === 'true') {
                iframe.src = 'about:blank';
                return;
            }
            // Unload LoveFreq / Afternoon Nap embeds to stop audio when navigating away
            if (src.includes('lovefreq') || src.includes('Afternoon_Nap_Movie')) {
                iframe.src = 'about:blank';
                return;
            }
            // For YouTube iframes
            if (src.includes('youtube.com') || src.includes('youtu.be')) {
                if (src.includes('autoplay=1')) {
                    iframe.src = src.replace('autoplay=1', 'autoplay=0');
                }
            }
            // For Canva iframes with autoplay
            if (src.includes('canva.com') && src.includes('embedAutoplay=true')) {
                iframe.src = src.replace('embedAutoplay=true', 'embedAutoplay=false');
            }
        }
    });
}

function showPage(pageId) {
    // Prevent default link behavior
    if (event) {
        event.preventDefault();
    }
    
    // Pause all videos when switching pages
    pauseAllVideos();
    
    // Handle about page - scroll to about section instead of switching pages
    if (pageId === 'about') {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
            // Show home page first
            const homePage = document.getElementById('home-page');
            if (homePage) {
                homePage.classList.add('active');
            }
            
            // Hide all other pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                if (page.id !== 'home-page') {
                    page.classList.remove('active');
                }
            });
            
            // Hide all project detail pages
            const projectDetailPages = document.querySelectorAll('.project-detail-page');
            projectDetailPages.forEach(page => page.classList.remove('active'));
            
            // Show side navigation bar
            const sideNav = document.querySelector('.side-nav');
            if (sideNav) {
                sideNav.style.display = 'flex';
            }
            
            // Hide Milo-specific bottom nav bar
            const miloBottomNav = document.querySelector('.milo-bottom-nav-bar');
            if (miloBottomNav) {
                miloBottomNav.style.display = 'none';
            }
            
            // Update navigation active state
            const navItems = document.querySelectorAll('.side-nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            const clickedNav = event ? event.target.closest('.side-nav-item') : null;
            if (clickedNav) {
                clickedNav.classList.add('active');
            }
            
            // Pause all videos before scrolling to about section
            pauseAllVideos();
            
            // Smooth scroll to about section
            setTimeout(() => {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Pause videos again after scroll completes
                setTimeout(() => {
                    pauseAllVideos();
                }, 500);
            }, 100);
            return;
        }
    }
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Hide all project detail pages
    const projectDetailPages = document.querySelectorAll('.project-detail-page');
    projectDetailPages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.classList.add('active');
    } else if (pageId === 'role-results') {
        // Handle role-results page
        const roleResultsPage = document.getElementById('role-results-page');
        if (roleResultsPage) {
            roleResultsPage.classList.add('active');
        }
    }
    
    // Show side navigation bar (main nav)
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) {
        sideNav.style.display = 'flex';
    }
    
    // Hide Milo-specific bottom nav bar
    const miloBottomNav = document.querySelector('.milo-bottom-nav-bar');
    if (miloBottomNav) {
        miloBottomNav.style.display = 'none';
    }
    
    // Update navigation active state
    const navItems = document.querySelectorAll('.side-nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked nav item
    if (event) {
        const clickedNav = event.target.closest('.side-nav-item');
        if (clickedNav) {
            clickedNav.classList.add('active');
        }
    } else {
        // If called programmatically, find the nav item by pageId
        const targetNavItem = document.querySelector(`.side-nav-item[onclick*="showPage('${pageId}')"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }
    
    // Scroll to top (except for about which scrolls to section)
    if (pageId !== 'about') {
        window.scrollTo(0, 0);
    }
}

function showProjectDetail(projectId, event) {
    // Prevent event bubbling if called from button click
    if (event) {
        event.stopPropagation();
    }
    
    // Pause all videos when switching to project detail
    pauseAllVideos();
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the appropriate project detail page
    let targetPageId;
    switch (projectId) {
        case 'nexus':
            targetPageId = 'project-detail-page';
            break;
        case 'chores':
            targetPageId = 'chores-detail-page';
            break;
        case 'lovefreq':
            targetPageId = 'lovefreq-detail-page';
            break;
        case 'afternoonnap':
            targetPageId = 'afternoonnap-detail-page';
            break;
        case 'milo':
            targetPageId = 'milo-detail-page';
            break;
        case 'geo':
            targetPageId = 'geo-detail-page';
            break;
        case 'eng-social':
            targetPageId = 'eng-social-detail-page';
            break;
        case 'playhard':
            targetPageId = 'playhard-detail-page';
            break;
        case 'impact-investing':
            targetPageId = 'impact-investing-detail-page';
            break;
        case 'oyo':
            targetPageId = 'oyo-detail-page';
            break;
        case 'terran':
            targetPageId = 'terran-detail-page';
            break;
        case 'rights-of-nature':
            targetPageId = 'rights-of-nature-detail-page';
            break;
        case 'oceanarium':
            targetPageId = 'oceanarium-detail-page';
            break;
        case 'chan-to-zen':
            targetPageId = 'chan-to-zen-detail-page';
            break;
        case 'vreal':
            targetPageId = 'vreal-detail-page';
            break;
        case 'vision-thief':
            targetPageId = 'vision-thief-detail-page';
            break;
        case 'reconnect-booth':
            targetPageId = 'reconnect-booth-detail-page';
            break;
        case 'pyrosense':
            targetPageId = 'pyrosense-detail-page';
            break;
        case 'lovable-hackathon':
            targetPageId = 'lovable-hackathon-detail-page';
            break;
        case 'mysk':
            targetPageId = 'mysk-detail-page';
            break;
        case 'subless':
            targetPageId = 'subless-detail-page';
            break;
        case 'deloitte':
            targetPageId = 'deloitte-detail-page';
            break;
        case 'recycl-fit':
            targetPageId = 'recycl-fit-detail-page';
            break;
        case 'plan-it-travel-app':
            targetPageId = 'plan-it-travel-app-detail-page';
            break;
        case 'nodetaking-ai-app':
            targetPageId = 'nodetaking-ai-app-detail-page';
            break;
        case 'reco-wearable-tech':
            targetPageId = 'reco-wearable-tech-detail-page';
            break;
        case 'kpmg':
            targetPageId = 'kpmg-detail-page';
            break;
        case 'washing-machine-tracker':
            targetPageId = 'washing-machine-tracker-detail-page';
            break;
        case 'fastspiker':
            targetPageId = 'fastspiker-detail-page';
            break;
        case 'snn-methodology':
            targetPageId = 'snn-methodology-detail-page';
            break;
        case 'vaccine-equity':
            targetPageId = 'vaccine-equity-detail-page';
            break;
        case 'compliment-bot':
            targetPageId = 'compliment-bot-detail-page';
            break;
        case 'pilot-headset':
            targetPageId = 'pilot-headset-detail-page';
            break;
        case 'travel-suitcase':
            targetPageId = 'travel-suitcase-detail-page';
            break;
        case 'jordan':
            targetPageId = 'jordan-detail-page';
            break;
        default:
            targetPageId = 'projects-page';
    }
    
    const projectDetailPage = document.getElementById(targetPageId);
    if (projectDetailPage) {
        projectDetailPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Lazy-load LoveFreq iframe only when opening its detail page (avoids audio on projects grid)
    if (projectId === 'lovefreq') {
        const lovefreqIframe = document.getElementById('lovefreq-embed-iframe');
        if (lovefreqIframe) {
            const dataSrc = lovefreqIframe.getAttribute('data-src');
            if (dataSrc && (!lovefreqIframe.src || lovefreqIframe.src === 'about:blank')) {
                lovefreqIframe.src = dataSrc;
            }
        }
    }
    
    // Hide main side navigation when viewing project details
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) {
        sideNav.style.display = 'none';
    }
    
    // Show project-specific bottom nav bar for milo-style pages
    const allMiloNavs = document.querySelectorAll('.milo-bottom-nav-bar');
    allMiloNavs.forEach(nav => {
        const navProjectPage = nav.closest('.milo-style-page');
        if (navProjectPage && navProjectPage.id === targetPageId) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
}

function goBackToProjects() {
    // Pause all videos when going back
    pauseAllVideos();
    
    // Hide all project detail pages
    const projectDetailPages = document.querySelectorAll('.project-detail-page');
    projectDetailPages.forEach(page => page.classList.remove('active'));
    
    // Show projects page
    const projectsPage = document.getElementById('projects-page');
    if (projectsPage) {
        projectsPage.classList.add('active');
    }
    
    // Show side navigation again (main nav)
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) {
        sideNav.style.display = 'flex';
    }
    
    // Hide Milo-specific bottom nav bar
    const miloBottomNav = document.querySelector('.milo-bottom-nav-bar');
    if (miloBottomNav) {
        miloBottomNav.style.display = 'none';
    }
    
    // Update nav state to projects
    const navItems = document.querySelectorAll('.side-nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const projectsNavItem = document.querySelector('.side-nav-item[onclick*="showPage(\'projects\')"]');
    if (projectsNavItem) {
        projectsNavItem.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Ticker functionality
function updateTickerHeadlines(headlines) {
    const tickerText = document.getElementById('headlines');
    if (tickerText && headlines) {
        const separator = '<span class="headline-separator">●</span>';
        tickerText.innerHTML = headlines.join(separator);
    }
}

// Optional: Function to add new headlines dynamically
function addTickerHeadline(headline) {
    const tickerText = document.getElementById('headlines');
    if (tickerText) {
        const separator = '<span class="headline-separator">●</span>';
        tickerText.innerHTML += separator + headline;
    }
}

// Optional: Pause/Resume ticker on hover
document.addEventListener('DOMContentLoaded', function() {
    const tickerText = document.getElementById('headlines');
    if (tickerText) {
        tickerText.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tickerText.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // Rain effect for profile cards
    const profileCardSides = document.querySelectorAll('.profile-card-side');
    profileCardSides.forEach(profileCardSide => {
        let rainInterval;
        const rainTexts = [
            'HIRE MEE',
            "HIRE ME I'M ABOUT TO GRADUATE",
            'Please help me fund my Figma Addiction',
            'I make pixels behave :p',
            'I love burning my eyes on screen ^_^',
            'Your developers will love me. (I export assets correctly)'
        ];
        const rainColors = ['#f97300', '#2c2c34', '#d3d3d3', '#b1f200', '#f6ac00'];

        profileCardSide.addEventListener('mouseenter', () => {
            rainInterval = setInterval(() => {
                const textEl = document.createElement('div');
                textEl.classList.add('raining-text');
                
                const randomText = rainTexts[Math.floor(Math.random() * rainTexts.length)];
                textEl.innerText = randomText.toUpperCase();
                
                const randomColor = rainColors[Math.floor(Math.random() * rainColors.length)];
                textEl.style.backgroundColor = randomColor;

                if (randomColor === '#2c2c34') {
                    textEl.style.color = 'white';
                }

                textEl.style.left = Math.random() * window.innerWidth + 'px';
                const duration = Math.random() * 2 + 3;
                textEl.style.animationDuration = `${duration}s`;
                textEl.style.fontSize = `${Math.random() * 0.5 + 0.8}rem`;
                textEl.style.opacity = Math.random() * 0.5 + 0.5;

                document.body.appendChild(textEl);
                
                setTimeout(() => {
                    textEl.remove();
                }, duration * 1000);
            }, 150);
        });

        profileCardSide.addEventListener('mouseleave', () => {
            clearInterval(rainInterval);
        });
    });

    // About Section Animation
    const aboutSection = document.getElementById('about-section');
    
    if (aboutSection) {
        // Intersection Observer for about section visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class for animations
                    aboutSection.classList.add('visible');
                    // Pause all videos when About Me section becomes visible
                    pauseAllVideos();
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of section is visible
        });
        
        observer.observe(aboutSection);
    }

});

function showSnapshot(tab) {
    // Hide all snapshot panels
    const panels = document.querySelectorAll('.snapshot-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.snapshot-tab');
    tabs.forEach(t => t.classList.remove('active'));
    
    // Show selected panel
    const selectedPanel = document.getElementById('snapshot-' + tab);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Category mapping: old categories to new categories
const categoryMapping = {
    'design': ['creative-direction', 'product', 'competition'],
    'strategy': ['strategy', 'research'],
    'systems': ['system-design']
};

// Project descriptions for hover tooltips (kept in sync with README.md summaries)
const projectDescriptions = {
    'nexus': 'After the Applause — A short film + interactive website capturing NYU Abu Dhabi’s campus after graduation—built as a reflective, memory-driven experience. Role: UX/UI Designer, Developer, Filmmaker.',
    'chores': 'Do Your Chores! — A web-based, branching interactive comic that uses humor and choice-based storytelling. Role: UX Designer, Frontend Developer, Visual Storyteller.',
    'lovefreq': 'LoveFreq — An interactive “radio” website using multilingual audio scenes, soundscapes, and poetry to explore love across cultures. Role: UX Designer, Web Developer, Audio Producer.',
    'afternoonnap': 'Afternoon Nap — An interactive short film where subtle viewer choices guide the story and reveal emotional tension beneath an “ordinary” day. Role: UX Designer, Video Producer, Web Developer.',
    'milo': 'Book Illustration (Milo the Monkey) — A children’s book illustration project translating complex health topics into accessible storytelling about inclusion and respect. Role: Product Designer, Visual Storyteller.',
    'oceanarium': 'Exhibition Design — Global Arts (“Oceanarium”) — A research-based hybrid exhibition (physical + virtual) investigating art history, material culture, and marine ecology. Role: Exhibition Designer, Researcher.',
    'chan-to-zen': 'From Chan to Zen — An explainer video analyzing how Chan Buddhist art evolved into Zen art in Japan. Role: Video Producer, Researcher, Narrator.',
    'vreal': 'V!Real(ity) — An immersive interactive experience exploring perception through staged visual illusion experiments, culminating in VR. Role: Experience Designer, Creative Technologist, Visual Designer.',
    'vision-thief': 'The Vision Thief Card Game — A discussion-based, socially deductive card game designed to spark conversations about alternative futures. Role: Game Designer, Visual Designer.',
    'reconnect-booth': 'Reconnect Booth — A speculative design prototype imagining Abu Dhabi 2045: a booth for guided offline interactions that acts as a “relational speed bump” against digital disconnection. Role: Researcher, Prototype Designer.',
    'rights-of-nature': 'Imagining the Futures of Rights of Nature — A web-based interactive experience exploring how Rights of Nature could reshape legal and diplomatic systems (Swissnex Open Call winner). Role: Web Designer & Developer.',
    'compliment-bot': 'Garden by the Clouds (Compliment Bot) — An interactive art installation where flowers glow brighter when spoken compliments are detected. Role: Collaborator, Designer.',
    'geo': 'Graphic Designer — NYUAD — Designed 30+ schedules, merch, and digital assets that strengthened NYU’s global identity and boosted engagement. Role: Graphic Designer.',
    'eng-social': 'Eng Social Media — NYUAD — Built and managed a digital community + central dashboard connecting students with 10+ labs; grew engagement to 36k+ viewers. Role: Digital Community Manager.',
    'playhard': 'Playhard Marketing — Trend advising + content creation; designed 100% of social assets for 4 months. Role: Social Media Marketing Intern.',
    'impact-investing': 'Impact Investing and Ethical Supply Chains — Research and analysis on how impact investing can drive social/environmental outcomes while maintaining ethical supply chain standards. Role: Researcher, Writer.',
    'oyo': 'OYO — Investment Proposition — An investment proposition analysis evaluating OYO’s business model, market position, and investment potential. Role: Analyst, Strategist.',
    'terran': 'Terran Paragon & Denizen — A digital + strategic overhaul bridging MBA talent with emerging-market enterprises; delivered platform architecture and strategy frameworks. Role: Product Lead.',
    'pyrosense': 'PyroSense — A speculative systems concept for wildfire response: a “living robotic layer” supporting rangers, AI, and the forest as a symbiotic network. Role: Product/UX Designer, Lead Designer.',
    'lovable-hackathon': 'YUSR — Lovable Hackathon (3rd Place) — A PWA enabling confident navigation via crowdsourced accessibility data and AI recommendations. Role: Team Member, Product Designer.',
    'washing-machine-tracker': 'Washing Machine Tracker — A full-stack IoT solution for NYUAD laundry monitoring using real-time streaming + queuing to reduce overcrowding and theft. Role: Project Manager, UX/UI Designer, Full-Stack Developer.',
    'mysk': 'Mysk Cafe Growth Strategy — A self-initiated growth strategy proposal for a boutique cafe, focused on retention, community, and bridging a “digital disconnect.” Role: Strategic Growth Consultant (Independent Initiative).',
    'subless': 'Subless Cursor Hackathon (2nd Place) — Hackathon project currently in active development (details limited). Role: Team Member, Product Designer.',
    'deloitte': 'Deloitte Case Competition (Top 3) — Led a consulting team to design a 3-phase monetization overhaul for an IoT coffee machine provider; identified €25M+ annual growth potential. Role: Team Lead & Lead Strategist.',
    'kpmg': 'KPMG Case Competition (Top 4) — A Gen Z-centered policy ecosystem redesign for UAE Emiratization, aiming to move 1,000+ Emirati youth annually into private-sector roles. Role: Team Lead & Public Policy Strategist.',
    'recycl-fit': 'Hult Prize Global Challenge: Recycl-Fit — A circular textile-recycling facility concept combining hyperspectral fabric detection with mechanical + chemical recovery. Role: Team member (3-person team).',
    'plan-it-travel-app': 'Plan It: Collaborative Travel Planner — A group travel planning product concept/prototype that unifies itinerary building, scheduling, voting, and shared calendar collaboration. Role: Team member (3-person team).',
    'nodetaking-ai-app': 'Nodetaking: AI-Powered Knowledge Retrieval — A voice + text “second brain” concept using AI transcription + auto-tagging to turn fragmented notes into searchable knowledge. Role: Team member (3-person team).',
    'reco-wearable-tech': 'RECO: Smart Rehabilitation Clothing — A wearable tech prototype garment that tracks movement to improve physical therapy outcomes with continuous, non-intrusive monitoring. Role: Solo project — Iqra Bano.',
    'fastspiker': 'FastSpiker (Research Paper #1) — A neuromorphic computing framework to speed up training of spiking neural networks on event-based data. Role: Research Assistant, Co-Author.',
    'snn-methodology': 'SNN Methodology Study (Research Paper #2) — A systematic hyperparameter study linking network parameters to accuracy to support standardized SNN training. Role: Research Assistant, Co-Author.',
    'vaccine-equity': 'Strategic Resource Allocation: A Study in Vaccine Equity — A strategic audit of vaccine distribution frameworks, focusing on ethical trade-offs and administrative infrastructure needed to bridge equity gaps. Role: Strategic Analyst, Researcher.',
    'pilot-headset': '3D Model — Pilot Headset — A high-fidelity 3D model of a professional aviation headset (modeling, texturing, rendering). Role: 3D Artist, Modeler, Texture Artist.',
    'travel-suitcase': '3D Model — Travel Suitcase — A realistic 3D model of a travel suitcase with accurate functional details and material textures. Role: 3D Artist, Modeler, Texture Artist.',
    'jordan': 'From Ajloun to Petra: An Engineer’s Journey — A social impact + ethnographic research project from Jordan (EfSI program). Role: Engineering Student, Researcher, Ethnographer.'
};

// Function to count projects in each category
function updateCategoryCounts() {
    // Only count project cards (not list rows to avoid double counting)
    const projectCards = document.querySelectorAll('.project-card');
    
    const counts = {
        'all': projectCards.length,
        'design': 0,
        'strategy': 0,
        'systems': 0
    };
    
    projectCards.forEach(card => {
        const projectCategory = card.getAttribute('data-category');
        if (!projectCategory) return;
        
        const projectCategories = projectCategory.split(' ');
        
        // Count for each new category
        Object.keys(categoryMapping).forEach(newCat => {
            const shouldCount = categoryMapping[newCat].some(cat => 
                projectCategories.includes(cat)
            );
            if (shouldCount) {
                counts[newCat]++;
            }
        });
    });
    
    // Update filter button counts
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (counts[filter] !== undefined) {
            const countSpan = btn.querySelector('.filter-count');
            if (countSpan) {
                countSpan.textContent = counts[filter];
            }
        }
    });
}

function filterProjects(category) {
    // Update active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });

    // Show/hide project cards based on filter
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (!cardCategory) {
                card.classList.add('hidden');
                return;
            }
            
            const cardCategories = cardCategory.split(' ');
            
            // Check if card belongs to the selected category
            let shouldShow = false;
            
            if (categoryMapping[category]) {
                // Check if any of the card's categories match the new category
                shouldShow = categoryMapping[category].some(cat => 
                    cardCategories.includes(cat)
                );
            } else {
                // Fallback for direct category match
                shouldShow = cardCategories.includes(category);
            }
            
            if (shouldShow) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
    
    // Ensure tooltips are added to newly visible cards
    addProjectTooltips();

    // Show/hide list rows based on filter (list view)
    const listRows = document.querySelectorAll('.list-row');
    listRows.forEach(row => {
        if (category === 'all') {
            row.classList.remove('hidden');
        } else {
            const rowCategory = row.getAttribute('data-category');
            if (!rowCategory) {
                row.classList.add('hidden');
                return;
            }
            
            const rowCategories = rowCategory.split(' ');
            
            // Check if row belongs to the selected category
            let shouldShow = false;
            
            if (categoryMapping[category]) {
                // Check if any of the row's categories match the new category
                shouldShow = categoryMapping[category].some(cat => 
                    rowCategories.includes(cat)
                );
            } else {
                // Fallback for direct category match
                shouldShow = rowCategories.includes(category);
            }
            
            if (shouldShow) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        }
    });
}

function toggleView(viewType) {
    // Update active view toggle button
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    viewToggleBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === viewType) {
            btn.classList.add('active');
        }
    });

    // Show/hide grid and list views
    const gridView = document.getElementById('projects-grid-view');
    const listView = document.getElementById('projects-list-view');
    
    if (viewType === 'list') {
        if (gridView) gridView.style.display = 'none';
        if (listView) listView.style.display = 'block';
    } else {
        if (gridView) gridView.style.display = 'grid';
        if (listView) listView.style.display = 'none';
    }
}


function showMiloSnapshot(tab, projectId = 'milo', event = null) {
    console.log('showMiloSnapshot called:', tab, projectId);
    
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Handle special case for 'nexus' which uses 'project-detail-page'
    let pageId;
    if (projectId === 'nexus') {
        pageId = 'project-detail-page';
    } else {
        pageId = projectId + '-detail-page';
    }
    const projectPage = document.getElementById(pageId);
    console.log('Project page found:', !!projectPage, pageId);
    
    if (!projectPage) {
        console.error('Project page not found:', pageId);
        return false;
    }
    
    const snapshotContent = projectPage.querySelector('.milo-snapshot-content');
    console.log('Snapshot content found:', !!snapshotContent);
    
    if (!snapshotContent) {
        console.error('Snapshot content not found in:', pageId);
        return false;
    }
    
    const tabs = projectPage.querySelectorAll('.milo-tab');
    console.log('Tabs found:', tabs.length);
    tabs.forEach(t => t.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
        console.log('Tab activated via event.target');
    } else {
        const clickedTab = Array.from(tabs).find(t => {
            const onclick = t.getAttribute('onclick');
            return onclick && onclick.includes("'" + tab + "'");
        });
        if (clickedTab) {
            clickedTab.classList.add('active');
            console.log('Tab activated via onclick search');
        }
    }
    
    const panels = snapshotContent.querySelectorAll('.milo-snapshot-panel');
    console.log('Panels found:', panels.length);
    
    const panelId = projectId + '-snapshot-' + tab;
    const selectedPanel = document.getElementById(panelId);
    console.log('Selected panel found:', !!selectedPanel, panelId);
    
    if (!selectedPanel) {
        console.error('Panel not found:', panelId);
        console.log('Available panel IDs:', Array.from(panels).map(p => p.id));
        return false;
    }
    
    panels.forEach(panel => {
        panel.classList.remove('active');
        console.log('Removed active from:', panel.id);
    });
    
    selectedPanel.classList.add('active');
    console.log('Added active to:', selectedPanel.id);
    
    return false;
}

function toggleDocumentPreview(thumbnail, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        if (container.classList.contains('active')) {
            container.classList.remove('active');
            thumbnail.style.display = 'flex';
        } else {
            container.classList.add('active');
            thumbnail.style.display = 'none';
        }
    }
}

// Role Matcher Modal Functions
function openRoleMatcherModal() {
    const modal = document.getElementById('role-matcher-modal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open'); // Prevent background scrolling
    // Reset form
    resetRoleMatcherForm();
    // Focus on first input for better UX
    setTimeout(() => {
        document.getElementById('role-title-input')?.focus();
    }, 300);
}

function closeRoleMatcherModal() {
    const modal = document.getElementById('role-matcher-modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Restore scrolling
    // Reset form
    resetRoleMatcherForm();
}

function resetRoleMatcherForm() {
    // Show form, hide loading and results
    document.getElementById('role-matcher-form-section').style.display = 'block';
    document.getElementById('role-matcher-loading').style.display = 'none';
    document.getElementById('role-matcher-results').style.display = 'none';
    // Clear inputs
    document.getElementById('role-title-input').value = '';
    document.getElementById('role-description-input').value = '';
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('role-matcher-modal');
        if (modal && modal.style.display === 'flex') {
            closeRoleMatcherModal();
        }
    }
});

// Role Matcher Function - AI-Powered Project Matching
async function findRoleMatch() {
    const roleTitle = document.getElementById('role-title-input').value.trim();
    const roleDescription = document.getElementById('role-description-input').value.trim();
    
    if (!roleTitle && !roleDescription) {
        alert('Please enter at least a role title or description.');
        return;
    }
    
    // Hide form, show loading state
    document.getElementById('role-matcher-form-section').style.display = 'none';
    document.getElementById('role-matcher-loading').style.display = 'block';
    document.getElementById('role-matcher-results').style.display = 'none';
    
    // Collect all project data
    const projects = collectProjectData();
    
    try {
        // Call AI API to match projects and generate pitch
        const result = await matchProjectsWithAI(roleTitle, roleDescription, projects);
        
        // Display results
        displayMatchResults(roleTitle, roleDescription, result);
    } catch (error) {
        console.error('Error matching projects:', error);
        document.getElementById('loading-state').innerHTML = 
            '<p style="color: #ff6b6b;">Error: Could not match projects. Please try again.</p>';
    }
}

// Collect project data from the portfolio
function collectProjectData() {
    const projects = [];
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent || '';
        const category = card.getAttribute('data-category') || '';
        const projectId = card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '';
        
        // Get project details from detail pages if available
        const detailPage = document.getElementById(`${projectId}-detail-page`);
        let description = '';
        let skills = [];
        let role = '';
        
        if (detailPage) {
            // Extract overview description
            const overviewDesc = detailPage.querySelector('.milo-overview-description p');
            if (overviewDesc) description = overviewDesc.textContent;
            
            // Extract skills
            const skillItems = detailPage.querySelectorAll('.milo-overview-item');
            skillItems.forEach(item => {
                const label = item.querySelector('h3')?.textContent || '';
                const value = item.querySelector('.milo-item-right p')?.textContent || '';
                if (label === 'SKILL') {
                    skills = value.split(',').map(s => s.trim());
                }
                if (label === 'ROLE') {
                    role = value;
                }
            });
        }
        
        projects.push({
            id: projectId,
            title: title,
            category: category,
            description: description,
            skills: skills,
            role: role
        });
    });
    
    return projects;
}

// AI API call to match projects
async function matchProjectsWithAI(roleTitle, roleDescription, projects) {
    // Frontend-safe, deterministic matcher (no API key required).
    // Uses Iqra's role playbook (Tier 1 flagship projects first) + resume-backed proof points.

    const normalize = (s) =>
        (s || '')
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    const msg = normalize(`${roleTitle || ''} ${roleDescription || ''}`);

    const CONTACT = {
        email: 'ib2419@nyu.edu',
        resumeUrl: 'Images/Resume/IqraBanoResume.pdf'
    };

    const resumeProof = {
        courseFix: {
            students: '29K+',
            participants: '500+',
            datapoints: '600+',
            paper: 'OzCHI 2025'
        },
        community: {
            students: '~500',
            employers: '20',
            audiences: '3K+',
            members: '2K+',
            views: '36k+'
        },
        research: {
            experiments: '60+',
            papers: '2',
            venue: 'ICARCV 2024',
            nominee: 'Best Paper Award nominee'
        }
    };

    const ROLE_PLAYBOOK = {
        pm: {
            label: 'Product Management',
            hook:
                "Emphasize that Iqra isn't just a manager; she has a founder’s mindset (CourseFix) and can manage technical deployment (IoT Tracker).",
            tier1: [
                { title: 'CourseFix (Founder — full-stack product + research)', id: null },
                { title: 'Terran Paragon & Denizen (Product Lead, Strategy)', id: 'terran' },
                { title: 'Washing Machine Tracker (Product + Engineering Management)', id: 'washing-machine-tracker' }
            ],
            tier2: [
                { title: 'PyroSense (Speculative Product Lead)', id: 'pyrosense' },
                { title: 'V!Real(ity) (Capstone Product Owner)', id: 'vreal' }
            ]
        },
        strategy: {
            label: 'Strategy & Consulting',
            hook:
                'Highlight her award-winning business acumen. Show she can switch between corporate growth (Deloitte) and public policy (Vaccine Equity).',
            tier1: [
                { title: 'Deloitte Case Competition (Top 3, €25M+ growth)', id: 'deloitte' },
                { title: 'KPMG Case Competition (Top 4, Policy)', id: 'kpmg' },
                { title: 'Mysk Cafe (Growth & Retention Strategy)', id: 'mysk' }
            ],
            tier2: [
                { title: 'Vaccine Equity (Public Policy Audit)', id: 'vaccine-equity' },
                { title: 'Impact Investing (Supply Chain Analysis)', id: 'impact-investing' },
                { title: 'OYO Investment (Financial Strategy)', id: 'oyo' }
            ]
        },
        ux: {
            label: 'UX/UI & Product Design',
            hook:
                "Focus on 'bridging the gap'. She doesn't just design screens; she designs systems. Use RECO to show research-backed design.",
            tier1: [
                { title: 'Plan It (Collaborative Travel Planner)', id: 'plan-it-travel-app' },
                { title: 'Nodetaking (AI Knowledge Retrieval)', id: 'nodetaking-ai-app' },
                { title: 'RECO (Smart Rehab Wearable)', id: 'reco-wearable-tech' }
            ],
            tier2: [
                { title: 'Reconnect Booth (Speculative Design)', id: 'reconnect-booth' },
                { title: 'The Vision Thief (Game Design)', id: 'vision-thief' },
                { title: 'Imagining Rights of Nature (Web Design)', id: 'rights-of-nature' }
            ]
        },
        creative: {
            label: 'Creative Direction / Experience Design',
            hook:
                "Focus on storytelling & scale. Mention 'Garden by the Clouds' was displayed at the Louvre to establish prestige.",
            tier1: [
                { title: 'After the Applause (Creative Direction, Film)', id: 'nexus' },
                { title: 'Garden by the Clouds (Louvre display, Al Jazeera)', id: 'compliment-bot' },
                { title: 'V!Real(ity) (VR Experience)', id: 'vreal' }
            ],
            tier2: [
                { title: 'LoveFreq (Audio Storytelling)', id: 'lovefreq' },
                { title: 'Global Arts: Oceanarium (Exhibition Design)', id: 'oceanarium' },
                { title: 'Book Illustration (Visual Storytelling)', id: 'milo' }
            ]
        },
        marketing: {
            label: 'Marketing & Community',
            hook:
                'Prove results with numbers (36k+ viewers). Show she understands trend advising and community building, not just posting.',
            tier1: [
                { title: 'Playhard Marketing (Trend Advising)', id: 'playhard' },
                { title: 'Eng Social Media (36k+ engagement, Community Lead)', id: 'eng-social' }
            ],
            tier2: [
                { title: 'Terran Paragon (Branding/Content)', id: 'terran' },
                { title: 'From Ajloun to Petra (Ethnographic Research)', id: 'jordan' }
            ]
        },
        eng: {
            label: 'Engineering & Research',
            hook:
                "Frame this as her 'technical backbone'. She understands the code constraints of the products she designs.",
            tier1: [
                { title: 'Washing Machine Tracker (Full-Stack IoT)', id: 'washing-machine-tracker' },
                { title: 'FastSpiker (Published Paper)', id: 'fastspiker' },
                { title: 'SNN Methodology Study (Research Paper)', id: 'snn-methodology' }
            ],
            tier2: [
                { title: 'Subless Cursor (Hackathon — 2nd Place)', id: 'subless' },
                { title: 'YUSR (Hackathon — 3rd Place)', id: 'lovable-hackathon' }
            ]
        }
    };

    const detectRoleBucket = (t) => {
        // Order matters: if someone says "research", they may mean engineering/research track OR strategy/policy.
        if (t.match(/\b(product management|product manager|program manager|pm\b|project manager)\b/)) return 'pm';
        if (t.match(/\b(strategy|strategic|consult|consulting|case competition|growth|business|investment|finance)\b/))
            return 'strategy';
        if (t.match(/\b(ux|ui|ux\/ui|user experience|user interface|product design|interaction design|ux researcher)\b/))
            return 'ux';
        if (t.match(/\b(creative|storytelling|film|video|experience design|installation|exhibition|vr)\b/)) return 'creative';
        if (t.match(/\b(marketing|social|community|brand|content|engagement)\b/)) return 'marketing';
        if (t.match(/\b(engineer|engineering|full stack|iot|sql|python|pytorch|paper|published|research)\b/)) return 'eng';
        return null;
    };

    // Prefer the explicit role title (when provided) so keywords in the description
    // (e.g. "growth") don't accidentally override the intended track.
    const titleNorm = normalize(roleTitle || '');
    const bucketFromTitle =
        titleNorm.match(/\bmarketing\b|\bcommunity\b/) ? 'marketing' :
        titleNorm.match(/\bstrategy\b|\bconsult/) ? 'strategy' :
        titleNorm.match(/\bux\b|\bui\b|\bproduct design\b|\buser experience\b/) ? 'ux' :
        titleNorm.match(/\bproduct management\b|\bproduct manager\b|\bprogram manager\b|\bpm\b/) ? 'pm' :
        titleNorm.match(/\bengineering\b|\bresearch\b|\bengineer\b/) ? 'eng' :
        titleNorm.match(/\bcreative\b|\bexperience design\b|\bcreative direction\b/) ? 'creative' :
        null;

    const bucket = bucketFromTitle || detectRoleBucket(msg);

    const getProjectFromId = (id) => projects.find((p) => p.id === id) || null;

    const formatProjectItem = (entry, tierLabel) => {
        if (!entry.id) {
            return {
                projectTitle: entry.title,
                relevance: `${tierLabel}. Resume-backed flagship: led a 4-person team to build CourseFix for ${resumeProof.courseFix.students} students; ran mixed-method research with ${resumeProof.courseFix.participants} participants; integrated ${resumeProof.courseFix.datapoints} course datapoints into an AI model; authored a peer-reviewed paper accepted at ${resumeProof.courseFix.paper}.`,
                projectId: ''
            };
        }

        const p = getProjectFromId(entry.id);
        const title = p?.title || entry.title;

        // Prefer curated map; fallback to DOM description.
        const baseDesc = (projectDescriptions && projectDescriptions[entry.id]) || p?.description || '';
        const trimmed = baseDesc && baseDesc.length > 180 ? `${baseDesc.substring(0, 180)}...` : baseDesc;

        return {
            projectTitle: title,
            relevance: `${tierLabel}. ${trimmed || 'Strong proof of relevant skills and outcomes for this role.'}`,
            projectId: entry.id
        };
    };

    const buildContactFallback = () => {
        return (
            `\n\nI’m still learning details about Iqra’s full experience. If you have a specific question I can’t answer confidently, ` +
            `please email ${CONTACT.email} — or review her resume (${CONTACT.resumeUrl}) and projects on this site.`
        );
    };

    // If bucket not detected, return a safe, high-signal guidance response (no guessing).
    if (!bucket || !ROLE_PLAYBOOK[bucket]) {
        const pitch =
            `Tell me the role track you’re hiring for (Product Management, Strategy/Consulting, UX/UI & Product Design, ` +
            `Creative Direction, Marketing/Community, Engineering/Research) and I’ll recommend the flagship projects first.` +
            buildContactFallback();

        // Best-of starter set (mix of flagship across tracks)
        const bestOf = [
            formatProjectItem({ title: 'CourseFix (Founder — full-stack product + research)', id: null }, 'Tier 1'),
            formatProjectItem({ title: 'Washing Machine Tracker (Full-Stack IoT)', id: 'washing-machine-tracker' }, 'Tier 1'),
            formatProjectItem({ title: 'Deloitte Case Competition (Top 3, €25M+ growth)', id: 'deloitte' }, 'Tier 1'),
            formatProjectItem({ title: 'Plan It (Collaborative Travel Planner)', id: 'plan-it-travel-app' }, 'Tier 1')
        ];

        return { pitch, matchedProjects: bestOf };
    }

    const play = ROLE_PLAYBOOK[bucket];

    // Build Tier 1 first, then Tier 2 for depth (keep order).
    const matchedProjects = [
        ...play.tier1.map((e) => formatProjectItem(e, 'Tier 1')),
        ...play.tier2.map((e) => formatProjectItem(e, 'Tier 2'))
    ]
        // Filter out items that fail to resolve to an id + title (safety)
        .filter((m) => m && m.projectTitle);

    const roleLine = roleTitle ? roleTitle : play.label;

    // Role-specific pitch with resume-backed proof points.
    let pitch = '';
    if (bucket === 'pm') {
        pitch =
            `${roleLine}: Founder’s mindset + technical delivery. ` +
            `CourseFix shows end-to-end PM execution (team of 4; built for ${resumeProof.courseFix.students} students; research with ${resumeProof.courseFix.participants} students; ${resumeProof.courseFix.datapoints} course datapoints into an AI model; paper accepted at ${resumeProof.courseFix.paper}). ` +
            `Washing Machine Tracker adds real deployment fluency (full-stack/IoT). ` +
            `Terran Paragon reinforces product strategy + stakeholder delivery. ` +
            `${play.hook}` +
            buildContactFallback();
    } else if (bucket === 'strategy') {
        pitch =
            `${roleLine}: Award-driven strategy + policy range. ` +
            `Lead with Deloitte (Top 3, €25M+ growth) and KPMG (Top 4, policy) to prove structured problem solving under pressure. ` +
            `Add Mysk Cafe for retention/growth thinking, then Vaccine Equity / Impact Investing / OYO for analytical depth. ` +
            `${play.hook}` +
            buildContactFallback();
    } else if (bucket === 'ux') {
        pitch =
            `${roleLine}: Research-backed product design that connects screens → systems. ` +
            `Plan It + Nodetaking show modern product UX (flows, collaboration, AI retrieval), while RECO proves applied research and system-level thinking. ` +
            `Iqra’s resume also supports real research scale (mixed-method work with ${resumeProof.courseFix.participants} participants). ` +
            `${play.hook}` +
            buildContactFallback();
    } else if (bucket === 'creative') {
        pitch =
            `${roleLine}: Storytelling + scale across media. ` +
            `After the Applause and V!Real(ity) show directed narrative experiences; Garden by the Clouds anchors prestige and public-facing impact. ` +
            `Use LoveFreq/Oceanarium/Milo for additional narrative craft and exhibition sensibility. ` +
            `${play.hook}` +
            buildContactFallback();
    } else if (bucket === 'marketing') {
        pitch =
            `${roleLine}: Results-first marketing + community building. ` +
            `Lead with Playhard + Eng Social to prove trend advising, content systems, and growth. ` +
            `Resume proof points: ${resumeProof.community.views} views lift from content work; built a community of ${resumeProof.community.students} students; engaged ${resumeProof.community.members} members; and supported ${resumeProof.community.employers} employer engagements via partnerships programming. ` +
            `${play.hook}` +
            buildContactFallback();
    } else {
        pitch =
            `${roleLine}: Technical backbone for product work. ` +
            `Washing Machine Tracker proves full-stack IoT delivery; FastSpiker + SNN Methodology show published research depth. ` +
            `Resume proof points: ran ${resumeProof.research.experiments} experiments; co-authored ${resumeProof.research.papers} papers at ${resumeProof.research.venue} (${resumeProof.research.nominee}). ` +
            `${play.hook}` +
            buildContactFallback();
    }

    return { pitch, matchedProjects };
}

// Fallback mock response generator
function generateMockResponse(roleTitle, roleDescription, projects) {
    // Simple keyword matching as fallback
    const searchTerms = (roleTitle + ' ' + roleDescription).toLowerCase();
    const matched = projects
        .map(p => ({
            project: p,
            score: calculateRelevanceScore(p, searchTerms)
        }))
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(m => {
            // Get better description from projectDescriptions map
            const description = projectDescriptions[m.project.id] || m.project.description || '';
            const shortDesc = description.length > 120 ? description.substring(0, 120) + '...' : description;
            
            return {
                projectTitle: m.project.title,
                relevance: shortDesc || `This project demonstrates relevant experience in ${m.project.category} and showcases skills that align with the role requirements.`,
                projectId: m.project.id
            };
        });
    
    if (matched.length === 0) {
        return {
            pitch: `Iqra has diverse experience across Design, Strategy, and Systems. While I couldn't find exact matches for "${roleTitle || 'this role'}", her portfolio demonstrates strong capabilities in product design, UX/UI, research, and strategic thinking.`,
            matchedProjects: []
        };
    }
    
    const pitch = `Based on the role requirements for ${roleTitle || 'this position'}, Iqra brings a unique combination of technical expertise, design thinking, and research capabilities that make her an exceptional fit. Her portfolio demonstrates strong experience through projects like ${matched.slice(0, 3).map(m => m.projectTitle).join(', ')}. These projects highlight her ability to work across different domains and deliver impactful results.`;
    
    return {
        pitch: pitch,
        matchedProjects: matched
    };
}

// Simple relevance scoring function
function calculateRelevanceScore(project, searchTerms) {
    let score = 0;
    const projectText = (project.title + ' ' + project.description + ' ' + project.category + ' ' + project.skills.join(' ') + ' ' + (project.role || '')).toLowerCase();
    
    // Enhanced keyword matching
    const terms = searchTerms.split(' ').filter(t => t.length > 2);
    
    // Category mapping for better matching
    const categoryKeywords = {
        'ux': ['ux', 'ui', 'user experience', 'user interface', 'interface', 'experience design', 'creative-direction', 'product'],
        'ui': ['ux', 'ui', 'user interface', 'interface', 'creative-direction', 'product'],
        'design': ['design', 'creative', 'visual', 'graphic', 'creative-direction', 'product', 'competition'],
        'strategy': ['strategy', 'strategic', 'consulting', 'business', 'strategy', 'research'],
        'system': ['system', 'iot', 'technical', 'development', 'system-design', 'product'],
        'product': ['product', 'product design', 'product development', 'product', 'creative-direction'],
        'research': ['research', 'study', 'analysis', 'research']
    };
    
    terms.forEach(term => {
        // Direct text match
        if (projectText.includes(term)) {
            score += 2;
        }
        
        // Category keyword matching
        Object.keys(categoryKeywords).forEach(key => {
            if (term.includes(key) || categoryKeywords[key].includes(term)) {
                if (categoryKeywords[key].some(cat => project.category && project.category.includes(cat))) {
                    score += 3;
                }
            }
        });
    });
    
    return score;
}

// Display match results
function displayMatchResults(roleTitle, roleDescription, result) {
    // Hide loading, show results
    document.getElementById('role-matcher-loading').style.display = 'none';
    document.getElementById('role-matcher-results').style.display = 'block';
    
    // Update header
    document.getElementById('searched-role').textContent = 
        `Role: ${roleTitle || 'Not specified'}${roleDescription ? ' | ' + roleDescription.substring(0, 80) + '...' : ''}`;
    
    // Display pitch
    document.getElementById('pitch-text').textContent = result.pitch;
    
    // Display matched projects
    const projectsContainer = document.getElementById('matched-projects');
    projectsContainer.innerHTML = '';
    
    result.matchedProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'matched-project-card';
        card.innerHTML = `
            <h3>${project.projectTitle}</h3>
            <p class="match-reason">${project.relevance}</p>
            <a href="#" class="view-docs-btn" onclick="showProjectDetail('${project.projectId}'); closeRoleMatcherModal(); return false;">
                View Documentation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"/>
                    <path d="M15 3h6v6" stroke="currentColor" stroke-width="2"/>
                    <path d="M10 14L21 3" stroke="currentColor" stroke-width="2"/>
                </svg>
            </a>
        `;
        projectsContainer.appendChild(card);
    });
    
    // Scroll to top of modal content
    document.querySelector('.role-matcher-modal-content').scrollTop = 0;
}

// AI Chat Functions
function openAIChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('ai-chat-input');
            if (input) input.focus();
        }, 100);
    }
}

function closeAIChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendAIMessage();
    }
}

async function sendAIMessage() {
    const input = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');
    const sendButton = document.querySelector('.ai-chat-send');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Clear input
    input.value = '';
    input.disabled = true;
    sendButton.disabled = true;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Check if this is a role matching request
    const lowerMessage = message.toLowerCase();
    const isRoleMatchRequest = lowerMessage.match(/match.*project|find.*project|project.*match|role.*project|what.*project.*role|which.*project|projects.*for.*role|projects.*suitable|projects.*relevant/i) ||
                              lowerMessage.match(/i'm looking for|hiring for|need.*for.*role|searching for.*role|what.*project.*for.*role/i);
    
    // Check if this is a domain/type query (should follow the playbook ordering)
    // Examples:
    // - "Tell me about her marketing experience"
    // - "Show UX/UI projects"
    // - "What strategy work has she done?"
    const isProjectTypeQuery =
        lowerMessage.match(
            /show.*(ux|ui|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|engineering)|tell.*about.*(ux|ui|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|engineering)|what.*(ux|ui|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|engineering)|list.*(ux|ui|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|engineering)|(ux|ui|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|engineering).*project/i
        ) ||
        (lowerMessage.match(
            /ux|ui|ux\/ui|user experience|user interface|interface design|experience design|design|strategy|system|product|research|creative|marketing|community|brand|content|engagement|social|engineering|full stack|iot|paper|published/
        ) &&
            lowerMessage.match(/project|projects|portfolio|work|experience|show|tell|list|what|which/));
    
    if (isRoleMatchRequest) {
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        try {
            // Extract role information from the message
            const roleInfo = extractRoleInfo(message);
            
            // Collect project data
            const projects = collectProjectData();
            
            // Match projects
            const result = await matchProjectsWithAI(roleInfo.title, roleInfo.description, projects);
            
            removeTypingIndicator(typingIndicator);
            
            // Display role matching results in chat
            displayRoleMatchInChat(result, roleInfo);
        } catch (error) {
            console.error('Role matching error:', error);
            removeTypingIndicator(typingIndicator);
            addChatMessage("I'm having trouble matching projects right now. Could you try rephrasing your request? For example: 'What projects match a Product Designer role?'", 'ai');
        }
    } else if (isProjectTypeQuery) {
        // Project type queries should follow the playbook ordering (Tier 1 → Tier 2),
        // not dump every category match.
        const typingIndicator = showTypingIndicator();

        try {
            // Small delay to show typing indicator
            await new Promise(resolve => setTimeout(resolve, 500));

            const projects = collectProjectData();

            const lower = message.toLowerCase();
            let roleTitle = '';

            // Important: prioritize explicit track words in the user's query.
            // Example bug: "Marketing & Community ... (engagement, growth)" was being routed to Strategy
            // because we matched "growth" before we matched "marketing/community".
            if (lower.match(/marketing|social|community|brand|content|engagement/)) {
                roleTitle = 'Marketing & Community';
            } else if (lower.match(/ux|ui|ux\/ui|user experience|user interface|interface design|experience design|product design|interaction design/)) {
                roleTitle = 'UX/UI & Product Design';
            } else if (lower.match(/strategy|strategic|consulting|business|case comp|case competition|growth/)) {
                roleTitle = 'Strategy & Consulting';
            } else if (lower.match(/product management|product manager|program manager|pm\b|project manager/)) {
                roleTitle = 'Product Management';
            } else if (lower.match(/engineering|engineer|full stack|iot|sql|python|pytorch|paper|published|research/)) {
                roleTitle = 'Engineering & Research';
            } else if (lower.match(/creative|storytelling|film|video|experience design|installation|exhibition|vr/)) {
                roleTitle = 'Creative Direction / Experience Design';
            }

            const roleInfo = { title: roleTitle, description: message };
            const result = await matchProjectsWithAI(roleTitle, message, projects);

            removeTypingIndicator(typingIndicator);
            displayRoleMatchInChat(result, roleInfo);
        } catch (error) {
            console.error('Project type query error:', error);
            removeTypingIndicator(typingIndicator);
            addChatMessage(`I’m still learning details about Iqra’s full experience. If you have a specific question, you can reach her at <a href="mailto:ib2419@nyu.edu" style="color: white; text-decoration: underline;">ib2419@nyu.edu</a> or open her resume: <a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">View Resume (PDF)</a>.`, 'ai');
        }
    } else {
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Get AI response
        try {
            const response = await getAIResponse(message);
            removeTypingIndicator(typingIndicator);
            addChatMessage(response, 'ai');
        } catch (error) {
            console.error('AI Chat error:', error);
            removeTypingIndicator(typingIndicator);
            addChatMessage("I'm having trouble connecting right now. Please try again later!", 'ai');
        }
    }
    
    // Re-enable input
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
}

// Extract role information from user message
function extractRoleInfo(message) {
    // Try to extract role title and description from the message
    const roleTitleMatch = message.match(/(?:for|as|a|an|the)\s+([A-Z][a-zA-Z\s]+?(?:Designer|Developer|Researcher|Manager|Engineer|Analyst|Strategist|Director|Lead|Specialist))/i);
    const roleTitle = roleTitleMatch ? roleTitleMatch[1].trim() : '';
    
    // Use the full message as description if no specific title found
    const description = roleTitle ? message.replace(new RegExp(roleTitle, 'i'), '').trim() : message;
    
    return {
        title: roleTitle,
        description: description
    };
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: copy text to clipboard (used in About contact panel)
async function copyToClipboard(text, btnEl) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'absolute';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }

        if (btnEl) {
            const prev = btnEl.textContent;
            btnEl.textContent = 'Copied';
            btnEl.disabled = true;
            setTimeout(() => {
                btnEl.textContent = prev;
                btnEl.disabled = false;
            }, 1200);
        }
    } catch (e) {
        if (btnEl) {
            const prev = btnEl.textContent;
            btnEl.textContent = 'Copy failed';
            setTimeout(() => {
                btnEl.textContent = prev;
            }, 1200);
        }
    }
}

// Display role matching results in chat
function displayRoleMatchInChat(result, roleInfo) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    
    // Create response message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-chat-message ai-message';
    
    let responseHTML = `
        <div class="ai-chat-avatar-small">
            <img src="Images/Image01.png" alt="Iqra">
        </div>
        <div class="ai-message-content">
            <p><strong>Here are the projects that match ${roleInfo.title || 'this role'}:</strong></p>
            <p style="margin-top: 12px;">${result.pitch}</p>
            <div class="chat-matched-projects" style="margin-top: 16px;">
    `;
    
    if (result.matchedProjects && result.matchedProjects.length > 0) {
        result.matchedProjects.forEach(project => {
            const viewButton = project.projectId
                ? `<button onclick="showProjectDetail('${project.projectId}'); closeAIChat(); return false;" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        View Project →
                   </button>`
                : `<a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; text-decoration: none;">
                        View Resume →
                   </a>`;

            responseHTML += `
                <div class="chat-project-card" style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 12px; margin-bottom: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h4 style="margin: 0 0 8px 0; color: white; font-size: 1rem;">${escapeHtml(project.projectTitle)}</h4>
                    <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.8); font-size: 0.875rem; line-height: 1.5;">${escapeHtml(project.relevance)}</p>
                    ${viewButton}
                </div>
            `;
        });
    } else {
        responseHTML += `<p style="color: rgba(255, 255, 255, 0.7);">I couldn't find specific matches, but Iqra has diverse experience across Design, Strategy, and Systems. Would you like to see projects from a specific category?</p>`;
    }
    
    responseHTML += `
            </div>
            <p style="margin-top: 12px; font-size: 0.875rem; color: rgba(255, 255, 255, 0.7);">You can click "View Project" to see full details, or ask me more about any specific project!</p>
        </div>
    `;
    
    messageDiv.innerHTML = responseHTML;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addChatMessage(text, type) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    
    // Keep suggested questions visible - don't hide them
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-chat-message ${type}-message`;
    
    if (type === 'ai') {
        // Check if text contains HTML (project cards)
        // Also allow simple HTML links (e.g., resume link) to render as clickable anchors.
        const isHTML =
            text.includes('<div') ||
            text.includes('<h4') ||
            text.includes('<button') ||
            text.includes('<a');
        
        if (isHTML) {
            // HTML response (for project lists)
            messageDiv.innerHTML = `
                <div class="ai-chat-avatar-small">
                    <img src="Images/Image01.png" alt="Iqra">
                </div>
                <div class="ai-message-content">
                    ${text}
                </div>
            `;
        } else {
            // Plain text response
            messageDiv.innerHTML = `
                <div class="ai-chat-avatar-small">
                    <img src="Images/Image01.png" alt="Iqra">
                </div>
                <div class="ai-message-content">
                    <p>${escapeHtml(text)}</p>
                </div>
            `;
        }
    } else {
        messageDiv.innerHTML = `
            <div class="user-message-content">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return null;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-chat-message ai-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="ai-chat-avatar-small">
            <img src="Images/Image01.png" alt="Iqra">
        </div>
        <div class="ai-chat-typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
}

function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to handle suggested question clicks
function askSuggestedQuestion(question) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
        input.value = question;
        sendAIMessage();
    }
    // Keep suggested questions visible - don't hide them
}

// Get projects by type (UX/UI, Design, Strategy, Systems)
function getProjectsByType(userMessage, projects) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Map user queries to project categories
    let targetCategories = [];
    let categoryName = '';
    let categoryDescription = '';
    
    if (lowerMessage.match(/ux|ui|ux\/ui|user experience|user interface|interface design|experience design/)) {
        targetCategories = ['creative-direction', 'product'];
        categoryName = 'UX/UI Design';
        categoryDescription = 'These projects showcase Iqra\'s work in user experience and interface design, including interactive experiences, web interfaces, and user-centered design solutions.';
    } else if (lowerMessage.match(/design|creative|visual|graphic|exhibition|illustration/)) {
        targetCategories = ['creative-direction', 'product', 'competition'];
        categoryName = 'Design';
        categoryDescription = 'These projects demonstrate Iqra\'s creative direction, visual design, and design thinking across various mediums including interactive experiences, exhibitions, and visual narratives.';
    } else if (lowerMessage.match(/strategy|strategic|consulting|business/)) {
        targetCategories = ['strategy', 'research'];
        categoryName = 'Strategy & Research';
        categoryDescription = 'These projects highlight Iqra\'s strategic thinking, business analysis, and research capabilities including consulting work, market analysis, and research methodologies.';
    } else if (lowerMessage.match(/system|iot|technical|development|product.*development/)) {
        targetCategories = ['system-design', 'product'];
        categoryName = 'Systems & Product Development';
        categoryDescription = 'These projects showcase Iqra\'s technical skills in system design, IoT development, and product engineering including integrated systems and technical solutions.';
    } else if (lowerMessage.match(/product|product design/)) {
        targetCategories = ['product', 'creative-direction'];
        categoryName = 'Product Design';
        categoryDescription = 'These projects demonstrate Iqra\'s product design work, combining user research, design thinking, and technical implementation to create user-centered products.';
    } else if (lowerMessage.match(/research|study|analysis|methodology/)) {
        targetCategories = ['research'];
        categoryName = 'Research';
        categoryDescription = 'These projects showcase Iqra\'s research work including academic research, data analysis, and research methodologies.';
    }
    
    // Filter projects by category
    const matchedProjects = projects.filter(project => {
        if (!project.category) return false;
        const projectCategories = project.category.split(' ');
        return targetCategories.some(cat => projectCategories.includes(cat));
    });
    
    if (matchedProjects.length === 0) {
        return `<p>I don't have any projects specifically in that category right now. Iqra's work spans <strong>Design</strong>, <strong>Strategy</strong>, and <strong>Systems</strong>. Would you like me to show you projects from a different category? You can ask for "UX/UI projects", "Design projects", "Strategy projects", or "Systems projects".</p>`;
    }
    
    // Build response with project list
    let responseHTML = `
        <p><strong>Here are Iqra's ${categoryName} projects:</strong></p>
        <p style="margin-top: 8px; margin-bottom: 12px; color: rgba(255, 255, 255, 0.8); font-size: 0.875rem;">${categoryDescription}</p>
        <div class="chat-matched-projects" style="margin-top: 12px;">
    `;
    
    matchedProjects.slice(0, 8).forEach(project => {
        // Get description from projectDescriptions map or use project description
        let description = projectDescriptions[project.id] || project.description || '';
        
        // Truncate if too long
        if (description.length > 150) {
            description = description.substring(0, 150) + '...';
        }
        
        if (!description) {
            description = 'A project showcasing relevant skills and experience.';
        }
        
        responseHTML += `
            <div class="chat-project-card" style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 12px; margin-bottom: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <h4 style="margin: 0 0 8px 0; color: white; font-size: 1rem;">${escapeHtml(project.title)}</h4>
                <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.8); font-size: 0.875rem; line-height: 1.5;">${escapeHtml(description)}</p>
                <button onclick="showProjectDetail('${project.id}'); closeAIChat(); return false;" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                    View Project →
                </button>
            </div>
        `;
    });
    
    responseHTML += `
        </div>
        <p style="margin-top: 12px; font-size: 0.875rem; color: rgba(255, 255, 255, 0.7);">
            Found <strong>${matchedProjects.length}</strong> ${categoryName.toLowerCase()} project${matchedProjects.length > 1 ? 's' : ''}. 
            You can click "View Project" to see more details, or ask me about a specific project!
        </p>
    `;
    
    return responseHTML;
}

// AI Response Generator (Personality-based)
async function getAIResponse(userMessage) {
    // Lightweight “portfolio knowledge” from DOM + curated summaries (no API key needed)
    let projects = [];
    try {
        projects = collectProjectData();
    } catch (e) {
        projects = [];
    }

    const normalize = (s) =>
        (s || '')
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    const msg = normalize(userMessage);

    const pickBestProject = () => {
        if (!projects.length) return null;

        // Score by title token overlap + id mention + common aliases
        const aliasToId = {
            'after the applause': 'nexus',
            'the vision thief': 'vision-thief',
            'vision thief': 'vision-thief',
            'rights of nature': 'rights-of-nature',
            'reco': 'reco-wearable-tech',
            'compliment bot': 'compliment-bot',
            'garden by the clouds': 'compliment-bot',
            'oceanarium': 'oceanarium',
            'do your chores': 'chores',
            'chan to zen': 'chan-to-zen'
        };

        for (const alias of Object.keys(aliasToId)) {
            if (msg.includes(alias)) {
                const id = aliasToId[alias];
                return projects.find((p) => p.id === id) || null;
            }
        }

        let best = null;
        let bestScore = 0;

        projects.forEach((p) => {
            const titleN = normalize(p.title);
            const idN = normalize(p.id);

            let score = 0;
            if (idN && msg.includes(idN)) score += 6;
            if (titleN && msg.includes(titleN)) score += 8;

            const titleTokens = titleN.split(' ').filter((t) => t.length > 2);
            titleTokens.forEach((t) => {
                if (msg.includes(t)) score += 1;
            });

            if (score > bestScore) {
                bestScore = score;
                best = p;
            }
        });

        return bestScore >= 3 ? best : null;
    };

    // If user mentions a specific project, answer with that project's summary + role and a button.
    const matchedProject = pickBestProject();
    if (matchedProject) {
        const description =
            projectDescriptions[matchedProject.id] ||
            matchedProject.description ||
            `Here’s a quick overview of ${matchedProject.title}.`;

        // Try to infer role from detail-page data; fallback to summary string.
        const roleLine = matchedProject.role ? `<p><strong>Role:</strong> ${escapeHtml(matchedProject.role)}</p>` : '';

        return `
            <div>
                <p><strong>${escapeHtml(matchedProject.title)}</strong></p>
                <p style="margin-top: 10px;">${escapeHtml(description)}</p>
                ${roleLine}
                <button onclick="showProjectDetail('${matchedProject.id}'); closeAIChat(); return false;" style="margin-top: 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 8px 12px; border-radius: 10px; font-size: 0.9rem; cursor: pointer;">
                    View Project →
                </button>
            </div>
        `;
    }

    // Personality traits and information about Iqra
    const personality = {
        name: "Iqra",
        traits: [
            "enthusiastic about product design",
            "multidisciplinary background in computer engineering, psychology, and design",
            "passionate about human-centered design",
            "interested in the intersection of technology and human behavior",
            "enjoys creative problem-solving",
            "values research and data-informed decisions",
            "collaborative team player",
            "curious and always learning",
            "passionate about making a positive impact"
        ],
        background: {
            education: "NYU Abu Dhabi",
            location: "Abu Dhabi, UAE",
            expertise: ["Product Design", "UX/UI", "Product Strategy", "Research", "Interactive Design"],
            interests: ["Product development", "User research", "Design systems", "Emerging technologies", "Travel", "Hiking", "Global experiences"]
        },
        competitions: {
            firstPlace: ["Swissnex Global Open Call"],
            secondPlace: ["MENA Cursor x Violet Ventures"],
            thirdPlace: ["Antler x Lovable Hackathon"],
            honorableMentions: ["HULT Prize", "KPMG Case Competition", "Deloitte Case Competition"],
            top15: ["MENA 2023 Bloomberg competition"]
        },
        leadership: {
            roles: [
                "Interactive Media Major Representative at NYUAD",
                "President at Urban Hike (Public Relations Committee)",
                "Global Career Peer at NYUAD"
            ]
        },
        globalExperiences: [
            "NYU Global Seminars in Jordan, Egypt, and Korea",
            "OzCHI Conference in Australia"
        ],
        tone: "friendly, professional, enthusiastic, helpful"
    };
    
    // Simple keyword-based responses (can be replaced with actual AI API)
    const lowerMessage = (userMessage || '').toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/hi|hello|hey|greetings/)) {
        return `Hi — I’m Iqra’s portfolio assistant. Tell me what role you’re hiring for (Product Management, Strategy/Consulting, UX/UI & Product Design, Creative Direction, Marketing/Community, Engineering/Research) and I’ll recommend the flagship projects first.\n\nIf you ask something I can’t answer confidently, I’ll point you to her resume/projects or you can reach her at ib2419@nyu.edu.`;
    }

    // Domain “experience” questions should use the playbook (Tier 1 → Tier 2), not a generic bio.
    // Examples: "tell me about her marketing experience", "what is her strategy experience", "ux/ui experience?"
    const wantsDomainExperience =
        lowerMessage.match(/tell|show|list|what|which/) ||
        lowerMessage.match(/experience|background|work/);

    const domainBucket =
        lowerMessage.match(/marketing|community|brand|content|engagement|social/) ? 'Marketing & Community' :
        lowerMessage.match(/strategy|consult|consulting|business|growth|investment|finance|case competition|policy/) ? 'Strategy & Consulting' :
        lowerMessage.match(/ux|ui|ux\/ui|user experience|user interface|product design|interaction design|ux researcher/) ? 'UX\/UI & Product Design' :
        lowerMessage.match(/product management|product manager|program manager|\bpm\b|project manager/) ? 'Product Management' :
        lowerMessage.match(/engineering|engineer|full stack|iot|sql|python|pytorch|paper|published|research/) ? 'Engineering & Research' :
        lowerMessage.match(/creative|storytelling|film|video|experience design|installation|exhibition|vr/) ? 'Creative Direction / Experience Design' :
        '';

    if (wantsDomainExperience && domainBucket) {
        try {
            const result = await matchProjectsWithAI(domainBucket, userMessage, projects);

            const cards = (result.matchedProjects || []).map((p) => {
                const view =
                    p.projectId
                        ? `<button onclick="showProjectDetail('${p.projectId}'); closeAIChat(); return false;" style="margin-top: 10px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 8px 12px; border-radius: 10px; font-size: 0.9rem; cursor: pointer;">
                               View Project →
                           </button>`
                        : `<a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 10px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 8px 12px; border-radius: 10px; font-size: 0.9rem; text-decoration: none;">
                               View Resume →
                           </a>`;

                return `
                    <div class="chat-project-card" style="background: rgba(255, 255, 255, 0.05); border-radius: 10px; padding: 12px; margin-top: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h4 style="margin: 0 0 8px 0; color: white; font-size: 1rem;">${escapeHtml(p.projectTitle)}</h4>
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; line-height: 1.45;">${escapeHtml(p.relevance)}</p>
                        ${view}
                    </div>
                `;
            }).join('');

            return `
                <div>
                    <p><strong>${escapeHtml(domainBucket)}</strong></p>
                    <p style="margin-top: 10px;">${escapeHtml(result.pitch || '')}</p>
                    ${cards}
                </div>
            `;
        } catch (e) {
            // If something goes wrong, fall through to safe fallback.
        }
    }
    
    // About work/experience
    if (lowerMessage.match(/work|experience|background|career|job/)) {
        return "Iqra is a product designer with a really interesting multidisciplinary background! She combines computer engineering, psychological research, and interactive design. She works across product strategy, UX/UI, and product development, using research and systems thinking to solve complex problems. Want to know more about any specific area?";
    }
    
    // About skills
    if (lowerMessage.match(/skill|expertise|what can|abilities|strengths/)) {
        return "Iqra’s strengths: UX/UI + product thinking, research-to-design synthesis, systems thinking, and clean handoff to engineering. If you tell me the role (and what you care about most), I can point you to the best matching projects.";
    }

    // “Why hire you?” / “Why me?”
    if (lowerMessage.match(/why me|why hire|perfect candidate|best fit|stand out/)) {
        return "Because she blends product thinking + research + execution. She’s shipped interactive experiences, led strategy/competition work, and built systems (including IoT). Tell me what role you’re hiring for (Product / UX / Strategy / Systems) and I’ll map her strongest projects to it.";
    }

    // Resume quick link
    if (lowerMessage.match(/resume|cv/)) {
        return `You can open the resume here: <a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">View Resume (PDF)</a>`;
    }
    
    // About projects - improved to be more helpful
    if (lowerMessage.match(/project|portfolio|work she|what has|examples|show.*project|tell.*about.*project/)) {
        // Check if they're asking about a specific type
        if (lowerMessage.match(/ux|ui|design|strategy|system|product|research|creative/)) {
            // This will be handled by getProjectsByType, but provide a helpful response
            return "Great question! Iqra has projects across Design, Strategy, and Systems. Could you be more specific? For example: 'Show me UX/UI projects' or 'What design projects has she done?'";
        }
        return "Iqra has worked on some really cool projects! From interactive experiences like 'After the Applause' to research papers on spiking neural networks, her portfolio is super diverse. She's also done strategy work, creative direction, and product development. You can ask me about specific types like 'UX/UI projects', 'Design projects', 'Strategy projects', or 'Systems projects'. Want me to show you some?";
    }
    
    // About education
    if (lowerMessage.match(/education|school|university|degree|study|learn/)) {
        return "Iqra studied at NYU Abu Dhabi! Her background is really unique - she combines computer engineering, psychological research, and interactive design. This multidisciplinary approach really shows in her work. She's currently based in Abu Dhabi, UAE, and has participated in global seminars in Jordan, Egypt, and Korea, plus attended the OzCHI Conference in Australia.";
    }
    
    // About leadership
    if (lowerMessage.match(/leadership|leader|manage|team|organize|president|representative/)) {
        return `Iqra has shown strong leadership throughout her time at NYUAD! She's served as the Interactive Media Major Representative, was President of the Public Relations Committee at Urban Hike, and is a Global Career Peer helping other students. These roles show she's not just skilled technically, but also great at organizing teams, communicating effectively, and supporting others. Leadership comes naturally to her!`;
    }
    
    // About competitions/achievements
    if (lowerMessage.match(/competition|win|award|achievement|accomplishment|prize|place/)) {
        return `Iqra has an impressive track record in competitions! She won 1st place at the Swissnex Global Open Call, 2nd place at MENA Cursor x Violet Ventures, and 3rd place at the Antler x Lovable Hackathon. She's also received honorable mentions at HULT Prize, KPMG, and Deloitte Case Competitions, and was Top 15 in the MENA 2023 Bloomberg competition. These achievements show her ability to perform under pressure and deliver results!`;
    }
    
    // About personality/what she's like
    if (lowerMessage.match(/personality|person|like|character|traits|who is|what is she/)) {
        return `Iqra is someone who combines curiosity with action! She's enthusiastic about product design but also deeply thoughtful - her background in psychology shows she really cares about understanding people. She's collaborative, always learning, and passionate about making a positive impact. Outside of work, she loves traveling (she's been to Jordan, Egypt, Korea, and Australia for academic programs) and hiking. She's the kind of person who brings energy to a team while also being a great listener and problem-solver.`;
    }
    
    // About interests/hobbies
    if (lowerMessage.match(/interest|hobby|outside|free time|enjoy|passion|what does she like/)) {
        return `Iqra has a really diverse set of interests! She's passionate about product development and emerging technologies, but also loves exploring the world. She's participated in global seminars in Jordan, Egypt, and Korea, and attended conferences in Australia. She's also into hiking (she was President of Urban Hike's PR Committee!). Her interests reflect her curiosity about different cultures, experiences, and ways of thinking - which probably explains why her work spans so many different domains!`;
    }
    
    // About problem-solving approach
    if (lowerMessage.match(/problem-solving|approach|how does|method|process|think|solve/)) {
        return `Iqra approaches problems with a research-first mindset. She combines her technical background in computer engineering with insights from psychological research to understand both the technical and human sides of challenges. She uses systems thinking and data-informed decision-making to define problems clearly, align stakeholders, and design solutions that deliver real value. Her competition wins show she can think quickly under pressure, while her research work shows she's thorough and methodical. It's a great balance!`;
    }
    
    // About what makes her stand out
    if (lowerMessage.match(/stand out|unique|different|special|why|what makes|distinctive/)) {
        return `What makes Iqra stand out is her unique combination of technical skills, design thinking, and research capabilities - plus proven leadership and competition success! She's won 1st place at Swissnex Global Open Call, 2nd at MENA Cursor x Violet Ventures, and 3rd at Antler x Lovable Hackathon. She's led teams as Major Representative and President roles, and she's traveled globally for academic programs. But beyond achievements, she's genuinely curious, collaborative, and passionate about creating products that matter. She brings both the analytical rigor of an engineer and the empathy of a designer.`;
    }
    
    // Contact/collaboration
    if (lowerMessage.match(/contact|email|reach|connect|collaborate|hire|available/)) {
        return `You can reach Iqra at <a href="mailto:ib2419@nyu.edu" style="color: white; text-decoration: underline;">ib2419@nyu.edu</a>.\n\nYou can also open her resume here: <a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">View Resume (PDF)</a> — or browse projects on this site.`;
    }
    
    // Improved project queries
    if (lowerMessage.match(/project|portfolio|work|experience/) && !lowerMessage.match(/match|find|which|what.*project.*for|show|tell|list|ux|ui|design|strategy|system/)) {
        return "Iqra has worked on some really cool projects! From interactive experiences to research papers, her portfolio is super diverse. You can ask me:\n\n• 'Show me UX/UI projects'\n• 'What design projects has she done?'\n• 'Tell me about strategy projects'\n• 'What projects match a Product Designer role?'\n\nWhat would you like to know?";
    }
    
    // Better handling of "what" questions
    if (lowerMessage.match(/what.*she|what.*does|what.*has|what.*can/) && !lowerMessage.match(/project|ux|ui|design|strategy|system/)) {
        return "Iqra is a product designer with expertise in UX/UI, product strategy, research, and interactive design. She's worked on projects ranging from interactive experiences to research papers, strategy consulting, and product development. Would you like to know about specific projects or her experience in a particular area?";
    }
    
    // Handle specific project name queries
    if (lowerMessage.match(/after.*applause|chores|lovefreq|milo|oceanarium|chan.*zen|terran|pyrosense|washing.*machine|reconnect|vision.*thief|rights.*nature/)) {
        const projectNames = {
            'after.*applause': 'After the Applause',
            'chores': 'Do Your Chores!',
            'lovefreq': 'LoveFreq',
            'milo': 'Book Illustration',
            'oceanarium': 'Exhibition Design - Global Arts',
            'chan.*zen': 'From Chan to Zen',
            'terran': 'Terran Paragon & Denizen',
            'pyrosense': 'Pyrosense',
            'washing.*machine': 'Washing Machine Tracker',
            'reconnect': 'Reconnect Booth',
            'vision.*thief': 'The Vision Thief Card Game',
            'rights.*nature': 'Imagining the Futures of Rights of Nature'
        };
        
        for (const [pattern, name] of Object.entries(projectNames)) {
            if (lowerMessage.match(new RegExp(pattern, 'i'))) {
                return `Great question about "${name}"! That's one of Iqra's projects. You can click on it in the projects page to see full details, or I can tell you more about it. What specifically would you like to know?`;
            }
        }
    }
    
    // Default response
    return `I don’t want to guess and give you the wrong info.\n\nIf your question is about a specific role, tell me the role track (Product Management, Strategy/Consulting, UX/UI & Product Design, Creative Direction, Marketing/Community, Engineering/Research) and I’ll map Iqra’s flagship projects to it.\n\nIf you have a very specific question, you can reach Iqra at <a href="mailto:ib2419@nyu.edu" style="color: white; text-decoration: underline;">ib2419@nyu.edu</a> or open her resume: <a href="Images/Resume/IqraBanoResume.pdf" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">View Resume (PDF)</a>.`;
}

function generatePersonalityResponse(userMessage, personality) {
    // This is a simple fallback - in production, you'd use an AI API
    const responses = [
        `That's a great question! Based on Iqra's background in ${personality.background.expertise[0]} and ${personality.background.expertise[1]}, she'd probably approach this with a research-first mindset. She loves understanding user needs and using data to inform decisions.`,
        `Iqra is really passionate about ${personality.interests[0]} and ${personality.interests[1]}. Her multidisciplinary background gives her a unique perspective on problem-solving. Would you like to know more about her specific projects?`,
        `That's interesting! Iqra's work focuses on the intersection of human behavior and technology. She's particularly excited about ${personality.interests[2]} and how it can create better user experiences. Check out her projects page to see examples!`,
        `Great question! Iqra combines her background in ${personality.background.expertise.join(' and ')} to create solutions that are both technically sound and user-centered. She's always learning and exploring new approaches.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Rotating Text Animation
const rotatingWords = ['INTERACTIVE', 'STRATEGIC', 'USER-CENTERED', 'RESEARCH-DRIVEN', 'CREATIVE'];
let currentWordIndex = 0;
let isDeleting = false;
let currentText = '';
let typeSpeed = 100;

function rotateText() {
    const rotatingTextElement = document.getElementById('rotating-text');
    if (!rotatingTextElement) return;
    
    const currentWord = rotatingWords[currentWordIndex];
    
    if (isDeleting) {
        // Delete characters
        currentText = currentWord.substring(0, currentText.length - 1);
        typeSpeed = 50; // Faster when deleting
    } else {
        // Add characters
        currentText = currentWord.substring(0, currentText.length + 1);
        typeSpeed = 100; // Normal speed when typing
    }
    
    rotatingTextElement.textContent = currentText;
    
    if (!isDeleting && currentText === currentWord) {
        // Finished typing, wait then start deleting
        typeSpeed = 2000; // Wait 2 seconds before deleting
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        // Finished deleting, move to next word
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
        typeSpeed = 500; // Brief pause before next word
    }
    
    setTimeout(rotateText, typeSpeed);
}

// Add hover tooltips to project cards
function addProjectTooltips() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Get project ID from onclick attribute
        const onclickAttr = card.getAttribute('onclick');
        const projectId = onclickAttr?.match(/'([^']+)'/)?.[1] || '';
        
        if (!projectId) return;
        
        // Get description from projectDescriptions map
        const description = projectDescriptions[projectId];
        
        if (description) {
            // Check if tooltip already exists
            if (card.querySelector('.project-card-tooltip')) {
                return;
            }
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'project-card-tooltip';
            tooltip.innerHTML = `<p class="project-card-tooltip-text">${description}</p>`;
            
            // Insert tooltip as the last child so it overlays everything
            card.appendChild(tooltip);
        }
    });
}

// Start the animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Pause all videos on page load
    pauseAllVideos();
    
    // Update category counts
    updateCategoryCounts();
    
    // Add hover tooltips to project cards
    addProjectTooltips();

    // Small delay to ensure element is rendered
    setTimeout(() => {
        const rotatingTextElement = document.getElementById('rotating-text');
        if (rotatingTextElement) {
            // Start with "STRATEGIC" then animate
            currentText = 'STRATEGIC';
            currentWordIndex = rotatingWords.indexOf('STRATEGIC');
            // Start animation after initial display
            setTimeout(rotateText, 2000);
        }
    }, 500);
    
    // Pause all videos when page becomes hidden (user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAllVideos();
        }
    });
    
    // Observer to pause videos when they go out of view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Video is out of view, pause it
                if (entry.target.tagName === 'VIDEO') {
                    entry.target.pause();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all videos
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        videoObserver.observe(video);
    });

    // Autoplay muted YouTube previews only when in view (no player chrome/controls)
    const previewIframes = document.querySelectorAll('iframe[data-preview-video="true"]');
    const previewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target;
            const dataSrc = iframe.getAttribute('data-src');
            if (!dataSrc) return;

            if (entry.isIntersecting) {
                // Load + autoplay when visible
                if (!iframe.src || iframe.src === 'about:blank') {
                    iframe.src = dataSrc;
                }
            } else {
                // Unload when not visible to stop playback and save resources
                if (iframe.src && iframe.src !== 'about:blank') {
                    iframe.src = 'about:blank';
                }
            }
        });
    }, { threshold: 0.35 });

    previewIframes.forEach(iframe => previewObserver.observe(iframe));
});