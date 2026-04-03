export const TaskCard = ({ task, onDelete, onUpdate }) => {
  const handleStatusChange = e => {
    onUpdate(task.id, { status: e.target.value })
  }

  const handlePriorityChange = e => {
    onUpdate(task.id, { priority: e.target.value })
  }

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : 'No due date'

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(task.id)}
            title="Delete Task"
          >
            &times;
          </button>
        </div>
      </div>

      <div className="task-meta">
        <span className={`badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-date">{formattedDate}</span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-card-footer">
        <select
          className="status-select"
          value={task.status}
          onChange={handleStatusChange}
          aria-label="Change status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          className="priority-select"
          value={task.priority}
          onChange={handlePriorityChange}
          aria-label="Change priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  )
}
