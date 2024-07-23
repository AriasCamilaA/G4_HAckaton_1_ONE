import React from "react";
import { Card } from "@nextui-org/react";
import { poppins, montserrat } from "../../app/fonts";
import { Alert } from "../../utilities";

const CategoryCard = ({ title, keys }) => {
  const openAlert = () => {
    Alert.fire({
      title: `${title} - AI Keys`,
      html: `<ul>${keys.map((key) => `<li key="${key.id}"> - ${key.name}</li>`).join('')}</ul>`,
      confirmButtonText: 'Close'
    });
  };

  return (
    <div className="w-full">
      <Card className="flex flex-col items-center w-full p-5" >
        <div className="flex flex-row justify-between w-full">
          <div>
            <h5 className={`${poppins.className} text-text tracking-tight`}>
              {title}
            </h5>
            <span className={`${montserrat.className} text-sm font-medium lg:text-base tracking-tight text-gray-500`}>
              {keys.length} AI keys
            </span>
          </div>
          <img className="w-6" src="ArrowRight.svg" alt="Arrow Icon" onClick={openAlert}/>
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;
