const contentData = {
    howToCalc: {
        title: "연금액 결정 및 계산 공식",
        body: `
            <div class="sub-title">1. 핵심 계산 공식</div>
            <p>국민연금은 가입자 전체의 평균 소득과 본인의 소득을 합산하여 결정됩니다.</p>
            
            <div style="background:#1e293b; color:#fff; padding:25px; border-radius:12px; text-align:center; font-family:monospace; margin-bottom:20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                기본연금액 = 1.2 × (A + B) × (1 + 0.05n/12)
            </div>

            <div class="content-box">
                <strong>A값 (균등부분)</strong>: 전체 가입자의 최근 3년간 평균 소득액 (약 298만원 기준)<br>
                <strong>B값 (소득비례)</strong>: 가입자 본인의 전체 기간 평균 소득액<br>
                <strong>n (가입기간)</strong>: 20년을 초과하는 가입 월수
            </div>

            <div class="sub-title">2. 직접 계산해보기</div>
            <p>위 공식을 바탕으로 나의 예상 월 수령액을 확인해보세요.</p>
            
            <div class="calc-container">
                <div class="calc-input-group">
                    <label>나의 월 평균 소득액 (만원)</label>
                    <input type="number" id="myIncome" placeholder="예: 300" />
                </div>
                <div class="calc-input-group">
                    <label>총 가입 예정 기간 (년)</label>
                    <input type="number" id="myYears" placeholder="최소 10년 이상 입력" />
                </div>
                <button onclick="calculatePension()" class="calc-btn">예상 연금액 계산하기</button>
                
                <div id="calcResult" class="calc-result hidden">
                    <p>나의 예상 월 수령액은?</p>
                    <h3 id="resultValue">0원</h3>
                    <small>* 가입 기간이 20년 미만일 경우 비례 감액되어 계산됩니다.</small>
                </div>
            </div>

            <div class="sub-title">3. 많이 받는 비결</div>
            <p>연금액을 높이는 가장 확실한 방법은 <b>'가입 기간(n)'</b>을 늘리는 것입니다. 가입 기간이 1년 늘어날 때마다 연금액은 약 5%씩 정비례하여 상승합니다.</p>
        `
    },
    // types와 qna 데이터는 이전과 동일하게 유지...
    types: {
        title: "국민연금의 4가지 종류",
        body: `<div class="content-box"><strong>1. 노령연금</strong><p>가입기간 10년 충족 시 노후 수령</p></div><div class="content-box"><strong>2. 장애연금</strong><p>장애 발생 시 지급</p></div><div class="content-box"><strong>3. 유족연금</strong><p>사망 시 유족에게 지급</p></div><div class="content-box"><strong>4. 반환일시금</strong><p>요건 미달 시 이자 포함 반환</p></div>`
    },
    qna: {
        title: "자주 묻는 질문 (Q&A)",
        body: `<span class="q-box">Q. 물가가 오르면 연금액도 오르나요?</span><p>네, 매년 물가상승률을 반영하여 실질 가치를 보장합니다.</p><span class="q-box">Q. 부부가 둘 다 연금을 내면?</span><p>부부 모두 각각 본인의 연금을 평생 받을 수 있습니다.</p>`
    }
};

const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

function showSection(key) {
    const data = contentData[key];
    document.getElementById('detailTopTitle').innerText = data.title;
    detailContent.innerHTML = `<div class="fade-in">${data.body}</div>`;
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
    history.pushState({ page: "detail" }, "detail", "");
}

function calculatePension() {
    const income = parseFloat(document.getElementById('myIncome').value);
    const years = parseInt(document.getElementById('myYears').value);
    const resultDiv = document.getElementById('calcResult');
    const resultValue = document.getElementById('resultValue');

    if (!income || !years || years < 10) {
        alert("소득액과 10년 이상의 가입 기간을 입력해주세요.");
        return;
    }

    const A = 298; 
    const B = income;
    let n = Math.max(0, (years - 20) * 12); 
    
    let baseAmount = 1.2 * (A + B) * (1 + 0.05 * n / 12);
    let monthlyBenefit = (baseAmount * (years / 40)) * 1000; 

    resultValue.innerText = `약 ${Math.round(monthlyBenefit).toLocaleString()} 원`;
    resultDiv.classList.remove('hidden');
}

document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => detailView.classList.add('hidden');
