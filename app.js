const servicesData = [
    { title: "Cooking", img: "cooking.jpg", desc: "Daily meal preparation maintained to the highest standards." },
    { title: "Cleaning", img: "cleaning.jpg", desc: "Regular cleaning and deep cleans for a spotless home." },
    { title: "Washing & Laundry", img: "laundry.jpg", desc: "Professional washing and delicate care." },
    { title: "Babysitter / Nanny", img: "babysitter.jpg", desc: "Compassionate caregivers for infants." },
    { title: "Elderly Day Care", img: "elderly.jpg", desc: "Patient companion care and medication reminders." },
    { title: "Married Couple", img: "couple.jpg", desc: "Unified household coverage by trusted couples." },
    { title: "Japa & Postnatal", img: "japa.jpg", desc: "Specialized postnatal support and massage." },
    { title: "Massage Support", img: "massage.jpg", desc: "Therapeutic massage for women and children." },
    { title: "Full-Time Maid", img: "fulltime.jpg", desc: "Long-term consistent household support." },
    { title: "Part-Time Maid", img: "parttime.jpg", desc: "Flexible schedules for lighter needs." }
];

// NAVIGATION SYSTEM
function navigate(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.replace('block', 'hidden'));
    const target = document.getElementById('page-' + pageId);
    if(target) target.classList.replace('hidden', 'block');
    
    // Glow Up logic
    document.querySelectorAll('.nav-link').forEach(link => {
        const isTarget = link.getAttribute('data-target') === pageId;
        link.classList.toggle('text-[#8a0303]', isTarget);
        link.classList.toggle('font-bold', isTarget);
        link.querySelector('.nav-indicator').classList.toggle('hidden', !isTarget);
    });
    
    window.scrollTo(0, 0);
    triggerScrollReveal();
    if(pageId === 'home') triggerTypewriter();
}

// VALIDATION LOGIC
function handleBookingSubmit(e) {
    e.preventDefault();
    const phone = document.getElementById('book-phone').value;
    const err = document.getElementById('booking-error');
    err.classList.add('hidden');
    if (!/^\d{10}$/.test(phone)) {
        err.innerText = "Phone number must be exactly 10 digits.";
        err.classList.remove('hidden'); return;
    }
    document.getElementById('booking-success').classList.remove('hidden');
}

function handleContactSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    if (!/^\d{10}$/.test(phone)) { alert("Phone must be 10 digits."); return; }
    if (!email.includes('@')) { alert("Invalid email."); return; }
    alert('Request Sent! Kushboo or Reya will call you back.');
}

// ANIMATION ENGINES
function initParticles() {
    const canvas = document.getElementById('neon-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    class P {
        constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.size = Math.random()*3+1; this.speedX = Math.random()*0.5-0.25; this.speedY = Math.random()*0.5-0.25; this.alpha = Math.random()*0.5+0.1; }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x<0||this.x>canvas.width) this.speedX*=-1; if (this.y<0||this.y>canvas.height) this.speedY*=-1; }
        draw() { ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(138, 3, 3, 0.8)'; ctx.fillStyle = `rgba(220, 38, 38, ${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
    }
    for (let i=0; i<80; i++) particles.push(new P());
    function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animate); }
    animate();
}

function triggerTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const text = "You can love her, you can hate her — but you can't ignore her.";
    let i = 0; el.innerText = '';
    const int = setInterval(() => { el.innerText += text.charAt(i); i++; if(i>=text.length) clearInterval(int); }, 60);
}

function triggerScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function openModal(idx) {
    const s = servicesData[idx];
    document.getElementById('modal-title').innerText = s.title;
    document.getElementById('modal-desc').innerText = s.desc;
    document.getElementById('service-modal').classList.replace('hidden', 'flex');
}

function closeModal() { document.getElementById('service-modal').classList.replace('flex', 'hidden'); }

// INITIALIZATION
window.onload = () => {
    const mc = document.getElementById('marquee-container');
    servicesData.forEach((s, i) => {
        mc.innerHTML += `<div class="w-80 mx-4 cursor-pointer" onclick="openModal(${i})">
            <div class="h-96 rounded-2xl overflow-hidden relative group border shadow-md">
                <div class="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <div class="absolute bottom-0 p-8 text-black bg-white/80 w-full"><h3 class="text-2xl font-black">${s.title}</h3></div>
            </div>
        </div>`;
    });

    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('main-app').classList.remove('hidden', 'opacity-0');
        lucide.createIcons(); initParticles(); triggerScrollReveal(); triggerTypewriter();
    }, 3500);
};