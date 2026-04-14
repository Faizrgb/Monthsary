document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const sceneEnvelope = document.getElementById('scene-envelope');
    const sceneQuestion = document.getElementById('scene-question');
    
    // Open envelope interaction
    envelopeWrapper.addEventListener('click', () => {
        if (!envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.add('open');
            
            // Wait for envelope animation to finish (about 2.5s total including reading time)
            setTimeout(() => {
                transitionTo(sceneEnvelope, sceneQuestion);
            }, 2500);
        }
    });

    // Also support checking keyboard tap (Enter/Space)
    envelopeWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            envelopeWrapper.click();
        }
    });
});

// Scene transition helper
function transitionTo(hideScene, showScene) {
    hideScene.classList.remove('active');
    
    // Wait for fade out, then hide it completely
    setTimeout(() => {
        hideScene.classList.add('hidden');
        
        // Prepare new scene
        showScene.classList.remove('hidden');
        // Small delay to allow display:flex to apply before animating opacity
        setTimeout(() => {
            showScene.classList.add('active');
        }, 50);
        
    }, 800); // Transitions take 0.8s inside CSS
}

// Celebration logic for Scene 3
window.celebrate = function() {
    const sceneQuestion = document.getElementById('scene-question');
    const sceneCelebration = document.getElementById('scene-celebration');
    
    // Transition to final scene
    transitionTo(sceneQuestion, sceneCelebration);
    
    // Start generating hearts
    setTimeout(() => {
        startHeartShower();
    }, 800);
}

function startHeartShower() {
    const container = document.querySelector('.hearts-container');
    const heartSymbols = ['❤️', '💖', '🥰', '💕', '💗'];
    
    // Create new hearts periodically
    const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Random symbol
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random placement and specific styling 
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 3; // 3s to 6s
        const scale = Math.random() * 1 + 0.5; // 0.5x to 1.5x
        
        heart.style.left = left + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.transform = `scale(${scale})`;
        
        container.appendChild(heart);
        
        // Cleanup after animation completes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
        
    }, 200); // Every 200ms
    
    // Stop after a while, or keep going? Let's keep going!
}

// Show the final apology scene
window.showApology = function() {
    const sceneCelebration = document.getElementById('scene-celebration');
    const sceneApology = document.getElementById('scene-apology');
    
    // Stop the heart generation from previous scene to avoid clutter
    // We could clear the interval, but let's just let it fade out naturally, 
    // or we can transition cleanly.
    transitionTo(sceneCelebration, sceneApology);
    
    // Let's add new hearts inside the apology scene but slower and more subtle ✨
    setTimeout(() => {
        startSubtleSparkles();
    }, 1000);
}

function startSubtleSparkles() {
    const container = document.querySelector('#scene-apology .hearts-container');
    const symbols = ['✨', '💫', '💖'];
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('floating-heart');
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 4; 
        const scale = Math.random() * 0.8 + 0.4; 
        
        sparkle.style.left = left + '%';
        sparkle.style.animationDuration = duration + 's';
        sparkle.style.transform = `scale(${scale})`;
        sparkle.style.opacity = '0.7'; 
        
        if(container) {
            container.appendChild(sparkle);
            setTimeout(() => {
                sparkle.remove();
            }, duration * 1000);
        }
    }, 400); 
}

// Final 'I Love You' Interactions
window.showLoveQuestion = function() {
    const sceneApology = document.getElementById('scene-apology');
    const sceneLove = document.getElementById('scene-love');
    transitionTo(sceneApology, sceneLove);
}

window.wrongAnswer = function() {
    const wrongBtn = document.getElementById('wrong-btn');
    const wrongMsg = document.getElementById('wrong-msg');
    
    // reset animation to trigger it again
    wrongBtn.classList.remove('shake');
    // void wrapper triggers a reflow
    void wrongBtn.offsetWidth; 
    wrongBtn.classList.add('shake');
    
    // show the warning message
    wrongMsg.classList.remove('hidden');
    // slight delay to ensure it applies opacity after display block
    setTimeout(() => {
        wrongMsg.style.opacity = '1';
    }, 10);
    
    // hide it after a few seconds
    setTimeout(() => {
        wrongMsg.style.opacity = '0';
        setTimeout(() => {
            wrongMsg.classList.add('hidden');
        }, 300);
    }, 3000);
}

window.finalYayy = function() {
    const sceneLove = document.getElementById('scene-love');
    const sceneFinal = document.getElementById('scene-final');
    
    transitionTo(sceneLove, sceneFinal);
    
    setTimeout(() => {
        startFinalShower();
    }, 800);
}

function startFinalShower() {
    const container = document.querySelector('#scene-final .hearts-container');
    const heartSymbols = ['❤️', '💖', '🥰', '🎇', '✨', '💗'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2; 
        const scale = Math.random() * 1.5 + 0.5; 
        
        heart.style.left = left + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.transform = `scale(${scale})`;
        
        if (container) {
            container.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    }, 120); 
}
