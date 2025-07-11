export const aquaplanetLinks = [
  { text: "아쿠아플라넷", link: "https://www.aquaplanet.co.kr/index.do" },
  { text: "아쿠아플라넷 제주", link: "https://www.aquaplanet.co.kr/jeju/index.do" },
  { text: "아쿠아플라넷 여수", link: "https://www.aquaplanet.co.kr/yeosu/index.do" },
  { text: "아쿠아플라넷 일산", link: "https://www.aquaplanet.co.kr/ilsan/index.do" },
  { text: "아쿠아플라넷 광교", link: "https://www.aquaplanet.co.kr/gwanggyo/index.do" },
];

export const gnbMenuItems = [
  {
    id:'01',
    main: "이용안내",
    pathPattern:"/aquaplanet/ilsan/information/*",
    sub: [
      { id: "01-01", text: "이용시간·요금안내", link: "#" },
      { id: "01-02", text: "가이드맵", link: "#" },
      { id: "01-03", text: "온라인 기프트샵", link: "#" },
    ],
  },
  {
    id:'02',
    main: "프로그램",
    pathPattern:"/aquaplanet/ilsan/program/*",
    sub: [
      { id: "02-01", text: "프로그램 일정", link: "#" },
      { id: "02-02", text: "프로그램 소개", link: "#" },
    ],
  },
  {
    id:'03',
    main: "혜택안내",
    pathPattern:"/aquaplanet/ilsan/benefit/*",
    sub: [
      { id: "03-01", text: "이벤트", link: "#" },
      { id: "03-02", text: "제휴할인", link: "#" },
    ],
  },
  {
    id:"04",
    main: "제휴/단체 안내",
    pathPattern:"/aquaplanet/ilsan/group/*",
    sub: [
      { id: "04-01", text: "학습·일반단체", link: "#" },
      { id: "04-02", text: "인바운드단체", link: "#" },
      { id: "04-03", text: "기업단체", link: "#" },
      { id: "04-04", text: "제휴·대관 문의", link: "#" },
      { id: "04-05", text: "단체식사", link: "#" },
      { id: "04-06", text: "단체예약", link: "#" },
    ],
  },
  {
    id:"05",
    main: "아쿠아플라넷",
    pathPattern:"/aquaplanet/ilsan/aquaplanet/*",
    sub: [
      { id: "05-01", text: "아쿠아플라넷 일산", link: "/aquaplanet/ilsan/aquaplanet/planet" },
      { id: "05-02", text: "아쿠아플라넷 친구들", link: "/aquaplanet/ilsan/aquaplanet/friends" },
      { id: "05-03", text: "아쿠아지움", link: "#" },
      { id: "05-04", text: "아쿠아리스트", link: "#" },
      { id: "05-05", text: "오시는 길", link: "#" },
    ],
  },
  {
    id:'06',
    main: "해양생물연구소",
    pathPattern:"/aquaplanet/ilsan/hmbrc/*",
    sub: [
      { id: "06-01", text: "연구센터소개", link: "#" },
      { id: "06-02", text: "구조/치료실적", link: "#" },
      { id: "06-03", text: "보전활동", link: "#" },
      { id: "06-04", text: "연구분야", link: "#" },
      { id: "06-05", text: "보호대상 학습", link: "#" },
    ],
  },
  {
    id:'07',
    main: "고객의 소리",
    pathPattern:"/aquaplanet/ilsan/customer/*",
    sub: [
      { id: "07-01", text: "공지사항", link: "#" },
      { id: "07-02", text: "전자공고", link: "#" },
      { id: "07-03", text: "자주 묻는 질문", link: "#" },
      { id: "07-04", text: "고객소리함", link: "#" },
    ],
  },
];