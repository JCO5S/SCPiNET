import React from 'react';
import { commands } from '../utils/commands';

interface HelpInterfaceProps {
  onClose: () => void;
}

const HelpInterface: React.FC<HelpInterfaceProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
    <div className="w-full max-w-4xl p-8 mx-4 bg-gray-900 border border-yellow-500">
      <div className="mb-6">
        <div className="inline-block px-4 py-1 mb-4 text-black bg-yellow-500">
          INTRODUCCIÓN
        </div>
        <p className="mb-4 text-gray-300">
          SCiPNET Direct Access Terminal{' '}
          <span className="text-yellow-500">SCiPNET</span>, es una terminal de acceso
          a la base de datos de la Fundación SCP.
        </p>
      </div>

      <div className="mb-6">
        <div className="inline-block px-4 py-1 mb-4 text-black bg-yellow-500">
          COMANDOS DISPONIBLES
        </div>
        <div className="grid grid-cols-1 gap-2">
          {Object.values(commands).map((cmd) => (
            <div key={cmd.name} className="pb-2 text-gray-300 border-b border-gray-700">
              <span className="text-yellow-500">{cmd.usage}</span>
              <p className="ml-4 text-sm">{cmd.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onClose}
        className="mt-4 text-yellow-500 hover:text-yellow-400"
      >
        [Cerrar]
      </button>
    </div>
  </div>
);

export default HelpInterface;