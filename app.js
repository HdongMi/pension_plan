const contentData = {
    howToCalc: {
        title: "연금액 계산 공식",
        body: `
            <p>국민연금은 '평생 낸 돈'과 '가입 기간'에 의해 결정됩니다.</p>
            <div style="background:#1e293b; color:#fff; padding:15px; border-radius:10px; text-align:center; margin:15px 0;">
                1.2 × (A + B) × (1 + 0.05n/12)
            </div>
            <p>가입 기간이 20년을 넘으면 연금액이 크게 상승하므로, 최대한 오래 납부하는 것이 유리합니다.</p>`
    },
    types: {
        title: "연금의 4가지 종류",
        body: `<ul><li>노령연금: 노후 수령</li><li>장애연금: 장애 시 지급</li><li>유족연금: 사망 시 가족 지급</li><li>반환일시금: 기간 미달 시 수령</li></ul>`
    },
    qna: {
        title: "자주 묻는 질문",
        body: `<p><strong>Q. 고갈되면 못 받나요?</strong><br>국가가 존속하는 한 반드시 지급하도록 법률로 보장하고 있습니다.</p>`
    }
};

const detailView = document.getElementById('detailView');
const detailContent = document.getElementById('detailContent');

function showSection(key) {
    const data = contentData[key];
    document.getElementById('detailTopTitle').innerText = data.title;
    detailContent.innerHTML = data.body;
    detailView.classList.remove('hidden');
    history.pushState({ page: "detail" }, "detail", "");
}

document.getElementById('backBtn').onclick = () => history.back();
window.onpopstate = () => detailView.classList.add('hidden');
