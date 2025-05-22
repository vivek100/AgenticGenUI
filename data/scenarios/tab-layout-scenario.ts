export const tabLayoutScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "tablayout",
    props: {
      title: "Account Settings",
      description: "Manage your account preferences",
      tabs: [
        {
          id: "profile",
          label: "Profile",
          content: {
            title: "Profile Information",
            description: "Update your personal information and profile picture",
            fields: [
              { id: "name", label: "Full Name", type: "text", value: "Alex Johnson" },
              { id: "email", label: "Email Address", type: "email", value: "alex@example.com" },
              {
                id: "bio",
                label: "Biography",
                type: "textarea",
                value: "Full-stack developer with 5 years of experience.",
              },
            ],
          },
        },
        {
          id: "security",
          label: "Security",
          content: {
            title: "Security Settings",
            description: "Update your password and security preferences",
            fields: [
              { id: "currentPassword", label: "Current Password", type: "password" },
              { id: "newPassword", label: "New Password", type: "password" },
              { id: "confirmPassword", label: "Confirm Password", type: "password" },
            ],
          },
        },
        {
          id: "notifications",
          label: "Notifications",
          content: {
            title: "Notification Preferences",
            description: "Control which notifications you receive",
            options: [
              { id: "email-updates", label: "Email Updates", checked: true },
              { id: "sms-alerts", label: "SMS Alerts", checked: false },
              { id: "push-notifications", label: "Push Notifications", checked: true },
              { id: "newsletter", label: "Weekly Newsletter", checked: true },
            ],
          },
        },
        {
          id: "billing",
          label: "Billing",
          content: {
            title: "Billing Information",
            description: "Manage your payment methods and billing history",
            paymentMethods: [
              { id: "card-1", type: "Visa", last4: "4242", expiry: "04/24", default: true },
              { id: "card-2", type: "Mastercard", last4: "5555", expiry: "07/25", default: false },
            ],
            invoices: [
              { id: "inv-1", date: "2023-05-01", amount: "$29.99", status: "Paid" },
              { id: "inv-2", date: "2023-04-01", amount: "$29.99", status: "Paid" },
              { id: "inv-3", date: "2023-03-01", amount: "$29.99", status: "Paid" },
            ],
          },
        },
      ],
      defaultTab: "profile",
    },
  },
}
