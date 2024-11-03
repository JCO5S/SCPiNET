import React from 'react';
import { SystemInfo } from '../types';

interface StatusPanelProps {
  systemInfo: SystemInfo;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ systemInfo }) => (
  <div className="w-64 p-4 text-xs bg-black">
    <div className="mb-6">
      <h3 className="mb-2 text-gray-500">Información general</h3>
      <div className="text-green-500">
        <p className="mb-1">Tiempo:</p>
        <p className="mb-4 text-xl">{systemInfo.time}</p>
        
        <p className="mb-1">Ubicación:</p>
        <p className="mb-2">{systemInfo.location}</p>
        
        <p className="mb-1">Dirección IP:</p>
        <p className="mb-2">{systemInfo.ip}</p>
        
        <p className="mb-1">ISP:</p>
        <p className="mb-2">{systemInfo.isp}</p>
        
        <p className="mb-1">Dispositivo:</p>
        <p className="mb-2">{systemInfo.device}</p>
        
        <p className="mb-1">Visitantes:</p>
        <p className="mb-2">{systemInfo.visitors}</p>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="mb-2 text-gray-500">Estado del Sistema</h3>
      <div className="text-green-500">
        <p className="mb-1">Conexión:</p>
        <p className="mb-2">{systemInfo.connection}</p>
        
        <p className="mb-1">CPU:</p>
        <p className="mb-2">{systemInfo.cpuTemp}</p>
        
        <p className="mb-1">Encriptación:</p>
        <p className="mb-2">{systemInfo.encryption}</p>
        
        <p className="mb-1">Alarma:</p>
        <p>{systemInfo.alarmStatus}</p>
      </div>
    </div>
  </div>
);

export default StatusPanel;