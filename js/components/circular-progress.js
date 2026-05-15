// Circular Progress Component
// Creates animated SVG circular progress indicators

class CircularProgress {
    constructor(element, options = {}) {
        this.element = element;
        this.value = options.value || 0;
        this.size = options.size || 120;
        this.strokeWidth = options.strokeWidth || 10;
        this.color = options.color || '#6366f1';
        this.trackColor = options.trackColor || 'rgba(99, 102, 241, 0.1)';

        this.render();
    }

    render() {
        const radius = (this.size - this.strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (this.value / 100) * circumference;

        const svg = `
            <svg width="${this.size}" height="${this.size}" class="circular-progress">
                <circle
                    cx="${this.size / 2}"
                    cy="${this.size / 2}"
                    r="${radius}"
                    stroke="${this.trackColor}"
                    stroke-width="${this.strokeWidth}"
                    fill="none"
                />
                <circle
                    cx="${this.size / 2}"
                    cy="${this.size / 2}"
                    r="${radius}"
                    stroke="${this.color}"
                    stroke-width="${this.strokeWidth}"
                    fill="none"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${circumference}"
                    stroke-linecap="round"
                    transform="rotate(-90 ${this.size / 2} ${this.size / 2})"
                    class="progress-ring"
                    style="transition: stroke-dashoffset 1s ease-in-out;"
                />
                <text
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    dy=".3em"
                    font-size="${this.size / 3.5}"
                    font-weight="bold"
                    fill="${this.color}"
                    class="progress-text"
                >
                    ${this.value}%
                </text>
            </svg>
        `;

        this.element.innerHTML = svg;

        // Animate the circle
        setTimeout(() => {
            const circle = this.element.querySelector('.progress-ring');
            circle.style.strokeDashoffset = offset;
        }, 100);
    }

    setValue(newValue) {
        this.value = Math.min(100, Math.max(0, newValue));
        this.render();
    }
}

// Helper function to create circular progress
function createCircularProgress(containerId, value, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return null;
    }
    return new CircularProgress(container, { value, ...options });
}
