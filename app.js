const contentData = {
    howToCalc: {
        title: "연금액 결정 및 계산 공식",
        body: `
            <div class="sub-title">1. 핵심 계산 공식</div>
            <div style="background:#1e293b; color:#fff; padding:20px; border-radius:10px; text-align:center; font-family:monospace; margin-bottom:20px;">
                기본연금액 = 1.2 × (A + B) × (1 + 0.05n/12)
            </div>
            <div class="content-box">
                <strong>A값</strong>: 전체 가입자 최근 3년간 평균 소득액 (약 298만원 기준)<br>
                <strong>B값</strong>: 가입자 본인의 전체 기간 평균 소득액<br>
                <strong>n</strong>: 20년을 초과하는 가입 월수
            </div>

            <div class="sub-title">2. 직접 계산해보기</div>
            <div class="calc-container">
                <div class="calc-input-group">
                    <label>월 평균 소득액 (만원)</label>
                    <input type="number" id="myIncome" placeholder="예: 300">
                </div>
                <div class="calc-input-group">
                    <label>총 가입 예정 기간 (년)</label>
                    <input type="number" id="myYears" placeholder="10년 이상">
                </div>
                <button onclick="calculatePension()" class="calc-btn">계산하기</button>
                <div id="calcResult" class="calc-result hidden">
                    <p>예상 월 수령액</p>
                    <h3 id="resultValue" style="color:#166534; margin:10px 0;">0원</h3>
                    <small>* 가입 기간이 20년 미만일 경우 비례 감액되어 계산됩니다.</small>
                </div>
            </div>`
    },
    types: {
        title: "국민연금의 4가지 종류",
        body: `
            <div class="content-box"><strong>1. 노령연금</strong><p>가입기간 10년 충족 시 노후에 받는 가장 대표적인 연금입니다.</p></div>
            <div class="content-box"><strong>2. 장애연금</strong><p>가입 중 발생한 질병이나 부상으로 장애가 남았을 때 지급됩니다.</p></div>
            <div class="content-box"><strong>3. 유족연금</strong><p>가입자나 수급자가 사망했을 때 남겨진 유족에게 지급됩니다.</p></div>
            <div class="content-box"><strong>4. 반환일시금</strong><p>가입 기간 10년을 못 채우고 나이가 들었을 때 이자를 더해 돌려받습니다.</p></div>`
    },
    qna: {
        title: "자주 묻는 질문 (Q&A)",
        body: `
            <div class="sub-title">Q1. 국민연금과 개인연금의 차이가 뭔가요?</div>
            <div class="content-box">
                국민연금은 국가가 운영하며 <strong>물가상승률을 반영</strong>해 실질 가치를 보장하고 평생 지급됩니다. 반면 개인연금은 민간 금융사가 운영하며 약정된 수익률에 따라 지급 기간과 금액이 결정됩니다.
            </div>

            <div class="sub-title">Q2. 국민연금 해지 조건이 있나요?</div>
            <div class="content-box">
                국민연금은 사회보장제도로서 <strong>임의 해지가 불가능</strong>합니다. 다만, 국외 이주, 국적 상실, 또는 사망 시 유족연금이 발생하지 않는 경우에만 '반환일시금'으로 정산받을 수 있습니다.
            </div>

            <div class="sub-title">Q3. 보험료를 미납하면 어떻게 되나요?</div>
            <div class="content-box">
                미납 시 연체료가 발생하며, 가입 기간이 부족해져 나중에 받을 연금액이 크게 줄어듭니다. 소득이 있음에도 상습 미납할 경우 재산 압류 등 강제 징수 절차가 진행될 수 있습니다.
            </div>

            <div class="sub-title">Q4. 소득이 없어도 무조건 내야 하나요?</div>
            <div class="content-box">
                실직이나 폐업으로 소득이 없다면 <strong>'납부예외'</strong> 신청을 할 수 있습니다. 이 기간 동안은 보험료를 안 내도 되지만, 가입 기간에는 포함되지 않습니다.
            </div>

            <div class="sub-title">Q5. 물가가 오르면 연금도 오르나요?</div>
            <div class="content-box">
                네, 매년 전년도 소비자물가변동률만큼 연금액을 조정하여 지급하므로 연금의 실질 가치가 하락하지 않도록 보장합니다.
            </div>`
    }
};

const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

// 상세 섹션 보기 함수
function showSection(key) {
    const data = contentData[key];
    
    // 헤더 타이틀 셋팅
    document.getElementById('detailTopTitle').innerText = data.title;
    detailContent.innerHTML = `<div class="fade-in">${data.body}</div>`;
    
    detailView.classList.remove('hidden');
    window.scrollTo(0,0);
    
    history.pushState({ page: "detail" }, "detail", "");
}

// 예상 연금액 계산 로직
function calculatePension() {
    const income = parseFloat(document.getElementById('myIncome').value);
    const years = parseInt(document.getElementById('myYears').value);
    const resultDiv = document.getElementById('calcResult');
    const resultValue = document.getElementById('resultValue');

    if (!income || !years || years < 10) { 
        alert("월 소득액과 10년 이상의 가입 기간을 정확히 입력해주세요."); 
        return; 
    }
    
    // A값(평균)은 2026년 가상 기준 298만원으로 설정
    const A = 298;
    const B = income;
    // n: 20년 초과 가입 월수
    let n = Math.max(0, (years - 20) * 12);
    
    // 기본 연금 산식 적용 (소득대체율 반영 가중치 적용)
    const rawValue = (1.2 * (A + B) * (1 + 0.05 * n / 12) * (years / 40)) * 1000;
    
    resultValue.innerText = `약 ${Math.round(rawValue).toLocaleString()} 원`;
    resultDiv.classList.remove('hidden');
}

// 뒤로가기 제어
document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => detailView.classList.add('hidden');
