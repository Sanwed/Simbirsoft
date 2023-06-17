const tasksParent = document.querySelector('.tasks__wrapper');
const taskTemplate = document.querySelector('#task')
  .content
  .querySelector('.task');

const createTask = (title, text) => {
  const task = taskTemplate.cloneNode(true);
  task.querySelector('.task__title').textContent = title;
  task.querySelector('.task__text').textContent = text;
  tasksParent.append(task);
};

const renderTasks = (tasks) => {
  tasks.forEach((task) => {
    const taskElement = taskTemplate.cloneNode(true);
    taskElement.querySelector('.task__title').textContent = task.title;
    taskElement.querySelector('.task__text').textContent = task.description;
    tasksParent.append(taskElement);
  });
};

const clearValues = (element) => {
  const inputs = element.querySelectorAll('input');
  const textareas = element.querySelectorAll('textarea');
  
  inputs.forEach((input) => input.value = '');
  textareas.forEach((textarea) => textarea.value = '');
};

const tasksList = tasksParent.children;
const taskMessage = document.querySelector('.tasks__message');
const countTasks = () => {
  if (tasksList.length > 0) {
    taskMessage.textContent = `Задач активно: ${tasksList.length}`;
  } else {
    taskMessage.textContent = 'В данный момент у вас нет задач';
  }
};

const closeModal = (modalSelector) => {
  const modal = document.querySelector(`#${modalSelector}`);
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeButtonClick);
};

const openModal = (modalSelector) => {
  const modal = document.querySelector(`#${modalSelector}`);
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeButtonClick);
  clearValues(modal);
};

function onEscapeButtonClick(evt) {
  if (evt.key === 'Escape') {
    closeModal('add-task-modal');
  }
}

const editTaskHandler = (task) => {
  const editTaskForm = document.querySelector('#edit-task-form');
  editTaskForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const title = editTaskForm.querySelector('#edit-task-title').value;
    const text = editTaskForm.querySelector('#edit-task-text').value;
    
    task.querySelector('.task__title').textContent = title;
    task.querySelector('.task__text').textContent = text;
    
    closeModal('edit-task-modal');
  }, {once: true});
};

const addTaskButtonsHandlers = () => {
  tasksParent.addEventListener('click', (evt) => {
    const task = evt.target.closest('.task');
    
    if (!task) {
      return;
    }
    
    if (evt.target.classList.contains('task-ready')) {
      task.classList.add('removing');
      setTimeout(() => {
        task.remove();
        countTasks();
      }, 200);
    }
    
    if (evt.target.classList.contains('edit-button')) {
      openModal('edit-task-modal');
      console.log(task);
      const title = document.querySelector('#edit-task-title');
      const text = document.querySelector('#edit-task-text');
      title.value = task.querySelector('.task__title').textContent;
      text.value = task.querySelector('.task__text').textContent;
      
      editTaskHandler(task);
    }
  });
};

const addCloseButtonHandler = (modalSelector) => {
  const modal = document.querySelector(`#${modalSelector}`);
  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    closeModal(modalSelector);
  });
};

const addButton = document.querySelector('#add-task');
addButton.addEventListener('click', () => {
  openModal('add-task-modal');
});

const addTaskForm = document.querySelector('#add-task-form');
addTaskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const title = addTaskForm.querySelector('#add-task-title').value;
  const text = addTaskForm.querySelector('#add-task-text').value;
  
  createTask(title, text);
  countTasks();
  closeModal('add-task-modal');
});

/**
 * Добавляет возможность добавления и удаления задач
 */
const tasks = (tasks) => {
  renderTasks(tasks);
  countTasks();
  addTaskButtonsHandlers();
  addCloseButtonHandler('add-task-modal');
  addCloseButtonHandler('edit-task-modal');
};

export {tasks};