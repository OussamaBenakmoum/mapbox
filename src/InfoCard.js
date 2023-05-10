import React from 'react';

function InfoCard(props) {
  return (
    <div id="info-card" className="absolute w-1/3 h-5/6 top-0 right-0 m-6 p-4 bg-white shadow-xl rounded-lg border border-gray-300 ${props.infoCardData === null ? 'hidden' : ''}`}  ">
      <h2 className="text-lg font-semibold mb-2" id="info-title">{props.title}</h2>
      <p className="text-sm border-b  mb-4" id="info-description">{props.description}</p>

      <h2 className="text-lg font-semibold mb-2" id="info-title">{props.title}</h2>
      <p className="text-sm border-b  mb-4" id="info-description">{props.description}</p>

      <h2 className="text-lg font-semibold mb-2" id="info-title">{props.title}</h2>
      <p className="text-sm border-b  mb-4" id="info-description">{props.description}</p>

      <h2 className="text-lg font-semibold mb-2" id="info-title">{props.title}</h2>
      <p className="text-sm border-b  mb-4" id="info-description">{props.description}</p>


      {/* <img id="info-image" className="w-full rounded-lg" src={props.image} alt=""/> */}
      <button  className="flex mt-4 py-2 px-4 bottom-0 right-0  bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-xl" onClick={props.onClose}>Close</button>
    </div>
  );
}

export default InfoCard;
