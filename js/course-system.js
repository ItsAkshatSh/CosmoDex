(function() {
    'use strict';
    const scamPhishingCourse = {
        title: "Cybersecurity: Scams & Phishing Detection",
        learningSections: [
            {
                id: 1,
                title: "Understanding Phishing Attacks",
                content: [
                    "Welcome to CyberBites! Let’s begin with one of the most common online threats: phishing. Phishing is when attackers pretend to be trusted organizations to steal personal information.",
                    "These attacks often arrive as emails, text messages, or links designed to look legitimate. Their main goal is to trick you into revealing passwords, bank details, or sensitive data.",
                    "Phishers often use psychological manipulation, creating a sense of urgency through messages like 'Your account will be locked!' to make you act quickly.",
                    "Many phishing messages include fake links that appear real at first glance but contain suspicious spellings, unusual characters, or strange domains.",
                    "Understanding the basic signs of phishing is the crucial first step toward protecting your online identity and keeping your accounts safe."
                ],
                checkupQuestion: {
                    question: "What is the main goal of a phishing attack?",
                    options: [
                        "To improve internet speed",
                        "To steal personal or sensitive information",
                        "To advertise new products",
                        "To fix computer issues remotely"
                    ],
                    correct: 1,
                    explanation: "Phishing attacks are designed to trick users into giving away sensitive information such as passwords, OTPs, or financial details."
                }
            },
            {
                id: 2,
                title: "Identifying Scam Messages & Red Flags",
                content: [
                    "Scammers often use emotional triggers such as fear, urgency, or excitement to influence your decisions. Messages may claim you won a prize or that your account is at risk.",
                    "One major red flag is poor grammar, spelling mistakes, or inconsistent writing tone. Legitimate organizations rarely make these kinds of errors.",
                    "Always pay close attention to the sender’s email or phone number. Scam messages often come from unofficial or suspicious-looking addresses.",
                    "A simple but powerful habit is hovering over links before clicking them—this reveals the real URL and helps you identify dangerous or fake pages.",
                    "If a message requests passwords, OTPs, bank PINs, or personal details, treat it as a major warning sign. Trusted services never ask for this information."
                ],
                checkupQuestion: {
                    question: "Which of the following is a common red flag of a scam message?",
                    options: [
                        "High-quality graphics",
                        "Messages sent during daytime",
                        "Urgent requests for personal information",
                        "A greeting with your real name"
                    ],
                    correct: 2,
                    explanation: "Scam messages often create urgency to pressure users into giving away sensitive information quickly."
                }
            },
            {
                id: 3,
                title: "Spotting Fake Websites & Links",
                content: [
                    "Cybercriminals often create fake websites that mimic real ones, using similar layouts, logos, and colors to look trustworthy.",
                    "Always inspect the URL carefully. Fake sites commonly contain subtle spelling mistakes like 'paypaI.com' where the letter 'I' replaces an 'l'.",
                    "Secure websites use HTTPS, indicated by a lock icon in the address bar. Although not perfect, the absence of HTTPS is a strong red flag on pages asking for sensitive data.",
                    "Fake websites may redirect multiple times, show strange pop-ups, or ask for login details in unexpected places.",
                    "If you're unsure about a website’s legitimacy, manually type the address into your browser or use the official app instead of clicking unknown links."
                ],
                checkupQuestion: {
                    question: "Which of the following is a clear sign that a website might be fake?",
                    options: [
                        "It uses the color blue",
                        "The site loads quickly",
                        "The URL contains unusual spelling or characters",
                        "The homepage has a navigation bar"
                    ],
                    correct: 2,
                    explanation: "Fake websites often copy the design of real sites but use URLs with misspellings, extra symbols, or strange characters."
                }
            }
        ],
        finalTest: [
            {
                id: 1,
                question: "What is the primary purpose of a phishing attack?",
                image: "Badges/cyber_phishing.png",
                options: [
                    "To provide tech support",
                    "To steal personal or sensitive information",
                    "To send promotional emails",
                    "To test internet security"
                ],
                correct: 1,
                explanation: "Phishing attacks aim to steal sensitive information such as passwords, OTPs, or banking details."
            },
            {
                id: 2,
                question: "Which of the following is a common red flag of a scam message?",
                image: "Badges/cyber_warning.png",
                options: [
                    "A message with good grammar",
                    "Urgent demands for personal information",
                    "A greeting using your real name",
                    "A regular promotional email"
                ],
                correct: 1,
                explanation: "Scam messages often create urgency to trick people into sharing sensitive information."
            },
            {
                id: 3,
                question: "What technique do scammers often use to make phishing messages seem real?",
                image: "Badges/cyber_mail.png",
                options: [
                    "Using cartoon characters",
                    "Impersonating trusted organizations",
                    "Sending very long emails",
                    "Using bright colors"
                ],
                correct: 1,
                explanation: "Phishers impersonate real companies to gain users' trust and appear legitimate."
            },
            {
                id: 4,
                question: "What should you do before clicking a link in a suspicious message?",
                image: "Badges/cyber_link.png",
                options: [
                    "Click it quickly before it expires",
                    "Hover over it to see the real URL",
                    "Forward it to your family",
                    "Save it for later"
                ],
                correct: 1,
                explanation: "Hovering over a link is a safe way to see the real URL without opening the site."
            },
            {
                id: 5,
                question: "Which URL feature indicates a website might be fake?",
                image: "Badges/cyber_website.png",
                options: [
                    "HTTPS encryption",
                    "Familiar brand colors",
                    "Misspellings or strange characters",
                    "A working login button"
                ],
                correct: 2,
                explanation: "Fake websites often use URLs with unusual characters or misspellings to mimic real ones."
            },
            {
                id: 6,
                question: "What sensitive information should you NEVER share, even if asked?",
                image: "Badges/cyber_lock.png",
                options: [
                    "Your email address",
                    "Your password",
                    "Your favorite color",
                    "Your ZIP code"
                ],
                correct: 1,
                explanation: "Never share passwords, OTPs, banking PINs, or other credentials. Legitimate services will not ask for them."
            }
        ]
    };

    
    const mercuryCourse = scamPhishingCourse;
    
    let currentSection = 0;
    let currentParagraph = 0;
    let isInFinalTest = false;
    let score = 0;
    let selectedOption = null;
    let isAnswered = false;
    
    function createStarfield() {
        const starfield = document.createElement('div');
        starfield.className = 'starfield';
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 3 + 's';
            starfield.appendChild(star);
        }
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            starfield.appendChild(particle);
        }
        
        document.body.appendChild(starfield);
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(34, 211, 238, 0.9);
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function init() {
        createStarfield();
        
        const startBtn = document.querySelector('.start-course-btn');
        const previewBtn = document.querySelector('.preview-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', startCourse);
        }
        
        if (previewBtn) {
            previewBtn.addEventListener('click', previewLesson);
        }
    }
    
    function startCourse() {
        if (window.CosmoDexSounds) {
            window.CosmoDexSounds.click();
        }
        
        currentSection = 0;
        currentParagraph = 0;
        isInFinalTest = false;
        score = 0;
        showProgressBar();
        showLearningContent();
    }
    
    function previewLesson() {
        if (window.CosmoDexSounds) {
            window.CosmoDexSounds.click();
        }
        
        showQuestion(mercuryCourse.learningSections[0].checkupQuestion, true);
    }
    
    function showProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        document.body.appendChild(progressContainer);
        
        updateProgress();
    }
    
    function updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const totalSections = mercuryCourse.learningSections.length + 1; // +1 for final test
            const currentProgress = isInFinalTest ? 
                (currentSection + 1) / totalSections : 
                currentSection / totalSections;
            const progress = currentProgress * 100;
            progressBar.style.width = progress + '%';
        }
    }
    
    function showLearningContent() {
        if (currentSection >= mercuryCourse.learningSections.length) {
            startFinalTest();
            return;
        }
        
        const section = mercuryCourse.learningSections[currentSection];
        
        const contentContainer = document.createElement('div');
        contentContainer.className = 'mcq-container';
        
        contentContainer.innerHTML = `
            <div class="learning-content">
                <h2 style="color: #22d3ee; margin-bottom: 2rem; text-align: center; font-size: 2rem;">
                    ${section.title}
                </h2>
                <div class="content-paragraphs">
                    ${section.content.map((paragraph, index) => `
                        <div class="learning-paragraph" style="animation-delay: ${index * 0.3}s;">
                            ${paragraph}
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="continue-btn">
                        <i class="fas fa-arrow-right"></i> Check Your Understanding
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(contentContainer);
        
        setTimeout(() => {
            contentContainer.querySelector('.learning-content').classList.add('show');
        }, 10);
        
        const continueBtn = contentContainer.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            if (window.CosmoDexSounds) {
                window.CosmoDexSounds.click();
            }
            contentContainer.remove();
            showQuestion(section.checkupQuestion);
        });
    }
    
    function showQuestion(question, isPreview = false) {
        const isCheckup = !isInFinalTest && !isPreview;
        const questionNumber = isInFinalTest ? 
            `Final Test - Question ${currentSection + 1} of ${mercuryCourse.finalTest.length}` :
            `Check-up Question ${currentSection + 1}`;
        
        const mcqContainer = document.createElement('div');
        mcqContainer.className = 'mcq-container';
        
        mcqContainer.innerHTML = `
            <div class="mcq-question">
                <div class="question-header">
                    <div class="question-number">${questionNumber}</div>
                    <div class="question-text">${question.question}</div>
                    <img src="${question.image || 'Badges/planet_mercury.png'}" alt="Mercury" class="question-image">
                </div>
                
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <div class="option" data-index="${index}">
                            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="question-actions">
                    <button class="btn-check">Check Answer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(mcqContainer);
        
        setTimeout(() => {
            mcqContainer.querySelector('.mcq-question').classList.add('show');
        }, 10);
        
        addQuestionListeners(mcqContainer, question, isPreview, isCheckup);
    }
    
    function addQuestionListeners(container, question, isPreview, isCheckup) {
        const options = container.querySelectorAll('.option');
        const checkBtn = container.querySelector('.btn-check');
        
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                if (isAnswered) return;
                
                if (window.CosmoDexSounds) {
                    window.CosmoDexSounds.click();
                }
                
                options.forEach(opt => opt.classList.remove('selected'));
                
                option.classList.add('selected');
                selectedOption = index;
                
                checkBtn.classList.add('enabled');
            });
        });
        
        checkBtn.addEventListener('click', () => {
            if (selectedOption !== null && !isAnswered) {
                checkAnswer(container, question, isPreview, isCheckup);
            }
        });
        

    }
    
    function checkAnswer(container, question, isPreview, isCheckup) {
        const options = container.querySelectorAll('.option');
        const checkBtn = container.querySelector('.btn-check');
        
        isAnswered = true;
        checkBtn.style.display = 'none';
        
        
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
                if (window.CosmoDexSounds) {
                    window.CosmoDexSounds.correct();
                }
            } else if (index === selectedOption && index !== question.correct) {
                option.classList.add('incorrect');
                if (window.CosmoDexSounds) {
                    window.CosmoDexSounds.incorrect();
                }
            }
        });
        
        if (selectedOption === question.correct) {
            score++;
            if (window.CosmodexProfile && window.CosmodexProfile.addXP) {
                window.CosmodexProfile.addXP(10); 
                showToast('+10 XP');
            }
        }
        
        if (selectedOption === question.correct) {
            container.classList.add('correct-answer');
        }
        
        setTimeout(() => {
            showExplanation(container, question.explanation, isPreview, isCheckup);
        }, 1500);
    }
    
    function showExplanation(container, explanation, isPreview, isCheckup) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.08); border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin-top: 1rem; backdrop-filter: blur(15px);">
                <h4 style="color: #ffffff; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);">💡 Explanation</h4>
                <p style="color: #e8e8e8; line-height: 1.5;">${explanation}</p>
            </div>
            <div style="margin-top: 1.5rem;">
                <button class="btn btn-primary" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 2px solid rgba(255, 255, 255, 0.3); padding: 1rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; backdrop-filter: blur(10px);">
                    ${isPreview ? 'Close Preview' : 
                      (isCheckup ? (currentSection < mercuryCourse.learningSections.length - 1 ? 'Continue Learning' : 'Start Final Test') : 
                       (currentSection < mercuryCourse.finalTest.length - 1 ? 'Next Question' : 'Finish Course'))}
                </button>
            </div>
        `;
        
        container.querySelector('.mcq-question').appendChild(explanationDiv);
        
        const nextBtn = explanationDiv.querySelector('button');
        nextBtn.addEventListener('click', () => {
            if (window.CosmoDexSounds) {
                window.CosmoDexSounds.click();
            }
            
            if (isPreview) {
                closeMCQ(container);
            } else if (isCheckup) {
                nextLearningSection(container);
            } else {
                nextFinalTestQuestion(container);
            }
        });
    }
    
    function nextLearningSection(container) {
        currentSection++;
        closeMCQ(container);
        
        if (currentSection < mercuryCourse.learningSections.length) {
            updateProgress();
            setTimeout(() => {
                selectedOption = null;
                isAnswered = false;
                showLearningContent();
            }, 300);
        } else {
            startFinalTest();
        }
    }
    
    function startFinalTest() {
        isInFinalTest = true;
        currentSection = 0;
        updateProgress();
        
        const shuffledQuestions = [...mercuryCourse.finalTest].sort(() => Math.random() - 0.5);
        mercuryCourse.finalTest = shuffledQuestions;
        
        setTimeout(() => {
            selectedOption = null;
            isAnswered = false;
            showQuestion(mercuryCourse.finalTest[currentSection]);
        }, 300);
    }
        function nextFinalTestQuestion(container) {
        currentSection++;
        closeMCQ(container);
        
        if (currentSection < mercuryCourse.finalTest.length) {
            updateProgress();
            setTimeout(() => {
                selectedOption = null;
                isAnswered = false;
                showQuestion(mercuryCourse.finalTest[currentSection]);
            }, 300);
        } else {
            showResults();
        }
    }
    
    function closeMCQ(container) {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 300);
    }
    
    function showResults() {
        const totalQuestions = mercuryCourse.finalTest.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const xpEarned = Math.round((score / totalQuestions) * 120);
        
        if (window.CosmodexProfile && window.CosmodexProfile.addXP) {
            window.CosmodexProfile.addXP(xpEarned);
            showToast(`+${xpEarned} XP earned!`);
        }
        
        
        if (window.CosmodexProfile && window.CosmodexProfile.completeQuest) {
            window.CosmodexProfile.completeQuest();
        }
        
        
        if (window.CosmodexProfile && window.CosmodexProfile.setProgress) {
           
            const currentProgress = window.CosmodexProfile.getProgress ? 
                window.CosmodexProfile.getProgress('beginner') : {done: 0, total: 5};
            const newDone = Math.min(currentProgress.done + 1, currentProgress.total);
            window.CosmodexProfile.setProgress('beginner', newDone, currentProgress.total);
        }
        
        if (window.CosmoDexSounds) {
            window.CosmoDexSounds.complete();
        }
        
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        const resultsScreen = document.createElement('div');
        resultsScreen.className = 'results-screen';
        
        let resultIcon, resultTitle, resultColor;
        if (percentage >= 80) {
            resultIcon = '🏆';
            resultTitle = 'Excellent!';
            resultColor = '#10b981';
        } else if (percentage >= 60) {
            resultIcon = '🎉';
            resultTitle = 'Good Job!';
            resultColor = '#22d3ee';
        } else {
            resultIcon = '📚';
            resultTitle = 'Keep Learning!';
            resultColor = '#f59e0b';
        }
        
        resultsScreen.innerHTML = `
            <div class="results-content">
                <div class="results-icon">${resultIcon}</div>
                <div class="results-title" style="color: ${resultColor};">${resultTitle}</div>
                <div class="results-score">${percentage}%</div>
                
                <div class="results-stats">
                    <div class="result-stat">
                        <div class="result-stat-number">${score}/${totalQuestions}</div>
                        <div class="result-stat-label">Correct</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-number">+${xpEarned}</div>
                        <div class="result-stat-label">XP Earned</div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" style="background: #22d3ee; color: #000; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-home"></i> Back to Paths
                    </button>
                    <button class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.1); color: #e8e8e8; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-redo"></i> Retry Course
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(resultsScreen);
        
        setTimeout(() => {
            resultsScreen.querySelector('.results-content').classList.add('show');
        }, 10);
        
        const backBtn = resultsScreen.querySelector('.btn-primary');
        const retryBtn = resultsScreen.querySelector('.btn-secondary');
        
        backBtn.addEventListener('click', () => {
            if (window.CosmoDexSounds) {
                window.CosmoDexSounds.click();
            }
            window.location.href = 'paths.html';
        });
        
        retryBtn.addEventListener('click', () => {
            if (window.CosmoDexSounds) {
                window.CosmoDexSounds.click();
            }
            resultsScreen.remove();
            startCourse();
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();