import { useEffect, useRef } from 'react';

const InteractiveParticles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Re-init on resize to maintain density
        };

        window.addEventListener('resize', resizeCanvas);

        // Initial size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        };

        const handleLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchstart', handleTouchMove);
        window.addEventListener('mouseleave', handleLeave);
        window.addEventListener('touchend', handleLeave);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 2 + 0.5; // Depth factor (0.5 to 2.5)
                this.size = Math.random() * 2 + 0.5;
                this.baseSize = this.size;

                // Velocity
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;

                // Color
                this.color = Math.random() > 0.6 ? '#00E8FF' : '#BF00FF'; // Neon Aqua or Soft Purple
                this.alpha = Math.random() * 0.5 + 0.2;

                // Physics
                this.friction = 0.96;
                this.ease = 0.1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                // Scale size by Z (depth)
                ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            update() {
                // Mouse interaction (Swarm/Attraction)
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Stronger attraction when closer, but affects all
                    const force = 2000 / (distance * distance + 500); // Inverse square law-ish
                    const angle = Math.atan2(dy, dx);

                    // Apply force to velocity
                    this.vx += Math.cos(angle) * force * 0.5 * this.z; // Z affects sensitivity
                    this.vy += Math.sin(angle) * force * 0.5 * this.z;
                }

                // Apply friction
                this.vx *= this.friction;
                this.vy *= this.friction;

                // Constant slight movement (drift)
                this.x += this.vx + (Math.random() - 0.5) * 0.2;
                this.y += this.vy + (Math.random() - 0.5) * 0.2;

                // Screen wrapping
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                this.draw();
            }
        }

        const init = () => {
            particles = [];
            // Adjust density based on screen size
            const isMobile = window.innerWidth < 768;
            const densityDivisor = isMobile ? 15000 : 8000; // Fewer particles on mobile
            const numberOfParticles = (canvas.width * canvas.height) / densityDivisor;

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'; // Fade out trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchMove);
            window.removeEventListener('mouseleave', handleLeave);
            window.removeEventListener('touchend', handleLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent', willChange: 'transform' }}
        />
    );
};

export default InteractiveParticles;
