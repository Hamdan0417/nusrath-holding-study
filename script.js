/* ============================================
   NUSRATH HOLDING — INTERACTIVE SCRIPT v3.0
   Premium UX with full bilingual support
   - Language toggle (AR/EN) with full DOM verification
   - Universal inline editing
   - Notes/annotations system
   - Search across all pages
   - Dark mode toggle
   - Reading progress bar
   - Auto Table of Contents
   - Back-to-top button
   - Theme color picker
   - Mobile-friendly menu
   - Export/Import all data
   ============================================ */

(function() {
  'use strict';

  // ============ STATE ============
  const STATE = {
    editMode: false,
    notesVisible: false,
    tocVisible: false,
    themeOpen: false,
    currentLang: 'ar',
    currentTheme: 'gold',
    darkMode: false
  };

  // ============ SITE-WIDE PAGES INDEX (for search) ============
  const SITE_PAGES = [
    { url: 'index.html', titleAr: 'الرئيسية — الدراسة الشاملة', titleEn: 'Home — Comprehensive Study', keys: ['نصرت', 'قابضة', 'holding', 'home', 'main'] },
    { url: 'holding.html', titleAr: 'نصرت القابضة (SJSC)', titleEn: 'Nusrath Holding (SJSC)', keys: ['holding', 'sjsc', 'قابضة'] },
    { url: 'hacfi.html', titleAr: 'HACFI — منصة الصناعة', titleEn: 'HACFI — Industrial Platform', keys: ['hacfi', 'industry', 'صناعة', 'akmal'] },
    { url: 'aret.html', titleAr: 'Art Craft — النجارة', titleEn: 'Art Craft — Carpentry', keys: ['art', 'craft', 'metallica', 'aman', 'نجارة'] },
    { url: 'superstruct.html', titleAr: 'Superstruct — المقاولات', titleEn: 'Superstruct — Contracting', keys: ['superstruct', 'contracting', 'مقاولات'] },
    { url: 'mqsala.html', titleAr: 'mQsala — التقنية والريادة', titleEn: 'mQsala — Tech & Ventures', keys: ['mqsala', 'tech', 'masarath', 'مغسلة'] },
    { url: 'shared-management.html', titleAr: 'الإدارة المشتركة', titleEn: 'Shared Management', keys: ['shared', 'management', 'إدارة مشتركة'] },
    { url: 'matrices.html', titleAr: 'الصلاحيات والتواقيع', titleEn: 'Authority & Signatures Matrices', keys: ['matrices', 'authority', 'doa', 'صلاحيات'] },
    { url: 'dual-roles.html', titleAr: 'الأدوار المزدوجة', titleEn: 'Dual Roles', keys: ['dual', 'roles', 'أدوار مزدوجة'] },
    { url: 'cr-registry.html', titleAr: 'السجلات التجارية', titleEn: 'Commercial Registers', keys: ['cr', 'registry', 'سجلات'] },
    { url: 'comparison.html', titleAr: 'مقارنة أشكال الشركات', titleEn: 'Entity Forms Comparison', keys: ['comparison', 'sjsc', 'llc', 'jsc', 'مقارنة'] },
    { url: 'split-plan.html', titleAr: 'خطة فصل HACFI', titleEn: 'HACFI Split Plan', keys: ['split', 'plan', 'فصل', 'hacfi', 'art craft'] },
    { url: 'implementation.html', titleAr: 'خطة التنفيذ', titleEn: 'Implementation Plan', keys: ['implementation', 'phases', 'تنفيذ'] },
    { url: 'documents.html', titleAr: 'فهرس الوثائق (40)', titleEn: 'Documents Index (40)', keys: ['documents', 'وثائق'] },
    { url: 'checklist.html', titleAr: 'القائمة التنفيذية', titleEn: 'Executive Checklist', keys: ['checklist', 'قائمة'] },
    { url: 'infographics.html', titleAr: 'الانفوجرافيك (16)', titleEn: 'Infographics (16)', keys: ['infographics', 'visuals', 'انفوجرافيك'] },
    { url: 'doc-01-aoa.html', titleAr: 'النظام الأساس للقابضة', titleEn: 'Holding Articles of Association', keys: ['aoa', 'articles', 'نظام أساس'] },
    { url: 'doc-02-founder.html', titleAr: 'قرار المؤسس', titleEn: 'Founder Resolution', keys: ['founder', 'resolution', 'قرار مؤسس'] },
    { url: 'doc-05-transfer.html', titleAr: 'اتفاقية نقل الحصص', titleEn: 'Share Transfer Agreement', keys: ['transfer', 'shares', 'نقل حصص'] },
    { url: 'doc-08-structure.html', titleAr: 'مذكرة هيكل الملكية', titleEn: 'Ownership Structure Memo', keys: ['structure', 'ownership', 'هيكل ملكية'] },
    { url: 'doc-09-governance.html', titleAr: 'لائحة الحوكمة', titleEn: 'Governance Charter', keys: ['governance', 'charter', 'حوكمة'] },
    { url: 'doc-asset-transfer.html', titleAr: 'اتفاقية نقل الأصول', titleEn: 'Asset Transfer Agreement', keys: ['asset', 'transfer', 'أصول'] },
    { url: 'doc-mutual-supply.html', titleAr: 'اتفاقية التوريد المتبادل', titleEn: 'Mutual Supply Agreement', keys: ['mutual', 'supply', 'توريد'] },
    { url: 'doc-mqsala-sha.html', titleAr: 'عقد شركاء mQsala (SHA)', titleEn: 'mQsala Shareholders Agreement', keys: ['sha', 'mqsala', 'partners', 'شركاء'] },
    { url: 'doc-board-charter.html', titleAr: 'ميثاق المجلس + اللجان', titleEn: 'Board Charter + Committees', keys: ['board', 'charter', 'committees', 'ميثاق'] },
    { url: 'doc-shared-services.html', titleAr: 'اتفاقية الخدمات المشتركة', titleEn: 'Shared Services Agreement', keys: ['shared', 'services', 'خدمات'] },
    { url: 'doc-job-descriptions.html', titleAr: 'الأوصاف الوظيفية', titleEn: 'Job Descriptions', keys: ['jd', 'jobs', 'أوصاف'] },
    { url: 'doc-related-party.html', titleAr: 'سياسة الأطراف ذات العلاقة', titleEn: 'Related Party Policy', keys: ['related', 'party', 'أطراف'] },
    { url: 'doc-signature.html', titleAr: 'سياسة التوقيع والتفويض', titleEn: 'Signature & Authorization Policy', keys: ['signature', 'توقيع'] },
    { url: 'comments.html', titleAr: 'كلمات الفريق', titleEn: 'Voices from the Team', keys: ['voices', 'comments', 'testimonials', 'كلمات', 'تعليقات'] },
    { url: 'journey.html', titleAr: 'خاطرة الطريق', titleEn: 'The Journey — Reflection', keys: ['journey', 'reflection', 'خاطرة', 'طريق', 'ختامية'] },
    { url: 'doc-coi.html', titleAr: 'سياسة تعارض المصالح', titleEn: 'Conflict of Interest Policy', keys: ['coi', 'conflict', 'تعارض'] }
  ];

  // ============ LANGUAGE ============
  function toggleLanguage() {
    const body = document.body;
    const html = document.documentElement;
    const newDir = body.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    const newLang = newDir === 'rtl' ? 'ar' : 'en';

    body.setAttribute('dir', newDir);
    html.setAttribute('dir', newDir);
    html.setAttribute('lang', newLang);
    STATE.currentLang = newLang;
    localStorage.setItem('siteLang', newLang);

    // Verify all .lang-ar and .lang-en elements toggle properly
    setTimeout(() => verifyLanguageDisplay(), 50);
    if (typeof showLanguageBadge === 'function') showLanguageBadge();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function verifyLanguageDisplay() {
    // Defensive: ensure every .lang-ar/.lang-en pair toggles cleanly
    const isRtl = document.body.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.lang-ar').forEach(el => {
      el.style.display = isRtl ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(el => {
      el.style.display = isRtl ? 'none' : '';
    });
    // Restore CSS-driven display for inline spans (let stylesheet take over after frame)
    requestAnimationFrame(() => {
      document.querySelectorAll('.lang-ar, .lang-en').forEach(el => { el.style.removeProperty('display'); });
    });
    return true;
  }

  function applyLanguageOnLoad() {
    const saved = localStorage.getItem('siteLang');
    if (saved === 'en') {
      document.body.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      STATE.currentLang = 'en';
    } else {
      STATE.currentLang = 'ar';
    }
  }

  // ============ EDIT MODE ============
  function toggleEditMode() {
    STATE.editMode = !STATE.editMode;
    document.body.classList.toggle('edit-mode', STATE.editMode);

    const btn = document.getElementById('edit-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', STATE.editMode);
      const label = btn.querySelector('.edit-label');
      if (label) {
        label.innerHTML = STATE.editMode
          ? '<span class="lang-ar">✓ تعديل نشط</span><span class="lang-en">✓ Editing Active</span>'
          : '<span class="lang-ar">✏️ تفعيل التعديل</span><span class="lang-en">✏️ Enable Editing</span>';
      }
    }

    // Toggle edit panel
    const panel = document.getElementById('edit-panel');
    if (panel) panel.classList.toggle('show', STATE.editMode);

    // Make all editable + headings + paragraphs editable in edit mode
    const editables = document.querySelectorAll('.editable, .placeholder, [data-editable]');
    editables.forEach(el => {
      el.setAttribute('contenteditable', STATE.editMode ? 'true' : 'false');
      if (STATE.editMode && !el.dataset.originalText) {
        el.dataset.originalText = el.textContent;
      }
    });

    // Optionally make all headings and key text editable
    if (STATE.editMode) {
      enableUniversalEditing();
    } else {
      disableUniversalEditing();
    }

    localStorage.setItem('editMode', STATE.editMode ? 'on' : 'off');
  }

  function enableUniversalEditing() {
    // Make all text-bearing elements editable when clicked
    const targets = document.querySelectorAll(
      '.section h2, .section h3, .section h4, .section p, .section li, ' +
      '.card h4, .card p, .landing-card h3, .landing-card .desc, ' +
      'td, th, .stat-box .num, .stat-box .label, ' +
      '.callout strong, .timeline-item h4, .pill, .tag'
    );
    targets.forEach(el => {
      // Skip if already has special editable handler
      if (el.classList.contains('editable') || el.classList.contains('placeholder')) return;
      // Skip if contains nested lang spans (handle as whole block instead)
      el.setAttribute('data-edit-on-click', 'true');
      el.style.cursor = 'text';
      // Generate ID
      if (!el.id) el.id = 'auto-edit-' + hashText(el.textContent.substring(0, 50));
      // Restore saved
      const saved = localStorage.getItem('edit-' + el.id);
      if (saved !== null && saved !== el.textContent) el.innerHTML = saved;
    });
    document.addEventListener('click', handleEditClick, true);
  }

  function disableUniversalEditing() {
    document.removeEventListener('click', handleEditClick, true);
    document.querySelectorAll('[data-edit-on-click]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.style.cursor = '';
    });
  }

  function handleEditClick(e) {
    if (!STATE.editMode) return;
    let el = e.target;
    // Walk up to nearest editable element
    while (el && !el.hasAttribute('data-edit-on-click') && !el.classList.contains('editable') && !el.classList.contains('placeholder')) {
      el = el.parentElement;
    }
    if (!el || el.contentEditable === 'true') return;
    if (el.tagName === 'A' || el.closest('.topnav') || el.closest('.toolbar') || el.closest('.edit-panel')) return;
    el.setAttribute('contenteditable', 'true');
    el.focus();
    e.preventDefault();
  }

  function setupInlineEditing() {
    const editables = document.querySelectorAll('.editable, .placeholder');
    editables.forEach(el => {
      if (!el.id) {
        el.id = 'edit-' + hashText(el.textContent + el.parentElement?.tagName + Array.from(el.parentElement?.children || []).indexOf(el));
      }
      const saved = localStorage.getItem('edit-' + el.id);
      if (saved !== null && saved !== el.textContent) el.innerHTML = saved;
    });

    // Universal blur handler
    document.addEventListener('blur', function(e) {
      const el = e.target;
      if (el.contentEditable === 'true' && STATE.editMode) {
        const value = el.innerHTML.trim();
        if (!el.id) el.id = 'auto-edit-' + hashText(el.textContent.substring(0, 50));
        localStorage.setItem('edit-' + el.id, value);
        flashSaved(el);
        el.removeAttribute('contenteditable');
      }
    }, true);

    document.addEventListener('keydown', function(e) {
      const el = e.target;
      if (el.contentEditable !== 'true') return;
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
      if (e.key === 'Escape') {
        if (el.dataset.originalText) el.textContent = el.dataset.originalText;
        el.blur();
      }
    });
  }

  function flashSaved(el) {
    el.classList.add('saved-flash');
    setTimeout(() => el.classList.remove('saved-flash'), 800);
  }

  function hashText(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  // ============ NOTES SYSTEM ============
  function setupNotesSystem() {
    const containers = document.querySelectorAll('.section, .timeline-item, .card');
    containers.forEach((el, i) => {
      if (el.querySelector('.note-marker')) return;
      const id = 'note-' + (window.location.pathname + '-' + i);
      const marker = document.createElement('button');
      marker.className = 'note-marker';
      marker.title = 'إضافة ملاحظة / Add note';
      marker.innerHTML = '📝';
      marker.dataset.noteId = id;

      const saved = localStorage.getItem(id);
      if (saved && saved.trim()) marker.classList.add('has-note');

      marker.onclick = function(e) {
        e.stopPropagation();
        toggleNotePopup(el, id, marker);
      };
      el.appendChild(marker);
    });
  }

  function toggleNotePopup(container, noteId, marker) {
    // Close any open popups
    document.querySelectorAll('.note-popup.show').forEach(p => p.remove());
    const existing = container.querySelector('.note-popup');
    if (existing) { existing.remove(); return; }

    const popup = document.createElement('div');
    popup.className = 'note-popup show';
    const saved = localStorage.getItem(noteId) || '';
    popup.innerHTML = `
      <textarea placeholder="اكتب ملاحظتك هنا... / Write your note here...">${saved}</textarea>
      <div class="note-actions">
        <button class="save">💾 ${STATE.currentLang === 'ar' ? 'حفظ' : 'Save'}</button>
        <button class="delete">🗑️ ${STATE.currentLang === 'ar' ? 'حذف' : 'Delete'}</button>
        <button class="cancel">✕</button>
      </div>
    `;
    container.appendChild(popup);
    const ta = popup.querySelector('textarea');
    ta.focus();

    popup.querySelector('.save').onclick = function() {
      localStorage.setItem(noteId, ta.value);
      if (ta.value.trim()) marker.classList.add('has-note');
      else marker.classList.remove('has-note');
      popup.remove();
    };
    popup.querySelector('.delete').onclick = function() {
      localStorage.removeItem(noteId);
      marker.classList.remove('has-note');
      popup.remove();
    };
    popup.querySelector('.cancel').onclick = function() { popup.remove(); };
  }

  // ============ SEARCH ============
  function setupSearch() {
    if (document.querySelector('.search-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <button class="search-close" onclick="window.toggleSearch()">✕</button>
      <div class="search-box">
        <input type="text" id="search-input" placeholder="${STATE.currentLang === 'ar' ? '🔍 ابحث في الموقع... (40+ صفحة ووثيقة)' : '🔍 Search the site... (40+ pages and docs)'}" autocomplete="off">
        <div class="search-results" id="search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    function doSearch(q) {
      q = q.trim().toLowerCase();
      if (!q) {
        results.innerHTML = `<div class="search-empty">${STATE.currentLang === 'ar' ? 'ابدأ الكتابة للبحث' : 'Start typing to search'}</div>`;
        return;
      }
      const matches = SITE_PAGES.filter(p =>
        p.titleAr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.url.toLowerCase().includes(q) ||
        p.keys.some(k => k.toLowerCase().includes(q))
      );
      if (matches.length === 0) {
        results.innerHTML = `<div class="search-empty">${STATE.currentLang === 'ar' ? '❌ لا نتائج' : '❌ No results'}</div>`;
        return;
      }
      results.innerHTML = matches.map(p => `
        <a class="search-result" href="${p.url}">
          <strong>${STATE.currentLang === 'ar' ? p.titleAr : p.titleEn}</strong>
          <span class="url">${p.url}</span>
        </a>
      `).join('');
    }

    input.addEventListener('input', e => doSearch(e.target.value));
    overlay.addEventListener('click', e => {
      if (e.target === overlay) toggleSearch();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) toggleSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    });
  }

  function toggleSearch() {
    const overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  }

  // ============ DARK MODE ============
  function toggleDarkMode() {
    STATE.darkMode = !STATE.darkMode;
    document.body.classList.toggle('dark-mode', STATE.darkMode);
    localStorage.setItem('darkMode', STATE.darkMode ? 'on' : 'off');
    const btn = document.getElementById('dark-mode-btn');
    if (btn) btn.innerHTML = STATE.darkMode ? '☀️' : '🌙';
  }

  function applyDarkModeOnLoad() {
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.classList.add('dark-mode');
      STATE.darkMode = true;
    }
  }

  // ============ READING PROGRESS ============
  function setupReadingProgress() {
    if (document.querySelector('.read-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'read-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = pct + '%';
    });
  }

  // ============ BACK TO TOP ============
  function setupBackToTop() {
    if (document.querySelector('.back-to-top')) return;
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.title = STATE.currentLang === 'ar' ? 'العودة للأعلى' : 'Back to top';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    });
  }

  // ============ TABLE OF CONTENTS ============
  function setupTOC() {
    const headings = document.querySelectorAll('.section h2, .section h3');
    if (headings.length < 3) return;
    if (document.querySelector('.toc')) return;

    const toc = document.createElement('div');
    toc.className = 'toc';
    let html = '<h5>📑 ' + (STATE.currentLang === 'ar' ? 'محتويات الصفحة' : 'Page Contents') + '</h5>';
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + i;
      const text = h.textContent.trim().substring(0, 50);
      const indent = h.tagName === 'H3' ? 'padding-inline-start:18px; font-size:12px;' : '';
      html += `<a href="#${h.id}" style="${indent}">${text}</a>`;
    });
    toc.innerHTML = html;
    document.body.appendChild(toc);
  }

  function toggleTOC() {
    const toc = document.querySelector('.toc');
    if (toc) toc.classList.toggle('show');
  }

  // ============ THEME PICKER ============
  function setupThemePicker() {
    if (document.querySelector('.theme-picker')) return;
    const picker = document.createElement('div');
    picker.className = 'theme-picker';
    picker.innerHTML = `
      <div class="theme-color gold active" data-theme="gold" title="Royal Gold"></div>
      <div class="theme-color blue" data-theme="blue" title="Corporate Blue"></div>
      <div class="theme-color emerald" data-theme="emerald" title="Emerald"></div>
      <div class="theme-color burgundy" data-theme="burgundy" title="Burgundy"></div>
      <div class="theme-color platinum" data-theme="platinum" title="Platinum"></div>
    `;
    document.body.appendChild(picker);
    picker.querySelectorAll('.theme-color').forEach(c => {
      c.onclick = function() {
        applyTheme(c.dataset.theme);
        picker.querySelectorAll('.theme-color').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
      };
    });
    // Apply saved theme
    const saved = localStorage.getItem('theme') || 'gold';
    applyTheme(saved);
    picker.querySelectorAll('.theme-color').forEach(x => x.classList.toggle('active', x.dataset.theme === saved));
  }

  function applyTheme(theme) {
    const themes = {
      gold: { secondary: '#c9a961', secondaryDark: '#a88d4d', secondaryLight: '#e0c788', secondaryPale: '#f8f1dd' },
      blue: { secondary: '#3968b5', secondaryDark: '#1e4789', secondaryLight: '#7da8d8', secondaryPale: '#e3eef8' },
      emerald: { secondary: '#2d8055', secondaryDark: '#1e5e3f', secondaryLight: '#5fb286', secondaryPale: '#e0f0e6' },
      burgundy: { secondary: '#b52e3d', secondaryDark: '#8b1f2a', secondaryLight: '#d56575', secondaryPale: '#fae3e6' },
      platinum: { secondary: '#8898b0', secondaryDark: '#6a7a92', secondaryLight: '#b8c4d4', secondaryPale: '#eef2f7' }
    };
    const t = themes[theme] || themes.gold;
    const root = document.documentElement;
    root.style.setProperty('--secondary', t.secondary);
    root.style.setProperty('--secondary-dark', t.secondaryDark);
    root.style.setProperty('--secondary-light', t.secondaryLight);
    root.style.setProperty('--secondary-pale', t.secondaryPale);
    localStorage.setItem('theme', theme);
    STATE.currentTheme = theme;
  }

  function toggleThemePicker() {
    const picker = document.querySelector('.theme-picker');
    if (picker) picker.classList.toggle('show');
  }

  // ============ MOBILE MENU ============
  function setupMobileMenu() {
    const topnav = document.querySelector('.topnav');
    const content = document.querySelector('.topnav-content');
    if (!topnav || !content) return;
    if (document.querySelector('.mobile-menu-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-toggle';
    btn.innerHTML = '☰ ' + (STATE.currentLang === 'ar' ? 'القائمة' : 'Menu');
    btn.onclick = () => content.classList.toggle('mobile-open');
    topnav.insertBefore(btn, content);
  }

  // ============ EXPORT/IMPORT ============
  function exportAllData() {
    const data = { version: '3.0', exportDate: new Date().toISOString(), edits: {}, notes: {}, settings: {} };
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (key.startsWith('edit-')) data.edits[key] = value;
      else if (key.startsWith('note-')) data.notes[key] = value;
      else if (['siteLang', 'darkMode', 'theme', 'editMode'].includes(key)) data.settings[key] = value;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nusrath-holding-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✅ ' + (STATE.currentLang === 'ar' ? 'تم تصدير جميع البيانات' : 'All data exported'));
  }

  function importAllData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = JSON.parse(evt.target.result);
          [data.edits, data.notes, data.settings].forEach(group => {
            if (group) for (const key in group) localStorage.setItem(key, group[key]);
          });
          showToast('✅ ' + (STATE.currentLang === 'ar' ? 'تم الاستيراد - إعادة تحميل...' : 'Imported - reloading...'));
          setTimeout(() => location.reload(), 1500);
        } catch (err) {
          showToast('❌ ' + (STATE.currentLang === 'ar' ? 'ملف غير صالح' : 'Invalid file'));
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function clearAllEdits() {
    const msg = STATE.currentLang === 'ar'
      ? 'هل تريد مسح كل التعديلات والملاحظات؟'
      : 'Clear all edits and notes?';
    if (!confirm(msg)) return;
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('edit-') || key.startsWith('note-') || key.startsWith('checklist-')) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
    location.reload();
  }

  // ============ TOAST ============
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      background: var(--primary); color: var(--secondary);
      padding: 12px 24px; border-radius: 999px;
      font-size: 14px; font-weight: 600;
      box-shadow: var(--shadow-lg); z-index: 9999;
      animation: slideDown 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ============ INJECT UI ============
  function injectUI() {
    // Compact FAB toolbar (single button that expands on click)
    if (!document.querySelector('.toolbar-fab')) {
      const fab = document.createElement('div');
      fab.className = 'toolbar-fab';
      fab.innerHTML = `
        <button class="fab-main" onclick="window.toggleFabMenu()" aria-label="Tools" title="${STATE.currentLang === 'ar' ? 'الأدوات' : 'Tools'}">
          <span class="fab-icon">⚙️</span>
        </button>
        <div class="fab-menu">
          <button class="fab-item" onclick="window.toggleLanguage()" title="${STATE.currentLang === 'ar' ? 'English' : 'العربية'}">
            <span class="lang-ar">EN</span><span class="lang-en">ع</span>
          </button>
          <button class="fab-item" id="dark-mode-btn" onclick="window.toggleDarkMode()" title="${STATE.currentLang === 'ar' ? 'الوضع الداكن' : 'Dark Mode'}">${STATE.darkMode ? '☀️' : '🌙'}</button>
          <button class="fab-item" onclick="window.toggleSearch()" title="${STATE.currentLang === 'ar' ? 'بحث (Ctrl+K)' : 'Search (Ctrl+K)'}">🔍</button>
          <button class="fab-item" onclick="window.toggleTOC()" title="${STATE.currentLang === 'ar' ? 'محتويات' : 'Contents'}">📑</button>
          <button class="fab-item" onclick="window.toggleThemePicker()" title="${STATE.currentLang === 'ar' ? 'الألوان' : 'Theme'}">🎨</button>
          <button class="fab-item" onclick="window.sharePage()" title="${STATE.currentLang === 'ar' ? 'نسخ الرابط' : 'Copy link'}">🔗</button>
          <button class="fab-item" onclick="window.print()" title="${STATE.currentLang === 'ar' ? 'طباعة' : 'Print'}">🖨️</button>
          <button class="fab-item" onclick="window.toggleKeyboardHelp()" title="${STATE.currentLang === 'ar' ? 'اختصارات (?)' : 'Shortcuts (?)'}">⌨️</button>
          <button class="fab-item" onclick="window.toggleEditMode()" id="edit-mode-fab-btn" title="${STATE.currentLang === 'ar' ? 'وضع التعديل' : 'Edit Mode'}">✏️</button>
        </div>
      `;
      document.body.appendChild(fab);
    }

    // Edit mode banner
    if (!document.querySelector('.edit-mode-banner')) {
      const banner = document.createElement('div');
      banner.className = 'edit-mode-banner';
      banner.innerHTML = '<span class="lang-ar">✏️ وضع التعديل نشط — اضغط على أي عنصر لتعديله • Enter للحفظ • Esc للإلغاء</span><span class="lang-en">✏️ Edit Mode Active — Click any element to edit • Enter to save • Esc to cancel</span>';
      document.body.appendChild(banner);
    }

    // Edit toggle now consolidated into FAB menu (no separate floating button)

    // Edit panel (advanced options)
    if (!document.getElementById('edit-panel')) {
      const panel = document.createElement('div');
      panel.id = 'edit-panel';
      panel.className = 'edit-panel';
      panel.innerHTML = `
        <h4><span class="lang-ar">⚙️ خيارات التعديل</span><span class="lang-en">⚙️ Edit Options</span></h4>
        <button class="edit-panel-btn success" onclick="window.exportAllData()">
          📥 <span class="lang-ar">تصدير كل البيانات</span><span class="lang-en">Export All Data</span>
        </button>
        <button class="edit-panel-btn" onclick="window.importAllData()">
          📤 <span class="lang-ar">استيراد بيانات</span><span class="lang-en">Import Data</span>
        </button>
        <button class="edit-panel-btn" onclick="window.toggleNotesVisibility()">
          📝 <span class="lang-ar">إظهار/إخفاء الملاحظات</span><span class="lang-en">Toggle Notes Markers</span>
        </button>
        <button class="edit-panel-btn" onclick="window.print()">
          🖨️ <span class="lang-ar">طباعة هذه الصفحة</span><span class="lang-en">Print This Page</span>
        </button>
        <button class="edit-panel-btn danger" onclick="window.clearAllEdits()">
          🗑️ <span class="lang-ar">مسح كل التعديلات</span><span class="lang-en">Clear All Edits</span>
        </button>
        <p style="margin-top: 12px; font-size: 11px; color: var(--text-muted); text-align: center;">
          <span class="lang-ar">التعديلات تُحفظ تلقائياً في متصفحك</span>
          <span class="lang-en">Edits auto-save in your browser</span>
        </p>
      `;
      document.body.appendChild(panel);
    }
  }

  function toggleNotesVisibility() {
    const markers = document.querySelectorAll('.note-marker');
    markers.forEach(m => m.style.display = m.style.display === 'none' ? '' : 'none');
  }

  // ============ ACTIVE NAV LINK ============
  function highlightActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.topnav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // ============ SCROLL ANIMATIONS ============
  function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.section, .card, .landing-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          observer.observe(el);
        }
      });
    }
  }

  // ============ KEYBOARD SHORTCUTS OVERLAY ============
  function setupKeyboardShortcuts() {
    const overlay = document.createElement('div');
    overlay.id = 'kbd-overlay';
    overlay.className = 'kbd-overlay';
    overlay.innerHTML = `
      <div class="kbd-card">
        <button class="kbd-close" onclick="window.toggleKeyboardHelp()">×</button>
        <h3><span class="lang-ar">⌨️ اختصارات لوحة المفاتيح</span><span class="lang-en">⌨️ Keyboard Shortcuts</span></h3>
        <div class="kbd-grid">
          <div class="kbd-row"><kbd>?</kbd><span><span class="lang-ar">عرض/إخفاء هذه القائمة</span><span class="lang-en">Toggle this help</span></span></div>
          <div class="kbd-row"><kbd>Ctrl</kbd>+<kbd>K</kbd><span><span class="lang-ar">بحث في الموقع</span><span class="lang-en">Search the site</span></span></div>
          <div class="kbd-row"><kbd>Ctrl</kbd>+<kbd>L</kbd><span><span class="lang-ar">تبديل اللغة</span><span class="lang-en">Toggle language</span></span></div>
          <div class="kbd-row"><kbd>Ctrl</kbd>+<kbd>D</kbd><span><span class="lang-ar">الوضع الداكن</span><span class="lang-en">Dark mode</span></span></div>
          <div class="kbd-row"><kbd>Ctrl</kbd>+<kbd>E</kbd><span><span class="lang-ar">تفعيل/إيقاف التعديل</span><span class="lang-en">Toggle edit mode</span></span></div>
          <div class="kbd-row"><kbd>Ctrl</kbd>+<kbd>P</kbd><span><span class="lang-ar">طباعة</span><span class="lang-en">Print</span></span></div>
          <div class="kbd-row"><kbd>T</kbd><span><span class="lang-ar">جدول المحتويات</span><span class="lang-en">Table of contents</span></span></div>
          <div class="kbd-row"><kbd>Esc</kbd><span><span class="lang-ar">إغلاق النوافذ</span><span class="lang-en">Close overlays</span></span></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.addEventListener('keydown', (e) => {
      const inField = ['INPUT','TEXTAREA'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if (e.key === '?' && !inField) { e.preventDefault(); toggleKeyboardHelp(); }
      else if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); toggleLanguage(); }
      else if (e.ctrlKey && e.key.toLowerCase() === 'd') { e.preventDefault(); toggleDarkMode(); }
      else if (e.ctrlKey && e.key.toLowerCase() === 'e') { e.preventDefault(); toggleEditMode(); }
      else if (e.key.toLowerCase() === 't' && !inField && !e.ctrlKey && !e.metaKey) { toggleTOC(); }
      else if (e.key === 'Escape') {
        document.getElementById('kbd-overlay')?.classList.remove('show');
        document.querySelector('.search-overlay')?.classList.remove('show');
        document.querySelector('.toc-panel')?.classList.remove('show');
        document.querySelector('.theme-picker')?.classList.remove('show');
      }
    });
  }

  function toggleKeyboardHelp() {
    document.getElementById('kbd-overlay')?.classList.toggle('show');
  }

  // ============ WELCOME TOUR (first visit) ============
  function setupWelcomeTour() {
    if (localStorage.getItem('tourCompleted') === 'yes') return;
    setTimeout(() => {
      const tour = document.createElement('div');
      tour.className = 'welcome-tour';
      tour.innerHTML = `
        <div class="tour-card">
          <div class="tour-badge">✨</div>
          <h2><span class="lang-ar">أهلاً بك في دراسة مجموعة نصرت</span><span class="lang-en">Welcome to Nusrath Group Study</span></h2>
          <p><span class="lang-ar">دراسة قانونية وتشغيلية شاملة لإعادة هيكلة المجموعة وفقاً للأنظمة السعودية. الموقع تفاعلي بالكامل ويدعم اللغتين.</span><span class="lang-en">A comprehensive legal & operational restructuring study under Saudi laws. The site is fully interactive and bilingual.</span></p>
          <div class="tour-features">
            <div class="tour-feature"><span class="ic">🌐</span><span><span class="lang-ar">تبديل العربية/الإنجليزية</span><span class="lang-en">Toggle Arabic/English</span></span></div>
            <div class="tour-feature"><span class="ic">✏️</span><span><span class="lang-ar">تعديل أي نص بالنقر</span><span class="lang-en">Click any text to edit</span></span></div>
            <div class="tour-feature"><span class="ic">📝</span><span><span class="lang-ar">إضافة ملاحظات على الأقسام</span><span class="lang-en">Add notes to sections</span></span></div>
            <div class="tour-feature"><span class="ic">🔍</span><span><span class="lang-ar">البحث (Ctrl+K)</span><span class="lang-en">Search (Ctrl+K)</span></span></div>
            <div class="tour-feature"><span class="ic">🌙</span><span><span class="lang-ar">الوضع الداكن</span><span class="lang-en">Dark mode</span></span></div>
            <div class="tour-feature"><span class="ic">⌨️</span><span><span class="lang-ar">اضغط ? للاختصارات</span><span class="lang-en">Press ? for shortcuts</span></span></div>
          </div>
          <button class="tour-cta" onclick="window.completeTour()"><span class="lang-ar">ابدأ الاستكشاف →</span><span class="lang-en">Start Exploring →</span></button>
        </div>
      `;
      document.body.appendChild(tour);
      requestAnimationFrame(() => tour.classList.add('show'));
    }, 600);
  }

  function completeTour() {
    localStorage.setItem('tourCompleted', 'yes');
    const tour = document.querySelector('.welcome-tour');
    if (tour) { tour.classList.remove('show'); setTimeout(() => tour.remove(), 400); }
  }

  // ============ LANGUAGE INDICATOR ============
  function showLanguageBadge() {
    const badge = document.createElement('div');
    badge.className = 'lang-badge';
    badge.innerHTML = `<span class="lang-ar">🇸🇦 العربية</span><span class="lang-en">🇬🇧 English</span>`;
    document.body.appendChild(badge);
    requestAnimationFrame(() => badge.classList.add('show'));
    setTimeout(() => { badge.classList.remove('show'); setTimeout(() => badge.remove(), 400); }, 1800);
  }

  // Hook into language change to show badge
  const _origVerify = verifyLanguageDisplay;
  // Call badge whenever language toggles (toggleLanguage already calls verify)

  // ============ INIT ============
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguageOnLoad();
    applyDarkModeOnLoad();
    injectUI();
    setupReadingProgress();
    setupBackToTop();
    setupTOC();
    setupThemePicker();
    setupSearch();
    setupNotesSystem();
    setupInlineEditing();
    setupMobileMenu();
    highlightActiveNav();
    setupScrollAnimations();
    setupKeyboardShortcuts();
    setupWelcomeTour();
    setupSkipLink();
    setupSharePage();
    setupReadingTime();
    setupPrevNext();
    setupSmoothAnchors();
    setupVisitedIndicator();
    setupScrollSpy();
    setupPrintBranding();
    verifyLanguageDisplay();
  });

  // ============ v3.2: FINAL POLISH ============

  // Skip-to-content (accessibility)
  function setupSkipLink() {
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.innerHTML = '<span class="lang-ar">تخطي إلى المحتوى</span><span class="lang-en">Skip to content</span>';
    document.body.insertBefore(skip, document.body.firstChild);
    // Mark main content area
    const main = document.querySelector('main, .container, body > .section');
    if (main && !document.getElementById('main-content')) main.id = 'main-content';
  }

  // Share — now in FAB menu, just need the handler
  function setupSharePage() { /* share button is inside FAB menu */ }

  // FAB menu toggle
  function toggleFabMenu() {
    document.querySelector('.toolbar-fab')?.classList.toggle('open');
  }
  // Close FAB when clicking outside
  document.addEventListener('click', (e) => {
    const fab = document.querySelector('.toolbar-fab');
    if (fab && fab.classList.contains('open') && !fab.contains(e.target)) {
      fab.classList.remove('open');
    }
  });
  function sharePage() {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => showToast(STATE.currentLang === 'ar' ? '✅ تم نسخ الرابط' : '✅ Link copied'));
    }
  }

  // Reading time estimate (top of first section)
  function setupReadingTime() {
    const text = document.body.innerText || '';
    const wpm = 200;
    const words = text.split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / wpm));
    const hero = document.querySelector('.page-hero, .section');
    if (hero && !hero.querySelector('.reading-time')) {
      const rt = document.createElement('div');
      rt.className = 'reading-time';
      rt.innerHTML = `⏱️ <span class="lang-ar">${mins} دقيقة قراءة</span><span class="lang-en">${mins} min read</span>`;
      hero.appendChild(rt);
    }
  }

  // Prev/Next page navigation (based on SITE_PAGES order)
  function setupPrevNext() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const idx = SITE_PAGES.findIndex(p => p.url === current);
    if (idx === -1) return;
    const prev = idx > 0 ? SITE_PAGES[idx - 1] : null;
    const next = idx < SITE_PAGES.length - 1 ? SITE_PAGES[idx + 1] : null;
    if (!prev && !next) return;

    const nav = document.createElement('nav');
    nav.className = 'prev-next-nav';
    nav.innerHTML = `
      ${prev ? `<a href="${prev.url}" class="pn-link pn-prev">
        <span class="pn-dir"><span class="lang-ar">← السابق</span><span class="lang-en">← Previous</span></span>
        <span class="pn-title"><span class="lang-ar">${prev.titleAr}</span><span class="lang-en">${prev.titleEn}</span></span>
      </a>` : '<span></span>'}
      ${next ? `<a href="${next.url}" class="pn-link pn-next">
        <span class="pn-dir"><span class="lang-ar">التالي →</span><span class="lang-en">Next →</span></span>
        <span class="pn-title"><span class="lang-ar">${next.titleAr}</span><span class="lang-en">${next.titleEn}</span></span>
      </a>` : '<span></span>'}
    `;
    const footer = document.querySelector('footer');
    if (footer) footer.parentNode.insertBefore(nav, footer);
    else document.body.appendChild(nav);
  }

  // Smooth anchor scrolling with sticky-header offset
  function setupSmoothAnchors() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = (document.querySelector('.topnav')?.offsetHeight || 0) + 20;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH, behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  }

  // Visited pages indicator (dot on nav items)
  function setupVisitedIndicator() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const visited = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    if (!visited.includes(current)) {
      visited.push(current);
      localStorage.setItem('visitedPages', JSON.stringify(visited));
    }
    document.querySelectorAll('.topnav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && visited.includes(href) && href !== current) {
        a.classList.add('visited');
      }
    });
  }

  // Scroll-spy: highlight current section in TOC
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const sections = document.querySelectorAll('h2[id], h3[id], section[id]');
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          document.querySelectorAll('.toc-panel a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // Print branding (header/footer injected only for print)
  function setupPrintBranding() {
    if (document.getElementById('print-header')) return;
    const pHeader = document.createElement('div');
    pHeader.id = 'print-header';
    pHeader.className = 'print-only';
    pHeader.innerHTML = `<div class="ph-brand">مجموعة نصرت القابضة | Nusrath Holding Group</div><div class="ph-sub">دراسة إعادة الهيكلة | Restructuring Study — ${new Date().getFullYear()}</div>`;
    document.body.insertBefore(pHeader, document.body.firstChild);

    const pFooter = document.createElement('div');
    pFooter.id = 'print-footer';
    pFooter.className = 'print-only';
    pFooter.innerHTML = `<span>© Nusrath Holding — Confidential</span><span class="page-num"></span>`;
    document.body.appendChild(pFooter);
  }


  // ============ EXPOSE ============
  window.toggleLanguage = toggleLanguage;
  window.toggleEditMode = toggleEditMode;
  window.toggleSearch = toggleSearch;
  window.toggleDarkMode = toggleDarkMode;
  window.toggleTOC = toggleTOC;
  window.toggleThemePicker = toggleThemePicker;
  window.toggleNotesVisibility = toggleNotesVisibility;
  window.exportAllData = exportAllData;
  window.importAllData = importAllData;
  window.clearAllEdits = clearAllEdits;
  window.toggleKeyboardHelp = toggleKeyboardHelp;
  window.completeTour = completeTour;
  window.sharePage = sharePage;
  window.toggleFabMenu = toggleFabMenu;

})();
