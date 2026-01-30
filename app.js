const contentData = {
    howToCalc: {
        title: "연금액 결정 및 계산 공식",
        body: `
            <p>내 연금액이 어떻게 결정되는지 직접 계산해 보세요.</p>
            
            <div class="calc-container">
                <div class="calc-input-group">
                    <label>월 평균 소득액 (만원)</label>
                    <input type="number" id="myIncome" placeholder="예: 300" />
                </div>
                <div class="calc-input-group">
                    <label>총 가입 예정 기간 (년)</label>
                    <input type="number" id="myYears" placeholder="최소 10년 이상" />
                </div>
                <button onclick="calculatePension()" class="calc-btn">예상 연금액 계산하기</button>
                
                <div id="calcResult" class="calc-result hidden">
                    <p>나의 예상 월 수령액은?</p>
                    <h3 id="resultValue">0원</h3>
                    <small>* 위 결과는 가산을 제외한 단순 공식에 따른 예상치이며, 실제 수령액과 차이가 있을 수 있습니다.</small>
                </div>
            </div>

            <div class="sub-title">1. 핵심 계산 공식</div>
            <div style="background:#1e293b; color:#fff; padding:20px; border-radius:10px; text-align:center; font-family:monospace; margin-bottom:20px;">
                기본연금액 = 1.2 × (A + B) × (1 + 0.05n/12)
            </div>
            <div class="content-box">
                <strong>A값 (균등부분)</strong>: 전체 가입자의 최근 3년간 평균 소득액 (약 298만원 기준)<br>
                <strong>B값 (소득비례)</strong>: 가입자 본인의 전체 기간 평균 소득액<br>
                <strong>n (가입기간)</strong>: 20년을 초과하는 가입 월수
            </div>
            <div class="sub-title">2. 많이 받는 비결</div>
            <p>연금액을 높이는 가장 확실한 방법은 <b>'가입 기간(n)'</b>을 늘리는 것입니다. 가입 기간이 1년 늘어날 때마다 연금액은 약 5%씩 정비례하여 상승합니다.</p>
        `
    },
    types: {
        title: "국민연금의 4가지 종류",
        body: `
            <p>상황에 따라 받을 수 있는 4가지 혜택을 정리해 드립니다.</p>
            <div class="content-box">
                <strong>1. 노령연금</strong>
                <p>최소 가입기간 10년을 채웠을 때 노후에 받는 가장 대표적인 연금입니다.</p>
            </div>
            <div class="content-box">
                <strong>2. 장애연금</strong>
                <p>가입 중 발생한 질병이나 부상으로 장애가 남았을 때 지급되어 생활을 보장합니다.</p>
            </div>
            <div class="content-box">
                <strong>3. 유족연금</strong>
                <p>가입자나 수급자가 사망했을 때 남겨진 유족에게 평생 지급되는 보너스 같은 제도입니다.</p>
            </div>
            <div class="content-box">
                <strong>4. 반환일시금</strong>
                <p>가입 기간 10년을 못 채우고 나이가 들었을 때, 냈던 원금에 이자를 더해 돌려받습니다.</p>
            </div>`
    },
    qna: {
        title: "자주 묻는 질문 (Q&A)",
        body: `
            <div class="sub-title">가장 많이 물어보는 Top 3</div>
            <span class="q-box">Q. 물가가 오르면 연금액도 오르나요?</span>
            <p>네, 국민연금은 매년 전국소비자물가변동률에 따라 연금액을 조정하여 실질 가치를 보장합니다.</p>
            <span class="q-box">Q. 연금을 일찍 받을 수도 있나요?</span>
            <p>네, '조기노령연금' 제도가 있어 수령 나이보다 최대 5년 일찍 받을 수 있습니다. 단, 일찍 받는 만큼 금액은 감액됩니다.</p>
            <span class="q-box">Q. 부부가 둘 다 연금을 내면 한 명만 받나요?</span>
            <p>아니요. 국민연금은 가족 단위가 아닌 1인 1연금 체계이므로, 부부 모두 요건을 갖추면 각각 본인의 연금을 평생 받으실 수 있습니다.</p>`
    }
};

const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

// 상세 섹션 열기
function showSection(key) {
    const data = contentData[key];
    document.getElementById('detailTopTitle').innerText = data.title;
    detailContent.innerHTML = `<div class="fade-in">${data.body}</div>`;
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
    history.pushState({ page: "detail" }, "detail", "");
}

// 🧮 실제 계산 실행 함수
function calculatePension() {
    const income = parseFloat(document.getElementById('myIncome').value);
    const years = parseInt(document.getElementById('myYears').value);
    const resultDiv = document.getElementById('calcResult');
    const resultValue = document.getElementById('resultValue');

    if (!income || !years || years < 10) {
        alert("소득액과 10년 이상의 가입 기간을 정확히 입력해주세요.");
        return;
    }

    // 약식 계산 공식 (A값 298만원 가정)
    const A = 298; 
    const B = income;
    let n = Math.max(0, (years - 20) * 12); 
    
    // 기본 연금 산식 적용 (소득대체율 반영 월 환산)
    let baseAmount = 1.2 * (A + B) * (1 + 0.05 * n / 12);
    let monthlyBenefit = (baseAmount * (years / 40)) * 1000; 

    resultValue.innerText = `약 ${Math.round(monthlyBenefit).toLocaleString()} 원`;
    resultDiv.classList.remove('hidden');
}

// 뒤로가기 제어
document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => detailView.classList.add('hidden');
