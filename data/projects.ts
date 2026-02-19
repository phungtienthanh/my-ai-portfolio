export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string; // Đổi từ link sang githubUrl cho rõ nghĩa
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Iris Segmentation",
    description: "Xây dựng mô hình phân đoạn hình ảnh (Segmentation) để nhận diện và phân đoạn vùng mống mắt từ ảnh NIR chụp mắt sử dụng kiến trúc U-Net, triển khai trên Jetson Nano.",
    tech: ["PyTorch", "OpenCV"],
    githubUrl: "https://github.com/phungtienthanh/Iris-Segmentation"
  },
  {
    id: 2,
    title: "Road Segmentation for Aerial Images",
    description: "Xây dựng các mô hình phân đoạn hình ảnh (Segmentation) để nhận diện đường giao thông từ ảnh vệ tinh, ứng dụng kiến trúc U-Net tối ưu.",
    tech: ["PyTorch", "OpenCV", "Albumentations"],
    githubUrl: "https://github.com/phungtienthanh/RoadSegmentationforAerialImages"
  },
  {
    id: 3,
    title: "Automatic License Plate Recognition",
    description: "Xây dựng engine nhận diện biển số xe tự động sử dụng YOLOv8, kết hợp với OpenCV và PaddleOCR để xử lý ảnh và trích xuất thông tin biển số.",
    tech: ["YOLO", "PaddleOCR", "OpenCV"],
    githubUrl: "https://github.com/phungtienthanh/Automatic-License-Plate-Recognition" 
  },
  {
    id: 4,
    title: "Traffic Sign Recognition",
    description: "Xây dựng mô hình phân loại biển báo giao thông (Classification) sử dụng ResNet-18.",
    tech: ["PyTorch", "OpenCV"],
    githubUrl: "https://github.com/phungtienthanh/Traffic-Sign-Recognition"
  },
  {
    id: 5,
    title: "Real-time Weather Analytics Pipeline",
    description: "Dự án tập trung xây dựng một pipeline xử lý dữ liệu lớn để thu thập, xử lý, và phân tích dữ liệu thời tiết thực tế từ 20 thành phố lớn, được thiết kế theo kiến trúc Lambda.",
    tech: ["Kafka", "Spark", "Hadoop", "MongoDB", "Kubernetes"],
    githubUrl: "https://github.com/quoctrieu123/-2025_1-Big-Data-Project" 
  },
  {
    id: 6,
    title: "Online Shoes Website",
    description: "Xây dựng website bán giày trực tuyến sử dụng Django, cung cấp giao diện thân thiện và chức năng quản lý người dùng, sản phẩm hiệu quả.",
    tech: ["Django", "SQLite"],
    githubUrl: "https://github.com/leminhhaii/System-architecture-analysis-project" 
  },
];