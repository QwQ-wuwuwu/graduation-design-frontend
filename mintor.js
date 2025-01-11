document.addEventListener('wheel', function(e) {
    if(e.ctrlKey) {
      console.log('禁止缩放屏幕')
      e.preventDefault()
    }
}, { passive: false })

window.addEventListener('resize', function(e) {
    if(window.innerWidth < 512 || window.innerHeight < 512) {
      e.preventDefault()
      window.alert('屏幕尺寸过小，请更换设备或调节屏幕大小以获得更好体验')
    }
}, { passive: false })

if(window.performance) {
    const navigationEntries = window.performance.getEntriesByType('navigation')
    if(navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0]

        const navigationStart = navigationEntry.startTime
        const domContentLoaded = navigationEntry.domContentLoadedEventEnd
        const responseStart = navigationEntry.responseStart
        const responseEnd = navigationEntry.responseEnd

        const domLoadTime = domContentLoaded - navigationStart;
        const responseTime = responseEnd - responseStart;

        console.log("页面加载总时间:", navigationEntry.duration, "毫秒");
        console.log("DOM 完成时间:", domLoadTime, "毫秒");
        console.log("请求响应时间:", responseTime, "毫秒");

        if (navigationEntry.duration > 5000) {
            console.log("页面加载时间过长，可能存在白屏问题");
        }
    } else {
        const time = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.domContentLoadedEventStart
        console.log('页面加载时间', time)
    }
}

const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach(entry => {
        if(entry.entryType === 'largest-contentful-paint') {
            const time = entry.startTime
            console.log("最大内容渲染(LCP)时间：", time, "毫秒");
        }
    })
})
observer.observe({ type: "largest-contentful-paint", buffered: true });