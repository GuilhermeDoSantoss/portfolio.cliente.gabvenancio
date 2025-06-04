// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    setTimeout(() => {
      loadingScreen.style.display = "none"
      // Initialize animations after loading
      initializeAnimations()
    }, 800)
  }, 3000)
})

// ===== NAVIGATION =====
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    navToggle.classList.add("active")
    document.body.style.overflow = "hidden"
  })
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    navToggle.classList.remove("active")
    document.body.style.overflow = "auto"
  })
}

// Remove menu mobile
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    navToggle.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// ===== HEADER SCROLL =====
const header = document.getElementById("header")

function scrollHeader() {
  if (this.scrollY >= 50) {
    header.classList.add("scroll-header")
  } else {
    header.classList.remove("scroll-header")
  }
}

window.addEventListener("scroll", scrollHeader)

// ===== ACTIVE LINK =====
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute("id")
    const link = document.querySelector(".nav__link[href*=" + sectionId + "]")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link?.classList.add("active-link")
    } else {
      link?.classList.remove("active-link")
    }
  })
}

window.addEventListener("scroll", scrollActive)

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Staggered animation for children
        const children = entry.target.querySelectorAll("[data-delay]")
        children.forEach((child, index) => {
          const delay = child.getAttribute("data-delay") || index * 0.1
          setTimeout(() => {
            child.classList.add("animate")
          }, delay * 1000)
        })
      }
    })
  }, observerOptions)

  // Observe all elements with animation classes
  document
    .querySelectorAll(".animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-slide-up")
    .forEach((el) => {
      observer.observe(el)
    })
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".counter")

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-target"))
        const increment = target / 100
        let current = 0

        const updateCounter = () => {
          if (current < target) {
            current += increment
            counter.textContent = Math.ceil(current)
            setTimeout(updateCounter, 30)
          } else {
            counter.textContent = target
          }
        }

        updateCounter()
        counterObserver.unobserve(counter)
      }
    })
  },
  { threshold: 0.5 },
)

counters.forEach((counter) => {
  counterObserver.observe(counter)
})

// ===== TYPING EFFECT =====
const typingElement = document.querySelector(".typing-effect")
if (typingElement) {
  const text = typingElement.textContent
  typingElement.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  setTimeout(typeWriter, 2000)
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("back-to-top")

function scrollTop() {
  if (this.scrollY >= 560) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }
}

window.addEventListener("scroll", scrollTop)

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== CONTACT ACTIONS =====
function openWhatsApp() {
  const message = `Olá Carlos! Vi seu site e gostaria de saber mais sobre seus serviços de personal trainer. Podemos conversar?`
  const whatsappURL = `https://wa.me/+5521976913725?text=${encodeURIComponent(message)}`
  window.open(whatsappURL, "_blank")

  showNotification("Redirecionando para o WhatsApp...", "success")
}

function openEmail() {
  const subject = "Interesse em Personal Training"
  const body =
    "Olá Gabriel,\n\nVi seu site e gostaria de saber mais sobre seus serviços de personal trainer.\n\nAguardo seu contato.\n\nObrigado!"
  const emailURL = `mailto:carlos@fitpro.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = emailURL

  showNotification("Abrindo seu cliente de email...", "success")
}

// ===== TILT EFFECT =====
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transition = "transform 0.1s ease-out"
    })

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transition = "transform 0.3s ease-out"
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll(".btn--magnetic")

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 50

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = x * strength * 0.3
        const moveY = y * strength * 0.3

        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
      }
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0px, 0px) scale(1)"
    })
  })
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero__image, .floating-shape")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// ===== CURSOR TRAIL EFFECT =====
function initCursorTrail() {
  const trail = []
  const trailLength = 20

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div")
    dot.className = "cursor-trail"
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(dot)
    trail.push(dot)
  }

  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animateTrail() {
    let x = mouseX
    let y = mouseY

    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0]

      dot.style.left = x + "px"
      dot.style.top = y + "px"

      if (nextDot) {
        x += (Number.parseFloat(nextDot.style.left) - x) * 0.3
        y += (Number.parseFloat(nextDot.style.top) - y) * 0.3
      }
    })

    requestAnimationFrame(animateTrail)
  }

  animateTrail()
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification--${type}`
  notification.innerHTML = `
    <div class="notification__content">
      <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification__close">
      <i class="fas fa-times"></i>
    </button>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "var(--gradient-primary)" : "var(--gradient-secondary)"};
    color: white;
    padding: 1.5rem 2rem;
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-heavy);
    z-index: 1000;
    transform: translateX(400px) scale(0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
    backdrop-filter: blur(10px);
  `

  notification.querySelector(".notification__content").style.cssText = `
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
  `

  notification.querySelector(".notification__close").style.cssText = `
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: var(--transition);
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0) scale(1)"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification__close")
  closeBtn.addEventListener("click", () => {
    closeNotification(notification)
  })

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "rgba(255, 255, 255, 0.2)"
  })

  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "none"
  })

  // Auto close
  setTimeout(() => {
    if (document.body.contains(notification)) {
      closeNotification(notification)
    }
  }, 5000)
}

function closeNotification(notification) {
  notification.style.transform = "translateX(400px) scale(0.8)"
  notification.style.opacity = "0"
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
    }
  }, 400)
}

// ===== ADVANCED HOVER EFFECTS =====
function initAdvancedHoverEffects() {
  // Service cards
  const serviceCards = document.querySelectorAll(".service__card")
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`

    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".service__icon")
      const glow = card.querySelector(".service__glow")

      icon.style.transform = "scale(1.2) rotate(10deg)"
      glow.style.opacity = "0.2"

      // Add ripple effect
      createRipple(card, event)
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".service__icon")
      const glow = card.querySelector(".service__glow")

      icon.style.transform = "scale(1) rotate(0deg)"
      glow.style.opacity = "0"
    })
  })

  // Testimonial cards
  const testimonialCards = document.querySelectorAll(".testimonial__card")
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.3}s`
  })

  // Pricing cards
  const pricingCards = document.querySelectorAll(".pricing__card")
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("pricing__card--featured")) {
        card.style.transform = "translateY(-15px) scale(1.02)"
      }
    })

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("pricing__card--featured")) {
        card.style.transform = "scale(1.05)"
      } else {
        card.style.transform = "translateY(0) scale(1)"
      }
    })
  })
}

// ===== RIPPLE EFFECT =====
function createRipple(element, event) {
  const ripple = document.createElement("span")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `

  element.style.position = "relative"
  element.style.overflow = "hidden"
  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add ripple animation CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// ===== BUTTON CLICK EFFECTS =====
function initButtonEffects() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent multiple ripples
      const existingRipple = this.querySelector(".btn-ripple")
      if (existingRipple) {
        existingRipple.remove()
      }

      const ripple = document.createElement("span")
      ripple.className = "btn-ripple"
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: btn-ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Add button ripple animation CSS
const btnRippleStyle = document.createElement("style")
btnRippleStyle.textContent = `
  @keyframes btn-ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .btn {
    position: relative;
    overflow: hidden;
  }
`
document.head.appendChild(btnRippleStyle)

// ===== FLOATING ELEMENTS ANIMATION =====
function initFloatingElements() {
  const floatingCards = document.querySelectorAll(".floating-card")
  const floatingShapes = document.querySelectorAll(".floating-shape")

  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`

    // Add random movement
    setInterval(
      () => {
        const randomX = (Math.random() - 0.5) * 10
        const randomY = (Math.random() - 0.5) * 10
        card.style.transform += ` translate(${randomX}px, ${randomY}px)`
      },
      3000 + index * 1000,
    )
  })

  floatingShapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 5}s`
  })
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// ===== INTERSECTION OBSERVER FOR ADVANCED ANIMATIONS =====
function initAdvancedAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target

        // Add specific animations based on element type
        if (element.classList.contains("service__card")) {
          element.style.animation = "slideInUp 0.8s ease-out forwards"
        } else if (element.classList.contains("testimonial__card")) {
          element.style.animation = "fadeInScale 0.8s ease-out forwards"
        } else if (element.classList.contains("pricing__card")) {
          element.style.animation = "slideInBottom 0.8s ease-out forwards"
        } else if (element.classList.contains("stat")) {
          element.style.animation = "bounceIn 0.8s ease-out forwards"
        }

        animationObserver.unobserve(element)
      }
    })
  }, observerOptions)

  // Observe elements for advanced animations
  document.querySelectorAll(".service__card, .testimonial__card, .pricing__card, .stat").forEach((el) => {
    animationObserver.observe(el)
  })
}

// Add advanced animation keyframes
const advancedAnimationsStyle = document.createElement("style")
advancedAnimationsStyle.textContent = `
  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideInBottom {
    0% {
      opacity: 0;
      transform: translateY(-60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`
document.head.appendChild(advancedAnimationsStyle)

// ===== PERFORMANCE OPTIMIZATIONS =====
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
window.removeEventListener("scroll", scrollHeader)
window.removeEventListener("scroll", scrollActive)
window.removeEventListener("scroll", scrollTop)

window.addEventListener("scroll", throttle(scrollHeader, 16))
window.addEventListener("scroll", throttle(scrollActive, 16))
window.addEventListener("scroll", throttle(scrollTop, 16))

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
  // Focus management for mobile menu
  const focusableElements = navMenu.querySelectorAll("a, button")
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  navMenu.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }

    if (e.key === "Escape") {
      navMenu.classList.remove("show-menu")
      navToggle.classList.remove("active")
      navToggle.focus()
      document.body.style.overflow = "auto"
    }
  })

  // Add skip to content link
  const skipLink = document.createElement("a")
  skipLink.href = "#inicio"
  skipLink.textContent = "Pular para o conteúdo principal"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
}

// ===== PRELOAD CRITICAL RESOURCES =====
function preloadResources() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1594381898411-846e7d193883",
  ]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })

  // Preload fonts
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.as = "font"
  fontLink.type = "font/woff2"
  fontLink.href =
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
  fontLink.crossOrigin = "anonymous"
  document.head.appendChild(fontLink)
}

// ===== INITIALIZE ALL FEATURES =====
function initializeAllFeatures() {
  initTiltEffect()
  initMagneticButtons()
  initParallax()
  initAdvancedHoverEffects()
  initButtonEffects()
  initFloatingElements()
  initScrollProgress()
  initAdvancedAnimations()
  initAccessibility()
  preloadResources()

  // Only init cursor trail on desktop
  if (window.innerWidth > 768) {
    initCursorTrail()
  }
}

// ===== RESPONSIVE BEHAVIOR =====
function handleResize() {
  const width = window.innerWidth

  // Disable certain effects on mobile for performance
  if (width <= 768) {
    document.querySelectorAll(".particle").forEach((particle) => {
      particle.style.display = "none"
    })

    document.querySelectorAll(".floating-shape").forEach((shape) => {
      shape.style.animation = "none"
    })
  } else {
    document.querySelectorAll(".particle").forEach((particle) => {
      particle.style.display = "block"
    })

    document.querySelectorAll(".floating-shape").forEach((shape) => {
      shape.style.animation = ""
    })
  }
}

window.addEventListener("resize", debounce(handleResize, 250))

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", () => {
  initializeAllFeatures()
  handleResize()
})

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("Erro capturado:", e.error)
})

// ===== FINAL INITIALIZATION =====
console.log("🏋️ FitPro website com animações avançadas carregado com sucesso!")
console.log("✨ Recursos ativados:")
console.log("- Animações de scroll avançadas")
console.log("- Efeitos de tilt 3D")
console.log("- Botões magnéticos")
console.log("- Efeitos de parallax")
console.log("- Cursor trail (desktop)")
console.log("- Indicador de progresso de scroll")
console.log("- Animações staggered")
console.log("- Efeitos de ripple")
console.log("- Otimizações de performance")
console.log("- Melhorias de acessibilidade")
