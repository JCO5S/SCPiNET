import React, { useState, useRef, useEffect } from 'react';
import { SystemInfo } from '../types';
import { commands } from '../utils/commands';
import StatusPanel from './StatusPanel';
import HelpInterface from './HelpInterface';

const TerminalInterface: React.FC = () => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    time: new Date().toLocaleTimeString(),
    location: 'Reservacion Monroe, Bloomington, Indiana, Estados Unidos',
    ip: 'Cargando...',
    isp: 'Cargando...',
    device: navigator.userAgent,
    visitors: Math.floor(Math.random() * 50000) + 10000,
    connection: 'CONECTADO',
    cpuTemp: '45.2°C',
    encryption: 'AES-256',
    alarmStatus: 'Normal'
  });

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemInfo(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString()
      }));
    }, 1000);

    // Simular obtención de IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setSystemInfo(prev => ({
          ...prev,
          ip: data.ip
        }));
      })
      .catch(() => {
        setSystemInfo(prev => ({
          ...prev,
          ip: '192.168.1.1'
        }));
      });

    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const normalizedCommand = command.toLowerCase().trim();
      
      // Agregar comando al historial
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      
      // Procesar comando
      processCommand(normalizedCommand);
      
      // Limpiar entrada
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    }
  };

  const navigateHistory = (direction: 'up' | 'down') => {
    if (direction === 'up' && historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (direction === 'down' && historyIndex >= 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setCommand('');
      }
    }
  };

  const processCommand = (cmd: string) => {
    const [baseCmd, ...args] = cmd.split(' ');
    
    switch(baseCmd) {
      case 'help':
      case 'ayuda':
        setShowHelp(true);
        break;
      case 'clear':
      case 'cls':
        setOutput([]);
        break;
      case 'access':
        if (args[0]) {
          setOutput(prev => [...prev, `> Accediendo al documento SCP-${args[0]}...`]);
          // Aquí podrías implementar la lógica para mostrar documentos SCP
        } else {
          setOutput(prev => [...prev, '> Error: Especifica un número de SCP']);
        }
        break;
      case 'status':
        setOutput(prev => [...prev, '> Estado del sistema: Normal']);
        break;
      case 'scan':
        setOutput(prev => [...prev, '> Escaneando red...', '> No se encontraron amenazas']);
        break;
      default:
        setOutput(prev => [...prev, `> Comando no reconocido: ${cmd}`]);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="min-h-screen font-mono text-white bg-black">
      {showHelp && <HelpInterface onClose={() => setShowHelp(false)} />}

      <div className="flex justify-between p-2 bg-black">
        <div className="text-gray-500">COMUNICACIÓN</div>
        <div className="px-4 py-1 text-black bg-yellow-500">TABLERO DE CONTROL SCiPNET</div>
      </div>

      <div className="flex">
        <div className="flex-1 p-8 border border-yellow-500">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-2xl">TERMINAL DE ACCESO DIRECTO SCiPNET</h1>
            <h2 className="mb-4 text-xl">Fundación SCP</h2>
            <div className="mb-4 text-sm">SEGURIDAD. CONTENCIÓN. PROTECCIÓN</div>
            
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-500 rounded-full">
                <div className="text-2xl">SCP</div>
              </div>
            </div>
            
            <div className="mb-8 text-gray-400">
              Terminal de acceso directo SCiPNET v1.0
            </div>
            <div className="mb-8 text-sm text-yellow-500">
              Escriba "ayuda" para ver la lista de comandos
            </div>
          </div>

          <div 
            ref={terminalRef}
            className="h-64 mb-4 overflow-y-auto"
          >
            {output.map((line, i) => (
              <div key={i} className="text-green-500">{line}</div>
            ))}
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-gray-500">root@scpnet:~ $</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 text-white bg-transparent border-none outline-none"
              autoFocus
            />
          </div>
        </div>

        <StatusPanel systemInfo={systemInfo} />
      </div>

      <div className="p-4 text-xs text-gray-500">
        <div>TABLERO DE CONTROL SCiPNET</div>
        <div>Departamento de Ingeniería y Servicio Técnico • v.01-19-3.11</div>
      </div>
    </div>
  );
};

export default TerminalInterface;
