/**
 * 协宏塑胶官网 - 主交互脚本
 */

(function() {
    'use strict';

    // ========== Hero Carousel ==========
    class HeroCarousel {
        constructor() {
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.dot');
            this.prevBtn = document.querySelector('.carousel-prev');
            this.nextBtn = document.querySelector('.carousel-next');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.autoPlayDelay = 5000;

            if (this.slides.length === 0) return;

            this.init();
        }

        init() {
            // Navigation buttons
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            // Dots
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });

            // Auto play
            this.startAutoPlay();

            // Pause on hover
            const wrapper = document.querySelector('.carousel-wrapper');
            wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
            wrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        goTo(index) {
            this.slides[this.currentIndex].classList.remove('active');
            this.dots[this.currentIndex].classList.remove('active');

            this.currentIndex = index;

            this.slides[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');
        }

        next() {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.goTo(nextIndex);
        }

        prev() {
            const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.goTo(prevIndex);
        }

        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
        }

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }

    // ========== Tab Switching ==========
    class TabSwitcher {
        constructor(tabSelector, panelSelector) {
            this.tabBtns = document.querySelectorAll(tabSelector);
            this.panels = document.querySelectorAll(panelSelector);

            if (this.tabBtns.length === 0) return;

            this.tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-tab');

                    // Update tabs
                    this.tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Update panels
                    this.panels.forEach(p => p.classList.remove('active'));
                    const targetPanel = document.getElementById(targetId);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });
        }
    }

    // ========== Scroll Animations ==========
    class ScrollAnimator {
        constructor() {
            this.elements = document.querySelectorAll(
                '.stat-item, .service-card, .product-card, .news-card, .advantage-block, .brand-item'
            );

            if (this.elements.length === 0) return;

            this.addObserver();
        }

        addObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated', 'fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(el => observer.observe(el));
        }
    }

    // ========== Counter Animation ==========
    class StatCounter {
        constructor() {
            this.statNumbers = document.querySelectorAll('.stat-number');
            this.animated = false;

            if (this.statNumbers.length === 0) return;

            this.observeStats();
        }

        observeStats() {
            const statsRow = document.querySelector('.stats-row');
            if (!statsRow) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animated = true;
                        this.animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(statsRow);
        }

        animateCounters() {
            this.statNumbers.forEach(el => {
                const text = el.textContent;
                const match = text.match(/(\d+)/);
                if (!match) return;

                const target = parseInt(match[1]);
                const unit = text.replace(match[1], '');
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                const suffix = el.querySelector('.stat-unit');
                const suffixText = suffix ? suffix.textContent : '';

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.innerHTML = Math.floor(current) + '<span class="stat-unit">' + suffixText + '</span>';
                }, 16);
            });
        }
    }

    // ========== Back to Top ==========
    class BackToTop {
        constructor() {
            this.btn = document.getElementById('backTop');
            if (!this.btn) return;

            this.init();
        }

        init() {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) {
                    this.btn.classList.add('visible');
                } else {
                    this.btn.classList.remove('visible');
                }
            });

            // Scroll to top on click
            this.btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ========== Sticky Navigation Enhancement ==========
    class StickyNav {
        constructor() {
            this.nav = document.querySelector('.main-nav');
            if (!this.nav) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 200) {
                    this.nav.style.boxShadow = '0 2px 15px rgba(0,0,0,0.2)';
                } else {
                    this.nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }
            });
        }
    }

    // ========== Smooth Scroll for Anchor Links ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 60; // nav height
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== Mobile Menu Toggle ==========
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const navList = document.getElementById('navList');
        if (!toggle || !navList) return;

        toggle.addEventListener('click', () => {
            navList.classList.toggle('mobile-open');
            toggle.textContent = navList.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('mobile-open');
                toggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('mobile-open');
                toggle.textContent = '☰';
            }
        });
    }

    // ========== Initialize Everything ==========
    function init() {
        new HeroCarousel();
        new TabSwitcher('.tab-btn', '.overview-panel');
        new TabSwitcher('.product-tab-btn', '.product-panel');
        new ScrollAnimator();
        new StatCounter();
        new BackToTop();
        new StickyNav();
        initSmoothScroll();
        initMobileMenu();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();