{
    let tasks = [];
    let allTasksDone = false;

    const checkIfAllTasksMarked = () => {
        tasks.every(({ done }) => done) ? allTasksDone = true : allTasksDone = false;
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        checkIfAllTasksMarked();
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        checkIfAllTasksMarked();
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: ((tasks[taskIndex].done) ? false : true) },
            ...tasks.slice(taskIndex + 1),
        ];

        checkIfAllTasksMarked();
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindButtonsEvents = () => {
        const hideTasksDoneButton = document.querySelector(".js-hideTasksDoneButton");
        const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");

        hideTasksDoneButton.addEventListener("click", () => { });

        completeAllTasksButton.addEventListener("click", () => {
            if (!allTasksDone) {
                for (index = 0; index < tasks.length; index++) {
                    tasks = [
                        ...tasks.slice(0, index),
                        { ...tasks[index], done: true },
                        ...tasks.slice(index + 1),
                    ];
                }

                allTasksDone = true;
            }

            render();
        });

        if (allTasksDone) completeAllTasksButton.setAttribute("disabled", "");
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done ? "list__item--done" : ""}">
                    <button class="list__button ${task.done ? "list__button--done" : ""} js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                
                    <span class="list__content ${task.done ? "list__content--done" : ""}">
                        ${task.content}
                    </span>
                
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const renderButtons = () => {
        let htmlString = "";

        htmlString += `   
            <h2 class="section__title">Lista zadań</h2>
            <button class="section__button js-hideTasksDoneButton">Ukryj ukończone</button>
            <button class="section__button js-completeAllTasksButton">Ukończ wszystkie</button> 
        `;

        document.querySelector(".js-buttons").innerHTML = htmlString;
    }

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}