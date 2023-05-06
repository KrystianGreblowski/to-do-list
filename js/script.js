{
    let tasks = [];
    let hideDoneTasks = false;
    let allTasksDone = false;

    const checkIfAllTasksMarked = () => {
        tasks.every(({ done }) => done) ? allTasksDone = true : allTasksDone = false;
    }

    const toggleHideTasks = () => hideDoneTasks = !hideDoneTasks;

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

    const completeAllTasks = () => {
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
        const hideTasksDone = document.querySelector(".js-hideTasksDone");
        const completeAllTasksButton = document.querySelector(".js-completeAllTasks");

        hideTasksDone.addEventListener("click", () => {
            toggleHideTasks();
            render();
        });

        completeAllTasksButton.addEventListener("click", () => {
            completeAllTasks();
            render();
        });

        if (allTasksDone) completeAllTasksButton.setAttribute("disabled", "");
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${(task.done && hideDoneTasks) ? "list__item--hidden" : ""}">
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
            
            <button class="section__button js-hideTasksDone">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            
            <button class="section__button js-completeAllTasks">Ukończ wszystkie</button> 
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