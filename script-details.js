// GSAP 애니메이션 (기존 코드)
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// 페이지 로드 시 및 창 크기 변경 시, 실제 뷰포트 높이를 CSS 변수로 설정합니다.
function setVh() {
  // window.innerHeight는 툴바 등을 제외한 실제 뷰포트 높이입니다.
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");

  // 스크롤 이벤트 처리
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // 메뉴 활성화 처리 (예: 클릭 시 active 클래스 추가)
  const menuItems = document.querySelectorAll(".menu-item a");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      menuItems.forEach(link => link.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
    });
  });
});

// HTML, body의 스크롤 설정
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.scrollBehavior = 'smooth'; // 부드러운 스크롤
    document.body.style.overscrollBehavior = 'contain'; // 스크롤 튐 방지
});

window.onload = function() {
  // 헤더 요소들의 애니메이션 활성화 (기존 opacity: 0 문제 해결)
  document.querySelectorAll('header > *').forEach(function(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // 풀스크린 메뉴 관련
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const fullscreenMenu = document.querySelector(".fullscreen-menu");
  const menuClose = document.querySelector('.menu-close');
  const fullscreenLinks = document.querySelectorAll('.fullscreen-menu .nav-link');

  // 햄버거 버튼 클릭 시 풀스크린 메뉴 활성화
 hamburgerMenu.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 잠금
  });

  // 닫기 버튼 클릭 시 풀스크린 메뉴 비활성화
  menuClose.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 잠금 해제
  });

  // 풀스크린 메뉴 링크 클릭 시 메뉴 닫기
  fullscreenLinks.forEach(link => {
    link.addEventListener('click', () => {
      fullscreenMenu.classList.remove('active');
      document.body.style.overflow = ''; // 스크롤 잠금 해제
    });
  });
});
