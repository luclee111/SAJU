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

document.querySelector('.cta-button').addEventListener('click', () => {
  document.querySelector('.slider').scrollIntoView({ behavior: 'smooth' });
});

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

// 화살표 클릭 이벤트
leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});

rightArrow.addEventListener('click', () => {
  if (currentIndex < sections.length - 1) {
    currentIndex++;
    updateSliderPosition();
  }
});

// 네비게이션 아이템 클릭 이벤트
PaljanavItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateSliderPosition();
  });
});

// 네비게이션 아이템에 호버 효과 추가
PaljanavItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('hover-active');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('hover-active');
  });
});


// 창 크기 변경 시 슬라이더 위치 재조정 (기존 코드 유지)
window.addEventListener('resize', () => {
  updateSliderPosition();
});

// 초기 상태 설정
updateSliderPosition();

// ------------------- 왕관 차트 관련 JavaScript -------------------

const subHoverSubMapping = {
  '자립성': {
    0: { sub: '부드러운 YES맨', hoverSub: '줏대제로' },
    1: { sub: '평화주의자', hoverSub: '프로 눈치러' },
    2: { sub: '분위기 메이커', hoverSub: '결정장애' },
    3: { sub: '전문 중재인', hoverSub: '기회주의자' },
    4: { sub: '자기주도형 인재', hoverSub: '고집불통' },
    5: { sub: '넘사벽', hoverSub: '폭주기관차' }
  },
  '표현력': {
    0: { sub: '침묵은 금', hoverSub: '소통불능' },
    1: { sub: 'ASMR', hoverSub: '할말하않' },
    2: { sub: '담백이', hoverSub: '소심이' },
    3: { sub: '핵인싸 소통왕', hoverSub: '투머치 토커' },
    4: { sub: '스트리머', hoverSub: '허언증 초기' },
    5: { sub: '연예대상감', hoverSub: '팩폭격기' }
  },
  '현실적': {
    0: { sub: '낭만주의자', hoverSub: '프로적자러' },
    1: { sub: '소확행 추구', hoverSub: '텅장 유발자' },
    2: { sub: '성실한 월급쟁이', hoverSub: '소극적 투자자' },
    3: { sub: '점진적 우상향', hoverSub: '융통성 제로' },
    4: { sub: '아마추어 투자가', hoverSub: '짠돌이' },
    5: { sub: '본투비 CEO', hoverSub: '돈미새' }
  },
  '책임감': {
    0: { sub: '자유로운 영혼', hoverSub: '책임회피 끝판왕' },
    1: { sub: '선택적 모범생', hoverSub: '쿨병 말기' },
    2: { sub: '무난한 모범생', hoverSub: '소극적 월급루팡' },
    3: { sub: '완벽한 모범생', hoverSub: '자라나는 꼰싹' },
    4: { sub: '완벽주의 리더', hoverSub: '숨막히는 원칙주의자' },
    5: { sub: '카리스마 리더', hoverSub: '갑질 빌런' }
  },
  '사고력': {
    0: { sub: '본능적 직진러', hoverSub: '막무가내 무대뽀' },
    1: { sub: '자라나는 새싹', hoverSub: '겉핥기형 지식인' },
    2: { sub: '아이디어 수집봇', hoverSub: '피상적 분석가' },
    3: { sub: '뇌섹인', hoverSub: '고민 인형' },
    4: { sub: '힙한 탐구생활', hoverSub: '방구석 외톨이' },
    5: { sub: '천재적 몽상가', hoverSub: '현실 도피 크리에이터' }
  }
};

const detailMapping = {
  '자립성': {
    a: {
      0: { detail: '주체성이 약해 쉽게 휘둘림', summary: '자기 주장 연습 및 자아 강화', summary2: '거울 앞에서 자기 의견 말하기, 혼자 여행하기' },
      1: { detail: '온화하나 주관이 약함', summary: '자신의 생각을 표현하고 조금씩 주도권 잡기', summary2: '일기 쓰기, 혼자서 결정을 내리고 행동하기' },
      2: { detail: '부드럽게 조율하지만 우유부단함', summary: '자신의 의견을 분명히 표현하기', summary2: 'YES/NO 명확히 답하기, 대화에서 의견 내기' },
      3: { detail: '균형 잡힌 협력과 독립성', summary: '상황에 따라 유연하게 대처하기', summary2: '팀 프로젝트 리더 역할 맡기, 결정 후 책임지기' },
      4: { detail: '주체성이 강하나 고집이 셀 수 있음', summary: '타인의 의견을 존중하고 수용하기', summary2: '반대 의견 경청하기, 피드백 받기' },
      5: { detail: '독자적으로 강력한 존재감을 드러냄', summary: '타인과의 협력을 통해 유연성 기르기', summary2: '협동 프로젝트 참여하기' }
    },
    b: {
      0: { detail: '경쟁력이 약하고 쉽게 포기함', summary: '도전정신을 기르고 자기 보호 능력 강화하기', summary2: '새로운 일에 도전하기, 자기 방어 훈련' },
      1: { detail: '부드럽게 협력하지만 소극적임', summary: '적극적으로 자신의 입장을 표출하기', summary2: '자기 주장하는 연습, 회의에서 의견 내기' },
      2: { detail: '온건한 경쟁력, 갈등을 피하려 함', summary: '때로는 강하게 밀고 나가는 결단력 기르기', summary2: '경쟁 상황에 도전해보기, 새로운 목표 설정' },
      3: { detail: '경쟁과 협력을 균형 있게 활용', summary: '목표 지향적인 사고 기르기', summary2: '리더 역할 맡기, 도전 과제 설정하기' },
      4: { detail: '도전적이고 추진력이 강함', summary: '	융통성과 조화를 배우기', summary2: '협업 프로젝트 참여하기, 피드백 반영하기' },
      5: { detail: '승부욕이 강하고 독보적임', summary: '지나친 경쟁심을 조절하기', summary2: '협력 활동 연습하기, 팀워크 강화하기' }
    }
  },
  '표현력': {
    a: {
  0: { detail: '표현력이 거의 없어 의사소통이 어려운 상태', summary: '표현 훈련과 자기표현 연습 필요', summary2: '일기 쓰기, 말하기 연습하기' },
  1: { detail: '신중하나 표현력이 부족함', summary: '자기 생각을 드러내는 연습하기', summary2: '대화 주도하기, 발표 연습하기' },
  2: { detail: '차분하지만 표현이 소극적임', summary: '자신감을 기르고 적극적으로 표현하기', summary2: '토론 참여하기, 글쓰기 강화' },
  3: { detail: '친근하게 소통하며 아이디어가 풍부함', summary: '표현의 깊이와 설득력 강화하기', summary2: '콘텐츠 제작하기, 블로그 운영하기' },
  4: { detail: '설득력이 뛰어나지만 과다한 표현 경향 있음', summary: '절제력과 간결함을 배우기', summary2: '강연, 연설 연습하기' },
  5: { detail: '표현력이 뛰어나지만 과격할 수 있음', summary: '온화하고 균형 있게 표현하기', summary2: '명상, 대화의 온도 조절하기' }
},
    b: {
  0: { detail: '자기 표현이 서툴러 소통이 단절됨', summary: '표현력과 의사소통 훈련 필요', summary2: '간단한 말부터 연습하기, 질문 받기 연습' },
  1: { detail: '여전히 자기표현이 부족함', summary: '부드럽게 표현하는 연습하기', summary2: '피드백 연습, 타인에게 의견 말하기' },
  2: { detail: '솔직하게 표현하나 논리가 부족함', summary: '자기 주장을 논리적으로 펼치는 훈련 필요', summary2: '글쓰기 연습, 말하기 코칭 수강' },
  3: { detail: '논리적 표현력과 설득력을 지님', summary: '부드럽게 의견을 조율하는 연습 필요', summary2: '협상 연습, 경청 연습하기' },
  4: { detail: '예리한 표현력으로 강력한 인상을 줌', summary: '온화한 표현으로 상대를 배려하기', summary2: '감정 조절 훈련, 피드백 조화롭게 받기' },
  5: { detail: '뛰어난 통찰력과 날카로운 표현으로 상대를 압도하나 공격적임', summary: '따뜻한 소통의 중요성을 배우기', summary2: '칭찬 연습, 긍정적 피드백 주기' }
}
  },
   '현실적': {
    a: {
  0: { detail: '현실적인 목표나 물질적 관심이 거의 없는 상태', summary: '실리적 목표를 설정하고 현실 감각 기르기', summary2: '가계부 작성하기, 목표 저축 설정하기' },
  1: { detail: '표현력이 뛰어나지만 공격적일 수 있음', summary: '현실적인 목표를 설정하고 꾸준히 실천하기', summary2: '저축 목표 세우기, 투자 기초 학습' },
  2: { detail: '근면하지만 효율성이 부족할 수 있음', summary: '효율성과 계획성을 강화하기', summary2: '주간 계획표 작성하기, 성과 분석하기' },
  3: { detail: '현실을 잘 파악하고 꾸준히 노력함', summary: '새로운 기회를 포착하는 능력 기르기', summary2: '투자 공부하기, 정보 수집하기' },
  4: { detail: '전략적이고 목표지향적이나 융통성이 부족함', summary: '유연성과 창의성을 함께 활용하기', summary2: '투자 리스크 분석하기, 다양한 방법 탐색하기' },
  5: { detail: '현실감각이 뛰어나지만 지나친 물질집착 우려', summary: '물질 외 가치도 추구하며 균형 맞추기', summary2: '여행하기, 자기개발 위한 지출하기' }
},
    b: {
  0: { detail: '물질적 감각이 약하고 기회를 잘 잡지 못함', summary: '기회를 포착하는 감각을 기르기', summary2: '시장 조사하기, 정보 수집하기' },
  1: { detail: '기회를 보지만 실행력이 부족함', summary: '기회 포착 능력 강화 필요', summary2: '소규모 투자 시도하기, 창업 연구하기' },
  2: { detail: '현실감각은 있으나 결단력이 부족함', summary: '기회 활용 능력 강화', summary2: '투자 공부하기, 리스크 관리하기' },
  3: { detail: '기회를 잘 포착하고 유연하게 대처함', summary: '유연성과 결단력을 조화롭게 사용하기', summary2: '포트폴리오 다각화, 다양한 기회 탐색' },
  4: { detail: '뛰어난 기회 감각이나 무모함이 문제', summary: '과도한 욕심을 조절하며 균형 잡기', summary2: '위험 관리 연습, 투자 원칙 수립' },
  5: { detail: '타고난 승부사이나 지나친 욕심 우려', summary: '경제적 성취를 안정적으로 유지하기', summary2: '장기적 투자 계획 수립, 전문가와 협력하기' }
}
  },
   '책임감': {
    a: {
  0: { detail: '규칙과 제도에 대한 인식이 매우 약한 상태', summary: '책임의 중요성을 배우기', summary2: '작은 책임을 맡기, 규칙 지키기' },
  1: { detail: '부드럽지만 책임감이 약함', summary: '점진적으로 책임감을 키우기', summary2: '일정 관리하기, 맡은 일 끝까지 하기' },
  2: { detail: '부드럽지만 책임감이 약함', summary: '유연성과 실용성을 함께 활용하기', summary2: '리더십 책 읽기, 다양한 역할 맡기' },
  3: { detail: '책임감이 강하며 조직에서 신뢰받음', summary: '리더십과 실무 능력을 균형 있게 유지하기', summary2: '팀워크 강화, 새로운 프로젝트 시도하기' },
  4: { detail: '철저하고 완벽주의적이나 지나치게 경직됨', summary: '융통성과 유연함을 기르기', summary2: '실수 인정하기, 피드백 수용하기' },
  5: { detail: '완벽주의로 인해 과도한 통제 경향', summary: '지나친 완벽주의 조절하기', summary2: '역할 위임하기, 협업 강화하기' }
},
    b: {
  0: { detail: '도전 의지가 부족하고 외부 압력에 약함', summary: '도전 정신과 결단력 기르기', summary2: '새로운 과제 시도하기, 작은 도전 시작하기' },
  1: { detail: '부드럽게 대처하지만 압박에 약함', summary: '실천력을 기르기 위한 경험 필요', summary2: '발표 연습하기, 모의 면접 준비하기' },
  2: { detail: '도전 의식은 있으나 결단력 부족', summary: '결단력과 추진력 강화하기', summary2: '시간 제한 내 결정하기, 목표 달성하기' },
  3: { detail: '강한 도전 의지와 추진력 보유', summary: '도전과 협력을 균형 있게 유지하기', summary2: '협업 프로젝트 참여하기, 리더 역할 맡기' },
  4: { detail: '도전 정신이 강하나 지나치게 강경할 수 있음', summary: '협력을 배우고 신뢰를 구축하기', summary2: '멘토링 받기, 피드백 반영하기' },
  5: { detail: '지나치게 강한 통제력과 독단적인 경향', summary: '지나친 독선 조절하기', summary2: '타인의 의견 수용하기, 협력 활동 참여하기' }
}
  },
   '사고력': {
    a: {
  0: { detail: '자기 내면에 대한 성찰과 보호력이 전무한 상태', summary: '기초 학습과 사고력 기르기', summary2: '독서하기, 강의 듣기' },
  1: { detail: '기초 학습은 잘 하지만 깊이 부족', summary: '깊이 있는 사고력 기르기', summary2: '철학 책 읽기, 노트 필기하기' },
  2: { detail: '차분하고 안정적이나 결단력 부족', summary: '분석력과 실행력 강화하기', summary2: '목표 설정하기, 실천 계획 세우기' },
  3: { detail: '깊이 있는 사고력과 학습 능력 보유', summary: '실행과 사고의 균형 유지하기', summary2: '즉시 실천하기, 피드백 받기' },
  4: { detail: '분석력은 뛰어나나 현실감 부족', summary: '이론과 현실을 연결하기', summary2: '토론 참여하기, 경험 공유하기' },
  5: { detail: '지나치게 이론적이고 현실을 무시할 위험', summary: '지나친 이상주의 조절하기', summary2: '현실 기반 목표 설정하기, 경험 중심 학습하기' }
},
    b: {
  0: { detail: '창의력과 융통성이 부족해 새로운 상황에 적응이 어려운 상태', summary: '창의적 사고력 기르기', summary2: '예술 작품 감상하기, 다양한 경험 해보기' },
  1: { detail: '감각은 있으나 깊이가 부족함', summary: '직관력과 응용력 기르기', summary2: '창의적 글쓰기, 문제 해결 훈련하기' },
  2: { detail: '독특한 아이디어를 내지만 지속성 부족', summary: '지속적인 발전을 위해 꾸준히 노력하기', summary2: '아이디어 기록하기, 계획표 작성하기' },
  3: { detail: '창의성과 직관력이 뛰어나며 독창적임', summary: '현실성과 실행력을 강화하기', summary2: '프로젝트 참여하기, 아이디어 실천하기' },
  4: { detail: '지나치게 독특하여 현실과 괴리될 수 있음', summary: '현실과 이상을 조화시키기', summary2: '구체적인 목표 설정하기, 피드백 받기' },
  5: { detail: '타의 추종을 불허하는 독창성이 지나쳐 이해받기 힘들 위험', summary: '지나친 독창성을 조절하기', summary2: '타인과 협업하기, 다양한 관점 수용하기' }
}
  }
};

//여기다가 점수 입력하면 댐
const parameters = [
  { name: '자립성', a: 1, b: 0, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Bigeop.png' },
  { name: '표현력', a: 4, b: 0, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Siksang.png' },
  { name: '현실적', a: 0, b: 2, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Jaesung.png' },
  { name: '책임감', a: 0, b: 2, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Gwansung.png' },
  { name: '사고력', a: 1, b: 2, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Inseong.png' },
];

parameters.forEach(param => {
  param.level = param.a + param.b;
  const mapping = subHoverSubMapping[param.name][param.level];
  param.sub = mapping.sub;
  param.hoverSub = mapping.hoverSub;

  // Set parameter details
  param.details = {
    detail1: `점수: ${param.a}, ${detailMapping[param.name].a[param.a].detail}`,
    detail2: `점수: ${param.b}, ${detailMapping[param.name].b[param.b].detail}`,
    summary: `${detailMapping[param.name].a[param.a].summary}, ${detailMapping[param.name].b[param.b].summary}`,
    summary2: `${detailMapping[param.name].a[param.a].summary2}, ${detailMapping[param.name].b[param.b].summary2}`
  };
});

// 파라미터 라벨 그룹에 hover 이벤트 추가 함수
function addHoverEffectToParamLabels() {
  const paramLabelGroups = document.querySelectorAll('.param-label-group, .reverse-param-label-group');
  
  paramLabelGroups.forEach((group, index) => {
    const subLabelElement = group.querySelector('text:nth-child(3)');
    const originalSubText = subLabelElement.textContent;
    const hoverText = parameters[index].hoverSub;
    
    // 트랜지션 애니메이션을 위한 스타일 추가
    subLabelElement.style.transition = 'all 0.3s ease-in-out';
    
    group.addEventListener('mouseenter', () => {
      // 색상과 크기 변경을 부드럽게
      subLabelElement.style.opacity = '0.7';
      subLabelElement.style.transform = 'scale(1.05)';
      
      // 텍스트 페이드 아웃 후 페이드 인 효과
      subLabelElement.style.opacity = '0';
      setTimeout(() => {
        subLabelElement.textContent = hoverText;
        subLabelElement.style.opacity = '1';
        subLabelElement.style.color = '#666'; // 약간 회색빛 강조
      }, 150);
    });
    
    group.addEventListener('mouseleave', () => {
      // 원래 상태로 복귀
      subLabelElement.style.opacity = '0';
      setTimeout(() => {
        subLabelElement.textContent = originalSubText;
        subLabelElement.style.opacity = '1';
        subLabelElement.style.color = 'black';
        subLabelElement.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// 페이지 로드 후 호버 효과 초기화
document.addEventListener('DOMContentLoaded', addHoverEffectToParamLabels);

// SVG 크기 및 베이스 설정
const svgW = 1100, svgH = 800;
const centerX = 650;      // 450
const centerY = 470;           // y=410
const baseRadius = 180;        // 베이스 원 반지름
const maxSpikeLength = 200;    // 최대 스파이크 길이 (레벨5)

// 각도 범위 (실제 파라미터 5개, 가상 베이스점 7개)
// 실제 파라미터에 해당하는 베이스점은 인덱스 1 ~ 5.
// 기본 각도 범위: 40° ~ 140°
const baseAngleStart = deg2rad(40);
const baseAngleEnd   = deg2rad(140);
// 실제 파라미터 간격: 4등분
const baseAngleStep = (baseAngleEnd - baseAngleStart) / (5 - 1);

// 전체 베이스점은 7개 (인덱스 0 ~ 6; 왼쪽 가상(B_-1), 오른쪽 가상(B_5))
const baseCount = 7;
const extraStep = baseAngleStep; // 양쪽 각각 하나씩
const angleStartTotal = baseAngleStart - extraStep;
const angleEndTotal   = baseAngleEnd + extraStep;
const totalBaseStep = (angleEndTotal - angleStartTotal) / (baseCount - 1);

// Helper: degrees to radians
function deg2rad(d) {
  return d * Math.PI / 180;
}

// DOM 요소 선택
const svg = document.querySelector('#crown-chart svg');
const baseCircleEl = document.getElementById('base-circle');
const blackCrownPathEl = document.getElementById('black-crown-path');
const orangeCrownPathEl = document.getElementById('orange-crown-path');

// 그라데이션 정의를 위한 defs 요소 추가
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
svg.appendChild(defs);

// 디버깅을 위한 코드: SVG 영역에 테두리 필요할 때 다시 추가하기
//svg.setAttribute("style", "border: 1px solid red;");

// 1) 베이스 원 세팅
baseCircleEl.setAttribute('cx', centerX);
baseCircleEl.setAttribute('cy', centerY);
baseCircleEl.setAttribute('r', baseRadius.toString());

// 중앙점과 베이스 원 중심 표시 (디버깅용)
const centerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
centerDot.setAttribute("cx", centerX);
centerDot.setAttribute("cy", centerY);
centerDot.setAttribute("r", "5");
centerDot.setAttribute("fill", "none");
svg.appendChild(centerDot);

// Helper: 두 점의 중간점 계산
function midpoint(p1, p2) {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}

// (A) 베이스점 생성 (총 7개: 인덱스 0~6)
const basePoints = [];
for (let i = 0; i < baseCount; i++) {
  const angle = angleStartTotal + i * totalBaseStep;
  const bx = centerX + baseRadius * Math.cos(angle);
  const by = centerY - baseRadius * Math.sin(angle);
  basePoints.push({ x: bx, y: by });
}

// (B) 중간점 생성 (basePoints 인접 점들의 중간, 총 6개)
const midPoints = [];
for (let i = 0; i < basePoints.length - 1; i++) {
  midPoints.push(midpoint(basePoints[i], basePoints[i + 1]));
}

// 곡선형 다이아몬드 아이콘 생성 함수 (수정됨)
function createCurvedDiamondIcon(cx, cy, level, maxLevel) {
  const NS = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(NS, "g");
  group.setAttribute("transform", `translate(${cx},${cy})`);
  
  // 파라미터의 최대 레벨 이하이면 아이콘 크기를 최대 크기(12)로 적용
  const enlarged = (level <= maxLevel && level > 0);
  const baseSize = enlarged ? 10 : 7;
  const pointDist = baseSize;
  const curveFactor = baseSize * 0.2;
  
  // 곡선형 다이아몬드 생성
  const diamond = document.createElementNS(NS, "path");
  
  // 상단, 오른쪽, 하단, 왼쪽 포인트
  const topPoint = { x: 0, y: -pointDist };
  const rightPoint = { x: pointDist, y: 0 };
  const bottomPoint = { x: 0, y: pointDist };
  const leftPoint = { x: -pointDist, y: 0 };
  
  // 각 포인트를 연결하는 곡선 경로
  const path = `
    M ${topPoint.x},${topPoint.y}
    C ${-curveFactor},${-curveFactor} ${-curveFactor},${-curveFactor} ${leftPoint.x},${leftPoint.y}
    C ${-curveFactor},${curveFactor} ${-curveFactor},${curveFactor} ${bottomPoint.x},${bottomPoint.y}
    C ${curveFactor},${curveFactor} ${curveFactor},${curveFactor} ${rightPoint.x},${rightPoint.y}
    C ${curveFactor},${-curveFactor} ${curveFactor},${-curveFactor} ${topPoint.x},${topPoint.y}
    Z
  `;
  
  diamond.setAttribute("d", path);
  diamond.setAttribute("fill", "#ffffff");
  diamond.setAttribute("stroke", enlarged ? "#ffffff" : "#999");
  diamond.setAttribute("stroke-width", "1");
  
  group.appendChild(diamond);
  
  // 아이콘 주변 원은 오직 최대 레벨에 해당할 때만 추가
  if (level === maxLevel) {
    const circle = document.createElementNS(NS, "circle");
    circle.setAttribute("cx", "0");
    circle.setAttribute("cy", "0");
    circle.setAttribute("r", pointDist + 4);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#ffffff");
    circle.setAttribute("stroke-width", "1.5");
    circle.setAttribute("opacity", "0.8");
    group.insertBefore(circle, diamond);
  }
  
  return group;
}

// (C) 각 파라미터에 대해 스파이크 계산 (실제 파라미터는 베이스점 인덱스 1~5)
const topPoints = [];   // 최대 레벨 꼭짓점 (T_i, 레벨5)
const apexPoints = [];  // 실제 레벨 꼭짓점 (A_i)
for (let i = 0; i < parameters.length; i++) {
  const param = parameters[i];
  const bIndex = i + 1; // 실제 파라미터에 해당하는 베이스점
  const angle = angleStartTotal + bIndex * totalBaseStep;

  // 최대 레벨 꼭짓점 (T_i)
  const distT = baseRadius + maxSpikeLength;
  const tx = centerX + distT * Math.cos(angle);
  const ty = centerY - distT * Math.sin(angle);
  topPoints.push({ x: tx, y: ty });

  // 실제 레벨 꼭짓점 (A_i)
  const frac = param.level / 5;
  const distA = baseRadius + maxSpikeLength * frac;
  const ax = centerX + distA * Math.cos(angle);
  const ay = centerY - distA * Math.sin(angle);
  apexPoints.push({ x: ax, y: ay });

  // (D) 옅은 회색 스파이크 선: 베이스점[bIndex] → T_i
  const bp = basePoints[bIndex];
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", bp.x);
  line.setAttribute("y1", bp.y);
  line.setAttribute("x2", tx);
  line.setAttribute("y2", ty);
  line.setAttribute("class", "gray-spike-line");
  svg.appendChild(line);

  // (E) 레벨 아이콘: 곡선형 다이아몬드 모양 아이콘
  for (let lv = 1; lv <= 5; lv++) {
    const lvFrac = lv / 5;
    const distLv = baseRadius + maxSpikeLength * lvFrac;
    const cxPoint = centerX + distLv * Math.cos(angle);
    const cyPoint = centerY - distLv * Math.sin(angle);
    const diamond = createCurvedDiamondIcon(cxPoint, cyPoint, lv, param.level);
    svg.appendChild(diamond);
  }

  // (F) 파라미터 라벨: 인성과 관성은 다른 레이아웃 적용
  const labelOffset = 30; // 오프셋 값 증가
  const lx = tx + 10 * Math.cos(angle);
  const ly = ty - 30 * Math.sin(angle) - labelOffset;
  
  const paramName = param.name;
  if (paramName === '사고력' || paramName === '책임감') {
    const labelGroup = createReverseParamLabelGroup(param.name, param.sub, param.level, param.iconUrl, lx, ly);
    svg.appendChild(labelGroup);
    } else if (paramName === '현실적') {
  const labelGroup = createCentralParamLabelGroup(param.name, param.sub, param.level, param.iconUrl, lx, ly);
  svg.appendChild(labelGroup);
  } else {
    const labelGroup = createParamLabelGroup(param.name, param.sub, param.level, param.iconUrl, lx, ly);
    svg.appendChild(labelGroup);
  }
}

// (G) createParamLabelGroup 함수: 기본 레이아웃 (아이콘 → 숫자 → 텍스트)
function createParamLabelGroup(paramName, subLabel, score, iconUrl, x, y) {
  const NS = "http://www.w3.org/2000/svg";
  const g = document.createElementNS(NS, "g");
  g.setAttribute("transform", `translate(${x}, ${y})`);
  g.setAttribute("class", "param-label-group");

  const icon = document.createElementNS(NS, "image");
  icon.setAttribute("href", iconUrl);
  icon.setAttribute("width", "160");
  icon.setAttribute("height", "160");
  icon.setAttribute("x", "8");
  icon.setAttribute("y", "-40");
  g.appendChild(icon);

  const mainText = document.createElementNS(NS, "text");
  mainText.textContent = paramName;
  mainText.setAttribute("x", "165");
  mainText.setAttribute("y", "0");
  mainText.setAttribute("fill", "#ffffff");
  mainText.setAttribute("font-size", "30");
  mainText.setAttribute("text-anchor", "start");
  g.appendChild(mainText);

  const subText = document.createElementNS(NS, "text");
  subText.textContent = subLabel;
  subText.setAttribute("x", "165");
  subText.setAttribute("y", "25");
  subText.setAttribute("fill", "#cccccc");
  subText.setAttribute("font-size", "20");
  subText.setAttribute("text-anchor", "start");
  g.appendChild(subText);

  const scoreText = document.createElementNS(NS, "text");
  scoreText.textContent = String(score);
  scoreText.setAttribute("x", "155");
  scoreText.setAttribute("y", "8");
  scoreText.setAttribute("fill", "#ffffff");
  scoreText.setAttribute("font-size", "60");
  scoreText.setAttribute("font-weight", "bold");
  scoreText.setAttribute("text-anchor", "end");
  g.appendChild(scoreText);

  return g;
}

// (G-1) createCentralParamLabelGroup 함수: 기본 레이아웃 (아이콘 → 숫자 → 텍스트)
function createCentralParamLabelGroup(paramName, subLabel, score, iconUrl, x, y) {
  const NS = "http://www.w3.org/2000/svg";
  const g = document.createElementNS(NS, "g");
  g.setAttribute("transform", `translate(${x}, ${y})`);
  g.setAttribute("class", "param-label-group");

  const icon = document.createElementNS(NS, "image");
  icon.setAttribute("href", iconUrl);
  icon.setAttribute("width", "160");
  icon.setAttribute("height", "160");
  icon.setAttribute("x", "-80");
  icon.setAttribute("y", "-100");
  g.appendChild(icon);

  const mainText = document.createElementNS(NS, "text");
  mainText.textContent = paramName;
  mainText.setAttribute("x", "100");
  mainText.setAttribute("y", "-20");
  mainText.setAttribute("fill", "#ffffff");
  mainText.setAttribute("font-size", "30");
  mainText.setAttribute("text-anchor", "start");
  g.appendChild(mainText);

  const subText = document.createElementNS(NS, "text");
  subText.textContent = subLabel;
  subText.setAttribute("x", "100");
  subText.setAttribute("y", "5");
  subText.setAttribute("fill", "#cccccc");
  subText.setAttribute("font-size", "20");
  subText.setAttribute("text-anchor", "start");
  g.appendChild(subText);

  const scoreText = document.createElementNS(NS, "text");
  scoreText.textContent = String(score);
  scoreText.setAttribute("x", "90");
  scoreText.setAttribute("y", "-15");
  scoreText.setAttribute("fill", "#ffffff");
  scoreText.setAttribute("font-size", "60");
  scoreText.setAttribute("font-weight", "bold");
  scoreText.setAttribute("text-anchor", "end");
  g.appendChild(scoreText);

  return g;
}


// (H) createReverseParamLabelGroup 함수: 인성과 관성용 레이아웃 (텍스트 → 숫자 → 아이콘)
function createReverseParamLabelGroup(paramName, subLabel, score, iconUrl, x, y) {
  const NS = "http://www.w3.org/2000/svg";
  const g = document.createElementNS(NS, "g");
  g.setAttribute("transform", `translate(${x}, ${y})`);
  g.setAttribute("class", "reverse-param-label-group");

  const icon = document.createElementNS(NS, "image");
  icon.setAttribute("href", iconUrl);
  icon.setAttribute("width", "160");
  icon.setAttribute("height", "160");
  icon.setAttribute("x", "-160");
  icon.setAttribute("y", "-70");
  g.appendChild(icon);

  const mainText = document.createElementNS(NS, "text");
  mainText.textContent = paramName;
  mainText.setAttribute("x", "-160");
  mainText.setAttribute("y", "-30");
  mainText.setAttribute("fill", "#ffffff");
  mainText.setAttribute("font-size", "30");
  mainText.setAttribute("text-anchor", "end");
  g.appendChild(mainText);

  const subText = document.createElementNS(NS, "text");
  subText.textContent = subLabel;
  subText.setAttribute("x", "-160");
  subText.setAttribute("y", "-5");
  subText.setAttribute("fill", "#cccccc");
  subText.setAttribute("font-size", "20");
  subText.setAttribute("text-anchor", "end");
  g.appendChild(subText);

  const scoreText = document.createElementNS(NS, "text");
  scoreText.textContent = String(score);
  scoreText.setAttribute("x", "-120");
  scoreText.setAttribute("y", "-20");
  scoreText.setAttribute("fill", "#ffffff");
  scoreText.setAttribute("font-size", "60");
  scoreText.setAttribute("font-weight", "bold");
  scoreText.setAttribute("text-anchor", "end");
  g.appendChild(scoreText);

  return g;
}

// (I) 왕관 Path 생성 함수 (M0부터 M5까지 직선 연결)
// 순서: M0 -> 각 파라미터: L (apex value) -> L (midPoint) -> ... -> 마지막 midPoint -> L M0 -> Z
function buildCrownPath(apexArr) {
  let d = `M ${midPoints[0].x},${midPoints[0].y} `;
  for (let i = 0; i < apexArr.length; i++) {
    d += `L ${apexArr[i].x},${apexArr[i].y} `;
    if (i < midPoints.length - 1) {
      d += `L ${midPoints[i+1].x},${midPoints[i+1].y} `;
    }
  }
  d += `L ${midPoints[midPoints.length - 1].x},${midPoints[midPoints.length - 1].y} `;
  d += `L ${midPoints[0].x},${midPoints[0].y} `;
  d += `Z`;
  return d;
}

// (J) 검은색 왕관 Path (최대 레벨, topPoints)
const blackPathD = buildCrownPath(topPoints);
blackCrownPathEl.setAttribute("d", blackPathD);

// (K) 노란색 왕관 Path (실제 레벨, apexPoints)
const orangePathD = buildCrownPath(apexPoints);
orangeCrownPathEl.setAttribute("d", orangePathD);
orangeCrownPathEl.setAttribute("fill", "rgba(255,255,0,0.6)");

// 파라미터 상세 정보_2
const parameterDetails = parameters.reduce((acc, param) => {
  acc[param.name] = {
    description: param.name === '자립성' ? '나를 지키고 성장시키는 내 안의 힘.' :
                  param.name === '표현력' ? '내 생각과 재능을 세상에 드러내는 능력' :
                  param.name === '현실적' ? '세상 속에서 내가 원하는 것을 얻어내는 능력.' :
                  param.name === '책임감' ? '사회와 조직 속에서 내 역할과 지위를 지키는 힘.' :
                  param.name === '사고력' ? '내면의 안정과 지혜를 길러주는 힘.' : '',
    characteristics: param.name === '자립성' ? ['자기 주도권', '존재감', '경쟁 관계', '승부욕', '고집'] :
                     param.name === '표현력' ? ['표현력', '창의력', '결과주의', '끼', '말솜씨'] :
                     param.name === '현실적' ? ['현실감각', '수입', '일 처리 능력', '추진력', '성공욕'] :
                     param.name === '책임감' ? ['책임감', '리더십', '위계/규칙'] :
                     param.name === '사고력' ? ['지혜', '멘탈관리', '학습능력', '돌봄', '성찰'] : [],
    score: param.level,
    detail1: param.details.detail1,
    detail2: param.details.detail2,
    summary: param.details.summary,
    summary2: param.details.summary2,
    icon: param.name === '자립성' ? '💪' :
          param.name === '표현력' ? '🎤' :
          param.name === '현실적' ? '📊' :
          param.name === '책임감' ? '⚖️' :
          param.name === '사고력' ? '🔍' : ''
  };
  return acc;
}, {});

  function createParameterModal(parameter) {
    const existingModal = document.getElementById('parameter-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const details = parameterDetails[parameter];

    const modal = document.createElement('div');
    modal.id = 'parameter-modal';
    modal.className = 'parameter-modal';

    const modalSections = [
      {
        title: '개요',
        type: 'description',
        content: `${details.icon || ''} ${details.description}`
      },
      {
        title: '주요 특징',
        type: 'tags',
        content: details.characteristics
      },
      {
        title: '총점',
        type: 'paragraph',
        content: `⭐ ${details.score} / 5점`
      },
      {
        title: '정(正): 안정적',
        type: 'paragraph',
        content: details.detail1
      },
      {
        title: '편(偏): 창의적',
        type: 'paragraph',
        content: details.detail2
      },
      {
        title: '발전 방향',
        type: 'paragraph',
        content: details.summary
      },
      {
      title: '실천 예시',
      type: 'paragraph',
      content: details.summary2
      }
    ];

    const sectionsHTML = modalSections.map(section => {
      switch(section.type) {
        case 'description':
        case 'paragraph':
          return `
            <div class="parameter-modal-section">
              <h3>${section.title}</h3>
              <p>${section.content}</p>
            </div>
          `;
        case 'tags':
          return `
            <div class="parameter-modal-section">
              <h3>${section.title}</h3>
              <div class="tag-list">
                ${section.content.map(item => `<span class="tag-item">${item}</span>`).join('')}
              </div>
            </div>
          `;
        default:
          return '';
      }
    }).join('');

    modal.innerHTML = `
      <div class="parameter-modal-content">
        <div class="parameter-modal-header">
          <h2>${parameter}</h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="parameter-modal-body">
          ${sectionsHTML}
        </div>
      </div>
    `;

      document.body.appendChild(modal)

    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

    // 새로운 모달 열기/닫기 헬퍼 함수 추가
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

  function addModalTriggersToParamLabels() {
    const paramLabelGroups = document.querySelectorAll('.param-label-group, .reverse-param-label-group');
    paramLabelGroups.forEach((group, index) => {
      const icon = group.querySelector('image');
      const paramName = group.querySelector('text:first-of-type').textContent;
      icon.style.cursor = 'pointer';
      icon.addEventListener('click', () => {
        createParameterModal(paramName);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', addModalTriggersToParamLabels);
  
 
  document.addEventListener('DOMContentLoaded', () => {
       // Today's Recommended Action
    const actionPhrases = [
        "오늘은 내면의 평화를 먼저 찾아보세요.",
        "새로운 시도를 두려워하지 마세요.",
        "자신을 믿는 시간을 가져보세요.",
        "작은 변화부터 시작해보세요.",
        "감정을 솔직히 마주해보세요."
    ];

    // Function to show random action recommendation
    function showRandomAction() {
        const randomAction = actionPhrases[Math.floor(Math.random() * actionPhrases.length)];
        alert(`오늘의 추천 행동: ${randomAction}`);
    }

    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.cta-btn, .cta-secondary-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.textContent.includes('한마디')) {
                showRandomAction();
            } else {
                alert('곧 업데이트 될 기능입니다!');
            }
        });
    });

    // Trigger element animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
  });

//swiper.js 초기화//
document.addEventListener('DOMContentLoaded', function () {
  var opportunitiesSwiper = new Swiper('.opportunities-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var challengesSwiper = new Swiper('.challenges-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});


//swiper.js 초기화//
// Initialize each Swiper with unique pagination selectors
document.addEventListener('DOMContentLoaded', function() {
  // Opportunities Swiper
  const opportunitiesSwiper = new Swiper('.opportunities-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.opportunities-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
  
  // Challenges Swiper
  const challengesSwiper = new Swiper('.challenges-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.challenges-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
  
  // Guidance Swiper (already working)
  const guidanceSwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-container .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
});

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
