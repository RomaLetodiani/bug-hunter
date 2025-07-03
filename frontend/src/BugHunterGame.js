import React, { useEffect, useRef, useState } from 'react';

const BugHunterGame = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef({});
  const gameStateRef = useRef({
    isPlaying: false,
    isPaused: false,
    score: 0,
    level: 1,
    lives: 3,
    maxLives: 3,
    bugs: [],
    particles: [],
    powerUps: [],
    gameTime: 0,
    lastSpawn: 0,
    lastPowerUpSpawn: 0,
    codeLines: [],
    combo: 0,
    maxCombo: 0,
    accuracy: 100,
    totalClicks: 0,
    successfulClicks: 0,
    activePowerUps: {},
    achievements: [],
    difficulty: 'senior', // intern, senior, architect, codeReview
    gameMode: 'normal', // normal, zen, challenge
    language: 'javascript',
    theme: 'vscode',
    settings: {
      sound: true,
      particles: true,
      screenShake: true,
      volume: 0.5
    }
  });

  const [gameStats, setGameStats] = useState({
    score: 0,
    level: 1,
    lives: 3,
    combo: 0,
    accuracy: 100,
    isGameOver: false,
    isPlaying: false,
    showSettings: false,
    showAchievements: false,
    activePowerUps: {},
    currentLanguage: 'javascript',
    currentTheme: 'vscode'
  });

  // Enhanced code snippets by language
  const codeSnippets = {
    javascript: [
      "function debugCode() {",
      "  const bugs = findBugs();",
      "  if (bugs.length > 0) {",
      "    return 'Need therapy!';",
      "  }",
      "}",
      "",
      "class DevTherapy {",
      "  healDeveloper() {",
      "    this.stress = 0;",
      "    this.productivity++;",
      "    this.mentalHealth.improve();",
      "  }",
      "}",
      "",
      "const fixBug = () => {",
      "  console.log('Bug fixed! 🎉');",
      "  anxiety.decrease();",
      "  confidence.boost();",
      "};",
      "",
      "// TODO: Catch all the bugs",
      "// Before they crash the app",
      "// Remember: It's not a bug, it's a feature"
    ],
    python: [
      "def debug_code():",
      "    bugs = find_bugs()",
      "    if len(bugs) > 0:",
      "        return 'Need therapy!'",
      "",
      "class DevTherapy:",
      "    def heal_developer(self):",
      "        self.stress = 0",
      "        self.productivity += 1",
      "        self.mental_health.improve()",
      "",
      "def fix_bug():",
      "    print('Bug fixed! 🎉')",
      "    anxiety.decrease()",
      "    confidence.boost()",
      "",
      "# TODO: Catch all the bugs",
      "# Before they crash the app",
      "# import coffee"
    ],
    java: [
      "public class DevTherapy {",
      "    private int stress = 0;",
      "    private int productivity = 100;",
      "    ",
      "    public void healDeveloper() {",
      "        this.stress = 0;",
      "        this.productivity++;",
      "        mentalHealth.improve();",
      "    }",
      "",
      "    public void fixBug() {",
      "        System.out.println(\"Bug fixed! 🎉\");",
      "        anxiety.decrease();",
      "        confidence.boost();",
      "    }",
      "}",
      "",
      "// TODO: Catch all the bugs",
      "// NullPointerException not found"
    ]
  };

  // Enhanced bug types with behaviors
  const bugTypes = [
    { 
      name: 'syntax', 
      color: '#ff6b6b', 
      speed: 2, 
      points: 10, 
      emoji: '🐛',
      size: 25,
      behavior: 'linear',
      description: 'Basic syntax error - easy to catch'
    },
    { 
      name: 'logic', 
      color: '#4ecdc4', 
      speed: 1.5, 
      points: 20, 
      emoji: '🕷️',
      size: 30,
      behavior: 'zigzag',
      description: 'Logic error - unpredictable movement'
    },
    { 
      name: 'memory', 
      color: '#45b7d1', 
      speed: 3, 
      points: 15, 
      emoji: '🦗',
      size: 20,
      behavior: 'multiply',
      description: 'Memory leak - multiplies if not caught quickly'
    },
    { 
      name: 'runtime', 
      color: '#f7b731', 
      speed: 2.5, 
      points: 25, 
      emoji: '🐞',
      size: 28,
      behavior: 'teleport',
      description: 'Runtime error - teleports randomly'
    },
    {
      name: 'nullpointer',
      color: '#9c88ff',
      speed: 2,
      points: 30,
      emoji: '👻',
      size: 25,
      behavior: 'invisible',
      description: 'Null pointer - appears and disappears'
    },
    {
      name: 'raceCondition',
      color: '#ff9ff3',
      speed: 4,
      points: 35,
      emoji: '🏃',
      size: 22,
      behavior: 'racing',
      description: 'Race condition - extremely fast and erratic'
    },
    {
      name: 'infiniteLoop',
      color: '#feca57',
      speed: 1,
      points: 40,
      emoji: '🌀',
      size: 35,
      behavior: 'circular',
      description: 'Infinite loop - circles around code blocks'
    },
    {
      name: 'heisenbug',
      color: '#ff9ff3',
      speed: 2.5,
      points: 50,
      emoji: '❓',
      size: 30,
      behavior: 'quantum',
      description: 'Heisenbug - changes behavior when observed'
    }
  ];

  // Power-ups system
  const powerUpTypes = [
    {
      name: 'debugConsole',
      emoji: '🖥️',
      color: '#14b8a6',
      duration: 5000,
      effect: 'Auto-catch bugs for 5 seconds',
      description: 'Debug Console: Auto-catches nearby bugs'
    },
    {
      name: 'codeFormatter',
      emoji: '✨',
      color: '#feca57',
      duration: 8000,
      effect: 'Slows all bugs for 8 seconds',
      description: 'Code Formatter: Slows down all bugs'
    },
    {
      name: 'coffeeBoost',
      emoji: '☕',
      color: '#8b4513',
      duration: 10000,
      effect: 'Increases accuracy and click speed',
      description: 'Coffee Boost: Enhanced reflexes'
    },
    {
      name: 'rubberDuck',
      emoji: '🦆',
      color: '#ffdd59',
      duration: 6000,
      effect: 'Shows bug locations',
      description: 'Rubber Duck: Reveals all bug positions'
    },
    {
      name: 'stackoverflow',
      emoji: '📚',
      color: '#f48024',
      duration: 0,
      effect: 'Instantly destroys all bugs of one type',
      description: 'Stack Overflow: Instant solution found!'
    }
  ];

  // Achievement system
  const achievements = [
    { id: 'firstBug', name: 'First Bug', description: 'Catch your first bug', emoji: '🎯', unlocked: false },
    { id: 'combo10', name: 'Combo Master', description: 'Achieve 10x combo', emoji: '🔥', unlocked: false },
    { id: 'perfectAccuracy', name: 'Pixel Perfect', description: '100% accuracy for 1 minute', emoji: '🎯', unlocked: false },
    { id: 'bugHunter', name: 'Bug Hunter', description: 'Catch 100 bugs', emoji: '🏹', unlocked: false },
    { id: 'survivalMode', name: 'Survivor', description: 'Survive 5 minutes', emoji: '⏰', unlocked: false },
    { id: 'coffeeLover', name: 'Coffee Addict', description: 'Use coffee boost 10 times', emoji: '☕', unlocked: false },
    { id: 'heisenbugHunter', name: 'Quantum Debugger', description: 'Catch 5 Heisenbugs', emoji: '🔬', unlocked: false },
    { id: 'zenMaster', name: 'Zen Master', description: 'Play zen mode for 10 minutes', emoji: '🧘', unlocked: false }
  ];

  // Themes
  const themes = {
    vscode: { bg: '#1e1e1e', accent: '#007acc', text: '#d4d4d4' },
    intellij: { bg: '#2b2b2b', accent: '#629755', text: '#a9b7c6' },
    sublime: { bg: '#272822', accent: '#f92672', text: '#f8f8f2' },
    atom: { bg: '#1d1f21', accent: '#de935f', text: '#c5c8c6' }
  };

  // Audio system (visual feedback for now)
  const playSound = (soundName, volume = 1) => {
    if (!gameStateRef.current.settings.sound) return;
    
    // Create visual audio feedback
    console.log(`🔊 ${soundName} (volume: ${volume})`);
    
    // In a real implementation, you'd play actual audio files here
    // For now, we'll use console and visual feedback
  };

  // Initialize save system
  const loadGameData = () => {
    const saved = localStorage.getItem('devTherapyBugHunter');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return {
          highScore: data.highScore || 0,
          totalBugsCaught: data.totalBugsCaught || 0,
          achievements: data.achievements || [],
          settings: { ...gameStateRef.current.settings, ...data.settings }
        };
      } catch (e) {
        console.error('Failed to load save data:', e);
      }
    }
    return {
      highScore: 0,
      totalBugsCaught: 0,
      achievements: [],
      settings: gameStateRef.current.settings
    };
  };

  const saveGameData = () => {
    const data = {
      highScore: Math.max(gameStateRef.current.score, loadGameData().highScore),
      totalBugsCaught: loadGameData().totalBugsCaught + gameStateRef.current.successfulClicks,
      achievements: gameStateRef.current.achievements,
      settings: gameStateRef.current.settings
    };
    localStorage.setItem('devTherapyBugHunter', JSON.stringify(data));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load save data
    const saveData = loadGameData();
    gameStateRef.current.settings = saveData.settings;
    gameStateRef.current.achievements = saveData.achievements;

    // Initialize code lines based on language
    const initCodeLines = () => {
      const snippets = codeSnippets[gameStateRef.current.language];
      gameStateRef.current.codeLines = snippets.map((line, index) => ({
        text: line,
        x: 50,
        y: 80 + index * 25,
        opacity: 0.4,
        damaged: false,
        originalText: line
      }));
    };

    initCodeLines();

    let animationId;
    let lastTime = 0;

    const gameLoop = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (gameStateRef.current.isPlaying && !gameStateRef.current.isPaused) {
        update(deltaTime);
        render(ctx, canvas);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    const update = (deltaTime) => {
      const gameState = gameStateRef.current;
      gameState.gameTime += deltaTime;

      // Update power-ups
      Object.keys(gameState.activePowerUps).forEach(powerUpName => {
        gameState.activePowerUps[powerUpName] -= deltaTime;
        if (gameState.activePowerUps[powerUpName] <= 0) {
          delete gameState.activePowerUps[powerUpName];
          playSound('powerUpEnd');
        }
      });

      // Spawn power-ups
      const powerUpSpawnRate = 15000; // Every 15 seconds
      if (gameState.gameTime - gameState.lastPowerUpSpawn > powerUpSpawnRate) {
        spawnPowerUp(canvas);
        gameState.lastPowerUpSpawn = gameState.gameTime;
      }

      // Spawn bugs based on difficulty
      const difficultyMultiplier = {
        intern: 1.5,
        senior: 1,
        architect: 0.6,
        codeReview: 0.4
      }[gameState.difficulty];

      const spawnRate = Math.max((2000 - (gameState.level * 100)) * difficultyMultiplier, 300);
      if (gameState.gameTime - gameState.lastSpawn > spawnRate) {
        spawnBug(canvas);
        gameState.lastSpawn = gameState.gameTime;
      }

      // Update bugs with enhanced behaviors
      gameState.bugs = gameState.bugs.filter(bug => updateBug(bug, deltaTime, canvas));

      // Update particles
      gameState.particles = gameState.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= deltaTime;
        particle.opacity = particle.life / particle.maxLife;
        particle.size *= 0.99;
        return particle.life > 0;
      });

      // Update power-ups on screen
      gameState.powerUps = gameState.powerUps.filter(powerUp => {
        powerUp.y += powerUp.speed;
        powerUp.rotation += 0.05;
        return powerUp.y < canvas.height + 50;
      });

      // Level progression
      const scoreThreshold = gameState.level * 150;
      if (gameState.score > scoreThreshold) {
        gameState.level++;
        healRandomCodeLines();
        playSound('levelUp');
        showFloatingText(canvas.width / 2, canvas.height / 2, `Level ${gameState.level}!`, '#14b8a6', 2000);
      }

      // Combo decay
      if (gameState.gameTime % 5000 < deltaTime && gameState.combo > 0) {
        gameState.combo = Math.max(0, gameState.combo - 1);
      }

      // Check achievements
      checkAchievements();

      // Auto-catch (Debug Console power-up)
      if (gameState.activePowerUps.debugConsole) {
        autoCatchNearbyBugs(canvas);
      }

      // Update accuracy
      if (gameState.totalClicks > 0) {
        gameState.accuracy = Math.round((gameState.successfulClicks / gameState.totalClicks) * 100);
      }

      // Update UI
      updateGameStats();
    };

    const updateBug = (bug, deltaTime, canvas) => {
      // Apply power-up effects
      let speedMultiplier = 1;
      if (gameStateRef.current.activePowerUps.codeFormatter) {
        speedMultiplier = 0.3;
      }

      // Behavior-based movement
      switch (bug.behavior) {
        case 'linear':
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier;
          break;
          
        case 'zigzag':
          bug.zigzagTimer += deltaTime;
          if (bug.zigzagTimer > 1000) {
            bug.angle += (Math.random() - 0.5) * Math.PI;
            bug.zigzagTimer = 0;
          }
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier;
          break;
          
        case 'multiply':
          bug.multiplyTimer += deltaTime;
          if (bug.multiplyTimer > 3000 && !bug.hasMultiplied) {
            spawnMultipliedBug(bug, canvas);
            bug.hasMultiplied = true;
          }
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier;
          break;
          
        case 'teleport':
          bug.teleportTimer += deltaTime;
          if (bug.teleportTimer > 2000) {
            bug.x = Math.random() * canvas.width;
            bug.y = Math.random() * canvas.height;
            bug.teleportTimer = 0;
            createParticles(bug.x, bug.y, bug.color, 'teleport');
          }
          break;
          
        case 'invisible':
          bug.invisibleTimer += deltaTime;
          bug.visible = Math.sin(bug.invisibleTimer * 0.003) > 0;
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier;
          break;
          
        case 'racing':
          bug.angle += (Math.random() - 0.5) * 0.3;
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier * 1.5;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier * 1.5;
          break;
          
        case 'circular':
          bug.circularTimer += deltaTime * 0.002;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          bug.x = centerX + Math.cos(bug.circularTimer) * bug.circularRadius;
          bug.y = centerY + Math.sin(bug.circularTimer) * bug.circularRadius;
          break;
          
        case 'quantum':
          // Heisenbug - changes behavior randomly
          if (Math.random() < 0.01) {
            const behaviors = ['linear', 'zigzag', 'teleport'];
            bug.behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
          }
          bug.x += Math.cos(bug.angle) * bug.speed * speedMultiplier;
          bug.y += Math.sin(bug.angle) * bug.speed * speedMultiplier;
          break;
      }

      // Bounce off walls
      if (bug.x <= 0 || bug.x >= canvas.width) {
        bug.angle = Math.PI - bug.angle;
      }
      if (bug.y <= 0 || bug.y >= canvas.height) {
        bug.angle = -bug.angle;
      }

      // Keep in bounds
      bug.x = Math.max(0, Math.min(canvas.width, bug.x));
      bug.y = Math.max(0, Math.min(canvas.height, bug.y));

      // Check code damage
      checkCodeDamage(bug);

      return true;
    };

    const checkCodeDamage = (bug) => {
      const gameState = gameStateRef.current;
      const nearCode = gameState.codeLines.some(line => 
        Math.abs(bug.x - line.x) < 200 && Math.abs(bug.y - line.y) < 30
      );

      if (nearCode && !bug.damagedCode) {
        bug.damagedCode = true;
        
        if (gameState.gameMode !== 'zen') {
          gameState.lives--;
          
          // Damage a random code line
          const availableLines = gameState.codeLines.filter(line => !line.damaged);
          if (availableLines.length > 0) {
            const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
            damageCodeLine(randomLine);
          }

          // Screen shake effect
          if (gameState.settings.screenShake) {
            createScreenShake();
          }

          playSound('codeDamage');
          createParticles(bug.x, bug.y, '#ff0000', 'damage');

          if (gameState.lives <= 0) {
            endGame();
          }
        }
      }
    };

    const spawnBug = (canvas) => {
      const gameState = gameStateRef.current;
      let availableBugTypes = [...bugTypes];
      
      // Unlock more bug types as level increases
      if (gameState.level < 3) availableBugTypes = availableBugTypes.slice(0, 2);
      else if (gameState.level < 5) availableBugTypes = availableBugTypes.slice(0, 4);
      else if (gameState.level < 8) availableBugTypes = availableBugTypes.slice(0, 6);
      
      const bugType = availableBugTypes[Math.floor(Math.random() * availableBugTypes.length)];
      const side = Math.floor(Math.random() * 4);
      let x, y;

      // Spawn from edges
      switch (side) {
        case 0: x = Math.random() * canvas.width; y = -50; break;
        case 1: x = canvas.width + 50; y = Math.random() * canvas.height; break;
        case 2: x = Math.random() * canvas.width; y = canvas.height + 50; break;
        case 3: x = -50; y = Math.random() * canvas.height; break;
      }

      const bug = {
        id: Date.now() + Math.random(),
        x, y,
        type: bugType.name,
        color: bugType.color,
        speed: bugType.speed,
        points: bugType.points,
        emoji: bugType.emoji,
        size: bugType.size,
        behavior: bugType.behavior,
        description: bugType.description,
        angle: Math.random() * Math.PI * 2,
        wiggle: (Math.random() - 0.5) * 0.1,
        damagedCode: false,
        visible: true,
        // Behavior-specific properties
        zigzagTimer: 0,
        multiplyTimer: 0,
        hasMultiplied: false,
        teleportTimer: 0,
        invisibleTimer: 0,
        circularTimer: 0,
        circularRadius: 100 + Math.random() * 200
      };

      gameState.bugs.push(bug);
    };

    const spawnPowerUp = (canvas) => {
      const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      
      const powerUp = {
        ...powerUpType,
        x: Math.random() * (canvas.width - 100) + 50,
        y: -50,
        speed: 1,
        rotation: 0,
        id: Date.now()
      };

      gameStateRef.current.powerUps.push(powerUp);
    };

    const render = (ctx, canvas) => {
      // Clear with theme background
      const theme = themes[gameStateRef.current.theme];
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background effects
      drawBackground(ctx, canvas);
      
      // Draw code lines
      drawCodeLines(ctx);
      
      // Draw power-ups
      gameStateRef.current.powerUps.forEach(powerUp => drawPowerUp(ctx, powerUp));
      
      // Draw bugs (with rubber duck highlighting)
      gameStateRef.current.bugs.forEach(bug => drawBug(ctx, bug));
      
      // Draw particles
      if (gameStateRef.current.settings.particles) {
        gameStateRef.current.particles.forEach(particle => drawParticle(ctx, particle));
      }
      
      // Draw UI
      drawUI(ctx, canvas);
      
      // Draw power-up indicators
      drawActivePowerUps(ctx, canvas);
    };

    const drawBackground = (ctx, canvas) => {
      const theme = themes[gameStateRef.current.theme];
      
      // Draw subtle grid
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.1;
      
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };

    const drawCodeLines = (ctx) => {
      const theme = themes[gameStateRef.current.theme];
      ctx.font = '16px "Courier New", monospace';
      
      gameStateRef.current.codeLines.forEach(line => {
        ctx.globalAlpha = line.opacity;
        
        if (line.damaged) {
          // Glitch effect for damaged code
          ctx.fillStyle = '#ff6b6b';
          ctx.fillText(line.text.replace(/\w/g, '?'), line.x, line.y);
          ctx.fillStyle = '#ff0000';
          ctx.globalAlpha = 0.5;
          ctx.fillText(line.text.replace(/\w/g, '▓'), line.x + 2, line.y + 1);
        } else {
          ctx.fillStyle = theme.text;
          ctx.fillText(line.text, line.x, line.y);
        }
      });
      
      ctx.globalAlpha = 1;
    };

    const drawBug = (ctx, bug) => {
      if (!bug.visible && bug.behavior === 'invisible') return;
      
      ctx.save();
      ctx.translate(bug.x, bug.y);
      
      // Rubber duck highlighting
      if (gameStateRef.current.activePowerUps.rubberDuck) {
        ctx.strokeStyle = '#ffdd59';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(0, 0, bug.size + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Bug glow effect
      ctx.shadowColor = bug.color;
      ctx.shadowBlur = 15;
      
      // Draw bug emoji
      ctx.font = `${bug.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(bug.emoji, 0, 0);
      
      ctx.restore();
    };

    const drawPowerUp = (ctx, powerUp) => {
      ctx.save();
      ctx.translate(powerUp.x, powerUp.y);
      ctx.rotate(powerUp.rotation);
      
      // Glow effect
      ctx.shadowColor = powerUp.color;
      ctx.shadowBlur = 20;
      
      // Background circle
      ctx.fillStyle = powerUp.color;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Power-up emoji
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(powerUp.emoji, 0, 8);
      
      ctx.restore();
    };

    const drawActivePowerUps = (ctx, canvas) => {
      const activePowerUps = Object.keys(gameStateRef.current.activePowerUps);
      if (activePowerUps.length === 0) return;
      
      ctx.font = '14px Arial';
      activePowerUps.forEach((powerUpName, index) => {
        const timeLeft = gameStateRef.current.activePowerUps[powerUpName];
        const powerUp = powerUpTypes.find(p => p.name === powerUpName);
        
        const y = 120 + (index * 40);
        
        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(canvas.width - 220, y - 15, 200, 30);
        
        // Icon
        ctx.font = '20px Arial';
        ctx.fillText(powerUp.emoji, canvas.width - 210, y + 5);
        
        // Timer
        ctx.font = '14px Arial';
        ctx.fillStyle = powerUp.color;
        const seconds = Math.ceil(timeLeft / 1000);
        ctx.fillText(`${seconds}s`, canvas.width - 40, y + 5);
        
        // Progress bar
        const progress = timeLeft / powerUp.duration;
        ctx.fillStyle = powerUp.color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(canvas.width - 180, y - 5, 120 * progress, 10);
        ctx.globalAlpha = 1;
      });
    };

    const drawUI = (ctx, canvas) => {
      const theme = themes[gameStateRef.current.theme];
      
      // Main title
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = theme.accent;
      ctx.fillText('DevTherapy: Bug Hunter', 20, 40);
      
      ctx.font = '14px Arial';
      ctx.fillStyle = theme.text;
      ctx.fillText(`Therapy for ${gameStateRef.current.language} developers, one bug at a time`, 20, 60);
      
      // Difficulty indicator
      ctx.fillStyle = theme.accent;
      ctx.fillText(`${gameStateRef.current.difficulty.toUpperCase()} MODE`, 20, canvas.height - 20);
    };

    // Game interaction handlers
    const handleClick = (event) => {
      if (!gameStateRef.current.isPlaying) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      gameStateRef.current.totalClicks++;

      // Check power-up clicks
      const clickedPowerUpIndex = gameStateRef.current.powerUps.findIndex(powerUp => {
        const distance = Math.sqrt(
          Math.pow(clickX - powerUp.x, 2) + Math.pow(clickY - powerUp.y, 2)
        );
        return distance < 30;
      });

      if (clickedPowerUpIndex !== -1) {
        const powerUp = gameStateRef.current.powerUps[clickedPowerUpIndex];
        activatePowerUp(powerUp);
        gameStateRef.current.powerUps.splice(clickedPowerUpIndex, 1);
        gameStateRef.current.successfulClicks++;
        return;
      }

      // Check bug clicks
      const clickedBugIndex = gameStateRef.current.bugs.findIndex(bug => {
        if (!bug.visible && bug.behavior === 'invisible') return false;
        
        const distance = Math.sqrt(
          Math.pow(clickX - bug.x, 2) + Math.pow(clickY - bug.y, 2)
        );
        return distance < bug.size;
      });

      if (clickedBugIndex !== -1) {
        const bug = gameStateRef.current.bugs[clickedBugIndex];
        catchBug(bug, clickedBugIndex);
      } else {
        // Miss penalty
        gameStateRef.current.combo = 0;
        playSound('miss');
      }
    };

    const catchBug = (bug, index) => {
      const gameState = gameStateRef.current;
      
      // Calculate points with combo multiplier
      const comboMultiplier = Math.min(1 + (gameState.combo * 0.1), 3);
      const points = Math.round(bug.points * comboMultiplier);
      
      gameState.score += points;
      gameState.combo++;
      gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
      gameState.successfulClicks++;
      
      // Remove bug
      gameState.bugs.splice(index, 1);
      
      // Effects
      createParticles(bug.x, bug.y, bug.color, 'catch');
      playSound('bugCatch');
      showFloatingText(bug.x, bug.y, `+${points}`, bug.color);
      
      // Combo effects
      if (gameState.combo >= 10) {
        playSound('comboMax');
        createParticles(bug.x, bug.y, '#ffd700', 'combo');
      }
      
      updateGameStats();
    };

    const activatePowerUp = (powerUp) => {
      const gameState = gameStateRef.current;
      
      playSound('powerUpCollect');
      createParticles(powerUp.x, powerUp.y, powerUp.color, 'powerup');
      
      switch (powerUp.name) {
        case 'debugConsole':
        case 'codeFormatter':
        case 'coffeeBoost':
        case 'rubberDuck':
          gameState.activePowerUps[powerUp.name] = powerUp.duration;
          break;
          
        case 'stackoverflow':
          // Remove all bugs of most common type
          const bugTypeCounts = {};
          gameState.bugs.forEach(bug => {
            bugTypeCounts[bug.type] = (bugTypeCounts[bug.type] || 0) + 1;
          });
          
          const mostCommonType = Object.keys(bugTypeCounts).reduce((a, b) => 
            bugTypeCounts[a] > bugTypeCounts[b] ? a : b, Object.keys(bugTypeCounts)[0]
          );
          
          if (mostCommonType) {
            gameState.bugs = gameState.bugs.filter(bug => {
              if (bug.type === mostCommonType) {
                createParticles(bug.x, bug.y, '#f48024', 'stackoverflow');
                gameState.score += bug.points;
                return false;
              }
              return true;
            });
          }
          break;
      }
      
      showFloatingText(powerUp.x, powerUp.y, powerUp.effect, powerUp.color, 2000);
    };

    // Utility functions
    const createParticles = (x, y, color, type = 'normal') => {
      if (!gameStateRef.current.settings.particles) return;
      
      const particleCount = type === 'combo' ? 15 : type === 'stackoverflow' ? 20 : 8;
      
      for (let i = 0; i < particleCount; i++) {
        gameStateRef.current.particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 15,
          vy: (Math.random() - 0.5) * 15,
          color,
          size: Math.random() * 6 + 2,
          life: type === 'combo' ? 2000 : 1000,
          maxLife: type === 'combo' ? 2000 : 1000,
          opacity: 1
        });
      }
    };

    const showFloatingText = (x, y, text, color, duration = 1000) => {
      // For now, just console log - in a full implementation this would create floating text elements
      console.log(`💫 ${text} at (${Math.round(x)}, ${Math.round(y)})`);
    };

    const createScreenShake = () => {
      // Simple screen shake effect
      if (gameStateRef.current.settings.screenShake) {
        canvas.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
          canvas.style.transform = 'translate(0, 0)';
        }, 100);
      }
    };

    const autoCatchNearbyBugs = (canvas) => {
      const gameState = gameStateRef.current;
      const catchRadius = 100;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      gameState.bugs = gameState.bugs.filter((bug, index) => {
        const distance = Math.sqrt(
          Math.pow(bug.x - centerX, 2) + Math.pow(bug.y - centerY, 2)
        );
        
        if (distance < catchRadius) {
          catchBug(bug, index);
          return false;
        }
        return true;
      });
    };

    const damageCodeLine = (line) => {
      line.damaged = true;
      line.opacity = 0.2;
      line.text = line.originalText.replace(/\w/g, match => 
        Math.random() < 0.7 ? '?' : match
      );
    };

    const healRandomCodeLines = () => {
      const damagedLines = gameStateRef.current.codeLines.filter(line => line.damaged);
      const healCount = Math.min(damagedLines.length, 2);
      
      for (let i = 0; i < healCount; i++) {
        const randomLine = damagedLines[Math.floor(Math.random() * damagedLines.length)];
        randomLine.damaged = false;
        randomLine.opacity = 0.4;
        randomLine.text = randomLine.originalText;
      }
    };

    const checkAchievements = () => {
      const gameState = gameStateRef.current;
      const newAchievements = [];
      
      // Check various achievement conditions
      if (gameState.successfulClicks >= 1 && !gameState.achievements.includes('firstBug')) {
        newAchievements.push('firstBug');
      }
      
      if (gameState.combo >= 10 && !gameState.achievements.includes('combo10')) {
        newAchievements.push('combo10');
      }
      
      if (gameState.successfulClicks >= 100 && !gameState.achievements.includes('bugHunter')) {
        newAchievements.push('bugHunter');
      }
      
      if (gameState.gameTime >= 300000 && !gameState.achievements.includes('survivalMode')) {
        newAchievements.push('survivalMode');
      }
      
      // Add achievements and show notifications
      newAchievements.forEach(achievementId => {
        gameState.achievements.push(achievementId);
        const achievement = achievements.find(a => a.id === achievementId);
        showFloatingText(canvas.width / 2, 200, `Achievement: ${achievement.name}!`, '#ffd700', 3000);
        playSound('achievement');
      });
    };

    const updateGameStats = () => {
      setGameStats({
        score: gameStateRef.current.score,
        level: gameStateRef.current.level,
        lives: gameStateRef.current.lives,
        combo: gameStateRef.current.combo,
        accuracy: gameStateRef.current.accuracy,
        isGameOver: gameStateRef.current.lives <= 0,
        isPlaying: gameStateRef.current.isPlaying,
        showSettings: false,
        showAchievements: false,
        activePowerUps: { ...gameStateRef.current.activePowerUps },
        currentLanguage: gameStateRef.current.language,
        currentTheme: gameStateRef.current.theme
      });
    };

    const endGame = () => {
      gameStateRef.current.isPlaying = false;
      saveGameData();
      playSound('gameOver');
      setGameStats(prev => ({ ...prev, isGameOver: true, isPlaying: false }));
    };

    // Event listeners
    canvas.addEventListener('click', handleClick);
    gameLoop(0);

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Game control functions
  const startGame = (difficulty = 'senior', gameMode = 'normal') => {
    const gameState = gameStateRef.current;
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.level = 1;
    gameState.lives = gameState.maxLives;
    gameState.bugs = [];
    gameState.particles = [];
    gameState.powerUps = [];
    gameState.gameTime = 0;
    gameState.lastSpawn = 0;
    gameState.lastPowerUpSpawn = 0;
    gameState.combo = 0;
    gameState.accuracy = 100;
    gameState.totalClicks = 0;
    gameState.successfulClicks = 0;
    gameState.activePowerUps = {};
    gameState.difficulty = difficulty;
    gameState.gameMode = gameMode;

    // Reset code lines
    const snippets = codeSnippets[gameState.language];
    gameState.codeLines = snippets.map((line, index) => ({
      text: line,
      x: 50,
      y: 80 + index * 25,
      opacity: 0.4,
      damaged: false,
      originalText: line
    }));

    updateGameStats();
    playSound('gameStart');
  };

  const pauseGame = () => {
    gameStateRef.current.isPaused = !gameStateRef.current.isPaused;
    playSound('pause');
  };

  const changeLanguage = (language) => {
    gameStateRef.current.language = language;
    if (!gameStateRef.current.isPlaying) {
      const snippets = codeSnippets[language];
      gameStateRef.current.codeLines = snippets.map((line, index) => ({
        text: line,
        x: 50,
        y: 80 + index * 25,
        opacity: 0.4,
        damaged: false,
        originalText: line
      }));
    }
    setGameStats(prev => ({ ...prev, currentLanguage: language }));
  };

  const changeTheme = (theme) => {
    gameStateRef.current.theme = theme;
    setGameStats(prev => ({ ...prev, currentTheme: theme }));
  };

  const toggleSettings = () => {
    setGameStats(prev => ({ ...prev, showSettings: !prev.showSettings }));
  };

  const toggleAchievements = () => {
    setGameStats(prev => ({ ...prev, showAchievements: !prev.showAchievements }));
  };

  const updateSetting = (setting, value) => {
    gameStateRef.current.settings[setting] = value;
    saveGameData();
  };

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        className="game-canvas"
        style={{
          background: themes[gameStats.currentTheme].bg,
          cursor: gameStats.isPlaying ? 'crosshair' : 'default'
        }}
      />
      
      {/* Enhanced Game UI */}
      <div className="game-ui">
        {/* Stats Panel */}
        <div className="stats-panel enhanced">
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{gameStats.score.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{gameStats.level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Lives:</span>
            <span className="stat-value">{'❤️'.repeat(gameStats.lives)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Combo:</span>
            <span className="stat-value combo">{gameStats.combo}x</span>
          </div>
          <div className="stat">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">{gameStats.accuracy}%</span>
          </div>
        </div>

        {/* Main Menu */}
        {!gameStats.isPlaying && !gameStats.isGameOver && (
          <div className="game-menu enhanced">
            <h1>DevTherapy: Bug Hunter</h1>
            <p>Enhanced Edition - Catch the bugs before they damage your code!</p>
            
            <div className="menu-options">
              <div className="option-group">
                <label>Difficulty:</label>
                <div className="difficulty-buttons">
                  <button onClick={() => startGame('intern', 'normal')} className="difficulty-btn intern">
                    Intern Mode
                  </button>
                  <button onClick={() => startGame('senior', 'normal')} className="difficulty-btn senior">
                    Senior Dev
                  </button>
                  <button onClick={() => startGame('architect', 'normal')} className="difficulty-btn architect">
                    Architect
                  </button>
                  <button onClick={() => startGame('codeReview', 'normal')} className="difficulty-btn review">
                    Code Review
                  </button>
                </div>
              </div>
              
              <div className="option-group">
                <label>Game Mode:</label>
                <div className="mode-buttons">
                  <button onClick={() => startGame('senior', 'normal')} className="mode-btn">
                    Normal Mode
                  </button>
                  <button onClick={() => startGame('senior', 'zen')} className="mode-btn zen">
                    🧘 Zen Mode
                  </button>
                </div>
              </div>
              
              <div className="option-group">
                <label>Language:</label>
                <div className="language-buttons">
                  <button 
                    onClick={() => changeLanguage('javascript')} 
                    className={`lang-btn ${gameStats.currentLanguage === 'javascript' ? 'active' : ''}`}
                  >
                    JavaScript
                  </button>
                  <button 
                    onClick={() => changeLanguage('python')} 
                    className={`lang-btn ${gameStats.currentLanguage === 'python' ? 'active' : ''}`}
                  >
                    Python
                  </button>
                  <button 
                    onClick={() => changeLanguage('java')} 
                    className={`lang-btn ${gameStats.currentLanguage === 'java' ? 'active' : ''}`}
                  >
                    Java
                  </button>
                </div>
              </div>
              
              <div className="option-group">
                <label>Theme:</label>
                <div className="theme-buttons">
                  {Object.keys(themes).map(theme => (
                    <button 
                      key={theme}
                      onClick={() => changeTheme(theme)} 
                      className={`theme-btn ${gameStats.currentTheme === theme ? 'active' : ''}`}
                      style={{ backgroundColor: themes[theme].accent }}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="menu-buttons">
              <button onClick={toggleSettings} className="menu-btn">
                ⚙️ Settings
              </button>
              <button onClick={toggleAchievements} className="menu-btn">
                🏆 Achievements
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameStats.isGameOver && (
          <div className="game-over enhanced">
            <h2>🎮 Therapy Session Complete!</h2>
            <div className="final-stats">
              <div className="stat-item">
                <span className="label">Final Score:</span>
                <span className="value">{gameStats.score.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="label">Level Reached:</span>
                <span className="value">{gameStats.level}</span>
              </div>
              <div className="stat-item">
                <span className="label">Bugs Caught:</span>
                <span className="value">{gameStateRef.current?.successfulClicks || 0}</span>
              </div>
              <div className="stat-item">
                <span className="label">Max Combo:</span>
                <span className="value">{gameStateRef.current?.maxCombo || 0}x</span>
              </div>
              <div className="stat-item">
                <span className="label">Final Accuracy:</span>
                <span className="value">{gameStats.accuracy}%</span>
              </div>
            </div>
            
            <div className="restart-options">
              <button onClick={() => startGame('senior', 'normal')} className="play-button">
                🔄 New Session
              </button>
              <button onClick={() => setGameStats(prev => ({ ...prev, isGameOver: false }))} className="menu-button">
                📋 Main Menu
              </button>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {gameStats.isPlaying && (
          <div className="game-controls enhanced">
            <button onClick={pauseGame} className="control-btn">
              {gameStateRef.current?.isPaused ? '▶️' : '⏸️'}
            </button>
            <button onClick={toggleSettings} className="control-btn">
              ⚙️
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Instructions */}
      <div className="instructions enhanced">
        <h3>🎯 How to Play:</h3>
        <ul>
          <li>🖱️ Click on bugs to catch them</li>
          <li>🛡️ Protect your code from damage</li>
          <li>⚡ Different bugs give different points</li>
          <li>🔥 Build combos for bonus points</li>
          <li>💎 Collect power-ups for special abilities</li>
          <li>📈 Level up to unlock healing powers</li>
          <li>❤️ Don't let bugs damage all your code!</li>
        </ul>
        
        <h4>🐛 Bug Types:</h4>
        <div className="bug-types">
          <div className="bug-type">🐛 Syntax Error (10pts)</div>
          <div className="bug-type">🕷️ Logic Error (20pts)</div>
          <div className="bug-type">🦗 Memory Leak (15pts)</div>
          <div className="bug-type">🐞 Runtime Error (25pts)</div>
          <div className="bug-type">👻 Null Pointer (30pts)</div>
          <div className="bug-type">🏃 Race Condition (35pts)</div>
          <div className="bug-type">🌀 Infinite Loop (40pts)</div>
          <div className="bug-type">❓ Heisenbug (50pts)</div>
        </div>
        
        <h4>💎 Power-ups:</h4>
        <div className="power-ups">
          <div className="power-up">🖥️ Debug Console</div>
          <div className="power-up">✨ Code Formatter</div>
          <div className="power-up">☕ Coffee Boost</div>
          <div className="power-up">🦆 Rubber Duck</div>
          <div className="power-up">📚 Stack Overflow</div>
        </div>
      </div>

      {/* Settings Modal */}
      {gameStats.showSettings && (
        <div className="modal-overlay" onClick={toggleSettings}>
          <div className="modal-content settings-modal" onClick={e => e.stopPropagation()}>
            <h2>⚙️ Settings</h2>
            <div className="setting-item">
              <label>🔊 Sound Effects:</label>
              <input 
                type="checkbox" 
                checked={gameStateRef.current?.settings.sound}
                onChange={(e) => updateSetting('sound', e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>✨ Particle Effects:</label>
              <input 
                type="checkbox" 
                checked={gameStateRef.current?.settings.particles}
                onChange={(e) => updateSetting('particles', e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>📳 Screen Shake:</label>
              <input 
                type="checkbox" 
                checked={gameStateRef.current?.settings.screenShake}
                onChange={(e) => updateSetting('screenShake', e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>🔉 Volume:</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={gameStateRef.current?.settings.volume || 0.5}
                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
              />
            </div>
            <button onClick={toggleSettings} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {gameStats.showAchievements && (
        <div className="modal-overlay" onClick={toggleAchievements}>
          <div className="modal-content achievements-modal" onClick={e => e.stopPropagation()}>
            <h2>🏆 Achievements</h2>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`achievement-item ${gameStateRef.current?.achievements.includes(achievement.id) ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.emoji}</div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={toggleAchievements} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugHunterGame;