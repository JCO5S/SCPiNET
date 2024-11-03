export interface SystemInfo {
    time: string;
    location: string;
    ip: string;
    isp: string;
    device: string;
    visitors: number;
    connection: string;
    cpuTemp: string;
    encryption: string;
    alarmStatus: string;
  }
  
  export interface Command {
    name: string;
    description: string;
    action: () => void;
  }