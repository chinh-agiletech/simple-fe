import { useState } from "react";
import {
  FaBolt,
  FaRocket,
  FaStar,
  FaChartBar,
  FaCubes,
  FaUsers,
  FaDatabase,
  FaChartLine,
  FaFileExport,
  FaComments,
  FaPlug,
  FaBolt as FaLightning,
} from "react-icons/fa";
import classNames from "classnames";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";
import FeatureItem from "../../UI/FeatureItem/Feature";

const UpdatePlan = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      icon: FaStar,
      color: "gray",
      price: { monthly: 0, yearly: 0 },
      features: [
        { icon: FaChartBar, text: "5 dự án", enabled: true },
        { icon: FaCubes, text: "100 vật liệu", enabled: true },
        { icon: FaUsers, text: "2 người dùng", enabled: true },
        { icon: FaDatabase, text: "1 GB lưu trữ", enabled: true },
        { icon: FaChartLine, text: "Báo cáo cơ bản", enabled: true },
        { icon: FaChartBar, text: "Thống kê cơ bản", enabled: true },
        { icon: FaFileExport, text: "Xuất dữ liệu", enabled: false },
        { icon: FaComments, text: "Email support", enabled: true },
        { icon: FaPlug, text: "API access", enabled: false },
        { icon: FaLightning, text: "Tự động hóa", enabled: false },
      ],
    },
    {
      name: "Pro",
      icon: FaBolt,
      color: "purple",
      price: { monthly: 399000, yearly: 3990000 },
      popular: true,
      features: [
        { icon: FaChartBar, text: "50 dự án", enabled: true },
        { icon: FaCubes, text: "1000 vật liệu", enabled: true },
        { icon: FaUsers, text: "10 người dùng", enabled: true },
        { icon: FaDatabase, text: "25 GB lưu trữ", enabled: true },
        { icon: FaChartLine, text: "Báo cáo nâng cao", enabled: true },
        { icon: FaChartBar, text: "Phân tích chuyên sâu", enabled: true },
        { icon: FaFileExport, text: "Excel, PDF, CSV", enabled: true },
        { icon: FaComments, text: "24/7 support", enabled: true },
        { icon: FaPlug, text: "API access", enabled: true },
        { icon: FaLightning, text: "Tự động hóa cơ bản", enabled: true },
      ],
    },
    {
      name: "Max",
      icon: FaRocket,
      color: "amber",
      price: { monthly: 799000, yearly: 7990000 },
      features: [
        { icon: FaChartBar, text: "Không giới hạn dự án", enabled: true },
        { icon: FaCubes, text: "Không giới hạn vật liệu", enabled: true },
        { icon: FaUsers, text: "Không giới hạn người dùng", enabled: true },
        { icon: FaDatabase, text: "100 GB lưu trữ", enabled: true },
        { icon: FaChartLine, text: "Báo cáo tùy chỉnh", enabled: true },
        { icon: FaChartBar, text: "AI Analytics", enabled: true },
        { icon: FaFileExport, text: "Tất cả định dạng", enabled: true },
        { icon: FaComments, text: "Dedicated support", enabled: true },
        { icon: FaPlug, text: "API + Webhooks", enabled: true },
        { icon: FaLightning, text: "Enterprise automation", enabled: true },
      ],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nâng cấp gói của bạn
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Chọn gói phù hợp với nhu cầu quản lý dự án của bạn
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={classNames(
                "px-6 py-2 rounded-full transition-all font-medium",
                {
                  "bg-blue-600 text-white": billingCycle === "monthly",
                  "text-gray-600 hover:text-gray-900":
                    billingCycle !== "monthly",
                }
              )}
            >
              Tháng
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={classNames(
                "px-6 py-2 rounded-full transition-all font-medium",
                {
                  "bg-blue-600 text-white": billingCycle === "yearly",
                  "text-gray-600 hover:text-gray-900":
                    billingCycle !== "yearly",
                }
              )}
            >
              Năm
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price =
              billingCycle === "monthly"
                ? plan.price.monthly
                : plan.price.yearly;

            return (
              <div
                key={plan.name}
                className={classNames(
                  "relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl",
                  {
                    "ring-2 ring-blue-500 scale-105": plan.popular,
                    "hover:scale-105": !plan.popular,
                  }
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                )}

                <div
                  className={classNames("p-6", {
                    "bg-gray-50": plan.color === "gray",
                    "bg-purple-50": plan.color === "purple",
                    "bg-amber-50": plan.color === "amber",
                  })}
                >
                  <Icon
                    className={classNames("w-12 h-12 mb-4", {
                      "text-gray-500": plan.color === "gray",
                      "text-purple-500": plan.color === "purple",
                      "text-amber-500": plan.color === "amber",
                    })}
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {price === 0 ? "Miễn phí" : formatPrice(price)}
                    </span>
                    {price !== 0 && (
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === "monthly" ? "tháng" : "năm"}
                      </span>
                    )}
                  </div>
                  <ButtonCus
                    className={classNames(
                      "w-full text-white font-semibold py-3 rounded-lg transition-colors bg-none",
                      {
                        "bg-gray-600! hover:bg-gray-700!":
                          plan.color === "gray",
                        "bg-purple-600! hover:bg-purple-700!":
                          plan.color === "purple",
                        "bg-amber-600! hover:bg-amber-700!":
                          plan.color === "amber",
                      }
                    )}
                  >
                    {plan.name === "Free" ? "Đang sử dụng" : "Nâng cấp ngay"}
                  </ButtonCus>
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <FeatureItem
                        key={index}
                        icon={feature.icon}
                        text={feature.text}
                        enabled={feature.enabled}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Cần tư vấn thêm? Liên hệ với chúng tôi qua{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlan;
