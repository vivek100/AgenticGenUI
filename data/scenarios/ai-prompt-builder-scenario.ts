export const aiPromptBuilderScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "aipromptbuilder",
    props: {
      initialPrompt:
        "Create a comprehensive guide about {{topic}} that covers the following aspects:\n\n1. Introduction to {{topic}}\n2. Key concepts and terminology\n3. Best practices for {{purpose}}\n4. Common challenges and solutions\n5. Resources for further learning",
      variables: [
        {
          id: "var-1",
          name: "topic",
          value: "artificial intelligence",
          description: "The main subject of the guide",
        },
        {
          id: "var-2",
          name: "purpose",
          value: "beginners learning AI concepts",
          description: "The intended use case or audience",
        },
      ],
      examples: [
        {
          id: "ex-1",
          input:
            "Create a comprehensive guide about machine learning that covers the following aspects:\n\n1. Introduction to machine learning\n2. Key concepts and terminology\n3. Best practices for data scientists building models\n4. Common challenges and solutions\n5. Resources for further learning",
          output:
            "# Comprehensive Guide to Machine Learning\n\n## 1. Introduction to Machine Learning\nMachine learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. Unlike traditional programming where explicit instructions are provided, machine learning algorithms build models based on sample data to make predictions or decisions without being explicitly programmed to do so.\n\n## 2. Key Concepts and Terminology\n- **Supervised Learning**: Training with labeled data\n- **Unsupervised Learning**: Finding patterns in unlabeled data\n- **Reinforcement Learning**: Learning through trial and error with rewards\n- **Features**: The input variables used for prediction\n- **Labels**: The output variables being predicted\n- **Training**: The process of learning from data\n- **Inference**: Using the trained model to make predictions\n\n## 3. Best Practices for Data Scientists Building Models\n- Start with clear problem definition\n- Ensure data quality and representativeness\n- Perform thorough exploratory data analysis\n- Select appropriate algorithms for your problem\n- Use cross-validation to prevent overfitting\n- Regularly evaluate model performance\n- Document your approach and findings\n\n## 4. Common Challenges and Solutions\n- **Overfitting**: Use regularization, cross-validation\n- **Underfitting**: Increase model complexity, add features\n- **Data Quality**: Implement robust data cleaning pipelines\n- **Feature Selection**: Use domain knowledge and feature importance\n- **Imbalanced Data**: Apply resampling techniques or weighted loss functions\n\n## 5. Resources for Further Learning\n- Books: \"Hands-On Machine Learning with Scikit-Learn and TensorFlow\" by Aurélien Géron\n- Online Courses: Andrew Ng's Machine Learning course on Coursera\n- Communities: Kaggle, Stack Overflow, Reddit's r/MachineLearning\n- Tools: Scikit-learn, TensorFlow, PyTorch, Keras\n- Blogs: Towards Data Science, Machine Learning Mastery",
        },
      ],
      models: ["gpt-4o", "gpt-4-turbo", "claude-3-opus", "claude-3-sonnet", "gemini-pro", "llama-3"],
      onSubmit: (data) => {
        console.log("Prompt submitted:", data)
      },
    },
  },
}
