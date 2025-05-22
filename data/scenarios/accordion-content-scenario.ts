export const accordionContentScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "accordioncontent",
    props: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our service",
      items: [
        {
          id: "faq-1",
          title: "How do I reset my password?",
          content:
            "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email address.",
        },
        {
          id: "faq-2",
          title: "Can I use the service on multiple devices?",
          content:
            "Yes, you can access your account from any device with an internet connection. Your data will be synchronized across all your devices automatically.",
        },
        {
          id: "faq-3",
          title: "How do I cancel my subscription?",
          content:
            "You can cancel your subscription at any time from your account settings. Navigate to 'Billing & Subscription' and click 'Cancel Subscription'. Your service will remain active until the end of your current billing period.",
        },
        {
          id: "faq-4",
          title: "Do you offer a free trial?",
          content:
            "Yes, we offer a 14-day free trial for all new users. No credit card is required to start your trial, and you can upgrade to a paid plan at any time during or after the trial period.",
        },
        {
          id: "faq-5",
          title: "How can I contact customer support?",
          content:
            "Our support team is available 24/7. You can reach us through live chat on our website, by email at support@example.com, or by phone at +1-800-123-4567.",
        },
      ],
      defaultOpen: ["faq-1"],
    },
  },
}
