(function () {
  var DEFAULT_TAB = 'home';
  var panels = document.querySelectorAll('[data-tab-panel]');
  var navLinks = document.querySelectorAll('.nav-link');

  function showTab(tabId) {
    var found = false;
    panels.forEach(function (panel) {
      var match = panel.id === tabId;
      panel.hidden = !match;
      if (match) found = true;
    });
    if (!found) {
      tabId = DEFAULT_TAB;
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== DEFAULT_TAB;
      });
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function navigateTo(tabId) {
    if (window.location.hash.slice(1) === tabId) {
      showTab(tabId);
    } else {
      window.location.hash = tabId;
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navigateTo(link.dataset.tab);
    });
  });

  document.querySelectorAll('[data-tab-link]').forEach(function (el) {
    el.addEventListener('click', function () {
      navigateTo(el.dataset.tabLink);
    });
  });

  window.addEventListener('hashchange', function () {
    showTab(window.location.hash.slice(1) || DEFAULT_TAB);
  });

  showTab(window.location.hash.slice(1) || DEFAULT_TAB);
})();
