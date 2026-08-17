document.addEventListener('DOMContentLoaded', function () {
    try {
        // Data (exact values)
        const engineData = { labels: ['Small Engine', 'Mid Engine', 'Heavy Engine'], values: [6181, 6765, 2272] };
        const total = engineData.values.reduce((a,b)=>a+b,0);

        const brandData = {
            labels: ['Maruti','Hyundai','Honda','Mahindra','Toyota','Ford'],
            values: [4926,2950,1475,997,785,774]
        };

        // Chart colors (muted premium palette using --accent)
        const rootStyles = getComputedStyle(document.documentElement);
        const accent = rootStyles.getPropertyValue('--accent').trim() || '#3B82F6';
        const bg = rootStyles.getPropertyValue('--card').trim() || '#171A21';
        const fg = rootStyles.getPropertyValue('--primary').trim() || '#F5F7FA';
        const sub = rootStyles.getPropertyValue('--secondary').trim() || '#B8C1CC';

        // ---------- Engine donut ----------
        const engineCtx = document.getElementById('engineDonut').getContext('2d');

        // plugin to draw center percentage
        const centerText = {
            id: 'centerText',
            beforeDraw(chart) {
                const {ctx, chartArea: {width, height}} = chart;
                const sum = chart.data.datasets[0].data.reduce((a,b)=>a+b,0);
                const max = Math.max(...chart.data.datasets[0].data);
                const idx = chart.data.datasets[0].data.indexOf(max);
                const label = chart.data.labels[idx];
                const percent = Math.round((max / sum) * 100);

                ctx.save();
                ctx.fillStyle = fg;
                ctx.font = '700 18px Poppins, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(percent + '%', width/2, height/2 - 6);
                ctx.fillStyle = sub;
                ctx.font = '400 11px Inter, sans-serif';
                ctx.fillText(label, width/2, height/2 + 12);
                ctx.restore();
            }
        };

        const engineChart = new Chart(engineCtx, {
            type: 'doughnut',
            data: {
                labels: engineData.labels,
                datasets: [{
                    data: engineData.values,
                    backgroundColor: [
                        '#3B82F6', /* Blue = Small Engine */
                        '#F59E0B', /* Orange = Mid Engine */
                        '#22C55E'  /* Green = Heavy Engine */
                    ],
                    borderColor: 'rgba(15, 23, 42, 0.7)',
                    borderWidth: 1,
                    cutout: '66%'
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '66%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.toLocaleString('en-IN')} vehicles`;
                            }
                        }
                    }
                },
                animation: { duration: 900, easing: 'easeOutCubic' }
            },
            plugins: [centerText]
        });

        // update engine meta elements (percentage, label, count)
        try {
            const maxVal = Math.max(...engineData.values);
            const maxIdx = engineData.values.indexOf(maxVal);
            const maxLabel = engineData.labels[maxIdx];
            const percent = Math.round((maxVal / total) * 100);
            const enginePercentEl = document.getElementById('enginePercent');
            const engineLabelEl = document.getElementById('engineLabel');
            const engineCountEl = document.getElementById('engineCount');
            if (enginePercentEl) enginePercentEl.textContent = percent + '%';
            if (engineLabelEl) engineLabelEl.textContent = maxLabel;
            if (engineCountEl) engineCountEl.textContent = maxVal.toLocaleString('en-IN') + ' vehicles';
        } catch (e) { /* noop */ }

        // ---------- Brand horizontal bar chart ----------
        const brandCtx = document.getElementById('brandBars').getContext('2d');
        const brandPalette = ['#3B82F6', '#67E8F9', '#94A3B8', '#A78BFA', '#2DD4BF', '#FBBF24'];
        const brandChart = new Chart(brandCtx, {
            type: 'bar',
            data: {
                labels: brandData.labels,
                datasets: [{
                    data: brandData.values,
                    backgroundColor: brandPalette,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
                        grid: { display: false },
                        ticks: { display: false }
                    },
                    y: {
                        ticks: { color: fg, font: { size: 11 } },
                        grid: { display: false },
                        border: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        displayColors: false,
                        callbacks: {
                            title: function(items) {
                                return items[0].label;
                            },
                            label: function(context) {
                                return `${context.parsed.x.toLocaleString('en-IN')} vehicles`;
                            }
                        }
                    }
                },
                animation: { duration: 900, easing: 'easeOutCubic' }
            }
        });

        // ---------- Dataset counter animation ----------
        const datasetEl = document.getElementById('datasetCount');
        const target = 15218;
        let start = null;
        const duration = 900;
        function step(ts){
            if(!start) start = ts;
            const progress = Math.min((ts - start)/duration, 1);
            const current = Math.floor(progress * target);
            datasetEl.textContent = current.toLocaleString('en-IN');
            if(progress < 1) requestAnimationFrame(step);
            else datasetEl.textContent = target.toLocaleString('en-IN') + '+';
        }
        requestAnimationFrame(step);

        // Resize charts responsively when container changes
        window.addEventListener('resize', function(){ engineChart.resize(); brandChart.resize(); });

    } catch (e) { console.error('Eval dashboard init error', e); }
});
