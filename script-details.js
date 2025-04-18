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

// Slider 용 자바 스크립트 추가//
const sliderContainer = document.querySelector('.slider-container');
const sections = document.querySelectorAll('.slider-container section');
const PaljanavItems = document.querySelectorAll('.nav-helper-container .nav-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;

// 섹션 너비 계산 함수 (기존 코드 유지)
function getSectionWidth() {
  return sections[0].offsetWidth;
}

// 슬라이더 이동 함수
function updateSliderPosition() {
  const sectionWidth = getSectionWidth();
  sliderContainer.style.transform = `translateX(-${currentIndex * sectionWidth}px)`;

  // 활성화된 네비게이션 아이템 업데이트
  PaljanavItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// nav 색깔변화
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector('.sidebar-navigation');
    const sections = document.querySelectorAll('section'); // 모든 섹션 가져오기

    // 섹션 ID와 사이드바 스타일 클래스 매핑
    const sectionMap = {
        "birth-chart": "nav-birthchart",
        "daewoon": "nav-daewoon",
        "sewoon": "nav-sewoon"
    };

    let previousSection = ""; // 이전 섹션 ID를 저장

    // 스크롤 이벤트
    window.addEventListener("scroll", () => {
        let currentSection = "";

        // 현재 보이는 섹션 찾기
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id; // 현재 섹션 ID 저장
            }
        });

        // 사이드바에 섹션별 클래스 적용
        if (currentSection && sectionMap[currentSection]) {
            if (currentSection !== previousSection) {
                // 이전 클래스를 제거하고 새로운 클래스 적용
                sidebar.classList.remove(...Object.values(sectionMap)); // 모든 클래스 제거
                sidebar.classList.add(sectionMap[currentSection]); // 현재 섹션 클래스 추가
                previousSection = currentSection; // 현재 섹션을 이전 섹션으로 업데이트
            }
        } else {
            // 섹션 외부로 벗어나면 기본 스타일 복원
            sidebar.classList.remove(...Object.values(sectionMap));
            previousSection = ""; // 이전 섹션 초기화
        }
    });
});

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

  // 사이드바 네비게이션 관련
  const navItems = document.querySelectorAll('.sidebar-navigation .nav-item');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // 오프셋
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          const target = item.getAttribute('data-section');
          if (target === sectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  });
});
