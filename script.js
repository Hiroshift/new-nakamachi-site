// script.js - シンプル版 (jQuery なし)

document.addEventListener('DOMContentLoaded', function() {

  // --- フッターの年を自動更新 ---
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
  }

  // --- お問い合わせフォームの処理 ---
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitButton = document.getElementById('submit-button');

  if (contactForm && submitButton && formMessage) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault(); // デフォルトの送信を止める

          submitButton.disabled = true;
          submitButton.textContent = '送信中...';
          formMessage.textContent = '';
          formMessage.className = 'form-message'; // クラスリセット

          // --- ダミーの送信処理 ---
          console.log('Form submitted (Simulation)');
          setTimeout(() => {
              formMessage.textContent = 'お問い合わせありがとうございます。（テスト送信）';
              formMessage.classList.add('success'); // 成功時のクラス追加
              contactForm.reset();
              submitButton.disabled = false;
              submitButton.textContent = '送信する';
          }, 1500);
          // --- ダミーここまで ---
      });
  }

  // --- モバイルメニュー (ハンバーガーボタン) の簡単なトグル (例) ---
  // この部分は必要に応じて調整・拡張してください
  const hamburgerButton = document.querySelector('.header__hamburger');
  const globalNav = document.querySelector('.header__gnav');

  if (hamburgerButton && globalNav) {
    hamburgerButton.addEventListener('click', function() {
      globalNav.classList.toggle('is-active'); // 'is-active' クラスを付け外し
      // 必要であれば、ここに .is-active 用の CSS を style.css に追加します
      // 例:
      // @media (max-width: 767px) {
      //   .header__gnav.is-active { display: block; position: absolute; top: 70px; left: 0; background: white; width: 100%; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      //   .header__gnav-list { flex-direction: column; padding: 20px; }
      //   .header__gnav-item { margin-bottom: 15px; }
      // }
    });
  }

});