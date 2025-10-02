document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu_icon");
  const mobileNav = document.querySelector(".mobile-nav");
  const lineA = document.querySelector(".linea");
  const lineB = document.querySelector(".lineb");
  const lineC = document.querySelector(".linec");

  menuIcon.addEventListener("click", function () {
    // メニューの開閉状態を切り替え
    mobileNav.classList.toggle("active");
    menuIcon.classList.toggle("open");
  });

  // メニュー内のリンクをクリックしたときにメニューを閉じる
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      menuIcon.classList.remove("open");
    });
  });
});
