document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const sort = document.getElementById('sort');

    loadTasks();

    taskInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const taskTextContainer = document.createElement('div');
        taskTextContainer.className = 'taskTextContainer'; // Новий клас для контейнера тексту завдання
        const taskText = document.createElement('span');
        taskText.className = 'taskText';
        taskText.textContent = text;
        const deleteButton = document.createElement('span');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = '❌';

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextContainer);
        taskTextContainer.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        checkbox.addEventListener('change', function () {
            taskItem.classList.toggle('completed', checkbox.checked);
            taskText.classList.toggle('completed', checkbox.checked);
            checkbox.style.display = checkbox.checked ? 'none' : 'inline';
            saveTasks();
        });

        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskText.addEventListener('dblclick', function () {
            if (!checkbox.checked) {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = taskText.textContent;
                taskTextContainer.replaceChild(editInput, taskText);
                editInput.focus();

                editInput.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        if (taskTextContainer.contains(editInput)) {
                            taskText.textContent = editInput.value;
                            taskTextContainer.replaceChild(taskText, editInput);
                            saveTasks();
                        }
                    }
                });
            }
        });

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('.taskItem');

        taskItems.forEach(function (taskItem) {
            const task = {
                text: taskItem.querySelector('span.taskText').textContent,
                completed: taskItem.classList.contains('completed')
            };
            tasks.push(task);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(function (task) {
            addTask(task.text);
            const taskItem = taskList.lastElementChild;
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            const taskText = taskItem.querySelector('span.taskText');
            if (task.completed) {
                checkbox.checked = true;
                taskItem.classList.add('completed');
                taskText.classList.add('completed');
                checkbox.style.display = 'none';
            }
        });
    }

    sort.addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const completedTasks = tasks.filter(task => task.completed);
        const uncompletedTasks = tasks.filter(task => !task.completed);

        taskList.innerHTML = '';

        uncompletedTasks.forEach(function (task) {
            addTask(task.text);
        });

        completedTasks.forEach(function (task) {
            addTask(task.text);
            const taskItem = taskList.lastElementChild;
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            const taskText = taskItem.querySelector('span.taskText');
            if (task.completed) {
                checkbox.checked = true;
                taskItem.classList.add('completed');
                taskText.classList.add('completed');
                checkbox.style.display = 'none';
            }
        });
    });
});