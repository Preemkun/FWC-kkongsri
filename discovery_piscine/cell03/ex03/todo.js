const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = function() {
    loadTodoList();
};


newBtn.addEventListener('click', function() {
    const task = prompt('Please enter a new TO DO:');
    if (task && task.trim() !== '') {
        addTodo(task.trim());
        saveTodoList();
    }
});


function addTodo(text) {
    const div = document.createElement('div');
    div.textContent = text;

    // กดที่รายการเพื่อลบออก
    div.addEventListener('click', function() {
        if (confirm('Do you really want to remove this TO DO?')) {
            div.remove();
            saveTodoList();
        }
    });

    // วางไว้ด้านบนสุดเสมอ
    ftList.insertBefore(div, ftList.firstChild);
}

// ฟังก์ชันบันทึกรายการลงใน Cookie
function saveTodoList() {
    const tasks = [];
    const items = ftList.children;
    for (let i = 0; i < items.length; i++) {
        tasks.push(items[i].textContent);
    }
    document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/;max-age=31536000";
}

// ฟังก์ชันอ่าน Cookie แล้วนำมาแสดงผล
function loadTodoList() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'todo_list') {
            try {
                const tasks = JSON.parse(decodeURIComponent(value));
                // วนลูปย้อนกลับเพื่อให้ลำดับของรายการตรงตามเดิมเมื่อใช้ insertBefore
                for (let i = tasks.length - 1; i >= 0; i--) {
                    addTodo(tasks[i]);
                }
            } catch (e) {
                console.error('Error loading tasks from cookie', e);
            }
        }
    }
}