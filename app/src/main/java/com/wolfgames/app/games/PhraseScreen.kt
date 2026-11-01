package com.wolfgames.app.games

import android.content.Context
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wolfgames.app.i18n.Lang
import com.wolfgames.app.i18n.LocalStrings
import com.wolfgames.app.i18n.part
import com.wolfgames.app.i18n.stringsFor
import com.wolfgames.app.ui.BigButton
import com.wolfgames.app.ui.GameScaffold
import com.wolfgames.app.ui.LocalVibe
import com.wolfgames.app.ui.Text
import com.wolfgames.app.ui.WG

// 🗣️ 회화 카드: 자주 쓰는 말을 현지어 큰 글씨로 (인터넷 없이) — 웹 phrase.js 와 같음
val PH_ICONS = listOf("🚻", "👉", "🧾", "💰", "🌶️", "🌿", "🧊", "💧", "🍺", "🥡", "💳", "🏷️", "📄", "📸", "📶", "💊", "🆘", "🥜")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun PhraseScreen(onBack: () -> Unit, mine: Lang, second: Lang?) {
    val s = LocalStrings.current; val vibe = LocalVibe.current; val ctx = LocalContext.current
    val prefs = remember { ctx.getSharedPreferences("wolfgames", Context.MODE_PRIVATE) }
    var to by remember { mutableStateOf(Lang.entries.firstOrNull { it.code == prefs.getString("ph_to", null) } ?: second ?: if (mine == Lang.EN) Lang.KO else Lang.EN) }
    var open by remember { mutableIntStateOf(-1) }
    val my = remember(mine) { stringsFor(mine).phrases.split('|') }
    val theirs = remember(to) { stringsFor(to).phrases.split('|') }
    if (open >= 0) {
        BackHandler { open = -1 }
        Column(Modifier.fillMaxSize().background(Color.White).systemBarsPadding().padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Spacer(Modifier.weight(1f))
            Text(PH_ICONS[open], fontSize = 64.sp)
            Text(theirs[open], color = Color(0xFF111111), fontSize = 40.sp, lineHeight = 50.sp, fontWeight = FontWeight.Black, textAlign = TextAlign.Center, modifier = Modifier.padding(top = 14.dp).widthIn(max = 600.dp))
            if (to != mine) Text(my[open], color = Color(0xFF666666), fontSize = 18.sp, textAlign = TextAlign.Center, modifier = Modifier.padding(top = 12.dp))
            Spacer(Modifier.weight(1f))
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                BigButton("‹", Modifier.weight(1f), color = Color(0xFFEEEEEE), contentColor = Color(0xFF222222)) { open = (open + theirs.size - 1) % theirs.size }
                BigButton(part(s.qrClose, 0), Modifier.weight(1f), color = Color(0xFF111111), contentColor = Color.White) { open = -1 }
                BigButton("›", Modifier.weight(1f), color = Color(0xFFEEEEEE), contentColor = Color(0xFF222222)) { open = (open + 1) % theirs.size }
            }
        }
        return
    }
    GameScaffold("🗣️ ${s.phTitle}", onBack) {
        Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(s.phDesc, color = WG.SubText, fontSize = 15.sp, lineHeight = 22.sp)
            Text(s.phTo, color = WG.SubText, fontSize = 14.sp, fontWeight = FontWeight.Bold)
            FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Lang.entries.forEach { L ->
                    val on = L == to
                    Row(Modifier.clip(RoundedCornerShape(20.dp)).background(if (on) WG.Accent else WG.Surface).clickable { vibe.tap(); to = L; prefs.edit().putString("ph_to", L.code).apply() }.padding(horizontal = 12.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text(L.flag, fontSize = 16.sp); Spacer(Modifier.width(6.dp)); Text(L.label, color = if (on) Color.Black else WG.Text, fontSize = 14.sp)
                    }
                }
            }
            my.forEachIndexed { i, m ->
                Row(Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(WG.Surface).clickable { vibe.tap(); open = i }.padding(horizontal = 14.dp, vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(PH_ICONS.getOrElse(i) { "💬" }, fontSize = 26.sp); Spacer(Modifier.width(12.dp))
                    Column {
                        Text(m, color = WG.Text, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        if (to != mine) Text(theirs.getOrElse(i) { "" }, color = WG.SubText, fontSize = 15.sp)
                    }
                }
            }
        }
    }
}
