// Steal my code if you are a gay nigger

document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminalContent');
    const commandInput = document.getElementById('commandInput');
    const welcomeMessage = document.getElementById('welcomeMessage');
    let commandHistory = [];
    let historyIndex = -1;

    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            welcomeMessage.innerHTML = `
                Welcome to 0x01.lol (GNU/Linux 1.33.7-69-generic x86_64)<br>
                <ul>
                    <li>Type 'help' to get a list of available commands</li>
                </ul>
                Session Information: ${date}, ${time} from ${ip}
            `;
        })
    .catch(error => console.error('Error fetching IP address:', error));

    commandInput.addEventListener('keydown', handleKeyDown);
    commandInput.addEventListener('keypress', handleKeyPress);

    function handleKeyDown(event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            historyIndex = Math.max(0, historyIndex - 1);
            commandInput.value = commandHistory[historyIndex] || '';
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            historyIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
            commandInput.value = commandHistory[historyIndex] || '';
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = this.value.trim();
            if (command !== '') {
                executeCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    }

    function executeCommand(command) {
        if (command === 'clear') {
            clearTerminalText();
            return;
        }
        if (command === 'help') {
            displayHelp();
            return;
        }
    
        const redirectCommands = {
            'game': 'https://game.0x01.lol',
            'cyberwarfare': 'https://cipher.services'
            'myten': 'https://myten.menu'
        };
    
        if (redirectCommands.hasOwnProperty(command)) {
            window.open(redirectCommands[command], '_blank');
            const output = document.createElement('div');
            output.textContent = `proton@0x01.lol:~$: ${command}`;
            terminal.appendChild(output);
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = `Sorry. '${command}' does not exist! Use 'help' to get a list of valid commands.`;
            terminal.appendChild(errorMessage);
        }
    
        commandInput.focus();
    }
       
    function clearTerminalText() {
        terminal.innerHTML = '';
        const output = document.createElement('div');
        output.innerHTML = welcomeMessage.innerHTML;
        terminal.appendChild(output);
    }
    
    function displayHelp() {
        const helpText = `
        <br>
            Available commands:
            <ul>
                <li>help: Display this help message.</li>
                <li>clear: Clear the terminal screen.</li>
                <li>game: Takes you to the 0x01.lol Game Panel.</li>
                <li>cyberwarfare: Takes you to the cipher.services.</li>
            </ul>
        `;
        const output = document.createElement('div');
        output.innerHTML = helpText;
        terminal.appendChild(output);
    }
});
