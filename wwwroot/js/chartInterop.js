function getPrimary() {
    return (getComputedStyle(document.documentElement).getPropertyValue('--primary') || '').trim() || '#E65100';
}

function primaryBg(alpha) {
    const hex = getPrimary();
    const r = parseInt(hex.slice(1, 3), 16) || 230;
    const g = parseInt(hex.slice(3, 5), 16) || 81;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r},${g},${b},${alpha})`;
}

window.chartInterop = {
    charts: {},

    createChart: function (canvasId, config) {
        const existing = this.charts[canvasId];
        if (existing) {
            existing.destroy();
        }

        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        const textColor = isDark ? '#ccc' : '#555';

        const chartConfig = {
            type: config.type || 'line',
            data: {
                labels: config.labels,
                datasets: config.datasets.map(ds => ({
                    ...ds,
                    borderColor: ds.borderColor || getPrimary(),
                    backgroundColor: ds.backgroundColor || primaryBg(0.15),
                    borderWidth: ds.borderWidth ?? 2.5,
                    pointRadius: ds.pointRadius ?? 4,
                    pointHoverRadius: ds.pointHoverRadius ?? 6,
                    pointBackgroundColor: ds.pointBackgroundColor || getPrimary(),
                    pointHoverBackgroundColor: ds.pointHoverBackgroundColor || getPrimary(),
                    pointHoverBorderColor: ds.pointHoverBorderColor || '#fff',
                    pointBorderColor: ds.pointBorderColor || '#fff',
                    pointBorderWidth: ds.pointBorderWidth ?? 2,
                    tension: ds.tension ?? 0.3,
                    fill: ds.fill ?? true
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: config.datasets.filter(d => !d.tooltipExtras).length > 1,
                        labels: {
                            color: textColor,
                            font: { family: "'Inter', sans-serif", size: 12 },
                            filter: function(item, chart) {
                                return !chart.datasets[item.datasetIndex].tooltipExtras;
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#333' : '#fff',
                        titleColor: isDark ? '#fff' : '#333',
                        bodyColor: isDark ? '#ccc' : '#555',
                        borderColor: getPrimary(),
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        titleFont: { family: "'Inter', sans-serif", weight: '600' },
                        bodyFont: { family: "'Inter', sans-serif" },
                        callbacks: {
                            title: function(items) {
                                if (!items.length) return '';
                                const rawLabel = items[0].chart.data.labels[items[0].dataIndex];
                                const date = new Date(rawLabel + 'T00:00:00');
                                if (isNaN(date)) return rawLabel;
                                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            },
                            label: function(item) {
                                const ds = item.chart.data.datasets[item.datasetIndex];
                                // Extras dataset: only show the subtitle, not a blank base label
                                if (ds.tooltipExtras) {
                                    return ds.tooltipExtras[item.dataIndex] || null;
                                }
                                return `${ds.label}: ${item.formattedValue}`;
                            },
                            labelColor: function(item) {
                                const ds = item.chart.data.datasets[item.datasetIndex];
                                // Hide the color swatch for the extras subtitle line
                                if (ds.tooltipExtras) {
                                    return { backgroundColor: 'transparent', borderColor: 'transparent' };
                                }
                                return undefined;
                            },
                            labelTextColor: function(item) {
                                const ds = item.chart.data.datasets[item.datasetIndex];
                                if (ds.tooltipExtras) return getPrimary();
                                return undefined;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: gridColor },
                        ticks: {
                            color: textColor,
                            font: { family: "'Inter', sans-serif", size: 11 },
                            maxRotation: 45,
                            autoSkip: true,
                            maxTicksLimit: 15,
                            callback: function(value, index, ticks) {
                                const label = this.getLabelForValue(value);
                                const date = new Date(label + 'T00:00:00');
                                if (isNaN(date)) return label;
                                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }
                        }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: {
                            color: textColor,
                            font: { family: "'Inter', sans-serif", size: 11 }
                        },
                        beginAtZero: config.beginAtZero ?? false
                    }
                },
                animation: {
                    duration: 600,
                    easing: 'easeOutQuart'
                }
            },
            plugins: [
                {
                    id: 'dynamicAccent',
                    beforeUpdate(chart) {
                        const p = getPrimary();
                        const r = parseInt(p.slice(1, 3), 16) || 0;
                        const g = parseInt(p.slice(3, 5), 16) || 0;
                        const b = parseInt(p.slice(5, 7), 16) || 0;
                        const bg = `rgba(${r},${g},${b},0.15)`;
                        chart.data.datasets.forEach(ds => {
                            if (ds.tooltipExtras) return;
                            if (ds.borderDash) return;
                            if (ds.borderColor === 'transparent') return;
                            ds.borderColor = p;
                            ds.backgroundColor = bg;
                            ds.pointBackgroundColor = p;
                            ds.pointHoverBackgroundColor = p;
                        });
                    },
                    beforeDraw(chart) {
                        const p = getPrimary();
                        chart.options.plugins.tooltip.borderColor = p;
                        if (chart.tooltip) chart.tooltip.options.borderColor = p;
                    }
                }
            ]
        };

        this.charts[canvasId] = new Chart(ctx, chartConfig);
    },

    updateChart: function (canvasId, config) {
        const chart = this.charts[canvasId];
        if (!chart) {
            this.createChart(canvasId, config);
            return;
        }

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        const textColor = isDark ? '#ccc' : '#555';

        chart.data.labels = config.labels;
        chart.data.datasets.forEach((ds, i) => {
            if (config.datasets[i]) {
                ds.data = config.datasets[i].data;
                ds.label = config.datasets[i].label;
            }
        });

        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.grid.color = gridColor;
        chart.options.scales.y.ticks.color = textColor;
        if (chart.options.plugins.legend.labels) chart.options.plugins.legend.labels.color = textColor;

        chart.update('active');
    },

    destroyChart: function (canvasId) {
        const chart = this.charts[canvasId];
        if (chart) {
            chart.destroy();
            delete this.charts[canvasId];
        }
    },

    refreshAllCharts: function () {
        Object.keys(this.charts).forEach(id => {
            const chart = this.charts[id];
            if (!chart) return;

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
            const textColor = isDark ? '#ccc' : '#555';

            // Theme colors for tooltip, grid, text
            chart.options.plugins.tooltip.backgroundColor = isDark ? '#333' : '#fff';
            chart.options.plugins.tooltip.titleColor = isDark ? '#fff' : '#333';
            chart.options.plugins.tooltip.bodyColor = isDark ? '#ccc' : '#555';
            chart.options.scales.x.grid.color = gridColor;
            chart.options.scales.x.ticks.color = textColor;
            chart.options.scales.y.grid.color = gridColor;
            chart.options.scales.y.ticks.color = textColor;
            if (chart.options.plugins.legend.labels) chart.options.plugins.legend.labels.color = textColor;

            // beforeUpdate plugin handles accent colors on datasets + tooltip border
            chart.update();
        });
    }
};
