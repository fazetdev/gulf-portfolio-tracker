// Utility functions for localStorage management

export const storageKeys = {
  PROJECT_PROGRESS: 'gulf_portfolio_project_progress',
  CATEGORY_PROGRESS: 'gulf_portfolio_category_progress',
  MILESTONES: 'gulf_portfolio_milestones',
  DOCUMENTATION: 'gulf_portfolio_documentation',
  AI_PROMPTS: 'gulf_portfolio_ai_prompts'
};

// Get data from localStorage
export const getStorageData = (key, defaultValue = {}) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Save data to localStorage
export const saveStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get project progress
export const getProjectProgress = (projectId) => {
  const progressData = getStorageData(storageKeys.PROJECT_PROGRESS, {});
  return progressData[projectId] || 0;
};

// Update project progress
export const updateProjectProgress = (projectId, progress) => {
  const progressData = getStorageData(storageKeys.PROJECT_PROGRESS, {});
  progressData[projectId] = progress;
  saveStorageData(storageKeys.PROJECT_PROGRESS, progressData);
  return progress;
};

// Get category progress
export const getCategoryProgress = (projectId, categoryId) => {
  const categoryData = getStorageData(storageKeys.CATEGORY_PROGRESS, {});
  return categoryData[`${projectId}_${categoryId}`] || 0;
};

// Update category progress
export const updateCategoryProgress = (projectId, categoryId, progress) => {
  const categoryData = getStorageData(storageKeys.CATEGORY_PROGRESS, {});
  categoryData[`${projectId}_${categoryId}`] = progress;
  saveStorageData(storageKeys.CATEGORY_PROGRESS, categoryData);
  
  // Also update project progress
  updateOverallProjectProgress(projectId);
  return progress;
};

// Calculate overall project progress from categories
export const updateOverallProjectProgress = (projectId) => {
  const categoryData = getStorageData(storageKeys.CATEGORY_PROGRESS, {});
  
  // Get all categories for this project
  const projectCategories = Object.keys(categoryData)
    .filter(key => key.startsWith(`${projectId}_`));
  
  if (projectCategories.length === 0) return 0;
  
  // Calculate average progress
  const totalProgress = projectCategories.reduce((sum, key) => {
    return sum + categoryData[key];
  }, 0);
  
  const averageProgress = Math.round(totalProgress / projectCategories.length);
  updateProjectProgress(projectId, averageProgress);
  return averageProgress;
};

// Get or initialize default progress for a project
export const initializeProjectProgress = (projectId, categories) => {
  const categoryData = getStorageData(storageKeys.CATEGORY_PROGRESS, {});
  
  // Initialize each category with 0 if not exists
  categories.forEach(category => {
    const key = `${projectId}_${category.id}`;
    if (!(key in categoryData)) {
      categoryData[key] = 0;
    }
  });
  
  saveStorageData(storageKeys.CATEGORY_PROGRESS, categoryData);
  updateOverallProjectProgress(projectId);
};

// Add documentation note
export const addDocumentation = (projectId, categoryId, note) => {
  const docsData = getStorageData(storageKeys.DOCUMENTATION, {});
  const key = `${projectId}_${categoryId}`;
  
  if (!docsData[key]) {
    docsData[key] = [];
  }
  
  const newNote = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    content: note,
    type: 'documentation'
  };
  
  docsData[key].push(newNote);
  saveStorageData(storageKeys.DOCUMENTATION, docsData);
  return newNote;
};

// Get documentation for a category
export const getDocumentation = (projectId, categoryId) => {
  const docsData = getStorageData(storageKeys.DOCUMENTATION, {});
  return docsData[`${projectId}_${categoryId}`] || [];
};

// Add AI prompt
export const addAiPrompt = (projectId, categoryId, prompt, response) => {
  const promptsData = getStorageData(storageKeys.AI_PROMPTS, {});
  const key = `${projectId}_${categoryId}`;
  
  if (!promptsData[key]) {
    promptsData[key] = [];
  }
  
  const newPrompt = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    prompt: prompt,
    response: response,
    type: 'ai_prompt'
  };
  
  promptsData[key].push(newPrompt);
  saveStorageData(storageKeys.AI_PROMPTS, promptsData);
  return newPrompt;
};

// Get AI prompts for a category
export const getAiPrompts = (projectId, categoryId) => {
  const promptsData = getStorageData(storageKeys.AI_PROMPTS, {});
  return promptsData[`${projectId}_${categoryId}`] || [];
};
