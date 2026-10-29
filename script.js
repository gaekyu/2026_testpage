// =============================================================
// 1) 푸터의 연도를 자동으로 표시
// 2) 다크 / 라이트 모드 전환 버튼 (선택은 브라우저에 저장)
// 3) 헤더의 한줄소개를 타자 치듯 한 글자씩 보여주기
// =============================================================
(function () {
  // --- 1) 연도 ---
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  // --- 2) 테마 전환 ---
  var root = document.documentElement;                 // <html> 태그
  var btn = document.getElementById('theme-toggle');   // 해/달 버튼

  // 지금 테마 이름 ("light" 또는 "dark"). 저장된 값이 없으면 dark.
  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  // 버튼의 설명 글씨(마우스 올리면 뜨는 말, 스크린리더용)를 현재 상태에 맞게 바꾸기
  function updateButton() {
    if (!btn) { return; }
    var label = currentTheme() === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  // 테마 바꾸고 저장하기
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);   // CSS가 이 값을 보고 색을 바꿔요
    try { localStorage.setItem('theme', theme); } catch (e) {}  // 저장이 막혀 있어도 에러 없이 넘어가기
    updateButton();
  }

  updateButton();
  if (btn) {
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // --- 3) 타자 효과 ---
  var el = document.querySelector('.typing');
  if (!el) { return; }

  // 사용자가 "동작 줄이기"를 켰다면 효과 없이 그대로 보여줘요
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  var text = el.textContent;   // HTML에 적어둔 문장을 가져와서
  el.textContent = '';         // 화면에서는 일단 비우고
  var i = 0;                   // 지금까지 몇 글자를 보여줬는지

  function typeNext() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);  // 앞에서부터 i글자만 보여주기
      i++;
      setTimeout(typeNext, 70);           // 0.07초 뒤에 다음 글자
    }
  }
  typeNext();
})();
