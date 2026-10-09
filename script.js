/* فتح الظرف */
function openInvitation() {
    const music = document.getElementById("weddingMusic");

    music.volume = 0.5;

    music.play().catch(function () {
        console.log("اضغطي على الظرف لتشغيل الموسيقى");
    });
    var env = document.getElementById("envelope");
    document.getElementById("seal").classList.add("opening");
    env.classList.add("opening");      /* الغطاء يفتح ويطلع النور */
    setTimeout(function () { env.classList.add("fade"); }, 2300);
    setTimeout(function () {
        env.style.display = "none";
        document.getElementById("invitation").classList.add("show");
        window.scrollTo(0, 0);
        initReveal();
        startPetals();
    }, 3300);
}

/* ظهور تدريجي أثناء التمرير */
function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("in"); });
        return;
    }
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
}

/* عداد العرس: 4/11/2026 الساعة 7:45 مساءً */
const weddingDate = new Date("2026-11-04T19:45:00");

function updateCountdown() {
    const diff = weddingDate.getTime() - Date.now();
    const set = function (id, v) {
        document.getElementById(id).innerText = String(v).padStart(2, "0");
    };
    if (diff <= 0) { set("days", 0); set("hours", 0); set("minutes", 0); set("seconds", 0); return; }
    set("days", Math.floor(diff / 86400000));
    set("hours", Math.floor(diff / 3600000) % 24);
    set("minutes", Math.floor(diff / 60000) % 60);
    set("seconds", Math.floor(diff / 1000) % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* موقع القاعة */
function goToLocation() {
    window.open("https://www.google.com/maps/search/?api=1&query=قاعة%20رياحين%20دمشق%20كفرسوسة", "_blank");
}

/* بتلات حمرا بتنزل بكل الصفحات (بعد فتح الظرف) */
function startPetals() {
    var box = document.createElement("div");
    box.className = "petals";
    for (var i = 0; i < 26; i++) {
        var p = document.createElement("div");
        var s = 9 + Math.random() * 11;
        p.className = "petal";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = 9 + Math.random() * 9 + "s";
        p.style.animationDelay = -Math.random() * 16 + "s";
        var d = document.createElement("i");
        d.style.setProperty("--s", s + "px");
        d.style.animationDuration = 2.5 + Math.random() * 3 + "s";
        p.appendChild(d);
        box.appendChild(p);
    }
    document.body.appendChild(box);
}