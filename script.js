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

// 파라미터 데이터 (이름, 레벨, 서브 텍스트, 아이콘 경로)
const parameters = [
  { name: '자립성', level: 1, sub: '평화주의자', hoverSub:'프로 눈치러', iconUrl: 'https://imgur.com/4SjZdeE.png' },
  { name: '표현력', level: 4, sub: '스트리머', hoverSub:'허언증 초기', iconUrl: 'https://imgur.com/hvrtbso.png' },
  { name: '현실적', level: 2, sub: '성실한 월급쟁이', hoverSub:'짠돌이',  iconUrl: 'https://imgur.com/6Okot6A.png' },
  { name: '책임감', level: 2, sub: '무난이 모범생', hoverSub:'아마추어 월루',  iconUrl: 'https://imgur.com/rjdzDsE.png' },
  { name: '사고력', level: 3, sub: '지식인 바이브', hoverSub:'걱정인형',  iconUrl: 'https://imgur.com/jOFnc6i.png' },
];

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

// 파라미터 상세 정보
const parameterDetails = {
    '자립성': {
      description: '나를 지키고 성장시키는 내 안의 힘.',
      characteristics: ['자기 주도권', '존재감', '경쟁 관계','승부욕','고집'],
      score: 1,
      detail1: '1점. 온화하고 협조적이지만 소극적이며 자신의 의견을 내세우지 못할 수 있음.',
      detail2: '해당없음',
      summary: '지나친 양보를 줄여보기.',
      summary2: '회의 때 먼저 입 열기 / 메뉴 선택 직접 하기.',
      icon: '💪'
    },
    '표현력': {
      description: '내 생각과 재능을 세상에 드러내는 능력',
      characteristics: ['표현력','창의력', '결과주의','끼','말솜씨'],
      score: 4,
      detail1: '4점. 여유가 넘치고 온화하며 지나친 경쟁보다는 안정과 만족을 추구하나 때로는 태평스럽고 게으른 면이 나타날 수 있음.',
      detail2: '해당없음',
      summary: '집중력 강화를 위한 흩어진 주의력 모아보기.',
      summary2:'한가지에 몰입하는 연습해보기. 디지털 디톡스.',
      icon: '🎤'
    },
    '현실적': {
      description: '세상 속에서 내가 원하는 것을 얻어내는 능력.',
      characteristics: ['현실감각', '수입', '일 처리 능력','추진력','성공욕'],
      score: 2,
      detail1: '해당없음.',
      detail2: '2점. 기본에 충실하지만 때때로 번외로 들어오는 금전적 기회에 소극적으로 반응함. 익숙한 범위내에서 사교성을 발휘.',
      summary: '수입구조/사교성 늘려보기.',
      summary2: '나만의 사이드 프로젝트 시작해보기. 직장 내 소모임 참여해보기.',
      icon: '📊'
    },
    '책임감': {
      description: '사회와 조직 속에서 내 역할과 지위를 지키는 힘.',
      characteristics: ['책임감', '리더십', '위계/규칙',''],
      score: 2,
      detail1: '해당없음.',
      detail2: '2점. 완전한 주도권을 잡지 못하나 자기 분수 내에서는 책임을 다하려는 노력을 보임. 스스로를 지킬 배짱은 있으나 타인을 제압하는 카리스마는 부족함.',
      summary: '조직력과 자기 통제감 키우기.',
      summary2: '업무 템플릿 만들기. 일일 계획으로 하루를 시작해보기.',
      icon: '⚖️'
    },
    '사고력': {
      description: '내면의 안정과 지혜를 길러주는 힘.',
      characteristics: ['지혜', '멘탈관리', '학습능력', '돌봄','성찰'],
      score: 3,
      detail1: '1점. 자기 성찰이나 반성보다는 현실 대응에 더욱 집중하는 모습. 기본기나 배경지식이 다소 얕을 수 있음.',
      detail2: '2점. 창의적이기 보다는 응용형에 가까워 기존 지식을 살짝 변형하거나 조합하는 수준의 독자성을 보이며 튀지 않는 선에서의 개성을 유지함.',
      summary: '과부족이 없는 지금의 균형을 유지해보기.',
      summary2: '주말 2시간은 나만의 시간 확보. 혼자 카페 루틴 만들기.',
      icon: '🔍'
    }
  };

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
  var swiper = new Swiper('.swiper-container', {
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
