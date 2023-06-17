const bindScreenButton = (buttonId, screenId) => {
    const button = document.querySelector(`#${buttonId}`);
    const screen = document.querySelector(`#${screenId}`);

    button.addEventListener('click', () => {
        button.classList.toggle('screen-button-active')
        screen.classList.toggle('hidden');
    })
};

const screens = () => {
    bindScreenButton('tasks-button', 'tasks-screen');
    bindScreenButton('calendar-button', 'calendar-screen');
}

export {screens};