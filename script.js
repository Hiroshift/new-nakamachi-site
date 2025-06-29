console.log('script.jsが読み込まれました');
// script.js - EmailJS 実装版

// フルスクリーン防止の設定
document.addEventListener('DOMContentLoaded', function() {
    // フルスクリーン要求を防止
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
    
    // webkit系ブラウザ用
    document.addEventListener('webkitfullscreenchange', function() {
        if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        }
    });
    
    // moz系ブラウザ用
    document.addEventListener('mozfullscreenchange', function() {
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        }
    });
    
    // ms系ブラウザ用
    document.addEventListener('MSFullscreenChange', function() {
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        }
    });
    
    // キーボードショートカットでのフルスクリーン防止
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F11' || (e.ctrlKey && e.key === 'f') || (e.metaKey && e.key === 'f')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);
    
    // 右クリックメニューでのフルスクリーン防止
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // フルスクリーンAPIの完全無効化
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // webkit系ブラウザ用
    if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // moz系ブラウザ用
    if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // ms系ブラウザ用
    if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // ローディング画面のフルスクリーン防止
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, true);
        
        loadingScreen.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, true);
    }
});

// ヘッダースクロール効果の初期化
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// スクロールインジケーターの初期化
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // スクロールインジケーターの表示/非表示
        if (scrollTop > 100) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
        
        // スクロール進捗の更新
        scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
    });
}

// シンプルなスムーズスクロール機能
function initEnhancedSmoothScroll() {
    console.log('スムーズスクロール機能を初期化中...');
    
    // すべてのページ内リンクを検出
    const links = document.querySelectorAll('a[href^="#"]');
    console.log('ページ内リンク数:', links.length);
    
    links.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`リンク${index + 1}: ${href}`);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            console.log('リンクがクリックされました:', href, 'ターゲット:', targetId);
            
            if (targetElement) {
                console.log('ターゲット要素が見つかりました');
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('ターゲット要素が見つかりません');
            }
        });
    });
    
    console.log('スムーズスクロール機能の初期化が完了しました');
}

// スクロール位置の監視とアクティブリンクの更新
function initActiveLinkUpdate() {
    const sections = document.querySelectorAll('.smooth-scroll-target');
    const navLinks = document.querySelectorAll('.smooth-scroll-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // アクティブリンクの更新
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// モバイルメニューの初期化
function initMobileMenu() {
    const hamburger = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    
    if (!hamburger || !mobileMenu) return;
    
    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            // メニューを閉じる
            closeMobileMenu();
        } else {
            // メニューを開く
            openMobileMenu();
        }
    });
    
    // モバイルメニューリンクのクリックイベント
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    closeMobileMenu();
                    // カスタムスムーズスクロール
                    setTimeout(() => {
                        smoothScrollTo(targetElement);
                    }, 400);
                }
            } else {
                // #で始まらない場合は通常遷移
                closeMobileMenu();
            }
        });
    });
    
    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ヒーローアニメーションの初期化
function initHeroAnimation() {
    console.log('ヒーローアニメーション初期化開始');
    
    const heroSection = document.querySelector('#hero');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    
    if (!heroSection || !heroTitle || !heroSubtitle) {
        console.log('ヒーロー要素が見つかりません:', { heroSection, heroTitle, heroSubtitle });
        return;
    }
    
    // Splitting.jsが読み込まれているかチェック
    if (typeof Splitting !== 'undefined') {
        console.log('Splitting.jsが利用可能です');
        
        // Splitting.jsの再初期化
        Splitting();
        
        // タイトルとサブタイトルの初期状態を確実に設定
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        
        // 少し待ってからタイトルアニメーション開始
        setTimeout(() => {
            console.log('タイトルアニメーション開始');
            
            // タイトルを表示状態にする
            heroTitle.style.opacity = '1';
            
            // タイトルの各文字にランダムな遅延を設定
            const titleChars = heroTitle.querySelectorAll('.char');
            console.log('タイトル文字数:', titleChars.length);
            
            titleChars.forEach((char, index) => {
                const randomDelay = Math.random() * 1.5 + 0.5; // 0.5-2.0秒のランダム遅延
                char.style.animationDelay = `${randomDelay}s`;
                console.log(`文字${index + 1}の遅延: ${randomDelay}s`);
            });
            
            // タイトルのアニメーション開始
            heroTitle.classList.add('animate');
            
            // タイトルアニメーション完了後にサブタイトルアニメーション開始
            setTimeout(() => {
                console.log('サブタイトルアニメーション開始');
                
                // サブタイトルを表示状態にする
                heroSubtitle.style.opacity = '1';
                heroSubtitle.classList.add('animate');
                
                console.log('ヒーローアニメーション完了');
            }, 3000); // タイトルアニメーションの完了を待つ時間
            
        }, 500); // ヒーローセクション表示後の遅延
        
    } else {
        console.log('Splitting.jsが読み込まれていません');
        // Splitting.jsがまだ読み込まれていない場合、少し待ってから再試行
        setTimeout(() => {
            initHeroAnimation();
        }, 100);
    }
}

// Splitting.jsの読み込み完了を待つ
function waitForSplitting() {
    return new Promise((resolve) => {
        if (typeof Splitting !== 'undefined') {
            resolve();
        } else {
            const checkSplitting = () => {
                if (typeof Splitting !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkSplitting, 50);
                }
            };
            checkSplitting();
        }
    });
}

// セクションfade-inアニメーション（Intersection Observer）
function initSectionFadeIn() {
    const sections = document.querySelectorAll('.section-fade-in');
    
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// お問い合わせフォームのアニメーション初期化
function initContactFormAnimation() {
    const contactForm = document.getElementById('contact-form');
    const formGroups = document.querySelectorAll('.form-group');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    // フォーム要素の段階的アニメーション
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // フォーム全体のアニメーション
                contactForm.classList.add('animate');
                
                // 各フォーム要素の段階的アニメーション
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('animate');
                    }, index * 100);
                });
                
                formObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    formObserver.observe(contactForm);
    
    // 入力フィールドのフォーカスアニメーション
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

// フィールドバリデーション
function validateField(field) {
    const formGroup = field.parentElement;
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // エラークラスをリセット
    formGroup.classList.remove('error', 'success');
    
    // 必須フィールドのチェック
    if (isRequired && !value) {
        formGroup.classList.add('error');
        return false;
    }
    
    // メールアドレスのバリデーション
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // 電話番号のバリデーション（入力されている場合のみ）
    if (field.type === 'tel' && value) {
        const telRegex = /^[\d\-\+\(\)\s]+$/;
        if (!telRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // 成功状態
    if (value) {
        formGroup.classList.add('success');
    }
    
    return true;
}

// フォームメッセージのアニメーション
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    // 既存のクラスをリセット
    formMessage.className = 'form-message';
    formMessage.textContent = message;
    
    // タイプに応じたクラスを追加
    if (type === 'success') {
        formMessage.classList.add('success');
    } else if (type === 'error') {
        formMessage.classList.add('error');
    }
    
    // アニメーション表示
    setTimeout(() => {
        formMessage.classList.add('show');
    }, 100);
}

// 送信ボタンのアニメーション
function animateSubmitButton(button, isSending) {
    if (isSending) {
        button.classList.add('sending');
        button.textContent = '送信中...';
        button.disabled = true;
    } else {
        button.classList.remove('sending');
        button.textContent = '送信する';
        button.disabled = false;
    }
}

// ローディングアニメーションの初期化
function initLoadingAnimation() {
    console.log('=== ローディングアニメーション初期化開始 ===');
    console.log('現在のURL:', window.location.href);
    console.log('検索パラメータ:', window.location.search);
    
    // URLパラメータをチェックしてローディングアニメーションをスキップ
    const urlParams = new URLSearchParams(window.location.search);
    const skipLoading = urlParams.get('skipLoading');
    const noLoading = urlParams.get('noLoading');
    
    console.log('URLパラメータ skipLoading:', skipLoading, 'noLoading:', noLoading);
    console.log('noLoading === "true":', noLoading === 'true');
    
    // noLoading=trueの場合は完全にローディングをスキップ
    if (noLoading === 'true') {
        console.log('=== ローディングアニメーションを完全にスキップします ===');
        
        // URLパラメータを削除
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
        console.log('URLを更新:', newUrl);
        
        // ローディング画面を非表示にして、直接メインコンテンツを表示
        const loadingScreen = document.getElementById('loading-screen');
        console.log('ローディング画面要素:', loadingScreen);
        
        if (loadingScreen) {
            console.log('ローディング画面を非表示にします');
            loadingScreen.style.display = 'none';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.opacity = '0';
        } else {
            console.log('警告: ローディング画面が見つかりません');
        }
        
        // メインコンテンツを即座に表示
        const main = document.querySelector('main');
        const header = document.querySelector('.header');
        
        console.log('メイン要素:', main);
        console.log('ヘッダー要素:', header);
        
        if (main) {
            main.classList.add('loaded');
            main.style.opacity = '1';
            main.style.visibility = 'visible';
            main.style.transform = 'translateY(0)';
            console.log('メインコンテンツのloadedクラスを追加し、スタイルを設定しました');
        }
        if (header) {
            header.classList.add('loaded');
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.style.transform = 'translateY(0)';
            console.log('ヘッダーのloadedクラスを追加し、スタイルを設定しました');
        }
        
        // ヒーローセクションも即座に表示
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            heroSection.classList.add('visible');
            heroSection.style.opacity = '1';
            heroSection.style.visibility = 'visible';
            console.log('ヒーローセクションを即座に表示しました');
        }
        
        // ナビゲーション機能を即座に初期化
        console.log('ナビゲーション機能を初期化します');
        initEnhancedSmoothScroll();
        initActiveLinkUpdate();
        initMobileMenu();
        
        // ヒーローアニメーションも即座に開始
        setTimeout(async () => {
            console.log('ヒーローアニメーションを開始します');
            await waitForSplitting();
            initHeroAnimation();
        }, 100);
        
        console.log('=== ローディングスキップ処理完了 ===');
        return;
    }
    
    if (skipLoading === 'true') {
        console.log('ローディングアニメーションをスキップします');
        // URLパラメータを削除
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
        console.log('URLを更新:', newUrl);
        
        // ローディングアニメーションをスキップして直接メインコンテンツを表示
        setTimeout(() => {
            console.log('メインコンテンツアニメーション開始（スキップ版）');
            startMainContentAnimation();
        }, 100);
        return;
    }
    
    console.log('=== 通常のローディングアニメーションを開始します ===');
    
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) {
        console.log('ローディング画面が見つかりません');
        return;
    }
    
    let progress = 0;
    const progressFill = loadingScreen.querySelector('.progress-fill');
    const progressText = loadingScreen.querySelector('.progress-text');
    
    function updateProgress() {
        progress += Math.random() * 15 + 5; // 5-20%のランダム増加
        
        if (progress >= 100) {
            progress = 100;
            completeLoading();
        } else {
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.round(progress) + '%';
            
            setTimeout(updateProgress, Math.random() * 200 + 100); // 100-300msのランダム遅延
        }
    }
    
    function completeLoading() {
        if (progressFill) progressFill.style.width = '100%';
        if (progressText) progressText.textContent = '100%';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            setTimeout(() => {
                startMainContentAnimation();
            }, 500);
        }, 1200);
    }

    // ローディング開始（少し遅延）
    setTimeout(() => {
        updateProgress();
    }, 800);
}

// メインコンテンツのアニメーション開始
async function startMainContentAnimation() {
    const main = document.querySelector('main');
    const header = document.querySelector('.header');
    
    if (main) {
        setTimeout(() => {
            main.classList.add('loaded');
        }, 100);
    }
    
    if (header) {
        setTimeout(() => {
            header.classList.add('loaded');
        }, 200);
    }
    
    // ナビゲーション機能を即座に初期化（ローディングスキップ時も含む）
    initEnhancedSmoothScroll();
    initActiveLinkUpdate();
    initMobileMenu();
    
    // URLハッシュがある場合の処理
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                console.log('URLハッシュに基づいてスクロール:', hash);
                smoothScrollTo(targetElement);
            }
        }, 1000); // 少し待ってからスクロール
    }
    
    // ローディング完了後にヒーローアニメーションを初期化
    setTimeout(async () => {
        // Splitting.jsの読み込み完了を待つ
        await waitForSplitting();
        
        // ヒーローセクションを少しずつ表示（暗めの状態から）
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            // まず背景画像を徐々に表示（暗めの状態から）
            setTimeout(() => {
                heroSection.style.opacity = '0.7';
                heroSection.style.filter = 'brightness(0.6) contrast(1.1)';
                heroSection.style.transition = 'opacity 1s ease-in-out, filter 1s ease-in-out';
            }, 100);
            
            // 背景画像が表示されたら、さらに明るく
            setTimeout(() => {
                heroSection.style.opacity = '0.95';
                heroSection.style.filter = 'brightness(0.9) contrast(1.02)';
            }, 1000);
            
            // 完全に表示してからアニメーション開始
            setTimeout(() => {
                heroSection.style.opacity = '1';
                heroSection.style.filter = 'brightness(1) contrast(1)';
                heroSection.classList.add('visible');
                initHeroAnimation();
            }, 1500);
        } else {
            initHeroAnimation();
        }
    }, 500);
}

// ページの読み込み完了を待つ
function waitForPageLoad() {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });
}

// 詳細ページリンクのデバッグ
function initDetailPageLinks() {
    const detailLinks = document.querySelectorAll('a[href$=".html"]');
    
    detailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            console.log('詳細ページリンクがクリックされました:', href);
            
            // #で始まるページ内リンク以外は通常遷移を許可
            if (!href.startsWith('#')) {
                console.log('外部リンクのため、通常遷移を許可します');
                // preventDefaultは呼ばない
            } else {
                // ページ内リンクの場合はスムーズスクロールを許可
                console.log('ページ内リンクのため、スムーズスクロールを許可します');
                // ここでは何もしない（initEnhancedSmoothScrollで処理される）
            }
        });
    });
}

// 初期化関数の修正
async function initializeApp() {
    console.log('=== アプリケーションの初期化を開始します ===');
    console.log('現在のURL:', window.location.href);
    
    // URLパラメータをチェックしてローディング画面を即座に非表示
    const urlParams = new URLSearchParams(window.location.search);
    const noLoading = urlParams.get('noLoading');
    console.log('初期化時のURLパラメータ noLoading:', noLoading);
    
    if (noLoading === 'true') {
        console.log('=== 初期化時にローディングスキップを検出 - 即座にローディング画面を非表示にします ===');
        
        // ローディング画面を即座に非表示
        const loadingScreen = document.getElementById('loading-screen');
        console.log('初期化時のローディング画面要素:', loadingScreen);
        
        if (loadingScreen) {
            console.log('初期化時にローディング画面を非表示にします');
            loadingScreen.style.display = 'none';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.opacity = '0';
        }
        
        // メインコンテンツを即座に表示
        const main = document.querySelector('main');
        const header = document.querySelector('.header');
        
        console.log('初期化時のメイン要素:', main);
        console.log('初期化時のヘッダー要素:', header);
        
        if (main) {
            main.classList.add('loaded');
            main.style.opacity = '1';
            main.style.visibility = 'visible';
            main.style.transform = 'translateY(0)';
            console.log('メインコンテンツのloadedクラスを追加し、スタイルを設定しました');
        }
        if (header) {
            header.classList.add('loaded');
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.style.transform = 'translateY(0)';
            console.log('ヘッダーのloadedクラスを追加し、スタイルを設定しました');
        }
        
        // ヒーローセクションも即座に表示
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            heroSection.classList.add('visible');
            heroSection.style.opacity = '1';
            heroSection.style.visibility = 'visible';
            console.log('ヒーローセクションを即座に表示しました');
        }
    }
    
    // ページ読み込み完了を待つ
    await waitForPageLoad();
    
    // ローディングアニメーションの初期化
    initLoadingAnimation();
    
    // 各機能の初期化（ナビゲーション機能も含む）
    initHeaderScroll();
    initScrollIndicator();
    initEnhancedSmoothScroll(); // ナビゲーション機能を追加
    initActiveLinkUpdate(); // アクティブリンク更新も追加
    initMobileMenu(); // モバイルメニューも追加
    initSectionFadeIn();
    initContactFormAnimation();
    initDetailPageLinks(); // デバッグ用リンク初期化を追加
    
    // EmailJSの初期化
    (function(){
        emailjs.init({
          publicKey: "s4S3eXmjINRoqVZRV",
        });
    })();
    
    // フッターの年を自動更新
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // お問い合わせフォームの処理
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // フォームバリデーション
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showFormMessage('必須項目を正しく入力してください。', 'error');
                return;
            }

            // 送信ボタンのアニメーション開始
            animateSubmitButton(submitButton, true);
            showFormMessage('', '');

            const serviceID = 'service_dbj6fl4';
            const templateID = 'template_ncw20ag';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    showFormMessage('お問い合わせありがとうございます。メッセージは正常に送信されました。', 'success');
                    contactForm.reset();
                    
                    const formGroups = contactForm.querySelectorAll('.form-group');
                    formGroups.forEach(group => {
                        group.classList.remove('success');
                    });
                }, (err) => {
                    showFormMessage('メッセージの送信に失敗しました。お手数ですが、時間をおいて再度お試しください。', 'error');
                    console.error('EmailJS Error:', err);
                })
                .finally(() => {
                    animateSubmitButton(submitButton, false);
                });
        });
    }

    // ふわっとアニメーション
    const fadeEls = document.querySelectorAll('.fade-in-before');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('fade-in-before');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => fadeObserver.observe(el));
    
    console.log('アプリケーションの初期化が完了しました');
}

// DOMContentLoadedイベントの修正
document.addEventListener('DOMContentLoaded', function() {
    // アプリケーション初期化
    initializeApp();
});