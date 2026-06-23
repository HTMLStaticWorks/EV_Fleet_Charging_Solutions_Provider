// Global JavaScript for EV Fleet

document.addEventListener('DOMContentLoaded', () => {
  // Theme Manager
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  function toggleTheme() {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }

  function updateThemeIcon(theme) {
    [themeIcon, themeIconMobile].forEach(icon => {
      if (!icon) return;
      if (theme === 'light') {
        icon.className = 'fa-regular fa-moon text-lg text-gray-700 dark:text-gray-300';
      } else {
        icon.className = 'fa-regular fa-sun text-[#F59E0B] text-lg';
      }
    });
  }

  // RTL Manager
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const rtlToggleMobileBtn = document.getElementById('rtl-toggle-mobile');
  const isRtl = localStorage.getItem('rtl') === 'true';

  // Apply initial RTL direction
  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  function toggleRtl() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('rtl', newDir === 'rtl' ? 'true' : 'false');
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', toggleRtl);
  }
  if (rtlToggleMobileBtn) {
    rtlToggleMobileBtn.addEventListener('click', toggleRtl);
  }

  // Scroll Progress Indicator
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }

    // Sticky Navbar Styling & Back to Top visibility
    const navbar = document.querySelector('nav');
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (window.scrollY > 50) {
      navbar?.classList.add('shadow-xl', 'bg-opacity-90', 'border-b', 'border-gray-800');
    } else {
      navbar?.classList.remove('shadow-xl', 'bg-opacity-90', 'border-b', 'border-gray-800');
    }

    if (window.scrollY > 300) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }

    if (backToTopBtn && backToTopBtn.classList.contains('show')) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const footer = document.querySelector('footer');
      const footerHeight = footer ? footer.offsetHeight : 0;

      if (distanceFromBottom < footerHeight) {
        const offset = footerHeight - distanceFromBottom + 24;
        backToTopBtn.style.bottom = `${offset}px`;
      } else {
        backToTopBtn.style.bottom = '24px';
      }
    }
  });

  // Back to top scroll handler
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile Menu slide toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Active Page Highlighter
  const currentPath = window.location.pathname;
  let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (!currentPage || currentPage === '/') {
    currentPage = 'index.html';
  }

  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const hrefPage = href.split('/').pop();
      if (hrefPage === currentPage) {
        link.classList.remove('text-[#D1D5DB]', 'text-[#F3F4F6]');
        link.classList.add('text-[#06B6D4]', 'font-medium');
      } else {
        link.classList.remove('text-[#06B6D4]');
      }
    }
  });

});
