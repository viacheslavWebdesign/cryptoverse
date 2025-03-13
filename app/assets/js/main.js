document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const toggler = document.querySelector(".header__toggler");
  const header = document.querySelector(".header");
  const body = document.querySelector(".cstm-body");
  const shadow = document.querySelector(".modal-shadow");

  if (header) {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('header_faded');
      } else {
        header.classList.remove('header_faded');
      }
    });
  }


  if (toggler && header && body && shadow) {
    toggler.addEventListener("click", () => {
      header.classList.toggle("header_active");
      body.classList.toggle("cstm-body_noscroll");
      shadow.classList.toggle("modal-shadow_active");
    });
  }

  const headSection = document.querySelector(".head__section");
  const headTitle = document.querySelector(".head__title");
  const headText = document.querySelector(".head__text");
  const headButton = document.querySelector(".head__btn");
  const headBackground = document.querySelector(".head__bg");
  const headBackgroundHolder = document.querySelector(".head__bg-holder");

  if (headSection && headBackground && headBackgroundHolder && headTitle && headText && headButton) {

    gsap.to(headTitle, {
      y: "0%",
      duration: 1,
      ease: "power1.inOut",
    });

    gsap.to(headText, {
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
      ease: "power1.inOut",
    });

    gsap.to(headButton, {
      opacity: 1,
      y: "0%",
      duration: 0.75,
      delay: 1,
      ease: "power4.inOut",
    });

    gsap.to(headBackgroundHolder, {
      y: "10%",
      opacity: 0,
      scrollTrigger: {
        trigger: headSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(headBackground, {
      x: () => gsap.utils.random("-1%", "1%"),
      y: () => gsap.utils.random("-1%", "1%"),
      scale: () => gsap.utils.random(1.01, 1.03),
      opacity: () => gsap.utils.random(0.5, 0.8),
      duration: () => gsap.utils.random(1.5, 2.5),
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.3,
        from: "random"
      },
      ease: "power1.inOut"
    });

  }

  const servicesSlider = document.querySelector(".services__slider");

  if (servicesSlider) {
    var swiper = new Swiper(servicesSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".services__btn_next",
        prevEl: ".services__btn_prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleTitlesVisibility() {
    const titles = document.querySelectorAll('.title');

    if (titles.length === 0) return;

    titles.forEach(title => {
      if (isInViewport(title)) {
        title.classList.add('title_visible');
      }
    });
  }

  window.addEventListener('scroll', handleTitlesVisibility);
  window.addEventListener('resize', handleTitlesVisibility);


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement && header && body && shadow) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
        header.classList.remove('header_active');
        body.classList.remove('cstm-body_noscroll');
        shadow.classList.remove('modal-shadow_active');
      }
    });
  });

  function checkBookSectionVisibility() {
    const bookSection = document.querySelector('.book__section');

    if (!bookSection) return;

    if (isInViewport(bookSection)) {
      const calendlyContainer = document.querySelector('.book__calendly-holder');
      if (calendlyContainer && !calendlyContainer.hasChildNodes()) {
        calendlyContainer.innerHTML = `
          <div class="book__calendly"><div
            class="calendly-inline-widget"
            data-url="https://calendly.com/viacheslav-webdesign/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0f0e0f&text_color=aeaeae&primary_color=ffd722"
            style="min-width: 280px; height: 600px"
          ></div></div>
        `;

        if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          document.body.appendChild(script);
        }
      }
    }
  }

  window.addEventListener('scroll', checkBookSectionVisibility);
  window.addEventListener('resize', checkBookSectionVisibility);

});
