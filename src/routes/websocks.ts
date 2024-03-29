import WebSocket from 'ws';

const handleWebSocket = (wss: WebSocket.Server) => {
    let total = 0

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.send("Você conectou em mim");

        ws.on('message', (message) => {
            console.log(`mensagem recebida: ${message}`);

            ws.send(`Echo: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        const interval = setInterval(() => {
            ws.send('Mensagens respondida => ' + String(total+1));
            console.log('mensagem enviada ' + String(total++))
        }, 2000);

        ws.on('close', () => {
            console.log('Client disconnected');
            clearInterval(interval);
        });
    });
};

export { handleWebSocket };
