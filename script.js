/* =============================================
   PROPÓSITO STREETWEAR — script.js v2.0
   Fé em Movimento
   =============================================

   Módulos:
   1. DADOS (produtos)
   2. ESTADO (carrinho, filtro, modal)
   3. INIT
   4. CATÁLOGO (grid + filtros)
   5. CARROSSEL (scroll snap + drag + botões)
   6. MODAL DE PRODUTO (galeria + swipe + tamanhos)
   7. CARRINHO (adicionar, remover, render)
   8. MODAL CONFIRMAÇÃO (limpar carrinho)
   9. MENU MOBILE
   10. EFEITOS (header scroll, hero parallax, fade-in)
   11. TOAST
   12. ACESSIBILIDADE (ESC para fechar modais)
   ============================================= */


/* ════════════════════════════════════════
   1. DADOS DOS PRODUTOS
   Adicione múltiplas imagens em "imgs" para
   a galeria do modal de detalhes.
════════════════════════════════════════ */
const PRODUTOS = [
  {
    id: 'PS01',
    nome: 'Camiseta Exodus',
    categoria: 'camiseta',
    badge: 'MAIS VENDIDO',
    badgeStyle: 'gold',
    preco: 89.90,
    desc: 'Corte oversized de inspiração urbana. Estampa exclusiva com referência ao livro do Êxodo — a travessia, a fé, a liberdade.',
    detalhes: {
      'Tecido':    'Cotton 100% — Fio 30',
      'Tipo':      'Unissex',
      'Estampa':   'Serigrafia',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG', 'XGG'],
    imgs: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=900',
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS02',
    nome: 'Hoodie Lion King',
    categoria: 'hoodie',
    badge: null,
    preco: 189.90,
    desc: 'Moletom premium com carapuço e bolso canguru. Representação do Leão de Judá em bordado exclusivo na manga.',
    detalhes: {
      'Tecido':    'Moletom 80% algodão, 20% poliéster',
      'Tipo':      'Unissex',
      'Estampa':   'Bordado + Serigrafia',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG'],
    imgs: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900',
    ],
    estoque: false
  },
  {
    id: 'PS03',
    nome: 'T-Shirt Metanoia',
    categoria: 'camiseta',
    badge: 'NOVO',
    preco: 79.90,
    desc: 'Metanoia — transformação da mente. Camiseta minimalista com tipografia distressed e versículo no interior da gola.',
    detalhes: {
      'Tecido':    'Algodão Penteado — Fio 40',
      'Tipo':      'Unissex',
      'Estampa':   'Serigrafia',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG', 'XGG'],
    imgs: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS04',
    nome: 'Oversized Kingdom',
    categoria: 'camiseta',
    badge: null,
    preco: 95.00,
    desc: 'Corte oversize extremo com lavagem especial sand wash. Estampa Kingdom — o reino não é deste mundo.',
    detalhes: {
      'Tecido':    'Algodão Cru — Fio 30',
      'Tipo':      'Unissex',
      'Estampa':   'Silk',
      'Origem':    'Nacional',
    },
    tamanhos: ['M', 'G', 'GG', 'XGG'],
    imgs: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=900',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS05',
    nome: 'Alpha & Omega',
    categoria: 'camiseta',
    badge: null,
    preco: 89.90,
    desc: 'O princípio e o fim. Camiseta clássica com tipografia Bebas e contraste black & white. Peça atemporal do movimento.',
    detalhes: {
      'Tecido':    'Cotton 100% — Fio 30',
      'Tipo':      'Unissex',
      'Estampa':   'Serigrafia',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG'],
    imgs: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS06',
    nome: 'Shorts Mesh Holy',
    categoria: 'shorts',
    badge: 'NOVO',
    preco: 110.00,
    desc: 'Short de malha mesh com elástico reforçado e cordão ajustável. Perfeito para os dias de movimento.',
    detalhes: {
      'Tecido':    'Dry-Fit Mesh 100% Poliéster',
      'Tipo':      'Masculino',
      'Estampa':   'Bordado',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG'],
    imgs: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS07',
    nome: 'Longline Grace',
    categoria: 'camiseta',
    badge: null,
    preco: 120.00,
    desc: 'Camiseta longline com efeito acid wash único — cada peça é diferente. Estampa Grace na costa toda.',
    detalhes: {
      'Tecido':    'Algodão Acid Wash — Fio 30',
      'Tipo':      'Unissex',
      'Estampa':   'Serigrafia',
      'Origem':    'Nacional',
    },
    tamanhos: ['P', 'M', 'G', 'GG'],
    imgs: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900',
    ],
    estoque: true
  },
  {
    id: 'PS08',
    nome: 'Hoodie Romanos',
    categoria: 'hoodie',
    badge: 'PRÉ-VENDA',
    badgeStyle: 'gold',
    preco: 199.90,
    desc: 'Nossa peça mais aguardada. Moletom premium com Romanos 1:16 em toda a manga direita. Disponível em pré-venda.',
    detalhes: {
      'Tecido':    'Moletom 80% algodão, 20% poliéster',
      'Tipo':      'Unissex',
      'Estampa':   'Bordado',
      'Origem':    'Nacional',
    },
    tamanhos: ['M', 'G', 'GG', 'XGG'],
    imgs: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900',
    ],
    estoque: true
  }
];

/* ─── WHATSAPP — altere pelo número real ─── */
const WHATSAPP_NUM = '5588999999999';


/* ════════════════════════════════════════
   2. ESTADO GLOBAL
════════════════════════════════════════ */
let cart       = JSON.parse(localStorage.getItem('psw_cart_v5')) || [];
let activeFilter = 'all';

/* Estado do modal de produto */
let currentProduct  = null;   // objeto do produto aberto
let currentImgIndex = 0;      // índice da imagem atual na galeria
let selectedSize    = null;    // tamanho selecionado no modal

/* Estado do carrossel */
let carouselIndex = 0;


/* ════════════════════════════════════════
   3. INICIALIZAÇÃO
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog('all');
  renderCarousel();
  updateCartUI();
  initFilters();
  initHeaderScroll();
  initHeroBg();
  initScrollFadeIn();
  initCarouselDrag();
  initNavLinks();
});


/* ════════════════════════════════════════
   4. CATÁLOGO — grid com filtros
════════════════════════════════════════ */

/**
 * Renderiza os cards do catálogo filtrando por categoria.
 * @param {string} filter - 'all' | 'camiseta' | 'hoodie' | 'shorts'
 */
function renderCatalog(filter) {
  const grid = document.getElementById('grid-produtos');
  const list = filter === 'all' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === filter);

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:#444;">
        <p style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;margin-bottom:8px;">EM BREVE</p>
        <p style="font-size:11px;letter-spacing:2px;color:#333;">NOVIDADES CHEGANDO</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => buildCatalogCard(p)).join('');

  /* Animação de entrada escalonada */
  grid.querySelectorAll('.card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, transform 0.3s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 70);
  });
}

/**
 * Gera o HTML de um card do catálogo.
 */
function buildCatalogCard(p) {
  const badgeClass = p.badgeStyle === 'gold' ? 'card-badge gold' : 'card-badge';
  return `
    <div class="card" data-id="${p.id}">
      <div class="card-img-wrap">
        ${!p.estoque ? '<div class="faixa-esgotado">ESGOTADO</div>' : ''}
        ${p.badge && p.estoque ? `<div class="${badgeClass}">${p.badge}</div>` : ''}
        <img src="${p.imgs[0]}" alt="${p.nome}" class="${!p.estoque ? 'img-esgotada' : ''}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'">
      </div>
      <div class="card-info">
        <span class="card-category">${p.categoria}</span>
        <h3>${p.nome}</h3>
        <span class="price">R$ ${fmt(p.preco)}</span>

        <!-- Select compacto — feedback -->
        <select id="size-${p.id}" class="size-select" ${!p.estoque ? 'disabled' : ''} aria-label="Tamanho">
          <option value="">— TAMANHO —</option>
          ${p.tamanhos.map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>

        <button class="btn-buy" onclick="addToCart('${p.id}')" ${!p.estoque ? 'disabled' : ''}>
          ${p.estoque ? 'ADICIONAR AO CARRINHO' : 'ESGOTADO'}
        </button>
      </div>
    </div>`;
}

/** Inicializa os botões de filtro */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCatalog(activeFilter);
    });
  });
}


/* ════════════════════════════════════════
   5. CARROSSEL
════════════════════════════════════════ */

/** Renderiza os cards no carrossel */
function renderCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  track.innerHTML = PRODUTOS.map(p => {
    const badgeClass = p.badgeStyle === 'gold' ? 'carousel-badge gold' : 'carousel-badge';
    return `
      <div class="carousel-card" data-id="${p.id}">
        <div class="carousel-card-img">
          ${!p.estoque ? '<div class="carousel-faixa">ESGOTADO</div>' : ''}
          ${p.badge && p.estoque ? `<div class="${badgeClass}">${p.badge}</div>` : ''}
          <img src="${p.imgs[0]}" alt="${p.nome}" class="${!p.estoque ? 'img-esgotada' : ''}" loading="lazy">
        </div>
        <div class="carousel-card-info">
          <span class="carousel-card-cat">${p.categoria}</span>
          <p class="carousel-card-name">${p.nome}</p>
          <span class="carousel-card-price">R$ ${fmt(p.preco)}</span>
          <button class="btn-ver-detalhes" onclick="openPModal('${p.id}')">VER DETALHES</button>
        </div>
      </div>`;
  }).join('');

  updateCarouselArrows();

  /* Atualizar setas quando o usuário rola manualmente */
  track.addEventListener('scroll', () => {
    const cardW = track.querySelector('.carousel-card')?.offsetWidth || 300;
    carouselIndex = Math.round(track.scrollLeft / (cardW + 20));
    updateCarouselArrows();
  }, { passive: true });
}

/**
 * Move o carrossel na direção indicada.
 * @param {number} dir - -1 (anterior) | 1 (próximo)
 */
function carouselMove(dir) {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  const card  = track.querySelector('.carousel-card');
  if (!card) return;
  const step  = card.offsetWidth + 20;
  const max   = PRODUTOS.length - 1;

  carouselIndex = Math.max(0, Math.min(max, carouselIndex + dir));
  track.scrollTo({ left: carouselIndex * step, behavior: 'smooth' });
  updateCarouselArrows();
}

/** Habilita/desabilita as setas de navegação do carrossel */
function updateCarouselArrows() {
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  if (prev) prev.disabled = carouselIndex <= 0;
  if (next) next.disabled = carouselIndex >= PRODUTOS.length - 1;
}

/**
 * Drag-to-scroll no carrossel (desktop + touch).
 */
function initCarouselDrag() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  let isDown  = false;
  let startX  = 0;
  let scrollL = 0;

  track.addEventListener('mousedown', e => {
    isDown  = true;
    track.classList.add('grabbing');
    startX  = e.pageX - track.offsetLeft;
    scrollL = track.scrollLeft;
  });
  document.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });
  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollL - walk;
  });
}


/* ════════════════════════════════════════
   6. MODAL DE PRODUTO
   Abre com galeria de imagens, swipe e info
════════════════════════════════════════ */

/**
 * Abre o modal de detalhes de um produto.
 * @param {string} id - ID do produto
 */
function openPModal(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;

  currentProduct  = p;
  currentImgIndex = 0;
  selectedSize    = null;

  /* Preencher dados textuais */
  document.getElementById('pmodal-category').textContent = p.categoria.toUpperCase();
  document.getElementById('pmodal-title').textContent    = p.nome;
  document.getElementById('pmodal-price').textContent    = `R$ ${fmt(p.preco)}`;
  document.getElementById('pmodal-desc').textContent     = p.desc;

  /* Detalhes (tecido, tipo, etc.) */
  const detailsEl = document.getElementById('pmodal-details');
  detailsEl.innerHTML = Object.entries(p.detalhes).map(([k, v]) =>
    `<div class="pmodal-detail-row"><span>${k.toUpperCase()}</span><span>${v}</span></div>`
  ).join('');

  /* Tamanhos */
  const sizesGrid = document.getElementById('pmodal-sizes-grid');
  sizesGrid.innerHTML = p.tamanhos.map(t =>
    `<button class="size-btn" onclick="selectSize('${t}')" data-size="${t}">${t}</button>`
  ).join('');

  /* Galeria */
  renderGallery(p.imgs);

  /* Botão de compra */
  const buyBtn = document.getElementById('btn-pmodal-buy');
  buyBtn.disabled = !p.estoque;
  buyBtn.textContent = p.estoque ? 'ADICIONAR AO CARRINHO' : 'PRODUTO ESGOTADO';
  if (p.estoque) {
    buyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      ADICIONAR AO CARRINHO`;
  }

  /* Abrir overlay */
  const overlay = document.getElementById('product-modal');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  /* Swipe mobile */
  initGallerySwipe();
}

/** Fecha o modal de produto */
function closePModal() {
  document.getElementById('product-modal').classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

/** Fecha ao clicar no overlay (fora do box) */
function closePModalOutside(e) {
  if (e.target.id === 'product-modal') closePModal();
}

/* ── Galeria de imagens ── */

/** Renderiza a galeria de imagens principal + thumbnails + dots */
function renderGallery(imgs) {
  const mainImg = document.getElementById('gallery-main-img');
  const thumbsEl = document.getElementById('gallery-thumbs');
  const dotsEl   = document.getElementById('gallery-dots');

  mainImg.src = imgs[0] || '';

  /* Thumbnails */
  thumbsEl.innerHTML = imgs.map((src, i) =>
    `<img class="gallery-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="Ângulo ${i+1}"
          onclick="goToGalleryImg(${i})" loading="lazy">`
  ).join('');

  /* Dots */
  dotsEl.innerHTML = imgs.map((_, i) =>
    `<button class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="goToGalleryImg(${i})"
             aria-label="Imagem ${i+1}"></button>`
  ).join('');

  /* Mostrar/esconder botões de nav se só 1 imagem */
  const show = imgs.length > 1;
  document.querySelector('.gallery-prev').style.display = show ? '' : 'none';
  document.querySelector('.gallery-next').style.display = show ? '' : 'none';
}

/**
 * Vai para uma imagem específica da galeria.
 * @param {number} idx - índice da imagem
 */
function goToGalleryImg(idx) {
  if (!currentProduct) return;
  const imgs    = currentProduct.imgs;
  const mainImg = document.getElementById('gallery-main-img');

  /* Fade out → troca → fade in */
  mainImg.classList.add('fade');
  setTimeout(() => {
    currentImgIndex = (idx + imgs.length) % imgs.length;
    mainImg.src = imgs[currentImgIndex];
    mainImg.classList.remove('fade');
  }, 220);

  /* Atualizar thumbs e dots */
  document.querySelectorAll('.gallery-thumb').forEach((t, i) =>
    t.classList.toggle('active', i === currentImgIndex)
  );
  document.querySelectorAll('.gallery-dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentImgIndex)
  );
}

/** Vai para a imagem anterior */
function galleryPrev() { goToGalleryImg(currentImgIndex - 1); }

/** Vai para a próxima imagem */
function galleryNext() { goToGalleryImg(currentImgIndex + 1); }

/** Swipe touch para navegar na galeria no mobile */
function initGallerySwipe() {
  const el = document.querySelector('.gallery-main');
  if (!el) return;

  let touchStartX = 0;

  /* Remove listeners antigos para evitar duplicatas */
  el.removeEventListener('touchstart', onTouchStart);
  el.removeEventListener('touchend',   onTouchEnd);
  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchend',   onTouchEnd,   { passive: true });

  function onTouchStart(e) { touchStartX = e.touches[0].clientX; }
  function onTouchEnd(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return; /* Ignorar micro-swipes */
    diff > 0 ? galleryNext() : galleryPrev();
  }
}

/* ── Tamanhos no modal ── */

/**
 * Seleciona um tamanho no modal de produto.
 * @param {string} size - tamanho selecionado
 */
function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.size === size);
  });
}

/** Adiciona o produto ao carrinho a partir do modal de detalhes */
function addFromModal() {
  if (!currentProduct) return;
  if (!selectedSize) {
    showToast('⚠ SELECIONE UM TAMANHO');
    /* Animação de destaque nos botões de tamanho */
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.style.borderColor = 'rgba(255,80,80,0.7)';
      setTimeout(() => { btn.style.borderColor = ''; }, 1500);
    });
    return;
  }

  cart.push({ ...currentProduct, size: selectedSize, cartId: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  showToast(`✓ ${currentProduct.nome} (${selectedSize}) ADICIONADO`);
  closePModal();
}


/* ════════════════════════════════════════
   7. CARRINHO
════════════════════════════════════════ */

/**
 * Adiciona produto ao carrinho a partir do card do catálogo.
 * @param {string} id - ID do produto
 */
function addToCart(id) {
  const p = PRODUTOS.find(x => x.id === id);
  const sizeEl = document.getElementById(`size-${id}`);
  const size = sizeEl ? sizeEl.value : '';

  if (!size) {
    showToast('⚠ SELECIONE UM TAMANHO');
    sizeEl.style.borderColor = 'rgba(255,80,80,0.6)';
    setTimeout(() => { sizeEl.style.borderColor = ''; }, 1800);
    return;
  }

  cart.push({ ...p, size, cartId: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  showToast(`✓ ${p.nome} (${size}) ADICIONADO`);

  /* Feedback visual no botão */
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) {
    const btn = card.querySelector('.btn-buy');
    const original = btn.innerHTML;
    btn.textContent = '✓ ADICIONADO';
    btn.style.background = '#111';
    btn.style.color = '#25D366';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }
}

/**
 * Remove um item do carrinho pelo cartId único.
 * @param {number} cartId - ID único do item no carrinho
 */
function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  saveCart();
  updateCartUI();
}

/** Persiste o carrinho no localStorage */
function saveCart() {
  localStorage.setItem('psw_cart_v5', JSON.stringify(cart));
}

/** Atualiza toda a UI do carrinho (badge, lista, total) */
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const listEl  = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total');

  /* Animação no badge */
  if (countEl) {
    countEl.textContent = cart.length;
    countEl.style.transform = 'scale(1.5)';
    setTimeout(() => { countEl.style.transform = ''; }, 300);
  }

  /* Lista vazia */
  if (!cart.length) {
    if (listEl) listEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">✝</div>
        <p>SEU CARRINHO ESTÁ VAZIO</p>
        <p style="font-size:11px;margin-top:4px;opacity:0.5;">ADICIONE ALGUM PRODUTO</p>
      </div>`;
    if (totalEl) totalEl.textContent = 'R$ 0,00';
    return;
  }

  /* Itens */
  let total = 0;
  if (listEl) {
    listEl.innerHTML = cart.map(item => {
      total += item.preco;
      return `
        <div class="item-c">
          <img class="item-c-img" src="${item.imgs[0]}" alt="${item.nome}"
               onerror="this.style.display='none'" loading="lazy">
          <div class="item-c-info">
            <strong>${item.nome}</strong>
            <small>TAM: ${item.size} &nbsp;·&nbsp; R$ ${fmt(item.preco)}</small>
          </div>
          <button class="btn-remove" onclick="removeFromCart(${item.cartId})" aria-label="Remover">✕</button>
        </div>`;
    }).join('');
  }

  if (totalEl) totalEl.textContent = `R$ ${fmt(total)}`;
}

/** Abre/fecha o modal do carrinho */
function toggleCart() {
  const modal  = document.getElementById('cart-modal');
  const isOpen = modal.style.display === 'block';
  modal.style.display   = isOpen ? 'none' : 'block';
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

/** Fecha o carrinho ao clicar fora */
function closeCartOutside(e) {
  if (e.target.id === 'cart-modal') toggleCart();
}

/** Envia pedido pelo WhatsApp */
function enviarZap() {
  if (!cart.length) { showToast('⚠ CARRINHO VAZIO'); return; }

  let msg = '🙏 *PEDIDO — PROPÓSITO STREETWEAR*\n\n';
  msg += '*Fé em Movimento · Morada Nova/CE*\n';
  msg += '─────────────────────────\n\n';

  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.nome}*\n   Tamanho: ${item.size}\n   Valor: R$ ${fmt(item.preco)}\n\n`;
  });

  const total = cart.reduce((a, b) => a + b.preco, 0);
  msg += '─────────────────────────\n';
  msg += `*TOTAL: R$ ${fmt(total)}*\n\n`;
  msg += '"Não me envergonho do Evangelho." — Rm 1:16 ✝';

  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
}


/* ════════════════════════════════════════
   8. MODAL DE CONFIRMAÇÃO (limpar carrinho)
   Substitui o confirm() nativo do browser
════════════════════════════════════════ */

/** Abre o modal de confirmação de limpeza */
function promptClearCart() {
  if (!cart.length) return;
  document.getElementById('confirm-modal').classList.add('open');
}

/** Fecha sem limpar */
function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('open');
}

/** Confirma e limpa o carrinho */
function confirmClearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  closeConfirmModal();
  showToast('🗑 CARRINHO LIMPO');
}


/* ════════════════════════════════════════
   9. MENU MOBILE
════════════════════════════════════════ */

/** Toggle do menu hamburguer */
function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  const btn = document.getElementById('menu-toggle');
  const isOpen = nav.classList.contains('open');
  nav.classList.toggle('open');
  btn.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

/** Inicializa fechamento do menu ao clicar em link */
function initNavLinks() {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('open');
      document.getElementById('menu-toggle').classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}


/* ════════════════════════════════════════
   10. EFEITOS VISUAIS
════════════════════════════════════════ */

/** Adiciona classe "scrolled" ao header após 60px */
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/** Efeito parallax suave + animação de entrada do hero */
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  setTimeout(() => bg.classList.add('loaded'), 100);
  window.addEventListener('scroll', () => {
    bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

/** Fade-in com Intersection Observer para seções */
function initScrollFadeIn() {
  const targets = document.querySelectorAll('.highlight-card, .about, .verse-banner, .footer');
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}


/* ════════════════════════════════════════
   11. TOAST
════════════════════════════════════════ */
let toastTimer = null;

/**
 * Exibe uma notificação temporária na base da tela.
 * @param {string} msg - texto da notificação
 */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}


/* ════════════════════════════════════════
   12. ACESSIBILIDADE
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;

  /* Fechar modal de produto */
  if (document.getElementById('product-modal').classList.contains('open')) {
    closePModal(); return;
  }
  /* Fechar modal de confirmação */
  if (document.getElementById('confirm-modal').classList.contains('open')) {
    closeConfirmModal(); return;
  }
  /* Fechar carrinho */
  if (document.getElementById('cart-modal').style.display === 'block') {
    toggleCart(); return;
  }
  /* Fechar menu mobile */
  if (document.getElementById('nav-menu').classList.contains('open')) {
    toggleMenu();
  }
});


/* ════════════════════════════════════════
   UTILITÁRIOS
════════════════════════════════════════ */

/**
 * Formata número como preço em reais (ex: 89.90 → "89,90")
 * @param {number} n
 * @returns {string}
 */
function fmt(n) {
  return n.toFixed(2).replace('.', ',');
}
