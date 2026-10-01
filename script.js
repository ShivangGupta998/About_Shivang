(() => {
  document.documentElement.classList.add('js-enabled');
  const canvas = document.getElementById('accretion-canvas');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const cursorGlow = document.querySelector('.cursor-glow');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const roles = ['Cloud', 'DevOps', 'Security', 'Pre-sales'];
  const roleNode = document.getElementById('rotating-word');
  const state = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5, hover: false, progress: 0 };

  document.getElementById('year').textContent = String(new Date().getFullYear());

  if (!reducedMotion) {
    let roleIndex = 0;
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleNode.classList.add('changing');
      window.setTimeout(() => {
        roleNode.textContent = roles[roleIndex];
        roleNode.classList.remove('changing');
      }, 140);
    }, 2000);
  }

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('open', !isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navLinks.classList.remove('open');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navItems = [...navLinks.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-24% 0px -64% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${(index % 4) * 65}ms`;
    revealObserver.observe(element);
  });

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
    document.getElementById('form-status').textContent = 'Opening your email app…';
    window.location.href = `mailto:shivanggupta998@gmail.com?subject=${subject}&body=${body}`;
  });

  if (!touchDevice) {
    window.addEventListener('pointermove', (event) => {
      state.x = event.clientX / window.innerWidth;
      state.y = event.clientY / window.innerHeight;
      state.hover = Boolean(event.target.closest('[data-hero]'));
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      cursorGlow.classList.add('visible');
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursorGlow.classList.remove('visible'));
  }

  function setupBackground() {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) {
      canvas.classList.add('no-webgl');
      return null;
    }

    const vertexSource = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_time;
      uniform float u_progress;
      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        p -= (u_pointer - 0.5) * 0.055;
        float r = max(length(p), 0.001);
        float angle = atan(p.y, p.x);
        float time = u_time * (0.42 + u_progress * 0.5);
        float inner = 0.092 + u_progress * 0.014;
        float outer = 0.56 - u_progress * 0.035;
        float ringRadius = length(vec2(p.x, p.y * 2.4));
        float band = exp(-pow((ringRadius - 0.29) / 0.074, 2.0));
        float spiral = 0.5 + 0.5 * cos(angle * 3.0 - log(r) * 5.8 - time);
        float turbulence = 0.76 + 0.24 * sin(angle * 9.0 + r * 26.0 - time * 1.7);
        float disc = band * (0.23 + 0.77 * pow(spiral, 3.0)) * turbulence;
        disc *= 1.0 - smoothstep(outer - 0.035, outer + 0.025, ringRadius);
        float halo = exp(-max(r - inner, 0.0) * 5.6) * (1.0 - smoothstep(inner, inner + 0.18, r));
        float rim = exp(-pow((r - inner) / 0.016, 2.0));
        float jets = exp(-pow(p.x / 0.023, 2.0)) * smoothstep(0.08, 0.38, abs(p.y)) * exp(-abs(p.y) * 3.8);
        jets *= 0.16 + 0.84 * (0.5 + 0.5 * sin(p.y * 25.0 - time * 1.5));
        float brightness = clamp(disc * 1.45 + halo * 0.12 + rim * 0.26 + jets * 0.35, 0.0, 1.0);
        vec3 orange = vec3(1.0, 0.19, 0.0);
        vec3 gold = vec3(1.0, 0.84, 0.62);
        vec3 color = mix(orange, gold, clamp(0.22 + spiral * 0.58 + rim * 0.15, 0.0, 1.0));
        color *= brightness;
        float eventHorizon = 1.0 - smoothstep(inner - 0.012, inner + 0.012, r);
        color *= 1.0 - eventHorizon;
        float vignette = 1.0 - smoothstep(0.35, 1.0, r) * 0.42;
        vec3 background = vec3(0.012, 0.012, 0.013);
        gl_FragColor = vec4(background + color * vignette, 1.0);
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      canvas.classList.add('no-webgl');
      return null;
    }

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      canvas.classList.add('no-webgl');
      return null;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return null;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, 'a_position');
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      time: gl.getUniformLocation(program, 'u_time'),
      progress: gl.getUniformLocation(program, 'u_progress'),
    };
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, touchDevice ? 1.5 : 1.5);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    let frame = 0;
    let startTime = performance.now();
    let active = !document.hidden;
    const draw = (now) => {
      if (!active || document.hidden) return;
      const elapsed = reducedMotion ? (now - startTime) * 0.00008 : (now - startTime) * (state.hover ? 0.00055 : 0.0004);
      state.smoothX += (state.x - state.smoothX) * 0.045;
      state.smoothY += (state.y - state.smoothY) * 0.045;
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, touchDevice ? 0.5 : state.smoothX, touchDevice ? 0.5 : state.smoothY);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform1f(uniforms.progress, state.progress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (active) return;
      active = true;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(frame);
    };
    const visibilityChange = () => document.hidden ? stop() : start();
    const contextLost = (event) => {
      event.preventDefault();
      stop();
      canvas.classList.add('no-webgl');
    };
    const contextRestored = () => window.location.reload();

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);
    canvas.addEventListener('webglcontextlost', contextLost, false);
    canvas.addEventListener('webglcontextrestored', contextRestored, false);
    if (!reducedMotion) frame = requestAnimationFrame(draw);
    else draw(performance.now());

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibilityChange);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }

  const background = setupBackground();
  const updateScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    state.progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  window.addEventListener('pagehide', () => {
    window.removeEventListener('scroll', updateScroll);
    background?.();
  }, { once: true });
})();
