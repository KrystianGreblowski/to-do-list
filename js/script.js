{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((task) => task !== tasks[taskIndex]);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: ((tasks[taskIndex].done) ? false : true)
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const toggleHideTasksDoneElement = document.querySelector(".js-toggleHideTasksDone");
        const markAllTasksDoneElement = document.querySelector(".js-markAllTasksDone");

        if (toggleHideTasksDoneElement) {
            toggleHideTasksDoneElement.addEventListener("click", toggleHideDoneTasks);
        }

        if (markAllTasksDoneElement) {
            markAllTasksDoneElement.addEventListener("click", markAllTasksDone);
        }
    };

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
    };

    const renderButtons = () => {
        buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        let htmlString = "";

        htmlString += `     
            <button class="section__singleButton js-toggleHideTasksDone">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>        
            <button class="section__singleButton js-markAllTasksDone" 
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button> 
        `;

        buttonsElement.innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}