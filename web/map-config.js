// 🍜 맛집 지도 설정 — 키를 받으면 여기만 채우면 됩니다 (자세한 방법: docs/MAP_SETUP.md)
// 이 값들은 웹에 공개돼도 되는 값이에요. 대신 구글 클라우드에서 'wanopro.github.io' 로 키 사용처를 꼭 제한하세요.
export const GOOGLE_MAPS_API_KEY = 'AIzaSyA6kXYyB68Jv0YfusnEorn1VqOKpIqnp8k';
export const firebaseConfig = {
  apiKey: 'AIzaSyBuUgyRRiN9JIWhTOnx9J04MVkubfxZjy0',
  authDomain: 'wolfgames-map.firebaseapp.com',
  projectId: 'wolfgames-map',
  storageBucket: 'wolfgames-map.firebasestorage.app',
  messagingSenderId: '265586471992',
  appId: '1:265586471992:web:b5c2a68f586423a522a2cd',
};

// 🐺 울프 커뮤니티 가게 이름 검색 주소 — 끝에 가게 이름이 붙음
// wolf.community 에서 아무거나 검색한 뒤 주소창 주소를 보고, 검색어 앞부분까지 여기에 넣으면 됩니다
// 여행 맛집 게시판(travel_food)에서 제목+내용 검색
export const WOLF_SEARCH = 'https://wolf.community/?_filter=search&mid=travel_food&search_target=title_content&search_keyword=';
