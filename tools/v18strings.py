# v1.8 새 문구 (ko, en, ja, zh, th, vi) — 글 없이 하는 게임: 탑 쌓기 · 따라 하기 · 폭탄 선 자르기
# 사용: python3 tools/v18strings.py → python3 tools/gen_web_i18n.py → python3 tools/gen_dual.py
S = {
 # 🏗️ 탑 쌓기 (⚡ 순발력)
 'tsTitle': ['탑 쌓기', 'Tower Stack', 'タワー積み', '叠高塔', 'ต่อตึก', 'Xếp tháp'],
 'tsSub': ['딱 맞춰 쌓아라! 무너뜨리면 원샷', 'Stack it right! Topple it, drink it', 'ぴったり積め！崩したら一気', '对准叠好！弄倒就干杯', 'ต่อให้ตรง! ทำพังต้องดื่ม', 'Xếp cho khéo! Làm đổ là uống'],
 'tsDesc': ['좌우로 움직이는 블록을 터치해서 떨어뜨려요. 아래 블록 밖으로 삐져나간 부분은 잘려 나가요.\n한 번 누르면 폰을 다음 사람에게 넘겨요 👉\n탑을 무너뜨린 사람이 🍺 마셔요!',
            'Tap to drop the sliding block. Whatever hangs over the block below gets cut off.\nAfter one tap, pass the phone to the next person 👉\nWhoever topples the tower — 🍺 drink!',
            '左右に動くブロックをタッチして落とします。下のブロックからはみ出た部分は切れて落ちます。\n1回押したら次の人にスマホを渡して 👉\nタワーを崩した人が🍺飲む！',
            '点击屏幕让左右移动的方块落下。超出下面方块的部分会被切掉。\n点一次就把手机传给下一个人 👉\n把塔弄倒的人 🍺 喝！',
            'แตะเพื่อปล่อยบล็อกที่เลื่อนไปมา ส่วนที่ล้นออกนอกบล็อกข้างล่างจะถูกตัดทิ้ง\nแตะครั้งเดียวแล้วส่งมือถือให้คนถัดไป 👉\nใครทำตึกพัง — 🍺 ดื่ม!',
            'Chạm để thả khối đang trượt. Phần thò ra ngoài khối bên dưới sẽ bị cắt.\nChạm một lần rồi chuyền điện thoại cho người kế tiếp 👉\nAi làm đổ tháp — 🍺 uống!'],
 'tsFloor': ('fn', '(Int) -> String', ['{ "${it}층" }', '{ "Floor $it" }', '{ "${it}階" }', '{ "第${it}层" }', '{ "ชั้น $it" }', '{ "Tầng $it" }']),
 'tsTap': ['터치해서 떨어뜨리기 → 다음 사람 👉', 'Tap to drop → next person 👉', 'タッチで落とす → 次の人 👉', '点击放下 → 下一个人 👉', 'แตะเพื่อปล่อย → คนถัดไป 👉', 'Chạm để thả → người kế tiếp 👉'],
 'tsFall': ['💥 와르르! 무너졌다!', '💥 CRASH! It fell!', '💥 ガラガラ！崩れた！', '💥 哗啦！塔倒了！', '💥 โครม! พังแล้ว!', '💥 Ầm! Đổ rồi!'],
 # 🔴 따라 하기 (⚡ 순발력)
 'smTitle': ['따라 하기', 'Copy Me', 'まねっこ', '跟着按', 'ทำตาม', 'Bắt chước'],
 'smSub': ['반짝인 순서 그대로! 틀리면 마시기', 'Repeat the flashes! Miss and drink', '光った順にそのまま！間違えたら飲む', '照着亮的顺序按！错了就喝', 'กดตามลำดับที่กะพริบ! ผิดต้องดื่ม', 'Bấm đúng thứ tự nháy! Sai là uống'],
 'smDesc': ['색 버튼이 소리와 함께 순서대로 반짝여요. 잘 보고 똑같은 순서로 눌러요.\n성공하면 순서가 하나 늘어나고 폰을 다음 사람에게 넘겨요 👉\n틀린 사람이 🍺 마셔요! (소리 켜면 더 쉬워요 🔊)',
            'The color buttons flash in order with a sound. Watch, then press them in the same order.\nGet it right and the sequence grows by one — pass the phone on 👉\nWhoever misses — 🍺 drink! (Turn sound on to make it easier 🔊)',
            '色ボタンが音と一緒に順番に光ります。よく見て同じ順番で押そう。\n成功すると1つ増えて、次の人にスマホを渡して 👉\n間違えた人が🍺飲む！（音をオンにすると簡単 🔊）',
            '彩色按钮会随着声音按顺序亮起。看好后按同样的顺序按。\n成功后顺序多一个，把手机传给下一个人 👉\n按错的人 🍺 喝！（开声音更容易 🔊）',
            'ปุ่มสีจะกะพริบตามลำดับพร้อมเสียง ดูให้ดีแล้วกดตามลำดับเดิม\nถ้าถูก ลำดับจะเพิ่มขึ้นหนึ่ง แล้วส่งมือถือให้คนถัดไป 👉\nใครกดผิด — 🍺 ดื่ม! (เปิดเสียงจะง่ายขึ้น 🔊)',
            'Các nút màu nháy theo thứ tự kèm âm thanh. Nhìn kỹ rồi bấm đúng thứ tự đó.\nĐúng thì chuỗi dài thêm một, chuyền điện thoại cho người kế tiếp 👉\nAi bấm sai — 🍺 uống! (Bật âm thanh sẽ dễ hơn 🔊)'],
 'smLevel': ('fn', '(Int) -> String', ['{ "${it}단계" }', '{ "Level $it" }', '{ "レベル $it" }', '{ "第${it}关" }', '{ "ด่าน $it" }', '{ "Cấp $it" }']),
 'smWatch': ['👀 잘 봐요', '👀 Watch', '👀 よく見て', '👀 看好', '👀 ดูให้ดี', '👀 Xem kỹ'],
 'smGo': ['👆 따라 눌러요!', '👆 Your turn!', '👆 まねして押して！', '👆 跟着按！', '👆 กดตามเลย!', '👆 Bấm theo!'],
 'smOk': ['⭕ 성공! 다음 사람 👉', '⭕ Nice! Next person 👉', '⭕ 成功！次の人 👉', '⭕ 成功！下一个人 👉', '⭕ ถูก! คนถัดไป 👉', '⭕ Đúng! Người kế tiếp 👉'],
 'smWrong': ['❌ 틀렸다!', '❌ Wrong!', '❌ 間違い！', '❌ 按错了！', '❌ ผิด!', '❌ Sai rồi!'],
 # ✂️ 폭탄 선 자르기 (🍀 운빨)
 'wcTitle': ['폭탄 선 자르기', 'Cut the Wire', '爆弾の線切り', '剪炸弹线', 'ตัดสายระเบิด', 'Cắt dây bom'],
 'wcSub': ['진짜 선을 자르면 펑! 운에 맡겨', 'Cut the wrong one — BOOM! Trust your luck', '本物の線を切ったらドカン！運まかせ', '剪到真线就爆炸！全靠运气', 'ตัดโดนสายจริง ตูม! วัดดวง', 'Cắt trúng dây thật là BÙM! Phó mặc số phận'],
 'wcDesc': ['폭탄에 색깔 선이 여러 개 있어요. 그중 하나만 진짜예요.\n돌아가면서 선을 하나씩 터치해서 잘라요 ✂️ 자르고 나면 다음 사람에게 👉\n진짜 선을 자른 사람이 💥 원샷!',
            'The bomb has several colored wires. Only one of them is real.\nTake turns tapping a wire to cut it ✂️ then pass to the next person 👉\nWhoever cuts the real one — 💥 bottoms up!',
            '爆弾に色の線がいくつかあります。本物は1本だけ。\n順番に線を1本タッチして切ります ✂️ 切ったら次の人へ 👉\n本物の線を切った人が💥一気！',
            '炸弹上有好几根彩色的线，只有一根是真的。\n轮流点一根线把它剪断 ✂️ 剪完传给下一个人 👉\n剪到真线的人 💥 干杯！',
            'ระเบิดมีสายหลายสี แต่มีสายจริงแค่เส้นเดียว\nผลัดกันแตะสายเพื่อตัดทีละเส้น ✂️ ตัดแล้วส่งให้คนถัดไป 👉\nใครตัดโดนสายจริง — 💥 หมดแก้ว!',
            'Quả bom có nhiều dây màu. Chỉ một dây là thật.\nLần lượt chạm một dây để cắt ✂️ rồi chuyền cho người kế tiếp 👉\nAi cắt trúng dây thật — 💥 cạn ly!'],
 'wcWires': ['선 개수', 'Wires', '線の数', '线的数量', 'จำนวนสาย', 'Số dây'],
 'wcTap': ['✂️ 선을 하나 터치해서 잘라요', '✂️ Tap a wire to cut it', '✂️ 線を1本タッチして切る', '✂️ 点一根线剪断', '✂️ แตะสายเพื่อตัด', '✂️ Chạm một dây để cắt'],
 'wcSafe': ['😮‍💨 휴~ 살았다! 다음 사람 👉', '😮‍💨 Phew~ safe! Next person 👉', '😮‍💨 ふぅ〜セーフ！次の人 👉', '😮‍💨 呼~安全！下一个人 👉', '😮‍💨 เฮ้อ~ รอด! คนถัดไป 👉', '😮‍💨 Phù~ thoát! Người kế tiếp 👉'],
 'wcBoom': ['💥 펑! 진짜 선이었다!', '💥 BOOM! That was the one!', '💥 ドカン！本物だった！', '💥 砰！就是这根！', '💥 ตูม! สายจริง!', '💥 BÙM! Đúng dây thật!'],
 'wcLeft': ('fn', '(Int) -> String', ['{ "남은 선 $it" }', '{ "$it wires left" }', '{ "残り $it 本" }', '{ "还剩 $it 根" }', '{ "เหลือ $it สาย" }', '{ "Còn $it dây" }']),
 # 🍺 늑대컬링 (⚡ 순발력)
 'cuTitle': ['늑대컬링', 'Wolf Curling', 'オオカミカーリング', '狼冰壶', 'เคิร์ลลิงหมาป่า', 'Bi đá sói'],
 'cuSub': ['늑대 잔을 당겼다 놓아 끝에 딱!', 'Pull back the wolf mug, let go, stop at the edge!', 'オオカミジョッキを引いて放して端ギリギリに！', '把狼杯往后拉再松手，停在桌边！', 'ดึงแก้วหมาป่าแล้วปล่อย ให้หยุดชิดขอบ!', 'Kéo cốc sói rồi thả, dừng sát mép!'],
 'cuDesc': ['테이블 아래쪽의 늑대 맥주잔을 손가락으로 뒤로(아래로) 당겼다가 놓으면 앞으로 미끄러져요. 많이 당길수록 멀리 가요.\n테이블 끝에 가까울수록 좋아요. 끝을 넘으면 💦 떨어져요.\n돌아가며 한 번씩! 떨어진 사람은 모두 🍺 원샷, 아무도 안 떨어졌으면 제일 먼 사람이 마셔요.',
            'Pull the wolf mug at the bottom of the table back (down) with your finger and let go — it slides forward. The more you pull, the farther it goes.\nThe closer to the edge, the better. Go past it and it 💦 falls off.\nOne turn each! Everyone who falls off drinks 🍺, and if nobody does, the farthest one drinks.',
            'テーブル下のオオカミジョッキを指で後ろ（下）に引いて放すと前に滑ります。たくさん引くほど遠くへ。\nテーブルの端に近いほど良い。端を越えると💦落ちます。\n1人1回ずつ！落ちた人は全員🍺一気、誰も落ちなければ一番遠い人が飲む。',
            '用手指把桌子下方的狼啤酒杯往后（往下）拉，松手它就会往前滑。拉得越多滑得越远。\n越靠近桌边越好。超过桌边就会 💦 掉下去。\n每人轮流一次！掉下去的人全部 🍺 干杯，没人掉的话离桌边最远的人喝。',
            'ใช้นิ้วดึงแก้วเบียร์หมาป่าด้านล่างโต๊ะไปข้างหลัง (ลง) แล้วปล่อย มันจะไถลไปข้างหน้า ยิ่งดึงมากยิ่งไปไกล\nยิ่งใกล้ขอบโต๊ะยิ่งดี ถ้าเลยขอบจะ 💦 ตกลงไป\nผลัดกันคนละครั้ง! ใครตกต้อง 🍺 หมดแก้วทุกคน ถ้าไม่มีใครตก คนที่ไกลที่สุดดื่ม',
            'Dùng ngón tay kéo cốc bia sói ở cuối bàn về sau (xuống dưới) rồi thả — nó trượt về phía trước. Kéo càng nhiều càng đi xa.\nCàng sát mép bàn càng tốt. Vượt quá mép là 💦 rơi.\nMỗi người một lượt! Ai rơi đều 🍺 cạn ly, nếu không ai rơi thì người xa nhất uống.'],
 'cuHint': ['👇 뒤로 당겼다가 놓기', '👇 Pull back, then let go', '👇 後ろに引いて放す', '👇 往后拉再松手', '👇 ดึงลงแล้วปล่อย', '👇 Kéo xuống rồi thả'],
 'cuFall': ['💦 떨어졌다!', '💦 It fell off!', '💦 落ちた！', '💦 掉下去了！', '💦 ตกแล้ว!', '💦 Rơi rồi!'],
}
MENU = {
 'menuQuickSub': ['반응속도 대결 · 색 반응 대결 · 스탑워치 · 맥주 거품 채우기 · 탑 쌓기 · 따라 하기 · 늑대컬링', 'Reaction Duel · Color Reaction · Stopwatch · Beer Pour · Tower Stack · Copy Me · Wolf Curling', '反応速度対決 · 色反応対決 · ストップウォッチ · ビール注ぎ · タワー積み · まねっこ · オオカミカーリング', '反应速度对决 · 颜色反应对决 · 秒表 · 倒啤酒 · 叠高塔 · 跟着按 · 狼冰壶', 'ดวลความไว · ดวลสี · นาฬิกาจับเวลา · รินเบียร์ · ต่อตึก · ทำตาม · เคิร์ลลิงหมาป่า', 'Đấu phản xạ · Đấu màu · Bấm giờ · Rót bia · Xếp tháp · Bắt chước · Bi đá sói'],
 'menuLuckSub': ['사다리게임 · 돌림판 · 폭탄돌리기 · 동전 던지기 · 플링코 · 숫자 폭탄 · 풍선 불기 · 폭탄 선 자르기 · 손가락선택', 'Ladder Game · Roulette · Hot Bomb · Coin Toss · Plinko · Number Bomb · Balloon Pump · Cut the Wire · Finger Pick', 'あみだくじ · ルーレット · 爆弾回し · コイントス · プリンコ · 数字爆弾 · 風船ふくらまし · 爆弾の線切り · 指えらび', '爬梯子 · 转盘 · 传炸弹 · 抛硬币 · 弹珠台 · 数字炸弹 · 吹气球 · 剪炸弹线 · 手指选人', 'เกมบันได · วงล้อ · ส่งระเบิด · โยนเหรียญ · พลิงโก · ระเบิดตัวเลข · เป่าลูกโป่ง · ตัดสายระเบิด · จิ้มนิ้วเลือกคน', 'Leo thang · Vòng quay · Chuyền bom · Tung đồng xu · Plinko · Bom số · Thổi bóng bay · Cắt dây bom · Chọn ngón tay'],
}
if __name__ == '__main__':
    import json, re
    P = 'app/src/main/java/com/wolfgames/app/i18n/Strings.kt'
    src = open(P, encoding='utf-8').read()
    LANGS = ['Ko', 'En', 'Ja', 'Zh', 'Th', 'Vi']
    kq = lambda v: json.dumps(v, ensure_ascii=False).replace('$', '\\$')
    for k, v in list(S.items()) + list(MENU.items()):
        assert len(v[2] if isinstance(v, tuple) else v) == 6, k
    decl = ''.join(f'    lateinit var {k}: {v[1] if isinstance(v, tuple) else "String"}\n' for k, v in S.items() if f'lateinit var {k}:' not in src)
    i = src.index('\n}\n', src.index('class Strings {')); src = src[:i + 1] + decl + src[i + 1:]
    for li, L in enumerate(LANGS):
        head = f'val {L}Strings = Strings().apply {{'
        st = src.index(head); en = src.index('\n}\n', st); body = src[st:en]; add = ''
        for k, v in S.items():
            if re.search(rf'^    {k} = ', body, re.M): continue
            add += f'    {k} = {v[2][li] if isinstance(v, tuple) else kq(v[li])}\n'
        for k, v in MENU.items():
            body, n = re.subn(rf'^    {k} = .*$', lambda m: f'    {k} = {kq(v[li])}', body, flags=re.M); assert n == 1, k
        src = src[:st] + body + ('\n' + add.rstrip('\n') if add else '') + src[en:]
    open(P, 'w', encoding='utf-8').write(src); print('ok', len(S))
