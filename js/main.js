(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Galaxy background (starfield + shooting stars) ---------------- */
  (function initGalaxy(){
    var canvas = document.getElementById('galaxyCanvas');
    if(!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, dpr = 1;
    var stars = [];
    var shooters = [];
    var STAR_COLORS = ['255,255,255', '243,200,120', '127,199,175']; // white, gold, teal
    var rafId = null;
    var lastShootTime = 0;
    var nextShootDelay = 4000 + Math.random() * 6000;

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function buildStars(){
      var count = Math.round((w * h) / 9000); // density scales with screen area
      count = Math.max(70, Math.min(count, 260));
      stars = [];
      for(var i = 0; i < count; i++){
        var colorRoll = Math.random();
        var color = colorRoll < 0.72 ? STAR_COLORS[0] : (colorRoll < 0.88 ? STAR_COLORS[1] : STAR_COLORS[2]);
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.4,
          base: Math.random() * 0.45 + 0.25,
          amp: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.0014 + 0.0004,
          phase: Math.random() * Math.PI * 2,
          color: color
        });
      }
    }

    function spawnShooter(){
      var startX = Math.random() * w * 0.7 + w * 0.15;
      var startY = Math.random() * h * 0.25;
      var angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // roughly diagonal
      var speed = 9 + Math.random() * 5;
      shooters.push({
        x: startX, y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 20,
        len: 70 + Math.random() * 50
      });
    }

    function drawStatic(){
      // No-motion fallback: draw once, no animation loop
      ctx.clearRect(0, 0, w, h);
      stars.forEach(function(s){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ',' + (s.base + s.amp * 0.4) + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function tick(t){
      ctx.clearRect(0, 0, w, h);

      stars.forEach(function(s){
        var alpha = s.base + Math.sin(t * s.speed + s.phase) * s.amp;
        if(alpha < 0) alpha = 0;
        if(alpha > 1) alpha = 1;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ',' + alpha.toFixed(3) + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // shooting stars
      if(t - lastShootTime > nextShootDelay){
        spawnShooter();
        lastShootTime = t;
        nextShootDelay = 5000 + Math.random() * 8000;
      }
      for(var i = shooters.length - 1; i >= 0; i--){
        var sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
        var progress = sh.life / sh.maxLife;
        var fade = progress < 0.15 ? (progress / 0.15) : (1 - (progress - 0.15) / 0.85);
        if(fade < 0) fade = 0;
        var tailX = sh.x - (sh.vx / Math.hypot(sh.vx, sh.vy)) * sh.len;
        var tailY = sh.y - (sh.vy / Math.hypot(sh.vx, sh.vy)) * sh.len;
        var grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, 'rgba(255,255,255,' + (0.85 * fade) + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if(sh.life >= sh.maxLife || sh.x > w + 100 || sh.y > h + 100){
          shooters.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    var resizeTimer = null;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        resize();
        if(reduceMotion) drawStatic();
      }, 200);
    });

    resize();
    if(reduceMotion){
      drawStatic();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    // Pause the animation loop when the tab isn't visible, to save battery/CPU.
    document.addEventListener('visibilitychange', function(){
      if(reduceMotion) return;
      if(document.hidden){
        if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
      } else if(!rafId){
        rafId = requestAnimationFrame(tick);
      }
    });
  })();

  /* ---------------- Nav scroll state + mobile toggle ---------------- */
  var nav = document.getElementById('nav');
  var onScroll = function(){
    if(window.scrollY > 12){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navToggleIcon = document.getElementById('navToggleIcon');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggleIcon.innerHTML = open
        ? '<use href="#icon-close"></use>'
        : '<use href="#icon-menu"></use>';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggleIcon.innerHTML = '<use href="#icon-menu"></use>';
      });
    });
  }

  /* ---------------- Profile picture (from js/profile-data.js) ---------------- */
  var navGlyph = document.getElementById('navGlyph');
  if(navGlyph && typeof PROFILE !== 'undefined' && PROFILE.image){
    var img = document.createElement('img');
    img.src = PROFILE.image;
    img.alt = 'Profile photo';
    img.onload = function(){
      navGlyph.textContent = '';
      navGlyph.appendChild(img);
      navGlyph.classList.add('has-photo');
    };
    img.onerror = function(){
      // image path broken — silently keep the initials fallback
    };
  }

  /* ---------------- Achievements (rendered from js/achievements-data.js) ---------------- */
  var achGrid = document.getElementById('achGrid');
  if(achGrid && typeof ACHIEVEMENTS !== 'undefined'){
    ACHIEVEMENTS.forEach(function(a){
      var card = document.createElement('div');
      card.className = 'ach-card reveal';

      var ico = document.createElement('div');
      ico.className = 'ach-ico';
      ico.innerHTML = '<svg><use href="#icon-' + (a.icon || 'award') + '"></use></svg>';
      card.appendChild(ico);

      var body = document.createElement('div');

      var h4 = document.createElement('h4');
      h4.textContent = a.title;
      body.appendChild(h4);

      var meta = document.createElement('span');
      meta.className = 'ach-meta';
      meta.textContent = a.issuer + (a.date ? ' · ' + a.date : '');
      body.appendChild(meta);

      if(a.cert || a.verify){
        var links = document.createElement('div');
        links.className = 'ach-links';

        if(a.cert){
          var viewBtn = document.createElement('button');
          viewBtn.type = 'button';
          viewBtn.innerHTML = 'View certificate <svg><use href="#icon-arrow"></use></svg>';
          viewBtn.addEventListener('click', function(){
            openLightbox(a.cert, a.title + ' — ' + a.issuer);
          });
          links.appendChild(viewBtn);
        }
        if(a.verify){
          var verifyLink = document.createElement('a');
          verifyLink.href = a.verify;
          verifyLink.target = '_blank';
          verifyLink.rel = 'noopener';
          verifyLink.innerHTML = 'Verify <svg><use href="#icon-arrow"></use></svg>';
          links.appendChild(verifyLink);
        }
        body.appendChild(links);
      }

      card.appendChild(body);
      achGrid.appendChild(card);
    });
  }

  /* ---------------- Certificate lightbox ---------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  function openLightbox(src, caption){
    if(!lightbox) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Certificate';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if(lastFocused){ lastFocused.focus(); }
  }
  if(lightbox){
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox){ closeLightbox(); }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && lightbox.classList.contains('open')){ closeLightbox(); }
    });
  }

  /* ---------------- Marquee content (tech stack ticker) ---------------- */
  var stack = [
    'Python', 'PyTorch', 'Transformers', 'NLLB-200', 'QLoRA', 'GRPO', 'RAG · ChromaDB',
    'Java', 'PHP', 'JavaScript', 'Django', 'MySQL', 'Docker', 'Git',
    'Luganda', 'Runyankole', 'Ateso', 'Acholi', 'Hugging Face', 'Scikit-learn'
  ];
  var track = document.getElementById('marqueeTrack');
  if(track){
    var buildSet = function(){
      var frag = document.createDocumentFragment();
      stack.forEach(function(item){
        var el = document.createElement('span');
        el.className = 'marquee-item';
        el.innerHTML = '<span>' + item + '</span><span class="sep">&#10022;</span>';
        frag.appendChild(el);
      });
      return frag;
    };
    // duplicate the set once so the -50% translateX loop is seamless
    track.appendChild(buildSet());
    track.appendChild(buildSet());
    if(reduceMotion){ track.style.animation = 'none'; }
  }

  /* ---------------- Hero console typewriter ---------------- */
  var consoleLines = [
    { t: 'prompt', v: '$ ' }, { t: 'cmd', v: 'python evaluate_sunflower.py --lang lug\n' },
    { t: 'out', v: '> executor: dispatching 250 test cases to live Sunflower endpoint...\n' },
    { t: 'out', v: '> scorer: llm-judge + structural checks + BLEU / chrF\n\n' },
    { t: 'key', v: '[nllb-200-distilled-600m]  ' }, { t: 'out', v: 'EN\u2192LUG  BLEU ' }, { t: 'ok', v: '17.84 \u2713\n' },
    { t: 'key', v: '[qwen2.5-1.5b + qlora]     ' }, { t: 'out', v: 'loss 2.6098 \u2192 1.4108  (250 steps)\n' },
    { t: 'key', v: '[entebbe-noise-dataset]    ' }, { t: 'out', v: '6,000 clips annotated\n' },
    { t: 'key', v: '[sahara-benchmark]         ' }, { t: 'out', v: 'sunflower-14B \u00b7 sunflower-9B ' }, { t: 'ok', v: 'evaluated \u2713\n\n' },
    { t: 'out', v: '> regression runner: 0 regressions found\n' },
    { t: 'ok', v: 'status: PASS' }, { t: 'out', v: ' \u2014 ready for release' }
  ];

  var body = document.getElementById('consoleBody');
  if(body){
    if(reduceMotion){
      var full = document.createElement('div');
      consoleLines.forEach(function(seg){
        var span = document.createElement('span');
        span.className = seg.t;
        span.textContent = seg.v;
        full.appendChild(span);
      });
      body.appendChild(full);
    } else {
      var container = document.createElement('div');
      body.appendChild(container);
      var li = 0, ci = 0, speed = 14;

      function typeNext(){
        if(li >= consoleLines.length){
          var cursor = document.createElement('span');
          cursor.className = 'cursor';
          container.appendChild(cursor);
          return;
        }
        var seg = consoleLines[li];
        if(ci === 0){
          var span = document.createElement('span');
          span.className = seg.t;
          container.appendChild(span);
        }
        var current = container.lastChild;
        if(ci < seg.v.length){
          current.textContent += seg.v[ci] === '\n' ? '\n' : seg.v[ci];
          ci++;
          setTimeout(typeNext, seg.v[ci-1] === ' ' ? 2 : speed);
        } else {
          li++; ci = 0;
          setTimeout(typeNext, 40);
        }
      }
      // start slightly after page paint so it feels intentional
      setTimeout(typeNext, 450);
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------- Project filter ---------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('#projectGrid .pcard');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(card){
        var show = (f === 'all' || card.getAttribute('data-cat') === f);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  /* ---------------- Copy email ---------------- */
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      if(navigator.clipboard){
        navigator.clipboard.writeText(text).then(function(){
          var original = btn.innerHTML;
          btn.innerHTML = '<svg><use href="#icon-check"></use></svg>';
          setTimeout(function(){ btn.innerHTML = original; }, 1600);
        });
      }
    });
  });

})();
