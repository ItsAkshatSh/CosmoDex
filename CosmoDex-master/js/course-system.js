// Enhanced Course System for CosmoDex
(function() {
    'use strict';
    
    // Enhanced course data with learning content
    const mercuryCourse = {
        title: "Mercury: What is a Planet?",
        learningSections: [
            {
                id: 1,
                title: "What Makes a Planet?",
                content: [
                    "Welcome to your journey through planetary science! Let's start with the fundamental question: what exactly is a planet?",
                    "A planet is a celestial body that orbits a star, is massive enough to be rounded by its own gravity, and has cleared its orbital neighborhood of other objects. This definition, established by the International Astronomical Union in 2006, helps us distinguish planets from other objects in space.",
                    "The three key criteria for planetary status are: orbital motion around a star, spherical shape due to gravity, and orbital dominance. These characteristics help us understand the nature of celestial bodies in our solar system and beyond.",
                    "Did you know that the word 'planet' comes from the Greek word 'planetes', meaning 'wanderer'? Ancient astronomers noticed that planets moved differently across the sky compared to the fixed stars, appearing to 'wander' through the constellations.",
                    "Understanding what makes a planet is crucial for exploring our solar system and discovering new worlds beyond. As we learn about Mercury, we'll see how it fits into this planetary definition and what makes it unique among the planets."
                ],
                checkupQuestion: {
                    question: "What is the primary characteristic that defines a planet?",
                    options: [
                        "It orbits the Sun",
                        "It has a spherical shape due to gravity", 
                        "It has cleared its orbital path",
                        "All of the above"
                    ],
                    correct: 3,
                    explanation: "A planet must meet all three criteria: orbit a star, be spherical due to gravity, and have cleared its orbital path."
                }
            },
            {
                id: 2,
                title: "Mercury: The Innermost Planet",
                content: [
                    "Mercury holds the distinction of being the closest planet to the Sun, with an average distance of about 36 million miles (58 million kilometers). This proximity creates extreme conditions that make Mercury unique among the planets.",
                    "Despite being the smallest planet in our solar system, Mercury has some surprising characteristics. It has a large iron core that makes up about 75% of its radius, giving it a density similar to Earth despite being much smaller.",
                    "Mercury's extreme proximity to the Sun means it experiences the most dramatic temperature variations of any planet, from -173°C at night to 427°C during the day - a range of 600°C!",
                    "Interestingly, Mercury has no atmosphere to speak of, which means there's no weather or protection from solar radiation. The planet's surface is heavily cratered, similar to our Moon, due to countless impacts over billions of years.",
                    "Mercury completes one orbit around the Sun in just 88 Earth days, making it the fastest planet in our solar system. However, its rotation is much slower - one Mercury day lasts about 59 Earth days, creating a unique day-night cycle."
                ],
                checkupQuestion: {
                    question: "Which planet is closest to the Sun?",
                    options: [
                        "Venus",
                        "Mercury", 
                        "Earth",
                        "Mars"
                    ],
                    correct: 1,
                    explanation: "Mercury is the closest planet to the Sun, with an average distance of about 36 million miles."
                }
            },
            {
                id: 3,
                title: "Mercury's Unique Day and Year",
                content: [
                    "Mercury has one of the most unusual day-night cycles in our solar system. A day on Mercury (from sunrise to sunrise) takes about 176 Earth days, which is longer than its year of 88 Earth days!",
                    "This strange phenomenon occurs because Mercury rotates very slowly on its axis while orbiting the Sun relatively quickly. The planet's rotation is also in a 3:2 resonance with its orbit, meaning it rotates three times for every two orbits around the Sun.",
                    "This slow rotation, combined with its lack of atmosphere, means that one side of Mercury can be extremely hot while the other side is extremely cold, creating the most extreme temperature differences in our solar system."
                ],
                checkupQuestion: {
                    question: "How long is a day on Mercury?",
                    options: [
                        "24 hours",
                        "88 Earth days",
                        "176 Earth days", 
                        "365 Earth days"
                    ],
                    correct: 2,
                    explanation: "A day on Mercury (sunrise to sunrise) takes about 176 Earth days due to its slow rotation and fast orbit."
                }
            }
        ],
        finalTest: [
            {
                id: 1,
                question: "What is the primary characteristic that defines a planet?",
                image: "Badges/planet_mercury.png",
                options: [
                    "It orbits the Sun",
                    "It has a spherical shape due to gravity",
                    "It has cleared its orbital path",
                    "All of the above"
                ],
                correct: 3,
                explanation: "A planet must orbit the Sun, be spherical due to gravity, and have cleared its orbital path of other objects."
            },
            {
                id: 2,
                question: "Which planet is closest to the Sun?",
                image: "Badges/planet_mercury.png",
                options: [
                    "Venus",
                    "Mercury",
                    "Earth",
                    "Mars"
                ],
                correct: 1,
                explanation: "Mercury is the closest planet to the Sun, with an average distance of about 36 million miles."
            },
            {
                id: 3,
                question: "How long is a day on Mercury?",
                image: "Badges/planet_mercury.png",
                options: [
                    "24 hours",
                    "88 Earth days",
                    "176 Earth days",
                    "365 Earth days"
                ],
                correct: 2,
                explanation: "A day on Mercury (sunrise to sunrise) takes about 176 Earth days due to its slow rotation and fast orbit."
            },
            {
                id: 4,
                question: "What is Mercury's surface temperature range?",
                image: "Badges/planet_mercury.png",
                options: [
                    "-50°C to 50°C",
                    "-173°C to 427°C",
                    "0°C to 100°C",
                    "-100°C to 200°C"
                ],
                correct: 1,
                explanation: "Mercury has extreme temperature variations from -173°C at night to 427°C during the day."
            },
            {
                id: 5,
                question: "Why doesn't Mercury have an atmosphere?",
                image: "Badges/planet_mercury.png",
                options: [
                    "It's too cold",
                    "It's too close to the Sun",
                    "It's too small to hold one",
                    "It never had one"
                ],
                correct: 2,
                explanation: "Mercury is too close to the Sun and too small to hold onto an atmosphere - solar wind strips it away."
            }
        ]
    };
    
    let currentSection = 0;
    let currentParagraph = 0;
    let isInFinalTest = false;
    let score = 0;
    let selectedOption = null;
    let isAnswered = false;
    
    // Create enhanced starfield
    function createStarfield() {
        const starfield = document.createElement('div');
        starfield.className = 'starfield';
        
        // Create stars
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
        
        // Create floating particles
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
    
    // Show toast notification
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

    // Initialize course system
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
    
    // Start the course
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
    
    // Preview first lesson
    function previewLesson() {
        if (window.CosmoDexSounds) {
            window.CosmoDexSounds.click();
        }
        
        showQuestion(mercuryCourse.learningSections[0].checkupQuestion, true);
    }
    
    // Show progress bar
    function showProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        document.body.appendChild(progressContainer);
        
        updateProgress();
    }
    
    // Update progress bar
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
    
    // Show learning content
    function showLearningContent() {
        if (currentSection >= mercuryCourse.learningSections.length) {
            startFinalTest();
            return;
        }
        
        const section = mercuryCourse.learningSections[currentSection];
        
        // Create learning content container
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
        
        // Animate in
        setTimeout(() => {
            contentContainer.querySelector('.learning-content').classList.add('show');
        }, 10);
        
        // Add event listener
        const continueBtn = contentContainer.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            if (window.CosmoDexSounds) {
                window.CosmoDexSounds.click();
            }
            contentContainer.remove();
            showQuestion(section.checkupQuestion);
        });
    }
    
    // Show question (checkup or final test)
    function showQuestion(question, isPreview = false) {
        const isCheckup = !isInFinalTest && !isPreview;
        const questionNumber = isInFinalTest ? 
            `Final Test - Question ${currentSection + 1} of ${mercuryCourse.finalTest.length}` :
            `Check-up Question ${currentSection + 1}`;
        
        // Create MCQ container
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
        
        // Animate in
        setTimeout(() => {
            mcqContainer.querySelector('.mcq-question').classList.add('show');
        }, 10);
        
        // Add event listeners
        addQuestionListeners(mcqContainer, question, isPreview, isCheckup);
    }
    
    // Add event listeners to question
    function addQuestionListeners(container, question, isPreview, isCheckup) {
        const options = container.querySelectorAll('.option');
        const checkBtn = container.querySelector('.btn-check');
        
        // Option selection
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                if (isAnswered) return;
                
                if (window.CosmoDexSounds) {
                    window.CosmoDexSounds.click();
                }
                
                // Remove previous selection
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Select current option
                option.classList.add('selected');
                selectedOption = index;
                
                // Enable check button
                checkBtn.classList.add('enabled');
            });
        });
        
        // Check answer
        checkBtn.addEventListener('click', () => {
            if (selectedOption !== null && !isAnswered) {
                checkAnswer(container, question, isPreview, isCheckup);
            }
        });
        

    }
    
    // Check answer
    function checkAnswer(container, question, isPreview, isCheckup) {
        const options = container.querySelectorAll('.option');
        const checkBtn = container.querySelector('.btn-check');
        
        isAnswered = true;
        checkBtn.style.display = 'none';
        
        // Show correct/incorrect
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
        
        // Update score and award XP
        if (selectedOption === question.correct) {
            score++;
            // Award XP for correct answers
            if (window.CosmodexProfile && window.CosmodexProfile.addXP) {
                window.CosmodexProfile.addXP(10); // 10 XP per correct answer
                showToast('+10 XP');
            }
        }
        
        // Add visual effects for correct answers
        if (selectedOption === question.correct) {
            container.classList.add('correct-answer');
        }
        
        // Show explanation
        setTimeout(() => {
            showExplanation(container, question.explanation, isPreview, isCheckup);
        }, 1500);
    }
    
    // Show explanation
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
        
        // Add next button listener
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
    
    // Next learning section
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
    
    // Start final test
    function startFinalTest() {
        isInFinalTest = true;
        currentSection = 0;
        updateProgress();
        
        // Shuffle questions for final test
        const shuffledQuestions = [...mercuryCourse.finalTest].sort(() => Math.random() - 0.5);
        mercuryCourse.finalTest = shuffledQuestions;
        
        setTimeout(() => {
            selectedOption = null;
            isAnswered = false;
            showQuestion(mercuryCourse.finalTest[currentSection]);
        }, 300);
    }
    
    // Next final test question
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
    
    // Close MCQ
    function closeMCQ(container) {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 300);
    }
    
    // Show results
    function showResults() {
        const totalQuestions = mercuryCourse.finalTest.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const xpEarned = Math.round((score / totalQuestions) * 120);
        
        // Award XP to the profile system
        if (window.CosmodexProfile && window.CosmodexProfile.addXP) {
            window.CosmodexProfile.addXP(xpEarned);
            showToast(`+${xpEarned} XP earned!`);
        }
        
        // Complete quest for finishing the course
        if (window.CosmodexProfile && window.CosmodexProfile.completeQuest) {
            window.CosmodexProfile.completeQuest();
        }
        
        // Update progress tracking
        if (window.CosmodexProfile && window.CosmodexProfile.setProgress) {
            // Get current progress and increment it
            const currentProgress = window.CosmodexProfile.getProgress ? 
                window.CosmodexProfile.getProgress('beginner') : {done: 0, total: 5};
            const newDone = Math.min(currentProgress.done + 1, currentProgress.total);
            window.CosmodexProfile.setProgress('beginner', newDone, currentProgress.total);
        }
        
        if (window.CosmoDexSounds) {
            window.CosmoDexSounds.complete();
        }
        
        // Remove progress bar
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        // Create results screen
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
        
        // Animate in
        setTimeout(() => {
            resultsScreen.querySelector('.results-content').classList.add('show');
        }, 10);
        
        // Add event listeners
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
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();