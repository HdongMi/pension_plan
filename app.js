// 국민연금 핵심 가이드 데이터
const guideData = [
    {
        id: 1,
        category: "수령",
        title: "나는 언제부터 연금을 받을 수 있을까?",
        content: "국민연금 수령 나이는 출생연도에 따라 다릅니다.\n- 1952년생 이전: 60세\n- 1953~56년생: 61세\n- 1957~60년생: 62세\n- 1961~64년생: 63세\n- 1965~68년생: 64세\n- 1969년생 이후: 65세부터 수령합니다."
    },
    {
        id: 2,
        category: "수령",
        title: "조기노령연금: 미리 받으면 얼마나 줄어드나?",
        content: "수령 나이보다 최대 5년 일찍 받을 수 있지만, 1년 앞당길 때마다 연금액이 연 6%씩 감액됩니다.\n5년 일찍 받으면 원래 받을 금액의 70%만 받게 되니 신중해야 합니다."
    },
    {
        id: 3,
        category: "납부",
        title: "추납(추가납부) 제도 활용법",
        content: "과거에 소득이 없어 보험료를 내지 못했던 기간의 보험료를 나중에 몰아서 내는 제도입니다. 가입 기간이 늘어나 수령액을 높이는 데 매우 효과적입니다."
    },
    {
        id: 4,
        category: "납부",
        title: "임의가입: 주부나 학생도 가입 가능!",
        content: "의무가입 대상은 아니지만 본인이 희망하여 가입하는 제도입니다. 소득이 없는 주부들도 최소 금액으로 가입하여 10년만 채우면 노후에 연금을 받을 수 있습니다."
    }
];

let currentCate = "all";
let searchQuery = "";

const landingPage = document.getElementById('landingPage');
const mainLayout = document.getElementById('mainLayout');
const startBtn = document.getElementById('startBtn');
const listEl = document.getElementById('guideList');
const searchInput = document.getElementById('searchInput');
const tabBtns = document.querySelectorAll('.tab-btn');
const detailView = document.getElementById('detailView');

// 시작하기
startBtn.onclick = () => {
    landingPage.style.opacity = '0';
    setTimeout(() => {
        landingPage.classList.add('hidden');
        mainLayout.classList.remove('hidden');
        render();
    }, 500);
};

// 검색
searchInput.oninput = (e) => {
    searchQuery = e.target.value.toLowerCase();
    render();
};

// 탭 필터링
tabBtns.forEach(btn => {
    btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCate = btn.dataset.cate;
        render();
    };
});

function render() {
    listEl.innerHTML = "";
    
    const filtered = guideData.filter(g => {
        const cateMatch = (currentCate === "all" || g.category === currentCate);
        const searchMatch = (g.title + g.content).toLowerCase().includes(searchQuery);
        return cateMatch && searchMatch;
    });

    filtered.forEach(g => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="badge">${g.category}</span>
            <h3>${g.title}</h3>
        `;
        card.onclick = () => openDetail(g);
        listEl.appendChild(card);
    });
}

function openDetail(g) {
    document.getElementById('detailBadge').innerText = g.category;
    document.getElementById('detailTitle').innerText = g.title;
    document.getElementById('detailBody').innerText = g.content;
    detailView.classList.remove('hidden');
    window.scrollTo(0,0);
}

document.getElementById('backBtn').onclick = () => detailView.classList.add('hidden');
