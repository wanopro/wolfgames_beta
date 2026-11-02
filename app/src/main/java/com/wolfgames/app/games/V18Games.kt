package com.wolfgames.app.games

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.withFrameNanos
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.input.pointer.changedToDown
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import com.wolfgames.app.i18n.LocalStrings
import com.wolfgames.app.i18n.Strings
import com.wolfgames.app.ui.ChoiceRow
import com.wolfgames.app.ui.Ctx
import com.wolfgames.app.ui.GameScaffold
import com.wolfgames.app.ui.LocalVibe
import com.wolfgames.app.ui.SetupPanel
import com.wolfgames.app.ui.TAU
import com.wolfgames.app.ui.Vibe
import com.wolfgames.app.ui.coinWolfFace
import com.wolfgames.app.ui.dazedWolf
import com.wolfgames.app.ui.text
import java.util.concurrent.Executors
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sin
import kotlin.random.Random

// v1.8 새 게임 (글 없이 하는 게임): 🏗️ 탑 쌓기 · 🔴 따라 하기 (⚡ 순발력) · ✂️ 폭탄 선 자르기 (🍀 운빨) — 웹 games-v18.js 와 같음

private fun ease18(u: Float) = 1f - (1f - u.coerceIn(0f, 1f)).pow(3)

/** 🔊 짧은 소리 (기기에서 바로 만든 소리, 실패하면 조용히). kind: 0 사인 · 1 네모 · 2 톱니 · 3 세모 */
object Beep {
    private val pool = Executors.newCachedThreadPool()
    fun tone(hz: Float, dur: Float, kind: Int = 0, vol: Float = 0.22f) {
        pool.execute {
            try {
                val sr = 22050; val n = (sr * dur).toInt().coerceAtLeast(64); val buf = ShortArray(n); val att = sr * 0.015f
                for (i in 0 until n) {
                    val ph = (i.toFloat() * hz / sr) % 1f
                    val v = when (kind) { 1 -> if (ph < 0.5f) 1f else -1f; 2 -> 2f * ph - 1f; 3 -> 4f * abs(ph - 0.5f) - 1f; else -> sin(2 * PI.toFloat() * ph) }
                    val env = min(1f, i / att) * (1f - i.toFloat() / n).pow(2)
                    buf[i] = (v * env * vol * 32767).toInt().coerceIn(-32767, 32767).toShort()
                }
                val at = AudioTrack.Builder()
                    .setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_GAME).setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build())
                    .setAudioFormat(AudioFormat.Builder().setEncoding(AudioFormat.ENCODING_PCM_16BIT).setSampleRate(sr).setChannelMask(AudioFormat.CHANNEL_OUT_MONO).build())
                    .setBufferSizeInBytes(n * 2).setTransferMode(AudioTrack.MODE_STATIC).build()
                at.write(buf, 0, n); at.play(); Thread.sleep((dur * 1000).toLong() + 80); at.release()
            } catch (_: Throwable) { }
        }
    }
}

@Composable
private fun SetupThen18(title: String, onBack: () -> Unit, setup: @Composable (start: () -> Unit) -> Unit, game: @Composable () -> Unit) {
    var started by rememberSaveable { mutableStateOf(com.wolfgames.app.DebugOpen.autostart) }
    var round by remember { mutableIntStateOf(0) }
    if (!started) GameScaffold(title, onBack) { setup { started = true; round++ } }
    else { BackHandler { started = false }; GameScaffold(title, onBack = { started = false }) { androidx.compose.runtime.key(round) { game() } } }
}

/** 매 프레임 다시 그리는 캔버스 + 누른 곳 (x, y, t, w, h) */
@Composable
private fun Anim18(key: Any, onDown: (Float, Float, Float, Float, Float) -> Unit, draw: (Ctx, Float, Float, Float) -> Unit) {
    val density = LocalDensity.current.density
    val t0 = remember(key) { System.nanoTime() }
    val now = { (System.nanoTime() - t0) / 1e9f }
    var tick by remember { mutableLongStateOf(0L) }
    LaunchedEffect(key) { while (true) withFrameNanos { tick = it } }
    Canvas(Modifier.fillMaxSize().pointerInput(key) {
        awaitPointerEventScope {
            while (true) {
                val ev = awaitPointerEvent()
                for (ch in ev.changes) if (ch.changedToDown()) { onDown(ch.position.x / density, ch.position.y / density, now(), size.width / density, size.height / density); ch.consume() }
            }
        }
    }) {
        tick.let { }
        val w = size.width / density; val h = size.height / density
        drawIntoCanvas { cc -> val c = Ctx(cc.nativeCanvas, density); draw(c, w, h, now()); c.finish() }
    }
}

private fun Ctx.pill18(w: Float, h: Float, label: String) { fillStyle = "rgba(0,0,0,.55)"; beginPath(); roundRect(w / 2 - 110, h - 86, 220f, 44f, 22f); fill(); text(label, w / 2, h - 64, 17f, "#fff") }

// ===================== 🏗️ 탑 쌓기 =====================
val TS_COLS = listOf("#FF6B81", "#FFB74D", "#FFD54F", "#81C784", "#4DD0E1", "#64B5F6", "#9575CD", "#F06292")

@Composable
fun TowerScreen(onBack: () -> Unit) {
    val s = LocalStrings.current; val vibe = LocalVibe.current
    SetupThen18(s.tsTitle, onBack, { start -> SetupPanel(s.tsDesc, start) {} }) {
        val g = remember { TowerGame(vibe) }
        Anim18(g, onDown = { _, _, t, _, _ -> g.down(t) }) { c, w, h, t -> g.draw(c, w, h, t, s) }
    }
}

private class TowerGame(val vibe: Vibe) {
    class B(var x: Float, var w: Float)
    class Chip(val x: Float, val w: Float, val row: Int, val t: Float, val col: String, val dir: Int)
    var W = 0f; var H = 0f; var bh = 30f
    val blocks = ArrayList<B>(); var cur = B(0f, 0f); var dir = 1; var speed = 0f
    val chips = ArrayList<Chip>(); var fallT = 0f; var perfT = -9f; var passT = -9f; var landT = -9f; var cam = 0f; var last = -1f; var tip = 1
    fun reset(w: Float, h: Float) {
        W = w; H = h; val bw = w * 0.62f; bh = (h * 0.055f).coerceIn(22f, 36f)
        blocks.clear(); blocks.add(B((w - bw) / 2, bw)); cur = B(-bw * 0.5f, bw); dir = 1; speed = w * 0.5f
        chips.clear(); fallT = 0f; perfT = -9f; passT = -9f; landT = -9f; cam = 0f; last = -1f; tip = 1
    }
    fun rowY(i: Int) = H - 70 - (i + 1) * bh + cam
    fun colOf(i: Int) = if (i == 0) "#546E7A" else TS_COLS[(i - 1) % TS_COLS.size]
    fun Ctx.block(x: Float, y: Float, w: Float, col: String) {
        beginPath(); roundRect(x, y, w, bh - 2, 4f); fillStyle = col; fill()
        fillStyle = "rgba(255,255,255,.28)"; fillRect(x + 3, y + 2, max(0f, w - 6), bh * 0.2f)
    }
    fun down(t: Float) {
        if (blocks.isEmpty()) return
        if (fallT > 0) { if (t - fallT > 1.4f) { reset(W, H); vibe.tap() }; return }
        val n = blocks.size; val tb = blocks[n - 1]; val cu = cur
        val l = max(cu.x, tb.x); val r = min(cu.x + cu.w, tb.x + tb.w)
        if (r - l <= 0) { fallT = t; tip = if (cu.x < tb.x) -1 else 1; vibe.strong(); Beep.tone(110f, 0.6f, 2, 0.18f); return }
        val nb: B
        if (abs(cu.x - tb.x) < max(4f, W * 0.012f)) { nb = B(tb.x, cu.w); perfT = t; vibe.tick(); Beep.tone(880f, 0.18f) }
        else {
            val left = cu.x < tb.x
            chips.add(Chip(if (left) cu.x else r, if (left) tb.x - cu.x else cu.x + cu.w - r, n, t, colOf(n), if (left) -1 else 1))
            nb = B(l, r - l); vibe.tap(); Beep.tone(440f, 0.1f, 3)
        }
        blocks.add(nb); landT = t; passT = t
        val m = blocks.size
        cur = B(if (m % 2 == 1) -nb.w * 0.5f else W - nb.w * 0.5f, nb.w); dir = if (m % 2 == 1) 1 else -1
        speed = min(W * 1.7f, speed * 1.06f)
    }
    fun draw(c: Ctx, w: Float, h: Float, t: Float, s: Strings) = with(c) {
        fillStyle = "#12121A"; fillRect(0f, 0f, w, h)
        if (blocks.isEmpty() || W != w || H != h) reset(w, h)
        val dt = if (last < 0) 0f else min(0.05f, t - last); last = t
        val n = blocks.size
        cam += (max(0f, (n + 1) * bh - h * 0.5f) - cam) * min(1f, dt * 6)
        fillStyle = "#263238"; fillRect(0f, h - 70 + cam, w, 400f)
        val r = bh * 0.8f
        if (fallT == 0f) {
            cur.x += dir * speed * dt
            if (cur.x < -cur.w * 0.5f) { cur.x = -cur.w * 0.5f; dir = 1 }
            if (cur.x > w - cur.w * 0.5f) { cur.x = w - cur.w * 0.5f; dir = -1 }
            blocks.forEachIndexed { i, b -> block(b.x, rowY(i), b.w, colOf(i)) }
            val tb = blocks[n - 1]; val hop = if (t - landT < 0.3f) sin((t - landT) / 0.3f * PI.toFloat()) * bh * 0.5f else 0f
            save(); translate(tb.x + tb.w / 2, rowY(n - 1) - r * 0.62f - hop); coinWolfFace(r); restore()
            block(cur.x, rowY(n) - bh * 1.6f, cur.w, colOf(n))
        } else {
            val u = t - fallT
            blocks.forEachIndexed { i, b ->
                val k = i.toFloat() / max(1, n - 1); val d = max(0f, u - (n - 1 - i) * 0.04f)
                save(); translate(b.x + b.w / 2 + tip * d * d * w * 0.7f * k, rowY(i) + bh / 2 + d * d * 900 * k * k); rotate(tip * d * 2.2f * k)
                block(-b.w / 2, -bh / 2, b.w, colOf(i)); restore()
            }
            val tb = blocks[n - 1]
            save(); translate(tb.x + tb.w / 2 + tip * u * u * w * 0.8f, rowY(n - 1) - r * 0.62f + u * u * 1100); rotate(tip * u * 5); coinWolfFace(r); restore()
            block(cur.x, rowY(n) - bh * 1.6f + u * u * 1400, cur.w, colOf(n))
        }
        chips.removeAll { t - it.t >= 1.5f }
        for (p in chips) { val u = t - p.t; save(); globalAlpha = max(0f, 1 - u / 1.5f); translate(p.x + p.w / 2, rowY(p.row) + bh / 2 + u * u * 900); rotate(p.dir * u * 3); block(-p.w / 2, -bh / 2, p.w, p.col); restore() }
        text(s.tsFloor(n - 1), w / 2, 38f, 30f, "#fff")
        if (t - perfT < 0.8f) { globalAlpha = 1 - (t - perfT) / 0.8f; text("✨ PERFECT!", w / 2, 76 - (t - perfT) * 30, 22f, "#FFD740"); globalAlpha = 1f }
        if (fallT == 0f) {
            if (t - passT < 0.9f) { val u = (t - passT) / 0.9f; globalAlpha = 1 - u; text("👉", w / 2 + u * 60, h * 0.62f, 54f, "#fff"); globalAlpha = 1f }
            text(s.tsTap, w / 2, h - 22, 14f, "#9A9AB0", false)
        } else {
            val u = t - fallT
            if (u > 0.6f) { fillStyle = "rgba(0,0,0,.45)"; fillRect(0f, h * 0.3f, w, 130f); text(s.tsFall, w / 2, h * 0.3f + 42, 30f, "#FFD740"); text(s.shotWord, w / 2, h * 0.3f + 92, 26f, "#FF5A6E") }
            if (u > 1.4f) pill18(w, h, s.playAgain)
        }
    }
}

// ===================== 🔴 따라 하기 (사이먼) =====================
val SM_COL = listOf("#2ECC71" to "#145A32", "#E74C3C" to "#641E16", "#3498DB" to "#154360", "#F1C40F" to "#7D6608")
val SM_HZ = listOf(330f, 392f, 494f, 659f)

/** 색약도 알아보게 모양: ● ▲ ■ ★ */
fun Ctx.smShape(k: Int, x: Float, y: Float, r: Float) {
    beginPath()
    when (k) {
        0 -> arc(x, y, r, 0f, TAU)
        1 -> { moveTo(x, y - r); lineTo(x + r * 0.95f, y + r * 0.75f); lineTo(x - r * 0.95f, y + r * 0.75f); closePath() }
        2 -> rect(x - r * 0.82f, y - r * 0.82f, r * 1.64f, r * 1.64f)
        else -> { for (i in 0 until 10) { val a = -PI.toFloat() / 2 + i * PI.toFloat() / 5; val rr = if (i % 2 == 1) r * 0.45f else r * 1.05f; if (i == 0) moveTo(x + cos(a) * rr, y + sin(a) * rr) else lineTo(x + cos(a) * rr, y + sin(a) * rr) }; closePath() }
    }
    fill()
}

@Composable
fun SimonScreen(onBack: () -> Unit) {
    val s = LocalStrings.current; val vibe = LocalVibe.current
    SetupThen18(s.smTitle, onBack, { start -> SetupPanel(s.smDesc, start) {} }) {
        val g = remember { SimonGame(vibe) }
        Anim18(g, onDown = { x, y, t, w, h -> g.down(x, y, t, w, h) }) { c, w, h, t -> g.draw(c, w, h, t, s) }
    }
}

private class SimonGame(val vibe: Vibe) {
    val seq = ArrayList<Int>(); var phase = 0 // 0 보기 · 1 누르기 · 2 성공 · 3 틀림
    var ps = 0f; var inp = 0; var tap = -1; var tapT = -9f; var shown = -1; var pt = 0f
    init { fresh(0f) }
    fun fresh(t: Float) { seq.clear(); seq.add(Random.nextInt(4)); phase = 0; ps = t + 0.8f; inp = 0; tap = -1; tapT = -9f; shown = -1; pt = t }
    fun step() = max(0.3f, 0.62f - seq.size * 0.025f)
    class L(val x0: Float, val y0: Float, val p: Float, val gap: Float)
    fun layout(w: Float, h: Float): L { val sz = min(w - 32, h - 210); val gap = 12f; return L((w - sz) / 2, max(100f, (h - sz) / 2 + 10), (sz - gap) / 2, gap) }
    fun down(x: Float, y: Float, t: Float, w: Float, h: Float) {
        if (phase == 3) { if (t - pt > 1.2f) { fresh(t); vibe.tap() }; return }
        if (phase != 1) return
        val l = layout(w, h)
        val cx = floor((x - l.x0) / (l.p + l.gap)).toInt(); val cy = floor((y - l.y0) / (l.p + l.gap)).toInt()
        if (cx !in 0..1 || cy !in 0..1) return
        val k = cy * 2 + cx
        tap = k; tapT = t
        if (k != seq[inp]) { phase = 3; pt = t; vibe.strong(); Beep.tone(140f, 0.7f, 1, 0.15f); return }
        Beep.tone(SM_HZ[k], 0.22f); vibe.tap(); inp++
        if (inp >= seq.size) { phase = 2; pt = t }
    }
    fun draw(c: Ctx, w: Float, h: Float, t: Float, s: Strings) = with(c) {
        fillStyle = "#12121A"; fillRect(0f, 0f, w, h)
        val l = layout(w, h)
        var lit = -1
        if (phase == 0) {
            val st = step(); val k = floor((t - ps) / st).toInt()
            if (t >= ps) {
                if (k >= seq.size) { phase = 1; inp = 0; pt = t }
                else if (t - ps - k * st < st * 0.68f) { lit = seq[k]; if (shown != k) { shown = k; Beep.tone(SM_HZ[lit], st * 0.68f) } }
            }
        } else if (phase == 2 && t - pt > 1.1f) { seq.add(Random.nextInt(4)); phase = 0; ps = t + 0.3f; shown = -1 }
        if (phase != 0 && t - tapT < 0.22f) lit = tap
        val wrongK = if (phase == 3) seq[inp] else -1
        for (k in 0 until 4) {
            val x = l.x0 + (k % 2) * (l.p + l.gap); val y = l.y0 + (k / 2) * (l.p + l.gap)
            val on = k == lit || (k == wrongK && sin(t * 14) > 0)
            save(); translate(x + l.p / 2, y + l.p / 2); val sc = if (on) 1.04f else 1f; scale(sc, sc)
            beginPath(); roundRect(-l.p / 2, -l.p / 2, l.p, l.p, l.p * 0.16f); fillStyle = if (on) SM_COL[k].first else SM_COL[k].second; fill()
            if (on) { beginPath(); roundRect(-l.p / 2, -l.p / 2, l.p, l.p, l.p * 0.16f); fillStyle = "rgba(255,255,255,.22)"; fill() }
            fillStyle = if (on) "rgba(255,255,255,.95)" else "rgba(255,255,255,.35)"; smShape(k, 0f, 0f, l.p * 0.17f)
            restore()
        }
        text(s.smLevel(seq.size), w / 2, 38f, 30f, "#fff")
        val msg = when (phase) { 0 -> s.smWatch; 1 -> s.smGo; 2 -> s.smOk; else -> s.smWrong }
        val my = min(h - 110, l.y0 + l.p * 2 + l.gap + 34)
        text(msg, w / 2, my, 22f, when (phase) { 3 -> "#FF5A6E"; 2 -> "#FFD740"; else -> "#fff" })
        if (phase == 1) {
            val n = seq.size; val dw = min(14f, (w - 40) / n)
            for (i in 0 until n) { beginPath(); arc(w / 2 + (i - (n - 1) / 2f) * dw, 74f, min(4f, dw * 0.35f), 0f, TAU); fillStyle = if (i < inp) "#FFD740" else "rgba(255,255,255,.25)"; fill() }
        }
        if (phase == 3) { text(s.shotWord, w / 2, my + 40, 26f, "#FF5A6E"); if (t - pt > 1.2f) pill18(w, h, s.playAgain) }
    }
}

// ===================== ✂️ 폭탄 선 자르기 =====================
val WC_N = listOf(4, 5, 6, 8)
val WC_COLS = listOf("#E53935", "#1E88E5", "#FDD835", "#43A047", "#8E24AA", "#FB8C00", "#ECEFF1", "#8D6E63")

@Composable
fun WireCutScreen(onBack: () -> Unit) {
    val s = LocalStrings.current; val vibe = LocalVibe.current; val ctx = LocalContext.current
    val prefs = remember { ctx.getSharedPreferences("wolfgames", Context.MODE_PRIVATE) }
    var ni by remember { mutableIntStateOf(WC_N.indexOf(prefs.getInt("wc_n", 6)).coerceAtLeast(0)) }
    SetupThen18(s.wcTitle, onBack, { start ->
        SetupPanel(s.wcDesc, start) { ChoiceRow(s.wcWires, WC_N.map { "$it" }, ni) { ni = it; prefs.edit().putInt("wc_n", WC_N[it]).apply() } }
    }) {
        val g = remember { WireGame(WC_N[ni], vibe) }
        Anim18(g, onDown = { x, y, t, w, h -> g.down(x, y, t, w, h) }) { c, w, h, t -> g.draw(c, w, h, t, s) }
    }
}

private class WireGame(val n: Int, val vibe: Vibe) {
    var cols = IntArray(n); val cut = FloatArray(n); var bomb = 0; var boomT = 0f; var safeT = -9f; var cuts = 0; var clock = 0f; var last = -1f
    var snipX = 0f; var snipY = 0f; var snipT = -9f
    init { round() }
    fun round() {
        cols = (0 until WC_COLS.size).shuffled().take(n).toIntArray(); cut.fill(0f); bomb = Random.nextInt(n)
        boomT = 0f; safeT = -9f; cuts = 0; clock = 0f; last = -1f; snipT = -9f
    }
    class G(val bx: Float, val bw: Float, val by: Float, val bhh: Float, val y1: Float, val y2: Float, val left: Float, val gapX: Float)
    fun geo(w: Float, h: Float): G { val bx = w * 0.1f; val bw = w * 0.8f; val by = max(24f, h * 0.07f); val bhh = min(140f, h * 0.2f); return G(bx, bw, by, bhh, by + bhh, h * 0.8f, bx + bw * 0.04f, bw * 0.92f / n) }
    fun wireX(g: G, i: Int) = g.left + (i + 0.5f) * g.gapX
    fun Ctx.wirePath(g: G, i: Int) { val x = wireX(g, i); val amp = g.gapX * 0.32f * (if (i % 2 == 1) 1 else -1); val d = g.y2 - g.y1; beginPath(); moveTo(x, g.y1); bezierCurveTo(x + amp, g.y1 + d * 0.33f, x - amp, g.y1 + d * 0.66f, x, g.y2) }
    fun down(x: Float, y: Float, t: Float, w: Float, h: Float) {
        if (boomT > 0) { if (t - boomT > 1.3f) { round(); vibe.tap() }; return }
        val g = geo(w, h)
        if (y < g.y1 - 10 || y > g.y2 + 30) return
        var best = -1; var bd = g.gapX * 0.5f
        for (i in 0 until n) { if (cut[i] > 0) continue; val d = abs(x - wireX(g, i)); if (d < bd) { bd = d; best = i } }
        if (best < 0) return
        cut[best] = t; snipX = wireX(g, best); snipY = (g.y1 + g.y2) / 2; snipT = t
        if (best == bomb) { boomT = t; vibe.strong(); Beep.tone(70f, 0.9f, 2, 0.25f) }
        else { cuts++; safeT = t; vibe.tap(); Beep.tone(1200f, 0.06f, 1, 0.12f) }
    }
    fun draw(c: Ctx, w: Float, h: Float, t: Float, s: Strings) = with(c) {
        fillStyle = "#12121A"; fillRect(0f, 0f, w, h)
        val g = geo(w, h); val dt = if (last < 0) 0f else min(0.05f, t - last); last = t
        if (boomT == 0f) clock += dt * (1 + cuts * 0.8f)
        val shake = if (boomT > 0 && t - boomT < 0.5f) (1 - (t - boomT) / 0.5f) * 10 else 0f
        save(); if (shake > 0) translate((Random.nextFloat() - 0.5f) * shake, (Random.nextFloat() - 0.5f) * shake)
        beginPath(); roundRect(g.bx, g.y2 - 6, g.bw, 26f, 8f); fillStyle = "#37474F"; fill()
        val midY = (g.y1 + g.y2) / 2
        for (i in 0 until n) {
            val col = WC_COLS[cols[i]]
            val drawWire = { wirePath(g, i); strokeStyle = "rgba(0,0,0,.35)"; lineWidth = 12f; lineCap = "round"; stroke(); wirePath(g, i); strokeStyle = col; lineWidth = 8f; stroke() }
            if (cut[i] == 0f) { drawWire(); continue }
            val u = t - cut[i]; val sag = ease18(u / 0.4f) * 14
            save(); beginPath(); rect(0f, 0f, w, midY - 9); clip(); drawWire(); restore()
            save(); beginPath(); rect(0f, midY + 9, w, h); clip(); translate(0f, sag); drawWire(); restore()
            val x = wireX(g, i)
            fillStyle = "#FFB300"; beginPath(); arc(x, midY - 9, 4f, 0f, TAU); fill(); beginPath(); arc(x, midY + 9 + sag, 4f, 0f, TAU); fill()
            if (u < 0.35f && i != bomb) for (k in 0 until 6) { val a = k + t * 30; beginPath(); moveTo(x, midY); lineTo(x + cos(a) * 16, midY + sin(a) * 16); strokeStyle = "#FFF59D"; lineWidth = 2f; stroke() }
        }
        for (i in 0 until n) { beginPath(); arc(wireX(g, i), g.y2 + 7, 5f, 0f, TAU); fillStyle = "#90A4AE"; fill() }
        for (k in 0 until 3) {
            beginPath(); roundRect(g.bx + g.bw * (0.08f + k * 0.3f), g.by - 10, g.bw * 0.24f, g.bhh + 12, 10f); fillStyle = "#C62828"; fill()
            fillStyle = "rgba(255,255,255,.18)"; fillRect(g.bx + g.bw * (0.1f + k * 0.3f), g.by - 4, g.bw * 0.04f, g.bhh)
        }
        beginPath(); roundRect(g.bx, g.by + g.bhh * 0.22f, g.bw, g.bhh * 0.78f, 12f); fillStyle = "#263238"; fill()
        val tw = g.bw * 0.5f; val th = g.bhh * 0.42f; val tx = w / 2 - tw / 2; val ty = g.by + g.bhh * 0.38f
        beginPath(); roundRect(tx, ty, tw, th, 8f); fillStyle = "#0B0B0B"; fill()
        val sec = if (boomT > 0) 0 else 59 - (floor(clock).toInt() % 60)
        if (boomT > 0 || sin(t * (6 + cuts * 4)) > -0.3f) text("00:" + sec.toString().padStart(2, '0'), w / 2, ty + th / 2 + 1, th * 0.72f, "#FF1744")
        restore()
        if (t - snipT < 0.6f) { val u = (t - snipT) / 0.6f; globalAlpha = 1 - u; text("✂️", snipX, snipY - u * 20, 40f, "#fff"); globalAlpha = 1f }
        val left = cut.count { it == 0f }
        if (boomT == 0f) {
            if (t - safeT < 1.4f) { val u = (t - safeT) / 1.4f; globalAlpha = min(1f, (1 - u) * 3); text(s.wcSafe, w / 2, g.y2 + 52, 19f, "#69F0AE"); globalAlpha = 1f }
            else text(s.wcLeft(left), w / 2, g.y2 + 52, 17f, "#fff")
            text(s.wcTap, w / 2, h - 22, 14f, "#9A9AB0", false)
            return@with
        }
        val u = t - boomT
        if (u < 0.5f) { fillStyle = "rgba(255,240,200,${0.85f * (1 - u / 0.5f)})"; fillRect(0f, 0f, w, h) }
        text("💥", w / 2, g.by + g.bhh / 2, min(w, h) * 0.45f * (0.5f + 0.5f * ease18(u / 0.25f)), "#fff")
        if (u > 0.55f) {
            val p = ease18((u - 0.55f) / 0.35f); val r = min(w * 0.27f, h * 0.2f)
            fillStyle = "rgba(0,0,0,${0.6f * p})"; fillRect(0f, 0f, w, h)
            save(); globalAlpha = p; translate(w / 2, h * 0.45f); scale(0.7f + 0.3f * p, 0.7f + 0.3f * p); dazedWolf(0f, 0f, r, t); restore()
            globalAlpha = p; text(s.wcBoom, w / 2, h * 0.45f + r * 1.35f, 26f, "#FFD740"); text(s.shotWord, w / 2, h * 0.45f + r * 1.35f + 44, 26f, "#FF5A6E"); globalAlpha = 1f
        }
        if (u > 1.3f) pill18(w, h, s.playAgain)
    }
}
