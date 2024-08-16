const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
    fetchFeatures();
    updateStorageInfo();
    document.getElementById('toggleStorage').addEventListener('click', toggleStorage);
    document.getElementById('featureForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('openModalBtn').addEventListener('click', openModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
});

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
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-chart-bar mr-1"></i>${feature.clickCount} clicks
                    </div>
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
            <div class="bg-gray-700 px-4 py-4 sm:px-6">
                <button onclick="editFeature('${feature._id}')" class="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Edit
                </button>
                <button onclick="deleteFeature('${feature._id}')" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                </button>
            </div>
        `;
        featureList.appendChild(featureElement);
    });
}

function generateStarRating(feature) {
    return [1, 2, 3, 4, 5].map(star => `
        <i class="fas fa-star ${star <= Math.round(feature.rating) ? 'text-yellow-400' : 'text-gray-600'}"></i>
    `).join('');
}

async function trackLinkClick(featureId) {
    try {
        await fetch(`${API_URL}/features/${featureId}/click`, { method: 'POST' });
        fetchFeatures();
    } catch (error) {
        console.error('Error tracking link click:', error);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const featureId = document.getElementById('featureId').value;
    const feature = {
        title: document.getElementById('featureTitle').value,
        description: document.getElementById('featureDescription').value,
        category: document.getElementById('featureCategory').value,
        link: document.getElementById('featureLink').value
    };

    try {
        const url = featureId ? `${API_URL}/features/${featureId}` : `${API_URL}/features`;
        const method = featureId ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feature)
        });
        if (!response.ok) throw new Error('Failed to save feature');
        showNotification('Feature saved successfully', 'success');
        closeModal();
        fetchFeatures();
    } catch (error) {
        showNotification('Failed to save feature. Please try again.', 'error');
    }
}

function openModal() {
    document.getElementById('featureModal').classList.remove('hidden');
    resetForm();
}

function closeModal() {
    document.getElementById('featureModal').classList.add('hidden');
    resetForm();
}

function resetForm() {
    document.getElementById('featureForm').reset();
    document.getElementById('featureId').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Feature';
}

function editFeature(featureId) {
    fetch(`${API_URL}/features/${featureId}`)
        .then(response => response.json())
        .then(feature => {
            document.getElementById('featureId').value = feature._id;
            document.getElementById('featureTitle').value = feature.title;
            document.getElementById('featureDescription').value = feature.description;
            document.getElementById('featureCategory').value = feature.category;
            document.getElementById('featureLink').value = feature.link;
            document.getElementById('modalTitle').textContent = 'Edit Feature';
            openModal();
        })
        .catch(error => {
            console.error('Error fetching feature for edit:', error);
            showNotification('Failed to load feature for editing. Please try again.', 'error');
        });
}

function openModal() {
    document.getElementById('featureModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('featureModal').classList.add('hidden');
    resetForm();
}

function resetForm() {
    document.getElementById('featureForm').reset();
    document.getElementById('featureId').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Feature';
}
document.addEventListener('click', function(e) {
    if (e.target && e.target.onclick && e.target.onclick.toString().includes('editFeature')) {
        const featureId = e.target.getAttribute('data-feature-id');
        if (featureId) {
            editFeature(featureId);
        }
    }
});

function deleteFeature(featureId) {
    if (confirm('Are you sure you want to delete this feature?')) {
        fetch(`${API_URL}/features/${featureId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete feature');
                showNotification('Feature deleted successfully', 'success');
                fetchFeatures();
            })
            .catch(error => {
                showNotification('Failed to delete feature. Please try again.', 'error');
            });
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


async function updateStorageInfo() {
    try {
        const response = await fetch(`${API_URL}/storage-info`);
        if (!response.ok) throw new Error('Failed to fetch storage info');
        const { currentStorage } = await response.json();
        
        const dbStatus = document.getElementById('dbStatus');
        const mobileDbStatus = document.getElementById('mobileDbStatus');
        
        if (dbStatus) updateStatusElement(dbStatus, currentStorage);
        if (mobileDbStatus) updateStatusElement(mobileDbStatus, currentStorage);
    } catch (error) {
        console.error('Error updating storage info:', error);
        showNotification('Failed to update storage info. Please try again.', 'error');
    }
}

function updateStatusElement(element, currentStorage) {
    const statusText = element.querySelector('span:last-child');
    const statusDot = element.querySelector('div > div'); // The pulse dot

    if (statusText && statusDot) {
        if (currentStorage === 'mongodb') {
            statusText.textContent = 'Connected';
            statusText.className = 'text-sm font-medium text-green-400';
            statusDot.className = 'h-3 w-3 bg-green-400 rounded-full mr-2 pulse';
        } else {
            statusText.textContent = 'Using Memory';
            statusText.className = 'text-sm font-medium text-yellow-400';
            statusDot.className = 'h-3 w-3 bg-yellow-400 rounded-full mr-2';
        }
    }
}
async function toggleStorage() {
    try {
        const response = await fetch(`${API_URL}/toggle-storage`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to toggle storage');
        await updateStorageInfo();
        showNotification('Storage toggled successfully', 'success');
        fetchFeatures(); // Refresh features after toggling storage
    } catch (error) {
        console.error('Error toggling storage:', error);
        showNotification('Failed to toggle storage. Please try again.', 'error');
    }
}

// Initialize the page
fetchFeatures();
updateStorageInfo();