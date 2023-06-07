const screensList = document.querySelectorAll('.screen');

const bindScreenButton = (buttonId, screenId) => {
    const button = document.querySelector(`#${buttonId}`);
    const screen = document.querySelector(`#${screenId}`);

    button.addEventListener('click', () => {
        screensList.forEach((screen) => screen.classList.add('hidden'));
        screen.classList.remove('hidden');
    })
};

const screens = () => {
    bindScreenButton('tasks-button', 'tasks-screen');
    bindScreenButton('weather-button', 'weather-screen');
}


export {screens};