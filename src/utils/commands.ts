export const commands = {
    help: {
      name: 'help',
      description: 'Muestra la lista de comandos disponibles',
      usage: 'help'
    },
    clear: {
      name: 'clear',
      description: 'Limpia la terminal',
      usage: 'clear'
    },
    access: {
      name: 'access',
      description: 'Accede a un documento SCP específico',
      usage: 'access [número-scp]'
    },
    status: {
      name: 'status',
      description: 'Muestra el estado actual del sistema',
      usage: 'status'
    },
    logout: {
      name: 'logout',
      description: 'Cierra la sesión actual',
      usage: 'logout'
    },
    scan: {
      name: 'scan',
      description: 'Escanea la red en busca de amenazas',
      usage: 'scan'
    },
    encrypt: {
      name: 'encrypt',
      description: 'Encripta un mensaje usando AES-256',
      usage: 'encrypt [mensaje]'
    }
  };