import React from "react";
import classNames from "classnames";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export interface FeatureProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  enabled?: boolean;
}

const FeatureItem: React.FC<FeatureProps> = ({
  icon: Icon,
  text,
  enabled = true,
}) => {
  return (
    <li className="flex items-start gap-3">
      <div
        className={classNames(
          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
          {
            "bg-green-100": enabled,
            "bg-gray-100": !enabled,
          }
        )}
      >
        {enabled ? (
          <FaCheck className="w-3 h-3 text-green-600" />
        ) : (
          <FaTimes className="w-3 h-3 text-gray-400" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className={classNames("w-4 h-4", {
                "text-gray-700": enabled,
                "text-gray-400": !enabled,
              })}
            />
          )}
          <span
            className={classNames("text-sm", {
              "text-gray-700 font-medium": enabled,
              "text-gray-400 line-through": !enabled,
            })}
          >
            {text}
          </span>
        </div>
      </div>
    </li>
  );
};

export default FeatureItem;
