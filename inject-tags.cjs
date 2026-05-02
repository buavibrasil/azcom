const fs = require('fs');
const path = require('path');

const files = ['index.html', 'servicos.html', 'solucoes.html', 'sobre.html', 'contato.html'];

const analyticsTags = `
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="AZcom | Tecnologia que transforma negócios" />
  <meta property="og:description" content="Soluções inovadoras em telefonia IP, internet empresarial e infraestrutura de TI." />
  <meta property="og:image" content="https://www.azcom.com.br/img/hero-bg.webp" />
  <meta property="og:url" content="https://www.azcom.com.br/" />

  <!-- Google Analytics 4 (Placeholder) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Meta Pixel Code (Placeholder) -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'PIXEL_ID_AQUI');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=PIXEL_ID_AQUI&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->
`;

const themeToggle = `
      <div class="header__actions flex items-center gap-sm">
        <button id="theme-toggle" class="theme-toggle" aria-label="Alternar tema" title="Modo Escuro / Claro">
          <svg class="theme-icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <svg class="theme-icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
        <div class="header__cta desktop-only">
`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Inject Head tags
    if (!content.includes('G-XXXXXXXXXX')) {
      content = content.replace('</head>', analyticsTags + '\n</head>');
    }

    // Inject Theme Toggle
    if (!content.includes('id="theme-toggle"')) {
      content = content.replace('<div class="header__cta desktop-only">', themeToggle);
      // Close the added div (since header__actions wraps both the button and the cta div)
      content = content.replace(/<\/div>\s*<button id="burger"/, '</div>\n      </div>\n\n      <button id="burger"');
    }

    fs.writeFileSync(filePath, content);
    console.log('Processed:', file);
  }
});
