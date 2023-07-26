async function _getTasks(userName, setTaskList) {
    const url = "https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec?action=getTasks&name="+userName;

    await fetch(url)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання doGet з бекенду, те, що повертає return
                console.log({data});
                const regResult = JSON.parse(data);
                console.log({regResult});

                localStorage.setItem('tasks', JSON.stringify(regResult.arrCurrentTasks));
                const tasksData = localStorage.getItem('tasks');
                const curTasks = JSON.parse(tasksData);
                setTaskList(curTasks);
            })
            .catch((error) => {
                alert(error.message);
                console.log({error});
            });
}

export { _getTasks as getTasks };