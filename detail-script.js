// 詳細ページ用のJavaScript - メインページと統一された機能

// ヘッダーのスクロール効果
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// ハンバーガーメニューの制御
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // モバイルメニューのリンクをクリックした時にメニューを閉じる
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // メニュー外をクリックした時にメニューを閉じる
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// スムーズスクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// フッターの年を自動更新
function updateFooterYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// 画像の遅延読み込み
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// フルスクリーン防止の設定
function preventFullscreen() {
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
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    handleHeaderScroll();
    initHamburgerMenu();
    initSmoothScroll();
    updateFooterYear();
    initLazyLoading();
    preventFullscreen();
    
    // スクロールイベントの追加
    window.addEventListener('scroll', handleHeaderScroll);
}); 