# Employee Approval Workflow TODO

## Tasks
- [x] Modify AuthContext.jsx: Update login function to allow unapproved employees to log in and redirect to /home (Already implemented)
- [x] Modify AuthContext.jsx: Update register function to set approved: false for employees (Already implemented)
- [x] Modify AuthContext.jsx: Add useEffect to listen for 'usersUpdated' event and update user state (Already implemented)
- [x] Modify Sidebar.jsx: Only show employee dashboard link if user is approved
- [ ] Test the workflow: Register as employee, login, check sidebar, approve in admin, check sidebar updates

## Status
- [ ] In Progress
