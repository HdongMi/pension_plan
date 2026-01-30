const contentData = {
    system: {
        title: "국민연금 제도란?",
        body: `
            <div class="guide-box">
                <strong>개요</strong><br>
                국민연금은 국가가 보험원리를 도입하여 만든 사회보장제도입니다. 소득이 있을 때 보험료를 냈다가, 나이가 들거나 갑작스러운 사고·질병으로 소득이 끊겼을 때 본인이나 유족에게 연금을 지급하여 안정을 돕습니다.
            </div>
            <div class="guide-box">
                <strong>주요 특징</strong><br>
                1. 국가가 운영하므로 가장 안전합니다.<br>
                2. 물가가 오르면 연금액도 함께 오릅니다.<br>
                3. 사망 시까지 평생 지급됩니다.
            </div>`
    },
    types: {
        title: "국민연금의 4가지 종류",
        body: `
            <div class="guide-box"><strong>1. 노령연금</strong><br>가장 일반적인 연금으로, 최소 10년 이상 가입하고 수령 나이가 되었을 때 평생 받는 연금입니다.</div>
            <div class="guide-box"><strong>2. 장애연금</strong><br>가입 중에 발생한 질병이나 부상으로 장애가 남았을 때, 본인과 가족의 생활을 돕기 위해 지급됩니다.</div>
            <div class="guide-box"><strong>3. 유족연금</strong><br>연금을 받던 분이 사망했을 때, 남겨진 유족의 생계를 보호하기 위해 지급되는 연금입니다.</div>
            <div class="guide-box"><strong>4. 반환일시금</strong><br>수령 나이가 되었으나 가입 기간 10년을 채우지 못한 경우, 그동안 낸 보험료에 이자를 더해 한꺼번에 받는 돈입니다.</div>`
    },
    qna: {
        title: "자주 묻는 Q&A",
        body: `
            <div class="qna-item">
                <span class="qna-q">Q. 소득이 없어도 꼭 내야 하나요?</span>
                <span class="qna-a">만 18세 이상 60세 미만 국민 중 소득이 있다면 의무가입 대상입니다. 하지만 소득이 없다면 '납부예외' 신청을 통해 보험료를 잠시 멈출 수 있습니다.</span>
            </div>
            <div class="qna-item">
                <span class="qna-q">Q. 나중에 못 받을 수도 있다는데 사실인가요?</span>
                <span class="qna-a">국민연금은 국가가 운영하는 제도이므로 국가가 존립하는 한 반드시 지급됩니다. 법적으로 지급을 보장하고 있으니 안심하셔도 됩니다.</span>
            </div>`
    }
};

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

// 상세 섹션 보여주기
function showSection(key) {
    const data = contentData[key];
    detailContent.innerHTML = `<h2>${data.title}</h2>${data.body}`;
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
    
    // 뒤로가기 대응을 위한 기록 남기기
    history.pushState({ page: "detail" }, "detail", "");
}

// 상세 닫기
function closeDetail() {
    detailView.classList.add('hidden');
}

// 뒤로가기 버튼 클릭 시
document.getElementById('backBtn').onclick = () => {
    history.back();
};

// 브라우저 뒤로가기(폰 뒤로가기) 감지
window.onpopstate = function() {
    closeDetail();
};
