/* =============================================
   PROPÓSITO STREETWEAR — script.js
   Fé em Movimento
   ============================================= */

// ─── PRODUTOS ───
const PRODUTOS = [
  {
    id: 'PS01',
    nome: 'Camiseta Exodus',
    subtitulo: 'Black Edition',
    preco: 89.90,
    categoria: 'camiseta',
    badge: 'MAIS VENDIDO',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
    estoque: true
  },
  {
    id: 'PS02',
    nome: 'Hoodie Lion King',
    subtitulo: 'Graphite',
    preco: 189.90,
    categoria: 'hoodie',
    badge: null,
    img: 'caminho.jpg',
    estoque: false
  },
  {
    id: 'PS03',
    nome: 'T-Shirt Metanoia',
    subtitulo: 'White Drop',
    preco: 79.90,
    categoria: 'camiseta',
    badge: 'NOVO',
    img: 'apagar.jpg',
    estoque: true
  },
  {
    id: 'PS04',
    nome: 'Oversized Kingdom',
    subtitulo: 'Sand Wash',
    preco: 95.00,
    categoria: 'camiseta',
    badge: null,
    img: 'caminho.jpg',
    estoque: true
  },
  {
    id: 'PS05',
    nome: 'Camiseta Alpha & Omega',
    subtitulo: 'Classic Black',
    preco: 89.90,
    categoria: 'camiseta',
    badge: null,
    img: 'graça.jpg',
    estoque: true
  },
  {
    id: 'PS06',
    nome: 'Shorts Mesh Holy',
    subtitulo: 'Black',
    preco: 110.00,
    categoria: 'camiseta',
    badge: 'NOVO',
    img: 'coração.jpg',
    estoque: true
  },
  {
    id: 'PS07',
    nome: 'Longline Grace',
    subtitulo: 'Acid Wash',
    preco: 120.00,
    categoria: 'camiseta',
    badge: null,
    img: 'https://i.pinimg.com/1200x/54/ea/31/54ea318226ab9f7bf23b0190d39c4912.jpg',
    estoque: true
  },
  {
    id: 'PS08',
    nome: 'Hoodie Romanos',
    subtitulo: 'Dark Drop',
    preco: 199.90,
    categoria: 'hoodie',
    badge: 'PRÉ-VENDA',
    img: 'jesusCruz.jpg',
    estoque: true
  }
];

// ─── ESTADO ───
let cart = JSON.parse(localStorage.getItem('psw_cart_v4')) || [];
let activeFilter = 'all';

// ─── NÚMERO DO WHATSAPP (altere aqui) ───
const WHATSAPP_NUM = '558893022426';

// ─── INICIALIZAÇÃO ───
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  updateCartUI();
  initScrollEffects();
  initHeaderScroll();
  initHeroBg();
  initFilters();
});

// ─── RENDER PRODUTOS ───
function renderProducts(filter) {
  const grid = document.getElementById('grid-produtos');
  const filtered = filter === 'all'
    ? PRODUTOS
    : PRODUTOS.filter(p => p.categoria === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:80px 20px; color:#555;">
        <p style="font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:3px; margin-bottom:12px;">NENHUM PRODUTO</p>
        <p style="font-size:12px; letter-spacing:2px;">EM BREVE NOVIDADES</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => buildCard(p)).join('');

  // Animação de entrada dos cards
  const cards = grid.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, translateY 0.3s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

function buildCard(p) {
  return `
    <div class="card" data-id="${p.id}">
      <div class="card-img-wrap">
        ${!p.estoque ? '<div class="faixa-esgotado">ESGOTADO</div>' : ''}
        ${p.badge && p.estoque ? `<div class="card-badge">${p.badge}</div>` : ''}
        <img 
          src="${p.img}" 
          alt="${p.nome}"
          class="${!p.estoque ? 'img-esgotada' : ''}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'"
        >
      </div>
      <div class="card-info">
        <span class="card-category">${p.categoria.toUpperCase()}</span>
        <h3>${p.nome}</h3>
        <span class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
        <select id="size-${p.id}" class="size-select" ${!p.estoque ? 'disabled' : ''} aria-label="Selecionar tamanho">
          <option value="">— TAMANHO —</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
          <option value="XGG">XGG</option>
        </select>
        <button 
          class="btn-buy"
          onclick="addToCart('${p.id}')"
          ${!p.estoque ? 'disabled' : ''}
          aria-label="Adicionar ${p.nome} ao carrinho"
        >
          ${p.estoque ? 'ADICIONAR AO CARRINHO' : 'ESGOTADO'}
        </button>
      </div>
    </div>
  `;
}

// ─── FILTROS ───
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      activeFilter = filter;
      renderProducts(filter);
    });
  });
}

// ─── CARRINHO ───
function addToCart(id) {
  const p = PRODUTOS.find(x => x.id === id);
  const sizeEl = document.getElementById(`size-${id}`);
  const size = sizeEl ? sizeEl.value : '';

  if (!size) {
    showToast('⚠ SELECIONE UM TAMANHO');
    sizeEl.style.borderColor = 'rgba(255,100,100,0.6)';
    setTimeout(() => { sizeEl.style.borderColor = ''; }, 2000);
    return;
  }

  cart.push({ ...p, size, cartId: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  showToast(`✓ ${p.nome} (${size}) ADICIONADO`);

  // Animação no botão
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    const btn = card.querySelector('.btn-buy');
    const originalText = btn.innerText;
    btn.innerText = '✓ ADICIONADO';
    btn.style.background = '#1a1a1a';
    btn.style.color = '#25D366';
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 1800);
  }
}

function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  saveCart();
  updateCartUI();
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm('Limpar o carrinho?')) {
    cart = [];
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('psw_cart_v4', JSON.stringify(cart));
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const listEl = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total');

  countEl.innerText = cart.length;

  // Animar badge
  countEl.style.transform = 'scale(1.4)';
  setTimeout(() => { countEl.style.transform = ''; }, 300);

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">✝</div>
        <p>SEU CARRINHO ESTÁ VAZIO</p>
        <p style="font-size:11px; margin-top:4px;">ADICIONE ALGUM PRODUTO</p>
      </div>`;
    if (totalEl) totalEl.innerText = 'R$ 0,00';
    return;
  }

  let total = 0;
  listEl.innerHTML = cart.map(item => {
    total += item.preco;
    return `
      <div class="item-c">
        <img class="item-c-img" src="${item.img}" alt="${item.nome}" onerror="this.style.display='none'">
        <div class="item-c-info">
          <strong>${item.nome}</strong>
          <small>TAM: ${item.size} &nbsp;·&nbsp; R$ ${item.preco.toFixed(2).replace('.', ',')}</small>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${item.cartId})" aria-label="Remover item">✕</button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  const isOpen = modal.style.display === 'block';
  modal.style.display = isOpen ? 'none' : 'block';
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeCartOutside(e) {
  if (e.target.id === 'cart-modal') toggleCart();
}

function enviarZap() {
  if (cart.length === 0) {
    showToast('⚠ CARRINHO VAZIO');
    return;
  }

  let msg = '🙏 *PEDIDO — PROPÓSITO STREETWEAR*\n\n';
  msg += '*Fé em Movimento — Morada Nova/CE*\n';
  msg += '─────────────────────\n\n';

  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.nome}*\n`;
    msg += `   Tamanho: ${item.size}\n`;
    msg += `   Valor: R$ ${item.preco.toFixed(2).replace('.', ',')}\n\n`;
  });

  const total = cart.reduce((a, b) => a + b.preco, 0);
  msg += '─────────────────────\n';
  msg += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  msg += '"Não me envergonho do Evangelho." — Rm 1:16 ✝';

  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─── MENU MOBILE ───
function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  const btn = document.getElementById('menu-toggle');
  const isOpen = nav.classList.contains('open');

  nav.classList.toggle('open');
  btn.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// Fechar menu ao clicar em link
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('open');
      document.getElementById('menu-toggle').classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});

// ─── HEADER SCROLL ───
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ─── HERO BG PARALLAX / LOADED ───
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (bg) {
    setTimeout(() => bg.classList.add('loaded'), 100);
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      bg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }
}

// ─── SCROLL ANIMATIONS (Intersection Observer) ───
function initScrollEffects() {
  const elements = document.querySelectorAll('.highlight-card, .about, .verse-banner, .footer');
  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ─── TOAST ───
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── KEYBOARD ACCESSIBILITY ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal.style.display === 'block') toggleCart();

    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('open')) toggleMenu();
  }
});
