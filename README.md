# Plate Recognizer - ALPR Dashboard

A comprehensive web dashboard showcasing the Automatic License Plate Recognition (ALPR) system capabilities and providing easy access to various components.

## Features

### 🚗 Core ALPR Technology
- **High Accuracy**: Works on dark, low-res, blurry images and tough angles
- **Global Coverage**: Optimized for 50 USA States, India, Brazil, and 90+ countries
- **Fast Processing**: Inference speed up to 21ms
- **Vehicle Detection**: License plate, vehicle type, make, model, and color recognition

### 📦 Products

#### Snapshot SDK
- REST API for image-based license plate recognition
- JSON response or webhook integration
- On-premise deployment options
- Support for 8 programming languages
- Processing time under 60 minutes setup

#### Stream
- Real-time license plate recognition from camera feeds
- Video file processing capabilities
- Multiple camera support (4 cameras simultaneously on mid-range PC)
- CSV file output or webhook notifications
- Configurable camera settings

### 🔧 Tools & Integrations

#### Code Samples
Ready-to-use examples in multiple programming languages:
- **Python**: Simple API integration with requests library
- **JavaScript**: Frontend and Node.js implementations
- **C#**: .NET Framework and .NET Core examples
- **Java**: Maven-based implementation with Unirest
- **C++**: Cross-platform implementation with libcurl

#### Webhook Integrations
- **ParkPow Integration**: Parking management system connectivity
- **Custom Webhooks**: Flexible endpoint configuration
- **VMS Integration**: Video management system support (Genetec, Milestone)
- **Cloud Services**: AWS Lambda, Azure Functions, Google Cloud

#### Management Tools
- **Docker Extension**: Easy installation through Docker Desktop
- **Stream Monitor**: Real-time health monitoring for Stream deployments
- **Video Editor**: License plate blurring and video processing
- **Benchmarking Tools**: Performance testing and optimization

### 🌐 Live Demo
Interactive web interface allowing users to:
- Upload images for real-time license plate recognition
- View detailed recognition results including confidence scores
- Test different image types and conditions
- Experience the API response format

## Getting Started

### Quick Installation

```bash
# Clone the repository
git clone https://github.com/parkpow/deep-license-plate-recognition.git
cd deep-license-plate-recognition

# Install dependencies
pip install requests pillow

# Run basic recognition
python plate_recognition.py --api-key YOUR_API_KEY /path/to/vehicle.jpg
```

### Docker Installation

```bash
# Run Snapshot SDK
docker run -t -p 8080:8080 \
  -v license:/license \
  -e LICENSE_KEY=YOUR_LICENSE \
  -e TOKEN=YOUR_TOKEN \
  platerecognizer/alpr

# Run Stream for real-time processing
docker run -t -p 8080:8080 \
  -v /path/to/config:/user-data \
  -e LICENSE_KEY=YOUR_LICENSE \
  -e TOKEN=YOUR_TOKEN \
  platerecognizer/alpr-stream
```

## API Usage Examples

### Python
```python
import requests

response = requests.post(
    'https://api.platerecognizer.com/v1/plate-reader/',
    files={'upload': open('/path/to/car.jpg', 'rb')},
    headers={'Authorization': 'Token YOUR_TOKEN'}
)
print(response.json())
```

### JavaScript
```javascript
const formData = new FormData();
formData.append('upload', file);

fetch('https://api.platerecognizer.com/v1/plate-reader/', {
    method: 'POST',
    headers: {'Authorization': 'Token YOUR_TOKEN'},
    body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### C#
```csharp
var formData = new MultipartFormDataContent();
formData.Add(new ByteArrayContent(fileBytes), "upload", fileName);
httpClient.DefaultRequestHeaders.Add("Authorization", "Token YOUR_TOKEN");
var response = await httpClient.PostAsync(url, formData);
```

## Configuration

### Stream Configuration (config.ini)
```ini
[cameras]
  regions = us-ca, us-ny
  
  [[camera-1]]
    active = yes
    url = rtsp://192.168.0.108:8080/video/h264
    csv_file = camera-1_%y-%m-%d.csv
    webhook_targets = http://webhook.site/your-endpoint
```

## Performance Benchmarks

| Platform | Resolution | Mode | Speed (ms) |
|----------|------------|------|------------|
| Intel x86 | 1280x720 | Regular | 40.8 |
| Intel x86 | 1280x720 | Fast | 21.1 |
| Raspberry Pi 4 | 1280x720 | Regular | 1181.0 |
| Jetson Nano | 1280x720 | Regular | 700 |

## Use Cases

- **Parking Management**: Automated entry/exit control
- **Security Surveillance**: Vehicle tracking and monitoring
- **Traffic Management**: Highway monitoring and toll collection
- **Access Control**: Restricted area vehicle authentication
- **Law Enforcement**: Automated license plate scanning

## Support & Documentation

- **API Documentation**: Complete REST API reference
- **Integration Guides**: Step-by-step setup instructions
- **Code Samples**: Ready-to-use implementations
- **Webhook Tools**: Testing and debugging utilities
- **Performance Optimization**: Benchmarking and tuning guides

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Website**: https://platerecognizer.com
- **Support**: https://platerecognizer.com/contact
- **Documentation**: https://guides.platerecognizer.com

---

*Provided by Plate Recognizer, a subsidiary of ParkPow.*