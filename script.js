/* =============================================
   PROPÓSITO STREETWEAR — script.js v3.0
   Fé em Movimento
   ============================================= */

// ─── PRODUTOS ───
// Para trocar imagens: substitua a URL pelo caminho do arquivo local (ex: 'fotos/camisa.jpg')
const PRODUTOS = [
  {
    id: 'PS01',
    nome: 'Camiseta Exodus',
    subtitulo: 'Black Edition',
    preco: 89.90,
    categoria: 'camiseta',
    badge: 'MAIS VENDIDO',
    imgs: [
      'jesusCruz.jpg',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=800'
    ],
    desc: 'Peça oversized em malha pesada 100% algodão. Estampa serigrafada com base bíblica, para quem vive a Palavra sem se envergonhar.',
    verso: '"E não vos conformeis com este século" — Rm 12:2',
    material: '100% Algodão 240g',
    fit: 'Oversized',
    estoque: true
  },
  {
    id: 'PS02',
    nome: 'Hoodie Lion King',
    subtitulo: 'Graphite',
    preco: 189.90,
    categoria: 'hoodie',
    badge: null,
    imgs: [
      'graça.jpg'
    ],
    desc: 'Moletom premium com fleece interno. O Leão de Judá representado em design urbano exclusivo. Peça para as noites frias e a fé quente.',
    verso: '"O leão da tribo de Judá venceu" — Ap 5:5',
    material: '80% Algodão / 20% Poliéster 380g',
    fit: 'Oversized',
    estoque: false
  },
  {
    id: 'PS03',
    nome: 'T-Shirt Metanoia',
    subtitulo: 'White Drop',
    preco: 79.90,
    categoria: 'camiseta',
    badge: 'NOVO',
    imgs: [
      'coração.jpg',
      'coração.jpg'
    ],
    desc: 'A renovação da mente em branco absoluto. Drop minimalista, corte regular, mensagem maximalista. Metanoia: transformação profunda.',
    verso: '"Sede transformados pela renovação da mente" — Rm 12:2',
    material: '100% Algodão 180g',
    fit: 'Regular',
    estoque: true
  },
  {
    id: 'PS04',
    nome: 'Oversized Kingdom',
    subtitulo: 'Sand Wash',
    preco: 95.00,
    categoria: 'camiseta',
    badge: null,
    imgs: [
      'apagar.jpg'
    ],
    desc: 'Lavagem especial sand wash que dá textura vintage única a cada peça. Nenhuma é igual. Assim como ninguém é igual a você.',
    verso: '"Buscai primeiro o Reino de Deus" — Mt 6:33',
    material: '100% Algodão 220g — Sand Wash',
    fit: 'Oversized',
    estoque: true
  },
  {
    id: 'PS05',
    nome: 'Alpha & Omega',
    subtitulo: 'Classic Black',
    preco: 89.90,
    categoria: 'camiseta',
    badge: null,
    imgs: [
      'caminho.jpg'
    ],
    desc: 'O princípio e o fim em uma só peça. Design gráfico minimal com tipografia brutalista. Para quem conhece o Alfa e o Ômega.',
    verso: '"Eu sou o Alfa e o Ômega" — Ap 1:8',
    material: '100% Algodão 240g',
    fit: 'Oversized',
    estoque: true
  },
  {
    id: 'PS06',
    nome: 'Shorts Mesh Holy',
    subtitulo: 'Black',
    preco: 110.00,
    categoria: 'camiseta',
    badge: 'NOVO',
    imgs: [
      'graça.jpg'
    ],
    desc: 'Shorts mesh respirável para quem move o corpo com propósito. Bolsos utilitários, elastico ajustável, identidade cristã.',
    verso: '"Glorificai, pois, a Deus no vosso corpo" — 1Co 6:20',
    material: '100% Poliéster Mesh',
    fit: 'Oversized',
    estoque: true
  },
  {
    id: 'PS07',
    nome: 'Longline Grace',
    subtitulo: 'Acid Wash',
    preco: 120.00,
    categoria: 'camiseta',
    badge: null,
    imgs: [
      'caminho.jpg'
    ],
    desc: 'Longline com corte estendido e acabamento acid wash exclusivo. A graça de Deus no estilo mais autêntico do streetwear nordestino.',
    verso: '"Pela graça sois salvos, mediante a fé" — Ef 2:8',
    material: '100% Algodão 220g — Acid Wash',
    fit: 'Longline',
    estoque: true
  },
  {
    id: 'PS08',
    nome: 'Hoodie Romanos',
    subtitulo: 'Dark Drop',
    preco: 199.90,
    categoria: 'hoodie',
    badge: 'PRÉ-VENDA',
    imgs: [
      'jesus.jpg'
    ],
    desc: 'Nosso hoodie mais denso e premium. Para os dias frios do Cariri e os corações quentes no Evangelho. Pré-venda exclusiva — envio em 15 dias.',
    verso: '"Não me envergonho do Evangelho" — Rm 1:16',
    material: '80% Algodão / 20% Poliéster 420g',
    fit: 'Oversized',
    estoque: true
  }
];

// ─── ESTADO ───
let cart = [];
try { cart = JSON.parse(localStorage.getItem('psw_cart_v5')) || []; } catch(e) { cart = []; }

let activeFilter = 'all';
const WHATSAPP_NUM = '558893022426';

// Modal produto
let currentProduct = null;
let currentGalleryIndex = 0;

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
  const filtered = filter === 'all' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:80px 20px; color:#444;">
        <p style="font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:4px; margin-bottom:12px;">NENHUM PRODUTO</p>
        <p style="font-size:11px; letter-spacing:3px;">EM BREVE NOVIDADES</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => buildCard(p)).join('');

  grid.querySelectorAll('.card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.25s, transform 0.25s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 70);
  });
}

function buildCard(p) {
  const mainImg = p.imgs ? p.imgs[0] : (p.img || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800');
  return `
    <div class="card" data-id="${p.id}">
      <div class="card-img-wrap" onclick="openPModal('${p.id}')">
        ${!p.estoque ? '<div class="faixa-esgotado">ESGOTADO</div>' : ''}
        ${p.badge && p.estoque ? `<div class="card-badge">${p.badge}</div>` : ''}
        <img 
          src="${mainImg}" 
          alt="${p.nome}"
          class="${!p.estoque ? 'img-esgotada' : ''}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'"
        >
        ${p.estoque ? '<div class="card-hover-overlay"><span class="card-hover-text">VER DETALHES</span></div>' : ''}
      </div>
      <div class="card-info">
        <span class="card-category">${p.categoria.toUpperCase()}</span>
        <h3>${p.nome}</h3>
        ${p.subtitulo ? `<span class="card-sub">${p.subtitulo}</span>` : ''}
        <span class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
        <select id="size-${p.id}" class="size-select" ${!p.estoque ? 'disabled' : ''} aria-label="Tamanho">
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
        >${p.estoque ? 'ADICIONAR AO CARRINHO' : 'ESGOTADO'}</button>
      </div>
    </div>
  `;
}

// ─── FILTROS ───
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderProducts(activeFilter);
    });
  });
}

// ─── MODAL PRODUTO ───
function openPModal(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  currentGalleryIndex = 0;

  const imgs = p.imgs || [p.img || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'];

  // Galeria
  const mainImg = document.getElementById('gallery-main-img');
  mainImg.src = imgs[0];
  mainImg.onerror = () => mainImg.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800';

  // Dots
  const dotsEl = document.getElementById('gallery-dots');
  dotsEl.innerHTML = imgs.length > 1 ? imgs.map((_, i) =>
    `<button class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="galleryGoTo(${i})"></button>`
  ).join('') : '';

  // Thumbs
  const thumbsEl = document.getElementById('gallery-thumbs');
  thumbsEl.innerHTML = imgs.length > 1 ? imgs.map((src, i) =>
    `<img class="gallery-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="Thumb ${i+1}" onclick="galleryGoTo(${i})"
      onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'">`
  ).join('') : '';

  // Setas
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  if (prevBtn && nextBtn) {
    prevBtn.style.display = imgs.length > 1 ? '' : 'none';
    nextBtn.style.display = imgs.length > 1 ? '' : 'none';
  }

  // Info
  document.getElementById('pmodal-category').textContent = p.categoria.toUpperCase();
  document.getElementById('pmodal-title').textContent = p.nome;
  document.getElementById('pmodal-price').textContent = `R$ ${p.preco.toFixed(2).replace('.', ',')}`;
  document.getElementById('pmodal-desc').textContent = p.desc || '';

  // Detalhes
  const detailsEl = document.getElementById('pmodal-details');
  const rows = [];
  if (p.material) rows.push(['MATERIAL', p.material]);
  if (p.fit) rows.push(['CORTE', p.fit]);
  if (p.verso) rows.push(['VERSÍCULO', p.verso]);
  detailsEl.innerHTML = rows.map(([k, v]) => `
    <div class="pmodal-detail-row">
      <span>${k}</span><span>${v}</span>
    </div>`).join('');
  detailsEl.style.display = rows.length ? 'flex' : 'none';

  // Tamanhos
  const sizesGrid = document.getElementById('pmodal-sizes-grid');
  const sizes = ['P', 'M', 'G', 'GG', 'XGG'];
  sizesGrid.innerHTML = sizes.map(s =>
    `<button class="size-btn ${!p.estoque ? 'unavailable' : ''}" data-size="${s}" onclick="selectSize(this)">${s}</button>`
  ).join('');

  // Botão comprar
  const buyBtn = document.querySelector('.btn-pmodal-buy');
  if (buyBtn) buyBtn.disabled = !p.estoque;

  const overlay = document.getElementById('product-modal');
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function selectSize(btn) {
  if (btn.classList.contains('unavailable')) return;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function closePModal() {
  document.getElementById('product-modal').style.display = 'none';
  document.body.style.overflow = '';
  currentProduct = null;
}

function closePModalOutside(e) {
  if (e.target.id === 'product-modal') closePModal();
}

function addFromModal() {
  if (!currentProduct) return;
  const selectedBtn = document.querySelector('.size-btn.selected');
  if (!selectedBtn) {
    showToast('⚠ SELECIONE UM TAMANHO');
    document.getElementById('pmodal-sizes-grid').style.outline = '1px solid rgba(255,100,100,0.5)';
    setTimeout(() => {
      const g = document.getElementById('pmodal-sizes-grid');
      if (g) g.style.outline = '';
    }, 2000);
    return;
  }
  const size = selectedBtn.getAttribute('data-size');
  cart.push({ ...currentProduct, img: currentProduct.imgs ? currentProduct.imgs[0] : currentProduct.img, size, cartId: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  showToast(`✓ ${currentProduct.nome} (${size}) ADICIONADO`);
  closePModal();
}

// Galeria navigation
function galleryGoTo(index) {
  if (!currentProduct) return;
  const imgs = currentProduct.imgs || [currentProduct.img];
  if (index < 0 || index >= imgs.length) return;

  currentGalleryIndex = index;
  const mainImg = document.getElementById('gallery-main-img');
  mainImg.classList.add('fade');
  setTimeout(() => {
    mainImg.src = imgs[index];
    mainImg.classList.remove('fade');
  }, 180);

  document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  document.querySelectorAll('.gallery-thumb').forEach((t, i) => t.classList.toggle('active', i === index));
}

function galleryPrev() {
  if (!currentProduct) return;
  const len = (currentProduct.imgs || [currentProduct.img]).length;
  galleryGoTo((currentGalleryIndex - 1 + len) % len);
}

function galleryNext() {
  if (!currentProduct) return;
  const len = (currentProduct.imgs || [currentProduct.img]).length;
  galleryGoTo((currentGalleryIndex + 1) % len);
}

// ─── CARRINHO ───
function addToCart(id) {
  const p = PRODUTOS.find(x => x.id === id);
  const sizeEl = document.getElementById(`size-${id}`);
  const size = sizeEl ? sizeEl.value : '';

  if (!size) {
    showToast('⚠ SELECIONE UM TAMANHO');
    if (sizeEl) {
      sizeEl.style.borderColor = 'rgba(255,80,80,0.7)';
      sizeEl.style.transition = 'border-color 0.2s';
      setTimeout(() => { sizeEl.style.borderColor = ''; }, 2000);
    }
    return;
  }

  const mainImg = p.imgs ? p.imgs[0] : (p.img || '');
  cart.push({ ...p, img: mainImg, size, cartId: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  showToast(`✓ ${p.nome} (${size}) ADICIONADO`);

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    const btn = card.querySelector('.btn-buy');
    if (btn) {
      const orig = btn.innerText;
      btn.innerText = '✓ ADICIONADO';
      btn.style.background = 'rgba(37,211,102,0.1)';
      btn.style.borderColor = 'rgba(37,211,102,0.4)';
      btn.style.color = '#25D366';
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 2000);
    }
  }
}

function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  try { localStorage.setItem('psw_cart_v5', JSON.stringify(cart)); } catch(e) {}
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const listEl = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total');

  if (countEl) {
    countEl.innerText = cart.length;
    countEl.style.transform = 'scale(1.5)';
    setTimeout(() => { countEl.style.transform = ''; }, 300);
  }

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">✝</div>
        <p>CARRINHO VAZIO</p>
        <p style="font-size:10px; letter-spacing:2px; margin-top:4px; opacity:0.6;">ADICIONE ALGUM PRODUTO</p>
      </div>`;
    if (totalEl) totalEl.innerText = 'R$ 0,00';
    return;
  }

  let total = 0;
  listEl.innerHTML = cart.map(item => {
    total += item.preco;
    return `
      <div class="item-c">
        <img class="item-c-img" src="${item.img || ''}" alt="${item.nome}"
          onerror="this.style.display='none'">
        <div class="item-c-info">
          <strong>${item.nome}</strong>
          <small>TAM: ${item.size} &nbsp;·&nbsp; R$ ${item.preco.toFixed(2).replace('.', ',')}</small>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${item.cartId})" aria-label="Remover">✕</button>
      </div>`;
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
    showToast('⚠ CARRINHO ESTÁ VAZIO');
    return;
  }
  let msg = '🙏 *PEDIDO — PROPÓSITO STREETWEAR*\n';
  msg += '*Fé em Movimento · Morada Nova/CE*\n';
  msg += '───────────────────────\n\n';
  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.nome}*\n`;
    msg += `   Tamanho: ${item.size}\n`;
    msg += `   Valor: R$ ${item.preco.toFixed(2).replace('.', ',')}\n\n`;
  });
  const total = cart.reduce((a, b) => a + b.preco, 0);
  msg += '───────────────────────\n';
  msg += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  msg += '"Não me envergonho do Evangelho." — Rm 1:16 ✝';
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─── MODAL CONFIRMAÇÃO ───
function promptClearCart() {
  if (cart.length === 0) { showToast('⚠ CARRINHO JÁ ESTÁ VAZIO'); return; }
  document.getElementById('confirm-modal').classList.add('open');
}

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('open');
}

function confirmClearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  closeConfirmModal();
  showToast('✓ CARRINHO LIMPO');
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

function closeMenuMobile() {
  const nav = document.getElementById('nav-menu');
  const btn = document.getElementById('menu-toggle');
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    btn.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── HEADER SCROLL ───
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ─── HERO BG PARALLAX ───
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  setTimeout(() => bg.classList.add('loaded'), 80);
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      bg.style.transform = `scale(1) translateY(${window.scrollY * 0.28}px)`;
    }
  }, { passive: true });
}

// ─── SCROLL ANIMATIONS ───
function initScrollEffects() {
  const targets = document.querySelectorAll('.highlight-card, .about, .verse-banner, .footer, .verse-strip');
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ─── TOAST ───
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── TECLADO ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal.style.display === 'block') toggleCart();
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('open')) closeMenuMobile();
    if (document.getElementById('product-modal').style.display === 'flex') closePModal();
    closeConfirmModal();
  }
  // Galeria com setas do teclado
  if (document.getElementById('product-modal').style.display === 'flex') {
    if (e.key === 'ArrowLeft') galleryPrev();
    if (e.key === 'ArrowRight') galleryNext();
  }
});
