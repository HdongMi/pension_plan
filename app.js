const contentData = {
    howToCalc: {
        title: "연금액 어떻게 계산될까?",
        body: `
            <div class="guide-box">
                <strong>1. 기본 공식</strong>
                연금액은 '전체 가입자의 평균 소득(A)'과 '본인의 평균 소득(B)'을 합산하여 결정됩니다.
            </div>
            <div class="formula-box">
                기본연금액 = 1.2 × (<b>A</b> + <b>B</b>) × (1 + 0.05<b>n</b>/12)
            </div>
            <div class="guide-box">
                <strong>요소 설명</strong>
                - <b>A</b>: 최근 3년간 전체 가입자의 평균 소득 (균등부분)<br>
                - <b>B</b>: 본인의 전체 가입 기간 평균 소득 (소득비례부분)<br>
                - <b>n</b>: 20년을 초과하는 가입 월수
            </div>
            <div class="guide-box">
                <strong>쉽게 이해하기</strong>
                결국 <b>많이 낼수록(B)</b>, 그리고 <b>오래 가입할수록(n)</b> 받는 금액은 커집니다. 특히 가입 기간이 20년을 넘으면 그때부터 받는 금액이 가파르게 올라갑니다!
            </div>`
    },
    system: {
        title: "국민연금 제도란?",
        body: `
            <div class="guide-box">
                <strong>기본 개념</strong>
                혼자서 노후를 준비하기 막막할 때, 국가가 운영하는 보험에 가입하여 소득이 없을 때 매달 돈을 받는 '사회보험' 제도입니다.
            </div>
            <div class="guide-box">
                <strong>핵심 3요소</strong>
                1. <b>강제성</b>: 소득이 있다면 의무적으로 가입하여 노후를 공동으로 준비합니다.<br>
                2. <b>안전성</b>: 국가가 지급을 보장하므로 사라질 위험이 없습니다.<br>
                3. <b>물가 반영</b>: 물가가 오르면 내가 받는 연금액도 매년 조정되어 가치를 유지합니다.
            </div>`
    },
    types: {
        title: "연금의 4가지 종류",
        body: `
            <div class="guide-box"><strong>노령연금</strong><br>10년 이상 가입 시 평생 받는 가장 기본적인 형태</div>
            <div class="guide-box"><strong>장애연금</strong><br>장애가 발생했을 때 생활 안정을 위해 지급</div>
            <div class="guide-box"><strong>유족연금</strong><br>가입자 사망 시 남겨진 가족에게 지급</div>
            <div class="guide-box"><strong>반환일시금</strong><br>가입 기간을 못 채웠을 때 낸 돈에 이자를 더해 일시불로 수령</div>`
    },
    qna: {
        title: "자주 묻는 Q&A",
        body: `
            <div class="guide-box">
                <strong>Q. 국민연금 고갈되면 못 받나요?</strong><br>
                국가에서 운영하는 제도는 설령 기금이 소진되더라도 그해 걷은 돈으로 지급하는 '부과방식'으로 전환해서라도 반드시 지급합니다. 법으로 지급을 명시하고 있습니다.
            </div>
            <div class="guide-box">
                <strong>Q. 최소 가입 기간은?</strong><br>
                최소 <b>10년(120개월)</b>을 채워야만 평생 연금 형태로 받을 수 있습니다.
            </div>`
    }
};

// --- 기능 로직 (뒤로가기 대응 포함) ---
const landingPage = document.getElementById('landingPage');
const mainLayout = document.getElementById('mainLayout');
const startBtn = document.getElementById('startBtn');
const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

startBtn.onclick = () => {
    landingPage.style.opacity = '0';
    setTimeout(() => {
        landingPage.classList.add('hidden');
        mainLayout.classList.remove('hidden');
    }, 500);
};

function showSection(key) {
    const data = contentData[key];
    detailContent.innerHTML = `<h2>${data.title}</h2>${data.body}`;
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
    history.pushState({ page: "detail" }, "detail", "");
}

function closeDetail() {
    detailView.classList.add('hidden');
}

document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => closeDetail();
