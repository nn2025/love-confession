document.addEventListener('DOMContentLoaded', function() {
    // 添加加载检测
    const loading = document.getElementById('loading');
    const images = document.querySelectorAll('.slide img');
    let loadedImages = 0;

    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            loadedImages++;
            if (loadedImages === images.length) {
                loading.style.display = 'none';
            }
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    loading.style.display = 'none';
                }
            });
            
            img.addEventListener('error', () => {
                img.parentElement.style.display = 'none';
                loadedImages++;
                if (loadedImages === images.length) {
                    loading.style.display = 'none';
                }
            });
        }
    });

    // 设置超时，防止加载时间过长
    setTimeout(() => {
        loading.style.display = 'none';
    }, 3000);

    // 打字机效果文本
    const texts = [
        "从遇见你的那一刻起，",
        "我的世界就开始发生了变化。",
        "你的笑容如同阳光般温暖，",
        "照亮了我生命中的每一个角落。",
        "我想告诉你...",
        "我爱你！"
    ];

    // 背景图片轮播
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        setTimeout(showSlides, 8000);
    }
    
    slides[0].classList.add('active');
    setTimeout(showSlides, 8000);

    // 打字机效果
    const typingText = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (textIndex < texts.length) {
            if (charIndex < texts[textIndex].length) {
                typingText.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            } else {
                setTimeout(() => {
                    if (textIndex === texts.length - 1) {
                        document.getElementById('accept-btn').style.display = 'inline-block';
                    } else {
                        textIndex++;
                        charIndex = 0;
                        typingText.textContent = '';
                        type();
                    }
                }, 1500);
            }
        }
    }

    type();

    // 音乐控制
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.style.opacity = '0.5';
        } else {
            music.play();
            musicToggle.style.opacity = '1';
        }
        isPlaying = !isPlaying;
    });

    // 点击产生爱心效果
    document.addEventListener('click', function(e) {
        createHeart(e.clientX, e.clientY);
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

    // 修改"我愿意"按钮点击效果
    document.getElementById('accept-btn').addEventListener('click', function() {
        // 创建烟花效果
        createFireworks();
        
        // 显示浪漫消息
        const message = document.createElement('div');
        message.className = 'final-message';
        message.innerHTML = '我也爱你！❤';
        document.body.appendChild(message);
        
        // 播放特效音效
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
        audio.play().catch(err => console.log('无法播放音效'));
    });

    // 添加烟花效果
    function createFireworks() {
        for(let i = 0; i < 10; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                document.body.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 300);
        }
    }

    // 添加鼠标移动跟踪效果
    let lastTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastTime < 50) return;  // 限制创建频率
        lastTime = now;
        
        const x = e.clientX;
        const y = e.clientY;
        
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 800);  // 稍微缩短动画时间
    });
}); 