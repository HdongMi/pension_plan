const contentData = {
    howToCalc: {
        title: "연금액 결정 및 계산 공식",
        body: `
            <div class="sub-title">1. 핵심 계산 공식</div>
            <div style="background:#1e293b; color:#fff; padding:20px; border-radius:10px; text-align:center; font-family:monospace; margin-bottom:20px;">
                기본연금액 = 1.2 × (A + B) × (1 + 0.05n/12)
            </div>
            <div class="content-box">
                <strong>A값</strong>: 전체 가입자 평균 소득액<br>
                <strong>B값</strong>: 본인 평균 소득액<br>
                <strong>n</strong>: 20년 초과 가입 월수
            </div>

            <div class="sub-title">2. 직접 계산해보기</div>
            <div class="calc-container">
                <div class="calc-input-group">
                    <label>월 소득액 (만원)</label>
                    <input type="number" id="myIncome" placeholder="예: 300">
                </div>
                <div class="calc-input-group">
                    <label>가입 기간 (년)</label>
                    <input type="number" id="myYears" placeholder="10년 이상">
                </div>
                <button onclick="calculatePension()" class="calc-btn">계산하기</button>
                <div id="calcResult" class="calc-result hidden">
                    <p>예상 월 수령액</p>
                    <h3 id="resultValue" style="color:#166534; margin:10px 0;">0원</h3>
                </div>
            </div>`
    },
    types: {
        title: "국민연금의 4가지 종류",
        body: `
            <div class="content-box"><strong>1. 노령연금</strong><p>10년 가입 시 노후 수령</p></div>
            <div class="content-box"><strong>2. 장애연금</strong><p>장애 발생 시 지급</p></div>
            <div class="content-box"><strong>3. 유족연금</strong><p>사망 시 유족 지급</p></div>
            <div class="content-box"><strong>4. 반환일시금</strong><p>요건 미달 시 반환</p></div>`
    },
    qna: {
        title: "자주 묻는 질문 (Q&A)",
        body: `<div class="sub-title">Q. 물가가 오르면 연금도 오르나요?</div><p>네, 물가상승률을 반영해 실질 가치를 보장합니다.</p>`
    }
};

const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

function showSection(key) {
    const data = contentData[key];
    
    // 헤더 타이틀 셋팅
    document.getElementById('detailTopTitle').innerText = data.title;
    detailContent.innerHTML = data.body;
    
    detailView.classList.remove('hidden');
    window.scrollTo(0,0);
    
    history.pushState({ page: "detail" }, "detail", "");
}

function calculatePension() {
    const income = parseFloat(document.getElementById('myIncome').value);
    const years = parseInt(document.getElementById('myYears').value);
    if (!income || !years || years < 10) { alert("정확한 값을 입력해주세요."); return; }
    
    // 가산 연금 계산식
    const resultValue = (1.2 * (298 + income) * (1 + 0.05 * Math.max(0, (years-20)*12) / 12) * (years/40)) * 1000;
    
    document.getElementById('resultValue').innerText = `약 ${Math.round(resultValue).toLocaleString()} 원`;
    document.getElementById('calcResult').classList.remove('hidden');
}

document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => detailView.classList.add('hidden');
