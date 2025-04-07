// GSAP 애니메이션 (기존 코드)
gsap.registerPlugin(ScrollTrigger);

gsap.to("#bg-illustration", {
  opacity: 1,
  duration: 2,
  ease: "power2.out"
});

gsap.to("header .spoiler-warning", { delay: 0.3, opacity: 1, y: 0, duration: 1, ease: "power2.out" });
gsap.to("header h1", { delay: 0.6, opacity: 1, y: 0, duration: 1, ease: "power2.out" });
gsap.to("header p", { delay: 0.9, opacity: 1, y: 0, duration: 1, ease: "power2.out" });
gsap.to(".scroll-btn", { delay: 1.2, opacity: 1, y: 0, duration: 1, ease: "power2.out" });

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

window.onload = function() {
  // 페이지 로드 시 헤더로 스크롤
  window.scrollTo(0, 0);
  
  // 헤더 요소들의 애니메이션 활성화 (기존 opacity: 0 문제 해결)
  document.querySelectorAll('header > *').forEach(function(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });
};

// ------------------- 왕관 차트 관련 JavaScript -------------------

const subHoverSubMapping = {
  '자립성': {
    0: { sub: '부드러운 YES맨', hoverSub: '줏대제로' },
    1: { sub: '평화주의자', hoverSub: '프로 눈치러' },
    2: { sub: '온화한 주체', hoverSub: '약간의 고집' },
    3: { sub: '나만의 스타일러', hoverSub: '적당한 고집' },
    4: { sub: '독립 선언자', hoverSub: '강한 고집' },
    5: { sub: '자립왕', hoverSub: '고집불통' }
  },
  '표현력': {
    0: { sub: '내성적인', hoverSub: '말없는' },
    1: { sub: '조용한', hoverSub: '말수 적은' },
    2: { sub: '표현력 있는', hoverSub: '적당한 말솜씨' },
    3: { sub: '말 잘하는', hoverSub: '화려한 말솜씨' },
    4: { sub: '스트리머', hoverSub: '허언증 초기' },
    5: { sub: '말쟁이', hoverSub: '허언증 말기' }
  },
  '현실적': {
    0: { sub: '이상주의자', hoverSub: '비현실적' },
    1: { sub: '꿈꾸는', hoverSub: '비현실적' },
    2: { sub: '현실적인', hoverSub: '약간의 현실감' },
    3: { sub: '실용주의자', hoverSub: '현실감각' },
    4: { sub: '성공적인', hoverSub: '실용적' },
    5: { sub: '현실왕', hoverSub: '극실용주의자' }
  },
  '책임감': {
    0: { sub: '무책임한', hoverSub: '책임회피' },
    1: { sub: '약한 책임감', hoverSub: '책임미약' },
    2: { sub: '기본적인 책임감', hoverSub: '적당한 책임감' },
    3: { sub: '책임 있는', hoverSub: '책임감' },
    4: { sub: '책임자', hoverSub: '강한 책임감' },
    5: { sub: '책임왕', hoverSub: '책임의 화신' }
  },
  '사고력': {
    0: { sub: '비논리적', hoverSub: '생각없음' },
    1: { sub: '약한 사고력', hoverSub: '적은 생각' },
    2: { sub: '평범한 사고력', hoverSub: '적당한 생각' },
    3: { sub: '논리적인', hoverSub: '적당한 논리' },
    4: { sub: '지혜로운', hoverSub: '많은 생각' },
    5: { sub: '사고왕', hoverSub: '생각의 화신' }
  }
};

const detailMapping = {
  '자립성': {
    a: {
      0: { detail: '주체성 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '주체성 다소 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '주체성 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '주체성 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '주체성 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '주체성 완벽', summary: '완벽함', summary2: '계속 도전' }
    },
    b: {
      0: { detail: '경쟁력 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '경쟁력 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '경쟁력 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '경쟁력 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '경쟁력 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '경쟁력 완벽', summary: '완벽함', summary2: '계속 도전' }
    }
  },
  '표현력': {
    a: {
      0: { detail: '표현력 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '표현력 다소 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '표현력 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '표현력 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '표현력 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '표현력 완벽', summary: '완벽함', summary2: '계속 도전' }
    },
    b: {
      0: { detail: '말솜씨 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '말솜씨 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '말솜씨 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '말솜씨 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '말솜씨 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '말솜씨 완벽', summary: '완벽함', summary2: '계속 도전' }
    }
  },
   '현실적': {
    a: {
      0: { detail: '표현력 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '표현력 다소 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '표현력 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '표현력 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '표현력 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '표현력 완벽', summary: '완벽함', summary2: '계속 도전' }
    },
    b: {
      0: { detail: '말솜씨 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '말솜씨 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '말솜씨 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '말솜씨 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '말솜씨 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '말솜씨 완벽', summary: '완벽함', summary2: '계속 도전' }
    }
  },
   '책임감': {
    a: {
      0: { detail: '표현력 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '표현력 다소 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '표현력 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '표현력 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '표현력 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '표현력 완벽', summary: '완벽함', summary2: '계속 도전' }
    },
    b: {
      0: { detail: '말솜씨 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '말솜씨 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '말솜씨 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '말솜씨 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '말솜씨 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '말솜씨 완벽', summary: '완벽함', summary2: '계속 도전' }
    }
  },
   '사고력': {
    a: {
      0: { detail: '표현력 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '표현력 다소 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '표현력 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '표현력 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '표현력 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '표현력 완벽', summary: '완벽함', summary2: '계속 도전' }
    },
    b: {
      0: { detail: '말솜씨 없음', summary: '기본부터 다져야 함', summary2: '기본적인 기술 연습' },
      1: { detail: '말솜씨 부족', summary: '조금 더 노력 필요', summary2: '꾸준한 연습' },
      2: { detail: '말솜씨 있음', summary: '계속해서 발전 필요', summary2: '지속적인 학습' },
      3: { detail: '말솜씨 강함', summary: '잘 하고 있음', summary2: '현재 수준 유지' },
      4: { detail: '말솜씨 매우 강함', summary: '탁월함', summary2: '현상 유지 및 도전' },
      5: { detail: '말솜씨 완벽', summary: '완벽함', summary2: '계속 도전' }
    }
  }
};

const parameters = [
  { name: '자립성', a: 1, b: 0, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Bigeop.png' },
  { name: '표현력', a: 2, b: 2, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Siksang.png' },
  { name: '현실적', a: 1, b: 1, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Jaesung.png' },
  { name: '책임감', a: 1, b: 1, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Gwansung.png' },
  { name: '사고력', a: 1, b: 2, sub: '', hoverSub: '', iconUrl: './images/Palja_Param_Icon_Inseong.png' },
];

parameters.forEach(param => {
  param.level = param.a + param.b;
  const mapping = subHoverSubMapping[param.name][param.level];
  param.sub = mapping.sub;
  param.hoverSub = mapping.hoverSub;

  // Set parameter details
  param.details = {
    detail1: `a 점수: ${param.a}, ${detailMapping[param.name].a[param.a].detail}`,
    detail2: `b 점수: ${param.b}, ${detailMapping[param.name].b[param.b].detail}`,
    summary: `a 점수의 발전방향: ${detailMapping[param.name].a[param.a].summary}, b 점수의 발전방향: ${detailMapping[param.name].b[param.b].summary}`,
    summary2: `a 점수의 실천예시: ${detailMapping[param.name].a[param.a].summary2}, b 점수의 실천예시: ${detailMapping[param.name].b[param.b].summary2}`
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
const centerX = 700;      // 450
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

// 디버깅을 위한 코드: SVG 영역에 테두리 추가
svg.setAttribute("style", "border: 1px solid red;");

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
        title: '정(正)',
        type: 'paragraph',
        content: details.detail1
      },
      {
        title: '편(偏)',
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

    document.body.appendChild(modal);

    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
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
    // Interactive Checklist
    const checklistItems = document.querySelectorAll('.checklist input[type="checkbox"]');
    checklistItems.forEach(item => {
        item.addEventListener('change', (e) => {
            const label = e.target.nextElementSibling;
            if (e.target.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#888';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#2c3e50';
            }
        });
    });

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
