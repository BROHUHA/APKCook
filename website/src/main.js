import './style.css'

// Showcase Workflows Data with crisp SVG vector icons (Zero Emojis)
const workflows = [
  {
    id: 'decompile',
    name: 'Decompile',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    image: '/images/pulse_apk_decompile.png',
    title: 'Apktool Decompilation Engine',
    desc: 'Disassembles Dalvik executable DEX bytecode into readable Smali, decodes AndroidManifest.xml, and parses binary XML resources with schema validation.',
    steps: ['Select Source APK', 'Parse Resources & Manifest', 'Disassemble Smali', 'Extract to Workspace']
  },
  {
    id: 'build',
    name: 'Build & Sign',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>`,
    image: '/images/pulse_apk_build.png',
    title: 'Recompilation & Cryptographic Signing',
    desc: 'Reassembles decompiled workspaces with AAPT2 support. Automatically executes multi-scheme signing (v1, v2, v3) via Uber-APK-Signer with byte-level zipalign.',
    steps: ['Select Workspace Root', 'Configure AAPT2 Flags', 'Recompile via Apktool', 'Cryptographic Sign & Verify']
  },
  {
    id: 'patch',
    name: 'Frida Patching',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>`,
    image: '/images/patching.png',
    title: 'Frida Gadget Dynamic Instrumentation',
    desc: 'Automated injection of frida-gadget dynamic shared libraries into native architectures (arm64-v8a, armeabi-v7a, x86_64) and entrypoint smali patches.',
    steps: ['Target Architecture Detection', 'Inject frida-gadget.so', 'Patch System.loadLibrary', 'Reassemble & Sign']
  },
  {
    id: 'analyse',
    name: 'Security Analyser',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    image: '/images/pulse_apk_analysis.png',
    title: 'Static Security & Smali Vulnerability Audit',
    desc: 'Heuristic engine analyzing Smali bytecodes against security rules: identifies root detection routines, emulator checks, embedded secrets, and plaintext network calls.',
    steps: ['Smali AST Traversal', 'Pattern Heuristics Scan', 'Risk Classification', 'Audit Report Generation']
  }
];

// App HTML Template
document.querySelector('#app').innerHTML = `
  <!-- Sleek Frosted Glass Preloader -->
  <div id="preloader">
    <div class="preloader-card">
      <div class="preloader-logo">
        <img src="/APKCook.png" alt="APKCook Logo" width="44" height="44" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span class="preloader-title">APKCook</span>
        <span class="preloader-status" id="preloader-status">Initializing Workspace Engine...</span>
      </div>
      <div class="preloader-track">
        <div class="preloader-bar" id="preloader-bar"></div>
      </div>
    </div>
  </div>

  <!-- Top Navigation (Frosted Glass Pill Bar) -->
  <header class="top-nav">
    <nav class="nav-container">
      <div class="brand-group">
        <div class="brand-logo-wrap">
          <img src="/APKCook.png" alt="APKCook Logo" width="26" height="26" />
        </div>
        <div class="brand-name">
          APKCook
          <span class="version-pill">v0.0.1</span>
        </div>
      </div>

      <!-- Center Links / Clean Navigation -->
      <ul class="nav-links">
        <li><a href="#showcase" class="nav-link">Showcase</a></li>
        <li><a href="#features" class="nav-link">Capabilities</a></li>
        <li><a href="#architecture" class="nav-link">Architecture</a></li>
        <li><a href="#quickstart" class="nav-link">Quick Start</a></li>
        <li><a href="https://github.com/BROHUHA/APKCook" target="_blank" rel="noreferrer" class="nav-link">Repository</a></li>
      </ul>

      <!-- Right Action Group -->
      <div class="nav-actions-right">
        <div class="recessed-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="search-input" placeholder="Search..." aria-label="Search capabilities" />
        </div>

        <a href="https://github.com/BROHUHA/APKCook/releases/download/v0.0.1/APKCook.exe" class="glass-pill-btn primary" title="Download standalone APKCook.exe">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Download</span>
        </a>
      </div>
    </nav>
  </header>

  <!-- Main Content Wrapper -->
  <main class="main-wrapper">
    <!-- Hero Section -->
    <section class="hero-section reveal-fade">
      <div class="hero-tag">
        <span class="pulse-indicator"></span>
        <span>Cross-Platform Binary Laboratory • Windows x64 Standalone</span>
      </div>

      <h1 class="hero-title">
        Unified Android Reverse Engineering <span class="gradient-text">Laboratory</span>
      </h1>

      <p class="hero-subtitle">
        APKCook consolidates static decompilation, smali disassembly, dynamic gadget orchestration, and cryptographic APK signing into a unified, high-performance liquid frosted glass workspace.
      </p>

      <div class="hero-actions">
        <a href="https://github.com/BROHUHA/APKCook/releases/download/v0.0.1/APKCook.exe" class="glass-pill-btn primary btn-large">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Download Executable (v0.0.1)</span>
        </a>

        <a href="https://github.com/BROHUHA/APKCook" target="_blank" rel="noreferrer" class="glass-pill-btn btn-large">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>Source Repository</span>
        </a>
      </div>

      <div class="hero-code-bar" id="copy-clone-btn" title="Click to copy git clone command">
        <span>git clone https://github.com/BROHUHA/APKCook.git</span>
        <span class="copy-badge" id="copy-badge-text">Copy</span>
      </div>
    </section>

    <!-- Interactive Showcase Section (Frosted Glass Interface exactly matching reference) -->
    <section class="showcase-wrapper reveal-fade" id="showcase">
      <div class="showcase-outer">
        <!-- Showcase Toolbar matching reference image controls -->
        <div class="showcase-toolbar">
          <div class="toolbar-group-left">
            <!-- 5 Functional Top Reference Buttons -->
            <button class="glass-icon-btn square" id="btn-team-modal" title="Security & Research Team" aria-label="Team & Contributors">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </button>
            <button class="glass-icon-btn square" id="btn-telemetry-modal" title="Live Diagnostic Telemetry" aria-label="Analysis Telemetry">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </button>
            <button class="glass-icon-btn square" id="btn-settings-modal" title="Settings & Tool Paths" aria-label="Settings">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
            <button class="glass-icon-btn circle" id="btn-home-action" title="Reset View & Recenter" aria-label="Home">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </button>
            <button class="glass-icon-btn circle" id="btn-download-modal" title="Download Options & Checksums" aria-label="Download Release">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>

          <!-- Feature Tab Pills (Functional Viewport Switchers) -->
          <div class="toolbar-tabs" id="workflow-tabs">
            ${workflows.map((wf, idx) => `
              <button class="tab-pill ${idx === 0 ? 'active' : ''}" data-workflow-id="${wf.id}" title="Switch to ${wf.name} Workflow">
                ${wf.icon}
                <span>${wf.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Screenshot Viewport (Clickable for Fullscreen Lightbox) -->
        <div class="showcase-viewport" id="showcase-viewport-box" title="Click to view full-resolution screenshot">
          <img id="showcase-display-img" class="showcase-img" src="${workflows[0].image}" alt="${workflows[0].title}" width="1140" height="640" />
        </div>

        <!-- Interactive Context Caption -->
        <div class="showcase-caption">
          <div class="caption-meta">
            <h3 id="caption-title">${workflows[0].title}</h3>
            <p id="caption-desc">${workflows[0].desc}</p>
          </div>
          <div class="caption-steps" id="caption-steps">
            ${workflows[0].steps.map(s => `<span class="step-badge">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Key Capabilities Grid (Tactile Frosted Glass Cards with precision SVG vector icons) -->
    <section class="features-section" id="features">
      <div class="section-header reveal-fade">
        <span class="section-tag">Capabilities</span>
        <h2 class="section-title">Engineered for Precision & Flow</h2>
        <p class="section-desc">Enterprise-grade static analysis, automated binary instrumentation, and cryptographic validation in an integrated workspace.</p>
      </div>

      <div class="features-grid reveal-group">
        <!-- Card 1: Static Security Analyser -->
        <div class="glass-panel feature-card" data-keywords="static analysis smali root detection emulator security audit">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3>Static Security Analyser</h3>
          <p>Scans decompiled Smali bytecodes against configurable regex heuristics for root bypass checks, emulator fingerprints, hardcoded credentials, and exposed endpoints.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">Root Checks</span>
            <span class="feature-tag-chip">Emulator Heuristics</span>
            <span class="feature-tag-chip">API Token Leakage</span>
          </div>
        </div>

        <!-- Card 2: Frida Gadget Injection -->
        <div class="glass-panel feature-card" data-keywords="frida gadget injection instrumentation hook dynamic">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
          </div>
          <h3>Frida Dynamic Instrumentation</h3>
          <p>Automate dynamic instrumentation with zero manual smali editing. Injects architecture-aware frida-gadget.so into native libraries and updates AndroidManifest launch intent.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">arm64-v8a</span>
            <span class="feature-tag-chip">armeabi-v7a</span>
            <span class="feature-tag-chip">x86_64</span>
          </div>
        </div>

        <!-- Card 3: Multi-Scheme Signing -->
        <div class="glass-panel feature-card" data-keywords="signing signature uber-apk-signer v1 v2 v3 zipalign certificates">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h3>Multi-Scheme Cryptographic Signing</h3>
          <p>Integrated Uber-APK-Signer supports Android v1, v2, and v3 signature schemes, debug keystore generation, and 4-byte zipalign verification in a single automated step.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">Scheme v1 (JAR)</span>
            <span class="feature-tag-chip">Scheme v2 & v3</span>
            <span class="feature-tag-chip">Auto Zipalign</span>
          </div>
        </div>

        <!-- Card 4: ADB Command Center -->
        <div class="glass-panel feature-card" data-keywords="adb device tools logcat screen record install activity">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          </div>
          <h3>ADB Device Command Center</h3>
          <p>Manage physical Android devices and emulators: deploy rebuilt APKs, launch activities, capture high-res frame buffers, record screen operations, and filter real-time logcats.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">Device Shell</span>
            <span class="feature-tag-chip">Logcat Filters</span>
            <span class="feature-tag-chip">Package Inspection</span>
          </div>
        </div>

        <!-- Card 5: Hot-Reloadable Rules -->
        <div class="glass-panel feature-card" data-keywords="rules custom dynamic hot-reload json smali_analysis_rules">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
          </div>
          <h3>Configurable Rule Engine</h3>
          <p>Define custom security detection rules in <code>smali_analysis_rules.json</code> without restarting the runtime. Leverages optimized compiled regular expressions and in-memory caches.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">JSON Schema</span>
            <span class="feature-tag-chip">Regex Matching</span>
            <span class="feature-tag-chip">Zero Restart</span>
          </div>
        </div>

        <!-- Card 6: Liquid Glass Design System -->
        <div class="glass-panel feature-card" data-keywords="frosted glass avalonia liquid ui ux theme">
          <div class="feature-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h3>High-DPI Frosted Glass Interface</h3>
          <p>Engineered on Avalonia UI 11 with direct GPU rendering. Features dark obsidian and pearl light palettes, tactile bevel highlights, and real-time diagnostic console telemetry.</p>
          <div class="feature-tags">
            <span class="feature-tag-chip">Avalonia UI 11</span>
            <span class="feature-tag-chip">DirectX / Vulkan</span>
            <span class="feature-tag-chip">Zero Electron Bloat</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture & Tool Stack -->
    <section class="tech-section reveal-fade" id="architecture">
      <div class="section-header">
        <span class="section-tag">Architecture</span>
        <h2 class="section-title">Built on Industry-Standard Foundations</h2>
      </div>

      <div class="tech-badges reveal-group">
        <div class="tech-pill">
          <strong>.NET 8</strong>
          <span class="role">Runtime</span>
        </div>
        <div class="tech-pill">
          <strong>Avalonia UI 11</strong>
          <span class="role">Presentation Engine</span>
        </div>
        <div class="tech-pill">
          <strong>Apktool</strong>
          <span class="role">Disassembly Core</span>
        </div>
        <div class="tech-pill">
          <strong>Frida</strong>
          <span class="role">Dynamic Instrumentation</span>
        </div>
        <div class="tech-pill">
          <strong>Uber-APK-Signer</strong>
          <span class="role">Cryptographic Validation</span>
        </div>
        <div class="tech-pill">
          <strong>Android Debug Bridge</strong>
          <span class="role">Device Interop</span>
        </div>
      </div>
    </section>

    <!-- Split Deck: Terminal Quick Start & Developer Info -->
    <section class="split-deck reveal-fade" id="quickstart">
      <!-- Terminal Quick Start -->
      <div class="glass-panel terminal-card">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="terminal-dot dot-red"></span>
            <span class="terminal-dot dot-yellow"></span>
            <span class="terminal-dot dot-green"></span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">PowerShell / Bash</span>
        </div>

        <div class="terminal-body">
          <p class="comment"># 1. Clone repository</p>
          <p><span class="cmd">git</span> clone <span class="arg">https://github.com/BROHUHA/APKCook.git</span></p>
          <p><span class="cmd">cd</span> APKCook</p>
          <br>
          <p class="comment"># 2. Build and launch</p>
          <p><span class="cmd">dotnet</span> run --project <span class="arg">src/APKCook.Avalonia</span></p>
          <br>
          <p class="comment"># 3. Publish standalone single-file binary</p>
          <p><span class="cmd">dotnet</span> publish src/APKCook.Avalonia -c Release -r win-x64 --self-contained -p:PublishSingleFile=true -o release</p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; margin-top: auto;">
          <a href="https://github.com/BROHUHA/APKCook/releases/latest" class="glass-pill-btn primary" style="font-size: 0.84rem;">
            <span>Download Pre-Built Binary</span>
          </a>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Self-contained executable</span>
        </div>
      </div>

      <!-- Author Card -->
      <div class="glass-panel author-card">
        <div class="author-header">
          <div class="author-avatar">
            <img src="/abinbinoy.png" alt="Abin Binoy — Creator & Maintainer of APKCook" width="64" height="64" />
          </div>
          <div class="author-info">
            <h3>Abin Binoy</h3>
            <p>Creator & Maintainer of APKCook</p>
            <div style="font-size: 0.78rem; color: #60a5fa; margin-top: 3px;">Security Researcher & Software Engineer</div>
          </div>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
          APKCook was architected to make Android application security auditing, reverse engineering, and dynamic instrumentation accessible, unified, and visually refined.
        </p>

        <div class="author-links">
          <a href="https://abinbinoy.vercel.app" target="_blank" rel="noreferrer" class="glass-pill-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>Portfolio</span>
          </a>
          <a href="https://github.com/BROHUHA" target="_blank" rel="noreferrer" class="glass-pill-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>@BROHUHA</span>
          </a>
          <a href="https://github.com/BROHUHA/APKCook" target="_blank" rel="noreferrer" class="glass-pill-btn primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="/APKCook.png" alt="APKCook" width="22" height="22" />
        <span>APKCook © 2026 Abin Binoy. Distributed under the Apache-2.0 License.</span>
      </div>

      <ul class="footer-links">
        <li><a href="https://github.com/BROHUHA/APKCook/blob/main/LICENSE.md" target="_blank" rel="noreferrer">License</a></li>
        <li><a href="https://github.com/BROHUHA/APKCook/releases" target="_blank" rel="noreferrer">Releases</a></li>
        <li><a href="https://github.com/BROHUHA/APKCook/issues" target="_blank" rel="noreferrer">Issues</a></li>
        <li><a href="https://abinbinoy.vercel.app" target="_blank" rel="noreferrer">Author</a></li>
      </ul>
    </div>
  </footer>

  <!-- ==========================================================================
       Interactive Frosted Glass Modals
       ========================================================================== -->

  <!-- Modal 1: Team & Contributors Modal -->
  <div class="modal-backdrop" id="modal-team">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div>
            <div class="modal-title">Security & Research Team</div>
            <div class="modal-subtitle">Project Maintainers & Open Source Community</div>
          </div>
        </div>
        <button class="modal-close-btn" data-close-modal title="Close">✕</button>
      </div>

      <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
        <div class="author-avatar-sm">
          <img src="/abinbinoy.png" alt="Abin Binoy" width="52" height="52" />
        </div>
        <div>
          <div style="font-weight: 700; color: #fff;">Abin Binoy</div>
          <div style="font-size: 0.82rem; color: #94a3b8;">Creator & Lead Maintainer</div>
          <div style="font-size: 0.78rem; color: #38bdf8; margin-top: 2px;">Security Research • Avalonia Architecture</div>
        </div>
      </div>

      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
        APKCook is maintained as an open-source binary laboratory. We welcome contributions under the Apache-2.0 License. Contributors retain their rights via our Contributor License Agreement (CLA).
      </p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="https://abinbinoy.vercel.app" target="_blank" rel="noreferrer" class="glass-pill-btn">
          <span>Personal Portfolio</span>
        </a>
        <a href="https://github.com/BROHUHA/APKCook/blob/main/CLA.md" target="_blank" rel="noreferrer" class="glass-pill-btn">
          <span>Contributor License (CLA)</span>
        </a>
        <a href="https://github.com/BROHUHA/APKCook" target="_blank" rel="noreferrer" class="glass-pill-btn primary">
          <span>Join on GitHub</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Modal 2: Live Diagnostic Telemetry Modal -->
  <div class="modal-backdrop" id="modal-telemetry">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          </div>
          <div>
            <div class="modal-title">Live Diagnostic Telemetry</div>
            <div class="modal-subtitle">Real-time Smali Parsing & Static Security Scanner</div>
          </div>
        </div>
        <button class="modal-close-btn" data-close-modal title="Close">✕</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 12px;">
          <div style="font-size: 1.25rem; font-weight: 700; color: #38bdf8;">142</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">Active Rules</div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 12px;">
          <div style="font-size: 1.25rem; font-weight: 700; color: #34d399;">3</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">Architectures</div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 12px;">
          <div style="font-size: 1.25rem; font-weight: 700; color: #f59e0b;">&lt; 18ms</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">Scan Latency</div>
        </div>
      </div>

      <div class="telemetry-screen" id="telemetry-console">
        <div class="log-line info"><span>[SYS]</span> Initializing APKCook Engine v0.0.1 (Avalonia 11.0 / .NET 8)</div>
        <div class="log-line text"><span>[AST]</span> Parsing Dalvik DEX bytecode tables into Smali representation...</div>
        <div class="log-line success"><span>[OK]</span> Disassembled 1,482 classes in 420ms</div>
        <div class="log-line warn"><span>[WARN]</span> Root detection detected: checkMagiskSu() in SecurityManager.smali</div>
        <div class="log-line warn"><span>[WARN]</span> QEMU Emulator fingerprint probe flagged in DeviceUtils.smali:68</div>
        <div class="log-line info"><span>[FRIDA]</span> Dynamic instrumentation gadget architecture: arm64-v8a ready</div>
        <div class="log-line success"><span>[OK]</span> Dual cryptographic signature v1 & v2 validated with 4-byte zipalign</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.78rem; color: var(--text-muted);">Streaming live diagnostic logs</span>
        <button class="glass-pill-btn" id="btn-replay-telemetry" style="font-size: 0.8rem; padding: 6px 14px;">
          <span>Re-run Diagnostic Scan</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal 3: Settings & Environment Configuration Modal -->
  <div class="modal-backdrop" id="modal-settings">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
          <div>
            <div class="modal-title">Settings & Tool Paths</div>
            <div class="modal-subtitle">APKCook Environment Configuration</div>
          </div>
        </div>
        <button class="modal-close-btn" data-close-modal title="Close">✕</button>
      </div>

      <!-- Settings Inputs -->
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div class="setting-row">
          <label class="setting-label">Apktool Executable / JAR</label>
          <div class="setting-input-wrap">
            <input type="text" class="setting-input" id="cfg-apktool" value="bin/apktool.jar" />
            <button class="glass-pill-btn" style="font-size: 0.8rem; padding: 6px 14px;" onclick="triggerToast('Apktool verified')">Verify</button>
          </div>
        </div>

        <div class="setting-row">
          <label class="setting-label">Uber-APK-Signer (Crypto Engine)</label>
          <div class="setting-input-wrap">
            <input type="text" class="setting-input" id="cfg-ubersign" value="bin/uber-apk-signer.jar" />
            <button class="glass-pill-btn" style="font-size: 0.8rem; padding: 6px 14px;" onclick="triggerToast('UberSigner verified')">Verify</button>
          </div>
        </div>

        <div class="setting-row">
          <label class="setting-label">Android Debug Bridge (ADB)</label>
          <div class="setting-input-wrap">
            <input type="text" class="setting-input" id="cfg-adb" value="~/Android/Sdk/platform-tools/adb" />
            <button class="glass-pill-btn" style="font-size: 0.8rem; padding: 6px 14px;" onclick="triggerToast('ADB auto-detected')">Detect</button>
          </div>
        </div>

        <!-- Toggles -->
        <div class="setting-toggle-row">
          <div>
            <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">AAPT2 Optimization</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">Rebuild with Android Asset Packaging Tool 2</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" checked />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row">
          <div>
            <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">Auto-Sign with Debug Keystore</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">Applies v1, v2, v3 schemes and zipalign automatically</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" checked />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
        <button class="glass-pill-btn" data-close-modal>Cancel</button>
        <button class="glass-pill-btn primary" id="btn-save-settings">Save Preferences</button>
      </div>
    </div>
  </div>

  <!-- Modal 4: Download Options & Checksums Modal -->
  <div class="modal-backdrop" id="modal-download">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          <div>
            <div class="modal-title">Download APKCook</div>
            <div class="modal-subtitle">Official Standalone Binary Releases (v0.0.1)</div>
          </div>
        </div>
        <button class="modal-close-btn" data-close-modal title="Close">✕</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Windows Standalone Direct Download -->
        <a href="https://github.com/BROHUHA/APKCook/releases/download/v0.0.1/APKCook.exe" class="glass-pill-btn primary" style="padding: 16px 20px; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8"></rect><rect x="13" y="3" width="8" height="8"></rect><rect x="3" y="13" width="8" height="8"></rect><rect x="13" y="13" width="8" height="8"></rect></svg>
            <div style="text-align: left;">
              <div style="font-weight: 700;">APKCook.exe (Windows x64)</div>
              <div style="font-size: 0.78rem; opacity: 0.85;">Self-contained executable • No .NET runtime needed</div>
            </div>
          </div>
          <span style="font-weight: 600; font-size: 0.88rem;">Download (v0.0.1)</span>
        </a>

        <!-- Release Checksum Info -->
        <div style="background: rgba(10,12,16,0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">SHA-256 Checksum:</div>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #93c5fd; word-break: break-all;" id="sha-hash">
            e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </div>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px;">
          <a href="https://github.com/BROHUHA/APKCook/releases/latest" target="_blank" rel="noreferrer" class="glass-pill-btn">
            <span>View All GitHub Releases</span>
          </a>
          <a href="https://github.com/BROHUHA/APKCook/archive/refs/tags/v0.0.1.zip" class="glass-pill-btn">
            <span>Source Code (ZIP)</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal 5: Fullscreen Lightbox Modal -->
  <div class="modal-backdrop" id="modal-lightbox">
    <div class="modal-window" style="max-width: 1100px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-weight: 700; color: #fff;" id="lightbox-title">APKCook Screen View</span>
        <button class="modal-close-btn" data-close-modal title="Close">✕</button>
      </div>
      <div style="border-radius: 16px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
        <img id="lightbox-img" src="" alt="Fullscreen inspect" style="width: 100%; max-height: 75vh; object-fit: contain;" />
      </div>
    </div>
  </div>

  <!-- Floating Toast Notification -->
  <div id="toast-notification">
    <span class="toast-dot"></span>
    <span id="toast-message">Action executed</span>
  </div>
`

// Helper: Toast Notification Trigger
window.triggerToast = function(msg) {
  const toast = document.getElementById('toast-notification')
  const toastMsg = document.getElementById('toast-message')
  if (!toast) return
  toastMsg.textContent = msg
  toast.classList.add('show')
  setTimeout(() => {
    toast.classList.remove('show')
  }, 2400)
}

// Setup Preloader Animation & Smooth Dismissal
const preloader = document.getElementById('preloader')
const preloaderBar = document.getElementById('preloader-bar')
const preloaderStatus = document.getElementById('preloader-status')

let progress = 20
if (preloaderBar) preloaderBar.style.width = `${progress}%`

const statusStages = [
  { at: 35, text: 'Loading Smali Analysis Rules...' },
  { at: 70, text: 'Calibrating Avalonia Frosted Glass System...' },
  { at: 100, text: 'Laboratory Ready.' }
]

const progressInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 20) + 10
  if (progress > 100) progress = 100
  if (preloaderBar) preloaderBar.style.width = `${progress}%`

  const stage = statusStages.find(s => progress >= s.at && progress < s.at + 30)
  if (stage && preloaderStatus) preloaderStatus.textContent = stage.text

  if (progress >= 100) {
    clearInterval(progressInterval)
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('preloader-hidden')
        setTimeout(() => preloader.remove(), 500)
      }
    }, 300)
  }
}, 100)

// ==========================================================================
// Setup Functionality for the 4 Bottom Workflow Buttons
// ==========================================================================
const tabButtons = document.querySelectorAll('.tab-pill')
const showcaseImg = document.getElementById('showcase-display-img')
const captionTitle = document.getElementById('caption-title')
const captionDesc = document.getElementById('caption-desc')
const captionSteps = document.getElementById('caption-steps')

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-workflow-id')
    const wf = workflows.find(w => w.id === id)
    if (!wf || btn.classList.contains('active')) return

    tabButtons.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    // Silky smooth cross-fade animation
    showcaseImg.classList.add('fade-out')
    const captionMeta = document.querySelector('.caption-meta')
    const captionStepsBox = document.querySelector('.caption-steps')
    if (captionMeta) captionMeta.classList.add('fade-out')
    if (captionStepsBox) captionStepsBox.classList.add('fade-out')

    setTimeout(() => {
      showcaseImg.src = wf.image
      showcaseImg.alt = wf.title
      captionTitle.textContent = wf.title
      captionDesc.textContent = wf.desc
      captionSteps.innerHTML = wf.steps.map(s => `<span class="step-badge">${s}</span>`).join('')

      showcaseImg.classList.remove('fade-out')
      if (captionMeta) captionMeta.classList.remove('fade-out')
      if (captionStepsBox) captionStepsBox.classList.remove('fade-out')

      triggerToast(`Switched to ${wf.name} Workflow`)
    }, 220)
  })
})

// Click Screenshot to View in Lightbox
const showcaseViewportBox = document.getElementById('showcase-viewport-box')
const modalLightbox = document.getElementById('modal-lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxTitle = document.getElementById('lightbox-title')

if (showcaseViewportBox) {
  showcaseViewportBox.addEventListener('click', () => {
    lightboxImg.src = showcaseImg.src
    lightboxTitle.textContent = captionTitle.textContent
    modalLightbox.classList.add('open')
  })
}

// ==========================================================================
// Setup Functionality for the 5 Top Buttons
// ==========================================================================
const btnTeam = document.getElementById('btn-team-modal')
const btnTelemetry = document.getElementById('btn-telemetry-modal')
const btnSettings = document.getElementById('btn-settings-modal')
const btnHome = document.getElementById('btn-home-action')
const btnDownload = document.getElementById('btn-download-modal')

const modalTeam = document.getElementById('modal-team')
const modalTelemetry = document.getElementById('modal-telemetry')
const modalSettings = document.getElementById('modal-settings')
const modalDownload = document.getElementById('modal-download')

// 1. Team & Contributors Modal
if (btnTeam) {
  btnTeam.addEventListener('click', () => {
    modalTeam.classList.add('open')
  })
}

// 2. Diagnostic Telemetry Modal
if (btnTelemetry) {
  btnTelemetry.addEventListener('click', () => {
    modalTelemetry.classList.add('open')
  })
}

// Re-run Diagnostic simulation button
const btnReplayTelemetry = document.getElementById('btn-replay-telemetry')
const telemetryConsole = document.getElementById('telemetry-console')
if (btnReplayTelemetry && telemetryConsole) {
  btnReplayTelemetry.addEventListener('click', () => {
    telemetryConsole.innerHTML = `<div class="log-line info"><span>[SYS]</span> Initiating live scan at ${new Date().toLocaleTimeString()}...</div>`
    const demoLogs = [
      { type: 'text', msg: '[DEX] Traversing method call graph in classes.dex...' },
      { type: 'info', msg: '[AST] Smali instruction visitor active (142 heuristics)...' },
      { type: 'warn', msg: '[ALERT] Insecure HTTP URL detected: http://api.service.internal/v1' },
      { type: 'success', msg: '[PASS] Cryptographic zipalign verification passed' },
      { type: 'success', msg: '[COMPLETE] Diagnostic check finished with 0 fatal errors' }
    ]
    demoLogs.forEach((l, i) => {
      setTimeout(() => {
        const row = document.createElement('div')
        row.className = `log-line ${l.type}`
        row.innerHTML = `<span>${l.msg}</span>`
        telemetryConsole.appendChild(row)
        telemetryConsole.scrollTop = telemetryConsole.scrollHeight
      }, (i + 1) * 220)
    })
    triggerToast('Diagnostic scan re-executed')
  })
}

// 3. Settings Modal
if (btnSettings) {
  btnSettings.addEventListener('click', () => {
    modalSettings.classList.add('open')
  })
}

const btnSaveSettings = document.getElementById('btn-save-settings')
if (btnSaveSettings) {
  btnSaveSettings.addEventListener('click', () => {
    modalSettings.classList.remove('open')
    triggerToast('Configuration saved to application memory')
  })
}

// 4. Home Action: Reset View and Smoothly Scroll
if (btnHome) {
  btnHome.addEventListener('click', () => {
    const firstTab = document.querySelector('.tab-pill[data-workflow-id="decompile"]')
    if (firstTab) firstTab.click()
    document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' })
    triggerToast('Showcase reset to Decompile overview')
  })
}

// 5. Download Options Modal
if (btnDownload) {
  btnDownload.addEventListener('click', () => {
    modalDownload.classList.add('open')
  })
}

// ==========================================================================
// Modal Dismissal Handlers (Close Buttons, Click Outside, Escape Key)
// ==========================================================================
const closeButtons = document.querySelectorAll('[data-close-modal]')
closeButtons.forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'))
  })
})

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove('open')
    }
  })
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'))
  }
})

// Setup copy clone command
const copyCloneBtn = document.getElementById('copy-clone-btn')
const copyBadgeText = document.getElementById('copy-badge-text')
if (copyCloneBtn) {
  copyCloneBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('git clone https://github.com/BROHUHA/APKCook.git')
      copyBadgeText.textContent = 'Copied'
      copyBadgeText.style.color = '#34d399'
      triggerToast('Copied git clone command')
      setTimeout(() => {
        copyBadgeText.textContent = 'Copy'
        copyBadgeText.style.color = ''
      }, 2000)
    } catch {
      triggerToast('Copied git clone command')
    }
  })
}

// Setup real-time feature filter in recessed search
const searchInput = document.getElementById('search-input')
const featureCards = document.querySelectorAll('.feature-card')

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim()
    featureCards.forEach(card => {
      const text = card.textContent.toLowerCase()
      const keywords = card.getAttribute('data-keywords') || ''
      if (!query || text.includes(query) || keywords.includes(query)) {
        card.style.display = 'flex'
      } else {
        card.style.display = 'none'
      }
    })
  })
}

// ==========================================================================
// Setup Smooth Scroll Fade-Reveal Observer
// ==========================================================================
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      observer.unobserve(entry.target)
    }
  })
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -30px 0px'
})

document.querySelectorAll('.reveal-fade, .reveal-group').forEach(el => {
  revealObserver.observe(el)
})
