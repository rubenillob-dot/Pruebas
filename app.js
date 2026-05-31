// Soporte para Privadas - ImArixu
// Vanilla JavaScript Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const appContainer = document.getElementById('appContainer');
    const streamerPanel = document.getElementById('streamerPanel');
    const viewerPanel = document.getElementById('viewerPanel');
    
    // Inputs & Control elements
    const gameModeSelect = document.getElementById('gameModeSelect');
    const customModeGroup = document.getElementById('customModeGroup');
    const customModeInput = document.getElementById('customModeInput');
    const matchKeyInput = document.getElementById('matchKeyInput');
    const statusSelect = document.getElementById('statusSelect');
    const updateBtn = document.getElementById('updateBtn');
    
    // Toggle Panel buttons
    const hidePanelBtnInner = document.getElementById('hidePanelBtnInner');
    const showPanelBtn = document.getElementById('showPanelBtn');
    
    // Viewer elements to update
    const viewGameMode = document.getElementById('viewGameMode');
    const viewMatchKey = document.getElementById('viewMatchKey');
    const viewStatus = document.getElementById('viewStatus');
    const troubleKeyText = document.getElementById('troubleKeyText');
    const videoCard = document.getElementById('videoCard');
    
    // Troubleshooting elements
    const troubleBtn = document.getElementById('troubleBtn');
    const troubleModalOverlay = document.getElementById('troubleModalOverlay');
    const closeTroubleBtn = document.getElementById('closeTroubleBtn');
    const particlesContainer = document.getElementById('particles-container');

    // --- State Variables ---
    let currentMode = "Recarga Cero Construcción";
    let currentKey = "ARIXU";
    let currentStatus = "Esperando jugadores...";

    // --- Initialize default view values ---
    viewGameMode.textContent = currentMode;
    viewMatchKey.textContent = currentKey;
    viewStatus.textContent = currentStatus;
    troubleKeyText.textContent = currentKey;
    matchKeyInput.value = currentKey;

    // --- Particle Background Generator ---
    const generateParticles = (count = 15) => {
        const types = ['cross', 'circle', 'line'];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const type = types[Math.floor(Math.random() * types.length)];
            
            particle.className = `particle particle-${type}`;
            
            // Random positioning and sizing
            const leftPos = Math.random() * 100; // in %
            const scale = 0.5 + Math.random() * 1.0;
            const duration = 15 + Math.random() * 20; // 15s to 35s
            const delay = -Math.random() * duration; // Negative delay to start immediately in various states
            
            particle.style.left = `${leftPos}%`;
            particle.style.transform = `scale(${scale})`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    };

    // Initialize particles
    generateParticles(20);

    // --- Game Mode Selector Change Event ---
    gameModeSelect.addEventListener('change', () => {
        if (gameModeSelect.value === 'Personalizado') {
            customModeGroup.style.display = 'flex';
            customModeInput.focus();
        } else {
            customModeGroup.style.display = 'none';
        }
    });

    // --- Key Input Auto-Formatter (Force Uppercase and Remove Spaces) ---
    matchKeyInput.addEventListener('input', (e) => {
        let value = e.target.value;
        // Keep alphanumeric and force uppercase, replace space with empty string
        value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        e.target.value = value;
    });

    // --- Sync / Update Function ---
    const updateViewerScreen = () => {
        // 1. Game Mode check
        if (gameModeSelect.value === 'Personalizado') {
            currentMode = customModeInput.value.trim() || "Modo Personalizado";
        } else {
            currentMode = gameModeSelect.value;
        }

        // 2. Match Key check
        currentKey = matchKeyInput.value.trim() || "ARIXU";

        // 3. Status check
        currentStatus = statusSelect.value;

        // 4. Perform visual update on Viewer Panel with subtle transitions
        viewGameMode.style.opacity = 0;
        viewMatchKey.style.opacity = 0;
        viewStatus.style.opacity = 0;

        setTimeout(() => {
            viewGameMode.textContent = currentMode;
            viewMatchKey.textContent = currentKey;
            viewStatus.textContent = currentStatus;
            troubleKeyText.textContent = currentKey;

            // Fade back in
            viewGameMode.style.transition = 'opacity 0.3s ease';
            viewMatchKey.style.transition = 'opacity 0.3s ease';
            viewStatus.style.transition = 'opacity 0.3s ease';
            
            viewGameMode.style.opacity = 1;
            viewMatchKey.style.opacity = 1;
            viewStatus.style.opacity = 1;
        }, 200);

        // Flash update animation on update button
        updateBtn.classList.add('updated');
        setTimeout(() => {
            updateBtn.classList.remove('updated');
        }, 1000);
    };

    updateBtn.addEventListener('click', updateViewerScreen);

    // Also support triggering update with Enter key in input boxes
    matchKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateViewerScreen();
        }
    });
    customModeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateViewerScreen();
        }
    });

    // --- Streamer Panel Collapse/Expand ---
    const collapseStreamerPanel = () => {
        streamerPanel.classList.add('collapsed');
        showPanelBtn.classList.remove('hidden');
    };

    const expandStreamerPanel = () => {
        streamerPanel.classList.remove('collapsed');
        showPanelBtn.classList.add('hidden');
    };

    hidePanelBtnInner.addEventListener('click', collapseStreamerPanel);
    showPanelBtn.addEventListener('click', expandStreamerPanel);

    // --- Troubleshooting Modal Panel Toggle ---
    troubleBtn.addEventListener('click', () => {
        troubleModalOverlay.classList.add('active');
        videoCard.classList.add('highlight-glow');
    });

    closeTroubleBtn.addEventListener('click', () => {
        troubleModalOverlay.classList.remove('active');
        videoCard.classList.remove('highlight-glow');
    });

    // Close modal if clicking outside the modal content
    troubleModalOverlay.addEventListener('click', (e) => {
        if (e.target === troubleModalOverlay) {
            troubleModalOverlay.classList.remove('active');
            videoCard.classList.remove('highlight-glow');
        }
    });
});
