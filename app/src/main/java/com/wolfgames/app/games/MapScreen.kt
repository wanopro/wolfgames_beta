package com.wolfgames.app.games

import android.Manifest
import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.wolfgames.app.i18n.LocalStrings
import com.wolfgames.app.ui.GameScaffold

/**
 * 🍜 맛집 지도 — 웹 버전(map.html)을 앱 안에서 그대로 보여줌.
 * 지도·후기 데이터는 인터넷(구글맵·Firebase)에서 받아오므로 앱 용량은 거의 그대로.
 * 구글맵 링크(앱에서 열기·길찾기)는 폰의 구글맵 앱으로 넘김.
 */
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MapScreen(onBack: () -> Unit, langCode: String) {
    val ctx = LocalContext.current
    val s = LocalStrings.current
    val base = if (ctx.packageName.endsWith(".beta")) "https://wanopro.github.io/wolfgames_beta/" else "https://wanopro.github.io/wolfgames/"
    val url = "${base}map.html?app=1&lang=$langCode"

    // 웹에서 '내 위치'를 누르면 위치 권한을 물어봄
    val pending = remember { arrayOfNulls<Pair<String, GeolocationPermissions.Callback>>(1) }
    val askLocation = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { res ->
        val ok = res.values.any { it }
        pending[0]?.let { (origin, cb) -> cb.invoke(origin, ok, false) }
        pending[0] = null
    }

    val web = remember {
        WebView(ctx).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true // 닉네임 기억
            settings.setGeolocationEnabled(true)
            setBackgroundColor(0xFF12121A.toInt())
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, req: WebResourceRequest): Boolean {
                    val u = req.url
                    val host = u.host.orEmpty()
                    // 우리 지도 페이지는 앱 안에서, 그 밖(구글맵 등)은 폰 앱으로
                    if (u.scheme == "https" && host == "wanopro.github.io") return false
                    return try {
                        ctx.startActivity(Intent(Intent.ACTION_VIEW, u).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); true
                    } catch (_: ActivityNotFoundException) { false }
                }
            }
            webChromeClient = object : WebChromeClient() {
                override fun onGeolocationPermissionsShowPrompt(origin: String, callback: GeolocationPermissions.Callback) {
                    val has = ContextCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
                        ContextCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
                    if (has) callback.invoke(origin, true, false)
                    else {
                        pending[0] = origin to callback
                        askLocation.launch(arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION))
                    }
                }
            }
            loadUrl(url)
        }
    }
    DisposableEffect(Unit) { onDispose { web.stopLoading(); web.destroy() } }

    // 지도 안에서 열린 창(상세·추가)이 있으면 먼저 닫고, 아니면 메인으로
    BackHandler {
        web.evaluateJavascript("(function(){var o=document.querySelector('.sheet.open');if(o){o.classList.remove('open');return 1}return 0})()") { r ->
            if (r != "1") { if (web.canGoBack()) web.goBack() else onBack() }
        }
    }

    GameScaffold(title = s.mapBtn, onBack = onBack) {
        AndroidView(factory = { web }, modifier = Modifier.fillMaxSize())
    }
}

