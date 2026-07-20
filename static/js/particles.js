const container = document.getElementById("particle-background");

if (container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animation;
    let time = 0;
    let mouseX = 0;
    let mouseTargetX = 0;

    const dots = [];

    function resize() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;

        dots.length = 0;

        const spacing = 90;

        for (let y = spacing; y < height; y += spacing) {
            for (let x = spacing; x < width; x += spacing) {
                dots.push({
                    x,
                    y,
                    offset: Math.random() * Math.PI * 2
                });
            }
        }
    }

    window.addEventListener("resize", resize);
    resize();

    container.addEventListener("mousemove", (event) => {
        const rect = container.getBoundingClientRect();
        mouseTargetX = ((event.clientX - rect.left) / width - 0.5) * 20;
    });

    function draw(currentTime) {
        time = currentTime;

        ctx.clearRect(0, 0, width, height);

        mouseX += (mouseTargetX - mouseX) * 0.05;

        const aurora1 = ctx.createRadialGradient(
            width * 0.3 + Math.sin(time * 0.0004) * 80,
            height * 0.35,
            20,
            width * 0.3,
            height * 0.35,
            width * 0.55
        );

        aurora1.addColorStop(0, "rgba(59,130,246,0.20)");
        aurora1.addColorStop(0.5, "rgba(37,99,235,0.08)");
        aurora1.addColorStop(1, "rgba(15,17,21,0)");

        ctx.fillStyle = aurora1;
        ctx.fillRect(0, 0, width, height);

        const aurora2 = ctx.createRadialGradient(
            width * 0.75 + Math.cos(time * 0.00035) * 100,
            height * 0.5,
            30,
            width * 0.75,
            height * 0.5,
            width * 0.45
        );

        aurora2.addColorStop(0, "rgba(96,165,250,0.14)");
        aurora2.addColorStop(1, "rgba(15,17,21,0)");

        ctx.fillStyle = aurora2;
        ctx.fillRect(0, 0, width, height);

        dots.forEach((dot) => {
            const speed = 0.02;
            const spacing = 90;
            const travel = (time * speed) % spacing;
            const y = dot.y;

            const leftX = dot.x - travel + mouseX;
            const rightX = leftX + (Math.ceil(width / spacing) * spacing);

            const drawDot = (x) => {
                if (x < -10 || x > width + 10) return;

                ctx.strokeStyle = "rgba(255,255,255,0.85)";
                ctx.lineWidth = 1;
                ctx.lineCap = "round";

                ctx.beginPath();
                ctx.moveTo(x - 2.5, y);
                ctx.lineTo(x + 2.5, y);
                ctx.moveTo(x, y - 2.5);
                ctx.lineTo(x, y + 2.5);
                ctx.stroke();
            };

            drawDot(leftX);
            drawDot(rightX);
        });

        animation = requestAnimationFrame(draw);
    }

    animation = requestAnimationFrame(draw);

    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animation);
    });
}