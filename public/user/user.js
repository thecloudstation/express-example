const API_URL = '/api';
const isAdmin = false;

document.addEventListener('DOMContentLoaded', fetchFeatures);

async function fetchFeatures() {
    try {
        const response = await fetch(`${API_URL}/features`);
        if (!response.ok) throw new Error('Failed to fetch features');
        const features = await response.json();
        displayFeatures(features);
    } catch (error) {
        showNotification('Failed to fetch features. Please try again.', 'error');
    }
}

function displayFeatures(features) {
    const featureList = document.getElementById('featureList');
    featureList.innerHTML = '';
    features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'bg-gray-800 overflow-hidden shadow rounded-lg';
        featureElement.innerHTML = `
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-white">${feature.title}</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-300">
                    <p>${feature.description}</p>
                </div>
                <div class="mt-3 text-sm">
                    <a href="${feature.link}" target="_blank" rel="noopener noreferrer" 
                       class="font-medium text-blue-400 hover:text-blue-300" 
                       onclick="trackLinkClick('${feature._id}')">
                        View Documentation
                    </a>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        ${feature.category}
                    </span>
        
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <div>
                        ${generateStarRating(feature)}
                    </div>
                    <span class="text-sm text-gray-400">
                        (${feature.rating.toFixed(1)}, ${feature.ratingCount} ratings)
                    </span>
                </div>
            </div>
        `;
        featureList.appendChild(featureElement);
    });
}

function generateStarRating(feature) {
    return [1, 2, 3, 4, 5].map(star => `
        <i class="fas fa-star ${star <= Math.round(feature.rating) ? 'text-yellow-400' : 'text-gray-600'} cursor-pointer"
           onclick="rateFeature('${feature._id}', ${star})"></i>
    `).join('');
}

async function rateFeature(featureId, rating) {
    try {
        const response = await fetch(`${API_URL}/features/${featureId}/rate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating })
        });
        if (!response.ok) throw new Error('Failed to rate feature');
        showNotification('Thank you for rating!', 'success');
        fetchFeatures();
    } catch (error) {
        showNotification('Failed to rate feature. Please try again.', 'error');
    }
}

async function trackLinkClick(featureId) {
    try {
        await fetch(`${API_URL}/features/${featureId}/click`, { method: 'POST' });
        fetchFeatures();
    } catch (error) {
        console.error('Error tracking link click:', error);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `mb-4 p-4 rounded ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}