$(document).ready(function() {
    loadTodoList();

    $('#new_btn').click(function() {
        const task = prompt('Please enter a new TO DO:');
        if (task && task.trim() !== '') {
            addTodo(task.trim());
            saveTodoList();
        }
    });

    function addTodo(text) {
        const $div = $('<div></div>').text(text);

        $div.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveTodoList();
            }
        });

        $('#ft_list').prepend($div);
    }

    function saveTodoList() {
        const tasks = [];
        $('#ft_list div').each(function() {
            tasks.push($(this).text());
        });
        document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/;max-age=31536000";
    }

    function loadTodoList() {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'todo_list') {
                try {
                    const tasks = JSON.parse(decodeURIComponent(value));
                    for (let i = tasks.length - 1; i >= 0; i--) {
                        addTodo(tasks[i]);
                    }
                } catch (e) {
                    console.error('Error loading tasks from cookie', e);
                }
            }
        }
    }
});