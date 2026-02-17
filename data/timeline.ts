export interface Experience {
  id: number;
  year: string;
  title: string;
  company: string;
  logo?: string;
  desc: string;
  tech: string[];
}

export const experiences: Experience[] = [
  { 
    id: 1,
    year: "OCTOBER 2025 - PRESENT", 
    title: "AI Engineer", 
    company: "VTI",
    logo: "/vti.jpg",
    desc: "Tập trung phát triển các giải pháp Computer Vision trong môi trường Outsource. Triển khai các kiến trúc SOTA cho bài toán Classification, Object Detection, Image Segmentation và nhận diện hành vi, đáp ứng tiêu chuẩn khắt khe từ các đối tác khu vực Châu Á Thái Bình Dương.",
    tech: ["PyTorch", "Paddle", "OpenCV", "YOLO", "RT-DETR", "ByteTrack"]
  },
  { 
    id: 2,
    year: "SEP 2024 - DEC 2024", 
    title: "Data Analyst Intern", 
    company: "Rikkei Digital",
    logo: "/Logo-Rikkei.png",
    desc: "Phân tích tập dữ liệu lớn để trích xuất Insight hỗ trợ quá trình đưa ra quyết định kinh doanh. Tối ưu hóa quy trình xử lý dữ liệu và xây dựng các báo cáo trực quan hóa tự động.",
    tech: ["SQL", "Pandas", "Power BI"]
  },
];
