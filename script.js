// Main JavaScript functionality for the ALPR Dashboard

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Demo functionality
function startDemo() {
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Image upload and demo
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        processImage(file);
    }
});

// Drag and drop functionality
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('border-blue-500', 'bg-blue-50');
});

dropZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500', 'bg-blue-50');
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processImage(files[0]);
    }
});

function processImage(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('uploadedImage').src = e.target.result;
        document.getElementById('demoResults').classList.remove('hidden');
        
        // Simulate API call
        simulateRecognition();
    };
    reader.readAsDataURL(file);
}

function simulateRecognition() {
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    `;
    
    // Simulate processing time
    setTimeout(() => {
        const mockResults = {
            plate: "ABC123",
            confidence: 0.95,
            region: "us-ca",
            vehicle: {
                type: "Sedan",
                color: "Blue",
                make: "Toyota",
                model: "Camry"
            },
            processing_time: 45
        };
        
        displayResults(mockResults);
    }, 2000);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    resultsContainer.innerHTML = `
        <div class="space-y-4">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 class="font-semibold text-green-800 mb-2">License Plate Detected</h5>
                <div class="text-2xl font-mono font-bold text-green-900">${results.plate}</div>
                <div class="text-sm text-green-700">Confidence: ${(results.confidence * 100).toFixed(1)}%</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div class="text-sm text-blue-600 font-medium">Region</div>
                    <div class="text-blue-900 font-semibold">${results.region.toUpperCase()}</div>
                </div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div class="text-sm text-purple-600 font-medium">Vehicle Type</div>
                    <div class="text-purple-900 font-semibold">${results.vehicle.type}</div>
                </div>
                <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <div class="text-sm text-indigo-600 font-medium">Color</div>
                    <div class="text-indigo-900 font-semibold">${results.vehicle.color}</div>
                </div>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div class="text-sm text-gray-600 font-medium">Make/Model</div>
                    <div class="text-gray-900 font-semibold">${results.vehicle.make} ${results.vehicle.model}</div>
                </div>
            </div>
            
            <div class="text-xs text-gray-500 text-center">
                Processing time: ${results.processing_time}ms
            </div>
        </div>
    `;
}

// Product demos
function openSnapshotDemo() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Snapshot SDK Demo';
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-semibold mb-4">Quick Start with Snapshot</h4>
                <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div class="mb-2"># Install and run Snapshot SDK</div>
                    <div class="mb-2">git clone https://github.com/parkpow/deep-license-plate-recognition.git</div>
                    <div class="mb-2">cd deep-license-plate-recognition</div>
                    <div class="mb-2">pip install requests pillow</div>
                    <div class="mb-4">python plate_recognition.py --api-key MY_API_KEY /path/to/vehicle.jpg</div>
                    <div class="text-yellow-400"># Response:</div>
                    <div class="text-blue-300">{</div>
                    <div class="text-blue-300 ml-4">"results": [</div>
                    <div class="text-blue-300 ml-8">{</div>
                    <div class="text-blue-300 ml-12">"plate": "ABC123",</div>
                    <div class="text-blue-300 ml-12">"score": 0.904,</div>
                    <div class="text-blue-300 ml-12">"box": {"xmin": 85, "ymin": 85, "ymax": 211, "xmax": 331}</div>
                    <div class="text-blue-300 ml-8">}</div>
                    <div class="text-blue-300 ml-4">]</div>
                    <div class="text-blue-300">}</div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800 mb-2">Features</h5>
                    <ul class="text-sm text-blue-700 space-y-1">
                        <li>• REST API integration</li>
                        <li>• 21ms inference speed</li>
                        <li>• On-premise deployment</li>
                        <li>• Multiple programming languages</li>
                    </ul>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-green-800 mb-2">Use Cases</h5>
                    <ul class="text-sm text-green-700 space-y-1">
                        <li>• Parking management</li>
                        <li>• Access control</li>
                        <li>• Security surveillance</li>
                        <li>• Traffic monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('demoModal').classList.remove('hidden');
}

function openStreamDemo() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Stream Demo';
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-semibold mb-4">Real-time Stream Processing</h4>
                <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div class="mb-2"># Run Stream with Docker</div>
                    <div class="mb-2">docker run -t --rm \\</div>
                    <div class="mb-2">  -v /path/to/config:/user-data \\</div>
                    <div class="mb-2">  -e LICENSE_KEY=YOUR_LICENSE \\</div>
                    <div class="mb-4">  platerecognizer/alpr-stream</div>
                    <div class="text-yellow-400"># Configure cameras in config.ini:</div>
                    <div class="text-blue-300">[cameras]</div>
                    <div class="text-blue-300">  [[camera-1]]</div>
                    <div class="text-blue-300">    active = yes</div>
                    <div class="text-blue-300">    url = rtsp://192.168.0.108:8080/video/h264</div>
                    <div class="text-blue-300">    csv_file = camera-1_%y-%m-%d.csv</div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-purple-800 mb-2">Capabilities</h5>
                    <ul class="text-sm text-purple-700 space-y-1">
                        <li>• Real-time camera feeds</li>
                        <li>• Video file processing</li>
                        <li>• Multiple camera support</li>
                        <li>• Webhook integration</li>
                    </ul>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-orange-800 mb-2">Output Options</h5>
                    <ul class="text-sm text-orange-700 space-y-1">
                        <li>• CSV files</li>
                        <li>• Webhook notifications</li>
                        <li>• ParkPow integration</li>
                        <li>• Custom endpoints</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('demoModal').classList.remove('hidden');
}

function closeDemoModal() {
    document.getElementById('demoModal').classList.add('hidden');
}

// Integration demos
function viewCodeSamples() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Code Samples';
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800 mb-3">Python</h5>
                    <div class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
import requests<br>
response = requests.post(<br>
&nbsp;&nbsp;'https://api.platerecognizer.com/v1/plate-reader/',<br>
&nbsp;&nbsp;files={'upload': open('/path/to/car.jpg', 'rb')},<br>
&nbsp;&nbsp;headers={'Authorization': 'Token YOUR_TOKEN'}<br>
)
                    </div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-green-800 mb-3">JavaScript</h5>
                    <div class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
const formData = new FormData();<br>
formData.append('upload', file);<br>
fetch('https://api.platerecognizer.com/v1/plate-reader/', {<br>
&nbsp;&nbsp;method: 'POST',<br>
&nbsp;&nbsp;headers: {'Authorization': 'Token YOUR_TOKEN'},<br>
&nbsp;&nbsp;body: formData<br>
});
                    </div>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-purple-800 mb-3">C#</h5>
                    <div class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
var formData = new MultipartFormDataContent();<br>
formData.Add(new ByteArrayContent(fileBytes), "upload", fileName);<br>
httpClient.DefaultRequestHeaders.Add("Authorization", "Token YOUR_TOKEN");<br>
var response = await httpClient.PostAsync(url, formData);
                    </div>
                </div>
                <div class="bg-red-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-red-800 mb-3">Java</h5>
                    <div class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
HttpResponse&lt;String&gt; response = Unirest.post(<br>
&nbsp;&nbsp;"https://api.platerecognizer.com/v1/plate-reader/")<br>
&nbsp;&nbsp;.header("Authorization", "Token " + token)<br>
&nbsp;&nbsp;.field("upload", new File(file))<br>
&nbsp;&nbsp;.asString();
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button onclick="window.open('https://github.com/parkpow/deep-license-plate-recognition', '_blank')" 
                        class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                    <i class="fab fa-github mr-2"></i>View on GitHub
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('demoModal').classList.remove('hidden');
}

function viewWebhooks() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Webhook Integrations';
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-semibold mb-4">Available Webhook Integrations</h4>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-lg border">
                        <h5 class="font-semibold mb-2">ParkPow Integration</h5>
                        <p class="text-sm text-gray-600 mb-3">Forward recognition data to ParkPow parking management system</p>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h5 class="font-semibold mb-2">Custom Webhooks</h5>
                        <p class="text-sm text-gray-600 mb-3">Send data to your own endpoints with custom formatting</p>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Configurable</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h5 class="font-semibold mb-2">VMS Integration</h5>
                        <p class="text-sm text-gray-600 mb-3">Connect with video management systems like Genetec, Milestone</p>
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Enterprise</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border">
                        <h5 class="font-semibold mb-2">Cloud Services</h5>
                        <p class="text-sm text-gray-600 mb-3">AWS Lambda, Azure Functions, Google Cloud integration</p>
                        <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Scalable</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h5 class="font-semibold text-blue-800 mb-2">Webhook Preview Tool</h5>
                <p class="text-blue-700 text-sm mb-3">Test and debug your webhook integrations with our preview dashboard</p>
                <button onclick="window.open('/webhooks/webhook_preview', '_blank')" 
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                    Open Webhook Preview
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('demoModal').classList.remove('hidden');
}

function viewTools() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'Management Tools';
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg border">
                    <i class="fab fa-docker text-2xl text-blue-600 mb-3"></i>
                    <h5 class="font-semibold mb-2">Docker Extension</h5>
                    <p class="text-sm text-gray-600 mb-3">Easy installation and management through Docker Desktop</p>
                    <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Learn More</button>
                </div>
                <div class="bg-white p-4 rounded-lg border">
                    <i class="fas fa-chart-line text-2xl text-green-600 mb-3"></i>
                    <h5 class="font-semibold mb-2">Stream Monitor</h5>
                    <p class="text-sm text-gray-600 mb-3">Monitor Stream health and camera status in real-time</p>
                    <button class="text-green-600 hover:text-green-800 text-sm font-semibold">View Details</button>
                </div>
                <div class="bg-white p-4 rounded-lg border">
                    <i class="fas fa-video text-2xl text-purple-600 mb-3"></i>
                    <h5 class="font-semibold mb-2">Video Editor</h5>
                    <p class="text-sm text-gray-600 mb-3">Process and blur license plates in video files</p>
                    <button class="text-purple-600 hover:text-purple-800 text-sm font-semibold">Try Tool</button>
                </div>
                <div class="bg-white p-4 rounded-lg border">
                    <i class="fas fa-cogs text-2xl text-orange-600 mb-3"></i>
                    <h5 class="font-semibold mb-2">Benchmarking</h5>
                    <p class="text-sm text-gray-600 mb-3">Performance testing and optimization tools</p>
                    <button class="text-orange-600 hover:text-orange-800 text-sm font-semibold">Run Benchmark</button>
                </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <h5 class="font-semibold mb-3">Installation Scripts</h5>
                <div class="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    <div class="mb-2"># Automatic Stream installation</div>
                    <div class="mb-2">curl -fsSL https://get.platerecognizer.com/stream.sh | bash</div>
                    <div class="mb-4">./stream.sh --token=YOUR_TOKEN --license_key=YOUR_LICENSE</div>
                    <div class="text-yellow-400"># Or use Docker installer GUI</div>
                    <div>docker run platerecognizer/installer</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('demoModal').classList.remove('hidden');
}

// Close modal when clicking outside
document.getElementById('demoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDemoModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDemoModal();
    }
});

// Add some interactive animations
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    window.dispatchEvent(new Event('scroll'));
});