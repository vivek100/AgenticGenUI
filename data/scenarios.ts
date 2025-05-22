// Mock scenarios for testing different components
export const scenarios = {
  metricCard: {
    tool: "renderComponent",
    payload: {
      componentType: "metriccard",
      props: {
        title: "Total Users",
        value: "1,234",
        description: "Total users in the system",
        trend: { value: 12, isPositive: true },
      },
    },
  },
  chart: {
    tool: "renderComponent",
    payload: {
      componentType: "chart",
      props: {
        title: "Monthly Revenue",
        description: "Revenue over the last 6 months",
        data: [
          { x: "Jan", y: 1000 },
          { x: "Feb", y: 1500 },
          { x: "Mar", y: 1200 },
          { x: "Apr", y: 1800 },
          { x: "May", y: 2200 },
          { x: "Jun", y: 2500 },
        ],
      },
    },
  },
  dataTable: {
    tool: "renderComponent",
    payload: {
      componentType: "datatable",
      props: {
        title: "User List",
        description: "All registered users",
        columns: [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
        ],
        data: [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
        ],
      },
    },
  },
  confirmationCard: {
    tool: "renderComponent",
    payload: {
      componentType: "confirmationcard",
      props: {
        title: "Delete Account",
        message: "Are you sure you want to delete your account? This action cannot be undone.",
        importance: "critical",
      },
    },
  },
  userForm: {
    tool: "renderComponent",
    payload: {
      componentType: "userform",
      props: {
        title: "Create User",
        description: "Add a new user to the system",
        fields: [
          { id: "name", label: "Full Name", type: "text", required: true },
          { id: "email", label: "Email Address", type: "email", required: true },
          { id: "role", label: "Role", type: "text" },
          { id: "notes", label: "Notes", type: "textarea" },
        ],
      },
    },
  },
  toggleSwitch: {
    tool: "renderComponent",
    payload: {
      componentType: "toggleswitch",
      props: {
        title: "Notifications",
        description: "Enable or disable email notifications",
        settingId: "email-notifications",
      },
    },
  },
  infoBanner: {
    tool: "renderComponent",
    payload: {
      componentType: "infobanner",
      props: {
        title: "System Maintenance",
        message: "The system will be down for maintenance on Sunday from 2-4 AM.",
        type: "warning",
      },
    },
  },
  progressBar: {
    tool: "renderComponent",
    payload: {
      componentType: "progressbar",
      props: {
        title: "Data Import",
        description: "Importing user data from CSV",
        value: 65,
        max: 100,
        interactive: true,
      },
    },
  },
  avatarCard: {
    tool: "renderComponent",
    payload: {
      componentType: "avatarcard",
      props: {
        name: "Alex Johnson",
        role: "Senior Developer",
        description: "Full-stack developer with 5 years of experience",
        status: "online",
        badges: ["React", "Node.js", "TypeScript"],
      },
    },
  },
  timeline: {
    tool: "renderComponent",
    payload: {
      componentType: "timeline",
      props: {
        title: "Project Timeline",
        description: "Recent project activities",
        events: [
          {
            id: "1",
            title: "Project Started",
            description: "Initial kickoff meeting",
            timestamp: "2023-01-15 09:00",
            type: "success",
          },
          {
            id: "2",
            title: "Design Phase",
            description: "UI/UX design completed",
            timestamp: "2023-01-20 14:30",
            type: "default",
          },
          {
            id: "3",
            title: "Development Delay",
            description: "Backend integration issues",
            timestamp: "2023-01-25 11:15",
            type: "warning",
          },
          {
            id: "4",
            title: "Testing Failed",
            description: "Critical bugs found in login flow",
            timestamp: "2023-01-30 16:45",
            type: "error",
          },
        ],
      },
    },
  },
  multiStepForm: {
    tool: "renderComponent",
    payload: {
      componentType: "multistepform",
      props: {
        title: "Create Account",
        description: "Complete all steps to create your account",
        steps: [
          {
            title: "Personal Info",
            description: "Your basic information",
            fields: [
              { id: "firstName", label: "First Name", type: "text", required: true },
              { id: "lastName", label: "Last Name", type: "text", required: true },
              { id: "email", label: "Email Address", type: "email", required: true },
            ],
          },
          {
            title: "Account Details",
            description: "Set up your account",
            fields: [
              { id: "username", label: "Username", type: "text", required: true },
              { id: "role", label: "Role", type: "select", required: true, options: ["User", "Admin", "Editor"] },
            ],
          },
          {
            title: "Preferences",
            description: "Set your preferences",
            fields: [
              { id: "bio", label: "Bio", type: "textarea" },
              {
                id: "notifications",
                label: "Notification Frequency",
                type: "select",
                options: ["Daily", "Weekly", "Monthly"],
              },
            ],
          },
        ],
      },
    },
  },
  searchWithFilters: {
    tool: "renderComponent",
    payload: {
      componentType: "searchwithfilters",
      props: {
        title: "Search Products",
        description: "Find products by name or apply filters",
        placeholder: "Search products...",
        filters: [
          { id: "category-electronics", label: "Electronics", value: "electronics" },
          { id: "category-clothing", label: "Clothing", value: "clothing" },
          { id: "category-books", label: "Books", value: "books" },
          { id: "price-low", label: "Under $50", value: "price_under_50" },
          { id: "price-mid", label: "$50 - $100", value: "price_50_100" },
          { id: "price-high", label: "Over $100", value: "price_over_100" },
          { id: "rating-high", label: "4+ Stars", value: "rating_4plus", active: true },
        ],
      },
    },
  },
  dateTimeRangePicker: {
    tool: "renderComponent",
    payload: {
      componentType: "datetimerangepicker",
      props: {
        title: "Schedule Meeting",
        description: "Select start and end date/time for your meeting",
        startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    },
  },
  ratingSelector: {
    tool: "renderComponent",
    payload: {
      componentType: "ratingselector",
      props: {
        title: "Product Feedback",
        description: "Let us know what you think about our product",
        label: "How would you rate your experience?",
        max: 5,
      },
    },
  },
  kanbanBoard: {
    tool: "renderComponent",
    payload: {
      componentType: "kanbanboard",
      props: {
        title: "Project Tasks",
        description: "Drag tasks between columns to update their status",
        columns: [
          {
            id: "todo",
            title: "To Do",
            tasks: [
              { id: "task-1", title: "Research competitors", description: "Analyze top 5 competitors" },
              { id: "task-2", title: "Create wireframes", description: "Design initial UI concepts" },
              { id: "task-3", title: "Set up database", description: "Configure PostgreSQL" },
            ],
          },
          {
            id: "in-progress",
            title: "In Progress",
            tasks: [
              { id: "task-4", title: "Implement authentication", description: "Set up user login/signup" },
              { id: "task-5", title: "Design landing page", description: "Create responsive layout" },
            ],
          },
          {
            id: "done",
            title: "Done",
            tasks: [
              { id: "task-6", title: "Project setup", description: "Initialize repository and dependencies" },
              { id: "task-7", title: "Requirements gathering", description: "Document initial requirements" },
            ],
          },
        ],
      },
    },
  },
}
