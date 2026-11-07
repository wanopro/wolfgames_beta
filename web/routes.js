// 🚐 파타야 썽태우(바트버스) 노선 — 맛집 지도 위에 색깔 선으로
// 길 모양(pts)은 구글 Routes API(운전)로 실제 도로를 따라 미리 받아서 넣어둠 → 휴대폰에서는 API 안 부름. pts 가 짧으면 그때만 Routes API로 받아 저장.
// 출처: pattayaunlimited.com · pattayapointer (2026-04 기준 요금). 기사님마다 다를 수 있어서 타기 전에 행선지 확인 안내.
export const ROUTES_VER = 3;
export const ROUTE_CENTER = { lat: 12.928, lng: 100.885 };

const P = (s) => `${s}, Pattaya, Chon Buri, Thailand`;
export const ROUTES = [
  { id: 'loop', color: '#2979FF', oneway: true,
    stops: [P('Dolphin Roundabout'), P('Pattaya Beach Rd & Pattaya Klang Rd'), P('Pattaya Beach Rd & Pattaya Tai Rd'), P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Pattaya 2nd Rd & Pattaya Klang Rd'), P('Dolphin Roundabout')],
    pts: [[12.95085,100.88759],[12.95085,100.8875],[12.9509,100.88743],[12.95076,100.88727],[12.95033,100.88692],[12.95016,100.88669],[12.95005,100.88645],[12.94948,100.88484],[12.94939,100.88464],[12.94933,100.88456],[12.94923,100.88453],[12.94915,100.88453],[12.94657,100.88481],[12.94545,100.88485],[12.94459,100.88486],[12.94333,100.8848],[12.94266,100.88472],[12.94169,100.88456],[12.94067,100.88434],[12.9397,100.88403],[12.9385,100.8836],[12.93776,100.88333],[12.93656,100.88277],[12.93547,100.8822],[12.935,100.8819],[12.93468,100.8817],[12.93303,100.88052],[12.93261,100.88016],[12.93188,100.87956],[12.93113,100.87884],[12.93084,100.87861],[12.92971,100.87741],[12.92909,100.8767],[12.92906,100.87664],[12.9279,100.87524],[12.92744,100.87468],[12.92653,100.87533],[12.92632,100.87547],[12.92665,100.87586],[12.92699,100.87622],[12.92738,100.87672],[12.9276,100.87718],[12.92785,100.87789],[12.92807,100.87839],[12.92826,100.87886],[12.92851,100.87923],[12.92875,100.8795],[12.92891,100.87965],[12.92935,100.88015],[12.92987,100.88066],[12.93006,100.88085],[12.93034,100.8812],[12.93075,100.88164],[12.93139,100.88245],[12.93165,100.8827],[12.93223,100.8834],[12.93258,100.88376],[12.93422,100.88498],[12.93451,100.88519],[12.9349,100.88545],[12.93511,100.8856],[12.93539,100.88575],[12.9358,100.88602],[12.93626,100.8863],[12.93666,100.88651],[12.93737,100.88672],[12.93884,100.88709],[12.93939,100.88725],[12.94052,100.88752],[12.94065,100.88758],[12.94165,100.88783],[12.94348,100.88837],[12.94457,100.88874],[12.94503,100.88892],[12.94541,100.88902],[12.94576,100.889],[12.94648,100.88893],[12.94703,100.88885],[12.9477,100.88877],[12.94794,100.88876],[12.94906,100.88861],[12.94933,100.88856],[12.9506,100.88772],[12.95077,100.88757]],
    name: { ko: '비치로드 ↔ 세컨로드 (한 바퀴)', en: 'Beach Rd ↔ 2nd Rd loop', ja: 'ビーチロード ↔ セカンドロード（周回）', zh: '海滩路 ↔ 二路（环线）', th: 'ถนนเลียบหาด ↔ พัทยาสาย 2 (วนรอบ)', vi: 'Vòng Beach Rd ↔ 2nd Rd' },
    desc: { ko: '한 방향으로만 돌아요: 비치로드는 남쪽으로, 세컨로드는 북쪽으로 (돌핀 로터리 ↔ 워킹스트리트 앞)', en: 'One-way: south on Beach Rd, north on 2nd Rd (Dolphin Roundabout ↔ Walking St)', ja: '一方通行：ビーチロードは南へ、セカンドロードは北へ（ドルフィン・ラウンドアバウト ↔ ウォーキングストリート前）', zh: '单向环线：海滩路往南，二路往北（海豚环岛 ↔ 步行街口）', th: 'วิ่งทางเดียว: เลียบหาดลงใต้ พัทยาสาย 2 ขึ้นเหนือ (วงเวียนปลาโลมา ↔ หน้าวอล์กกิ้งสตรีท)', vi: 'Một chiều: Beach Rd đi về nam, 2nd Rd đi về bắc (vòng xoay Cá Heo ↔ Walking St)' } },
  { id: 'jomtien', color: '#00C853', oneway: false,
    stops: [P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Thappraya Rd'), 'Jomtien Beach Rd & Jomtien Soi 1, Pattaya, Thailand', 'Jomtien Beach Rd & Jomtien Soi 11, Pattaya, Thailand'],
    pts: [[12.92824,100.87656],[12.92868,100.87619],[12.92744,100.87468],[12.92653,100.87533],[12.92632,100.87547],[12.92558,100.87444],[12.92536,100.87409],[12.92499,100.87368],[12.92441,100.87315],[12.92431,100.87309],[12.92364,100.87301],[12.9235,100.87295],[12.92338,100.87283],[12.92324,100.87263],[12.92314,100.87247],[12.92297,100.87204],[12.92285,100.87189],[12.92273,100.87178],[12.9225,100.87165],[12.92237,100.8716],[12.92223,100.87158],[12.92208,100.87155],[12.92194,100.87172],[12.92167,100.87197],[12.92148,100.8721],[12.92117,100.8722],[12.92072,100.87209],[12.92023,100.87194],[12.91979,100.87184],[12.91838,100.87161],[12.91794,100.87152],[12.91627,100.87136],[12.91592,100.8713],[12.91465,100.87101],[12.91352,100.8707],[12.91302,100.87049],[12.91271,100.87035],[12.9122,100.87003],[12.91148,100.86944],[12.91098,100.86914],[12.91051,100.86895],[12.91008,100.86883],[12.90968,100.86877],[12.90902,100.86877],[12.90849,100.86882],[12.90765,100.86894],[12.90742,100.86895],[12.90554,100.86921],[12.90325,100.86957],[12.90261,100.86966],[12.90168,100.86981],[12.90097,100.86994],[12.90093,100.86985],[12.89984,100.86836],[12.89948,100.86794],[12.89914,100.86754],[12.89898,100.8673],[12.89873,100.86704],[12.89864,100.86701],[12.89858,100.86704],[12.89801,100.86757],[12.89667,100.86886],[12.89589,100.86968],[12.89489,100.87064],[12.89409,100.87138],[12.89205,100.87318],[12.89017,100.8748],[12.88628,100.87803],[12.88504,100.87899],[12.88182,100.88157],[12.88118,100.88212],[12.87756,100.88496],[12.87627,100.88589],[12.87484,100.88696],[12.87442,100.88725]],
    name: { ko: '파타야 → 좀티엔', en: 'Pattaya → Jomtien', ja: 'パタヤ → ジョムティエン', zh: '芭提雅 → 宗甸', th: 'พัทยา → จอมเทียน', vi: 'Pattaya → Jomtien' },
    desc: { ko: '세컨로드 · 파타야 따이 교차로 조금 남쪽 정류장에서 타요. 언덕(탑프라야 로드) 넘어 좀티엔 비치로', en: 'Board at the stop just south of 2nd Rd & South Pattaya Rd, over the hill (Thappraya Rd) to Jomtien Beach', ja: 'セカンドロードとサウスパタヤロードの交差点のすぐ南の乗り場から。丘（タップラヤーロード）を越えてジョムティエンビーチへ', zh: '在二路与南芭提雅路路口稍南的车站上车，翻过山（Thappraya 路）到宗甸海滩', th: 'ขึ้นที่ป้ายใต้แยกพัทยาสาย 2 · พัทยาใต้เล็กน้อย ข้ามเขา (ถนนทัพพระยา) ไปหาดจอมเทียน', vi: 'Lên xe ở trạm ngay phía nam ngã tư 2nd Rd & South Pattaya Rd, qua đồi (Thappraya Rd) tới bãi Jomtien' } },
  { id: 'naklua', color: '#FFD600', oneway: false,
    stops: [P('Dolphin Roundabout'), 'Naklua Rd & Naklua Soi 12, Bang Lamung, Chon Buri, Thailand', 'Lan Pho Naklua Market, Bang Lamung, Chon Buri, Thailand'],
    pts: [[12.95085,100.88759],[12.95085,100.8875],[12.95091,100.88742],[12.95103,100.8874],[12.95111,100.88745],[12.95114,100.88749],[12.95136,100.88766],[12.95158,100.88787],[12.95325,100.88911],[12.95465,100.89015],[12.95498,100.89038],[12.95666,100.89154],[12.95735,100.89206],[12.95797,100.8925],[12.95836,100.89274],[12.95988,100.89383],[12.96038,100.89416],[12.96199,100.89536],[12.96223,100.89556],[12.96267,100.89587],[12.96449,100.89726],[12.96509,100.89768],[12.96588,100.89834],[12.96723,100.89935],[12.96837,100.9002],[12.96872,100.90055],[12.96893,100.90084],[12.96948,100.9017],[12.96969,100.90205],[12.96996,100.90234],[12.97054,100.90285],[12.97065,100.903],[12.97131,100.90414],[12.97182,100.90491],[12.97251,100.90579],[12.97296,100.9063],[12.97337,100.9069],[12.97447,100.90802],[12.97463,100.90813],[12.97536,100.90856],[12.97592,100.90887],[12.97705,100.90987],[12.97772,100.91051],[12.97789,100.91067]],
    name: { ko: '파타야 → 나끌르아', en: 'Pattaya → Naklua', ja: 'パタヤ → ナクルア', zh: '芭提雅 → 那库鲁', th: 'พัทยา → นาเกลือ', vi: 'Pattaya → Naklua' },
    desc: { ko: '세컨로드에서 북쪽 돌핀 로터리 방향. 비치로드나 북파타야로드로 꺾으면 내려서 나끌르아 가는 차로 갈아타요', en: 'North on 2nd Rd to the Dolphin Roundabout. If it turns onto Beach Rd or North Pattaya Rd, hop off and catch one to Naklua', ja: 'セカンドロードを北へドルフィン・ラウンドアバウト方面。ビーチロードかノースパタヤロードに曲がったら降りてナクルア行きに乗り換え', zh: '沿二路往北到海豚环岛。如果车拐进海滩路或北芭提雅路，就下车换去那库鲁的车', th: 'ขึ้นเหนือตามพัทยาสาย 2 ไปวงเวียนปลาโลมา ถ้ารถเลี้ยวเข้าเลียบหาดหรือพัทยาเหนือ ให้ลงแล้วต่อคันที่ไปนาเกลือ', vi: 'Đi về bắc theo 2nd Rd tới vòng xoay Cá Heo. Nếu xe rẽ vào Beach Rd hoặc North Pattaya Rd thì xuống đổi xe đi Naklua' } },
  { id: 'buakhao', color: '#D500F9', oneway: false,
    stops: [P('Soi Buakhao & Pattaya Tai Rd'), P('Soi Buakhao & Pattaya Klang Rd')],
    pts: [[12.92444,100.87949],[12.92477,100.8795],[12.92488,100.88005],[12.925,100.88015],[12.92561,100.88053],[12.92567,100.88063],[12.92572,100.88095],[12.92574,100.88116],[12.92585,100.88137],[12.92609,100.88169],[12.92628,100.88197],[12.92637,100.88227],[12.92656,100.88257],[12.92687,100.88297],[12.92736,100.88354],[12.92762,100.88378],[12.92793,100.88416],[12.92824,100.88444],[12.92852,100.88463],[12.92907,100.88499],[12.93002,100.88562],[12.93089,100.88613],[12.93173,100.8866],[12.93249,100.88697],[12.93284,100.88716],[12.93296,100.88727],[12.933,100.88736],[12.93301,100.88751],[12.93393,100.88781],[12.93505,100.88813],[12.93594,100.88854]],
    name: { ko: '소이 부아카오', en: 'Soi Buakhao', ja: 'ソイ・ブアカオ', zh: 'Buakhao 巷', th: 'ซอยบัวขาว', vi: 'Soi Buakhao' },
    desc: { ko: '파타야 따이 ↔ 파타야 끌랑 사이 양방향', en: 'Both ways between South Pattaya Rd and Central Pattaya Rd', ja: 'サウスパタヤロード ↔ セントラルパタヤロード間を両方向', zh: '南芭提雅路 ↔ 中芭提雅路之间双向', th: 'สองทาง ระหว่างพัทยาใต้ ↔ พัทยากลาง', vi: 'Hai chiều giữa South Pattaya Rd và Central Pattaya Rd' } },
  { id: 'tai', color: '#FF6D00', oneway: false,
    stops: [P('Pattaya 2nd Rd & Pattaya Tai Rd'), P('Sukhumvit Rd & Pattaya Tai Rd')],
    pts: [[12.92774,100.87505],[12.92744,100.87468],[12.92653,100.87533],[12.92621,100.87555],[12.92532,100.87618],[12.92503,100.87645],[12.92446,100.87707],[12.9243,100.87735],[12.92421,100.87762],[12.92386,100.88073],[12.92369,100.88211],[12.9236,100.88244],[12.92188,100.88612],[12.92087,100.88836],[12.91975,100.89061],[12.91885,100.8928],[12.91824,100.89392],[12.91725,100.8957],[12.91749,100.89601]],
    name: { ko: '파타야 따이 (남파타야로드)', en: 'South Pattaya Rd', ja: 'サウスパタヤロード', zh: '南芭提雅路', th: 'ถนนพัทยาใต้', vi: 'South Pattaya Rd' },
    desc: { ko: '세컨로드 ↔ 수쿰윗 사이 양방향', en: 'Both ways between 2nd Rd and Sukhumvit Hwy', ja: 'セカンドロード ↔ スクンビット間を両方向', zh: '二路 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างพัทยาสาย 2 ↔ สุขุมวิท', vi: 'Hai chiều giữa 2nd Rd và Sukhumvit' } },
  { id: 'klang', color: '#FF1744', oneway: false,
    stops: [P('Pattaya Beach Rd & Pattaya Klang Rd'), P('Sukhumvit Rd & Pattaya Klang Rd')],
    pts: [[12.93759,100.88383],[12.93698,100.88556],[12.93661,100.88665],[12.93602,100.88831],[12.93582,100.88888],[12.93535,100.89014],[12.93509,100.89092],[12.93471,100.892],[12.93431,100.89324],[12.93337,100.89601],[12.93233,100.89905],[12.93221,100.89937],[12.93214,100.89968],[12.93198,100.90011],[12.93199,100.9003],[12.93206,100.90044]],
    name: { ko: '파타야 끌랑 (센트럴로드)', en: 'Central Pattaya Rd', ja: 'セントラルパタヤロード', zh: '中芭提雅路', th: 'ถนนพัทยากลาง', vi: 'Central Pattaya Rd' },
    desc: { ko: '비치로드 · 세컨로드 ↔ 수쿰윗 사이 양방향', en: 'Both ways between Beach Rd / 2nd Rd and Sukhumvit Hwy', ja: 'ビーチロード・セカンドロード ↔ スクンビット間を両方向', zh: '海滩路 · 二路 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างเลียบหาด · สาย 2 ↔ สุขุมวิท', vi: 'Hai chiều giữa Beach Rd / 2nd Rd và Sukhumvit' } },
  { id: 'nuea', color: '#FF4081', oneway: false,
    stops: [P('Dolphin Roundabout'), P('Sukhumvit Rd & Pattaya Nuea Rd')],
    pts: [[12.95085,100.88759],[12.95104,100.88773],[12.95077,100.88994],[12.95045,100.89283],[12.9503,100.89452],[12.95004,100.89672],[12.94968,100.89883],[12.94955,100.89953],[12.94916,100.90252],[12.94908,100.90327],[12.94896,100.90407],[12.94864,100.90549],[12.94877,100.90553]],
    name: { ko: '파타야 느아 (북파타야로드)', en: 'North Pattaya Rd', ja: 'ノースパタヤロード', zh: '北芭提雅路', th: 'ถนนพัทยาเหนือ', vi: 'North Pattaya Rd' },
    desc: { ko: '돌핀 로터리 ↔ 수쿰윗 사이 양방향', en: 'Both ways between Dolphin Roundabout and Sukhumvit Hwy', ja: 'ドルフィン・ラウンドアバウト ↔ スクンビット間を両方向', zh: '海豚环岛 ↔ 素坤逸路之间双向', th: 'สองทาง ระหว่างวงเวียนปลาโลมา ↔ สุขุมวิท', vi: 'Hai chiều giữa vòng xoay Cá Heo và Sukhumvit' } },
];

export const RT = {
  ko: { btn: '🚐 썽태우', title: '🚐 파타야 썽태우 노선', fare: '요금: 10km까지 15바트, 넘으면 20바트 (2026년 4월부터) · 내릴 때 벨 누르고 기사님께 현금', warn: '기사님마다 노선이 다를 수 있어요. 타기 전에 행선지를 꼭 물어보세요.', approx: '누르면 끄기/켜기 · 선을 누르면 설명', hide: '노선 숨기기' },
  en: { btn: '🚐 Baht bus', title: '🚐 Pattaya baht bus routes', fare: 'Fare: 15 THB up to 10 km, 20 THB beyond (from Apr 2026) · ring the bell, pay the driver in cash', warn: 'Drivers sometimes change routes — always confirm your destination before boarding.', approx: 'Tap to hide/show · tap a line for details', hide: 'Hide routes' },
  ja: { btn: '🚐 ソンテウ', title: '🚐 パタヤ ソンテウ路線', fare: '運賃：10kmまで15バーツ、それ以上は20バーツ（2026年4月から）・降りるときはベルを押して運転手に現金で', warn: '運転手によって路線が変わることがあります。乗る前に必ず行き先を確認しましょう。', approx: 'タップで表示/非表示・線をタップで説明', hide: '路線を隠す' },
  zh: { btn: '🚐 双条车', title: '🚐 芭提雅双条车路线', fare: '车费：10公里内15泰铢，超过20泰铢（2026年4月起）· 下车按铃，现金付给司机', warn: '司机有时会改路线，上车前一定要问清目的地。', approx: '点一下隐藏/显示 · 点线看说明', hide: '隐藏路线' },
  th: { btn: '🚐 สองแถว', title: '🚐 สายรถสองแถวพัทยา', fare: 'ค่าโดยสาร: ไม่เกิน 10 กม. 15 บาท เกินนั้น 20 บาท (ตั้งแต่ เม.ย. 2026) · กดกริ่งแล้วจ่ายเงินสดกับคนขับ', warn: 'คนขับบางคันอาจเปลี่ยนเส้นทาง ถามปลายทางก่อนขึ้นทุกครั้ง', approx: 'แตะเพื่อซ่อน/แสดง · แตะเส้นเพื่อดูรายละเอียด', hide: 'ซ่อนเส้นทาง' },
  vi: { btn: '🚐 Xe songthaew', title: '🚐 Tuyến xe songthaew Pattaya', fare: 'Giá vé: tới 10 km 15 baht, xa hơn 20 baht (từ 4/2026) · bấm chuông khi xuống, trả tiền mặt cho tài xế', warn: 'Tài xế đôi khi đổi tuyến — luôn hỏi điểm đến trước khi lên xe.', approx: 'Chạm để ẩn/hiện · chạm vào tuyến để xem chi tiết', hide: 'Ẩn tuyến' },
};

/** 노선을 지도 위에 그리기. 돌려주는 값: { show(on), focus(id) } */
export function routeLayer(map, google, L, onPick) {
  const lines = []; let built = false;
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) { return null; } };
  const arrows = (r) => (r.oneway ? [{ icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2.6, strokeColor: '#fff', strokeWeight: 1, fillColor: r.color, fillOpacity: 1 }, offset: '24px', repeat: '90px' }] : []);
  const toPts = (arr) => arr.map((p) => (typeof p.lat === 'function' ? [p.lat(), p.lng()] : [p.lat, p.lng])).map(([a, b]) => [Math.round(a * 1e5) / 1e5, Math.round(b * 1e5) / 1e5]);
  async function viaRoutesApi(r) { // 새 Route 클래스 (Routes API) — 새 프로젝트는 이걸 써야 함
    const lib = await google.maps.importLibrary('routes');
    if (!lib.Route) return null;
    const { routes } = await lib.Route.computeRoutes({
      origin: r.stops[0], destination: r.stops[r.stops.length - 1], travelMode: 'DRIVING',
      intermediates: r.stops.slice(1, -1).map((s) => ({ location: s, via: true })), fields: ['path'],
    });
    const rt = routes && routes[0]; if (!rt) return null;
    if (rt.path && rt.path.length) return toPts(rt.path);
    const pl = rt.createPolylines ? rt.createPolylines() : [];
    const all = []; pl.forEach((x) => x.getPath().forEach((p) => all.push(p)));
    return all.length ? toPts(all) : null;
  }
  async function viaDirections(r) { // 예전 DirectionsService (Directions API, 예전 프로젝트용)
    const { DirectionsService } = await google.maps.importLibrary('routes');
    if (!DirectionsService) return null;
    const res = await new DirectionsService().route({
      origin: r.stops[0], destination: r.stops[r.stops.length - 1], travelMode: google.maps.TravelMode.DRIVING,
      waypoints: r.stops.slice(1, -1).map((s) => ({ location: s, stopover: false })), optimizeWaypoints: false,
    });
    return toPts(res.routes[0].overview_path);
  }
  async function pathOf(r) {
    const key = `wg-route-${ROUTES_VER}-${r.id}`;
    if (r.pts.length > 10) return r.pts; // 실제 도로 모양을 미리 받아서 넣어둠 (2026-11-07, 구글 Routes API) — 휴대폰에서 따로 안 받음
    try { const c = JSON.parse(store(key) || 'null'); if (c && c.length > 2) return c; } catch (_) { /* 무시 */ }
    for (const fn of [viaRoutesApi, viaDirections]) {
      try { const pts = await fn(r); if (pts && pts.length > 2) { store(key, JSON.stringify(pts)); return pts; } } catch (e) { console.warn('route', r.id, fn.name, e); }
    }
    return r.pts;
  }
  async function build() {
    built = true;
    for (const r of ROUTES) {
      const path = (await pathOf(r)).map(([lat, lng]) => ({ lat, lng }));
      const under = new google.maps.Polyline({ path, strokeColor: '#000', strokeOpacity: 0.45, strokeWeight: 9, zIndex: 1, clickable: false });
      const line = new google.maps.Polyline({ path, strokeColor: r.color, strokeOpacity: 0.95, strokeWeight: 5, zIndex: 2, icons: arrows(r) });
      line.addListener('click', () => onPick(r));
      lines.push({ r, under, line, path });
    }
  }
  // 범례에서 끈 노선 (이 휴대폰에 기억)
  let off = new Set(); try { off = new Set(JSON.parse(store('wg-route-off') || '[]')); } catch (_) { /* 무시 */ }
  let shown = false;
  const apply = () => lines.forEach((x) => { const v = shown && !off.has(x.r.id); x.under.setMap(v ? map : null); x.line.setMap(v ? map : null); });
  return {
    isOff: (id) => off.has(id),
    toggle(id) { if (off.has(id)) off.delete(id); else off.add(id); store('wg-route-off', JSON.stringify([...off])); apply(); return !off.has(id); },
    async show(on) {
      if (on && !built) await build();
      shown = on; apply();
      if (on) { map.setCenter(ROUTE_CENTER); map.setZoom(14); }
    },
    focus(id) {
      const x = lines.find((y) => y.r.id === id); if (!x) return;
      lines.forEach((y) => { y.line.setOptions({ strokeWeight: y === x ? 8 : 4, strokeOpacity: y === x ? 1 : 0.5 }); });
      const b = new google.maps.LatLngBounds(); x.path.forEach((p) => b.extend(p)); map.fitBounds(b, 70);
    },
  };
}
