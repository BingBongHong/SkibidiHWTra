chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon128.png",
    title: "Task Reminder",
    message: alarm.name
  });
});

chrome.storage.sync.get("tasks", function (data) {
  const tasks = data.tasks || [];
  tasks.forEach(task => {
    const alarmName = `Reminder for ${task.name}`;
    const alarmTime = new Date(task.dueDate).getTime() - 3600000; // Reminder 1 hour before due
    chrome.alarms.create(alarmName, { when: alarmTime });
  });
});
