document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;

    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});
