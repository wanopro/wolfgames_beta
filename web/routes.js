// 🚐 파타야 썽태우(바트버스) 노선 — 맛집 지도 위에 색깔 선으로
// 길 모양은 구글 길찾기(운전)로 실제 도로에 맞춰 그림 (한 번 받으면 이 휴대폰에 저장). 실패하면 아래 pts 를 이은 직선으로.
// 출처: pattayaunlimited.com · pattayapointer (2026-04 기준 요금). 기사님마다 다를 수 있어서 타기 전에 행선지 확인 안내.
export const ROUTES_VER = 1;
export const ROUTE_CENTER = { lat: 12.928, lng: 100.885 };

const P = (s) => `${s}, Pattaya, Chon Buri, Thailand`;
export const ROUTES = [
  { id: 'loop', color: '#2979FF', oneway: true,
    stops: [P('Dolphin Roundabout'), P('Pattaya Beach Rd & Pattaya Klang Rd'), P('Pattaya Beach Rd & Pattaya Tai Rd'), P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Pattaya 2nd Rd & Pattaya Klang Rd'), P('Dolphin Roundabout')],
    pts: [[12.9505, 100.8885], [12.9365, 100.8824], [12.9282, 100.8762], [12.9292, 100.8792], [12.9372, 100.8852], [12.9505, 100.8885]],
    name: { ko: '비치로드 ↔ 세컨로드 (한 바퀴)', en: 'Beach Rd ↔ 2nd Rd loop', ja: 'ビーチロード ↔ セカンドロード（周回）', zh: '海滩路 ↔ 二路（环线）', th: 'ถนนเลียบหาด ↔ พัทยาสาย 2 (วนรอบ)', vi: 'Vòng Beach Rd ↔ 2nd Rd' },
    desc: { ko: '한 방향으로만 돌아요: 비치로드는 남쪽으로, 세컨로드는 북쪽으로 (돌핀 로터리 ↔ 워킹스트리트 앞)', en: 'One-way: south on Beach Rd, north on 2nd Rd (Dolphin Roundabout ↔ Walking St)', ja: '一方通行：ビーチロードは南へ、セカンドロードは北へ（ドルフィン・ラウンドアバウト ↔ ウォーキングストリート前）', zh: '单向环线：海滩路往南，二路往北（海豚环岛 ↔ 步行街口）', th: 'วิ่งทางเดียว: เลียบหาดลงใต้ พัทยาสาย 2 ขึ้นเหนือ (วงเวียนปลาโลมา ↔ หน้าวอล์กกิ้งสตรีท)', vi: 'Một chiều: Beach Rd đi về nam, 2nd Rd đi về bắc (vòng xoay Cá Heo ↔ Walking St)' } },
  { id: 'jomtien', color: '#00C853', oneway: false,
    stops: [P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Thappraya Rd'), 'Jomtien Beach Rd & Jomtien Soi 1, Pattaya, Thailand', 'Jomtien Beach Rd & Jomtien Soi 11, Pattaya, Thailand'],
    pts: [[12.9292, 100.8792], [12.9195, 100.8790], [12.9068, 100.8645], [12.8950, 100.8695]],
    name: { ko: '파타야 → 좀티엔', en: 'Pattaya → Jomtien', ja: 'パタヤ → ジョムティエン', zh: '芭提雅 → 宗甸', th: 'พัทยา → จอมเทียน', vi: 'Pattaya → Jomtien' },
    desc: { ko: '세컨로드 · 파타야 따이 교차로 조금 남쪽 정류장에서 타요. 언덕(탑프라야 로드) 넘어 좀티엔 비치로', en: 'Board at the stop just south of 2nd Rd & South Pattaya Rd, over the hill (Thappraya Rd) to Jomtien Beach', ja: 'セカンドロードとサウスパタヤロードの交差点のすぐ南の乗り場から。丘（タップラヤーロード）を越えてジョムティエンビーチへ', zh: '在二路与南芭提雅路路口稍南的车站上车，翻过山（Thappraya 路）到宗甸海滩', th: 'ขึ้นที่ป้ายใต้แยกพัทยาสาย 2 · พัทยาใต้เล็กน้อย ข้ามเขา (ถนนทัพพระยา) ไปหาดจอมเทียน', vi: 'Lên xe ở trạm ngay phía nam ngã tư 2nd Rd & South Pattaya Rd, qua đồi (Thappraya Rd) tới bãi Jomtien' } },
  { id: 'naklua', color: '#FFD600', oneway: false,
    stops: [P('Dolphin Roundabout'), 'Naklua Rd & Naklua Soi 12, Bang Lamung, Chon Buri, Thailand', 'Lan Pho Naklua Market, Bang Lamung, Chon Buri, Thailand'],
    pts: [[12.9505, 100.8885], [12.9580, 100.8925], [12.9665, 100.8935]],
    name: { ko: '파타야 → 나끌르아', en: 'Pattaya → Naklua', ja: 'パタヤ → ナクルア', zh: '芭提雅 → 那库鲁', th: 'พัทยา → นาเกลือ', vi: 'Pattaya → Naklua' },
    desc: { ko: '세컨로드에서 북쪽 돌핀 로터리 방향. 비치로드나 북파타야로드로 꺾으면 내려서 나끌르아 가는 차로 갈아타요', en: 'North on 2nd Rd to the Dolphin Roundabout. If it turns onto Beach Rd or North Pattaya Rd, hop off and catch one to Naklua', ja: 'セカンドロードを北へドルフィン・ラウンドアバウト方面。ビーチロードかノースパタヤロードに曲がったら降りてナクルア行きに乗り換え', zh: '沿二路往北到海豚环岛。如果车拐进海滩路或北芭提雅路，就下车换去那库鲁的车', th: 'ขึ้นเหนือตามพัทยาสาย 2 ไปวงเวียนปลาโลมา ถ้ารถเลี้ยวเข้าเลียบหาดหรือพัทยาเหนือ ให้ลงแล้วต่อคันที่ไปนาเกลือ', vi: 'Đi về bắc theo 2nd Rd tới vòng xoay Cá Heo. Nếu xe rẽ vào Beach Rd hoặc North Pattaya Rd thì xuống đổi xe đi Naklua' } },
  { id: 'buakhao', color: '#D500F9', oneway: false,
    stops: [P('Soi Buakhao & Pattaya Tai Rd'), P('Soi Buakhao & Pattaya Klang Rd')],
    pts: [[12.9262, 100.8900], [12.9380, 100.8920]],
    name: { ko: '소이 부아카오', en: 'Soi Buakhao', ja: 'ソイ・ブアカオ', zh: 'Buakhao 巷', th: 'ซอยบัวขาว', vi: 'Soi Buakhao' },
    desc: { ko: '파타야 따이 ↔ 파타야 끌랑 사이 양방향', en: 'Both ways between South Pattaya Rd and Central Pattaya Rd', ja: 'サウスパタヤロード ↔ セントラルパタヤロード間を両方向', zh: '南芭提雅路 ↔ 中芭提雅路之间双向', th: 'สองทาง ระหว่างพัทยาใต้ ↔ พัทยากลาง', vi: 'Hai chiều giữa South Pattaya Rd và Central Pattaya Rd' } },
  { id: 'tai', color: '#FF6D00', oneway: false,
    stops: [P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Sukhumvit Rd & Pattaya Tai Rd')],
    pts: [[12.9292, 100.8792], [12.9200, 100.9040]],
    name: { ko: '파타야 따이 (남파타야로드)', en: 'South Pattaya Rd', ja: 'サウスパタヤロード', zh: '南芭提雅路', th: 'ถนนพัทยาใต้', vi: 'South Pattaya Rd' },
    desc: { ko: '세컨로드 ↔ 수쿰윗 사이 양방향', en: 'Both ways between 2nd Rd and Sukhumvit Hwy', ja: 'セカンドロード ↔ スクンビット間を両方向', zh: '二路 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างพัทยาสาย 2 ↔ สุขุมวิท', vi: 'Hai chiều giữa 2nd Rd và Sukhumvit' } },
  { id: 'klang', color: '#FF1744', oneway: false,
    stops: [P('Pattaya Beach Rd & Pattaya Klang Rd'), P('Sukhumvit Rd & Pattaya Klang Rd')],
    pts: [[12.9365, 100.8824], [12.9330, 100.9090]],
    name: { ko: '파타야 끌랑 (센트럴로드)', en: 'Central Pattaya Rd', ja: 'セントラルパタヤロード', zh: '中芭提雅路', th: 'ถนนพัทยากลาง', vi: 'Central Pattaya Rd' },
    desc: { ko: '비치로드 · 세컨로드 ↔ 수쿰윗 사이 양방향', en: 'Both ways between Beach Rd / 2nd Rd and Sukhumvit Hwy', ja: 'ビーチロード・セカンドロード ↔ スクンビット間を両方向', zh: '海滩路 · 二路 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างเลียบหาด · สาย 2 ↔ สุขุมวิท', vi: 'Hai chiều giữa Beach Rd / 2nd Rd và Sukhumvit' } },
  { id: 'nuea', color: '#FF4081', oneway: false,
    stops: [P('Dolphin Roundabout'), P('Sukhumvit Rd & Pattaya Nuea Rd')],
    pts: [[12.9505, 100.8885], [12.9520, 100.9105]],
    name: { ko: '파타야 느아 (북파타야로드)', en: 'North Pattaya Rd', ja: 'ノースパタヤロード', zh: '北芭提雅路', th: 'ถนนพัทยาเหนือ', vi: 'North Pattaya Rd' },
    desc: { ko: '돌핀 로터리 ↔ 수쿰윗 사이 양방향', en: 'Both ways between Dolphin Roundabout and Sukhumvit Hwy', ja: 'ドルフィン・ラウンドアバウト ↔ スクンビット間を両方向', zh: '海豚环岛 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างวงเวียนปลาโลมา ↔ สุขุมวิท', vi: 'Hai chiều giữa vòng xoay Cá Heo và Sukhumvit' } },
];

export const RT = {
  ko: { btn: '🚐 썽태우', title: '🚐 파타야 썽태우 노선', fare: '요금: 10km까지 15바트, 넘으면 20바트 (2026년 4월부터) · 내릴 때 벨 누르고 기사님께 현금', warn: '기사님마다 노선이 다를 수 있어요. 타기 전에 행선지를 꼭 물어보세요.', approx: '대략적인 노선이에요', hide: '노선 숨기기' },
  en: { btn: '🚐 Baht bus', title: '🚐 Pattaya baht bus routes', fare: 'Fare: 15 THB up to 10 km, 20 THB beyond (from Apr 2026) · ring the bell, pay the driver in cash', warn: 'Drivers sometimes change routes — always confirm your destination before boarding.', approx: 'Routes are approximate', hide: 'Hide routes' },
  ja: { btn: '🚐 ソンテウ', title: '🚐 パタヤ ソンテウ路線', fare: '運賃：10kmまで15バーツ、それ以上は20バーツ（2026年4月から）・降りるときはベルを押して運転手に現金で', warn: '運転手によって路線が変わることがあります。乗る前に必ず行き先を確認しましょう。', approx: '路線はおおよそです', hide: '路線を隠す' },
  zh: { btn: '🚐 双条车', title: '🚐 芭提雅双条车路线', fare: '车费：10公里内15泰铢，超过20泰铢（2026年4月起）· 下车按铃，现金付给司机', warn: '司机有时会改路线，上车前一定要问清目的地。', approx: '路线为大致路线', hide: '隐藏路线' },
  th: { btn: '🚐 สองแถว', title: '🚐 สายรถสองแถวพัทยา', fare: 'ค่าโดยสาร: ไม่เกิน 10 กม. 15 บาท เกินนั้น 20 บาท (ตั้งแต่ เม.ย. 2026) · กดกริ่งแล้วจ่ายเงินสดกับคนขับ', warn: 'คนขับบางคันอาจเปลี่ยนเส้นทาง ถามปลายทางก่อนขึ้นทุกครั้ง', approx: 'เส้นทางโดยประมาณ', hide: 'ซ่อนเส้นทาง' },
  vi: { btn: '🚐 Xe songthaew', title: '🚐 Tuyến xe songthaew Pattaya', fare: 'Giá vé: tới 10 km 15 baht, xa hơn 20 baht (từ 4/2026) · bấm chuông khi xuống, trả tiền mặt cho tài xế', warn: 'Tài xế đôi khi đổi tuyến — luôn hỏi điểm đến trước khi lên xe.', approx: 'Tuyến chỉ mang tính ước lượng', hide: 'Ẩn tuyến' },
};

/** 노선을 지도 위에 그리기. 돌려주는 값: { show(on), focus(id) } */
export function routeLayer(map, google, L, onPick) {
  const lines = []; let built = false;
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) { return null; } };
  const arrows = (r) => (r.oneway ? [{ icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2.6, strokeColor: '#fff', strokeWeight: 1, fillColor: r.color, fillOpacity: 1 }, offset: '24px', repeat: '90px' }] : []);
  async function pathOf(r, svc) {
    const key = `wg-route-${ROUTES_VER}-${r.id}`;
    try { const c = JSON.parse(store(key) || 'null'); if (c && c.length > 2) return c; } catch (_) { /* 무시 */ }
    try {
      const res = await svc.route({
        origin: r.stops[0], destination: r.stops[r.stops.length - 1], travelMode: google.maps.TravelMode.DRIVING,
        waypoints: r.stops.slice(1, -1).map((s) => ({ location: s, stopover: false })), optimizeWaypoints: false,
      });
      const pts = res.routes[0].overview_path.map((p) => [Math.round(p.lat() * 1e5) / 1e5, Math.round(p.lng() * 1e5) / 1e5]);
      if (pts.length > 2) { store(key, JSON.stringify(pts)); return pts; }
    } catch (e) { console.warn('route', r.id, e); }
    return r.pts;
  }
  async function build() {
    built = true;
    const { DirectionsService } = await google.maps.importLibrary('routes');
    const svc = new DirectionsService();
    for (const r of ROUTES) {
      const path = (await pathOf(r, svc)).map(([lat, lng]) => ({ lat, lng }));
      const under = new google.maps.Polyline({ path, strokeColor: '#000', strokeOpacity: 0.45, strokeWeight: 9, zIndex: 1, clickable: false });
      const line = new google.maps.Polyline({ path, strokeColor: r.color, strokeOpacity: 0.95, strokeWeight: 5, zIndex: 2, icons: arrows(r) });
      line.addListener('click', () => onPick(r));
      lines.push({ r, under, line, path });
    }
  }
  return {
    async show(on) {
      if (on && !built) await build();
      lines.forEach((x) => { x.under.setMap(on ? map : null); x.line.setMap(on ? map : null); });
      if (on) { map.setCenter(ROUTE_CENTER); map.setZoom(14); }
    },
    focus(id) {
      const x = lines.find((y) => y.r.id === id); if (!x) return;
      lines.forEach((y) => { y.line.setOptions({ strokeWeight: y === x ? 8 : 4, strokeOpacity: y === x ? 1 : 0.5 }); });
      const b = new google.maps.LatLngBounds(); x.path.forEach((p) => b.extend(p)); map.fitBounds(b, 70);
    },
  };
}
