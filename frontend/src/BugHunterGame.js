import React, { useEffect, useRef, useState } from 'react';

const BugHunterGame = () => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    isPlaying: false,
    isPaused: false,
    score: 0,
    level: 1,
    lives: 3,
    bugs: [],
    particles: [],
    gameTime: 0,
    lastSpawn: 0,
    codeLines: []
  });

  const [gameStats, setGameStats] = useState({
    score: 0,
    level: 1,
    lives: 3,
    isGameOver: false,
    isPlaying: false
  });

  // Code snippets that appear in background
  const codeSnippets = [
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
    "  }",
    "}",
    "",
    "const fixBug = () => {",
    "  console.log('Bug fixed!');",
    "  mentalHealth.improve();",
    "};",
    "",
    "// TODO: Catch all bugs",
    "// Before they crash the app"
  ];

  // Bug types with different behaviors
  const bugTypes = [
    { 
      name: 'syntax', 
      color: '#ff6b6b', 
      speed: 2, 
      points: 10, 
      emoji: '🐛',
      size: 25 
    },
    { 
      name: 'logic', 
      color: '#4ecdc4', 
      speed: 1.5, 
      points: 20, 
      emoji: '🕷️',
      size: 30 
    },
    { 
      name: 'memory', 
      color: '#45b7d1', 
      speed: 3, 
      points: 15, 
      emoji: '🦗',
      size: 20 
    },
    { 
      name: 'runtime', 
      color: '#f7b731', 
      speed: 2.5, 
      points: 25, 
      emoji: '🐞',
      size: 28 
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize code lines
    gameStateRef.current.codeLines = codeSnippets.map((line, index) => ({
      text: line,
      x: 50,
      y: 50 + index * 25,
      opacity: 0.3,
      damaged: false
    }));

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

      // Spawn bugs
      const spawnRate = Math.max(2000 - (gameState.level * 200), 500);
      if (gameState.gameTime - gameState.lastSpawn > spawnRate) {
        spawnBug(canvas);
        gameState.lastSpawn = gameState.gameTime;
      }

      // Update bugs
      gameState.bugs = gameState.bugs.filter(bug => {
        bug.x += Math.cos(bug.angle) * bug.speed;
        bug.y += Math.sin(bug.angle) * bug.speed;
        bug.angle += bug.wiggle;

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

        // Check if bug reached code (damage)
        const nearCode = gameState.codeLines.some(line => 
          Math.abs(bug.x - line.x) < 100 && Math.abs(bug.y - line.y) < 30
        );

        if (nearCode && !bug.damagedCode) {
          bug.damagedCode = true;
          gameState.lives--;
          
          // Damage a random code line
          const randomLine = gameState.codeLines[Math.floor(Math.random() * gameState.codeLines.length)];
          randomLine.damaged = true;
          randomLine.opacity = 0.1;

          if (gameState.lives <= 0) {
            endGame();
          }
        }

        return true;
      });

      // Update particles
      gameState.particles = gameState.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= deltaTime;
        particle.opacity = particle.life / 1000;
        return particle.life > 0;
      });

      // Level progression
      if (gameState.score > gameState.level * 100) {
        gameState.level++;
        // Heal some code lines on level up
        gameState.codeLines.forEach(line => {
          if (Math.random() < 0.3) {
            line.damaged = false;
            line.opacity = 0.3;
          }
        });
      }

      // Update UI
      setGameStats({
        score: gameState.score,
        level: gameState.level,
        lives: gameState.lives,
        isGameOver: gameState.lives <= 0,
        isPlaying: gameState.isPlaying
      });
    };

    const render = (ctx, canvas) => {
      // Clear with dark background
      ctx.fillStyle = '#0f0f10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background pattern
      drawBackground(ctx, canvas);

      // Draw code lines
      drawCodeLines(ctx);

      // Draw bugs
      gameStateRef.current.bugs.forEach(bug => drawBug(ctx, bug));

      // Draw particles
      gameStateRef.current.particles.forEach(particle => drawParticle(ctx, particle));

      // Draw UI overlay
      drawUI(ctx, canvas);
    };

    const drawBackground = (ctx, canvas) => {
      // Draw grid pattern
      ctx.strokeStyle = '#14b8a6';
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
      ctx.font = '16px "Courier New", monospace';
      
      gameStateRef.current.codeLines.forEach(line => {
        ctx.globalAlpha = line.opacity;
        ctx.fillStyle = line.damaged ? '#ff6b6b' : '#14b8a6';
        ctx.fillText(line.text, line.x, line.y);
        
        if (line.damaged) {
          // Add glitch effect
          ctx.fillStyle = '#ff0000';
          ctx.globalAlpha = 0.5;
          ctx.fillText(line.text.replace(/\w/g, '?'), line.x + 2, line.y + 1);
        }
      });
      
      ctx.globalAlpha = 1;
    };

    const drawBug = (ctx, bug) => {
      ctx.save();
      ctx.translate(bug.x, bug.y);
      ctx.rotate(bug.angle);
      
      // Draw bug emoji
      ctx.font = `${bug.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(bug.emoji, 0, 0);
      
      // Draw bug glow
      ctx.shadowColor = bug.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = bug.color;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(-bug.size/2, -bug.size/2, bug.size, bug.size);
      
      ctx.restore();
    };

    const drawParticle = (ctx, particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      ctx.restore();
    };

    const drawUI = (ctx, canvas) => {
      // Draw DevTherapy logo
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#14b8a6';
      ctx.fillText('DevTherapy: Bug Hunter', 20, 40);
      
      ctx.font = '14px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Therapy for developers, one bug at a time', 20, 60);
    };

    const spawnBug = (canvas) => {
      const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
      const side = Math.floor(Math.random() * 4);
      let x, y;

      // Spawn from edges
      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -50;
          break;
        case 1: // right
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          break;
        case 3: // left
          x = -50;
          y = Math.random() * canvas.height;
          break;
      }

      const bug = {
        x,
        y,
        type: bugType.name,
        color: bugType.color,
        speed: bugType.speed,
        points: bugType.points,
        emoji: bugType.emoji,
        size: bugType.size,
        angle: Math.random() * Math.PI * 2,
        wiggle: (Math.random() - 0.5) * 0.1,
        damagedCode: false
      };

      gameStateRef.current.bugs.push(bug);
    };

    const handleClick = (event) => {
      if (!gameStateRef.current.isPlaying) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // Check if clicked on a bug
      const clickedBugIndex = gameStateRef.current.bugs.findIndex(bug => {
        const distance = Math.sqrt(
          Math.pow(clickX - bug.x, 2) + Math.pow(clickY - bug.y, 2)
        );
        return distance < bug.size;
      });

      if (clickedBugIndex !== -1) {
        const bug = gameStateRef.current.bugs[clickedBugIndex];
        gameStateRef.current.score += bug.points;
        gameStateRef.current.bugs.splice(clickedBugIndex, 1);

        // Create particles
        createParticles(bug.x, bug.y, bug.color);

        // Play catch sound (visual feedback)
        createFloatingText(bug.x, bug.y, `+${bug.points}`, bug.color);
      }
    };

    const createParticles = (x, y, color) => {
      for (let i = 0; i < 8; i++) {
        gameStateRef.current.particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          color,
          size: Math.random() * 4 + 2,
          life: 1000,
          opacity: 1
        });
      }
    };

    const createFloatingText = (x, y, text, color) => {
      // This would create floating score text - simplified for now
      console.log(`Score: ${text} at (${x}, ${y})`);
    };

    const endGame = () => {
      gameStateRef.current.isPlaying = false;
      setGameStats(prev => ({ ...prev, isGameOver: true, isPlaying: false }));
    };

    canvas.addEventListener('click', handleClick);
    gameLoop(0);

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const startGame = () => {
    const gameState = gameStateRef.current;
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.level = 1;
    gameState.lives = 3;
    gameState.bugs = [];
    gameState.particles = [];
    gameState.gameTime = 0;
    gameState.lastSpawn = 0;

    // Reset code lines
    gameState.codeLines = gameState.codeLines.map(line => ({
      ...line,
      damaged: false,
      opacity: 0.3
    }));

    setGameStats({
      score: 0,
      level: 1,
      lives: 3,
      isGameOver: false,
      isPlaying: true
    });
  };

  const pauseGame = () => {
    gameStateRef.current.isPaused = !gameStateRef.current.isPaused;
  };

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        className="game-canvas"
        style={{
          background: '#0f0f10',
          cursor: gameStats.isPlaying ? 'crosshair' : 'default'
        }}
      />
      
      {/* Game UI Overlay */}
      <div className="game-ui">
        <div className="stats-panel">
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{gameStats.score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{gameStats.level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Lives:</span>
            <span className="stat-value">{'❤️'.repeat(gameStats.lives)}</span>
          </div>
        </div>

        {!gameStats.isPlaying && !gameStats.isGameOver && (
          <div className="game-menu">
            <h1>DevTherapy: Bug Hunter</h1>
            <p>Catch the bugs before they damage your code!</p>
            <p>Click on bugs to catch them and earn points.</p>
            <button onClick={startGame} className="play-button">
              Start Therapy Session
            </button>
          </div>
        )}

        {gameStats.isGameOver && (
          <div className="game-over">
            <h2>Therapy Session Complete!</h2>
            <p>Final Score: {gameStats.score}</p>
            <p>Level Reached: {gameStats.level}</p>
            <p>You caught {Math.floor(gameStats.score / 15)} bugs!</p>
            <button onClick={startGame} className="play-button">
              New Therapy Session
            </button>
          </div>
        )}

        {gameStats.isPlaying && (
          <div className="game-controls">
            <button onClick={pauseGame} className="pause-button">
              ⏸️ Pause
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>🎯 Click on bugs to catch them</li>
          <li>🛡️ Protect your code from bug damage</li>
          <li>⚡ Different bugs give different points</li>
          <li>📈 Level up to unlock healing powers</li>
          <li>❤️ Don't let bugs damage all your code!</li>
        </ul>
      </div>
    </div>
  );
};

export default BugHunterGame;